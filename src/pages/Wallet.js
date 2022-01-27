import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import Header from '../componentes/Header';
import FormExpenses from '../componentes/FormExpenses';
import TableExpenses from '../componentes/TableExpenses';
import { saveQuotationThunk } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
    };
    this.sumExpenses = this.sumExpenses.bind(this);
  }

  componentDidMount() {
    const { dispatchCurrencies } = this.props;
    dispatchCurrencies();
  }

  sumExpenses = () => {
    const { expenses } = this.props;
    let sumTotal = 0;
    expenses.forEach((expense) => {
      const rates = expense.exchangeRates[expense.currency].ask;
      const expCurr = expense.value;
      sumTotal += Number(rates) * Number(expCurr);
    });
    this.setState({ total: sumTotal });
  };

  render() {
    const { total } = this.state;
    return (
      <div>
        <Header total={ total } />
        <FormExpenses sumExpenses={ this.sumExpenses } />
        <TableExpenses sumExpenses={ this.sumExpenses } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencies: (payload) => dispatch(saveQuotationThunk(payload)),
});

Wallet.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  dispatchCurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
