import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdpH8UhJalfM_sSf6ufUhEoWR3ZEQBP1I",
  authDomain: "atlas-hackathon-390302.firebaseapp.com",
  projectId: "atlas-hackathon-390302",
  storageBucket: "atlas-hackathon-390302.appspot.com",
  messagingSenderId: "78549897098",
  appId: "1:78549897098:web:fe14cbcd1432c408f6c273",
  measurementId: "G-RZVVBQ7ENB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);