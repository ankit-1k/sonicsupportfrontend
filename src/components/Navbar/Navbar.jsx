import React, { useState } from 'react'
import './navbar.css';
import logo from './../assets/img/logo-white.png'
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const [isShown, setIsShown] = useState(false);
    const toggleMobileMenu = () => {
        setIsShown(!isShown);
    };
    const navigate = useNavigate()
    const handleNews = () => {
        navigate('/news')
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
    const handleProject = () => {
        navigate('/projects')
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
    const handleContact = () => {
        navigate('/contact')
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
    const handleAbout = () => {
        navigate('/aboutus')
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
    return (
        <>
            <div className='topnav'>
                <div className='logo'>
                    <img src={logo} className='logo-nav' alt="" />
                </div>

                <div className='menu'>
                    <i onClick={() => navigate('/')} className='active-link'>
                        Home
                    </i>
                    <i onClick={handleNews}>News</i>
                    <i onClick={handleProject}>Projects</i>
                    <i onClick={handleContact}>Contact</i>
                    <i onClick={handleAbout}>About</i>
                </div>
                <div className='d-flex ms-auto login-section'>
                    <div>
                        <button onClick={()=>navigate('/login')} className='button mt-2'>Login</button>
                    </div>
                </div>

                <button className='show-mobile-menu-button' onClick={toggleMobileMenu}>
                    &#8801;
                </button>
            </div>

            {isShown && <MobileMenu />}
            {isShown && (
                <button className='close-mobile-menu-button' onClick={toggleMobileMenu}>
                    &times;
                </button>
            )}
        </>
    )
}

export default Navbar
const MobileMenu = () => {
    const navigate = useNavigate()
    const handleNews = () => {
        navigate('/news')
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
    const handleProject = () => {
        navigate('/projects')
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
    const handleContact = () => {
        navigate('/contact')
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
    const handleAbout = () => {
        navigate('/aboutus')
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
    return (
        <div className={'mobile-menu'}>
            <i onClick={()=>navigate('/')}>Home</i>
            <i onClick={handleNews}>News</i>
            <i onClick={handleProject}>Projects</i>
            <i onClick={handleContact}>Contact</i>
            <i onClick={handleAbout}>About</i>
            <i onClick={()=>navigate('/login')}>Login</i>
        </div>
    );
};