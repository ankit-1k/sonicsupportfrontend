import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landingpage from './components/Landingpage/Landingpage';
// import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Aboutus from './components/Aboutus/Aboutus';
import Notes from './components/Notes/Note';
import Login from './components/Login/Login';
import Admin from './Admin/Admin';
import './App.css';
import AdminNotes from './Admin/Adminnotes/AdminNotes';
import AdminNews from './Admin/AdminNews/AdminNews';
import AdminProjects from './Admin/AdminProjects/AdminProjects'
import AdminContacts from './Admin/AdminContacts/AdminContacts'
import AdminAboutus from './Admin/AdminAboutus/AdminAboutus'
import UserBot from './components/UserBot/UserBot';
import AdminBot from './Admin/Adminbot/AdminBot';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <div>
          <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path="/news" element={<News />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/userbot" element={<UserBot />} />
            <Route path="/adminbot" element={<AdminBot />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/admin" element={isAuthenticated ? <Admin /> : <Navigate to="/login" />} />
            <Route path="/editnotes" element={isAuthenticated ? <AdminNotes /> : <Navigate to="/login" />} />
            <Route path="/editnews" element={isAuthenticated ? <AdminNews /> : <Navigate to="/login" />} />
            <Route path="/adminprojects" element={isAuthenticated ? <AdminProjects /> : <Navigate to="/login" />} />
            <Route path="/admincontacts" element={isAuthenticated ? <AdminContacts /> : <Navigate to="/login" />} />
            <Route path="/adminaboutus" element={isAuthenticated ? <AdminAboutus /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </BrowserRouter>
      <div className="top-icon">
        <svg onClick={handleScrollToTop} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z" />
        </svg>
      </div>
    </>
  );
};

export default App;