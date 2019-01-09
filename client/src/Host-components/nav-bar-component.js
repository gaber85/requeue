import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    return (
      <div className="nav-bar">
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input className="text-input" type="text" placeholder="Search..."></input>
        </div>
        <div className="user">
          <img className="user-image" src="https://pbs.twimg.com/profile_images/924016703540928512/W7mgNkW4_400x400.jpg" alt="user-profile"></img>
          <div className="user-name">John</div>
          <div className="logout">Logout</div>
        </div>
      </div>
    );
  }
}

export default NavBar;