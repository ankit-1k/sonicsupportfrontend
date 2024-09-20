import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001', {
  transports: ['websocket', 'polling'],
});

const AdminBot = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for user messages
    socket.on('adminReceiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, { user: 'User', text: message }]);
    });

    // Cleanup socket when component unmounts
    return () => {
      socket.off('adminReceiveMessage');
    };
  }, []);

  const sendMessage = () => {
    // Send admin's reply to the server
    if (message.trim()) {
      socket.emit('adminMessage', message);
      setMessages((prevMessages) => [...prevMessages, { user: 'Bot', text: message }]);
      setMessage(''); // Clear the input field
    }
  };

  return (
    <div>
      <h2>Admin Chat</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', height: '200px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <p key={index}><strong>{msg.user}:</strong> {msg.text}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a reply"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default AdminBot;
