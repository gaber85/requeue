import React, { Component } from 'react';
import Logo from './White.png';

class SignInPage extends Component {
  render () {
    return (
      <div className="landing-page-container">
        <img className="logo" alt="logo" src={Logo}></img>
        <form className="inputs">
          <input className="sign-in-input" type="text" placeholder="Username or Email..."></input>
          <input className="sign-in-input" type="text" placeholder="Password..."></input>
          <input className="checkbox" type="checkbox"></input>
          <button type="submit" className="sign-in-button small-button">Sign In</button>
        </form>
      </div>
    );
  }
}

export default SignInPage;