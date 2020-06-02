import React from 'react';
import './message.css';
import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, un }) => {

    let isSentByCurrentUser = false;
    let isAdmin = false;

    const trimmedName = un.trim().toLowerCase();

    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }

    if (user === "admin") {
        isAdmin = true;
    }

    return (
        isSentByCurrentUser
            ? (
                <div className="messageContainer justifyEnd">
                    <div className="messageBox backgroundBlue">
                        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                    </div>
                </div>
            )
            :
            isAdmin ?
                (
                    <div className="">
                        <div className="">
                            <p className="sentText justifyCenter">{ReactEmoji.emojify(text)}</p>
                        </div>
                    </div>
                ) :
                (
                    <div className="messageContainer justifyStart">
                        <div className="messageBox backgroundLight">
                            <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                        </div>
                        <p className="sentText pl-10">{user}</p>
                    </div>
                )


        // (
        //     <div className="messageContainer justifyStart">
        //         <div className="messageBox backgroundLight">
        //             <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
        //         </div>
        //         <p className="sentText pl-10 ">{user}</p>
        //     </div>
        // )
    );
}

export default Message;