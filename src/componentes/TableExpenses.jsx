import React from 'react';
import '../App.css';

class TableExpenses extends React.Component {
  render() {
    return (
      <header>
        <table className="tableExpenses">
          <tr>
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
        </table>
      </header>
    );
  }
}

export default TableExpenses;
