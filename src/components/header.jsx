import React from 'react';
import { Link } from 'react-router-dom';

import { getUser } from '../services/userAPI';
import Loading from './loading';
import logo1 from '../images/logo1.png';

class Header extends React.Component {
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
    const { user, loading } = this.state;

    return (
      <header data-testid="header-component">
        {
          loading ? <Loading />
            : (
              <>
                <img className="header-logo" src={ logo1 } alt="logo" />

                <Link to="/search" data-testid="link-to-search">
                  <p className="text-link">Search</p>
                </Link>
                <Link to="/favorites" data-testid="link-to-favorites">
                  <p className="text-link">Favorites</p>
                </Link>
                <Link to="/profile" data-testid="link-to-profile">
                  <p className="text-link">Profile</p>
                </Link>
                <p data-testid="header-user-name" className="user-name">
                  {user.name}
                </p>

              </>)
        }
      </header>
    );
  }
}
export default Header;
