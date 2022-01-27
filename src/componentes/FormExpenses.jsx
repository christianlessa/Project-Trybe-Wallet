import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveExpenseAction } from '../actions';
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
    const { currencies } = this.props;
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
            {
              currencies.map((curren) => (
                <option data-testid={ curren } key={ curren }>{curren}</option>
              ))
            }
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
        <button
          className="buttonExpense"
          type="button"
          onClick={ this.saveExpense }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpenses: (expenses) => dispatch(saveExpenseAction(expenses)),
});

FormExpenses.propTypes = {
  dispatchExpenses: PropTypes.func.isRequired,
  sumExpenses: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormExpenses);
