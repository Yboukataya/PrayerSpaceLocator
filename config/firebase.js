import firebase from "firebase/app";
import "firebase/firestore";

// most of this file set up following:
// https://blog.jscrambler.com/getting-started-with-firestore-and-react-native/

var firebaseConfig = {
  apiKey: "AIzaSyDhMiIi1lgsH5S2eY_7bH9KktMo92KH93A",
  authDomain: "musalla-test.firebaseapp.com",
  databaseURL: "https://musalla-test.firebaseio.com",
  projectId: "musalla-test",
  storageBucket: "musalla-test.appspot.com",
  messagingSenderId: "1066496733378",
  appId: "1:1066496733378:web:2c228b90c276dfa3f48b5b",
};

const fb = firebase.initializeApp(firebaseConfig);
const firestore = fb.firestore();

export { firestore };
