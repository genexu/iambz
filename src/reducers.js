import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import appReducer from './App/reducer';
import registerReducer from './Register/reducer';
import signinReducer from './Signin/reducer';

const reducers = combineReducers({
  appReducer,
  registerReducer,
  signinReducer,
  routing: routerReducer,
});

export default reducers;
