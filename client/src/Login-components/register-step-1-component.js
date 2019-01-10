import React, { Component } from 'react';
import Logo from './White.png';
import { Link } from "react-router-dom";

class Register1 extends Component {
  white = '#FFFFFF';
  render () {
    return (
      <div className="landing-page-container">
        <div className="progress-bar"></div>
        <img className="small-logo" alt="logo" src={Logo}></img>
        <form className="form-inputs">
          <lable className="white-text">Register with your email</lable>
          <input className="sign-in-input" type="text" placeholder="Email"></input>
          <input className="sign-in-input" type="text" placeholder="Confirm Email"></input>
          <input className="sign-in-input" type="text" placeholder="Password"></input>
          <input className="sign-in-input" type="text" placeholder="First Name"></input>
          <button type="submit" className="small-button"><Link className="white-link" to="/intro">Sign Up</Link></button>
        </form>
      </div>
    );
  }
}

export default Register1;