import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001', {
  transports: ['websocket', 'polling'],
});

const AdminBot = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Listen for user list updates
    socket.on('userListUpdate', (userList) => {
      setUsers(userList);
    });

    // Listen for user messages
    socket.on('adminReceiveMessage', ({ userName, text }) => {
      if (userName === selectedUser) {
        const updatedMessages = [...messages, { user: userName, text }];
        setMessages(updatedMessages);
        localStorage.setItem(`chat_${userName}`, JSON.stringify(updatedMessages)); // Store in local storage
      }
    });

    // Cleanup socket when component unmounts
    return () => {
      socket.off('adminReceiveMessage');
      socket.off('userListUpdate');
    };
  }, [selectedUser, messages]);

  const selectUser = (user) => {
    setSelectedUser(user);

    // Retrieve messages from local storage
    const storedMessages = JSON.parse(localStorage.getItem(`chat_${user}`)) || [];
    setMessages(storedMessages);
  };

  const sendMessage = () => {
    if (message.trim() && selectedUser) {
      const updatedMessages = [...messages, { user: 'Admin', text: message }];
      socket.emit('adminMessage', { userName: selectedUser, text: message });
      setMessages(updatedMessages);
      setMessage(''); // Clear the input field
      localStorage.setItem(`chat_${selectedUser}`, JSON.stringify(updatedMessages)); // Store in local storage
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <div>
        <h3>Users</h3>
        <ul>
          {users.map((user, index) => (
            <li key={index} onClick={() => selectUser(user)} style={{ cursor: 'pointer' }}>
              {user}
            </li>
          ))}
        </ul>
      </div>

      {selectedUser && (
        <div>
          <h3>Chat with {selectedUser}</h3>
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
