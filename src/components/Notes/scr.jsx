import React, { useState } from 'react';
import './notes.css';
import NotesBanner from './NotesBanner';
import notesData from './notes.json';

const Notes = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredQuestions, setFilteredQuestions] = useState([]);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = notesData.reduce((acc, section) => {
            const filteredQuestions = section.questions.filter(
                (question) =>
                    question.question.toLowerCase().includes(query) ||
                    question.answer.toLowerCase().includes(query)
            );
            if (filteredQuestions.length > 0) {
                acc.push({ section: section.section, questions: filteredQuestions });
            }
            return acc;
        }, []);

        setFilteredQuestions(filtered);
    };

    const renderFilteredQuestions = () => {
        if (searchQuery.trim() === '') {
            return notesData.map((section, index) => (
                <div key={index}>
                    {/* <h2>{section.section}</h2> */}
                    {section.questions.map((question, idx) => (
                        <div key={idx}>
                            <p><strong>Question:</strong> {question.question}</p>
                            <p><strong>Answer:</strong> {question.answer}</p>
                        </div>
                    ))}
                </div>
            ));
        } else {
            return filteredQuestions.map((section, index) => (
                <div key={index}>
                    <h2>{section.section}</h2>
                    {section.questions.map((question, idx) => (
                        <div key={idx}>
                            <p><strong>Question:</strong> {question.question}</p>
                            <p><strong>Answer:</strong> {question.answer}</p>
                        </div>
                    ))}
                </div>
            ));
        }
    };

    return (
        <div>
            <NotesBanner />
            <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={handleSearch}
            />
            {renderFilteredQuestions()}
        </div>
    );
}

export default Notes;
