import React, {Component} from 'react';
import StickyFooterUsers from './sticky-footer-users';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    }
  }

  SEARCH_URL = 'http://localhost:3001/search'

  updateNewSearch = e => {
    this.setState({ search: e.target.value});
  }

  handleSearchSubmit = (e) => {
    e.preventDefault();
    if (this.state.search) {
      fetch(this.BASE_URL, {
        method: 'post',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then(res => {
          // deal with the search results to render in search-results div
        })
    }
    this.setState({
      search: '',
    })
  }
  
  render() {
    return (
      <div className="next-up-section ">
        <div className="search-header">Search</div>
        <form className="search-bar" onSubmit={this.handleSearchSubmit}>
          <i className="fas fa-search"></i>
          <input onChange={this.updateNewSearch} 
            value={this.state.search} className="text-input" 
            type="text" placeholder="Search..."></input>
        </form>
        <div className="search-results">
          <ul className="search-results">
            <li className="search-item">
              Gabe Riera
            </li>
          </ul>
        </div>
        <StickyFooterUsers />
      </div>
    );
  }
}

export default Search;