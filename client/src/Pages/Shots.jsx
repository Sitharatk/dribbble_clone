import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ShotContext } from "../Context/ShotContext";
import { AuthContext } from "../Context/AuthContext";
import ContactModal from "../Pages/ContactModal";

const ShotDetail = () => {
  const { id } = useParams();
  const { loading, deleteShot, allShots, likeShot, unlikeShot } = useContext(ShotContext);
  const { authData, followUser, unfollowUser } = useContext(AuthContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [relatedShots, setRelatedShots] = useState([]);
  const userId = authData?.id || null;

  const shot = allShots && id ? allShots.find((s) => s._id === id) : null;
  const navigate = useNavigate();

  // Add this function to fix the error
  const handleLinkClick = (e) => {
    if (!e.target.closest('button') && !e.target.closest('svg')) {
      return true;
    }
    e.preventDefault();
  };

  // Add this function for like functionality
  const handleLikeToggle = async (shotId, currentLikes = []) => {
    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    try {
      if (currentLikes.includes(userId)) {
        const response = await unlikeShot(shotId);
        // Only update state if server operation was successful
        if (response.message === 'Like deleted successfully') {
          return true;
        }
      } else {
        const response = await likeShot(shotId);
        if (response.success) {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Like action failed', error);
      return false;
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this shot?')) {
      await deleteShot(id);
      navigate(-1);
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authData?.following && shot?.user?._id) {
        console.log('Current following list:', authData.following);
        console.log('Shot user ID:', shot.user._id);
        const followingStatus = authData.following.includes(shot.user?._id);
        console.log('Following status:', followingStatus);
        setIsFollowing(followingStatus);
    }
  }, [authData?.following, shot?.user?._id]);

  useEffect(() => {
    if (shot?.user?._id && allShots) {
      const shotsByUser = allShots.filter(
        s => s.user?._id === shot.user._id && s._id !== shot._id
      );
      setRelatedShots(shotsByUser);
    }
  }, [shot, allShots]);

  const handleFollowToggle = async () => {
    if (!shot?.user?._id) return;

    setIsLoading(true);
    try {
        if (isFollowing) {
            await unfollowUser(shot?.user?._id);
            console.log('Unfollow successful');
        } else {
            await followUser(shot?.user?._id);
            console.log('Follow successful');
        }
        setIsFollowing(!isFollowing);
    } catch (error) {
        console.error('Error toggling follow:', error);
       
        setIsFollowing(isFollowing);
    } finally {
        setIsLoading(false);
    }
  };

  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary"></div>
      </div>
    );
  }
  
  if (!allShots || allShots.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">No shots available</h1>
      </div>
    );
  }
  
  if (!shot) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Shot not found</h1>
      </div>
    );
  }
  
  const currentUserShot = shot?.user?._id === authData?.id;
  
  return (
    <div className="min-h-screen relative bg-black bg-opacity-50 flex items-center justify-center z-50">
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        onClick={() => navigate(-1)}
      >
        <svg className="w-6 h-6 text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="w-full bg-white rounded-lg shadow-lg pt-14 px-4 md:px-36 space-y-3 mt-12 relative">
        <h1 className="text-2xl font-semibold text-gray-900">{shot.title}</h1>
        <div className="py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to={`/${shot?.user?.username}`}>
              <img
                src={shot?.user?.profilePicture}
                alt={shot?.user?.name || "User"}
                className="w-12 h-12 rounded-full object-cover"
              />
            </Link>
            <div>
              <Link to={`/${shot?.user?.username}`}>
                <p className="text-sm font-semibold text-gray-900">
                  {shot?.user?.name || "Anonymous"}
                </p>
              </Link>
              {!currentUserShot && (
                <p className="text-green-400 text-sm">
                  Available for work{" "}
                  <span className="text-gray-400">
                  <button 
      onClick={handleFollowToggle}
      disabled={isLoading}
      className={`ml-2 px-2 py-1 rounded-full text-sm border 
        ${isLoading ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-50'}
        ${isFollowing ? 'border-gray-400' : 'border-gray-300'}`}
    >
      {isLoading ? 'Loading...' : isFollowing ? 'Following' : 'Follow'}
    </button>
                  </span>
                </p>
              )}
            </div>
          </div>
          {!currentUserShot && (
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                <button className="p-2 rounded-full bg-white text-gray-600 hover:bg-opacity-90 transition-colors duration-200 border border-gray-200">
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
                <button className="p-2 rounded-full bg-white text-gray-600 hover:bg-opacity-30 transition-colors duration-200 border border-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5"
                    viewBox="0 0 16 16"
                    fill="none"
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
              <button   onClick={openContactModal} className="px-3 text-sm py-2 font-semibold rounded-full bg-black text-white">
                Get in touch
              </button>
            </div>
          )}
        </div>


        <div className="flex justify-center">
          <img
            src={shot.image}
            alt={shot.title}
            className="max-h-full max-w-full rounded-lg object-contain"
          />
          <p>{shot.description}</p>
        </div>

    {currentUserShot &&( <div className="flex justify-center space-x-2 py-4">
          <Link
            to={`/editshot/${shot?._id}`}
            className="w-32 h-16 bg-slate-100 rounded-l-lg inline-block text-center leading-[4rem]"
          >
            Edit
          </Link>
          <button className="w-32 h-16 bg-slate-100">
            Edit shot details
          </button>
          <button 
            className="w-32 h-16 bg-slate-100 rounded-r-lg" 
            onClick={handleDelete}
          >
            Delete
          </button>
        </div> )}

        <div className="flex items-center justify-center">
          <hr className="flex-1 border-t-2 border-gray-200 mt-14" />
          <span className="mx-4 text-gray-500 mt-14">
            <img
              src={shot.user?.profilePicture}
              alt={shot.user?.name || "User"}
              className="w-16 h-16 rounded-full object-cover"
            />
            
          </span>
          <hr className="flex-1 border-t-2 border-gray-200 mt-14" />
        </div>
        <p className="text-xl font-semibold text-gray-900 text-center pt-6">
 {shot.user?.name || "Anonymous"}
</p>
{!currentUserShot && (
 <div className="flex justify-center pb-24">
   <button className="px-4 text-sm py-2 font-semibold rounded-full bg-black text-white">
     Get in touch
   </button>
 </div>
)}
<div>        {!currentUserShot && shot.user && relatedShots.length > 0 && (
  <div className="pb-16">
    <p className="font-bold text-xl mb-6">More by {shot.user.name}</p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {relatedShots.map((relatedShot) => (
        <div key={relatedShot._id} className="w-full">
          <div className="flex flex-col space-y-4">
            <Link to={`/shots/${relatedShot._id}`} onClick={handleLinkClick}>
              <div className="group relative bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <img
                    src={relatedShot.image}
                    alt={relatedShot.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
        
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-sm font-semibold text-white truncate pr-2">
                        {relatedShot.title}
                      </h3>
                      {userId && (
                        <div className="flex space-x-2">
                      
                          <button className="p-2 rounded-full bg-white text-gray-500 hover:bg-opacity-90 transition-colors duration-200">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
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
                            onClick={() => handleLikeToggle(relatedShot._id, relatedShot.likes || [])} 
                            className={`p-2 rounded-full bg-white text-gray-600 hover:bg-opacity-90 transition-colors duration-200 ${userId && relatedShot.likes?.includes(userId) ? 'text-fuchsia-400' : ''}`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 16 16"
                              fill={userId && relatedShot.likes?.includes(userId) ? 'currentColor' : 'none'}
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
          </div>
        </div>
      ))}
    </div>
  </div>
)}


{allShots && allShots.length > 0 && (
  <div className="pb-16">
    <p className="font-bold text-xl mb-6">You might also like</p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {allShots
        .filter(s => s.user?._id !== shot.user?._id && s._id !== shot._id)
        .slice(0, 6)
        .map((recommendedShot) => (
          <div key={recommendedShot._id} className="w-full">
            <div className="flex flex-col space-y-4">
              <Link to={`/shots/${recommendedShot._id}`} onClick={handleLinkClick}>
                <div className="group relative bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative">
                    <img
                      src={recommendedShot.image}
                      alt={recommendedShot.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
                      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center space-x-2">
                          <img
                            src={recommendedShot.user?.profilePicture}
                            alt={recommendedShot.user?.name || "User"}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <h3 className="text-sm font-semibold text-white truncate pr-2">
                            {recommendedShot.title}
                          </h3>
                        </div>
                        {userId && (
                          <div className="flex space-x-2">
       
                            <button className="p-2 rounded-full bg-white text-gray-500 hover:bg-opacity-90 transition-colors duration-200">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
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
                              onClick={() => handleLikeToggle(recommendedShot._id, recommendedShot.likes || [])} 
                              className={`p-2 rounded-full bg-white text-gray-600 hover:bg-opacity-90 transition-colors duration-200 ${userId && recommendedShot.likes?.includes(userId) ? 'text-fuchsia-400' : ''}`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 16 16"
                                fill={userId && recommendedShot.likes?.includes(userId) ? 'currentColor' : 'none'}
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
              <div className="flex items-center justify-between px-1">
                <Link to={`/${recommendedShot.user?.username}`} className="flex items-center space-x-2">
                  <img
                    src={recommendedShot.user?.profilePicture}
                    alt={recommendedShot.user?.name || "User"}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {recommendedShot.user?.name || "Anonymous"}
                  </p>
                </Link>
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-gray-500">
                    {recommendedShot.likes?.length || 0}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M10.7408 2C13.0889 2 14.6667 4.235 14.6667 6.32C14.6667 10.5425 8.11856 14 8.00004 14C7.88152 14 1.33337 10.5425 1.33337 6.32C1.33337 4.235 2.91115 2 5.2593 2C6.60745 2 7.48893 2.6825 8.00004 3.2825C8.51115 2.6825 9.39263 2 10.7408 2Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  </div>
)}

      </div>
      </div>
      {shot.user && (
          <ContactModal 
            isOpen={isContactModalOpen}
            onClose={closeContactModal}
            user={shot.user}
          />
        )}
    </div>
  );
};

export default ShotDetail;