import React, { Component } from 'react';
import NavBar from '../Host-components/nav-bar-component';
import Search from '../Host-components/search-component';
import StickyFooterUsers from '../Host-components/sticky-footer-users';

class SearchContainer extends Component {

  render() {
    return (
      <div className="main-container">
        <NavBar />
        <Search />
        <StickyFooterUsers />
      </div>
    );
  }
}

export default SearchContainer;
