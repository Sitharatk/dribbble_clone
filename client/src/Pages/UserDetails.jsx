import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function UserDetails() {
  const { authData } = useContext(AuthContext)


  return (
    <div className='mt-32'>
      <div className='flex items-center justify-center space-x-10 p-5'>
        <div>
          <img
            src={authData.profilePicture || ' '}
            alt="User Profile"
            className="w-20 h-20 ml-3 rounded-full object-cover border border-gray-300 cursor-pointer"
          />
        </div>
        <div className='space-y-3'>
          <h1 className='font-bold text-2xl'>{authData.name}</h1>
          {/* <p>{authData.email}</p> */}
          <h1 >{authData.location}</h1>
          <span className='space-x-2'>
            <button className='border py-3 px-5 rounded-full mt-2 font-semibold text-sm'>
              Edit Profile
            </button>
            <button className='border py-2 px-3 rounded-full mt-2 font-semibold'>
              <FontAwesomeIcon icon={faEllipsis} />
            </button>
          </span>
        </div>
      </div>
      <div className='flex space-x-10 py-12 px-24 font-semibold'>
    
        <Link to='/userwork'><button >Work</button></Link>
        
        <button>Services</button>
        <button>Boosted Shots</button>
        <button>Collections</button>
        

          <button >
            Liked Shots
          </button>
      
        <Link to='/userabout'>
          <button >
            About
          </button>
        </Link>
      </div>
      <div className="flex justify-center mb-20">
        <hr className="w-[1210px] border-t-1 border-gray-200" />
      </div>
    </div>
  )
}

export default UserDetails

