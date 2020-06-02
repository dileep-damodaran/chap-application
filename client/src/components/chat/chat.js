import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import './chat.css';
import InfoBar from '../infoBar/infoBar';
import Input from '../input/input';
import Messages from '../messages/messages';

let socket;


const Chat = ({ location }) => {

    const [un, setUser] = useState('');
    const [rn, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = '192.168.43.132:5000';

    useEffect(() => {

        const { un, rn } = queryString.parse(location.search);

        setUser(un);
        setRoom(rn);

        socket = io(ENDPOINT, { transports: ['websocket'], upgrade: false })

        socket.emit('join', { un, rn }, (err) => {

            console.log('inside call back');
            if (err)
                alert(err);
        });

        return () => {

            console.log(`${un} is lefing room ${rn}`);
            socket.emit('disconnect', { un, rn });
            socket.off();
        }

    }, [ENDPOINT, location.search]);


    useEffect(() => {

        socket.on('admin-message', (message) => {

            setMessages((messages || []).concat(message));
        });
    }, [messages]);

    useEffect(() => {
        return () => {
            socket.close();
        }
    }, []);

    const sendMessage = (event) => {

        event.preventDefault();

        if (message)
            socket.emit('send-message', socket.id, message, () => setMessage(''))
    };

    // console.log(message, messages);


    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar rn={rn} />
                <Messages messages={messages} un={un} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>

        </div>
    );
}

export default Chat;