import * as firebase from 'firebase';
import getEnvVars from '../../environment';
const { apiKey, authDomain, databaseURL, projectId, storageBucket } = getEnvVars();
// Initialize Firebase
const firebaseConfig = {
  apiKey: `${apiKey}`,
  authDomain: `${authDomain}`,
  databaseURL: `${databaseURL}`,
  projectId: `${projectId}`,
  storageBucket: `${storageBucket}`,
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id"
};

if (!firebase.apps.length)
    firebase.initializeApp(firebaseConfig);