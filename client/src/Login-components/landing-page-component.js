import React, { Component } from 'react';
import Logo from './White.png';
// import { Link } from "react-router-dom";

class LandingPage extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     token: '',
  //     deviceId: '',
  //     loggedIn: false,
  //     error: '',
  //     trackName: '',
  //     artistName: '',
  //     albumName: '',
  //     playing: false,
  //     position: 0,
  //     duration: 0,
  //   }
  // }

  BASE_URL = 'http://localhost:3001/login';


  render () {
    return (
      <div className="landing-page-container">
        <img className="logo" alt="logo" src={Logo}></img>
        <div className="white-text">Sign in with Spotify</div>
        <div className="sign-in-button"><a className="white-link" href={this.BASE_URL}>Sign In</a></div>
        {/* <div className="sign-up-button"><Link className="black-link" to='/register'>Sign Up</Link></div> */}
      </div>
    );
  }
}

export default LandingPage;