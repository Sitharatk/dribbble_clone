import { useContext, useEffect, useState } from 'react';
import Logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faArrowTrendUp,
  faStar,
  faSearch,
  faFileLines,
  faCircleInfo,
  faFilePen,
  faBell,
  faEnvelope,faUserGroup
} from '@fortawesome/free-solid-svg-icons';
import { Link ,useLocation, useNavigate} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { ShotContext } from '../Context/ShotContext';


function Navbar() {
  const { authData ,logout} = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isMobileExploreOpen, setIsMobileExploreOpen] = useState(false); // New state for mobile explore
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  // const [isMobileExploreOpen1, setIsMobileExploreOpen1] = useState(false); 
  const [isScrolled, setIsScrolled] = useState(false);
  const {shots} = useContext(ShotContext);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileHireOpen, setIsMobileHireOpen] = useState(false);

  useEffect(() => {
    if (isHomePage) {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const threshold = 250;
        setIsScrolled(scrollPosition > threshold);
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      setIsScrolled(true); 
    }
  }, [isHomePage]);

  useEffect(() => {
    let timeoutId;
  
    if (isProfileDropdownOpen) {
      timeoutId = setTimeout(() => {
        setIsProfileDropdownOpen(false);
      }, 3000); 
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isProfileDropdownOpen]);
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
  
  useEffect(() => {
    let dropdownTimeout2;
  
    if (isDropdownOpen2) {
      dropdownTimeout2 = setTimeout(() => {
        setIsDropdownOpen2(false);
      }, 1500); 
    }
  
    return () => {
      if (dropdownTimeout2) {
        clearTimeout(dropdownTimeout2);
      }
    };
  }, [isDropdownOpen2]);
  
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  const handleDropdownClick = (tag) => {
    navigate(`/posts/${tag.toLowerCase()}`);
    setIsMobileExploreOpen(false);
    setIsMobileHireOpen(false);
    setIsOpen(false);
  };

  return (
    <nav className={`bg-white z-40 ${isScrolled ? 'fixed top-0 left-0 w-full' : 'relative'} transition-all duration-300 ease-in-out`}>
    <div className="flex justify-between items-center py-6 px-4 sm:px-9">
    <div className="flex items-center space-x-4">
          <div className=" lg:hidden">
            <button className="p-2 text-black hover:text-gray-400 focus:outline-none" onClick={toggleMenu}>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            {isOpen && (
              <div className="absolute top-16 mt-4 p-5 space-y-3 left-0 w-full bg-white shadow-lg z-10 border-t border-gray-200">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-white">
                    <div className="relative">
                      <button 
                        className="hover:text-gray-400 flex items-center text-lg font-bold w-full space-x-4"
                        onClick={() => setIsMobileExploreOpen(!isMobileExploreOpen)}
                      >
                        <span>Explore</span>
                        <FontAwesomeIcon 
                          icon={faAngleDown} 
                          className={`text-xs ml-1 transform transition-transform ${isMobileExploreOpen ? 'rotate-180' : ''}`} 
                        />
                      </button>
                      {isMobileExploreOpen && (
                        <div className="mt-2 bg-white px-4">
                          <ul className="space-y-2">
                          <li 
                              className="flex items-center space-x-2 font-semibold hover:text-gray-900 cursor-pointer py-2"
                              onClick={() => handleDropdownClick('popular')}
                            >
                              <FontAwesomeIcon icon={faUserGroup} />
                              <span>Following</span>
                            </li>
                            <li 
                              className="flex items-center space-x-2 font-semibold hover:text-gray-900 cursor-pointer py-2"
                              onClick={() => handleDropdownClick('popular')}
                            >
                              <FontAwesomeIcon icon={faArrowTrendUp} />
                              <span>Popular</span>
                            </li>
                            <li 
                              className="flex items-center space-x-2 font-semibold hover:text-gray-900 cursor-pointer py-2"
                              onClick={() => handleDropdownClick('new-and-noteworthy')}
                            >
                              <FontAwesomeIcon icon={faStar} />
                              <span>New and Noteworthy</span>
                            </li>
                            <hr className="border-gray-200 my-2" />
                            {[
                              'Product Design',
                              'Web Design',
                              'Animation',
                              'Branding',
                              'Illustration',
                              'Logo',
                              'Typography',
                              'Print',
                            ].map((tag) => (
                              <li
                                key={tag}
                                className="hover:text-gray-400 cursor-pointer py-2"
                                onClick={() => handleDropdownClick(tag)}
                              >
                                {tag}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </li>
                  <li className="px-4 py-2">
          <div className="relative">
            <button 
              className="hover:text-gray-400 flex items-center space-x-4 text-lg font-bold w-full"
              onClick={() => setIsMobileHireOpen(!isMobileHireOpen)}
            >
              <span>Hire a Designer</span>
              <FontAwesomeIcon 
                icon={faAngleDown} 
                className={`text-xs transform transition-transform ${isMobileHireOpen ? 'rotate-180' : ''}`} 
              />
            </button>
            {isMobileHireOpen && (
              <div className="mt-2 bg-white px-4">
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2 font-semibold hover:text-gray-900 cursor-pointer py-2">
                    <FontAwesomeIcon icon={faSearch} className="text-sm" />
                    <span>Browse Designers</span>
                  </li>
                  <Link to="/submitbrief">
                    <li className="flex items-center space-x-2 font-semibold hover:text-gray-900 cursor-pointer py-2">
                      <FontAwesomeIcon icon={faFilePen} />
                      <span>Submit a Project Brief</span>
                    </li>
                  </Link>
                  <Link to="/postjob">
                    <li className="flex items-center space-x-2 font-semibold hover:text-gray-900 cursor-pointer py-2">
                      <FontAwesomeIcon icon={faFileLines} className="text-sm" />
                      <span>Post a Job</span>
                    </li>
                  </Link>
                  <Link to="/hiring">
                    <li className="flex items-center space-x-2 font-semibold hover:text-gray-900 cursor-pointer py-2">
                      <FontAwesomeIcon icon={faCircleInfo} className="text-base" />
                      <span>Hiring on Dribbble</span>
                    </li>
                  </Link>
                </ul>
              </div>
            )}
          </div>
        </li>
                  <li className="px-4 py-2 text-lg font-bold hover:bg-gray-100">Find Jobs</li>
                  <li className="px-4 py-2 text-lg font-bold hover:bg-gray-100">Blog</li>
                  <li className="px-4 py-2 text-lg font-bold text-pink-500 hover:bg-gray-100">Go Pro</li>
                </ul>
              </div>
            )}
          </div>
        <Link to="/">
          <img src={Logo} alt="Dribbble Logo" className="w-24 h-auto" />
        </Link>
      </div>

      <div className={`flex-grow max-w-lg  mb-5 mx-8 ${(isScrolled || !isHomePage) ? 'visible' : 'hidden'}`}>
        <div className="flex  items-center bg-gray-100 p-2 rounded-full border-gray-100 hover:bg-white hover:border-2 hover:border-pink-100">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="flex-grow bg-transparent outline-none px-4 text-gray-700 placeholder-gray-500"
          />
          <button className="text-gray-700 font-semibold px-4 py-1">
            <span>Shots</span>
            <FontAwesomeIcon icon={faAngleDown} className="text-xs ml-1" />
          </button>
          <button className="bg-pink-600 text-white rounded-full py-2 px-3 hover:bg-pink-200">
            <FontAwesomeIcon icon={faSearch} className="text-lg" />
          </button>
        </div>
      </div>
<div
  className={`hidden lg:flex space-x-6 text-gray-800 ${
    isScrolled ? 'ml-0' : 'mr-96'
  }`}
>
  <div
    className="relative"
    onClick={() =>setIsDropdownOpen((prev) => !prev)}
  >
    <button className="hover:text-gray-400 flex items-center font-semibold">
      Explore <FontAwesomeIcon icon={faAngleDown} className="text-xs ml-1" />
    </button>
    {isDropdownOpen && (
        <div className="absolute left-0 top-full mt-4 p-3 w-64 bg-white shadow-xl rounded-xl z-10 border border-gray-50">
          <ul
            className="flex flex-col space-y-4 p-2 text-gray-700"
            style={{ fontSize: '15px' }}
          >
            <li
              className="flex items-center space-x-2 font-semibold hover:text-gray-900 cursor-pointer"
              onClick={() => handleDropdownClick('popular')}
            >
              <FontAwesomeIcon icon={faArrowTrendUp} />
              <span>Popular</span>
            </li>
            <li
              className="flex items-center space-x-2 font-semibold hover:text-gray-900 cursor-pointer"
              onClick={() => handleDropdownClick('new-and-noteworthy')}
            >
              <FontAwesomeIcon icon={faStar} />
              <span>New and Noteworthy</span>
            </li>
            <hr className="border-gray-200 my-2" />
            {[
              'Product Design',
              'Web Design',
              'Animation',
              'Branding',
              'Illustration',
              'Logo',
              'Typography',
              'Print',
            ].map((tag) => (
              <li
                key={tag}
                className="hover:text-gray-400 cursor-pointer"
                onClick={() => handleDropdownClick(tag)}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      )}
  </div>

  <div
    className="relative"
    onClick={() =>setIsDropdownOpen2((prev) => !prev)}
  >
    <button className="hover:text-gray-400 flex items-center font-semibold">
      Hire a Designer <FontAwesomeIcon icon={faAngleDown} className="text-xs ml-1" />
    </button>
    {isDropdownOpen2 && (
      <div className="absolute left-0 top-full mt-6 p-3 w-64 bg-white  rounded-md z-10 border border-white">
        <ul
          className="flex flex-col space-y-4 p-4 font-semibold text-gray-700"
          style={{ fontSize: '15px' }}
        >
          <li className="flex items-center space-x-2 font-semibold hover:text-gray-900 cursor-pointer">
            <FontAwesomeIcon icon={faSearch} className="text-sm" />
            <span>Browse Designers</span>
          </li>
         <Link to='/submitbrief'><li className="flex items-center space-x-2 font-semibold hover:text-gray-900 cursor-pointer">
            <FontAwesomeIcon icon={faFilePen} />
            <span>Submit a Project Brief</span>
          </li></Link>
        
           <Link to='/postjob'><li className="flex items-center space-x-2 font-semibold hover:text-gray-900 cursor-pointer"> <FontAwesomeIcon icon={faFileLines} className="text-sm" />
            <span>Post a Job</span>
          </li></Link>
         <Link to='/hiring'> <li className="flex items-center space-x-2 font-semibold hover:text-gray-900 cursor-pointer">
            <FontAwesomeIcon icon={faCircleInfo} className="text-base" />
            <span>Hiring on Dribbble</span>
          </li></Link>
        </ul>
      </div>
    )}
  </div>

  <button className="hover:text-gray-400 font-semibold">Find Jobs</button>
 <Link to='/blog'> <button className="hover:text-gray-400 font-semibold">Blog</button></Link>
</div>

<div className="flex items-center mt-2">
{authData ? (
        
            <>
             <button className="relative mx-4">
                <FontAwesomeIcon icon={faEnvelope} className="text-gray-800 text-xl" />
              </button>
              <button className="relative mx-4">
                <FontAwesomeIcon icon={faBell} className="text-gray-800 text-xl" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              {shots.length > 0 && (
  <Link to='/uploads'>
  <button className="sm:border sm:rounded-full sm:font-medium sm:ml-2 sm:w-32 sm:14 sm:flex sm:items-center sm:justify-center sm:py-3 hidden">
  Share Work
</button>

  </Link>
)}

              <div className="relative">
              <img
                  src={authData.profilePicture || ''} 
                  alt="User Profile"
                  className="w-11 h-11 ml-3 rounded-full object-cover border border-gray-300 cursor-pointer"
                  onClick={() => setIsProfileDropdownOpen((prev) => !prev)}
                />
               {isProfileDropdownOpen && (
  <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg border border-gray-100">
    <div className="pt-3 text-center">
      <div className="flex justify-center">
        <img
          src={authData.profilePicture || ' '}
          alt="User Profile"
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 hover:border-gray-300 transition-colors"
        />
      </div>
      <p className="mt-2 font-bold text-gray-800">{authData.name}</p>
    </div>
    <div className="py-2">
      <Link to="/userwork">
        <li className="px-4 py-2 ml-5 cursor-pointer flex items-center">
          <span className="text-gray-700">Settings</span>
        </li>
      </Link>
      <hr className="my-2 border-gray-100" />
      <button
        className="px-4 py-2 ml-5 cursor-pointer z-10 flex items-center "
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  </div>
)}

              </div>
            </>
          ) : (
      
            <>
              <Link to="/signup">
                <button className="text-black font-semibold px-4 mb-2">Sign up</button>
              </Link>
              <Link to="/login">
                <button className="bg-gray-800 text-white font-semibold px-6 py-3 mb-3 rounded-full hover:bg-gray-700">
                  Log in
                </button>
              </Link>
            </>
          )}
</div>

      </div>
    </nav>
  );
}

export default Navbar;
