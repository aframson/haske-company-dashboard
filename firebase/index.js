// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyBLkjdECORusiHhf-1i15GOjPdzgBDkaSE",
  authDomain: "haske-admin.firebaseapp.com",
  projectId: "haske-admin",
  storageBucket: "haske-admin.appspot.com",
  messagingSenderId: "741261095593",
  appId: "1:741261095593:web:898ead15b24f6169bc6fb8",
  measurementId: "G-TNJ0ETWH9M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
export const authentication = getAuth(app)