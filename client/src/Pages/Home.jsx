import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSearch, faAngleDown,faFilter } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { ShotContext } from '../Context/ShotContext';
import Card from './Card';

function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [isFilterOpen, setIsFilterOpen] = useState(false);
  const {allShots} =useContext(ShotContext)
  console.log(allShots)

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // const toggleFilter = () => {
  //   setIsFilterOpen((prev) => !prev);
  // };
  
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center  py-10 space-y-6 relative">
      <h1 className="font-serif text-[63px] font-normal leading-tight text-center">
        Discover the world’s <br /> top designers
      </h1>
      
      <h2 className="font-sans text-[18px] font-normal text-center">
        Explore work from the most talented and accomplished designers <br /> ready to take on your next project
      </h2>
   
      <div className=" mt-12 flex items-center bg-gray-100 p-[7.5px] hover:p-[5.5px] w-full max-w-lg border-gray-100 hover:bg-white rounded-full hover:border-2 hover:border-pink-100">
        <input
          type="text"
          placeholder="What are you looking for?"
          className=" flex-grow bg-transparent outline-none px-4 text-gray-700 placeholder-gray-500"
        />
        <button className="text-gray-700 font-semibold px-4 py-1 mr-2 space-x-1 hover:bg-white">
          <span>Shots</span>

          <FontAwesomeIcon icon={faAngleDown} className="text-xs" />
        </button>
        <button className="bg-pink-600 text-white rounded-full py-2 px-3 hover:bg-pink-500">
          <FontAwesomeIcon icon={faSearch} className="text-lg" />
        </button>
      </div>
      <div  className='flex gap-2 '>
        <p className='  text-slate-400 text-[16px] mr-3'>Trending searches</p>
        <button className=' rounded-full bg-gray-100 px-4 text-slate-800 text-[14.3px]'>landing page</button>
        <button className=' rounded-full bg-gray-100 px-4 text-slate-800 text-[14.3px]'>e-commerce</button>
        <button className=' rounded-full bg-gray-100 px-4 text-slate-800 text-[14.3px]'>mobile app</button>
        <button className=' rounded-full bg-gray-100 px-4 text-slate-800 text-[14.3px]'>logo design</button>
        <button className=' rounded-full bg-gray-100 px-4 text-slate-800 text-[14.3px]'>dashboard</button>
        <button className=' rounded-full bg-gray-100 px-4 text-slate-800 text-[14.3px]'>icons</button>
      </div>
      <div className='h-10'></div>
      <div className='flex space-x-28 '>
      <div className="relative">

      <button onClick={toggleDropdown} className="w-32 h-10 border border-gray-200 rounded-lg text-[16px] font-medium bg-white text-gray-700">
    Following <FontAwesomeIcon icon={faAngleDown} className="text-xs ml-1" />
  </button>
      {isDropdownOpen && (
        <div className="absolute left-0 top-ful mt-2 w-44 bg-white shadow-xl rounded-md z-10 border border-gray-200">
          <ul className="flex flex-col space-y-2 p-3 font-semibold text-gray-700">
            <li
              className="text-gray-500 text-sm cursor-pointer px-2 py-1 rounded-md hover:bg-gray-100 hover:text-gray-900">
              Following
            </li>
            <li
              className="text-gray-500 text-sm cursor-pointer px-2 py-1 rounded-md hover:bg-gray-100 hover:text-gray-900" >
              Popular
            </li>
            <li
              className="text-gray-500 text-sm cursor-pointer px-2 py-1 rounded-md hover:bg-gray-100 hover:text-gray-900"  >
              New & Noteworthy
           </li>
          </ul>
        </div>
      )}
    </div>
        <div className='space-x-6 mt-2 text-[15px]'>
          <button className='font-semibold'>Discover</button>
          <button className='font-semibold'>Animation</button>
          <button className='font-semibold'>Branding</button>
          <button className='font-semibold'>Illustration</button>
          <button className='font-semibold'>Mobile</button>
          <button className='font-semibold'>Product Design</button>
          <button className='font-semibold'>Typography</button>
          <button className='font-semibold'>Web Design</button>
        </div>
        <div>
          <button className='border rounded-full px-6 py-2 space-x-2 mb-9'><FontAwesomeIcon icon={faFilter} className='text-slate-400' /><span>Filters</span></button>
        </div>

      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-12 px-10 ">
        {allShots.length > 0 ? (
          allShots.map((shot) => <Card key={shot.id} shot={shot} className="w-56 h-56" />)
        ) : (
          <p>No shots found </p>
        )}
      </div>
    </div>
  );
}

export default Home;
