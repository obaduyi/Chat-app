import{auth, provider} from "../firebase-config.js";
import {signInWithPopUp} from "firebase/auth"
import Cookies from "universal-cookie";

import Cookies from "universal-cookie";
const cookies =  new Cookies();

export const Auth = (props) => {
    const {setIsAuth} = props;
    const signIn = async() => {
        try{
            const result = await signInWithPopUp(auth, provider);
        cookies.set("auth-token", result.user.refreshToken);
        setIsAuth(true);
        } catch(err){
            console.error(err);
        }
    };

    return <div className="auth">
        <p>Sign in to continue</p>
        <button onClick={signIn}>Sign in with Google</button>
    </div>
}