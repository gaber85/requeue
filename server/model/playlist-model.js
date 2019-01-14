const mongoose = require('mongoose');

PlaylistSchema = new mongoose.Schema({
  userId: String,
  playlistName: String,
  PlaylistId: String,
  Songs: Array,
});

const Playlist = mongoose.model('Playlist', userSchema);

module.exports = Playlist;