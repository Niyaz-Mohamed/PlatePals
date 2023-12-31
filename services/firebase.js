// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import config from "./config";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: config.firebaseKey,
  authDomain: "platepals-bb380.firebaseapp.com",
  projectId: "platepals-bb380",
  storageBucket: "platepals-bb380.appspot.com",
  messagingSenderId: "472986729912",
  appId: "1:472986729912:web:20ddd81e045e96be16634d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
