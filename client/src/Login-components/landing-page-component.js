import React, { Component } from 'react';
import Logo from './White.png';
import { Link } from "react-router-dom";

class LandingPage extends Component {
  render () {
    return (
      <div className="landing-page-container">
        <img className="logo" alt="logo" src={Logo}></img>
        <div className="sign-in-button"><Link className="white-link" to='/sign-in'>Sign In</Link></div>
        <div className="sign-up-button">Sign Up</div>
      </div>
    );
  }
}

export default LandingPage;