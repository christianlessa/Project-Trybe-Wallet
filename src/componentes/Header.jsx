import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  sumExpenses = () => {
    const { expenses } = this.props;
    if (expenses.length !== 0) {
      const sum = expenses.reduce((acc, expense) => {
        if (expense.currency === expense.exchangeRates[expense.currency].code) {
          acc += (expense.value * expense.exchangeRates[expense.currency].ask);
          return acc;
        }
        return acc;
      }, 0);
      return sum;
    }
    return 0;
  }

  render() {
    const total = this.sumExpenses();
    const { email } = this.props;
    return (
      <header>
        <span
          className="email"
          data-testid="email-field"
        >
          {email}
        </span>
        <span data-testid="total-field">{total.toFixed(2)}</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(Header);
