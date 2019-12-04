import { createLogger } from 'redux-logger';
import promise from 'redux-promise-middleware';

const middlewares = [];

// eslint-disable-next-line no-undef
if (__DEV__) {
  middlewares.push(createLogger());
}

middlewares.push(promise);

export default middlewares;
