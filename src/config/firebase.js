import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDvYXRpVWA_4S39bJLocayCWDRAy738LO8",
  authDomain: "i-am-68785.firebaseapp.com",
  databaseURL: "https://i-am-68785.firebaseio.com",
  projectId: "i-am-68785",
  storageBucket: "i-am-68785.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id"
};

if (!firebase.apps.length)
    firebase.initializeApp(firebaseConfig);