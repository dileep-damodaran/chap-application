import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './join.css';

export default function SignIn() {
    const [un, setUser] = useState('');
    const [rn, setRoom] = useState('');

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div>
                    <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setUser(event.target.value)} />
                </div>
                <div>
                    <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
                </div>
                <Link onClick={e => (!un || !rn) ? e.preventDefault() : null} to={`/chat?un=${un}&rn=${rn}`}>
                    <button className={'button mt-20'} type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    );
}