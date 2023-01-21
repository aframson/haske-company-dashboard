import { createUserWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../firebase";
import { signOut } from "firebase/auth";


// Register User
export function register(setLoading2, cpass, password, email, setMsg, errMsg,router) {
    setLoading2(true)
    if (cpass === password) {
        createUserWithEmailAndPassword(authentication, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Registration', user)
                // add code if the user pressed the Ok button
                signOut(authentication).then(() => {
                    // Sign-out successful.
                    router.push('/')
                }).catch((error) => {
                    // An error happened.
                    console.log(error)
                });
                setMsg('User Created Successfully')
                setLoading2(false)
            })
            .catch((error) => {
                // errMsg("Oops Error Registering")
                setLoading2(false)
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/email-already-in-use') {
                    errMsg("Already have an account")
                }
                if (errorCode === 'auth/invalid-email') {
                    errMsg("Invalid Email adress")
                }
                console.log(errorCode, '-', errorMessage)
            });
    }
    else if (cpass === '' || password === '' || email === '') {
        errMsg("Fileds must not be empty")
    }
    else {
        errMsg("Passwords do not match")
        setLoading2(false)
    }

}