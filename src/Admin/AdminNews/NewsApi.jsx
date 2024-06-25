import React, { useState, useEffect } from 'react';
import axios from 'axios';
const NewsApi = ({ onEdit }) => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/news');
            setNews(response.data);
        } catch (error) {
            console.error('There was an error fetching the news items:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/news/${id}`);
            fetchNews();
        } catch (error) {
            console.error('There was an error deleting the news item:', error);
        }
    };

    return (
        <div className="card-news-container">
            {news.map((item) => (
                <div key={item._id} className="news-card">
                    <div className="card card-news-api">
                        <div className="card-body">
                            <div className="card-title">
                                {item.title}
                            </div>
                            <div className="card-text">
                                {item.description}
                            </div>
                        </div>
                        <div className="card-footer d-flex justify-content-between">
                            <button className='button' onClick={() => window.open(`${item.link}`)}>Go</button>
                            <button className='button' onClick={() => handleDelete(item._id)}>Delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NewsApi;