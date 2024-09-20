import React, { useState } from 'react'
import logo from './../../components/assets/img/logo-white.png'
import exitImg from './../../adminAssets/exit.gif'
import { useNavigate } from 'react-router-dom';
const AdminNavbar = () => {
    const [isShown, setIsShown] = useState(false);
    const [isOpensuccess, setIsOpensuccess] = useState(false);
    const toggleMobileMenu = () => {
        setIsShown(!isShown);
    };
    const navigate = useNavigate()
    const handleNews = () => {
        navigate('/editnews')
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
    const handleProject = () => {
        navigate('/adminprojects')
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
    const handleContact = () => {
        navigate('/admincontacts')
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
    const handleAbout = () => {
        navigate('/adminaboutus')
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
    const handleLogout = () => {
        setIsOpensuccess(true)
    }
    return (
        <>
            <div className='topnav'>
                <div className='logo'>
                    <img src={logo} className='logo-nav' alt="" />
                </div>

                <div className='menu'>
                    <i onClick={() => navigate('/admin')} className='active-link'>
                        Home
                    </i>
                    <i onClick={handleNews}>News</i>
                    <i onClick={handleProject}>Projects</i>
                    <i onClick={handleContact}>Contact</i>
                    <i onClick={handleAbout}>About</i>
                </div>
                <div className='d-flex ms-auto login-section'>
                    <div>
                        <button onClick={handleLogout} className='button mt-2'>Logout</button>
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

            {isOpensuccess && (
                <div className="modal-backdrop">
                    <dialog className="modal-custom" style={{ position: 'relative' }} open>
                        <div className="d-flex justify-content-center mt-5">
                            <img src={exitImg} className='warning-img' alt="" />
                        </div>
                        <div className='para-less-mp'>
                            <p className='fw-bold text-center lead mt-5'>Are You Sure To Logout</p>
                        </div>
                        <div className="d-flex justify-content-center mt-2">
                            <button className="button w-25 mt-2 me-2" onClick={() => navigate('/login')}>Yes</button>
                            <button className="button bg-danger w-25 mt-2" onClick={() => setIsOpensuccess(false)}>No</button>
                        </div>
                    </dialog>
                </div>
            )}
        </>
    )
}

export default AdminNavbar
const MobileMenu = () => {
    const navigate = useNavigate()
    const handleNews = () => {
        navigate('/editnews')
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
    const handleProject = () => {
        navigate('/adminprojects')
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
    const handleContact = () => {
        navigate('/admincontacts')
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
    const handleAbout = () => {
        navigate('/adminaboutus')
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
    return (
        <div className={'mobile-menu'}>
            <i>Home</i>
            <i onClick={handleNews}>News</i>
            <i onClick={handleProject}>Projects</i>
            <i onClick={handleContact}>Contact</i>
            <i onClick={handleAbout}>About</i>
        </div>
    );
};