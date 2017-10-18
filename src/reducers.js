import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import appReducer from './App/reducer';
import registerReducer from './Register/reducer';

const reducers = combineReducers({
  appReducer,
  registerReducer,
  routing: routerReducer,
});

export default reducers;
