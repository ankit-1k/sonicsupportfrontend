import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './../AdminNavbar/AdminNavbar'
import Footer from './../../components/Footer/Footer'
import AdminBanner from './../../AdminBanner/AdminBanner'
const AdminNotes = () => {
  const [api, setApi] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState('');
  const [editedAnswer, setEditedAnswer] = useState('');
  const [error, setError] = useState('');

  const getNotes = async () => {
    try {
      const { data } = await axios.get('https://sonicsupportbackend-uarr.vercel.app/questions');
      setApi(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const startEditing = (note) => {
    setEditingNote(note);
    setEditedQuestion(note.question);
    setEditedAnswer(note.answer);
  };

  const saveEdit = async (id) => {
    try {
      console.log(`Sending request to update note with id: ${id}`);
      await axios.put(`https://sonicsupportbackend-uarr.vercel.app/questions/${id}`, {
        question: editedQuestion,
        answer: editedAnswer
      });
      setApi(api.map(note => note._id === id ? { ...note, question: editedQuestion, answer: editedAnswer } : note));
      setEditingNote(null);
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error updating note:', error);
      setError('Failed to update note. Please try again.');
    }
  };

  const deleteNote = async (id) => {
    try {
      console.log(`Sending request to delete note with id: ${id}`);
      await axios.delete(`https://sonicsupportbackend-uarr.vercel.app/questions/${id}`);
      setApi(api.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
      setError('Failed to delete note. Please try again.');
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
      <AdminNavbar />
      <AdminBanner />
      <h2 className="brand-name text-center mt-5 mb-2">Review Notes</h2>
      <div className="container">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {api.length > 0 ? (
          <ul>
            {api.map((note) => (
              <li key={note._id}>
                {editingNote && editingNote._id === note._id ? (
                  <div>
                    <p>
                      <strong>Question:</strong>
                      <input
                        type="text"
                        value={editedQuestion}
                        onChange={(e) => setEditedQuestion(e.target.value)}
                      />
                    </p>
                    <p>
                      <strong>Answer:</strong>
                      <input
                        type="text"
                        value={editedAnswer}
                        onChange={(e) => setEditedAnswer(e.target.value)}
                      />
                    </p>
                    <button onClick={() => saveEdit(note._id)}>Save</button>
                  </div>
                ) : (
                  <div>
                    <p><strong>Question:</strong> {note.question}</p>
                    <p><strong>Answer:</strong> {note.answer}</p>
                    <button className='button bg-success me-1' onClick={() => startEditing(note)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                      </svg>
                    </button>
                    <button className='button bg-danger' onClick={() => deleteNote(note._id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                      </svg>
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No notes available</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminNotes;
