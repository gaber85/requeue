import React, { Component } from 'react';
import Logo from './White.png';
// import { Link } from "react-router-dom";

class LandingPage extends Component {

  BASE_URL = 'http://localhost:3001/login';


  render () {
    return (
      <div className="landing-page-container">
        <img className="logo" alt="logo" src={Logo}></img>
        <div className="white-text">Sign in with Spotify</div>
        <div className="sign-in-button"><a href={this.BASE_URL}>Sign In</a></div>
        {/* <div className="sign-up-button"><Link className="black-link" to='/register'>Sign Up</Link></div> */}
      </div>
    );
  }
}

export default LandingPage;