import React, { useState } from 'react';
import axios from 'axios';
import './contact.css';
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        website: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://sonicsupportbackend-uarr.vercel.app/api/contact', formData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <div>
            <Navbar />
            <Banner />
            <div className="contact-container mt-5 mb-5">
                <form id="contact" onSubmit={handleSubmit}>
                    <h1 className='text-center mt-1 brand-name m-1 '>Contact</h1>
                    <div className='d-flex justify-content-center mb-4'>
                        <div className='hr bg-dark'></div>
                    </div>
                    <fieldset>
                        <input
                            name="name"
                            placeholder="Your name"
                            type="text"
                            tabIndex="1"
                            required
                            autoFocus
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </fieldset>
                    <fieldset>
                        <input
                            name="email"
                            placeholder="Your Email Address"
                            type="email"
                            tabIndex="2"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </fieldset>
                    <fieldset>
                        <input
                            name="phone"
                            placeholder="Your Phone Number (optional)"
                            type="tel"
                            tabIndex="3"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </fieldset>
                    <fieldset>
                        <input
                            name="website"
                            placeholder="Your Web Site (optional)"
                            type="url"
                            tabIndex="4"
                            value={formData.website}
                            onChange={handleChange}
                        />
                    </fieldset>
                    <fieldset>
                        <textarea
                            name="message"
                            placeholder="Type your message here...."
                            tabIndex="5"
                            required
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                    </fieldset>
                    <fieldset>
                        <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
                    </fieldset>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;
