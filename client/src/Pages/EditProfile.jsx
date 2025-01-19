import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

function EditProfile() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    // bio: "",
  });
  const [avatar, setAvatar] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authData, setAuthData } = useContext(AuthContext);

  useEffect(() => {
    setFormData({
      name: authData.name || "",
      location: authData.location || "",
      bio: authData.bio || "",
    });
  }, [authData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      if (avatar) {
        formDataToSend.append("avatar", avatar);
      }
      formDataToSend.append("name", formData.name);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("bio", formData.bio);

      const response = await axios.put(
        `http://localhost:3000/auth/user/${authData.id}/profile`,
        formDataToSend
      );

      const updatedUser = response.data.user;
      setAuthData((prev) => ({
        ...prev,
        ...updatedUser,
      }));
      localStorage.setItem(
        "authData",
        JSON.stringify({
          ...authData,
          ...updatedUser,
        })
      );
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.response?.data?.message || "Failed to update profile.");

    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/auth/user/${authData.id}/avatar`
      );
      const updatedUser = response.data.user;
      setAuthData((prev) => ({
        ...prev,
        ...updatedUser,
      }));
      localStorage.setItem(
        "authData",
        JSON.stringify({
          ...authData,
          ...updatedUser,
        })
      );
    } catch (error) {
      console.error("Error deleting avatar:", error);
    }
  };

  return (
    <div className="edit-profile-container mt-28 max-w-3xl mx-auto bg-white rounded-lg p-10">
      <h2 className="text-2xl font-medium text-center mb-6">{authData.name} / Edit Profile</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="flex items-center space-x-7">
            <img
              src={authData.profilePicture || "/default-avatar.png"}
              alt="User Profile"
              className="w-20 h-20 ml-3 rounded-full object-cover border border-gray-300"
            />
            <label className="border rounded-full px-4 py-2 text-sm font-semibold cursor-pointer">
              Upload new picture
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
            <button
              type="button"
              onClick={handleDeleteAvatar}
              className="bg-pink-50 rounded-full px-4 py-2 text-sm font-semibold"
            >
              Delete
            </button>
          </div>
          <label className="block text-gray-700 font-medium mb-2 mt-5">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your location"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            placeholder="Tell us about yourself"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-40 rounded-full bg-black text-white font-medium py-2 px-4 hover:bg-gray-600 focus:outline-none focus:ring-2 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
