import React from 'react';

import sendIcon from '../../icons/send-button.png';
import './input.css';

const Input = ({ setMessage, sendMessage, message }) => (
    < form className="form b-radius-50" >
        <input
            className="input"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
        <button className="sendButton b-radius-50" onClick={e => sendMessage(e)}><img src={sendIcon} alt="Send"></img></button>
    </form>
)

export default Input;