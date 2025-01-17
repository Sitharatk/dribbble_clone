import { useContext, useState } from 'react';
import Logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faTrashAlt } from '@fortawesome/free-solid-svg-icons'; // Import the trash icon
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';


function Welcome() {
  const [location, setLocation] = useState("");
  const [avatar, setAvatar] = useState(null); 
  const navigate = useNavigate();
  const {authData,setAuthData }=useContext(AuthContext)

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };
  const handleSubmit = async () => {
    if (avatar && location) {
      const formData = new FormData();
      formData.append('avatar', avatar);
  
      try {
        const id = authData.id;
        const response = await axios.post(
          `http://localhost:3000/auth/user/${id}/avatar`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );
  
        const updatedUser = response.data.user;
        setAuthData((prevAuthData) => {
          const updatedAuthData = { ...prevAuthData, profilePicture: updatedUser.profilePicture };
          localStorage.setItem('authData', JSON.stringify(updatedAuthData));
          return updatedAuthData;
        });
        navigate('/welcomedesigner');
      } catch (error) {
        console.error('Error uploading avatar:', error.response?.data || error);
      }
    }
  };
  
  const handleRemoveAvatar = () => {
    setAvatar(""); 
  };

  
  return (
    <div>
      <div className="px-12 py-16">
        <img src={Logo} alt="Dribbble Logo" className="w-20 h-auto" />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold">Welcome! Let’s create your profile</h1>
        <h3 className="text-gray-500 mr-80 mt-5">Let others get to know you better!</h3>
        <h2 className="text-lg font-bold mr-96 mt-10 mb-2">Add an avatar</h2>


        <div className="mb-6">
          <div className="flex items-center relative">
            <div className="w-36 h-36 mt-4 mr-20 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden mb-4">
            <div className="w-full h-full mt-4  border-2 border-gray-300 flex items-center justify-center overflow-hidden mb-4">
  {avatar ? (
    <img src={typeof avatar === 'string' ? avatar : URL.createObjectURL(avatar)} alt="Avatar" className="w-full h-full  object-cover" />
  ) : (
    <span className="text-gray-400 text-sm">+</span>
  )}
</div>

            </div>
            <div>
              <label
                htmlFor="avatar"
                className="bg-white text-black px-4 py-2 rounded-full font-semibold text-sm border border-gray-300 cursor-pointer"
              >
                Choose Image
              </label>
              <input
                id="avatar"
                type="file"
                className="hidden"
                onChange={handleAvatarChange}
              />
              <h1 className="text-base text-gray-400 font-semibold mt-4">
                <FontAwesomeIcon icon={faAngleRight} /> Or choose one of our defaults
              </h1>
            </div>

      
            {avatar && (
  <button
    onClick={handleRemoveAvatar}
    className="absolute bottom-1 right-[340px] transform translate-x-[-80%] bg-rose-400 px-2 py-1  rounded-full shadow-md "
    title="Remove Avatar"
  >
    <FontAwesomeIcon icon={faTrashAlt} className="text-white text-sm" />
  </button>
)}

          </div>
        </div>

     
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2 mr-96">Add your location</h2>
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full mt-5 px-4 py-2 border-b-2 focus:outline-none"
          />
        </div>

  
        <button
          className={`w-28 px-4 py-3 ml-96 mt-5 text-white rounded-full ${
            avatar && location
              ? "bg-gray-500 hover:bg-black-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!avatar || !location}
          onClick={handleSubmit}
        >
          Continue
        </button>
      </div>

      <img
        src="https://cdn.dribbble.com/assets/packs/media/assets/images/random-image-footer/4-cc429055ee8125b32d450fae686ef867.jpg"
        alt="Art by @skahovsky"
        className="w-full mt-7 h-full object-cover object-center"
      />
    </div>
  );
}

export default Welcome;
