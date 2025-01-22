import { Link } from 'react-router-dom';
import UserDetails from './UserDetails';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';

function UserWork() {
  const [shots, setShots] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authData } = useContext(AuthContext);

  useEffect(() => {
    const fetchShots = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/auth/shots`, {  // Simplified URL
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        });
        setShots(response.data.shots);  // Access the shots array from the response
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shots:', error);
        setLoading(false);
      }
    };

    if (authData?.token) {
      fetchShots();
    } else {
      setLoading(false);
    }
  }, [authData]);

  return (
    <>
      <UserDetails />
      {loading ? (
    <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
) : shots.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 ml-20">
        {shots.map((shot) => (
            <div 
                key={shot._id} 
                className="group relative bg-white rounded-lg shadow-md overflow-hidden"
            >
                <div className="relative">
                    <img 
                        src={shot.image} 
                        alt={shot.title}
                        className="w-full h-64 object-cover transition duration-300 group-hover:opacity-90"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {/* Title on hover */}
                            <div className="absolute top-4 left-4 text-white">
                                <h3 className="text-lg font-semibold">{shot.title}</h3>
                            </div>
                            
                            {/* Stats on hover */}
                            <div className="absolute bottom-4 left-4 flex items-center space-x-4 text-white">
                                <div className="flex items-center space-x-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                    </svg>
                                    <span>{shot.likes}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>{shot.views}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                    </svg>
                                    <span>{shot.comments?.length || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Tags below image */}
                {shot.tags && shot.tags.length > 0 && (
                    <div className="p-4">
                        <div className="flex flex-wrap gap-2">
                            {shot.tags.map((tag, index) => (
                                <span 
                                    key={index}
                                    className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        ))}
    </div>
) : (

        <div className="p-8 border-2 w-96 h-72 border-dashed border-gray-300 rounded-lg ml-20 mb-12">
          <div className="flex flex-col mt-2 items-center justify-center text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Upload your first shot
            </h2>
            <p className="text-gray-600 max-w-md">
              Show off your best work. Get feedback, likes and be a part of a growing community.
            </p>
            <Link to="/uploads">
              <button className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                Upload your first shot
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default UserWork;


// import axios from 'axios';
// import UserDetails from './UserDetails'
// import { useState } from 'react';

// function UserWork() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [tags, setTags] = useState('');
//   const [image, setImage] = useState(null);
//   const [message, setMessage] = useState('');

//   const handleUpload = async (e) => {
//     e.preventDefault();

//     if (!title || !description || !image) {
//       setMessage('Please fill in all required fields.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('tags', tags);
//     formData.append('image', image);

//     try {
//       const response = await axios.post('/api/shots', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setMessage('Shot uploaded successfully!');
//       setTitle('');
//       setDescription('');
//       setTags('');
//       setImage(null);
//     } catch (error) {
//       setMessage('Failed to upload the shot. Please try again.');
//     }
//   };

//   return (
 
//     <>
//     <UserDetails/>
//     <div className="upload-shot-container">
//       <h1>Upload your first shot</h1>
//       <p>Show off your best work. Get feedback, likes, and be a part of a growing community.</p>

//       <form onSubmit={handleUpload}>
//         <div>
//           <label>Title:</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Enter shot title"
//             required
//           />
//         </div>

//         <div>
//           <label>Description:</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Enter shot description"
//             required
//           />
//         </div>

//         <div>
//           <label>Tags (comma-separated):</label>
//           <input
//             type="text"
//             value={tags}
//             onChange={(e) => setTags(e.target.value)}
//             placeholder="Enter tags"
//           />
//         </div>

//         <div>
//           <label>Upload Image:</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImage(e.target.files[0])}
//             required
//           />
//         </div>

//         <button type="submit">Upload your first shot</button>
//       </form>

//       {message && <p>{message}</p>}
//     </div>
  
// </>
//   )
// }

// export default UserWork
