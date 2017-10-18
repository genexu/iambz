import { REQUEST_REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE, REGISTER_PREVALIDATE_FAILURE } from '../constants/actions';

const init = {
  onProgress: false,
  message: '',
};

const registerReducer = (state = init, action) => {
  switch (action.type) {
    case REQUEST_REGISTER:
      return { ...state, onProgress: true };
    case REGISTER_SUCCESS:
      return { ...state, onProgress: false };
    case REGISTER_FAILURE:
      return { ...state, onProgress: false, message: action.payload.message };
    case REGISTER_PREVALIDATE_FAILURE:
      return { ...state, message: action.payload.message };
    default:
      return state;
  }
};

export default registerReducer;
