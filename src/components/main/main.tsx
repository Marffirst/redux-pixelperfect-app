import React, {useState, useRef} from 'react';

import './main.css';
import {Message} from './message/message';
import {INITIAL_MESSAGES} from './constants';
import { getRandomMessage } from './message/utils/getRandomeMessage';


const Main: React.FC = () => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [currentMessage, setCurrentMessage] = useState('');

    const onMessageReply = () => {
        setTimeout(() => (
            setMessages(prevState => ([
                ...prevState, getRandomMessage()
            ]))
        ), 1000);
    }
    const onMessageSend = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        
    }
    const onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentMessage(e.target.value);
    }
    
    
    const onButtonClick = () => {
        if (currentMessage.trim()) {
            setMessages([...messages, {text: currentMessage, isCurrentUser: true}]);
            setCurrentMessage('');
            onMessageReply();
        }
    }; 
    return (
        <div className="main">
            <div className="main__messages">
                {messages.map(({text, isCurrentUser}, i) => (
                    <Message key={i} text={text} isCurrentUser={isCurrentUser}/>
                ))}
            </div>
            {/* <div className="main__input">
                <form onSubmit={onMessageSend}>
                    <textarea className="main__textarea"
                        ref={textareaRef}
                        value={currentMessage}
                        onChange={onMessageChange}
                    />
                    <button className="main__button" onClick={onButtonClick}>Send message</button>
                </form>
            </div> */}
        </div>
    );




}


export default Main;