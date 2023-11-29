import React, { useState, useRef } from "react";
import "./chat.css";
import {Auth} from "./components/Auth";
import Cookies from "universal-cookie";
import {Chat} from "./components/chat";

import { signOut } from "firebase/auth";
import {auth} from "./firebase-config";
const cookies = new Cookies();

function chat(){
    const[isAuth, setIsAuth] = useState(cookies.get("auth-token"));
    const [room, setRoom] = useState(null);

    const roomInputRef = useRef(null);
    const signuserOut = async () => {
        await signOut();
        cookies.remove("auth-token");
        setIsAuth(false);
        setRoom(null)
    };

    if (!isAuth){
        return(
            <div><Auth setIsAuth = {setIsAuth}/></div>
        );
    }

    return(
        <>
            {room? (
                 <Chat room={room}/>
            ):(
                <div className="room">
                    <label>Enter Room Name</label>
                    <input ref={roomInputRef}/>
                    <button onClick={() => setRoom(roomInputRef.current.value)}>
                    Enter Chat
                    </button>
                </div>
            )}
            <button onClick={signuserOut}>Log Out</button>
        </>
    )
}

export default chat;