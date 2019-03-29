import React, { Component } from "react";
import styled from "@emotion/styled";
import "./Stylesheets/App.css";
import "./Stylesheets/Login.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./Host-components/dashboard-component";
import History from "./Host-components/history-component";
import LandingPage from "./Login-components/landing-page-component";
import SignInPage from "./Login-components/sign-in-page-component";
import IntroPage from "./Login-components/intro-page-component";
import WantToHost from "./Login-components/want-to-host-component";
import Register1 from "./Login-components/register-step-1-component";
import SearchContainer from "./Containers/search-container";

class App extends Component {
  render() {
    return (
      <Router>
        <MainContainer className="main-container">
          <Route exact path="/" component={LandingPage} />
          <Route path="/sign-in" component={SignInPage} />
          <Route path="/register" component={Register1} />
          <Route path="/intro" component={IntroPage} />
          <Route path="/host/:id" component={WantToHost} />
          {/* <Route path="/session/:sessionId" component={WantToHost} /> */}
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/search" component={SearchContainer} />
          <Route path="/history" component={History} />
        </MainContainer>
      </Router>
    );
  }
}

const MainContainer = styled('div')`
  height: 100%;
  font-family: 'Roboto', sans-serif;
`

export default App;
