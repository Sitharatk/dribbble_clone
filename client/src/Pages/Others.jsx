import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShotContext } from "../Context/ShotContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import axiosInstance from "../../utilities/axiosInstance";
import { AuthContext  } from "../Context/AuthContext";


function Others() {
    const { username } = useParams(); 
    const{allShots}=useContext(ShotContext)
    const {authData,unfollowUser,followUser}=useContext(AuthContext)
   
      // State to store the user's profile data and posts
  const [userProfile, setUserProfile] = useState(null);
  const [userProfile1, setUserProfile1] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get(`/auth/users/${username}`);
        setUserProfile1(response.data); 
        console.log('data',response.data); // Set user profile data
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [username]);

  useEffect(() => {

    const profile = allShots.find((shot) => shot.user.username === username)?.user;

if (profile) {
      setUserProfile(profile);
      const posts = allShots.filter((shot) => shot.user.username === username);
   
      setUserPosts(posts);
    }
  }, [username, allShots]);

  useEffect(() => {
    if (authData && userProfile && authData.following) {
        // Check if the current user is following the profile user
        const isAlreadyFollowing = authData.following.includes(userProfile._id);
        setIsFollowing(isAlreadyFollowing);
    }
}, [authData, userProfile]);

const handleFollowToggle = async () => {
  if (!authData) return; // Not logged in
  if (!userProfile) return; // No profile loaded
  
  setIsLoading(true);
  
  try {
      if (isFollowing) {
          // Unfollow logic using context method
          await unfollowUser(userProfile._id);
      } else {
          // Follow logic using context method
          await followUser(userProfile._id);
      }
      
      // Toggle the state optimistically
      setIsFollowing(!isFollowing);
      
      // Refresh user profile data
      const response = await axiosInstance.get(`/auth/users/${username}`);
      setUserProfile(response.data);
  } catch (error) {
      console.error("Error updating follow status:", error);
      // Revert the optimistic update if there was an error
      setIsFollowing(isFollowing);
  
  } finally {
      setIsLoading(false);
  }
};


  useEffect(() => {
    let dropdownTimeout;
  
    if (isDropdownOpen) {
      dropdownTimeout = setTimeout(() => {
        setIsDropdownOpen(false);
      }, 1500); 
    }
  
    return () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [isDropdownOpen]);
  const navItems = [
    { name: 'Work' },
    { name: 'Collections' },
    { name: 'Liked Shots' },
    { name: 'About', path: '/userabout' },
  ];
  console.log('userProfile',userProfile)

  return (
    <div className="mt-36 pl-20">
    {userProfile ? (
      <div>
        {/* Profile Picture and Name */}
        <div className="flex items-center space-x-3">
          <img
            src={userProfile.profilePicture}
            alt={userProfile.name || "User"}
            className="w-16 h-16 rounded-full object-cover"
          />
       
        </div>
        
        <h1 className="text-2xl font-semibold mt-1">{userProfile.name}</h1>
        {/* Display their posts */}
        <div className="flex space-x-8 mt-2 text-gray-600">
            <p>{userProfile1.followers ?.length ||0} followers</p>
            <p>{userProfile1.following?.length || 0} following</p>
            <p>{userProfile1.totalLikesReceived || 0} likes</p>
        </div>
        <div className="flex space-x-4 mt-4 items-center">
  <button className="px-6 text-sm py-3 font-semibold rounded-full bg-black text-white">
    Get in touch
  </button>
  {authData && authData._id !== userProfile._id && (
                        <button
                            onClick={handleFollowToggle}
                            disabled={isLoading}
                            className={`px-4 py-2 rounded-full ${
                                isFollowing 
                                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            } transition-colors`}
                        >
                            {isLoading ? 'Loading...' : isFollowing ? 'Following' : 'Follow'}
                        </button>
                    )}
  <span className="relative" onClick={() => setIsDropdownOpen((prev) => !prev)}>
    <button className="border py-2 px-4 rounded-full mt-2 font-semibold">
      <FontAwesomeIcon icon={faEllipsis} />
    </button>
    {isDropdownOpen && (
      <div className="absolute left-0 top-full mt-4 p-2 w-60 text-sm bg-white shadow-xl rounded-md z-10 border border-gray-200">
        <ul className="flex flex-col space-y-4 p-2 text-gray-500">
          <li className="hover:text-gray-600 cursor-pointer">
            Add or remove from lists...
          </li>
          <li className="hover:text-gray-600 cursor-pointer">
            Block {userProfile.name}
          </li>
          <li className="hover:text-gray-600 cursor-pointer">
            Report {userProfile.name}
          </li>
        </ul>
      </div>
    )}
  </span>
</div>

<div className="flex space-x-3 py-5  font-semibold mt-6">
        {navItems.map((item) => (
          <Link to={item.path} key={item.name}>
            <button
              className={`py-2 px-5 rounded-full ${
                location.pathname === item.path ? 'bg-pink-100' : 'bg-transparent'
              }`}
            >
              {item.name}
            </button>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mb-9 pr-11">
        <hr className="w-[1210px] border-t-1 border-gray-200" />
      </div>
     
        <div className="mt-6">
         
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 pr-16 ">
            {userPosts.map((post) => (
              <div key={post._id} className="flex flex-col">
 <Link to=  {`/shots/${post._id}`}> <div className="group relative bg-white rounded-lg shadow-md overflow-hidden ">
            <div className="relative">
                <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-64 object-cover"
                />
                
                {/* Hover overlay with name and like */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {/* Title */}
                        <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                        
                        {/* Like button */}
                        <button className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors duration-200">
                        <svg  xmlns="http://www.w3.org/2000/svg"   width="16"   height="16"  viewBox="0 0 16 16"  fill="white" role="img" >
                  <path   d="M10.7408 2C13.0889 2 14.6667 4.235 14.6667 6.32C14.6667 10.5425 8.11856 14 8.00004 14C7.88152 14 1.33337 10.5425 1.33337 6.32C1.33337 4.235 2.91115 2 5.2593 2C6.60745 2 7.48893 2.6825 8.00004 3.2825C8.51115 2.6825 9.39263 2 10.7408 2Z"   stroke="currentColor" 
                    strokeWidth="1.5"  strokeLinecap="round"   strokeLinejoin="round"/></svg></button>
                    </div>
                </div>
            </div>
        </div></Link>

      
              </div>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <p>Loading user profile..</p>
    )}
  </div>
);
}

export default Others;


     