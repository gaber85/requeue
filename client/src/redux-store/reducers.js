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
    default:
      return state;
  }
}


const reducers = combineReducers({
  user,
})

export default reducers;