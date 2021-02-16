import * as firebase from "firebase";
// const {
//   apiKey,
//   authDomain,
//   databaseURL,
//   projectId,
//   storageBucket,
// } = getEnvVars();
// Initialize Firebase
const firebaseConfig = {
  // apiKey: `${apiKey}`,
  // authDomain: `${authDomain}`,
  // databaseURL: `${databaseURL}`,
  // projectId: `${projectId}`,
  // storageBucket: `${storageBucket}`,
  apiKey: "mAIzaSyDvYXRpVWA_4S39bJLocayCWDRAy738LO8",
  authDomain: "i-am-68785.firebaseapp.com",
  databaseURL: "https://i-am-68785.firebaseio.com",
  projectId: "i-am-68785",
  storageBucket: "i-am-68785.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id",
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
