// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initalize Firebase.
// These details will need to be replaced with the project specific env vars at the start of each new cohort.
var firebaseConfig = {
  apiKey: 'AIzaSyDDFd_8wi06hQHk7Xd6GgwUwTOvVEosdCE',
  authDomain: 'tcl-9-smart-shopping-list.firebaseapp.com',
  databaseURL: 'https://tcl-9-smart-shopping-list.firebaseio.com',
  projectId: 'tcl-9-smart-shopping-list',
  storageBucket: 'tcl-9-smart-shopping-list.appspot.com',
  messagingSenderId: '729631182287',
  appId: '1:729631182287:web:663d13b3e8818623c996ba',
};

let fb = firebase.initializeApp(firebaseConfig);

export { fb };
