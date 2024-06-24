import React from 'react'
import './projects.css'
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
const Projects = () => {
    const projectJson = [
        {
            id: '1',
            name: 'SonicPortfolios',
            txt: 'Developed a voice-command-operated website enabling communication with a bot for streamlined interaction and user engagement.',
            link: 'https://ankit5116k.netlify.app/'
        },
        {
            id: '2',
            name: 'HYDPG',
            txt: 'Developed React platform for Hyderabad PG search, dynamic components, efficient data management.',
            link: 'https://hydpg.netlify.app/'
        },
        {
            id: '3',
            name: 'SIIM',
            txt: 'Created responsive college website template: HTML, CSS, JavaScript. Clean design, device-friendly.',
            link: 'https://ankit-1k.github.io/SIIM/'
        },
        {
            id: '4',
            name: 'FilmFlix',
            txt: 'Debuted FilmFlix: dynamic site for Bollywood, Hollywood, and Tollywood films; user-friendly for easy browsing and updated selections.',
            link: 'https://ankit-1k.github.io/movie-website/'
        }
    ];

    return (
        <div>
            <Navbar />
            <Banner/>
            <h1 className='text-center mt-5 brand-name m-1 '>Projects</h1>
            <div className='d-flex justify-content-center mb-4'>
                <div className='hr bg-dark'></div>
            </div>
            <div className="project-container">
                {
                    projectJson.map((item, index) => (
                        <div className="project-card">
                            <div className="face face1">
                                <div className="content">
                                    <h3>{item.name}</h3>
                                </div>
                            </div>
                            <div className="face face2">
                                <div className="content">
                                    <p>{item.txt}</p>
                                    <a href={item.link}>View Project</a>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="mt-5">
                <Footer />
            </div>            
        </div>
    )
}

export default Projects