import React, {Component} from 'react';
import coverImg from './cover-placeholder.png';

class NowPlaying extends Component {
  constructor (props) {
    super (props);
    this.state = {
      favorite: false,
      access_token: this.props.token,
      deviceId: '',
      loggedIn: false,
      error: "",
      trackName: 'Track Name',
      artistName: 'Artist Name',
      albumName: 'Album Name',
      albumCover: '',
      playing: false,
      position: 0,
      duration: 0,
      nextTracks: '',
    }
    this.playerCheckInterval = null;
  }

  handlePlayer() {
    console.log(this.props.token);
    if (this.props.token) {
      this.setState({ loggedIn: true });
      // check every second for the player
      this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
    }
  }

  checkForPlayer() {
    const { token } = this.props;
    console.log('token', token);
    if (window.Spotify.Player !== undefined) {
      this.player = new window.Spotify.Player({
        name: 'Requeue',
        getOAuthToken: cb => { cb(token) },
        volume: 0.5,
        });
      console.log('player', this.player);
      this.createEventHandlers();
      this.player.connect();
      clearInterval(this.playerCheckInterval);
      console.log('cleared interval');
    }
  }

  transferPlaytoRequeue() {
    const { deviceId, access_token } = this.state;
    fetch('https://api.spotify.com/v1/me/player', {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'device_ids': [ deviceId ],
        'play': false,
      })
    })
  }

  createEventHandlers() {
    this.player.on('initialization_error', e => { console.error(e); });
    this.player.on('authentication_error', e => {
      console.error(e);
      this.setState({ loggedIn: false });
    });
    this.player.on('account_error', e => { console.error(e); });
    this.player.on('playback_error', e => { console.error(e); });
    // Playback status updates
    this.player.on('player_state_changed', state => this.onStateChanged(state)); //this.onStateChanged(state)
    // Ready
    this.player.on('ready', async data => {
      let { device_id } = data;
      console.log("Let's play music!");
      await this.setState({ deviceId: device_id });
      this.transferPlaytoRequeue();
    });
  }

  onStateChanged(state) {
    if (state !== null) {
      const {
        current_track: currentTrack,
        next_tracks: nextSongs,
        position,
        duration,
      } = state.track_window;
      const trackName = currentTrack.name;
      const albumName = currentTrack.album.name;
      const albumCover = currentTrack.album.images.map(image => image.url)[0];
      const artistName = currentTrack.artists.map(artist => artist.name).join(', ');
      const playing = !state.paused;
      const nextTracks = nextSongs.map(song => song);
      this.setState({
        position,
        duration,
        trackName,
        albumName,
        albumCover,
        artistName,
        playing,
        nextTracks,
      });
    }
  }

  //player controls
  onPrevClick() {
    this.player.previousTrack();
  }

  onPlayClick() {
    this.player.togglePlay();
  }

  onNextClick() {
    this.player.nextTrack();
  }

  toggleLike = () => {
    this.setState({favorite: !this.state.favorite});
  }

  render() {
    const {
      // access_token,
      loggedIn,
      artistName,
      trackName,
      albumName,
      albumCover,
      // error,
      // position,
      // duration,
      playing,
    } = this.state

    const cover = coverImg;

    return (
      <div className="now-playing-container">
        
      {loggedIn ?
        (<div className="now-playing-container">
          <div className="now-playing-header">
            <div className="now-playing-text">Now Playing {playing ? (<i className="fas fa-volume-up"></i>) : ''}</div>
            <div className="elipse"><i className="fas fa-ellipsis-h"></i></div>
          </div>
          <div className="now-playing-song-container">
            <img className="album-artwork" src={albumCover ? albumCover : cover} alt="album cover"></img>
            <div className="song-info">
              <div className="info"><b>Title:</b> {trackName}</div>
              <div className="info"><b>Album:</b> {albumName}</div>
              <div className="info"><b>Artist:</b> {artistName}</div>
              <div className="info"><b>Requested by:</b> Eric</div>
              <div className="info"><b>Likes: </b>1 <b>Dislikes: </b>0 </div>
            </div>
            <div className="like-heart" onClick={this.toggleLike}><i className={this.state.favorite ? "fas fa-heart" : "far fa-heart"}></i></div>
          </div>
          <div>
            <button onClick={() => this.onPrevClick()}><i className="fas fa-backward"></i></button>
            <button onClick={() => this.onPlayClick()}>{playing ? (<i className="fas fa-play"></i>) : (<i className="fas fa-pause"></i>)}</button>
            <button onClick={() => this.onNextClick()}><i className="fas fa-forward"></i></button>
            <button onClick={() => this.checkForPlayer()}>Listen Here</button>
          </div>
        </div>)
        :
        (<div className="now-playing-container">
          <div className="titles">Add songs to your queue!</div>
          <button onClick={()=>this.handlePlayer()} className="button center">Play</button>
        </div>)}
      </div>
    );
  }
}

export default NowPlaying;