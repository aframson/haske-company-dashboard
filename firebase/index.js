// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBKgOaWNRha3BWv-hWKMbSg4UQXF3jDFp0",
    authDomain: "soma-admin-e25a1.firebaseapp.com",
    projectId: "soma-admin-e25a1",
    storageBucket: "soma-admin-e25a1.appspot.com",
    messagingSenderId: "454948344961",
    appId: "1:454948344961:web:a2d479afc8d623eb8de980",
    measurementId: "G-YG81VJ80Q7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
export const authentication = getAuth(app)