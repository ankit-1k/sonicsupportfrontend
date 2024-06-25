import React, { useEffect, useState } from 'react';
import './news.css';
import Footer from '../Footer/Footer';
import Banner from '../Banner/Banner';
import Navbar from './../Navbar/Navbar'
import axios from 'axios';
const News = () => {
    const [showAll, setShowAll] = useState(false);
    const [newsData, setNews] = useState([])
    const displayedNews = showAll ? newsData : newsData.slice(0, 6);

    const handleShowMore = () => {
        setShowAll(true);
    };
    const fetchNews = async () => {
        try {
            const response = await axios.get('https://sonicsupportbackend-lbz5o7nqn-ankits-projects-1030ff5d.vercel.app//api/news');
            setNews(response.data);
        } catch (error) {
            console.error('There was an error fetching the news items:', error);
        }
    };
    
    useEffect(() => {
        fetchNews();
    }, []);
    return (
        <>
            <Navbar />
            <Banner />
            <h1 className='text-center mt-5 brand-name m-1 '>News</h1>
            <div className='d-flex justify-content-center'>
                <div className='hr bg-dark'></div>
            </div>
            <div className='d-flex justify-content-center mt-3'>
                <p className='fw-bold'>Corporate Updates: Stay Informed with the Latest Company News.</p>
            </div>
            <div className='news-card-container container'>
                {displayedNews.map((item, index) => (
                    <article className="card-news mt-5" key={index}>
                        <img
                            className="card-news__background"
                            src="https://i.imgur.com/QYWAcXk.jpeg"
                            alt=""
                            width="1920"
                            height="2193"
                        />
                        <div className="card-news__content | flow">
                            <div className="card-news__content--container | flow">
                                <h2 className="card-news__title news-h2">{item.title}</h2>
                                <p className="card-news__description para-news">
                                    {item.description}
                                </p>
                            </div>
                            <button className="card-news__button" onClick={()=>window.open(`${item.link}`)}>Read more</button>
                        </div>
                    </article>
                ))}
            </div>
            <div className='d-flex justify-content-center mt-5 mb-5'>
                {!showAll && (
                    <button className="show-more-button button" onClick={handleShowMore}>
                        More
                    </button>
                )}
            </div>
            <Footer />
        </>
    );
};

export default News;
