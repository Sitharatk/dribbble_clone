import React, { useState } from 'react';

const ReportUserModal = ({ user, isOpen, onClose, onSubmit }) => {
    const [reportReason, setReportReason] = useState('');

    const handleSubmit = () => {
        if (reportReason.trim()) {
            onSubmit(reportReason);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg w-[500px] p-6 relative">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
                
                <h2 className="text-xl font-semibold mb-4">Report {user.name}</h2>
                
                <p className="text-gray-600 mb-4">
                    We take reports of harm and abuse seriously. To learn more about our 
                    standards for member behavior, you can read our Community Guidelines.
                </p>
                
                <textarea 
                    className="w-full h-40 border border-gray-300 rounded-md p-3 mb-4"
                    placeholder="Why are you reporting Nixtio?"
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                ></textarea>
                
                <div className="flex justify-end space-x-3">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                        disabled={!reportReason.trim()}
                    >
                        Report user
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportUserModal;