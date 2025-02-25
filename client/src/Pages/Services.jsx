
import UserDetails from './UserDetails'

function Services() {
  return (
    <>    
   <UserDetails/>
      <div className="p-4 md:p-8 mx-4 md:mx-20 mb-8 md:mb-12">
        <div className="border border-gray-200 rounded-lg w-full max-w-[600px] mx-auto md:ml-0">
          <div className="flex flex-col items-center justify-center text-center p-6 md:p-8 space-y-4">
            <div className='w-12 h-12 md:w-14 md:h-14 bg-pink-500 rounded-full text-white flex items-center justify-center text-xl md:text-2xl'>
              +
            </div>
            
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              Create New Service
            </h2>
            
            <p className="text-sm md:text-base text-gray-400 max-w-sm">
              Add a service to show clients what you offer and make booking you easy.
            </p>
            
            <p className="text-sm md:text-base underline cursor-pointer hover:text-gray-600">
              Learn more
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Services