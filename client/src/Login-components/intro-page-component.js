import React, { Component } from "react";
import { Link } from "react-router-dom";

class IntroPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      welcome: true
    };
    this.welcomeInterval = null;
  }

  handleWelcome() {
    this.setState({
      welcome: false
    });
  }

  componentWillMount() {
    setTimeout(() => this.handleWelcome(), 2000);
  }

  render() {
    const { welcome } = this.state;
    return (
      <div className="intro-page-container">
        {welcome ? (
          <div className="animated pulse duration-2s welcome-title">
            Welcome
          </div>
        ) : (
          <div className="animated fadeIn duration-3s intro-page-container">
            <div className="intro-title">I want to...</div>
            <div className="intro-button">
              <Link className="black-link" to="/host">Host</Link>
            </div>
            <div className="intro-button">Join</div>
          </div>
        )}
      </div>
    );
  }
}

export default IntroPage;
