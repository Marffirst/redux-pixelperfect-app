import React, { useRef, useState } from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


import './App.css';
import { Header } from './header/header';
import  Main  from './main/main';

firebase.initializeApp({
  apiKey: "AIzaSyApIASkAArIuH0faS1s4aNj8_VpPs87xIM",
  authDomain: "authentication-module-3f6f6.firebaseapp.com",
  databaseURL: "https://authentication-module-3f6f6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "authentication-module-3f6f6",
  storageBucket: "authentication-module-3f6f6.appspot.com",
  messagingSenderId: "588588379648",
  appId: "1:588588379648:web:e83ae6a489f9f090a172e5",
  measurementId: "G-5F3ERH67YQ"
})

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {
  const [user] = useAuthState(auth as any);
  return (
    <div className="App">
      <Header />
      <Main />
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      
    </>
  )

}
  
/* function SignOut() {
    return auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    )
} */


function ChatRoom()  {
    const dummy = useRef<null | HTMLDivElement>(null);

    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query as any, { idField: 'id' } as any);

    const [formValue, setFormValue] = useState('');

    const sendMessage = async (e : any) => {
        e.preventDefault();

    const user = auth.currentUser;

    if (user) {
        const { uid, photoURL } = user;

        await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
        });

        setFormValue('');
        //scroll to bottom
        dummy.current && dummy.current.scrollIntoView({ behavior: 'smooth' });
        

            } else {
                // can't send message if not signed in
            }
            
        }



    return (<>
        
        <main className="main__input">

        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>

        </main>

        <form onSubmit={sendMessage}>
        <textarea className="main__textarea"
            value={formValue}
            onChange={e => setFormValue(e.target.value)}
        />

        <button type="submit" className="main__button" disabled={!formValue}>Send message</button>

        </form>
    </>)
}



function ChatMessage(props : { message: any }) {
    const { text, uid, photoURL } = props.message;

    const messageClass = uid === auth.currentUser?.uid  ? 'sent' : 'received';

    return (
      <>
        <div className={`message ${messageClass}`}>
          <div className="message__avatar">
            <img
              className="message__image"
              alt="avatar"
              src={
                photoURL ||
                "https://api.adorable.io/avatars/23/abott@adorable.png"
              }
            />
          </div>
          <div className="message__bubble">{text}</div>
        </div>
      </>
    );
} 

export default App;
