import { combineReducers } from 'redux';

const defaultState = {
  currentUser: {},
  playlist: {
    songs: [],
  },
}

const users = (state = defaultState, action) => {
  switch(action.type) {
    case 'GET_TOKEN':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          token: action.token,
        }
      };
    default:
      return state;
  }
}


const reducers = combineReducers({
  users,
})

export default reducers;