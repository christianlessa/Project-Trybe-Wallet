import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TableExpenses extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <header>
        <table>
          <thead>
            <tr className="tableMenu">
              <th className="table">Descrição</th>
              <th className="table">Tag</th>
              <th className="table">Método de pagamento</th>
              <th className="table">Valor</th>
              <th className="table">Moeda</th>
              <th className="table">Câmbio utilizado</th>
              <th className="table">Valor convertido</th>
              <th className="table">Moeda de conversão</th>
              <th className="table">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.length > 0 && expenses.map((expense) => {
                const { value, exchangeRates, currency, id,
                  description, tag, method } = expense;
                const sumTotal = (Number(value)
                 * Number(exchangeRates[currency].ask));
                return (
                  <tr
                    className="tableResp"
                    key={ id }
                  >
                    <td>{description}</td>
                    <td>{tag}</td>
                    <td>{method}</td>
                    <td>{value}</td>
                    <td>{exchangeRates[currency].name}</td>
                    <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                    <td>{sumTotal.toFixed(2)}</td>
                    <td>Real</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(TableExpenses);
