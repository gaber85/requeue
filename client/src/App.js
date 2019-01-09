import React, { Component } from 'react';
import './App.css';

import ConnectedUsers from './Host-components/connected-users';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './Host-components/dashboard-component';
import History from './Host-components/history-component';
import NavBar from './Host-components/nav-bar-component';

class App extends Component {

  render() {
    return (
        <Router>
          <div className="main-container">
          <NavBar />
         <Route exact path="/" component={Dashboard} />
         <Route path="/users" component={ConnectedUsers} />
         <Route path="/history" component={History} />
         </div>
        </Router>
    );
  }
}

export default App;
