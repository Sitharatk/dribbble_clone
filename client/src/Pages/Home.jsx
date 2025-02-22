import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAngleDown, faFilter } from '@fortawesome/free-solid-svg-icons';
import { ShotContext } from '../Context/ShotContext';
import { AuthContext } from '../Context/AuthContext';
import { Link} from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Card from './Card';

function Home() {
 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { allShots } = useContext(ShotContext);
  const { authData } = useContext(AuthContext);
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSlideChange = (swiper) => {
    setIsStart(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const filteredShots = authData ? allShots.filter(shot => shot.user._id !== authData.id) : allShots;
  const tags = ["Discover", "Animation", "Branding", "Illustration", "Mobile", "Print", "Product Design", "Typography", "Web Design"];

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center py-6 md:py-10 space-y-4 md:space-y-6 relative px-4 md:px-0">
      <h1 className="font-serif text-[40px] md:text-[63px] font-normal leading-tight text-center">
        Discover the world&apos;s <br className="hidden sm:block" /> top designers
      </h1>
      
      <h2 className="font-sans text-[16px] md:text-[18px] font-normal text-center px-4">
        Explore work from the most talented and accomplished designers <br className="hidden md:block" /> ready to take on your next project
      </h2>
   
      <div className="mt-4 md:mt-8 flex items-center bg-gray-100 p-2 hover:p-1.5 w-full max-w-sm mx-auto md:max-w-lg border-2 border-transparent hover:border-pink-100 hover:bg-white rounded-full transition-all">

        <input
          type="text"
          placeholder="What are you looking for?"
          className="flex-1 min-w-0 bg-transparent outline-none px-2 md:px-4 text-sm md:text-base text-gray-700 placeholder-gray-500"
          />
  <button className=" md:flex items-center text-gray-700 font-semibold px-2 md:px-4 py-1 space-x-1 hover:bg-white">
  
          <span>Shots</span>
          <FontAwesomeIcon icon={faAngleDown} className="text-xs" />
        </button>
        <button className="bg-pink-600 text-white rounded-full py-2 px-3 hover:bg-pink-500">
          <FontAwesomeIcon icon={faSearch} className="text-lg" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 justify-center px-4 md:px-0">
        <p className="text-slate-400 text-[14px] md:text-[16px] mr-0 md:mr-3 w-full text-center sm:w-auto sm:text-left">
          Trending searches
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {['landing page', 'e-commerce', 'mobile app', 'logo design', 'dashboard', 'icons'].map(item => (
            <button key={item} className="rounded-full bg-gray-100 px-4 py-1 text-slate-800 text-[13px] md:text-[14.3px] hover:bg-gray-200">
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="h-6 md:h-10" />
      
      <div className="w-full">
        <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between px-4 lg:px-9">
          <div className="relative z-20 w-full lg:w-auto flex justify-center lg:justify-start">
            <button
              onClick={toggleDropdown}
              className="w-32 h-10 border border-gray-200 rounded-lg text-[16px] font-medium bg-white text-gray-700"
            >
              Following <FontAwesomeIcon icon={faAngleDown} className="text-xs ml-1" />
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-44 bg-white shadow-xl rounded-md z-10 border border-gray-200">
                <ul className="flex flex-col space-y-2 p-3 font-semibold text-gray-700">
                  {['Following', 'Popular', 'New & Noteworthy'].map(item => (
                    <li key={item} className="text-gray-500 text-sm cursor-pointer px-2 py-1 rounded-md hover:bg-gray-100 hover:text-gray-900">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="relative w-full lg:max-w-3xl px-4 md:px-8 order-first lg:order-none">
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
              {tags.map((tag) => (
                <SwiperSlide key={tag} className="!w-auto">
                   <Link to={`/posts/${tag.toLowerCase()}`}>
                  <button className="text-gray-600 mb-3 hover:text-gray-900 font-medium text-[15px] whitespace-nowrap px-1">
                    {tag}
                  </button>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            
            <button 
              className={`swiper-button-prev !w-8 !h-8 !rounded-full !bg-transparent !text-black !font-bold 
              hover:!text-gray-600 after:!text-sm !left-0 transition-opacity duration-200 hidden md:flex
              ${isStart ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            />
            <button 
              className={`swiper-button-next !w-8 !h-8 !rounded-full !bg-transparent !text-black !font-bold 
              hover:!text-gray-900 after:!text-sm !right-0 transition-opacity duration-200 hidden md:flex
              ${isEnd ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            />
          </div>

          <div className="shrink-0 w-full lg:w-auto flex justify-center lg:justify-end">
            <button className="border rounded-full px-6 py-2 flex items-center space-x-2 hover:bg-gray-50">
              <FontAwesomeIcon icon={faFilter} className="text-slate-400" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-10 md:mt-20 px-4 md:px-10">
        {filteredShots.length > 0 ? (
          filteredShots.map((shot) => (
            <Card key={shot._id} shot={shot} className="w-full" />
          ))
        ) : (
          <p className="text-center col-span-full">No shots found</p>
        )}
      </div>
    </div>
  );
}

export default Home;