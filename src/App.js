import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/login';
import Search from './pages/search';
import Album from './pages/album';
import Favorites from './pages/favorites';
import Profiles from './pages/profile';
import ProfilesEdit from './pages/profileEdit';
import NotFound from './pages/notFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profiles } />
          <Route exact path="/profile/edit" component={ ProfilesEdit } />
          <Route exact path="/" component={ Login } />
          <Route path="*" component={ NotFound } />
        </Switch>

      </BrowserRouter>
    );
  }
}

export default App;
