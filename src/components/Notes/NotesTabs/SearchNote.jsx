import React, { useState } from 'react';
import notesData from './../notes.json';

const SearchNote = () => {
    const [searchInput, setSearchInput] = useState('');
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const filteredQuestions = searchInput.trim() !== '' ? notesData.flatMap((section) =>
        section.questions.filter((q) =>
            q.question.toLowerCase().includes(searchInput.toLowerCase())
        )
    ) : [];

    const handleSuggestionClick = (question) => {
        setSelectedQuestion(question);
        setSearchInput('');
    };

    return (
        <>
            <div className='search-note'>
                <div className="d-flex justify-content-center">
                    <input
                        type="text"
                        placeholder="Search Question..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className='search-note-input'
                    />
                </div>
                <div className='d-flex justify-content-center'>
                    {searchInput.trim() !== '' && (
                        <div className='search-note-suggestion'>
                            {filteredQuestions.length > 0 ? (
                                filteredQuestions.map((question, index) => (
                                    <div key={index} onClick={() => handleSuggestionClick(question)}>
                                        <i className='p-1'>{question.question}</i>
                                    </div>
                                ))
                            ) : (
                                <div className='not-found'>
                                    <p className="brand-name">
                                        Not Found
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="d-flex justify-content-center mt-5">
                    {selectedQuestion && (
                        <div>
                            <h3>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-circle-fill me-2 qa-icon" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247m2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
                                </svg>
                                {selectedQuestion.question}
                            </h3>
                            <p className='mt-3 d-flex'>
                                <img src="https://cdn-icons-png.flaticon.com/512/171/171037.png" className='qa-icon' alt="" />
                                <i>{selectedQuestion.answer}</i>                                
                            </p>
                        </div>
                    )}
                </div>

            </div>
        </>
    );
};

export default SearchNote;
