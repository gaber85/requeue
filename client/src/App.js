import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="main-container">
        <div className="nav-bar">
          <div className="search-bar"></div>
          <div className="user">
            <div className="user-img"></div>
            <div className="user-name"></div>
            <div className="logout"></div>
          </div>
        </div>
        <div className="now-playing-container">
          <div className="now-playing-header">
            <div className="now-playing-text">Now Playing (speaker)</div>
            <div className="elipse">(...)</div>
          </div>
          <div className="now-playing-song-container">
            <div className="album-artwork"></div>
            <div className="song-info">
              <div>Title: </div>
              <div>Album: </div>
              <div>Artist: </div>
              <div>Requested by: </div>
              <div>Likes:0 Dislikes:0 </div>
            </div>
            <div className="like-heart">(heart)</div>
          </div>
        </div>
        <div className="next-up-section">
          <div className="next-up-header">Next Up</div>
          <div className="next-up-table">
            <table>
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
              <tr>
                <th><i class="fas fa-bars"></i></th>
                <th><i class="far fa-heart"></i></th>
                <th>What's the Use?</th>
                <th>Mac Miller</th>
                <th>Swimming</th>
                <th>John</th>
                <th><i class="fas fa-ellipsis-h"></i></th>
                <th><i class="far fa-trash-alt"></i></th>
              </tr>
            </table>
          </div>
        </div>
        <div className="sticky-footer">
          <div className="button">Connected User</div>
          <div className="button">History</div>
        </div>
      </div>
    );
  }
}

export default App;
