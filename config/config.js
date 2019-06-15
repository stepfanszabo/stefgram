import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD83b0EvwpRPJ_3B2kOjeWApkSETlVTqxI",
    authDomain: "webmobil.firebaseapp.com",
    databaseURL: "https://webmobil.firebaseio.com",
    projectId: "webmobil",
    storageBucket: "webmobil.appspot.com",
    messagingSenderId: "239747894984",
    appId: "1:239747894984:web:827281e11a5fd477"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const f = firebase;
  export const database = firebase.database();
  export const auth = firebase.auth();
  export const storage = firebase.storage();