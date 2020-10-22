import firebase from "firebase/app";
import "firebase/firestore";

// most of this file set up following:
// https://blog.jscrambler.com/getting-started-with-firestore-and-react-native/

var firebaseConfig = {
  apiKey: "AIzaSyAz7kUCB102_eT2R0F7diW47wczPlqCtck",
  authDomain: "musalla-ea1ab.firebaseapp.com",
  databaseURL: "https://musalla-ea1ab.firebaseio.com",
  projectId: "musalla-ea1ab",
  storageBucket: "musalla-ea1ab.appspot.com",
  messagingSenderId: "239388429818",
  appId: "1:239388429818:web:33ff0293e7b54e6e7b6843",
  measurementId: "G-XX7D5YSDS3",
};

const fb = firebase.initializeApp(firebaseConfig);
const firestore = fb.firestore();

export { firestore };
