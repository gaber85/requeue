import React, { Component } from "react";
import { connect } from "react-redux";
import { getToken, getUser, getPlaylist } from '../redux-store/actions'

class IntroPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      welcome: true,
      url: '',
      name: '',
      id: '',
    };
    this.welcomeInterval = null;
  }
  CREATE_URL = 'http://localhost:3001/createSession';
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
    // gets the access_token and sets it to the variable and the redux store
    const params = this.getHashParams();
    this.access_token = params.access_token;
    this.props.getToken(this.access_token);
  }

  getProfileInfo = () => {
    // makes a call to the spotify api with the access_token and retrieves the user profile
    fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${this.access_token}`
      },
    }).then(response => response.json())
      .then(props  => {
        this.props.getUser(props.display_name.split(' ')[0], props.images.length ? props.images[0].url : '', props.id);
        this.setState({ 
          url: props.images.length ? props.images[0].url : '',
          name: props.display_name.split(' ')[0],
          id: props.id,
        });
      });
  }

  handleWelcome() {
    this.setState({
      welcome: false
    });
  }
  
  componentWillMount() {
  this.getAccessToken()
  this.getProfileInfo();
  setTimeout(() => this.handleWelcome(), 2000); // this delay the rendering for the welcome
  }

  createSession = () => {
    fetch(`${this.CREATE_URL}/${this.state.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => res.text())
    .then(text => console.log(text))
     //.then(data => data.json())
      // .then(session => {
      //   console.log('session', session);
      //   this.props.getPlaylist(session.playlistId, session.codeWord);
      //   this.props.history.push(`/host/${session.codeWord}`);
      // })
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
            <div className="intro-button" onClick={this.createSession}>Host</div>
            <div className="intro-button">Join</div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // maps state to props
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  // maps dispatch actions to props
  getToken: (token) => dispatch(getToken(token)),
  getUser: (name, imageURL, id) => dispatch(getUser(name, imageURL, id)),
  getPlaylist: (playlistId, codeWord) => dispatch(getPlaylist(playlistId, codeWord)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IntroPage);