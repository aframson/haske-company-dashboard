import { signInWithEmailAndPassword} from "firebase/auth";
import { authentication } from "../firebase";

// LoginUser
export function LoginUser(email,password,router,setLoading2){
    setLoading2(true)
    if (email === '' || password === '') {
      setLoading2(false)
      alert("Fields cannot be empty")
    } else {
      signInWithEmailAndPassword(authentication, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          router.push('/dashboard')
        })
        .catch((error) => {
          setLoading2(false)
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/user-not-found') {
            alert("User does not exist")
          } else {
            console.log(errorCode, errorMessage)
          }
        });
    }

  }

