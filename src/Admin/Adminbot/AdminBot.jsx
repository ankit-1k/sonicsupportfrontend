import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001', {
  transports: ['websocket', 'polling'],
});

const AdminBot = () => {
  const [message, setMessage] = useState('');
  const [userMessages, setUserMessages] = useState({}); // Store messages for all users
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    socket.on('userListUpdate', (userList) => {
      setUsers(userList);
    });

    socket.on('adminReceiveMessage', ({ userName, text }) => {
      setUserMessages((prevMessages) => {
        const updatedMessages = {
          ...prevMessages,
          [userName]: [...(prevMessages[userName] || []), { user: userName, text }],
        };
        localStorage.setItem(`chat_${userName}`, JSON.stringify(updatedMessages[userName]));
        return updatedMessages;
      });
    });

    return () => {
      socket.off('adminReceiveMessage');
      socket.off('userListUpdate');
    };
  }, []);

  const selectUser = (user) => {
    setSelectedUser(user);
    const storedMessages = JSON.parse(localStorage.getItem(`chat_${user}`)) || [];
    setUserMessages((prevMessages) => ({
      ...prevMessages,
      [user]: storedMessages,
    }));
  };

  const sendMessage = () => {
    if (message.trim() && selectedUser) {
      const updatedMessages = [...(userMessages[selectedUser] || []), { user: 'Admin', text: message }];
      socket.emit('adminMessage', { userName: selectedUser, text: message });
      setUserMessages((prevMessages) => ({
        ...prevMessages,
        [selectedUser]: updatedMessages,
      }));
      setMessage('');
      localStorage.setItem(`chat_${selectedUser}`, JSON.stringify(updatedMessages));
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
            {(userMessages[selectedUser] || []).map((msg, index) => (
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
