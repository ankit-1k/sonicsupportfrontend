import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../../components/Footer/Footer';
import AdminNavbar from './../AdminNavbar/AdminNavbar';
import AdminBanner from './../../AdminBanner/AdminBanner';
import successImg from './../../adminAssets/success.gif'
import waringImg from './../../adminAssets/warning.gif'
const AdminProjects = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    projectLink: '',
    description: '',
  });
  const [isUploadsuccess, setIsUploadsuccess] = useState(false);
  const [isUploadFailed, setisUploadFailed] = useState(false)
  const [isOpensuccess, setIsOpensuccess] = useState(false);
  const [projects, setProjects] = useState([]);
  const [required, setRequired] = useState(false)
  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { projectName, projectLink, description } = formData;

    if (projectName && projectLink && description) {
      try {
        await axios.post('https://sonicsupportbackend-wi4x.vercel.app/api/projects', formData);
        setFormData({ projectName: '', projectLink: '', description: '' });
        fetchProjects();
        isUploadsuccess(true)
      } catch (error) {
        console.error('Error submitting project:', error.response);
        alert('Error submitting project. Please try again later.');
      }
    } else {
      setisUploadFailed(true)
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get('https://sonicsupportbackend-wi4x.vercel.app/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error.response);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      await axios.delete(`https://sonicsupportbackend-wi4x.vercel.app/api/projects/${projectId}`);
      alert('Project deleted successfully');
      fetchProjects(); // Refresh the project list after deletion
    } catch (error) {
      console.error('Error deleting project:', error.response);
    }
  };

  const [editFormData, setEditFormData] = useState({
    projectName: '',
    projectLink: '',
    description: '',
  });
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const handleEdit = async () => {
    try {
      await axios.put(`https://sonicsupportbackend-wi4x.vercel.app/api/projects/${selectedProjectId}`, editFormData);
      alert('Project updated successfully');
      fetchProjects(); // Refresh the project list after update
    } catch (error) {
      console.error('Error updating project:', error.response);
    }
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    const { projectName, projectLink, description } = editFormData;

    if (projectName && projectLink && description) {
      handleEdit();
      setSelectedProjectId(null); // Reset selected project ID
      setEditFormData({ projectName: '', projectLink: '', description: '' });
      setIsOpensuccess(false);
    } else {
      setRequired(true)
    }
  };

  const hanleEditButton = (id) => {
    setSelectedProjectId(id);
    setIsOpensuccess(true);
  };

  return (
    <div>
      <AdminNavbar />
      <AdminBanner />
      <h1 className="brand-name text-center mt-5 mb-5">Project</h1>
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-6">
            <div>
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                className="form-control"
                id="projectName"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <label htmlFor="projectLink">Project Link</label>
              <input
                type="text"
                className="form-control"
                id="projectLink"
                name="projectLink"
                value={formData.projectLink}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                rows={5}
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <button className="button mt-2" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
      <ul>
        <div className='container d-flex justify-content-between flex-wrap'>
          {projects.map((project) => (
            <div className='card p-2 position-relative' key={project._id}>
              <div className="card-title">
                <h3>{project.projectName}</h3>
              </div>
              <div className="card-text">
                {project.description}
              </div>
              <div className="d-flex justify-content-between position-absolute bottom-0 mb-1">
                <button className="button me-1 ms-1" onClick={() => window.open(`${project.projectLink}`)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                  </svg>
                </button>
                <button className="button me-1" onClick={() => hanleEditButton(project._id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                  </svg>
                </button>
                <button className="button" onClick={() => handleDelete(project._id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10.5a1 1 0 0 0-1-1H6.5a1 1 0 0 0-1 1H2.5zm1 2V2H6.5v1H2.5zm6-1v1H13.5V2h-5zM2.5 5v9a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5H2.5z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </ul>

      {isOpensuccess && (
        <div className="modal d-block mt-5" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Project</h5>
                <button type="button" className="btn btn-close" aria-label="Close" onClick={() => setIsOpensuccess(false)}>
                  <span aria-hidden="true"></span>
                </button>
              </div>
              <div className="modal-body">
                {
                  required && (
                    <>
                      <div className="alert alert-danger" role="alert">
                        Please Fillout all fields
                      </div>
                    </>
                  )
                }
                <form onSubmit={handleEditFormSubmit}>
                  <div>
                    <label htmlFor="editProjectName">Project Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="editProjectName"
                      name="projectName"
                      value={editFormData.projectName}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="editProjectLink">Project Link</label>
                    <input
                      type="text"
                      className="form-control"
                      id="editProjectLink"
                      name="projectLink"
                      value={editFormData.projectLink}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="editDescription">Description</label>
                    <textarea
                      rows={5}
                      className="form-control"
                      id="editDescription"
                      name="description"
                      value={editFormData.description}
                      onChange={handleEditChange}
                    ></textarea>
                  </div>
                  <button type="submit" className="button mt-2">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {
        isUploadsuccess && (
          <div className="modal-backdrop">
            <dialog className="modal-custom" style={{ position: 'relative' }} open>
              <div className="d-flex justify-content-center mt-5">
                <img src={successImg} className='warning-img' alt="" />
              </div>
              <div className='para-less-mp'>
                <p className='fw-bold text-center lead'>Thanks You</p>
                <p className="text-muted text-center">Your Project Uploaded Successfully</p>
              </div>
              <div className="d-flex justify-content-center">
                <button className="button w-25 mt-2" onClick={() => setIsUploadsuccess(false)}>Close</button>
              </div>
            </dialog>
          </div>
        )}
      {isUploadFailed && (
        <div className="modal-backdrop">
          <dialog className="modal-custom" style={{ position: 'relative' }} open>
            <div className="d-flex justify-content-center mt-5">
              <img src={waringImg} className='warning-img' alt="" />
            </div>
            <div className='para-less-mp'>
              <p className='fw-bold text-center lead'>Please Fillout all fields</p>
            </div>
            <div className="d-flex justify-content-center">
              <button className="button w-25 mt-2" onClick={() => setisUploadFailed(false)}>Close</button>
            </div>
          </dialog>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AdminProjects;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Footer from '../../components/Footer/Footer';
// import AdminNavbar from './../AdminNavbar/AdminNavbar';
// import AdminBanner from './../../AdminBanner/AdminBanner';
// import successImg from './../../adminAssets/success.gif'
// import warningImg from './../../adminAssets/warning.gif';

// const AdminProjects = () => {
//   const [formData, setFormData] = useState({
//     projectName: '',
//     projectLink: '',
//     description: '',
//   });
//   const [isUploadsuccess, setIsUploadsuccess] = useState(false);
//   const [isUploadFailed, setisUploadFailed] = useState(false);
//   const [isOpensuccess, setIsOpensuccess] = useState(false);
//   const [projects, setProjects] = useState([]);
//   const [required, setRequired] = useState(false);

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { projectName, projectLink, description } = formData;

//     if (projectName && projectLink && description) {
//       try {
//         await axios.post('https://sonicsupportbackend-wi4x.vercel.app/api/projects', formData);
//         setFormData({ projectName: '', projectLink: '', description: '' });
//         fetchProjects();
//         setIsUploadsuccess(true);
//       } catch (error) {
//         console.error('Error submitting project:', error.response);
//         setisUploadFailed(true);
//       }
//     } else {
//       setisUploadFailed(true);
//     }
//   };

//   const fetchProjects = async () => {
//     try {
//       const response = await axios.get('https://sonicsupportbackend-wi4x.vercel.app/api/projects');
//       setProjects(response.data);
//     } catch (error) {
//       console.error('Error fetching projects:', error.response);
//     }
//   };

//   const handleDelete = async (projectId) => {
//     try {
//       await axios.delete(`https://sonicsupportbackend-wi4x.vercel.app/api/projects/${projectId}`);
//       alert('Project deleted successfully');
//       fetchProjects(); // Refresh the project list after deletion
//     } catch (error) {
//       console.error('Error deleting project:', error.response);
//     }
//   };

//   const [editFormData, setEditFormData] = useState({
//     projectName: '',
//     projectLink: '',
//     description: '',
//   });
//   const [selectedProjectId, setSelectedProjectId] = useState(null);

//   const handleEdit = async () => {
//     try {
//       await axios.put(`https://sonicsupportbackend-wi4x.vercel.app/api/projects/${selectedProjectId}`, editFormData);
//       alert('Project updated successfully');
//       fetchProjects(); // Refresh the project list after update
//     } catch (error) {
//       console.error('Error updating project:', error.response);
//     }
//   };

//   const handleEditChange = (e) => {
//     setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
//   };

//   const handleEditFormSubmit = (e) => {
//     e.preventDefault();
//     const { projectName, projectLink, description } = editFormData;

//     if (projectName && projectLink && description) {
//       handleEdit();
//       setSelectedProjectId(null); // Reset selected project ID
//       setEditFormData({ projectName: '', projectLink: '', description: '' });
//       setIsOpensuccess(false);
//     } else {
//       setRequired(true);
//     }
//   };

//   const handleEditButton = (id) => {
//     setSelectedProjectId(id);
//     setIsOpensuccess(true);
//   };

//   return (
//     <div>
//       <AdminNavbar />
//       <AdminBanner />
//       <h1 className="brand-name text-center mt-5 mb-5">Project</h1>
//       <div className="container mb-5">
//         <div className="row">
//           <div className="col-md-6">
//             <div>
//               <label htmlFor="projectName">Project Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="projectName"
//                 name="projectName"
//                 value={formData.projectName}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//           <div className="col-md-6">
//             <div>
//               <label htmlFor="projectLink">Project Link</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="projectLink"
//                 name="projectLink"
//                 value={formData.projectLink}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-md-6">
//             <div>
//               <label htmlFor="description">Description</label>
//               <textarea
//                 rows={5}
//                 className="form-control"
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//               ></textarea>
//             </div>
//             <button className="button mt-2" onClick={handleSubmit}>
//               Submit
//             </button>
//           </div>
//         </div>
//       </div>
//       <ul>
//         <div className='container d-flex justify-content-between flex-wrap'>
//           {projects.map((project) => (
//             <div className='card p-2 position-relative' key={project._id}>
//               <div className="card-title">
//                 <h3>{project.projectName}</h3>
//               </div>
//               <div className="card-text">
//                 {project.description}
//               </div>
//               <div className="d-flex justify-content-between position-absolute bottom-0 mb-1">
//                 <button className="button me-1 ms-1" onClick={() => window.open(`${project.projectLink}`)}>
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
//                     <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
//                     <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
//                   </svg>
//                 </button>
//                 <button className="button me-1" onClick={() => handleEditButton(project._id)}>
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
//                     <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
//                     <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
//                   </svg>
//                 </button>
//                 <button className="button" onClick={() => handleDelete(project._id)}>
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
//                     <path d="M11 1.5v1H5v-1h6zM4.5 1h7a.5.5 0 0 1 .5.5V3h1a.5.5 0 0 1 0 1h-1v9.5a1.5.5 0 0 1-1.5 1.5h-7A1.5.5 0 0 1 3 13.5V4H2a.5.5 0 0 1 0-1h1V1.5A.5.5 0 0 1 4.5 1zM5 4.5v9a.5.5 0 0 0 1 0v-9a.5.5 0 0 0-1 0zm3 0v9a.5.5 0 0 0 1 0v-9a.5.5 0 0 0-1 0zm3 0v9a.5.5 0 0 0 1 0v-9a.5.5 0 0 0-1 0z" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </ul>

//       {isUploadsuccess && (
//         <div className="modal-container">
//           <div className="modal-content text-center">
//             <img src={successImg} alt="success" className="img-fluid mb-4" />
//             <h1 className="modal-text">Project successfully added!</h1>
//             <button className="button mt-3" onClick={() => setIsUploadsuccess(false)}>Close</button>
//           </div>
//         </div>
//       )}

//       {isUploadFailed && (
//         <div className="modal-container">
//           <div className="modal-content text-center">
//             <img src={warningImg} alt="warning" className="img-fluid mb-4" />
//             <h1 className="modal-text">Please fill in all the required fields.</h1>
//             <button className="button mt-3" onClick={() => setisUploadFailed(false)}>Close</button>
//           </div>
//         </div>
//       )}

//       {isOpensuccess && (
//         <div className="modal-container">
//           <div className="modal-content text-center">
//             <form onSubmit={handleEditFormSubmit}>
//               <div>
//                 <label htmlFor="editProjectName">Project Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="editProjectName"
//                   name="projectName"
//                   value={editFormData.projectName}
//                   onChange={handleEditChange}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="editProjectLink">Project Link</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="editProjectLink"
//                   name="projectLink"
//                   value={editFormData.projectLink}
//                   onChange={handleEditChange}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="editDescription">Description</label>
//                 <textarea
//                   rows={5}
//                   className="form-control"
//                   id="editDescription"
//                   name="description"
//                   value={editFormData.description}
//                   onChange={handleEditChange}
//                 ></textarea>
//               </div>
//               <button type="submit" className="button mt-2">Update</button>
//               {required && <p className="text-danger">Please fill in all the required fields.</p>}
//             </form>
//             <button className="button mt-3" onClick={() => setIsOpensuccess(false)}>Close</button>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default AdminProjects;
