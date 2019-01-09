import React, { Component } from 'react';
import NowPlaying from './now-playing-component';
import NextUp from './next-up-component';
import StickyFooterDashboard from './sticky-footer-dashboard';

class Dashboard extends Component {

  render() {
    return (
      <div className="main-container">
        <NowPlaying />
        <NextUp />
        <StickyFooterDashboard />
      </div>
    );
  }
}

export default Dashboard;
