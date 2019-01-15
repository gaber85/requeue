import React, {Component} from 'react';
import { connect } from "react-redux";
import { addSongToPlaylist, removeSong } from '../redux-store/actions'

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
    fetch(`${this.GET_PLAYLIST_URL}/${'0GxFN5mT4MF7NXklfZOJY3'}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(tracks => {
      tracks.forEach(track => {
        this.props.addSongToPlaylist(track);
      });
    });
  }

  componentWillMount() {
    this.handleGetPlaylist();
  }

  handleRemoveSong = (id) => {
    fetch(`${this.REMOVE_SONG_URL}/${id}`, {
      method: 'delete'
    });
    this.props.removeSong(id);
  }

  toggleLike = () => {
    this.setState({favorite: !this.state.favorite});
  }
  render() {
    const { songs } = this.props.user.playlist;
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
  addSongToPlaylist: (song) => dispatch(addSongToPlaylist(song)),
  removeSong: (id) => dispatch(removeSong(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NextUp);

//onClick={this.toggleLike}><i className={this.state.favorite ? "fas fa-heart" : "far fa-heart"}></i>