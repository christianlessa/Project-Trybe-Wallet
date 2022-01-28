// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { DELETE_EXPENSE, SAVE_EXPENSES, SAVE_QUOTATION } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currencies: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case SAVE_QUOTATION:
    return {
      ...state,
      currencies: action.payload,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
