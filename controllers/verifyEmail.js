import {  sendEmailVerification } from "firebase/auth";
import { authentication } from "../firebase";






export function verifyEmail(setLoading,setwri) {
    setLoading(true)
    sendEmailVerification(authentication.currentUser)
        .then(() => {
            // Email verification sent!
            console.log("email verification sent")
            setwri('Email verification sent , kindly very it and come back to refresh the page ')
        }).catch((error) => {
            console.log(error)
            setLoading(true)
        });
}