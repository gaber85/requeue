import React, {Component} from 'react';
//import Script from 'react-load-script';

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
      playing: false,
      position: 0,
      duration: 0,
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
    // this.player.getCurrentState().then(state => {
    //   if (!state) {
    //     console.error('User is not playing music through the Web Playback SDK');
    //     return;
    //   }
    
    //   let {
    //     current_track,
    //     next_tracks: [next_track]
    //   } = state.track_window;
    
    //   console.log('Currently Playing', current_track);
    //   console.log('Playing Next', next_track);
    // });
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
    this.player.on('player_state_changed', state => { console.log(state); });
  
    // Ready
    this.player.on('ready', data => {
      let { device_id } = data;
      console.log("Let's play music!");
      this.setState({ deviceId: device_id });
    });
  }

  onStateChanged(state) {
    if (state !== null) {
      
    }
  }

  toggleLike = () => {
    this.setState({favorite: !this.state.favorite});
  }

  componentDidMount() {
    //this.handlePlayer();
    //this.checkForPlayer();
    console.log('token',this.props.token);
  }

  render() {
    const {
      // access_token,
      loggedIn,
      artistName,
      trackName,
      albumName,
      // error,
      // position,
      // duration,
      // playing,
    } = this.state

    return (
      <div className="now-playing-container">
        
      {loggedIn ?
        (<div className="now-playing-container">
          <div className="now-playing-header">
            <div className="now-playing-text">Now Playing <i className="fas fa-volume-up"></i></div>
            <div className="elipse"><i className="fas fa-ellipsis-h"></i></div>
          </div>
          <div className="now-playing-song-container">
            <img className="album-artwork" src="https://www.billboard.com/files/styles/900_wide/public/media/Pink-Floyd-Dark-Side-of-the-Moon-album-covers-billboard-1000x1000.jpg" alt="album cover"></img>
            <div className="song-info">
              <div className="info"><b>Title:</b> {trackName}</div>
              <div className="info"><b>Album:</b> {albumName}</div>
              <div className="info"><b>Artist:</b> {artistName}</div>
              <div className="info"><b>Requested by:</b> Eric</div>
              <div className="info"><b>Likes: </b>1 <b>Dislikes: </b>0 </div>
            </div>
            <div className="like-heart" onClick={this.toggleLike}><i className={this.state.favorite ? "fas fa-heart" : "far fa-heart"}></i></div>
          </div>
        </div>)
        :
        (<div className="now-playing-container">
          <div className="host-title">Add songs to your queue!</div>
          <div className="host-title"><button onClick={()=>this.handlePlayer()}>Play</button></div>
        </div>)}
      </div>
    );
  }
}

export default NowPlaying;