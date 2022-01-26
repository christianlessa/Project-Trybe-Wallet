import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveLoginAction } from '../actions';
import '../App.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {
        email: '',
        password: '',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveLogin = this.saveLogin.bind(this);
  }

  handleChange({ target: { value, name } }) {
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  saveLogin() {
    const { history, dispatchLogin } = this.props;
    const { user: { email } } = this.state;
    dispatchLogin(email);
    history.push('/carteira');
  }

  render() {
    const { user: { email, password } } = this.state;
    const SIX = 6;
    const isDisabled = email.includes('@') && email.includes('.com')
     && password.length >= SIX;
    return (
      <div className="login">
        <label htmlFor="email">
          Email:
          <input
            data-testid="email-input"
            name="email"
            placeholder="Digite seu email"
            onChange={ this.handleChange }
          />
          Senha:
          <input
            data-testid="password-input"
            name="password"
            placeholder="Digite sua senha"
            onChange={ this.handleChange }
          />
          <button
            className="buttonLogin"
            type="button"
            onClick={ this.saveLogin }
            disabled={ !isDisabled }
          >
            Entrar
          </button>
        </label>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatchLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (email) => dispatch(saveLoginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
