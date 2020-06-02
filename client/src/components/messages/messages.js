import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './message/message';
import './messages.css';

const Messages = ({ messages, un }) => (
    <ScrollToBottom className="messages">
        {messages.map((message, i) => <div key={i}><Message message={message} un={un} /></div>)}
    </ScrollToBottom>
);

export default Messages;