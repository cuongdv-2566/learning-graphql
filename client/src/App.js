import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import LinkList from './components/LinkList';
import CreateLink from './components/CreateLink';
import Login from './components/Login';
import Search from './components/Search';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to Apollo</h2>
      </header>
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path="/" render={() => <Redirect to='/new/1' />} />
            <Route exact path="/create" component={CreateLink} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/new/:page" component={LinkList} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
