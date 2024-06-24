import React from 'react'
import './about.css'
import logo from './../assets/img/logo-white.png'
const About = () => {
    return (
        <div>
            <section className="about">
                <h1 className='text-center mt-5 brand-name m-1 '>About US</h1>
                <div className='d-flex justify-content-center'>
                    <div className='hr bg-dark'></div>
                </div>
                <p className='fw-bold mt-4'>
                    Voice-Powered Q&A Platform...
                </p>
                <div className="about-info">
                    <div className="about-img">
                        <img src={logo} alt="Geeksforgeeks" />
                    </div>
                    <div>
                        <p> Welcome to <span className='brand-name'>SonicSupport</span>, where conversations thrive through voice interaction. We enable seamless question-and-answer exchanges, solely through voice commands. Our mission is to revolutionize online engagement, making information more accessible and conversations more dynamic. Experience the power of spoken communication with <span className='brand-name'>SonicSupport</span>.</p>
                        <button className='button read-more' onClick={()=>window.open('https://ankit5116k.netlify.app/')}>Read More...</button>
                    </div>
                </div>
            </section>

            <section className="team">
                <h1 className='text-center mt-5 brand-name m-1'>Meet Our Team</h1>
                <div className='d-flex justify-content-center'>
                    <div className='hr bg-dark'></div>
                </div>
                <div className="team-cards">
                    <div className="card">
                        <div className="card-img">
                            <img className='about-logo' src="https://media.geeksforgeeks.org/wp-content/uploads/20230822183347/man-portrait-businessman-male.jpg" alt="User 1" />
                        </div>
                        <div className="card-info">
                            <h2 className="card-name">Ankit</h2>
                            <p className="card-role">CEO and Founder</p>
                            <p className="card-email">pandaankit167@gmail.com</p>
                            <p><button className="button">Contact</button></p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-img">
                            <img src="https://media.geeksforgeeks.org/wp-content/uploads/20230822183347/man-portrait-businessman-male.jpg" alt="User 2" />
                        </div>
                        <div className="card-info">
                            <h2 className="card-name">Miller</h2>
                            <p className="card-role">Co-Founder</p>
                            <p className="card-email">Miller@example.com</p>
                            <p><button className="button">Contact</button></p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-img">
                            <img src="https://media.geeksforgeeks.org/wp-content/uploads/20230824122630/business-office-business-woman-professional.jpg" alt="User 3" />
                        </div>
                        <div className="card-info">
                            <h2 className="card-name">Joe</h2>
                            <p className="card-role">Co-Founder</p>
                            <p className="card-email">Joe@example.com</p>
                            <p><button className="button">Contact</button></p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About