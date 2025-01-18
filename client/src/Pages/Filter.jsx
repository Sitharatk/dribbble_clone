import React from 'react'

function Filter() {
  return (
    <div 
    className="absolute top-full left-0 w-full border bg-gray-100 rounded-lg p-4 transition-all duration-300 ease-in-out">
        <div>
    <p>Tags</p>
    <input type='text '/>
        </div>
        <div>
            <p>color</p>
            <input/>
        </div>
        </div>
  )
}

export default Filter