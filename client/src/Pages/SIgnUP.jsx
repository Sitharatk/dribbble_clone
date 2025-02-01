import { useContext, useState } from "react";
import google from "../assets/google.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function SIgnUP() {
  const [isEmailForm, setIsEmailForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState(false);
  const handleContinueWithEmail = () => setIsEmailForm(true);

  const handleGoBack = () => setIsEmailForm(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" })); 
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.username) newErrors.username = "Username is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    return newErrors;
  };
  const handleCheckboxChange = (e) => {
    setIsAgreed(e.target.checked); 
  };
  const handleSubmit = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    try {
      await register(formData.name, formData.username, formData.email, formData.password);
      alert("Account created successfully!");
      navigate("/get_started");
    } catch (error) {
      if (error.status === 400 && error.data?.message === "Email already registered") {
        setErrors((prevErrors) => ({ ...prevErrors, email: "This email is already registered.", }));
      } else {
        alert(error.data?.message);
      }
    }
  };
  

  return (
    <div className='flex h-screen'>
       {/* Left Section */}
             {/* Left Section */}
<div className="hidden md:block w-[400px] h-full bg-black px-8 py-16">

               
          <p>
            <div className="w-32 h-16">
              <svg xmlns="http://www.w3.org/2000/svg" width="124" height="60" role="img" className="icon" viewBox="0 0 124 60">
                <path d="M 0 10 L 26.834 10 L 26.834 23.578 L 13.417 23.578 Z M 0 23.578 L 13.417 23.578 L 26.834 37.156 L 0 37.156 Z M 0 37.156 L 13.417 37.156 L 13.417 50.733 Z M 41.975 20.712 L 52.822 20.712 L 52.822 24.2 L 46.081 24.2 L 46.081 29.047 L 52.822 29.047 L 52.822 32.458 L 46.081 32.458 L 46.081 38.665 L 41.975 38.665 Z M 55.052 26.302 L 58.93 26.302 L 58.93 28.893 C 59.133 28.003 59.547 27.319 60.172 26.841 C 60.813 26.345 61.524 26.097 62.301 26.097 C 62.707 26.097 63.045 26.132 63.314 26.2 L 63.314 29.842 C 62.927 29.795 62.538 29.769 62.149 29.765 C 61.084 29.765 60.282 30.115 59.741 30.816 C 59.201 31.5 58.93 32.526 58.93 33.894 L 58.93 38.665 L 55.054 38.665 L 55.054 26.302 Z M 69.436 38.998 C 68.253 38.998 67.222 38.716 66.344 38.151 C 65.482 37.587 64.796 36.787 64.367 35.843 C 63.911 34.852 63.681 33.731 63.681 32.484 C 63.681 31.252 63.92 30.14 64.392 29.149 C 64.835 28.192 65.539 27.383 66.42 26.816 C 67.314 26.252 68.337 25.969 69.487 25.969 C 70.348 25.969 71.118 26.158 71.793 26.534 C 72.468 26.911 72.975 27.424 73.313 28.072 L 73.313 26.302 L 77.165 26.302 L 77.165 38.665 L 73.313 38.665 L 73.313 36.92 C 72.975 37.536 72.452 38.04 71.742 38.433 C 71.032 38.814 70.239 39.008 69.436 38.998 Z M 70.551 35.741 C 71.48 35.741 72.198 35.433 72.705 34.817 C 73.212 34.202 73.466 33.423 73.466 32.484 C 73.466 31.56 73.212 30.791 72.705 30.175 C 72.198 29.559 71.48 29.252 70.551 29.252 C 69.671 29.252 68.963 29.551 68.422 30.15 C 67.899 30.748 67.636 31.526 67.636 32.484 C 67.636 33.441 67.899 34.227 68.422 34.843 C 68.963 35.442 69.673 35.741 70.551 35.741 Z M 79.877 26.302 L 83.755 26.302 L 83.755 28.098 C 84.027 27.464 84.465 26.951 85.073 26.559 C 85.699 26.167 86.425 25.969 87.252 25.969 C 89.179 25.969 90.455 26.729 91.079 28.252 C 91.423 27.562 91.961 26.991 92.626 26.611 C 93.336 26.178 94.153 25.956 94.982 25.969 C 97.872 25.969 99.316 27.644 99.316 30.996 L 99.316 38.665 L 95.413 38.665 L 95.413 31.714 C 95.413 30.877 95.261 30.261 94.957 29.868 C 94.653 29.475 94.196 29.277 93.588 29.277 C 92.929 29.277 92.422 29.509 92.068 29.97 C 91.713 30.415 91.535 31.192 91.535 32.304 L 91.535 38.665 L 87.632 38.665 L 87.632 31.688 C 87.632 30.851 87.481 30.243 87.176 29.868 C 86.89 29.475 86.442 29.277 85.834 29.277 C 85.158 29.277 84.642 29.509 84.287 29.97 C 83.933 30.415 83.755 31.192 83.755 32.304 L 83.755 38.665 L 79.879 38.665 L 79.879 26.302 Z M 113.883 31.842 C 113.883 32.372 113.849 32.945 113.78 33.561 L 104.759 33.561 C 104.794 34.365 105.063 34.979 105.57 35.408 C 106.077 35.834 106.763 36.049 107.623 36.049 C 108.823 36.049 109.583 35.68 109.904 34.945 L 113.706 34.945 C 113.519 36.16 112.86 37.142 111.728 37.895 C 110.614 38.63 109.245 38.998 107.623 38.998 C 105.528 38.998 103.881 38.425 102.681 37.279 C 101.498 36.133 100.907 34.535 100.907 32.484 C 100.907 31.15 101.177 29.996 101.717 29.021 C 102.24 28.048 103.045 27.26 104.024 26.764 C 105.021 26.235 106.178 25.969 107.498 25.969 C 108.747 25.969 109.853 26.217 110.816 26.713 C 111.796 27.209 112.548 27.901 113.071 28.79 C 113.613 29.681 113.883 30.698 113.883 31.842 Z M 110.054 31.124 C 110.038 30.304 109.81 29.679 109.37 29.252 C 108.932 28.825 108.297 28.611 107.469 28.611 C 106.642 28.611 105.983 28.841 105.493 29.304 C 105.02 29.748 104.775 30.355 104.757 31.124 Z M 115.593 26.302 L 119.47 26.302 L 119.47 28.893 C 119.673 28.003 120.087 27.319 120.712 26.841 C 121.319 26.358 122.069 26.096 122.841 26.097 C 123.246 26.097 123.585 26.132 123.855 26.2 L 123.855 29.842 C 123.468 29.795 123.078 29.769 122.689 29.765 C 121.624 29.765 120.823 30.115 120.281 30.816 C 119.74 31.5 119.47 32.526 119.47 33.894 L 119.47 38.665 L 115.593 38.665 Z" fill="rgb(255,255,255)"></path>
              </svg>
            </div>
            <p>Farmer</p>
          </p>
          <h1 className="text-white text-[42px] font-walsheim text-4xl tracking-tighter leading-[1em] font-bold">The website<br /> builder made for designers</h1>
          <p className='text-gray-400 font-inter mt-5 text-xl tracking-tight leading-tight font-medium'>Design on a canvas and publish real,<br /> pro websites.</p>
          <div>
            <button className='text-white inline-flex items-center h-10 mt-11 px-4 border-none rounded-full bg-[#09f] font-semibold text-[15px] leading-none tracking-tight whitespace-nowrap cursor-pointer gap-[6px]'>publish your site for free</button>
          </div>
       
        </div>
       {/* Right Section  */}
   
<div className="flex flex-col justify-center items-center flex-auto p-6 sm:p-10">
  {!isEmailForm ? (
    <div className="w-full max-w-md bg-white flex flex-col items-center">
      <h2 className="font-bold mt-10 text-3xl leading-[29px] text-center">
        Sign up to Dribbble
      </h2>

      <button className="w-full max-w-[410px] mt-6 h-14 font-semibold bg-gray-900 py-2 rounded-full text-white flex items-center justify-center space-x-2">
        <img src={google} className="w-5 h-5" alt="Google logo" />
        <span>Sign up with Google</span>
      </button>

      <div className="flex items-center justify-center mt-6 w-full">
        <hr className="flex-1 border-t border-gray-200" />
        <span className="mx-4 text-gray-500">or</span>
        <hr className="flex-1 border-t border-gray-200" />
      </div>

      <button onClick={handleContinueWithEmail} className="w-full max-w-[410px] mt-6 h-14 font-semibold bg-white py-2 rounded-full border flex items-center justify-center space-x-2">
        <span>Continue with email</span>
      </button>

      <p className="mt-8 text-gray-700 text-xs text-center">
        By creating an account you agree with our 
        <span className="underline"> Terms of Service, Privacy Policy</span>, 
        and our default <span className="underline">Notification Settings</span>.
      </p>

      <p className="text-center mt-4 text-sm text-gray-500">
        Already have an account?{' '}
        <a href="/login" className="text-black underline font-medium">
          Sign In
        </a>
      </p>
    </div>
  ) : (
    <>
      <button onClick={handleGoBack} className="w-8 h-8 px-2 mt-5 mr-96 text-black border rounded-full">
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>

      <div className="w-full max-w-md bg-white flex flex-col items-center">
        <h2 className="font-bold mb-5 mt-5 text-3xl text-center">Sign up to Dribbble</h2>

        {errors.global && <p className="text-red-500 text-sm">{errors.global}</p>}

        <div className="flex flex-col sm:flex-row w-full gap-4">
          <div className="flex flex-col w-full">
            <label className="block text-sm font-bold text-gray-900">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full h-14 px-4 mt-2 border rounded-xl"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="flex flex-col w-full">
            <label className="block text-sm font-bold text-gray-900">Username</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full h-14 px-4 mt-2 border rounded-xl"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>
        </div>

        <label className="block text-sm mt-5 font-bold text-gray-900 w-full">Email</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full h-14 px-4 mt-2 border rounded-xl"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <label className="block text-sm mt-5 font-bold text-gray-900 w-full">Password</label>
        <input
          type="password"
          id="password"
          placeholder="6+ characters"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full h-14 px-4 mt-2 border rounded-xl"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        <div className="mt-6 flex items-center w-full">
          <input
            type="checkbox"
            id="terms"
            checked={isAgreed}
            onChange={handleCheckboxChange}
            className="w-5 h-5"
          />
          <label htmlFor="terms" className="ml-3 text-gray-600 text-sm">
            I agree with Dribbble&apos;s <span className="underline">Terms of Service</span> and 
            <span className="underline"> Privacy Policy</span>.
          </label>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full h-14 mt-6 bg-black text-white py-2 rounded-full hover:bg-gray-700 transition duration-200"
        >
          Create Account
        </button>

        <p className="text-center mt-4 text-sm text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="text-black underline font-medium">
            Sign In
          </a>
        </p>
      </div>
    </>
  )}
</div>

    </div>
  );
}

export default SIgnUP;