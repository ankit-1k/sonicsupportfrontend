import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001', {
  transports: ['websocket', 'polling'],
});

const AdminBot = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for user messages
    socket.on('adminReceiveMessage', ({ message, user }) => {
      if (currentUser && user.id === currentUser.id) {
        setMessages((prevMessages) => [...prevMessages, { user: user.name, text: message }]);
      }
    });

    // Listen for user list updates
    socket.on('userList', (userList) => {
      setUsers(userList);
    });

    // Cleanup socket when component unmounts
    return () => {
      socket.off('adminReceiveMessage');
      socket.off('userList');
    };
  }, [currentUser]);

  const sendMessage = () => {
    if (message.trim() && currentUser) {
      socket.emit('adminMessage', { message, userId: currentUser.id });
      setMessages((prevMessages) => [...prevMessages, { user: 'Admin', text: message }]);
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Admin Chat</h2>
      <div>
        <h3>User List</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id} onClick={() => setCurrentUser(user)} style={{ cursor: 'pointer' }}>
              {user.name}
            </li>
          ))}
        </ul>
      </div>

      {currentUser && (
        <div>
          <h3>Chatting with {currentUser.name}</h3>
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
      )}
    </div>
  );
};

export default AdminBot;
