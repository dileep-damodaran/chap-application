import React from 'react';

import Chat from './components/chat/chat';
import Join from './components/join/join';

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
    return (
        <Router>
            <Route path="/" exact component={Join} />
            <Route path="/chat" component={Chat} />
        </Router>
    );
}

export default App;