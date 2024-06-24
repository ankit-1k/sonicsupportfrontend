import React from 'react'
import Banner from '../Banner/Banner'
import ServicesSection from '../Services/Services'
import About from '../About/About'
import Footer from '../Footer/Footer'
import './landingpage.css'
import Navbar from '../Navbar/Navbar'
const Landingpage = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <ServicesSection />
      <About />
      <Footer />
    </div>
  )
}

export default Landingpage