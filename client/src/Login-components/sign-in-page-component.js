import React, { Component } from 'react';
import Logo from './White.png';
import { Link } from "react-router-dom";

class SignInPage extends Component {
  white = '#FFFFFF';
  render () {
    return (
      <div className="landing-page-container">
        <img className="logo" alt="logo" src={Logo}></img>
        <form className="form-inputs">
          <input className="sign-in-input" type="text" placeholder="Username or Email..."></input>
          <input className="sign-in-input" type="text" placeholder="Password..."></input>
          <div>
          <input className="checkbox" type="checkbox" placeholder="Remember Me"></input>
          <label style={{color:this.white}}>Remember me</label>
          </div>
          <button type="submit" className="small-button"><Link className="white-link" to="/intro">Sign In</Link></button>
        </form>
      </div>
    );
  }
}

export default SignInPage;