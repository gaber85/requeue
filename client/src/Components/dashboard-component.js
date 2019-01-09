import React, { Component } from 'react';
import NavBar from './nav-bar-component';
import NowPlaying from './now-playing-component';
import NextUp from './next-up-component';
import StickyFooter from './sticky-footer-component';
import ConnectedUsers from './connected-users';

class Dashboard extends Component {

  render() {
    return (
      <div className="main-container">
        <NavBar />
        <NowPlaying />
        <NextUp />
        <ConnectedUsers />
        <StickyFooter />
      </div>
    );
  }
}

export default Dashboard;
