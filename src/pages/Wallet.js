import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import Header from '../componentes/Header';
import TableExpenses from '../componentes/TableExpenses';
import FormExpenses from '../componentes/FormExpenses';
import { saveExpenseAction, editDeleteExpenseAction,
  editExpenseAction, saveQuotationThunk } from '../actions';
import currenciesAPI from '../currenciesAPI';

// requisito 9 feito com ajuda de Rafael Carvalho e Emerson Moreira.

const ALIMENTACAO = 'Alimentação';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      expenses: {
        id: 0,
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: ALIMENTACAO,
      },
      isEdit: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
    this.editState = this.editState.bind(this);
    this.saveEditExpense = this.saveEditExpense.bind(this);
    this.editExpense = this.editExpense.bind(this);
  }

  componentDidMount() {
    const { dispatchCurrencies } = this.props;
    dispatchCurrencies();
  }

  editExpense(id) {
    const { expensesStore } = this.props;
    const expenses = expensesStore.find((expense) => expense.id === id);
    this.setState({ expenses, isEdit: false });
  }

  saveEditExpense(id) {
    const { expensesStore, dispatchEditRemoveExpense, dispatchCurrencies } = this.props;
    const { expenses } = this.state;
    const expenseIndex = expensesStore.findIndex((exp) => exp.id === id);
    const { exchangeRates } = expensesStore[expenseIndex];
    expensesStore[expenseIndex] = { ...expenses, exchangeRates };
    dispatchEditRemoveExpense(expensesStore);
    dispatchCurrencies();
    this.setState((prevState) => ({
      expenses: {
        ...prevState.expenses,
        value: 0,
        description: '',
        method: 'Dinheiro',
        tag: ALIMENTACAO,
        currency: 'USD',
      },
      isEdit: true,
    }));
  }

  editState() {
    const { expensesStore } = this.props;
    this.setState({ expenses: expensesStore });
  }

  handleChange({ target: { name, value } }) {
    this.setState((prevState) => ({
      expenses: {
        ...prevState.expenses,
        [name]: value,
      },
    }));
  }

  async saveExpense() {
    const { dispatchExpenses } = this.props;
    const { expenses } = this.state;
    const currenciesRates = await currenciesAPI();
    delete currenciesRates.USDT;
    this.setState((prevState) => ({
      expenses: {
        ...prevState.expenses,
        id: prevState.expenses.id + 1,
      },
    }), () => {
      dispatchExpenses({ ...expenses, exchangeRates: currenciesRates });
      this.setState((prevState) => ({
        expenses: {
          ...prevState.expenses,
          value: '0',
          description: '',
          currency: 'USD',
          method: 'Dinheiro',
          tag: ALIMENTACAO,
        },
      }));
    });
  }

  render() {
    const { total, isEdit, expenses } = this.state;
    return (
      <div>
        <Header total={ total } sumExpenses={ this.sumExpenses } />
        <FormExpenses
          expenses={ expenses }
          handleChange={ this.handleChange }
          saveExpense={ this.saveExpense }
          saveEditExpense={ this.saveEditExpense }
          isEdit={ isEdit }
        />
        <TableExpenses
          sumExpenses={ this.sumExpenses }
          editExpense={ this.editExpense }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesStore: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpenses: (expenses) => dispatch(saveExpenseAction(expenses)),
  dispatchEditExpense: (expense) => dispatch(editExpenseAction(expense)),
  dispatchCurrencies: () => dispatch(saveQuotationThunk()),
  dispatchEditRemoveExpense:
   (expenses) => dispatch(editDeleteExpenseAction(expenses)),
});

Wallet.propTypes = {
  dispatchCurrencies: PropTypes.func.isRequired,
  dispatchExpenses: PropTypes.func.isRequired,
  dispatchEditRemoveExpense: PropTypes.func.isRequired,
  expensesStore: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.arrayOf(Object),
  })).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
