

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVAw8BMDue6WMh1KfJgD4v97hwRdj5It8",
  authDomain: "chat-app-93e55.firebaseapp.com",
  projectId: "chat-app-93e55",
  storageBucket: "chat-app-93e55.appspot.com",
  messagingSenderId: "808904802665",
  appId: "1:808904802665:web:a52a819c27d97564983df8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);