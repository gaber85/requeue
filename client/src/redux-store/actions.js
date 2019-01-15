export const getToken = (token) => ({
  type: 'GET_TOKEN',
  token: token,
});

export const getUser = (name, imageURL, id) => ({
  type: 'GET_USER',
  name: name,
  image: imageURL,
  id: id,
});

export const getPlaylist = (playlistId, codeWord) => ({
  type: 'GET_PLAYLIST',
  playlistId: playlistId,
  codeWord: codeWord,
});

export const addSongToPlaylist = (song) => ({
  type: 'ADD_SONG',
  id: song.id,
  image: song.image,
  name: song.name,
  artists: song.artists,
  album: song.album,
});

export const removeSong = (id) => ({
  type: 'REMOVE_SONG',
  id: id,
});

export const fetchPlaylist = (songs) => ({
  type: 'FETCH_PLAYLIST',
  songs: songs,
});
