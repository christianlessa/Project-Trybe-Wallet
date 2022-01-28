// Coloque aqui suas actions
import currenciesAPI from '../currenciesAPI';

export const LOGIN_SAVE = 'LOGIN_SAVE';
export const SAVE_EXPENSES = 'SAVE_EXPENSE';
export const SAVE_QUOTATION = 'SAVE_QUOTATION';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export function saveLoginAction(email) {
  return {
    type: LOGIN_SAVE,
    payload: email,
  };
}

export function saveExpenseAction(expense) {
  return {
    type: SAVE_EXPENSES,
    payload: expense,
  };
}

export function deleteExpenseAction(filterExpense) {
  return {
    type: DELETE_EXPENSE,
    payload: filterExpense,
  };
}

export function saveQuotationAction(quotation) {
  return {
    type: SAVE_QUOTATION,
    payload: quotation,
  };
}

export const saveQuotationThunk = () => (dispatch) => {
  currenciesAPI().then((dates) => {
    const quotations = dates;
    delete quotations.USDT;
    dispatch(saveQuotationAction(Object.keys(quotations)));
  });
};
