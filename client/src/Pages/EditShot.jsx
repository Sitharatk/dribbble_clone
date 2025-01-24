import { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ShotContext } from '../Context/ShotContext';

const EditShot = () => {
  const { id } = useParams();
  const { shots, updateShot } = useContext(ShotContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [shotDetails, setShotDetails] = useState({
    title: '',
    image: null,
    tags: []
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [tags, setTags] = useState('');

  useEffect(() => {
    const shot = shots?.find((s) => s._id === id);
    if (shot) {
      setShotDetails({
        title: shot.title,
        image: shot.image || null,
        tags: shot.tags || []
      });
      setImagePreview(shot.image || null);
      setTags(shot.tags?.join(', ') || '');
    }
  }, [id, shots]);

  const handleImageChange = (e) => {
    const file = e.target.files[0] || e.dataTransfer?.files[0];
    if (file) {
      setShotDetails((prev) => ({
        ...prev,
        image: file
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleImageChange(e);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleImageDelete = () => {
    setShotDetails((prev) => ({
      ...prev,
      image: null
    }));
    setImagePreview(null);
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowUpdateModal(true);
  };
  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('title', shotDetails.title);
    if (tags) {
      const processedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      formData.append('tags', JSON.stringify(processedTags));
    }
    if (shotDetails.image instanceof File) {
      formData.append('image', shotDetails.image);
    }
  
    try {
      const response = await updateShot(id, formData);  // pass FormData
      console.log('Update response:', response);
      navigate('/');
    } catch (error) {
      console.error('Error updating shot:', error.response?.data || error);
    }
  };
  
  const CancelModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">Leave page?</h2>
        <p className="text-gray-600 mb-6">
          You haven&apos;t finished updating your shot. Are you sure you want to leave?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setShowCancelModal(false)}
            className="px-4 py-2 bg-white border rounded-full text-gray-800 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-black text-white rounded-full"
          >
            Leave page
          </button>
        </div>
      </div>
    </div>
  );

  const UpdateModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Final Touches</h2>
        </div>
        
        <div className="mb-6">
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-64 h-48 object-cover rounded-lg mb-4"
            />
          )}
          <input
            type="text"
            value={shotDetails.title}
            onChange={(e) => setShotDetails(prev => ({...prev, title: e.target.value}))}
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
          <p className="text-sm text-gray-400 mt-1">
            <span className="text-black">Suggested:</span> design, illustration, ui, branding, logo, graphic design, vector, ux, typography, app
          </p>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => setShowUpdateModal(false)}
            className="px-6 py-2 border rounded-full bg-white text-gray-800 hover:text-gray-800"
          >
            Close
          </button>
          <button
            onClick={handleUpdate}
            className="px-6 py-2 bg-black text-white rounded-full"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );

  return (

      <>
        {showCancelModal && <CancelModal />}
        {showUpdateModal && <UpdateModal />}
    
        <div className="max-w-5xl mx-auto mt-4 p-6">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => setShowCancelModal(true)}
              className="px-4 py-2 border rounded-full text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <div className="flex gap-4">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
              >
                Continue
              </button>
            </div>
          </div>
    
          <div className="mb-6">
            <input
              type="text"
              value={shotDetails.title}
              onChange={(e) =>
                setShotDetails({ ...shotDetails, title: e.target.value })
              }
              placeholder="Give your shot a title"
              className="w-full p-3 text-xl border-none focus:outline-none focus:ring-0"
            />
    
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-full h-auto rounded-lg shadow-lg"
                />
                <button
                  onClick={handleImageDelete}
                  className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-700"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            ) : (
              <>
                <h1 className="text-4xl font-bold ml-80 text-gray-800 mb-8">
                  Select new image
                </h1>
    
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
                      Drag and drop an image, or{' '}
                      <button
                        onClick={handleBrowseClick}
                        className="text-gray-900 font-medium hover:underline"
                      >
                        Browse
                      </button>
                    </p>
                    <p className="text-sm text-gray-500">
                      Minimum 1600px width recommended. Max 10MB each (20MB for
                      videos)
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
          </div>
        </div>
      </>
    );
    
};

export default EditShot