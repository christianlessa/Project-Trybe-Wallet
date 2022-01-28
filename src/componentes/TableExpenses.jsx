import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenseAction } from '../actions';

class TableExpenses extends React.Component {
  constructor() {
    super();
    this.deleteExpense = this.deleteExpense.bind(this);
  }

  deleteExpense(id) {
    const { expenses, dispatchRemoveExpense } = this.props;
    const filterExpenses = expenses.filter((expense) => expense.id !== id);
    dispatchRemoveExpense(filterExpenses);
  }

  render() {
    const { expenses, sumExpenses } = this.props;
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
                const sumExp = (Number(value)
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
                    <td>{sumExp.toFixed(2)}</td>
                    <td>Real</td>
                    <td>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        onClick={ () => {
                          this.deleteExpense(id);
                          sumExpenses(sumExp);
                        } }
                      >
                        Remover
                      </button>
                    </td>
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

const mapDispatchToProps = (dispatch) => ({
  dispatchRemoveExpense:
   (id) => dispatch(deleteExpenseAction(id)),
});

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  dispatchRemoveExpense: PropTypes.func.isRequired,
  sumExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableExpenses);

// Requisito 8 feito com ajuda do Rivaldo Maciel.
