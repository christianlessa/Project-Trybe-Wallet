// Coloque aqui suas actions
import currenciesAPI from '../currenciesAPI';

export const LOGIN_SAVE = 'LOGIN_SAVE';
export const SAVE_EXPENSES = 'SAVE_EXPENSE';
export const SAVE_QUOTATION = 'SAVE_QUOTATION';
export const EDIT_DELETE_EXPENSE = 'EDIT_DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export function saveLoginAction(email) {
  return {
    type: LOGIN_SAVE,
    email,
  };
}

export function saveExpenseAction(expenses) {
  return {
    type: SAVE_EXPENSES,
    expenses,
  };
}

export function editDeleteExpenseAction(expenses) {
  return {
    type: EDIT_DELETE_EXPENSE,
    expenses,
  };
}

export function editExpenseAction(expense) {
  return {
    type: EDIT_EXPENSE,
    expense,
  };
}

export function saveQuotationAction(quotation) {
  return {
    type: SAVE_QUOTATION,
    quotation,
  };
}

export const saveQuotationThunk = () => (dispatch) => {
  currenciesAPI().then((dates) => {
    const quotations = dates;
    delete quotations.USDT;
    dispatch(saveQuotationAction(Object.keys(quotations)));
  });
};
