import { combineReducers } from 'redux';
import reducerList from './reducerList';

const appReducer = combineReducers({
  data: reducerList,
});

export default appReducer;
