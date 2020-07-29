import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import nav from './nav';

const rootReducer = {
  nav,
  form: formReducer,
};

export default combineReducers(rootReducer);
