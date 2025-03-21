import  { useContext } from 'react'
import UserDetails from './UserDetails'
import { ShotContext } from '../Context/ShotContext';
import { AuthContext } from '../Context/AuthContext';
import Card from './Card';

function Likes() {
    const { allShots } = useContext(ShotContext);
    const { authData } = useContext(AuthContext); 
  
    // Filter shots that the user has liked
    const likedShots = allShots.filter((shot) => shot.likes.includes(authData?.id));
  
  return (
    <>
    <UserDetails/>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-20 px-10 ">
        {likedShots.map((shot) => (
          <Card key={shot._id} shot={shot} className="w-56 h-56"/>
        ))}
      </div>
    </>
  )
}

export default Likes