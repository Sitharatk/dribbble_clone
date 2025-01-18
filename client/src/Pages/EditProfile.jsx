import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function EditProfile() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    bio: "",
  
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const {authData,setAuthData }=useContext(AuthContext)



  return (
    <div className="edit-profile-container mt-28 max-w-3xl mx-auto bg-white rounded-lg p-10">
    <h2 className="text-2xl font-medium text-center mb-6">{authData.name} / Edit Profile</h2>
    <form className="space-y-4">
      <div>
        <div className="flex items-center space-x-7">
      <img
            src={authData.profilePicture || ' '}
            alt="User Profile"
            className="w-20 h-20 ml-3 rounded-full object-cover border border-gray-300 cursor-pointer"
          />
          <button className="border rounded-full px-4 py-2 text-sm font-semibold">Upload  new picture</button>
          <button className=" bg-pink-50 rounded-full px-4 py-2 text-sm font-semibold">Delete</button>
          </div>
        <label className="block text-gray-700 font-medium mb-2 mt-5">Name</label>
        <input
          type="text"
          name="name"
          value={authData.name} 
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
          value={authData.location}
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
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-40  rounded-full bg-black text-white font-medium py-2 px-4  hover:bg-gray-600 focus:outline-none focus:ring-2"
      >
        Save Profile
      </button>
    </form>
  </div>
  
  );
}

export default EditProfile;
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(`/api/users/${userId}/update`, formData);
//       alert("Profile updated successfully!");
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error updating profile", error.response.data);
//     }
//   };
{/* <div>
          <h3>Work History</h3>
          {formData.workHistory.map((job, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Job Title"
                value={job.jobTitle}
                onChange={(e) => handleWorkHistoryChange(index, "jobTitle", e.target.value)}
              />
              <input
                type="text"
                placeholder="Company"
                value={job.company}
                onChange={(e) => handleWorkHistoryChange(index, "company", e.target.value)}
              />
              <input
                type="date"
                placeholder="Start Date"
                value={job.startDate}
                onChange={(e) => handleWorkHistoryChange(index, "startDate", e.target.value)}
              />
              <input
                type="date"
                placeholder="End Date"
                value={job.endDate}
                onChange={(e) => handleWorkHistoryChange(index, "endDate", e.target.value)}
              />
            </div>
          ))}
        </div>
        <div>
          <h3>Education</h3>
          {formData.education.map((edu, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="School"
                value={edu.school}
                onChange={(e) => handleEducationChange(index, "school", e.target.value)}
              />
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
              />
              <input
                type="text"
                placeholder="Field of Study"
                value={edu.fieldOfStudy}
                onChange={(e) => handleEducationChange(index, "fieldOfStudy", e.target.value)}
              />
              <input
                type="number"
                placeholder="Start Year"
                value={edu.startYear}
                onChange={(e) => handleEducationChange(index, "startYear", e.target.value)}
              />
              <input
                type="number"
                placeholder="End Year"
                value={edu.endYear}
                onChange={(e) => handleEducationChange(index, "endYear", e.target.value)}
              />
            </div>
          ))}
        </div> */}
        {/* <div>
          <label>Personal Website</label>
          <input
            type="text"
            name="personalWebsite"
            value={formData.personalWebsite}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Portfolio URL</label>
          <input
            type="text"
            name="portfolioURL"
            value={formData.portfolioURL}
            onChange={handleChange}
          />
        </div> */}
