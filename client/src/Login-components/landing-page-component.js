import React, { Component } from "react";
import Logo from "./White.png";
import Button from "../components/Button";
import styled from '@emotion/styled';

class LandingPage extends Component {

  BASE_URL = "http://localhost:3001/login";

  render() {
    return (
      <LandingPageContainer className="animated fadeIn delay-1s duration-2s">
        <img className="logo" alt="logo" src={Logo} />
        <div className="white-text">Sign in with Spotify</div>
        <Button text="Sign In" link={this.BASE_URL} />
      </LandingPageContainer>
    );
  }
}

const LandingPageContainer = styled('div')`
  margin: auto;
  padding-top: 2%;
  max-width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto', sans-serif;
`

export default LandingPage;
