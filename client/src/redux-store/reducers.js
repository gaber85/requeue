import { combineReducers } from 'redux';

const users = (state = [], action) => {
  switch(action.type) {
    case 'GET_TOKEN':
      return state;
    default:
      return state;
  }
}


const reducers = combineReducers({
  users,
})

export default reducers;