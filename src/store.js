import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import reducers from './reducers';

const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);

export const addListener = createReduxBoundAddListener('root');

export default function configureStore() {
  const enhancer = compose(
    applyMiddleware(thunk),
    applyMiddleware(logger),
    applyMiddleware(navMiddleware),
  );

  const store = createStore(reducers, enhancer);

  return store;
}
