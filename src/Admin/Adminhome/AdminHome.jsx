import React from 'react'
import AdminBanner from '../../AdminBanner/AdminBanner'
import Footer from './../../components/Footer/Footer'
import './../AdminStyle/admin.css'
import { useNavigate } from 'react-router-dom'
const AdminHome = () => {
  const navigate=useNavigate()
  return (
    <div>
      <AdminBanner />
      <div className="container">
        <main>
          <section className='admin-home-cards'>
            <div className="d-flex flex-wrap">
              <div className="box red position-relative">
                <h5>Edit News</h5>
                <p>You have rights to handle News</p>
                <button onClick={()=>navigate('/editnews')} className="button bottom " style={{right:'10px'}}>Edit</button>
              </div>
              <div className="box red position-relative">
                <h5>Edit CRUD Notes</h5>
                <p>You have rights to Make changes on Notes</p>
                <button onClick={()=>navigate('/editnotes')} className="button bottom " style={{right:'10px'}}>Edit</button>
              </div>
              <div className="box red position-relative">
                <h5>Upload New Project</h5>
                <p>You have rights to Upload your New Project</p>
                <button onClick={()=>navigate('/adminprojects')} className="button bottom " style={{right:'10px'}}>Edit</button>
              </div>
              <div className="box red position-relative">
                <h5>View Contact Us Data</h5>
                <p>You have rights to view who Submit Contact Form</p>
                <button onClick={()=>navigate('/admincontacts')} className="button bottom " style={{right:'10px'}}>Edit</button>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default AdminHome