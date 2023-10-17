import React from 'react';
import Header from '../components/header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    user: [],
    loading: false,
  };

  componentDidMount() {
    this.userData();
  }

  userData = () => {
    this.setState({
      loading: true,
    });
    getUser()
      .then((data) => this.setState({
        user: data,
        loading: false,
      }));
  };

  render() {
    const { loading, user } = this.state;

    return (
      loading ? null
        : (
          <div className="container" data-testid="page-profile">
            <Header />
            <div
              id="user-container"
            >
              <img id="user-image" src={ user.image } alt="user" />
              <p className="user-text">
                <b>Nome:</b>
                {' '}
                { user.name }
              </p>
              <p className="user-text">
                <b>Email:</b>
                {' '}
                { user.email }
              </p>
              <p className="user-text">
                <b>Descrição:</b>
                {' '}
                { user.description }
              </p>
            </div>
          </div>)
    );
  }
}
export default Profile;
