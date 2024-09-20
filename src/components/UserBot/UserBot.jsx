import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001', {
  transports: ['websocket', 'polling'],
});

const UserBot = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isChatStarted, setIsChatStarted] = useState(false);

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

  const startChat = () => {
    if (name.trim()) {
      socket.emit('join', name);
      setIsChatStarted(true);
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('userMessage', message);
      setMessages((prevMessages) => [...prevMessages, { user: name, text: message }]);
      setMessage('');
    }
  };

  return (
    <div>
      {!isChatStarted ? (
        <div>
          <h2>Enter Your Name</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
          />
          <button onClick={startChat}>Start Chat</button>
        </div>
      ) : (
        <div>
          <h2>Chat as {name}</h2>
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
      )}
    </div>
  );
};

export default UserBot;
