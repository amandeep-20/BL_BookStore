import React, { useState } from 'react';
import loginSignUpImage from '../../assets/images/loginSignupImage.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoEyeOff, IoEye } from "react-icons/io5";
import { loginApiCall, signupApiCall } from '../../utils/API.js';

type authTemplateProps = {
  container: string;
}

function Template({ container }: authTemplateProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: ''
  });
  const [error, setError] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: ""
  });
  
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const phoneRegex = /^\d{10}$/;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    if (!emailRegex.test(formData.email)) {
      setError(prev => ({ ...prev, email: "Invalid email format" }));
      isValid = false;
    } else {
      setError(prev => ({ ...prev, email: "" }));
    }

    if (!passwordRegex.test(formData.password)) {
      setError(prev => ({ 
        ...prev, 
        password: "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
      }));
      isValid = false;
    } else {
      setError(prev => ({ ...prev, password: "" }));
    }

    if (isValid) {
      try {
        const res = await loginApiCall({ 
          email: formData.email, 
          password: formData.password 
        });
        console.log("Login successful:", res);
        navigate("/home");
      } catch (err) {
        console.error("Login error:", err.message);
        setError(prev => ({ ...prev, email: "Login failed. Please check your credentials." }));
      }
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    if (!formData.fullName) {
      setError(prev => ({ ...prev, fullName: "Full name is required" }));
      isValid = false;
    } else {
      setError(prev => ({ ...prev, fullName: "" }));
    }

    if (!emailRegex.test(formData.email)) {
      setError(prev => ({ ...prev, email: "Invalid email format" }));
      isValid = false;
    } else {
      setError(prev => ({ ...prev, email: "" }));
    }

    if (!passwordRegex.test(formData.password)) {
      setError(prev => ({ 
        ...prev, 
        password: "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
      }));
      isValid = false;
    } else {
      setError(prev => ({ ...prev, password: "" }));
    }

    if (!phoneRegex.test(formData.phone)) {
      setError(prev => ({ ...prev, phone: "Please enter a valid 10-digit phone number" }));
      isValid = false;
    } else {
      setError(prev => ({ ...prev, phone: "" }));
    }

    if (isValid) {
      try {
        const res = await signupApiCall({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone
        });
        console.log("Signup successful:", res);
        navigate("/");
      } catch (err) {
        console.error("Signup error:", err.message);
        setError(prev => ({ ...prev, email: "Signup failed. Email might already exist." }));
      }
    }
  };

  return (
    <div className='flex items-center justify-center h-screen bg-[#9D9D9D]'>
      <div className='sm:flex-col flex items-center justify-center w-screen md:relative mr-52'>
        <div className='bg-[#F5F5F5] w-1/3 h-[391px] rounded-3xl shadow-xl flex flex-col space-y-6 align-center justify-center p-2'>
          <div className='flex ml-12 align-center'>
            <img className='rounded-full w-[55%]' src={loginSignUpImage} alt='login-signup-image' />
          </div>
          <div className='w-2/4 mrl-12 text-center'>
            <p className='font-semibold text-[#0A0102] ml-6'>ONLINE BOOK SHOPPING</p>
          </div>
        </div>
        <div className='bg-[#F5F5F5] w-96 h-[440px] rounded-[7px] shadow-xl z-10 md:absolute right-[140px] px-3'>
          <div className='w-full'>
            <div className={'flex justify-center font-semibold text-2xl px-12 py-5 pb-0 space-x-14 mt-1'}>
              <div className='mr-8'>
                <NavLink to={'/'}>
                  <p className={`${container === "login" ? "text-black" : "text-[#878787]"} cursor-pointer`}>LOGIN</p>
                  {container === "login" && <div className='border-b-[8px] rounded-xl ml-7 border-[#A03037] w-[32%] mt-1'></div>}
                </NavLink>
              </div>
              <div className='flex flex-col'>
                <NavLink to={'/register'}>
                  <p className={`${container === "register" ? "text-black" : "text-[#878787]"} cursor-pointer`}>SIGNUP</p>
                  {container === "register" && <div className='border-b-[8px] rounded-xl ml-8 border-[#A03037] w-[32%] mt-1'></div>}
                </NavLink>
              </div>
            </div>
          </div>
          <div className='w-full flex-col flex justify-center'>
            <form 
              className='w-full max-w-xs mx-auto' 
              onSubmit={container === "login" ? handleLogin : handleSignup}
            >
              {container === "register" && (
                <div className='flex w-full flex-col space-y-4 align-center justify-center px-7 py-3'>
                  <div className='flex flex-col items-center'>
                    <label className='text-xs font-normal self-start' htmlFor='fullName'>Full Name</label>
                    <input 
                      type='text' 
                      id='fullName' 
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className='w-full h-9 border-2 rounded-sm p-2 outline-none focus:border-red-600' 
                    />
                    {error.fullName && <p className='text-red-600 text-xs'>{error.fullName}</p>}
                  </div>
                  <div className='flex flex-col items-center'>
                    <label className='text-xs font-normal self-start' htmlFor='email'>Email Id</label>
                    <input 
                      type='text' 
                      id='email' 
                      value={formData.email}
                      onChange={handleInputChange}
                      className='w-full h-9 border-2 rounded-sm p-2 outline-none focus:border-red-600' 
                    />
                    {error.email && <p className='text-red-600 text-xs'>{error.email}</p>}
                  </div>
                  <div className='flex flex-col items-center'>
                    <label className='text-xs font-normal self-start' htmlFor='password'>Password</label>
                    <div className='relative flex-col w-full justify-center'>
                      <input 
                        type={passwordVisible ? "text" : "password"} 
                        id='password' 
                        value={formData.password}
                        onChange={handleInputChange}
                        className='w-full h-10 border-2 rounded-sm p-2 outline-none focus:border-red-600' 
                      />
                      {passwordVisible ? (
                        <IoEyeOff onClick={() => setPasswordVisible(!passwordVisible)} className='absolute right-2 top-3 cursor-pointer text-[#9D9D9D]' />
                      ) : (
                        <IoEye onClick={() => setPasswordVisible(!passwordVisible)} className='absolute right-2 top-3 cursor-pointer text-[#9D9D9D]' />
                      )}
                    </div>
                    {error.password && <p className='text-red-600 text-xs'>{error.password}</p>}
                  </div>
                  <div className='flex flex-col items-center'>
                    <label className='text-xs font-normal self-start' htmlFor='phone'>Mobile Number</label>
                    <input 
                      type='text' 
                      id='phone' 
                      value={formData.phone}
                      onChange={handleInputChange}
                      className='w-full h-9 border-2 rounded-sm p-2 outline-none focus:border-red-600' 
                    />
                    {error.phone && <p className='text-red-600 text-xs'>{error.phone}</p>}
                  </div>
                  <div className='flex flex-col items-center mt-2'>
                    <button type="submit" className='bg-[#A03037] text-sm text-white w-full h-9 rounded-sm p-1 mt-3'>Signup</button>
                  </div>
                </div>
              )}
              {container === "login" && (
                // Login form remains the same, just updated to use formData
                <div className='flex w-full flex-col space-y-4 align-center justify-center px-7 py-3'>
                  <div className='flex flex-col items-center'>
                    <label className='text-xs font-normal self-start' htmlFor='email'>Email Id</label>
                    <input 
                      type='text' 
                      id='email' 
                      value={formData.email}
                      onChange={handleInputChange}
                      className='w-full h-9 border-2 rounded-sm p-2 outline-none focus:border-red-600' 
                    />
                    {error.email && <p className='text-red-600 text-xs'>{error.email}</p>}
                  </div>
                  <div className='flex flex-col items-center'>
                    <label className='text-xs font-normal self-start' htmlFor='password'>Password</label>
                    <div className='relative flex-col w-full justify-center'>
                      <input 
                        type={passwordVisible ? "text" : "password"} 
                        id='password' 
                        value={formData.password}
                        onChange={handleInputChange}
                        className='w-full h-10 border-2 rounded-sm p-2 outline-none focus:border-red-600' 
                      />
                      {passwordVisible ? (
                        <IoEyeOff onClick={() => setPasswordVisible(!passwordVisible)} className='absolute right-2 top-3 cursor-pointer text-[#9D9D9D]' />
                      ) : (
                        <IoEye onClick={() => setPasswordVisible(!passwordVisible)} className='absolute right-2 top-3 cursor-pointer text-[#9D9D9D]' />
                      )}
                      <NavLink to={'forgotPassword'}>
                        <p className='w-full text-right text-xs text-[#9D9D9D] mt-1 cursor-pointer'>Forget Password?</p>
                      </NavLink>
                    </div>
                    {error.password && <p className='text-red-600 text-xs'>{error.password}</p>}
                  </div>
                  <div className='flex flex-col items-center mt-2'>
                    <button type="submit" className='bg-[#A03037] text-sm text-white w-full h-9 rounded-sm p-1 mt-3'>Login</button>
                  </div>
                  <div className='relative flex items-center justify-center my-3'>
                    <div className='absolute border-t border-[#E1E4EA]-300 w-[80%]'></div>
                    <p className='relative bg-white px-4 text-[#343434] font-bold text-lg z-10'>OR</p>
                  </div>
                  <div className='flex justify-center space-x-4'>
                    <button className='bg-[#4266B2] text-white text-xs w-[40%] py-3 rounded-sm'>Facebook</button>
                    <button className='bg-[#E4E4E4] text-black text-xs w-[40%] py-3 rounded-sm'>Google</button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Template;