import { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ShotContext } from '../Context/ShotContext'
import Card from './Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faFilter } from '@fortawesome/free-solid-svg-icons'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import { Navigation } from "swiper/modules"

function Tags() {
  const { tags } = useParams()
  const { allShots } = useContext(ShotContext)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isStart, setIsStart] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const filteredShots = !tags || tags.toLowerCase() === 'discover'
    ? allShots
    : allShots.filter((shot) => shot.tags.includes(tags))

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev)
  }

  const handleSlideChange = (swiper) => {
    setIsStart(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  const tagsList = [
    'Discover',
    'Animation',
    'Branding',
    'Illustration',
    'Logo',
    'Product Design',
    'Typography',
    'Web Design'
  ]

  return (
    <div className="mt-36 md:mt-28 w-full">
      <div className="flex flex-col px-4 md:px-10 ">
        {/* Top row with Following and Filter */}
        <div className="flex justify-between items-center mt-4">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="w-32 h-10 border border-gray-200 rounded-lg text-sm md:text-base font-medium bg-white text-gray-700 hover:bg-gray-50"
            >
              Following <FontAwesomeIcon icon={faAngleDown} className="text-xs ml-1" />
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-44 bg-white shadow-xl rounded-md z-10 border border-gray-200">
                <ul className="flex flex-col p-3 font-semibold text-gray-700">
                  {['Following', 'Popular', 'New & Noteworthy'].map((item) => (
                    <li
                      key={item}
                      className="text-gray-500 text-sm cursor-pointer px-2 py-2 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Filters button */}
          <button className="border rounded-full px-4 md:px-6 py-2 flex items-center space-x-2 text-sm md:text-base hover:bg-gray-50 transition-colors">
            <FontAwesomeIcon icon={faFilter} className="text-slate-400" />
            <span>Filters</span>
          </button>
        </div>

        {/* Tags swiper */}
        <div className="relative w-full lg:max-w-3xl mx-auto  ">
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
            {tagsList.map((tag) => (
              <SwiperSlide key={tag} className="!w-auto">
                <Link to={`/posts/${tag.toLowerCase()}`}>
                  <button 
                    className={`text-gray-600 mb-3 hover:text-gray-900 font-medium text-[15px] whitespace-nowrap px-1
                      ${tags.toLowerCase() === tag.toLowerCase() ? 'bg-gray-100 rounded-full px-2' : ''}`}
                  >
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
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mt-6 md:mt-10 px-4 md:px-10">
        {filteredShots.length > 0 ? (
          filteredShots.map((shot) => (
            <Card
              key={shot._id}
              shot={shot}
              className="w-full aspect-square"
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center py-10">No shots found</p>
        )}
      </div>
    </div>
  )
}

export default Tags