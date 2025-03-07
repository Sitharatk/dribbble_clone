import React, { useState } from 'react';

function Message() {
  const [activeTab, setActiveTab] = useState('inbox');

  return (
    <div className=" mt-28 py-4 max-w-6xl mx-auto">
      {/* Messages Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Messages
        </h1>
      </div>

      {/* Inbox/Archive Tabs */}
      <div className="flex mb-8">
        <button 
          onClick={() => setActiveTab('inbox')}
          className={`px-6 py-2 rounded-full mr-2 ${
            activeTab === 'inbox' 
              ? 'bg-gray-100 font-bold' 
              : 'bg-transparent hover:bg-gray-50'
          }`}
        >
          Inbox
        </button>
        <button 
          onClick={() => setActiveTab('archive')}
          className={`px-6 py-2 rounded-full ${
            activeTab === 'archive' 
              ? 'bg-gray-100 font-bold' 
              : 'bg-transparent hover:bg-gray-50'
          }`}
        >
          Archive
        </button>
      </div>

      {/* Empty State Message */}
      <div className="text-center text-gray-500 py-16">
        There are no messages in your Inbox.
      </div>
    </div>
  );
}

export default Message;