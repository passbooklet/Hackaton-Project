import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,updateProfile} from "firebase/auth";


// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyDK9V7dD8JWOjb1kq0UEzUxh8YUsFmVKw0",
  authDomain: "heckatonfirst.firebaseapp.com",
  projectId: "heckatonfirst",
  storageBucket: "heckatonfirst.appspot.com",
  messagingSenderId: "955737297380",
  appId: "1:955737297380:web:501f2f53c7b6742ad037f1",
  measurementId: "G-5J44QDS0S1"
};
// logintodo

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage= getStorage(app);
const auth = getAuth(app);


// Initialize Cloud Firestore and get a reference to the service

export {auth, createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile,db,storage}
