import { useContext} from 'react';
import { AuthContext } from '../Context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

function UserDetails() {
  const { authData } = useContext(AuthContext);
  const location = useLocation();
  
  const navItems = [
    { name: 'Work', path: '/userwork' },
    { name: 'Services'},
    { name: 'Boosted Shots' },
    { name: 'Collections' },
    { name: 'Liked Shots' },
    { name: 'About', path: '/userabout' },
  ];

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
            <button className="border py-2 px-3 rounded-full mt-2 font-semibold">
              <FontAwesomeIcon icon={faEllipsis} />
            </button>
          </span>
        </div>
      </div>
      <div className="flex space-x-3 py-12 px-24 font-semibold">
        {navItems.map((item) => (
          <Link to={item.path} key={item.name}>
            <button
              className={`py-2 px-5 rounded-full ${
                location.pathname === item.path ? 'bg-pink-100' : 'bg-transparent'
              }`}
            >
              {item.name}
            </button>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mb-20">
        <hr className="w-[1210px] border-t-1 border-gray-200" />
      </div>
    </div>
  );
}

export default UserDetails;


