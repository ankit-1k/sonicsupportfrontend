import React from 'react';
import './services.css';
import services_1 from './../assets/img/services-1.svg' //search icon
import services_home from './../assets/img/services-home.svg'
import services_system from './../assets/img/services-system.svg'
import services_light from './../assets/img/services-light.svg'
const ServicesSection = () => {
    return (
        <div className='services-component'>
            <h1 className='text-center mt-5 brand-name m-1'>Services</h1>
            <div className='d-flex justify-content-center'>
                <div className='hr bg-dark'></div>
            </div>
            <div className="row1-container">
                <div className="box box-down cyan">
                    <h2>Easy Notes</h2>
                    <p>Effortless note-taking made simple.</p>
                    <img src={services_1} alt=""/>
                </div>

                <div className="box red">
                    <h2>Access Anywhere</h2>
                    <p>Access your notes anytime, anywhere.</p>
                    <img src={services_home} alt=""/>
                </div>

                <div className="box box-down blue">
                    <h2>Collaboration</h2>
                    <p>Share and collaborate on notes easily.</p>
                    <img src={services_system} alt=""/>
                </div>
            </div>
            <div className="row2-container">
                <div className="box orange">
                    <h2>Interview Question</h2>
                    <p>Organize important <span className='text-info'>interview Q/A </span> efficiently.</p>
                    <img src={services_light} alt=""/>
                </div>
            </div>
        </div>
    );
};

export default ServicesSection;
