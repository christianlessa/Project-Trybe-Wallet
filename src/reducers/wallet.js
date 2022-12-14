// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { EDIT_EXPENSE, EDIT_DELETE_EXPENSE,
  SAVE_EXPENSES, SAVE_QUOTATION } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  expense: {},
  currencies: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case SAVE_QUOTATION:
    return {
      ...state,
      currencies: action.quotation,
    };
  case EDIT_DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...action.expenses],
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expense: action.expense,
    };
  default:
    return state;
  }
};

export default wallet;
