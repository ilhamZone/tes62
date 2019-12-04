import { createStore, applyMiddleware } from 'redux';
import appReducer from './reducers';
import middleware from './middleware';

const store = createStore(appReducer, {}, applyMiddleware(...middleware));

export { store };
