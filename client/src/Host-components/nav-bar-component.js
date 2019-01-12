import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {

  render() {
    return (
      <div className="nav-bar">
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input className="text-input" type="text" placeholder="Search..."></input>
        </div>
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