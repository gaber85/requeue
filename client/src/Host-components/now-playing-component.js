import React, {Component} from 'react';

class NowPlaying extends Component {
  constructor (props) {
    super (props);
    this.state = {
      favorite: false,
    }
  }
  toggleLike = () => {
    this.setState({favorite: !this.state.favorite});
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="now-playing-container">
        <div className="now-playing-header">
          <div className="now-playing-text">Now Playing <i className="fas fa-volume-up"></i></div>
          <div className="elipse"><i className="fas fa-ellipsis-h"></i></div>
        </div>
        <div className="now-playing-song-container">
          <img className="album-artwork" src="https://www.billboard.com/files/styles/900_wide/public/media/Pink-Floyd-Dark-Side-of-the-Moon-album-covers-billboard-1000x1000.jpg" alt="album cover"></img>
          <div className="song-info">
            <div className="info"><b>Title:</b> Money</div>
            <div className="info"><b>Album:</b> The Dark Side of the Moon</div>
            <div className="info"><b>Artist:</b> Pink Floyd</div>
            <div className="info"><b>Requested by:</b> Eric</div>
            <div className="info"><b>Likes: </b>1 <b>Dislikes: </b>0 </div>
          </div>
          <div className="like-heart" onClick={this.toggleLike}><i className={this.state.favorite ? "fas fa-heart" : "far fa-heart"}></i></div>
        </div>
      </div>
    );
  }
}

export default NowPlaying;