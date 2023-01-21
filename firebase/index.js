// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDlVskq1gb770BEjKAS0ejOBz8swNamg7g",
    authDomain: "niche1-5d767.firebaseapp.com",
    projectId: "niche1-5d767",
    storageBucket: "niche1-5d767.appspot.com",
    messagingSenderId: "445270424991",
    appId: "1:445270424991:web:9b088bb8f450cfe4bc51aa",
    measurementId: "G-WV840N4KWD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
export const authentication = getAuth(app)