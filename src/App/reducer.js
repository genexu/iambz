import { UPDATE_APP_USER } from '../constants/actions';

const init = {
  uid: '',
  email: '',
};

const appReducer = (state = init, action) => {
  switch (action.type) {
    case UPDATE_APP_USER: {
      const data = state;
      Object.keys(action.payload).forEach((key) => {
        data[key] = action.payload[key];
      });
      return data;
    }
    default:
      return state;
  }
};

export default appReducer;
