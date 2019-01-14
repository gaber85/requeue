const mongoose = require('mongoose');

PlaylistSchema = new mongoose.Schema({
  userId: String,
  playlistName: String,
  playlistId: String,
  songs: Array,
  codeWord: String,
});

const Playlist = mongoose.model('Playlist', userSchema);

module.exports = Playlist;