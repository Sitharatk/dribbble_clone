function PostJob() {
  return (
    <div className="mt-16 md:mt-32 px-4 md:px-0 flex items-center justify-center bg-gradient-to-r from-pink-100 to-violet-100 min-h-screen py-8 md:py-12">
      <div className="w-full max-w-[650px]">
        <h1 className='text-2xl md:text-[35px] font-roboto mt-4 md:mt-9 font-bold text-center md:text-left'>
          Post a job on Dribbble
        </h1>
        <h3 className='text-sm md:text-[17px] text-gray-700 text-center md:text-left'>
          The #1 job board for hiring designers and creative professionals.
        </h3> 

        {/* Job Details Section */}
        <div className="flex flex-col p-5 md:p-10 border bg-white rounded-xl mt-4 md:mt-7 shadow-lg">
          <div>
            <h1 className="text-xl md:text-[23px] text-black font-bold">
              Tell us about your role
            </h1>
          </div>
          <div className="space-y-4 md:space-y-6 mt-4">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Title *
              </label>
              <input
                type="text"
                placeholder="Enter job title"
                className="mt-1 block w-full p-2 border rounded-md focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Description *
              </label>
              <textarea
                placeholder="Add job description"
                rows="4"
                className="mt-1 block w-full p-2 border rounded-md focus:ring-pink-500 focus:border-pink-500"
              ></textarea>
            </div>

            {/* Job Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Location *
              </label>
              <input
                type="text"
                placeholder="Enter job location"
                className="mt-1 block w-full p-2 border rounded-md focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            {/* Workplace Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Workplace Type *
              </label>
              <select
                className="mt-1 block w-full p-2 border rounded-md focus:ring-pink-500 focus:border-pink-500 bg-white"
              >
                <option value="" disabled>Select workplace type</option>
                <option value="remote">Remote</option>
                <option value="onsite">Onsite</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            {/* Employment Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employment Type *
              </label>
              <select
                className="mt-1 block w-full p-2 border rounded-md focus:ring-pink-500 focus:border-pink-500 bg-white"
              >
                <option value="" disabled>Select employment type</option>
                <option value="full-time">Full-Time</option>
                <option value="part-time">Part-Time</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>

            {/* Application Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Where can people apply? *
              </label>
              <input
                type="text"
                placeholder="Add application link"
                className="mt-1 block w-full p-2 border rounded-md focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
          </div>
        </div>

        {/* Company Information Section */}
        <div className="flex flex-col p-5 md:p-10 border bg-white rounded-xl mt-4 md:mt-7 shadow-lg">
          <h1 className="text-[15px] text-gray-500 font-bold">
            COMPANY INFORMATION
          </h1>
          <div className="space-y-4 mt-4">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                What&apos;s your company name? *
              </label>
              <input
                type="text"
                placeholder="Enter company name"
                className="mt-1 block w-full p-2 border rounded-md focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            {/* Company Logo */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your company logo *
              </label>
              <button className="mt-1 py-2 px-4 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition w-full md:w-auto">
                Choose Image
              </button>
            </div>

            {/* Company Website */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your company website *
              </label>
              <input
                type="text"
                placeholder="Enter company website"
                className="mt-1 block w-full p-2 border rounded-md focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row md:justify-end mt-6 space-y-3 md:space-y-0 md:space-x-3 mb-6">
          <button className="w-full md:w-auto py-2 px-6 bg-white border text-black rounded-full hover:bg-gray-400 transition">
            Cancel
          </button>
          <button className="w-full md:w-auto py-2 px-6 bg-black text-white rounded-full hover:bg-gray-600 transition">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostJob;