import React, { Component } from "react";
import "./Stylesheets/App.css";
import "./Stylesheets/Login.css";

import ConnectedUsers from "./Host-components/connected-users";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./Host-components/dashboard-component";
import History from "./Host-components/history-component";
import NavBar from "./Host-components/nav-bar-component";
import LandingPage from "./Login-components/landing-page-component";
import SignInPage from "./Login-components/sign-in-page-component";
import IntroPage from "./Login-components/intro-page-component";
import WantToHost from "./Login-components/want-to-host-component";

class App extends Component {
  render() {
    return (
      // <Router>
      //   <div className="main-container">
      //     <Route exact path="/" component={Dashboard} />
      //     <Route path="/users" component={ConnectedUsers} />
      //     <Route path="/history" component={History} />
      //   </div>
      // </Router>
      
      <Router>
        <div className="main-container">
          <Route exact path="/" component={LandingPage} />
          <Route path="/sign-in" component={SignInPage} />
          <Route path="/intro" component={IntroPage} />
          <Route path="/host" component={WantToHost} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/users" component={ConnectedUsers} />
          <Route path="/history" component={History} />
        </div>
      </Router>
    );
  }
}

export default App;
