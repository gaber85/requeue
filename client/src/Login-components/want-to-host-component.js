import React, { Component } from 'react';
import Logo from './White.png';
import { Link } from "react-router-dom";

class WantToHost extends Component {
  render () {
    return (
      <div className="landing-page-container">
        <img className="small-logo" alt="logo" src={Logo}></img>
        <div className="intro-button green"><Link className="white-link"  to="/dashboard">OK</Link></div>
        <div className="host-title">Users can join your queue with:</div>
        <div className="intro-button">CODEWORD</div>
      </div>
    );
  }
}

export default WantToHost;