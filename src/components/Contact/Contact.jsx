import React from 'react'
import './contact.css'
import Banner from '../Banner/Banner'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
const Contact = () => {
    return (
        <div>
            <Navbar />
            <Banner />
            <div className="contact-container mt-5 mb-5">
                <form id="contact" action="" method="post">
                    <h1 className='text-center mt-1 brand-name m-1 '>Contact</h1>
                    <div className='d-flex justify-content-center mb-4'>
                        <div className='hr bg-dark'></div>
                    </div>
                    <fieldset>
                        <input placeholder="Your name" type="text" tabindex="1" required autofocus />
                    </fieldset>
                    <fieldset>
                        <input placeholder="Your Email Address" type="email" tabindex="2" required />
                    </fieldset>
                    <fieldset>
                        <input placeholder="Your Phone Number (optional)" type="tel" tabindex="3" required />
                    </fieldset>
                    <fieldset>
                        <input placeholder="Your Web Site (optional)" type="url" tabindex="4" required />
                    </fieldset>
                    <fieldset>
                        <textarea placeholder="Type your message here...." tabindex="5" required></textarea>
                    </fieldset>
                    <fieldset>
                        <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
                    </fieldset>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Contact