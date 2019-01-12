import React, { Component } from 'react';
import { Link } from "react-router-dom";

class IntroPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      welcome: true,
    }
    this.welcomeInterval = null;
  }

  handleWelcome() {
    this.setState({
      welcome: false,
    })
  }

  componentWillMount() {
    setTimeout(() => this.handleWelcome(), 2000);
  }

  render () {
    const { welcome } = this.state;
    return (
      <div className="intro-page-container">
      {welcome ? 
          (<div className="welcome-title fade-in">Welcome</div>)
      :
        (
        <div className="intro-page-container">
          <div className="intro-title">I want to...</div>
          <div className="intro-button"><Link className="black-link" to="/host">Host</Link></div>
          <div className="intro-button">Join</div>
        </div>)
        }
      </div>
    );
  }
}

export default IntroPage;