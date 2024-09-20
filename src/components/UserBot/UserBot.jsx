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
    // Only run this effect after chat is started and a name is provided
    if (isChatStarted && name) {
      // Load stored messages from local storage
      const storedMessages = JSON.parse(localStorage.getItem(name)) || [];
      setMessages(storedMessages);

      // Listen for admin's reply to the user
      socket.on('userReceiveMessage', (adminMessage) => {
        const updatedMessages = [...storedMessages, { user: 'Admin', text: adminMessage }];
        setMessages(updatedMessages);
        localStorage.setItem(name, JSON.stringify(updatedMessages)); // Store in local storage
      });
    }

    // Cleanup function to avoid memory leaks
    return () => {
      socket.off('userReceiveMessage');
    };
  }, [isChatStarted, name]); // Only run effect when chat starts and name is set

  const startChat = () => {
    if (name.trim()) {
      socket.emit('userConnected', name); // Send the user's name to the server
      setIsChatStarted(true);
    }
  };

  const sendMessage = () => {
    if (message.trim() && isChatStarted) {
      const updatedMessages = [...messages, { user: name, text: message }];
      socket.emit('userMessage', { userName: name, text: message });
      setMessages(updatedMessages);
      setMessage(''); // Clear the input field
      localStorage.setItem(name, JSON.stringify(updatedMessages)); // Store in local storage
    }
  };

  return (
    <div>
      {!isChatStarted ? (
        <div>
          <h2>Enter Your Name to Start Chat</h2>
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
          <h2>User Chat</h2>
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
