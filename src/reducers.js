import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import appReducer from './App/reducer';

const reducers = combineReducers({
  appReducer,
  routing: routerReducer,
});

export default reducers;
