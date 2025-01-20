import { Link } from 'react-router-dom'
import UserDetails from './UserDetails'



function UserWork() {
 
  return (
 
    <>
    <UserDetails/>
    <div className="p-8 border-2 w-96  h-72 border-dashed border-gray-300 rounded-lg ml-20 mb-12">
      <div className="flex flex-col  mt-2 items-center justify-center text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Upload your first shot
        </h2>
        <p className="text-gray-600 max-w-md">
          Show off your best work. Get feedback, likes and be a part of a growing community.
        </p>
      <Link to="/uploads"><button
          className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors" >
          Upload your first shot
        </button></Link>
      </div>
    </div>
  

    
</>
  )
}

export default UserWork



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
