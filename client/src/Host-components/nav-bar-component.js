import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Login-components/White.png';

class NavBar extends Component {

  render() {
    const logo = Logo;
    return (
      <div className="nav-bar">
        <img className="small-logo" alt="logo" src={logo}></img>
        <div className="user">
          <img className="user-image" src={this.props.url} alt="user-profile"></img>
          <div className="user-name">{this.props.name}</div>
          <div className="logout"><Link className="white-link" to="/">Logout</Link></div>
        </div>
      </div>
    );
  }
}

export default NavBar;