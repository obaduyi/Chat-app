import { useState } from "react";
import {addDoc, collection, onSnapshot, orderBy, query, serverTimestamp} from 'firebase/firestore';
import {auth, db} from "../firebase-config";
import "../styles/Chat.css";

export const Chat = () => {
    const {room}= props;
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesRef = collection(db, "messages");
    


    useEffect(()=>{
        const queryMessages = query(messagesRef, where("room", 
        "==".room), orderBy("createdAt") );
        const unsuscribe = onSnapshot(queryMessages, (snapshot) =>{
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id})
            });
            setMessages(messages);
        });
        return() => unsuscribe();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(newMessage === "") return;

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });
        setNewMessage("");
    };

    return(
        <div className="chat_app">
            <div className="header">
                <h1>Welcome to: {room.toUpperCase()}</h1>
            </div>
            <div>
                {messages.map((message) =>(
                    <div className="message" key={message.id}>
                        <span className="user">{message.user}</span>
                        {message.text}
                    </div>
                ))}
            </div>
            <form className="new_message_form">
                <input
                    className="new_message_input"
                    placeholder="Type your message..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                />
                <button type="submit" className="send_button">
                    Send
                </button>
            </form>
        </div>
    );
}; 