import React, { Component } from 'react';
import NowPlaying from './now-playing-component';
import NextUp from './next-up-component';
import StickyFooterDashboard from './sticky-footer-dashboard';
import NavBar from './nav-bar-component';

class Dashboard extends Component {

  render() {
    return (
      <div className="main-container">
        <NavBar />
        <NowPlaying />
        <NextUp />
        <StickyFooterDashboard />
      </div>
    );
  }
}

export default Dashboard;
