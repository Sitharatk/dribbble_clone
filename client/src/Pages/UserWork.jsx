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
        const response = await axios.get(`http://localhost:3000/auth/user/${authData.id}/shots`, {
          headers: {
            Authorization: `Bearer ${authData.token}`,  // Include the token here
          },
        });
        setShots(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shots:', error);
        setLoading(false);
      }
    };

    if (authData?.token) {  // Check if token exists before making request
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
            <div key={shot._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={shot.image} 
                alt={shot.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{shot.title}</h3>
                {shot.tags && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {shot.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
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
