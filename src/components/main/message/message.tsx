import React from 'react';

import './message.css';

const CURRENT_USER_AVATAR_URL = 'https://randomuser.me/api/portraits/lego/1.jpg';
const SECOND_USER_AVATAR_URL = 'https://randomuser.me/api/portraits/lego/2.jpg';

export const Message = ({text, isCurrentUser}: { text: String; isCurrentUser: Boolean }) => (
    <div className={`message ${isCurrentUser ? '' : 'message_second'}`}>
        <div className="message__avatar">
            <img
                className="message__image"
                src={isCurrentUser ? CURRENT_USER_AVATAR_URL : SECOND_USER_AVATAR_URL}
                alt="lego"
            />
        </div>
        <div className="message__bubble">{text}</div>
    </div>
);
