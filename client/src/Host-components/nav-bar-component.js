import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      name: '',
    }
  }
  access_token= ''

  getProfilePic = () => {
    fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${this.access_token}`
      },
    }).then(response => response.json())
      .then(props  => {
        this.setState({ 
          url: props.images[0].url,
          name: props.display_name.split(' ')[0]
        });
      });
  }
  componentDidMount(){
  this.getProfilePic();
  }

  render() {
    return (
      <div className="nav-bar">
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input className="text-input" type="text" placeholder="Search..."></input>
        </div>
        <div className="user">
          <img className="user-image" src={this.state.url} alt="user-profile"></img>
          <div className="user-name">{this.state.name}</div>
          <div className="logout"><Link className="white-link" to="/">Logout</Link></div>
        </div>
      </div>
    );
  }
}

export default NavBar;