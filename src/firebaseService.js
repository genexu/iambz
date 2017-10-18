import * as firebase from 'firebase';

const config = {
  apiKey: '<API_KEY>',
  authDomain: '<PROJECT_ID>.firebaseapp.com',
  databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
  projectId: '<PROJECT_ID>',
  storageBucket: '<BUCKET>.appspot.com',
  messagingSenderId: '<MS_ID>',
};

export const firebaseService = firebase.initializeApp(config);

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

export const firebaseCurrentUser = () => {
  return firebase.auth().currentUser;
};
