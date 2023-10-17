import React from 'react';
import PropTypes from 'prop-types';

import Loading from '../components/loading';
import { createUser } from '../services/userAPI';
import logo1 from '../images/logo1.png';

class Login extends React.Component {
  state = {
    userName: '',
    email: '',
    description: '',
    image: '',
    buttonDisable: true,
    loading: false,
  };

  urlNavegation = () => {
    const { history } = this.props;
    history.push('/search');
  };

  newUser = (e) => {
    e.preventDefault();
    const { userName, email, description, image } = this.state;
    this.setState({
      loading: true,
    });
    createUser({ name: userName, email, description, image })
      .then(() => this.urlNavegation());
  };

  validation = () => {
    const {
      userName,
    } = this.state;
    const minLength = 3;
    const nameValidation = userName.length >= minLength;

    this.setState({
      buttonDisable: !(nameValidation),
    });
  };

  onInputChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, this.validation);
  };

  render() {
    const {
      userName,
      email,
      description,
      image,
      buttonDisable,
      loading,
    } = this.state;

    return (
      <div data-testid="page-login">
        {loading ? <Loading />
          : (
            <form className="login-form">

              <img className="login-logo" src={ logo1 } alt="logo" />

              <input
                type="text"
                name="userName"
                className="login-input"
                placeholder="Digite seu nome"
                value={ userName }
                onChange={ this.onInputChange }
                required
              />
              <input
                type="email"
                name="email"
                className="login-input"
                placeholder="Digite seu email"
                value={ email }
                onChange={ this.onInputChange }
                required
              />
              <input
                type="text"
                name="description"
                className="login-input"
                placeholder="Descrição"
                value={ description }
                onChange={ this.onInputChange }
              />
              <input
                type="url"
                name="image"
                className="login-input"
                placeholder="Url de Imagem"
                value={ image }
                onChange={ this.onInputChange }
              />

              <button
                type="submit"
                data-testid="login-submit-button"
                className="login-button"
                disabled={ buttonDisable }
                onClick={ this.newUser }
              >
                Criar
              </button>

            </form>)}
      </div>
    );
  }
}
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
