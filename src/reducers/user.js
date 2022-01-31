// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN_SAVE } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_SAVE:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
