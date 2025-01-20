
import UserDetails from './UserDetails'

function Services() {
  return (
    <>    
    <UserDetails/>
    <div className="p-8 border w-[600px]  h-72 border-gray-200 rounded-lg ml-20 mb-12">
      <div className="flex flex-col  mt-2 items-center justify-center text-center ">
        <div className='w-14 h-14 bg-pink-500 rounded-full text-white flex items-center justify-center text-2xl '>+</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
        Create New Service

        </h2>
        <p className="text-gray-400  ">
        Add a service to show clients what you offer and make booking you easy.
        </p>
      <p
          className=" underline  " >
      Learn more
        </p>
      </div>
    </div></>
  )
}

export default Services