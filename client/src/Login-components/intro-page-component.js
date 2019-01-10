import React, { Component } from 'react';
import Logo from './White.png';
import { Link } from "react-router-dom";

class IntroPage extends Component {
  render () {
    return (
      <div className="landing-page-container">
        <img className="small-logo" alt="logo" src={Logo}></img>
        <div className="intro-title">I want to...</div>
        <div className="intro-button">Host</div>
        <div className="intro-button">Join</div>
      </div>
    );
  }
}

export default IntroPage;