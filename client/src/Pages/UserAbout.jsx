import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import UserDetails from '../Pages/UserDetails';

import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

function UserAbout() {
  const { authData } = useContext(AuthContext);


  return (
    <>
      <UserDetails />
      <div className="px-44 space-x-14 flex">
        <div className="space-y-9">
          <div className="space-y-2 font-medium text-sm">
            <h2 className="text-lg text-slate-900">Biography</h2>
            {authData.bio ? (
              <p className="text-slate-900">{authData.bio}</p>
            ) : (
              <button className="text-slate-900">Add Bio</button>
            )}
          </div>
          <div className="space-y-2 font-medium text-sm">
            <h2 className="text-slate-900">Skills</h2>
            <button className="text-slate-900">Add Skills</button>
          </div>

          <div className="flex justify-center mb-7">
            <hr className="w-[500px] border-t-1 border-gray-200" />
          </div>
          <div className="space-x-3">
            <span className="text-gray-600">0 followers</span>
            <span className="text-gray-600">0 following</span>
          </div>
        </div>
        <div>
          <div className="flex space-x-7">
            <button className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-full">
              <FontAwesomeIcon icon={faFacebook} />
              <span>Share</span>
            </button>
            <button className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-full">
              <FontAwesomeIcon icon={faTwitter} />
              <span>Tweet</span>
            </button>
            <button className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-full">
              <FontAwesomeIcon icon={faCopy} />
              <span>Copy</span>
            </button>
          </div>
          <div className="w-60 h-20 p-6 bg-gray-50 mt-12 rounded-md">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-600" />
              <p className="text-gray-600">Location</p>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faUser} className="text-gray-600" />
              <p className="text-gray-600">Member since {new Date().getFullYear()}</p>
            </div>
          </div>
          <div className="space-y-2 font-medium text-sm mt-14 mb-20">
            <h2 className="text-lg text-slate-900">Social</h2>
            <button className="text-slate-900">Add social/protofolio link</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserAbout;
