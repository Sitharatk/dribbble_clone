import axios from "axios";
import { useState, useRef, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function Upload() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showPublishModal, setShowPublishModal] = useState(false);
    const [message,setMessage]=useState('');
    const fileInputRef = useRef(null);
    const {authData}=useContext(AuthContext);
    const navigate = useNavigate();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  console.log('Auth state:', {
    userId: authData?.id,
    hasToken: !!authData?.token, 
  });
  console.log('Stored auth data:', JSON.parse(localStorage.getItem('currentUser')));
  
  const handlePublish = async (e) => {
    e.preventDefault();
  
    if (!title || !image) {
      setMessage('Please fill in all required fields.');
      return;
    }
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('tags', tags);
  
    try {
      const userId = authData.id; 
      const token = authData.token; 

      const response = await axios.post(
        `http://localhost:3000/auth/user/${userId}/shots`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
  
      setMessage('Shot uploaded successfully!');
      setTitle('');
      setImage(null);
      setPreview(null);
      setShowPublishModal(false);
  
      setTimeout(() => {
        navigate('/userwork');
      }, 1500);
    } catch (error) {
      console.error('Error uploading shot:', error);
      setMessage(error.response?.data?.message || 'Failed to upload the shot. Please try again.');
    }
  };
  
  const CancelModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">Leave page?</h2>
        <p className="text-gray-600 mb-6">
          You haven&apos;t finished uploading your shot. Are you sure you want to leave?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setShowCancelModal(false)}
            className="px-4 py-2 bg-white border rounded-full text-gray-800 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              window.history.back();
            }}
            className="px-4 py-2 bg-black text-white rounded-full "
          >
            Leave page
          </button>
        </div>
      </div>
    </div>
  );

  // Publish Modal Component
  const PublishModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Final Touches</h2>
        
        </div>
        
        <div className="mb-6">
          <img
            src={preview}
            alt="Preview"
            className="w-64 h-48 object-cover rounded-lg mb-4"
          />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your shot a title"
            className="w-full p-3 border rounded-md mb-4"
          />
          <p className="text-sm text-black font-semibold">Tags<span className="text-slate-700">(Maximum 20)</span></p>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Add tags....."
            className="w-full p-3 border rounded-md"
          />
          <p className="text-sm text-gray-400 mt-1"><span className="text-black">Suggested:</span>web design ,illustration,ui,branding,logo,graphic design,vector,ux,typography,app</p>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => setShowPublishModal(false)}
            className="px-6 py-2 border rounded-full bg-white  text-gray-800 hover:text-gray-800"
          >
            Close
          </button>
          <button
            onClick={handlePublish}
            className="px-6 py-2 bg-black text-white rounded-full"
          >
            Publish now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="max-w-5xl mx-auto mt-4 p-6">
        {/* Header with buttons */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => setShowCancelModal(true)}
            className="px-4 py-2 border rounded-full text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full">
              Save as draft
            </button>
            <button 
              onClick={() => preview && setShowPublishModal(true)}
              className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
            >
              Continue
            </button>
          </div>
        </div>

        {/* Title Input */}
        {preview && (
          <div className="mb-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your shot a title"
              className="w-full p-3 text-xl border-none focus:outline-none focus:ring-0"
            />
          </div>
        )}

        {/* Preview Area */}
        {preview ? (
          <div className="mb-8">
            <img
              src={preview}
              alt="Preview"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
 <div className="mr-14 flex items-center justify-center">
      <hr className="flex-1 border-t-2 border-gray-300 mt-14" />
      <span className="mx-4  mt-14">
        <button className="w-40 h-12 border border-gray-300 rounded-xl text-black"> <span className="text-black text-bold text-2xl mr-2">+</span>Insert Block</button>
      </span>
      <hr className="flex-1 border-t-2 border-gray-300 mt-14" />
    </div>

          </div>
        ) : (
          <>
         
            <h1 className="text-4xl font-bold ml-56 text-gray-800 mb-8">
              What have you been working on?
            </h1>

            {/* Upload Area */}
            <div 
              className="border-2 h-[400px] mt-10 border-dashed rounded-lg p-12 text-center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-pink-100 rounded-lg flex items-center justify-center mt-10">
                  <svg
                    className="w-8 h-8 text-pink-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*,video/mp4"
                />
                <p className="text-gray-600">
                  Drag and drop an image, or{" "}
                  <button 
                    onClick={handleBrowseClick}
                    className="text-gray-900 font-medium hover:underline"
                  >
                    Browse
                  </button>
                </p>
                <p className="text-sm text-gray-500">
                  Minimum 1600px width recommended. Max 10MB each (20MB for videos)
                </p>
              </div>

       
              <div className="mt-6 flex justify-around text-sm text-gray-600">
                <ul className="list-disc space-y-2">
                  <li>High resolution images (png, jpg, gif)</li>
                  <li className="mr-28">Animated gifs</li>
                </ul>
                <ul className="list-disc space-y-2">
                  <li className="mr-44">Videos (mp4)</li>
                  <li>Only upload media you own the rights to</li>
                </ul>
              </div>
            </div>
          </>
        )}

        {message && (
          <div className="mt-4 text-center">
            <p className={message.includes('success') ? 'text-green-600' : 'text-red-600'}>
              {message}
            </p>
          </div>
        )}
      </div>

      {showCancelModal && <CancelModal />}
      {showPublishModal && <PublishModal />}
    </>
  );
}

export default Upload;