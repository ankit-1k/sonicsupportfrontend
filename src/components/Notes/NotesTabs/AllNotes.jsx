import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from './../../Styles/Skeleton';

const AllNotes = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [allNotesData, setAllNotesData] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://sonicsupportbackend-lbz5o7nqn-ankits-projects-1030ff5d.vercel.app//questions');
                setAllNotesData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            const filtered = allNotesData.filter(note => note.subject.toLowerCase() === selectedCategory.toLowerCase());
            setFilteredNotes(filtered);
        } else {
            setFilteredNotes(allNotesData);
        }
    }, [selectedCategory, allNotesData]);

    const handleChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    return (
        <div className='container'>
            <div>
                <h1 className='text-center mt-5 brand-name m-1 '>All Notes</h1>
                <div className='d-flex justify-content-center mb-4'>
                    <div className='hr bg-dark'></div>
                </div>
                {/* {loading ? (
                    <div>
                        <Skeleton type="skeleton-title" />
                        <Skeleton type="skeleton-text" />
                        <Skeleton type="skeleton-text" />
                    </div>
                ) : ( */}
                    <>
                        <select className='form-select mt-3 w-50' value={selectedCategory} onChange={handleChange}>
                            <option value="">All Categories</option>
                            <option value="IMPORTANT FOR INTERVIEW">Important</option>
                            <option value="html">HTML</option>
                            <option value="css">CSS</option>
                            <option value="javascript">JavaScript</option>
                            <option value="react">React</option>
                            <option value="node">Node Js</option>
                        </select>
                        {
                            loading ? (
                                <div>
                                    <Skeleton type="skeleton-title" />
                                    <Skeleton type="skeleton-text" />
                                    <Skeleton type="skeleton-text" />
                                </div>
                            ) : (
                                <div className="mt-3">
                                    {filteredNotes.map((note, index) => (
                                        <div key={index}>
                                            <h3 className='text-warning'>{note.question}</h3>
                                            <p>{note.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            )
                        }

                    </>
                {/* )} */}
            </div>
        </div>
    );
};

export default AllNotes;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Skeleton from './../../Styles/Skeleton';
// const AllNotes = () => {
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [allNotesData, setAllNotesData] = useState([]);
//     const [filteredNotes, setFilteredNotes] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('https://sonicsupportbackend-lbz5o7nqn-ankits-projects-1030ff5d.vercel.app//questions');
//                 setAllNotesData(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     useEffect(() => {
//         if (selectedCategory) {
//             const filtered = allNotesData.filter(note => note.subject.toLowerCase() === selectedCategory.toLowerCase());
//             setFilteredNotes(filtered);
//         } else {
//             setFilteredNotes(allNotesData);
//         }
//     }, [selectedCategory, allNotesData]);

//     const handleChange = (e) => {
//         setSelectedCategory(e.target.value);
//     };

//     if (loading) {
//         return <div>
//             {/* <Skeleton type="skeleton-avatar" /> */}
//             <Skeleton type="skeleton-title" />
//             <Skeleton type="skeleton-text" />
//             <Skeleton type="skeleton-text" />
//         </div>;
//     }

//     return (
//         <div className='container'>
//             <div>
//                 <h1 className='text-center mt-5 brand-name m-1 '>All Notes</h1>
//                 <div className='d-flex justify-content-center mb-4'>
//                     <div className='hr bg-dark'></div>
//                 </div>
//                 <select className='form-select mt-3 w-50' value={selectedCategory} onChange={handleChange}>
//                     <option value="">All Categories</option>
//                     <option value="IMPORTANT FOR INTERVIEW">Important</option>
//                     <option value="html">HTML</option>
//                     <option value="css">CSS</option>
//                     <option value="javascript">JavaScript</option>
//                     <option value="react">React</option>
//                 </select>
//                 <div className="mt-3">
//                     {filteredNotes.map((note, index) => (
//                         <div key={index}>
//                             <h3 className='text-warning'>{note.question}</h3>
//                             <p>{note.answer}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AllNotes;
