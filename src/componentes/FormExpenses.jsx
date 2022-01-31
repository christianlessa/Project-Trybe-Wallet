import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';

// Requisito 4 e 5 feito com ajuda de Rivaldo Maciel.

class FormExpenses extends React.Component {
  render() {
    const { expenses, currencies, handleChange,
      isEdit, saveExpense, saveEditExpense } = this.props;
    return (
      <form className="form">
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            type="number"
            name="value"
            value={ expenses.value }
            placeholder="Digite um valor"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
            value={ expenses.currency }
            onChange={ handleChange }
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
            value={ expenses.method }
            onChange={ handleChange }
            id="method"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            value={ expenses.tag }
            name="tag"
            onChange={ handleChange }
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
            value={ expenses.description }
            name="description"
            onChange={ handleChange }
          />
        </label>
        { isEdit ? (
          <button
            className="buttonExpense"
            type="button"
            onClick={ saveExpense }
          >
            Adicionar despesa
          </button>
        ) : (
          <button
            className="buttonExpense"
            type="button"
            onClick={ () => saveEditExpense(expenses.id) }
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
});

FormExpenses.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  })).isRequired,
  handleChange: PropTypes.func.isRequired,
  saveExpense: PropTypes.func.isRequired,
  saveEditExpense: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(FormExpenses);
