import { REQUEST_SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE } from '../constants/actions';

const init = {
  onProgress: false,
  message: '',
};

const signinReducer = (state = init, action) => {
  switch (action.type) {
    case REQUEST_SIGNIN:
      return { ...state, onProgress: true };
    case SIGNIN_SUCCESS:
      return { ...state, onProgress: false, message: '' };
    case SIGNIN_FAILURE:
      return { ...state, onProgress: false, message: action.payload.message };
    default:
      return state;
  }
};

export default signinReducer;
