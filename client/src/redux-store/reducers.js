import { combineReducers } from 'redux';

const defaultState = {
  currentUser: {},
  playlist: {
    songs: [],
  },
}

const user = (state = defaultState, action) => {
  switch(action.type) {
    case 'GET_TOKEN':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          token: action.token,
        }
      };
    case 'GET_USER':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          name: action.name,
          image: action.image,
          id: action.id,
          logged: action.loggedIn,
        }
      }
    case 'GET_PLAYLIST':
      return {
        ...state,
        playlist: {
          ...state.playlist,
          playlistId: action.playlistId,
          codeWord: action.codeWord,
        }
      }
    case 'ADD_SONG':
      return {
        ...state,
        playlist: {
          ...state.playlist,
          songs: [...state.playlist.songs, {
            id: action.id,
            image: action.image,
            name: action.name,
            artists: action.artists,
            album: action.album,
          }]
        }
      }
    case 'REMOVE_SONG':
      const updatedSongList = state.playlist.songs.filter((song) => song.id !== action.id);
      return {
        ...state,
        playlist: {
          ...state.playlist,
          songs: [ ...updatedSongList ]
        }
      }
    case 'FETCH_PLAYLIST':
      return {
        ...state,
        playlist: {
          ...state.playlist,
          songs: action.songs,
        }
      }
    case 'LOGGED_IN':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          logged: action.logged,
        }
      }
    default:
      return state;
  }
}


const reducers = combineReducers({
  user,
})

export default reducers;