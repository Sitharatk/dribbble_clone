import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShotContext } from "../Context/ShotContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

function Others() {
    const { username } = useParams(); 
    const{allShots}=useContext(ShotContext)
      // State to store the user's profile data and posts
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       const response = await axios.get(`https://your-api.com/api/users/${username}`);
  //       setUserProfile(response.data); // Set user profile data
  //     } catch (error) {
  //       console.error("Error fetching user profile:", error);
  //     }
  //   };

  //   fetchUserProfile();
  // }, [username]);

  useEffect(() => {

    const profile = allShots.find((shot) => shot.user.username === username)?.user;

if (profile) {
      setUserProfile(profile);
      const posts = allShots.filter((shot) => shot.user.username === username);
      setUserPosts(posts);
    }
  }, [username, allShots]);

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
    { name: 'Services' },
    { name: 'Boosted Shots' },
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
            <p>{userProfile.followers ?.length ||0} followers</p>
            <p>{userProfile.following?.length || 0} following</p>
            <p>{userProfile.likes?.length || 0} likes</p>
        </div>
        <div className="flex space-x-4 mt-4 items-center">
  <button className="px-6 text-sm py-3 font-semibold rounded-full bg-black text-white">
    Get in touch
  </button>
  <button className="px-6 text-sm py-3 font-semibold rounded-full border">
    Follow
  </button>
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
      <p>Loading user profile...</p>
    )}
  </div>
);
}

export default Others;


     