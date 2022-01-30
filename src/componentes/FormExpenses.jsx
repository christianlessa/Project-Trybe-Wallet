import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveExpenseAction, editDeleteExpenseAction,
  editExpenseAction } from '../actions';
import currenciesAPI from '../currenciesAPI';
import '../App.css';

// Requisito 4 e 5 feito com ajuda de Rivaldo Maciel.

class FormExpenses extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
    this.editState = this.editState.bind(this);
    this.saveEditExpense = this.saveEditExpense.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { expense } = this.props;
    if (prevProps.expense !== expense) {
      this.editState();
    }
  }

  saveEditExpense() {
    const { expenses, dispatchEditRemoveExpense,
      dispatchEditExpense } = this.props;
    const { id } = this.state;
    const expenseIndex = expenses.findIndex((exp) => exp.id === id);
    expenses[expenseIndex] = this.state;
    console.log(expenses);
    console.log(expenseIndex);
    dispatchEditRemoveExpense(expenses);
    dispatchEditExpense({});
    this.setState({ value: '', description: '', method: '', tag: '' });
  }

  editState() {
    const {
      expense: { id, value, description, currency, method, tag },
    } = this.props;
    this.setState({
      id,
      value,
      description,
      currency,
      method,
      tag,
    });
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async saveExpense() {
    const { dispatchExpenses, sumExpenses } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    const currenciesRates = await currenciesAPI();
    delete currenciesRates.USDT;
    const expenses = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currenciesRates,
    };
    this.setState((prevState) => ({ id: prevState.id + 1 }));
    dispatchExpenses(expenses);
    sumExpenses();
    this.setState({ value: '', description: '', method: '', tag: '' });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, expense } = this.props;
    return (
      <form className="form">
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            type="number"
            name="value"
            value={ value }
            placeholder="Digite um valor"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
            id="currency"
          >
            {currencies.map((curren) => (
              <option data-testid={ curren } key={ curren }>
                {curren}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
            id="method"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select
            data-testid="tag-input"
            value={ tag }
            name="tag"
            onChange={ this.handleChange }
            id="tag"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            type="text"
            placeholder="Digite uma descrição"
            value={ description }
            name="description"
            onChange={ this.handleChange }
          />
        </label>
        {expense.id === undefined ? (
          <button
            className="buttonExpense"
            type="button"
            onClick={ this.saveExpense }
          >
            Adicionar despesa
          </button>
        ) : (
          <button
            className="buttonExpense"
            type="button"
            onClick={ this.saveEditExpense }
          >
            Editar despesa
          </button>
        )}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  expense: state.wallet.expense,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpenses: (expenses) => dispatch(saveExpenseAction(expenses)),
  dispatchEditExpense: (expense) => dispatch(editExpenseAction(expense)),
  dispatchEditRemoveExpense:
   (expenses) => dispatch(editDeleteExpenseAction(expenses)),
});

FormExpenses.propTypes = {
  dispatchExpenses: PropTypes.func.isRequired,
  dispatchEditExpense: PropTypes.func.isRequired,
  dispatchEditRemoveExpense: PropTypes.func.isRequired,
  sumExpenses: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
  expense: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormExpenses);
