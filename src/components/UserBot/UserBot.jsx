import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('https://sonicsupportbackend-uarr.vercel.app', {
  transports: ['websocket', 'polling'],
});

const UserBot = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for admin's reply to the user
    socket.on('userReceiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, { user: 'Admin', text: message }]);
    });

    // Cleanup socket when component unmounts
    return () => {
      socket.off('userReceiveMessage');
    };
  }, []);

  const sendMessage = () => {
    // Send user's message to the server
    if (message.trim()) {
      socket.emit('userMessage', message);
      setMessages((prevMessages) => [...prevMessages, { user: 'User', text: message }]);
      setMessage(''); // Clear the input field
    }
  };

  return (
    <div>
      <h2>User Chat p1</h2>
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