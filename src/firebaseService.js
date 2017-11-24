import * as firebase from 'firebase';
import * as actions from './constants/actions';
import { FIREBASE_CONFIG } from './config';

export const firebaseService = firebase.initializeApp(FIREBASE_CONFIG);

export const firebaseUserRegister = (email, password) => {
  return firebaseService.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const firebaseUserSignin = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const firebaseUserLogout = () => {
  return firebase.auth().signOut()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const firebaseCurrentUser = () => {
  return firebase.auth().currentUser;
};

export const firebaseInitAuthState = (dispatch) => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebaseService.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          user.getIdToken().then((token) => {
            dispatch(actions.updateAppUser({ uid: user.uid, email: user.email, token }));
          });
        }
        resolve();
        unsubscribe();
      },
      (error) => {
        reject(error);
      },
    );
  });
};
