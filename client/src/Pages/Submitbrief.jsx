
import { Link } from 'react-router-dom'

function Submitbrief() {
  return (
    <div className='mt-32 flex items-center justify-center bg-pink-50'>
      <div>
        <h1 className='text-[35px] font-roboto font-extralight mt-9'>Start Your Project with Expert Support</h1>
        <h3 className='text-[17px] text-gray-700'>Let us help you find the perfect designer for your project.</h3>
  
        <div className='flex flex-col p-7 border bg-white rounded-xl mt-7 w-[650px]'>
          <div>
            <h1 className='text-[20px] text-gray-700 font-bold'>How It Works</h1>
          </div>
          <div className='space-y-4 mt-4'>
            <div className='flex items-center space-x-3'>
              <p className='rounded-full w-12 h-10 flex items-center justify-center bg-pink-500 text-white'>1</p>
              <p className='text-[16px]'>
                <span className='font-semibold'>Submit your project details</span> and get connected with talent carefully chosen by our experts
              </p>
            </div>
            <div className='flex items-center space-x-3'>
              <p className='rounded-full w-11 h-10 flex items-center justify-center bg-pink-500 text-white'>2</p>
              <p className='text-[16px]'>
                <span className='font-semibold'>Review our recommendations</span> and request proposals from your favorite designers.
              </p>
            </div>
            <div className='flex items-center space-x-3'>
              <p className='rounded-full w-14 h-10 flex items-center justify-center bg-pink-500 text-white'>3</p>
              <p className='text-[16px]'>
                <span className='font-semibold'>Select your designer</span> and kick off your project on Dribbble, with secure payments and seamless collaboration.
              </p>
            </div>
          </div>
        </div>

        <div className='flex flex-col p-7 border bg-white rounded-xl mt-7 w-[650px] mb-8'>
          <div>
            <h1 className='text-[20px] text-gray-900 font-bold'>Tell us about your project</h1>
          </div>
          <form className='space-y-5 mt-4'>
       
            <div>
              <label className='block text-gray-900 font-semibold'>Your Name*</label>
              <input
                type='text'
                className='w-full p-2 border rounded-lg'
                placeholder='Enter your name'
                required
              />
            </div>
            
       
            <div>
              <label className='block text-gray-900 font-semibold'>Email Address*</label>
              <p className='text-xs text-slate-600'>If you have a Dribbble account, please provide the email address associated with your account.
            <br/> <span className='italic'> No Dribbble account? <span className='text-italic underline'><Link to='/signup'>Sign up here</Link></span></span></p>
              <input
                type='email'
                className='w-full p-2 border rounded-lg mt-2'
                placeholder='Enter your email'
                required
              />
            </div>
        
            <div>
              <label className='block text-gray-900 font-semibold'>Project Description*</label>
              <textarea
                className='w-full p-2 border rounded-lg'
                rows='4'
                placeholder='Describe your project,including any specific design inspiration,requirments and goals'
                required
              ></textarea>
            </div>
      
            <div>
              <label className='block text-gray-900 font-semibold'>Design Categories*</label>
              <p className='text-xs text-slate-600'>What design services do you require for your project? Select up to three. </p>
              <div className='flex flex-wrap gap-3 mt-2 '>
                {['Animation', 'Illustration', 'Web Design', 'Branding', 'print','Typography','mobile'].map((category) => (
                  <div key={category} className='flex items-center space-x-1'>
                    <input type='checkbox' id={category} className='w-3 h-3' />
                    <label htmlFor={category} className='text-gray-500'>{category}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className='block text-gray-900 font-semibold'>Timeframe*</label>
              <p className='text-xs text-slate-600'>Select when you need the project to be completed.</p>
              <select className='w-full p-2 border rounded-lg'>
                <option value='Select' disabled className='text-gray-500'>Select.....</option>
                <option value='few-days'>Within a few days</option>
                <option value='next-week'>Next week</option>
                <option value='few-weeks'>In a few weeks</option>
              </select>
            </div>
 
            <div>
              <label className='block text-gray-900 font-semibold'>Budget(USD)*</label>
              <p className ='text-xs text-slate-600'>We&apos;ll connect you with a designer that fits your budget range.</p>
              <select className='w-full p-2 border rounded-lg'>
                <option value=' Select' disabled>Select....</option>
                <option value='<$500'> $500</option>
                <option value='$500-$1000'>$500 - $1000</option>
                <option value='$1000-$5000'>$1000 - $5000</option>
                <option value='>$5000'> $5000</option>
              </select>
              <p className='text-xs text-slate-600 italic'>*Project matching requires a minimum budget of $2,000 USD. For projects below this threshold, check out Designer Search to browse our full network.</p>
            </div>

            <div>
              <label className='block text-gray-900 font-semibold'>Business Name<span className='text-gray-500 font-normal'>(Optional)</span></label>
              <input
                type='text'
                className='w-full p-2 border rounded-lg'
                placeholder='Enter URL'
              />
            </div>
            <div>
              <label className='block text-gray-900 font-semibold'>Do you need any additional services?<span className='text-gray-500 font-normal'>(Optional)</span></label>
              <div className='flex flex-wrap gap-3 mt-2 mb-1 text-sm'>
                {['Invoicing', 'Customer agreements', 'Account manager', ].map((category) => (
                  <div key={category} className='flex items-center space-x-1'>
                    <input type='checkbox' id={category} className='w-3 h-3' />
                    <label htmlFor={category} className='text-gray-500'>{category}</label>
                  </div>
                ))}
              </div>
              <input
                type='text'
                className='w-full p-2 border rounded-lg'
                placeholder='Other (Please specify)'
              />
            </div>
      
            <button className='w-full bg-black text-white py-2 rounded-lg font-semibold '>
              Submit Brief
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Submitbrief

