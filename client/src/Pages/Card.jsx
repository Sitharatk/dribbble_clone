import  { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../Context/AuthContext'
import { ShotContext } from '../Context/ShotContext';

function Card({shot}) {
  const { likeShot, unlikeShot ,shotViews} = useContext(ShotContext);
  const { authData } = useContext(AuthContext);
  const [likes, setLikes] = useState(shot?.likes || []);
  const userId = authData?.id || null;

  const handleLikeToggle = async () => {
    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    try {
      if (likes.includes(userId)) {
        await unlikeShot(shot?._id);
        setLikes(likes.filter((id) => id !== userId));
      } else {
        await likeShot(shot?._id);
        setLikes([...likes, userId]);
      }
    } catch (error) {
      console.error('Like action failed', error);
    }
  };

  const handleLinkClick = (e) => {
    if (!e.target.closest('button') && !e.target.closest('svg')) {
      return true;
    }
    e.preventDefault();
  }

  if (!shot) {
    return null;
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col space-y-4">
        {/* Image Container */}
    
          <Link to={`/shots/${shot._id}`} onClick={handleLinkClick}>
            <div className="group relative bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src={shot.image}
                  alt={shot.title}
                  className="w-full h-48 md:h-56 object-cover"
                />

                {/* Hover overlay with name and like */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-base md:text-lg font-semibold text-white truncate pr-2">
                      {shot.title}
                    </h3>
                    {userId && (
                    <div className="flex space-x-2">
                      {/* //collection button */}
                      <button className="p-2 rounded-full bg-white text-gray-500 hover:bg-opacity-90 transition-colors duration-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 md:h-5 md:w-5"
                          viewBox="0 0 16 16"
                          fill="none"
                          role="img"
                        >
                          <path
                            d="M3.33337 5.2C3.33337 4.0799 3.33337 3.51984 3.55136 3.09202C3.74311 2.71569 4.04907 2.40973 4.42539 2.21799C4.85322 2 5.41327 2 6.53337 2H9.46671C10.5868 2 11.1469 2 11.5747 2.21799C11.951 2.40973 12.257 2.71569 12.4487 3.09202C12.6667 3.51984 12.6667 4.0799 12.6667 5.2V14L8.00004 11.3333L3.33337 14V5.2Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      <button 
                        onClick={handleLikeToggle} 
                        className={`p-2 rounded-full bg-white text-gray-600 hover:bg-opacity-30 transition-colors duration-200 ${userId && likes.includes(userId) ? 'text-fuchsia-400' : ''}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 md:h-5 md:w-5"
                          viewBox="0 0 16 16"
                          fill={userId && likes.includes(userId) ? 'currentColor' : 'none'}
                          role="img"
                        >
                          <path
                            d="M10.7408 2C13.0889 2 14.6667 4.235 14.6667 6.32C14.6667 10.5425 8.11856 14 8.00004 14C7.88152 14 1.33337 10.5425 1.33337 6.32C1.33337 4.235 2.91115 2 5.2593 2C6.60745 2 7.48893 2.6825 8.00004 3.2825C8.51115 2.6825 9.39263 2 10.7408 2Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                    </div>
                  )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
  
        
        {/* Stats Container */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="flex items-center space-x-3 w-full">
            <img
              src={shot.user?.profilePicture}
              alt={shot.user?.name || "User"}
              className="w-7 h-7 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-gray-700">
                {shot.user?.name || "Anonymous"}
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-end md:items-center justify-between w-full">
              <div className="flex items-center sm:ml-32 space-x-3 text-gray-400">
                <div className="flex items-center">
                  <button className="p-2 rounded">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16" 
                      fill={userId && likes.includes(userId) ? 'rgb(232, 121, 249)' : 'gray'}
                      role="img"
                    >
                      <path 
                        d="M10.7408 2C13.0889 2 14.6667 4.235 14.6667 6.32C14.6667 10.5425 8.11856 14 8.00004 14C7.88152 14 1.33337 10.5425 1.33337 6.32C1.33337 4.235 2.91115 2 5.2593 2C6.60745 2 7.48893 2.6825 8.00004 3.2825C8.51115 2.6825 9.39263 2 10.7408 2Z" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <span className="text-sm">{likes.length}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 16 16" 
                    fill="none" 
                    role="img"
                  >
                    <path 
                      d="M8 3C4.36992 3 1.98789 6.21774 1.18763 7.49059C1.09079 7.64462 1.04237 7.72163 1.01527 7.84042C0.99491 7.92964 0.99491 8.07036 1.01527 8.15958C1.04237 8.27837 1.09079 8.35539 1.18763 8.50941C1.98789 9.78226 4.36992 13 8 13C11.6301 13 14.0121 9.78226 14.8124 8.50941L14.8124 8.50939C14.9092 8.35538 14.9576 8.27837 14.9847 8.15958C15.0051 8.07036 15.0051 7.92964 14.9847 7.84042C14.9576 7.72163 14.9092 7.64462 14.8124 7.4906L14.8124 7.49059C14.0121 6.21774 11.6301 3 8 3Z" 
                      fill="currentColor"
                    />
                    <path 
                      d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" 
                      fill="white"
                    />
                  </svg>
                  <span className="text-sm">{shotViews.length || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
{/* {shot.tags && shot.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                {shot.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )} */}
        