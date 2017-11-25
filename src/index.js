import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import rootSaga from './sagas';
import App from './App';
import Signin from './Signin';
import Register from './Register';
import Space from './Space';
import { firebaseInitAuthState } from './firebaseService';
import './index.css';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

const history = syncHistoryWithStore(browserHistory, store);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <Route path="signin" component={Signin} />
          <Route path="register" component={Register} />
          <Route path="space/:uid" component={Space} />
        </Route>
      </Router>
    </Provider>,
    document.getElementById('root'),
  );
};

registerServiceWorker();

firebaseInitAuthState(store.dispatch)
  .then(() => render());
