import React from 'react';
import './banner.css';
import { useNavigate } from 'react-router-dom';
import banner from './../assets/img/banner-1.gif'
const Banner = () => {
  const navigate=useNavigate()
  const handleNotes=()=>{
    navigate('/notes')
  }
  return (
    <div className="banner-container">
      <div className="container akp">
        <div className="row">
          <div className="col-md-6">
            <div className="image-container">
              <img src={banner} alt="Banner" className="banner-image"/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="text-container">
              <h1 className='lg-text'>Welcome to <span className='brand-name'>SonicSupport</span> </h1>
              <p>Organize your thoughts, tasks, and ideas with ease. My Notes provides a simple yet powerful platform for managing all your notes in one place. Whether it's jotting down quick reminders, planning your day, or brainstorming new concepts, My Notes has got you covered.</p>
              <p>Start creating and organizing your notes today!</p>
              <div className="button-container">
                <button className='button d-flex' onClick={handleNotes}>
                  <i>Explore Notes</i>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-compass-fill ms-2 mt-1 font-lg" viewBox="0 0 16 16">
                    <path d="M15.5 8.516a7.5 7.5 0 1 1-9.462-7.24A1 1 0 0 1 7 0h2a1 1 0 0 1 .962 1.276 7.5 7.5 0 0 1 5.538 7.24m-3.61-3.905L6.94 7.439 4.11 12.39l4.95-2.828 2.828-4.95z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
