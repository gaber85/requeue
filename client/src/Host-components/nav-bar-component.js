import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import userImg from './user-image.png';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      name: '',
    }
  }
  access_token= ''
  userPic = userImg;

  getHashParams = () => {
    const hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.search.substring(1);
        //e = r.exec(q);
    while ( e = r.exec(q) ) { // eslint-disable-line no-cond-assign
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getAccessToken = () => {
    const params = this.getHashParams();
    this.access_token = params.access_token;
  }


  getProfileInfo = () => {
    
    fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${this.access_token}`
      },
    }).then(response => response.json())
      .then(props  => {
        this.setState({ 
          url: props.images.length ? props.images[0].url : '',
          name: props.display_name.split(' ')[0]
        });
      });
  }
  componentDidMount() {
  this.getAccessToken()
  this.getProfileInfo();
  }

  render() {
    return (
      <div className="nav-bar">
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input className="text-input" type="text" placeholder="Search..."></input>
        </div>
        <div className="user">
          <img className="user-image" src={this.state.url ? this.state.url : this.userPic} alt="user-profile"></img>
          <div className="user-name">{this.state.name}</div>
          <div className="logout"><Link className="white-link" to="/">Logout</Link></div>
        </div>
      </div>
    );
  }
}

export default NavBar;