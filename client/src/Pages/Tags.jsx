
import { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ShotContext } from '../Context/ShotContext'
import Card from './Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {  faAngleDown,faFilter } from '@fortawesome/free-solid-svg-icons';

function Tags() {
    const {tags}=useParams()
   const{allShots}=useContext(ShotContext)
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const filteredShots =!tags || tags.toLowerCase() === 'discover' ? allShots : allShots.filter((shot) => shot.tags.includes(tags));
 const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className='mt-28'>
        <div className="flex flex-wrap justify-between space-y-4 lg:space-x-28 items-center px-10">
  <div className="relative">
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

  
<div className="flex flex-wrap space-x-5 mt-2 text-[15px]">
  {['Discover', 'Animation', 'Branding', 'Illustration', 'Logo', 'Product Design', 'Typography', 'Web Design'].map((tag) => (
    <Link key={tag} to={`/posts/${tag.toLowerCase()}`}>
    <button
              className={`font-semibold  py-1 rounded ${
                tags.toLowerCase() === tag.toLowerCase() ? 'bg-gray-100 rounded-full px-2' : 'bg-transparent text-black'
              }`}
            >
              {tag}
            </button>
    </Link>
  ))}
</div>

  <div>
    <button className="border rounded-full px-6 py-2 flex items-center space-x-2">
      <FontAwesomeIcon icon={faFilter} className="text-slate-400" />
      <span>Filters</span>
    </button>
  </div>
</div>

<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 px-10">
  {filteredShots.length > 0 ? (
    filteredShots.map((shot) => (
      <Card key={shot._id} shot={shot} className="w-56 h-56" />
    ))
  ) : (
    <p>No shots found</p>
  )}
</div>
    </div>
  )
}

export default Tags