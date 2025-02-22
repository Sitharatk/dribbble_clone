import { useContext, useEffect, useState} from 'react';
import { AuthContext } from '../Context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import { Link, useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const ResponsiveNav = ({ navItems }) => {
  const location = useLocation();
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = (swiper) => {
    setIsStart(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <>
      {/* Desktop Navigation - Hidden on mobile */}
      <div className="hidden md:flex space-x-2 py-4 font-medium">
        {navItems.map((item) => (
          <Link to={item.path} key={item.name}>
            <button
              className={`text-gray-600 hover:text-gray-900 px-4 py-2 rounded-full text-[15px] ${
                location.pathname === item.path ? 'bg-pink-100' : ''
              }`}
            >
              {item.name}
            </button>
          </Link>
        ))}
      </div>

      {/* Mobile Navigation with Swiper - Visible only on mobile */}
      <div className="relative w-full md:hidden">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          slidesPerView="auto"
          spaceBetween={32}
          className="!static"
          onSlideChange={handleSlideChange}
          onSwiper={handleSlideChange}
        >
          {navItems.map((item) => (
            <SwiperSlide key={item.name} className="!w-auto">
              <Link to={item.path}>
                <button
                  className={`text-gray-600 hover:text-gray-900 font-medium text-[15px] whitespace-nowrap px-4 py-2 rounded-full ${
                    location.pathname === item.path ? 'bg-pink-100' : ''
                  }`}
                >
                  {item.name}
                </button>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

// Update your UserDetails component
const UserDetails = () => {
  const { authData } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const navItems = [
    { name: 'Work', path: '/userwork' },
    { name: 'Services', path: '/services' },
    { name: 'Boosted Shots', path: '/boosted' },
    { name: 'Collections', path: '/collections' },
    { name: 'Liked Shots', path: '/likes' },
    { name: 'About', path: '/userabout' },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
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

  return (
    <div className="mt-32">
      <div className="flex items-center justify-center space-x-10 p-5">
        <div>
          <img
            src={authData.profilePicture || ' '}
            alt="User Profile"
            className="w-20 h-20 ml-3 rounded-full object-cover border border-gray-300 cursor-pointer"
          />
        </div>
        <div className="space-y-3">
          <h1 className="font-bold text-2xl">{authData.name}</h1>
          <h1>{authData.location}</h1>
          <span className="space-x-2">
            <Link to="/editprofile">
              <button className="border py-3 px-5 rounded-full mt-2 font-semibold text-sm">
                Edit Profile
              </button>
            </Link>
            <button
              onClick={toggleDropdown}
              className="border py-2 px-3 rounded-full mt-2 font-semibold"
            >
              <FontAwesomeIcon icon={faEllipsis} />
            </button>
          </span>
        </div>
      </div>

      {/* New ResponsiveNav component */}
      <ResponsiveNav navItems={navItems} />

      <div className="flex justify-center mb-14">
        <hr className="w-full max-w-[1210px] border-t-1 border-gray-200" />
      </div>
    </div>
  );
};

export default UserDetails;