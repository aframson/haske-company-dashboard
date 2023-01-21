import { onAuthStateChanged } from "firebase/auth";
import { authentication } from "../firebase";


// check user Auth
export function CheckUserAuthIn(setLoading, router) {

    setLoading(true)
    onAuthStateChanged(authentication, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            console.log('uid', uid)
            // ...
            router.push('/dashboard')

        } else {
            setLoading(false)
            // User is signed out
            // ...
        }
    });
}



export function CheckUserAuthOutBasic(setLoading,router) {
    setLoading(true)
    onAuthStateChanged(authentication, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            console.log('uid', user.emailVerified)
            setLoading(false)
            // ...
        } else {
            // User is signed out
            // ...
            router.push('/')

        }
    });
}

export function CheckUserAuthOut(setLoading,setCheckEmailUser,router) {
    setLoading(true)
    onAuthStateChanged(authentication, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;

            console.log('uid', user.emailVerified)
            setCheckEmailUser(user.emailVerified)
            setLoading(false)
            // ...
        } else {
            // User is signed out
            // ...
            router.push('/')

        }
    });
}