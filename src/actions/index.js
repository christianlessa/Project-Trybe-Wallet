// Coloque aqui suas actions
export const LOGIN_SAVE = 'LOGIN_SAVE';

export function saveLoginAction(email) {
  return {
    type: LOGIN_SAVE,
    payload: email,
  };
}
