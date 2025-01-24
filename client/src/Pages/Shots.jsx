import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ShotContext } from "../Context/ShotContext";

const ShotDetail = () => {
  const { id } = useParams();
  const { shots, loading ,deleteShot} = useContext(ShotContext);
  const shot = shots?.find((s) => s._id === id);
  const navigate=useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this shot?')) {
      await deleteShot(id); // Wait for deleteShot to finish
      navigate(-1); // Navigate only after the shot is removed from state
    }
  };
  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary"></div>
      </div>
    );
  }

  if (!shots || shots.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">No shots available</h1>
      </div>
    );
  }

  if (!shot) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Shot not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-black bg-opacity-50 flex items-center justify-center z-50">
       <button
      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      onClick={() => navigate(-1)} // Assuming you're using React Router's `useNavigate` hook
    >
<svg className="w-6 h-6 text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
    </button>
  <div className="w-full max-w h-auto bg-white rounded-lg shadow-lg pt-14 px-36 space-y-3 mt-12 relative">
    {/* Close Button */}
   
    
    {/* Shot Details */}
    <h1 className="text-2xl font-semibold text-gray-900">{shot.title}</h1>
    <div className="py-4 flex items-center space-x-3">
      <img
        src={shot.user.profilePicture}
        alt={shot.user?.name || "User"}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <p className="text-sm font-semibold text-gray-900">
          {shot.user?.name || "Anonymous"}
        </p>
      </div>
    </div>
    <img
      src={shot.image}
      alt={shot.title}
      className="max-h-full max-w-full rounded-lg object-contain"
    />

    {/* Action Buttons */}
    <div className="ml-80">
    <Link 
  to={`/editshot/${shot._id}`} 
  className="w-32 h-16 bg-slate-100 rounded-l-lg mt-16 inline-block text-center leading-[4rem]"
>
  Edit
</Link>

      <button className="w-32 h-16 bg-slate-100">Edit shot details</button>
      <button className="w-32 h-16 bg-slate-100 rounded-r-lg" onClick={handleDelete }>Delete</button>
    </div>

    {/* Horizontal Divider with Profile Picture */}
    <div className="mr-14 flex items-center justify-center">
      <hr className="flex-1 border-t-2 border-gray-200 mt-14" />
      <span className="mx-4 text-gray-500 mt-14">
        <img
          src={shot.user.profilePicture}
          alt={shot.user?.name || "User"}
          className="w-16 h-16 rounded-full object-cover"
        />
      </span>
      <hr className="flex-1 border-t-2 border-gray-200 mt-14" />
    </div>
    <p className="text-xl font-semibold text-gray-900 ml-[485px] pt-6 pb-24">
      {shot.user?.name || "Anonymous"}
    </p>
  </div>
</div>

  );
};

export default ShotDetail;
