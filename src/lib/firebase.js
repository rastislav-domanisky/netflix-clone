import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA1luOVCuZSehMnZ769IbQ7L6ehB6zh1M0",
  authDomain: "netflix-ff727.firebaseapp.com",
  databaseURL: "https://netflix-ff727-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "netflix-ff727",
  storageBucket: "netflix-ff727.appspot.com",
  messagingSenderId: "852410708289",
  appId: "1:852410708289:web:925dda3e417bb9f8d6f1c0",
  measurementId: "G-WY4Y9B5PVX"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const db = firebase.firestore();
export const realDb = firebase.database();
export const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;
