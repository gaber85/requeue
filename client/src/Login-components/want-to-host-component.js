import React, { Component } from 'react';
import { Link } from "react-router-dom";

class WantToHost extends Component {

  generateCodeWord() {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codeWord = '';
    for (let i = 0; i < 5; i++) {
      codeWord += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return codeWord;
  };
  

  render () {
    const codeWord = this.generateCodeWord();
    return (
      <div className="landing-page-container">
        <div className="intro-button green"><Link className="white-link"  to="/dashboard">OK</Link></div>
        <div className="host-title">Users can join your queue with:</div>
        <div className="intro-button">{codeWord}</div>
      </div>
    );
  }
}

export default WantToHost;