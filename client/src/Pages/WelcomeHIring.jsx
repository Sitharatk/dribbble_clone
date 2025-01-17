
import Logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

function WelcomeHIring() {
  const navigate = useNavigate(); 

  const handleBack = () => {
    navigate('/get_started'); 
  };

  const handleContinue = () => {
    navigate('/');
  };
  return (
    <div>
      <div className='px-12 py-16'>
            <img src={Logo} alt="Dribbble Logo" className="w-20 h-auto" /> </div>
            <div className='flex flex-col items-center'>
                <h1 className='font-bold text-4xl'>Are you a designer?</h1>
                <div className='mt-20 space-x-7'>
                    <label className='relative w-7 h-7 border-2 border-gray-200 py-10 px-24 rounded-lg text-xl font-bold hover:border-pink-300'>
                        <input type="radio" name="hire" value="yes" className='absolute bottom-20 left-48 w-5 h-5 text-pink-500' />
                        Yes
                    </label>
                    <label className=' relative w-7 h-7 border-2 border-gray-200 py-10 px-24 rounded-lg text-xl font-bold hover:border-pink-300'>
                        <input type="radio" name="hire" value="no"  className='absolute bottom-20 left-48 w-5 h-5' />
                        No
                    </label>
                    
                </div>
                <div className="mt-16 ml-56">
                        <button className="mr-2 px-5 py-3 bg-white border  rounded-full"  onClick={handleBack}>Back</button>
                        <button className="px-5 py-3 bg-black text-white rounded-full"  onClick={handleContinue}>Continue</button>
                    </div>
            </div>

    </div>
  )
}

export default WelcomeHIring