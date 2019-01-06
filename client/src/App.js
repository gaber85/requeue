import React, { Component } from 'react';
import './App.css';
import NavBar from './Components/nav-bar-component';
import NowPlaying from './Components/now-playing-component';
import NextUp from './Components/next-up-component';
import StickyFooter from './Components/sticky-footer-component';

class App extends Component {

  render() {
    return (
      <div className="main-container">
        <NavBar />
        <NowPlaying />
        <NextUp />
        <StickyFooter />
      </div>
    );
  }
}

export default App;
