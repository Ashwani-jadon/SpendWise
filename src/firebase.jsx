// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKgu6D-0WJJx-JxDlBMP3g0HyijUDdUqo",
  authDomain: "login-bd3a5.firebaseapp.com",
  projectId: "login-bd3a5",
  storageBucket: "login-bd3a5.appspot.com",
  messagingSenderId: "49667541960",
  appId: "1:49667541960:web:38c751a57c29ee7bef8efd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider,db };
