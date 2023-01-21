import { signOut } from "firebase/auth";
import { authentication } from "../firebase";



export function logOutUser(router){
    // const response = confirm("Are you sure you want to do that?");
    if (confirm("Are you sure you want to do that?")) {
        // add code if the user pressed the Ok button
        signOut(authentication).then(() => {
            // Sign-out successful.
            router.push('/')
        }).catch((error) => {
            // An error happened.
            console.log(error)
        });
        console.log("Ok was pressed");
    } else {
        // add code if the user pressed the Cancel button
        console.log("Cancel was pressed");
    }

}
