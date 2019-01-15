import React, {Component} from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      tracks: '',
    }
  }

  SEARCH_URL = 'http://localhost:3001/search'

  updateNewSearch = e => {
    this.setState({ search: e.target.value});
  }

  handleSearchSubmit = (e) => {
    e.preventDefault();
    if (this.state.search) {
      fetch(`${this.SEARCH_URL}/${this.state.search}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(tracks => {
        this.setState({
          tracks: tracks,
        });
      });
    }
    
  }
  
  render() {
    const { tracks }= this.state;
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
          {/* <ul className="search-results"> */}
          {tracks ?
            tracks.map((track) => {
              return (
                <div className="search-item">
                  <img src={track.image} alt="album_cover" className="track-cover"></img>
                  <div className="track-info">
                    <div>{track.name}</div>
                    <div>{track.artists}</div>
                  </div>
                </div>
              )
            })
          :
            <div></div>
          }
          {/* </ul> */}
        </div>
      </div>
    );
  }
}

export default Search;