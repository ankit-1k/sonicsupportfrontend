import React, { useEffect, useState } from 'react'
import './projects.css'
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
const Projects = () => {
    const [projectApi, setProjectApi] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://sonicsupportbackend-uarr.vercel.app/api/projects');
        setProjectApi(response.data);
        console.log(response.data); 
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchData(); 

  }, []); 

  console.log(projectApi); 
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
                    projectApi.map((item, index) => (
                        <div className="project-card">
                            <div className="face face1">
                                <div className="content">
                                    <h3>{item.projectName}</h3>
                                </div>
                            </div>
                            <div className="face face2">
                                <div className="content">
                                    <p>{item.description}</p>
                                    <a href={item.projectLink}>View Project</a>
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