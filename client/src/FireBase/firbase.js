// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getAuth } from 'firebase/auth'




const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "rent-a-ride--auth.firebaseapp.com",
  projectId: "rent-a-ride--auth",
  storageBucket: "rent-a-ride--auth.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_ID,
  appId:import.meta.env.VITE_APP_ID
};

const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app)


