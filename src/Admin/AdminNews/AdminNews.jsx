import React, { useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import AdminBanner from '../../AdminBanner/AdminBanner';
import Footer from '../../components/Footer/Footer';
import NewsApi from './NewsApi';
import './adminnews.css';

const News = () => {
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    description: '',
  });
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:4000/api/news/${editId}`, formData);
        setEditMode(false);
        setEditId(null);
      } else {
        await axios.post('http://localhost:4000/api/news', formData);
      }
      setFormData({
        title: '',
        link: '',
        description: '',
      });
    } catch (error) {
      console.error('There was an error submitting the news item:', error);
    }
  };

  const handleEdit = (newsItem) => {
    setFormData({
      title: newsItem.title,
      link: newsItem.link,
      description: newsItem.description,
    });
    setEditMode(true);
    setEditId(newsItem._id);
  };

  const toggleSlider = () => {
    setIsSliderOpen(!isSliderOpen);
  };

  return (
    <>
      <AdminNavbar />
      <AdminBanner />
      <h1 className='text-center mt-5 brand-name m-1 '>Upload News</h1>
      <div className='d-flex justify-content-center'>
        <div className='hr bg-dark'></div>
      </div>
      <div className='d-flex justify-content-center mt-3'>
        <p className='fw-bold'>Corporate Updates: Stay Informed with the Latest Company News.</p>
      </div>
      <form onSubmit={handleSubmit} className='form-upload-news'>
        <div className="container" style={{ marginBottom: '100px' }}>
          <div className="row">
            <div className="col-md-6">
              <div>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="form-control" />
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <label htmlFor="link">Link</label>
                <input type="text" name="link" value={formData.link} onChange={handleChange} className="form-control" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <textarea name="description" rows={5} value={formData.description} onChange={handleChange} className='form-control mt-2 w-50'></textarea>
            </div>
          </div>
          <button type="submit" className='button w-25 mt-2'>{editMode ? 'Update' : 'Upload'}</button>
        </div>
        <p onClick={toggleSlider} style={{ cursor: 'pointer' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-chevron-double-right double-right-icon-custom ${isSliderOpen ? 'rotated' : ''}`} viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708" />
            <path fillRule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708" />
          </svg>
        </p>
        <div className={`slider-content ${isSliderOpen ? 'open' : ''}`}>
          <span className='left-arrow-custom' onClick={() => setIsSliderOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-chevron-double-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
              <path fillRule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
            </svg>
          </span>
          <NewsApi onEdit={handleEdit} />
        </div>
      </form>
      <Footer />
    </>
  );
};

export default News;