import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers'
import App from './App';
import Signin from './Signin';
import Register from './Register';
import './index.css';

const store = createStore(reducers);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="signin" component={Signin}/>
        <Route path="register" component={Register}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
