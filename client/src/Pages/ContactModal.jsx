// ContactModal.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from "../../utilities/axiosInstance";

const ContactModal = ({ isOpen, onClose, user }) => {
    const [projectDetails, setProjectDetails] = useState("");
    const [targetDate, setTargetDate] = useState("");
    const [budget, setBudget] = useState("");
    const [isInterested, setIsInterested] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Reset form when modal opens/closes
    React.useEffect(() => {
        if (!isOpen) {
            setProjectDetails("");
            setTargetDate("");
            setBudget("");
            setIsInterested(true);
        }
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form inputs
        if (projectDetails.length < 50) {
            alert("Please provide more details about your project (minimum 50 characters)");
            return;
        }
        if (!targetDate) {
            alert("Please select a target date");
            return;
        }
        if (!budget) {
            alert("Please enter a budget");
            return;
        }

        setIsSubmitting(true);

        try {
            
            await axiosInstance.post('/messages/send', {
                recipientId: user._id,
                projectDetails,
                targetDate,
                budget,
                isInterested
            });
            
            // Close modal and reset form after successful submission
            onClose();
            
            // Show success message
            alert("Message sent successfully!");
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white   rounded-lg p-8 max-w-lg w-full relative">
                <button 
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>

                <div className="flex items-center mb-4">
                    {user.profilePicture && (
                        <img 
                            src={user.profilePicture} 
                            alt={user.name} 
                            className="w-12 h-12 rounded-full mr-3"
                        />
                    )}
                    <div>
                        <h2 className="text-xl font-bold">Connect with {user.name}</h2>
                        <p className="text-gray-500 text-sm">Responds in about 3 hours</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="flex items-center mb-4">
                        <span className="mr-3">I'm interested in working with {user.name}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={isInterested}
                                onChange={() => setIsInterested(!isInterested)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                        </label>
                    </div>
                    
                    {/* <div className="w-full h-px bg-gray-200 my-4"></div> */}

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Project Details <span className="text-red-500">*</span>
                            <span className="ml-1 text-xs text-gray-500">Minimum 50 characters</span>
                        </label>
                        <textarea
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                            rows="4"
                            placeholder="Please describe your project, including any specific design requirements, timelines, and goals."
                            value={projectDetails}
                            onChange={(e) => setProjectDetails(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Target Date <span className="text-red-500">*</span>
                        </label>
                        <p className="text-xs text-gray-500 mb-1">Select when you need the project to be completed</p>
                        <select
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                            value={targetDate}
                            onChange={(e) => setTargetDate(e.target.value)}
                            required
                        >
                            <option value="">Please select...</option>
                            <option value="1week">Within the next few days </option>
                            <option value="2weeks">Within the next few  weeks</option>
                            <option value="1month">In a month or more</option>
                            <option value="3months">Not sure</option>
              
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Project Budget <span className="text-red-500">*</span>
                        </label>
                        <p className="text-xs text-gray-500 mb-1">{user.name}'s minimum project rate is $2,200 (USD)</p>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500">$</span>
                            </div>
                            <input
                                type="number"
                                className="w-full pl-8 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                                placeholder="Enter amount"
                                min="2200"
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-md transition duration-200"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactModal;