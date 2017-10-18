import { all, fork, take, call, put } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { firebaseUserRegister, firebaseUserSignin, firebaseCurrentUser } from '../firebaseService';
import * as actions from '../constants/actions';

function* registerUser(email, password) {
  const resp = yield call(firebaseUserRegister, email, password);
  if (!resp.code) {
    yield put(actions.registerSuccess());
    yield call(firebaseUserSignin, email, password);
    const user = yield call(firebaseCurrentUser);
    yield put(actions.updateAppUser({ uid: user.uid, email: user.email }));
    browserHistory.push('/');
  } else {
    yield put(actions.registerFailure({ message: resp.message }));
  }
}

function* watchUserRegister() {
  while (true) {
    const { payload } = yield take(actions.REQUEST_REGISTER);
    yield call(registerUser, payload.email, payload.password);
  }
}

export default function* root() {
  yield all([
    fork(watchUserRegister),
  ]);
}
