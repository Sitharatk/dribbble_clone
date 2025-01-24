import React from 'react'

// eslint-disable-next-line react/prop-types
function Card({shot}) {
  return (
    <div><div className="flex flex-col">
    {/* Image Container */}
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          // eslint-disable-next-line react/prop-types
          src={shot.image}
          // eslint-disable-next-line react/prop-types
          alt={shot.title}
          className="w-full h-56 object-cover"
        />

        {/* Hover overlay with name and like */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Title */}
            <h3 className="text-lg font-semibold text-white">{shot.title}</h3>

            {/* Like button */}
            <button className="p-2 ml-40 rounded-full bg-white text-gray-600 hover:bg-opacity-90 transition-colors duration-200">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-600"
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


<button className="p-2 rounded-full bg-white text-gray-600 hover:bg-opacity-30 transition-colors duration-200">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-600"
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
        </div>
      </div>
    </div>

    {/* Stats Container */}
    <div className="flex items-center justify-between bg-white rounded-lg">
    <div className="py-4 flex items-center space-x-3 ">
       <img
        src={shot.user.profilePicture}
        alt={shot.user?.name || "User"}
        className="w-7 h-7 rounded-full object-cover "
      />
      <div>
        <p className="text-sm font-semibold text-gray-700">
          {shot.user?.name || "Anonymous"}
        </p>
      </div>
       </div>
      <div className="flex items-center ml-44 space-x-2 text-gray-400">
       
        <div className="flex items-center space-x-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" role="img" class="icon fill-current shot-tools-icon">
  <path d="M10.7408 2C13.0889 2 14.6667 4.235 14.6667 6.32C14.6667 10.5425 8.11856 14 8.00004 14C7.88152 14 1.33337 10.5425 1.33337 6.32C1.33337 4.235 2.91115 2 5.2593 2C6.60745 2 7.48893 2.6825 8.00004 3.2825C8.51115 2.6825 9.39263 2 10.7408 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>

          <span>{shot.likes || 0}</span>
        </div>
        <div className="flex items-center space-x-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" role="img" class="icon fill-current shot-tools-icon">
  <path d="M8 3C4.36992 3 1.98789 6.21774 1.18763 7.49059C1.09079 7.64462 1.04237 7.72163 1.01527 7.84042C0.99491 7.92964 0.99491 8.07036 1.01527 8.15958C1.04237 8.27837 1.09079 8.35539 1.18763 8.50941C1.98789 9.78226 4.36992 13 8 13C11.6301 13 14.0121 9.78226 14.8124 8.50941L14.8124 8.50939C14.9092 8.35538 14.9576 8.27837 14.9847 8.15958C15.0051 8.07036 15.0051 7.92964 14.9847 7.84042C14.9576 7.72163 14.9092 7.64462 14.8124 7.4906L14.8124 7.49059C14.0121 6.21774 11.6301 3 8 3Z" fill="currentColor"></path>
  <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" fill="white"></path>
</svg>

          <span>{shot.views}</span>
        </div>
      </div>

      {/* Tags */}
      {shot.tags && shot.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {shot.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  </div></div>
  )
}

export default Card
