import React, { Component } from "react";
import Logo from "./White.png";

class LandingPage extends Component {

  BASE_URL = "http://localhost:3001/login";

  render() {
    return (
      <div className="animated fadeIn delay-1s duration-2s landing-page-container">
        <img className="logo" alt="logo" src={Logo} />
        <div className="white-text">Sign in with Spotify</div>
        <div className="sign-in-button">
          <a className="white-link" href={this.BASE_URL}>Sign In</a>
        </div>
      </div>
    );
  }
}

export default LandingPage;
