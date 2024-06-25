import React, { useState } from 'react';
import axios from 'axios';
import './../../Styles/modal.css'
import warningImg from './../../assets/img/warning.gif'
import successImg from './../../assets/img/success.gif'
const Upload = () => {
    const [subject, setSubject] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isOpensuccess, setIsOpensuccess] = useState(false);
    const [isOpenFailed, setisOpenFailed] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!subject || !question || !answer) {
            setisOpenFailed(true)
            return;
        }

        try {
            const response = await axios.post('https://sonicsupportbackend-btyni57t3-ankits-projects-1030ff5d.vercel.app/upload', { subject, question, answer });
            console.log(response.data);
            setIsOpensuccess(true)
            // Optionally, clear the form fields after successful submission
            setSubject('');
            setQuestion('');
            setAnswer('');
        } catch (error) {
            console.error('There was an error submitting the form!', error);
            alert('Error submitting the question, please try again.');
        }
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="subject">Select Subject</label>
                <select
                    className='form-select upload-input'
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                >
                    <option value="">---SELECT---</option>
                    <option value="IMPORTANT FOR INTERVIEW">IMPORTANT FOR INTERVIEW</option>
                    <option value="html">Html</option>
                    <option value="css">CSS</option>
                    <option value="javascript">Javascript</option>
                    <option value="react">React Js</option>
                    <option value="nodejs">Node Js</option>
                </select>
                <label htmlFor="question">Question</label>
                <textarea
                    id="question"
                    placeholder='Enter Your Question'
                    className='form-control upload-input'
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                ></textarea>
                <label htmlFor="answer">Answer</label>
                <textarea
                    id="answer"
                    placeholder='Enter Your Answer'
                    className='form-control upload-input'
                    rows={4}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                ></textarea>
                <button type='submit' className='button mt-2'>Submit</button>
            </form>
            {/* success */}
            {isOpensuccess && (
                <div className="modal-backdrop">
                    <dialog className="modal-custom" style={{ position: 'relative' }} open>
                        <div className="d-flex justify-content-center mt-5">
                            <img src={successImg} className='warning-img' alt="" />
                        </div>
                        <div className='para-less-mp'>
                            <p className='fw-bold text-center lead'>Thanks You</p>
                            <p className="text-muted text-center">Your Q/A Uploaded Successfully</p>
                            <p className="text-muted text-center text-sm">You can search or check</p>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button className="button w-25 mt-2" onClick={() => setIsOpensuccess(false)}>Close</button>
                        </div>
                    </dialog>
                </div>
            )}
            {/* failed */}
            {isOpenFailed && (
                <div className="modal-backdrop">
                    <dialog className="modal-custom" style={{ position: 'relative' }} open>
                        <div className="d-flex justify-content-center mt-5">
                            <img src={warningImg} className='warning-img' alt="" />
                        </div>
                        <p className='fw-bold text-center'>All Fields Required</p>
                        <div className="d-flex justify-content-center">
                            <button className="button w-25 mt-2" onClick={() => setisOpenFailed(false)}>Close</button>
                        </div>
                    </dialog>
                </div>
            )}
        </div>
    );
};

export default Upload;
