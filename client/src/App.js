import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="main-container">
        <div className="nav-bar">
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input className="text-input" type="text" placeholder="Search..."></input>
          </div>
          <div className="user">
            <div className="user-img"><i className="fas fa-user"></i></div>
            <div className="user-name">John</div>
            <div className="logout">Logout</div>
          </div>
        </div>
        <div className="now-playing-container">
          <div className="now-playing-header">
            <div className="now-playing-text">Now Playing <i className="fas fa-volume-up"></i></div>
            <div className="elipse"><i className="fas fa-ellipsis-h"></i></div>
          </div>
          <div className="now-playing-song-container">
            <img className="album-artwork" src="https://www.billboard.com/files/styles/900_wide/public/media/Pink-Floyd-Dark-Side-of-the-Moon-album-covers-billboard-1000x1000.jpg" alt="album cover"></img>
            <div className="song-info">
              <div className="info">Title: </div>
              <div className="info">Album: </div>
              <div className="info">Artist: </div>
              <div className="info">Requested by: </div>
              <div className="info">Likes:0 Dislikes:0 </div>
            </div>
            <div className="like-heart"><i className="far fa-heart"></i></div>
          </div>
        </div>
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
                <tr>
                  <td><i className="fas fa-bars"></i></td>
                  <td><i className="far fa-heart"></i></td>
                  <td>What's the Use?</td>
                  <td>Mac Miller</td>
                  <td>Swimming</td>
                  <td>John</td>
                  <td><i className="fas fa-ellipsis-h"></i></td>
                  <td><i className="far fa-trash-alt"></i></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="sticky-footer">
          <div className="button">Connected User</div>
          <div className="empty"></div>
          <div className="button">History</div>
        </div>
      </div>
    );
  }
}

export default App;
