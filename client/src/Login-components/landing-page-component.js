import React, { Component } from 'react';
import Logo from './White.png';

class LandingPage extends Component {
  render () {
    return (
      <div className="landing-page-container">
        <img className="logo" alt="logo" src={Logo}></img>
        <div className="sign-in-button">Sign In</div>
        <div className="sign-up-button">Sign Up</div>
      </div>
    );
  }
}

export default LandingPage;