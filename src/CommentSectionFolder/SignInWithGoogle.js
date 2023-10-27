import React, { useContext } from 'react'
import { MyContext } from "./ContexAPI";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase"

const provider = new GoogleAuthProvider();

export default function SignInWithGoogle() {

    const user = useContext(MyContext)
    const { setuserdata } = user;

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            // console.log(result)

            const user = result.user;
            // console.log(user);

            const userEmail = user.email;
            const userdisplayName = user.displayName;
            const userphotoURL = user.photoURL;
            const useruid = user.uid;

            // console.log(userEmail);
            // console.log(userdisplayName);
            // console.log(userphotoURL);
            // console.log(useruid);

            setuserdata({
                user_uid: user.uid,
                user_name: user.email.split("@")[0],
                user_email: user.email,
                user_photoURL: user.photoURL,
            });

            if (typeof localStorage !== 'undefined') {

                localStorage.setItem("user_uid", user.uid);
                localStorage.setItem("user_name", user.email.split("@")[0]);
                localStorage.setItem("user_email", user.email);
                localStorage.setItem("user_photoURL", user.photoURL);

                localStorage.setItem("name", user.displayName);
                localStorage.setItem("email", user.email);
            }

        } catch (error) {
            console.error(error);
        }
    }


    return (
        <button onClick={signInWithGoogle} className="comment_sec_btn" id="comment_sec_sing_in_btn">
            <i className="fa-brands fa-google"></i>
            <span className="comment_sec_text">Sign In With Google</span>
        </button>
    )
}
