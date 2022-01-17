import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveLoginAction } from '../actions';

class Login extends Component {
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
    const { user: { email } } = this.state;
    const { dispatchLogin, history } = this.props;
    dispatchLogin(email);
    history.push('/carteira');
  }

  render() {
    const minLength = 6;
    const { user: { email, password } } = this.state;
    return (
      <div>
        <p>Email:</p>
        <input
          type="email"
          data-testid="email-input"
          value={ email }
          name="email"
          placeholder="Digite email"
          onChange={ this.handleChange }
          required
        />
        <p>Password:</p>
        <input
          type="text"
          data-testid="password-input"
          value={ password }
          name="password"
          placeholder="Digite senha"
          onChange={ this.handleChange }
          required
        />
        <button
          type="button"
          onClick={ this.saveLogin }
          disabled={
            !(password.length >= minLength
            && email.includes('@')
            && email.includes('.com'))
          }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (email) => dispatch(saveLoginAction(email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatchLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
