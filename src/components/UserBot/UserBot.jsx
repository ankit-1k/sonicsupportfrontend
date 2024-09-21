import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Update to your server URL in production

const UserBot = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('userReceiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, { user: 'Admin', text: message }]);
        });

        return () => {
            socket.off('userReceiveMessage');
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('userMessage', message);
            setMessages((prevMessages) => [...prevMessages, { user: 'User', text: message }]);
            setMessage('');
        }
    };

    return (
        <div>
            <h2>User Chat p2</h2>
            <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', height: '200px', overflowY: 'scroll' }}>
                {messages.map((msg, index) => (
                    <p key={index}><strong>{msg.user}:</strong> {msg.text}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default UserBot;
