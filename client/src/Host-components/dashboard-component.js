import React, { Component } from 'react';
import NowPlaying from './now-playing-component';
import NextUp from './next-up-component';
import StickyFooterDashboard from './sticky-footer-dashboard';
import NavBar from './nav-bar-component';
import userImg from './user-image.png';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      name: '',
    }
  }
  access_token= ''

  getHashParams = () => { 
    // grabs the query params, splits them and adds them to an object
    const hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.search.substring(1);
    while ( e = r.exec(q) ) { // eslint-disable-line no-cond-assign
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getAccessToken = () => {
    // gets the access_token and sets it to the variable
    const params = this.getHashParams();
    this.access_token = params.access_token;
  }

  getProfileInfo = () => {
    // makes a call to the spotify api with the access_token and retrieves the user profile
    fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${this.access_token}`
      },
    }).then(response => response.json())
      .then(props  => {
        this.setState({ 
          url: props.images.length ? props.images[0].url : '',
          name: props.display_name.split(' ')[0],
        });
      });
  }
  
  componentWillMount() {
  this.getAccessToken()
  this.getProfileInfo();
  }

  render() {
    const userPic = userImg;
    return (
      <div className="main-container">
        <NavBar url={this.state.url ? this.state.url : userPic} name={this.state.name} />
        <NowPlaying token={this.access_token} />
        <NextUp />
        <StickyFooterDashboard />
      </div>
    );
  }
}

export default Dashboard;
