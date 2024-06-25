import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './login.css';
import Footer from './../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState('password');
  const [typingTimeout, setTypingTimeout] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://sonicsupportbackend-b5hcrha8x-ankits-projects-1030ff5d.vercel.app/login', {
        email,
        password,
      });
      if (response.status === 200) {
        setIsAuthenticated(true);
        navigate('/admin');
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else if (error.request) {
        console.error('No response received:', error.request);
        alert('No response received from server. Please try again.');
      } else {
        console.error('Error', error.message);
        alert('An error occurred. Please try again.');
      }
    }
  };

  const handlePwdChange = (e) => {
    setPassword(e.target.value);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setShowPwd('text');
    setTypingTimeout(
      setTimeout(() => {
        setShowPwd('password');
      }, 1000)
    );
  };

  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  return (
    <>
    <Navbar />
      <div className="main-container">
        <div className="container">
          <div className="login-container" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
            <form className="login-form" onSubmit={handleSubmit}>
              <h2 className="login-title brand-name">Login</h2>
              <div className="form-group">
                <label htmlFor="email">UserName:</label>
                <input
                  type="text"
                  id="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type={showPwd}
                  id="password"
                  className="form-input"
                  value={password}
                  onChange={handlePwdChange}
                  required
                />
              </div>
              <button type="submit" className="login-button button">Login</button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Login;