import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Connect to your backend URL
const socket = io('https://sonicsupportbackend-uarr.vercel.app', {
    transports: ['websocket', 'polling'],
});

const AdminBot = () => {
    const [message, setMessage] = useState('');
    const [userMessages, setUserMessages] = useState({});
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        socket.on('userListUpdate', (userList) => {
            setUsers(userList);
        });

        socket.on('adminReceiveMessage', ({ userName, text }) => {
            setUserMessages((prevMessages) => ({
                ...prevMessages,
                [userName]: [...(prevMessages[userName] || []), { sender: userName, text }],
            }));
        });

        socket.on('loadUserMessages', ({ userName, messages }) => {
            setUserMessages((prevMessages) => ({
                ...prevMessages,
                [userName]: messages,
            }));
        });

        return () => {
            socket.off('userListUpdate');
            socket.off('adminReceiveMessage');
            socket.off('loadUserMessages');
        };
    }, []);

    const selectUser = (user) => {
        setSelectedUser(user);
        socket.emit('adminSelectUser', user);
    };

    const sendMessage = () => {
        if (message.trim() && selectedUser) {
            socket.emit('adminMessage', { userName: selectedUser, text: message });
            setUserMessages((prevMessages) => ({
                ...prevMessages,
                [selectedUser]: [...(prevMessages[selectedUser] || []), { sender: 'Admin', text: message }],
            }));
            setMessage('');
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
                        {userMessages[selectedUser] &&
                            userMessages[selectedUser].map((msg, index) => (
                                <p key={index}>
                                    <strong>{msg.sender}:</strong> {msg.text}
                                </p>
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

export default AdminBot;
