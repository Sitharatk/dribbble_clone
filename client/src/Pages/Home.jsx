import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAngleDown, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useContext, useRef, useState } from 'react';
import { ShotContext } from '../Context/ShotContext';
import Card from './Card';
import { AuthContext } from '../Context/AuthContext';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { allShots } = useContext(ShotContext);
  const { authData } = useContext(AuthContext);

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const swiperRef = useRef(null);
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const handleSlideChange = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      setShowLeftArrow(!swiper.isBeginning);
      setShowRightArrow(!swiper.isEnd);
    }
  };
  const filteredShots = authData ? allShots.filter(shot => shot.user._id !== authData.id) : allShots;

  const tags = ["Discover", "Animation", "Branding", "Illustration", "Mobile", "Print", "Product Design", "Typography", "Web Design"];

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center py-10 space-y-6 relative">
      <h1 className="font-serif text-[63px] font-normal leading-tight text-center">
        Discover the world&apos;s <br /> top designers
      </h1>
      
      <h2 className="font-sans text-[18px] font-normal text-center">
        Explore work from the most talented and accomplished designers <br /> ready to take on your next project
      </h2>
   
      <div className="mt-12 flex items-center bg-gray-100 p-[7.5px] hover:p-[5.5px] w-full max-w-lg border-gray-100 hover:bg-white rounded-full hover:border-2 hover:border-pink-100">
        <input
          type="text"
          placeholder="What are you looking for?"
          className="flex-grow bg-transparent outline-none px-4 text-gray-700 placeholder-gray-500"
        />
        <button className="text-gray-700 font-semibold px-4 py-1 mr-2 space-x-1 hover:bg-white">
          <span>Shots</span>
          <FontAwesomeIcon icon={faAngleDown} className="text-xs" />
        </button>
        <button className="bg-pink-600 text-white rounded-full py-2 px-3 hover:bg-pink-500">
          <FontAwesomeIcon icon={faSearch} className="text-lg" />
        </button>
      </div>

      <div className='flex flex-wrap gap-2'>
        <p className='text-slate-400 text-[16px] mr-3 w-full sm:w-auto'>Trending searches</p>
        <button className='rounded-full bg-gray-100 px-4 text-slate-800 text-[14.3px]'>landing page</button>
        <button className='rounded-full bg-gray-100 px-4 text-slate-800 text-[14.3px]'>e-commerce</button>
        <button className='rounded-full bg-gray-100 px-4 text-slate-800 text-[14.3px]'>mobile app</button>
        <button className='rounded-full bg-gray-100 px-4 text-slate-800 text-[14.3px]'>logo design</button>
        <button className='rounded-full bg-gray-100 px-4 text-slate-800 text-[14.3px]'>dashboard</button>
        <button className='rounded-full bg-gray-100 px-4 text-slate-800 text-[14.3px]'>icons</button>
      </div>

      <div className='h-10'></div>
      <div className="w-full px-4">
  {/* Container for all elements */}
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:space-x-4 ">
    {/* Following button */}
    <div className="relative z-20">
      <button
        onClick={toggleDropdown}
        className="w-32 h-10 border border-gray-200 rounded-lg text-[16px] font-medium bg-white text-gray-700"
      >
        Following <FontAwesomeIcon icon={faAngleDown} className="text-xs ml-1" />
      </button>
      {isDropdownOpen && (
        <div className="absolute left-0 top-full mt-2 w-44 bg-white shadow-xl rounded-md z-10 border border-gray-200">
          <ul className="flex flex-col space-y-2 p-3 font-semibold text-gray-700">
            <li className="text-gray-500 text-sm cursor-pointer px-2 py-1 rounded-md hover:bg-gray-100 hover:text-gray-900">
              Following
            </li>
            <li className="text-gray-500 text-sm cursor-pointer px-2 py-1 rounded-md hover:bg-gray-100 hover:text-gray-900">
              Popular
            </li>
            <li className="text-gray-500 text-sm cursor-pointer px-2 py-1 rounded-md hover:bg-gray-100 hover:text-gray-900">
              New & Noteworthy
            </li>
          </ul>
        </div>
      )}
    </div>

    {/* Swiper container */}
    <div className=" flex-grow slider-container my-4 lg:my-0 order-last lg:order-none ">
      <Swiper
        ref={swiperRef}
        slidesPerView="auto"
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
        onSlideChange={handleSlideChange}
        onAfterInit={handleSlideChange}
        className={`category-swiper ${showLeftArrow ? 'show-prev' : ''} ${showRightArrow ? 'show-next' : ''}`}
      >
        {tags.map((tag) => (
          <SwiperSlide key={tag} className="!w-auto">
            <Link to={`/posts/${tag.toLowerCase()}`}>
              <button className="text-gray-600 hover:text-gray-900 font-medium text-[15px] whitespace-nowrap ">
                {tag}
              </button>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

    {/* Filter button */}
    <div className="shrink-0">
      <button className="border rounded-full px-6 py-2 flex items-center space-x-2">
        <FontAwesomeIcon icon={faFilter} className="text-slate-400" />
        <span>Filters</span>
      </button>
    </div>
  </div>
</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-20 px-10">
        {filteredShots.length > 0 ? (
          filteredShots.map((shot) => (
            <Card key={shot._id} shot={shot} className="w-56 h-56" />
          ))
        ) : (
          <p>No shots found</p>
        )}
      </div>
    </div>
  );
}

export default Home;