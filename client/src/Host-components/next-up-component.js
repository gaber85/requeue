import React, {Component} from 'react';
import { connect } from "react-redux";
import { fetchPlaylist, removeSong } from '../redux-store/actions'

class NextUp extends Component {
  constructor (props) {
    super (props);
    this.state = {
      favorite: false,
    }
  }

  GET_PLAYLIST_URL = 'http://localhost:3001/playlist';
  REMOVE_SONG_URL = 'http://localhost:3001/remove';

  handleGetPlaylist = () => {
    fetch(`${this.GET_PLAYLIST_URL}/${this.props.user.playlist.playlistId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(tracks => {
      this.props.fetchPlaylist(tracks);
    });
  }

  componentWillMount() {
    this.handleGetPlaylist();
  }

  handleRemoveSong = (id) => {
    fetch(`${this.REMOVE_SONG_URL}/${id}/${this.props.user.playlist.playlistId}`, {
      method: 'delete',
    });
    this.props.removeSong(id);
  }

  toggleLike = () => {
    this.setState({favorite: !this.state.favorite});
  }
  render() {
    const songs = this.props.user.playlist.songs ? this.props.user.playlist.songs : [];
    return (
      <div className="next-up-section">
        <div className="next-up-header">Next Up</div>
        <div className="next-up-table">
          <table>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>Title</th>
                <th>Artist</th>
                <th>Album</th>
                <th>Requested</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {songs 
                ?
                  songs.map((song) => {
                    return (
                      <tr key={song.id}>
                        <td><i className="fas fa-bars"></i></td>
                        <td></td>
                        <td>{song.name}</td>
                        <td>{song.artists}</td>
                        <td>{song.album}</td>
                        <td>Gabe</td>
                        <td><i className="fas fa-ellipsis-h"></i></td>
                        <td className="trash-can" onClick={() => this.handleRemoveSong(song.id)}><i className="far fa-trash-alt"></i></td>
                      </tr>
                    )
                  })
                :
                  (<div></div>)
              }

            </tbody>
          </table>
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
  fetchPlaylist: (song) => dispatch(fetchPlaylist(song)),
  removeSong: (id) => dispatch(removeSong(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NextUp);

//onClick={this.toggleLike}><i className={this.state.favorite ? "fas fa-heart" : "far fa-heart"}></i>