import React, {Component} from 'react';
import { connect } from "react-redux";
import { addSongToPlaylist } from '../redux-store/actions'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      tracks: '',
    }
  }

  SEARCH_URL = 'http://localhost:3001/search';
  ADD_URL = 'http://localhost:3001/add';


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

  handleAddToPlaylist = (id, image, name, artists) => {
    const song = {
      id: id,
      image: image,
      name: name,
      artists: artists,
    }   
    fetch(`${this.ADD_URL}/${id}/${this.props.user.playlist.playlistId}`, {
      method: 'PUT',
      body: JSON.stringify(song),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(responseBody => {
      if (responseBody.errors) console.log('error occured adding song to playlist', responseBody.errors);
      return responseBody;
    }).then(playlist => {
      this.props.addSongToPlaylist(song);
      console.log('added song to list:', playlist.playlistName)
    });
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
          {tracks ?
            tracks.map((track) => {
              return (
                <div key={track.id} className="search-item" onClick={() => this.handleAddToPlaylist(track.id, track.image, track.name, track.artists)}>
                  <img src={track.image} alt="album_cover" className="track-cover"></img>
                  <div className="track-info">
                    <div>{track.name}</div>
                    <div>{track.artists}</div>
                  </div>
                  <div className="plus-icon"><i className="fas fa-plus"></i></div>
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

const mapStateToProps = (state) => ({
  // maps state to props
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  // maps dispatch actions to props
  addSongToPlaylist: (song) => dispatch(addSongToPlaylist(song)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);