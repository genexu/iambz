import { createAction } from 'redux-actions';

export const REQUEST_REGISTER = 'REQUEST_REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const REGISTER_PREVALIDATE_FAILURE = 'REGISTER_PREVALIDATE_FALIURE';

export const requestRegister = createAction(REQUEST_REGISTER);
export const registerSuccess = createAction(REGISTER_SUCCESS);
export const registerFailure = createAction(REGISTER_FAILURE);
export const registerPreValidateFailure = createAction(REGISTER_PREVALIDATE_FAILURE);

export const UPDATE_APP_USER = 'UPDATE_APP_USER';
export const CLEAR_APP_USER = 'CLEAR_APP_USER';

export const updateAppUser = createAction(UPDATE_APP_USER);
export const clearAppUser = createAction(CLEAR_APP_USER);

export const REQUEST_SIGNIN = 'REQUEST_SIGNIN';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';

export const requestSignin = createAction(REQUEST_SIGNIN);
export const signinSuccess = createAction(SIGNIN_SUCCESS);
export const signinFailure = createAction(SIGNIN_FAILURE);
