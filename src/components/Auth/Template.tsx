import React, { useState } from 'react';
import loginSignUpImage from '../../assets/images/loginSignupImage.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoEyeOff, IoEye } from "react-icons/io5";
import { loginApiCall, signupApiCall } from '../../utils/API.js';

type AuthTemplateProps = {
  container: string;
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%*?&]{8,}$/;
const phoneRegex = /^\d{10}$/;

const InputField = ({ id, label, type, value, onChange, error, passwordVisible, togglePassword }) => (
  <div className='flex flex-col items-center'>
    <label className='text-xs font-normal self-start' htmlFor={id}>{label}</label>
    <div className='relative w-full'>
      <input
        type={passwordVisible !== undefined ? (passwordVisible ? 'text' : 'password') : type}
        id={id}
        value={value}
        onChange={onChange}
        className='w-full h-9 border-2 rounded-sm p-2 outline-none focus:border-red-600'
      />
      {togglePassword && (
        passwordVisible ? 
          <IoEyeOff onClick={togglePassword} className='absolute right-2 top-3 cursor-pointer text-[#9D9D9D]' /> :
          <IoEye onClick={togglePassword} className='absolute right-2 top-3 cursor-pointer text-[#9D9D9D]' />
      )}
    </div>
    {error && <p className='text-red-600 text-xs'>{error}</p>}
  </div>
);

function Template({ container }: AuthTemplateProps) {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'fullName':
        return value ? '' : 'Full name is required';
      case 'email':
        return emailRegex.test(value) ? '' : 'Invalid email format';
      case 'password':
        return passwordRegex.test(value) ? '' : 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character.';
      case 'phone':
        return phoneRegex.test(value) ? '' : 'Please enter a valid 10-digit phone number';
      default:
        return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fields = container === 'login' ? ['email', 'password'] : ['fullName', 'email', 'password', 'phone'];
    let isValid = true;
    const newErrors = { ...error };

    fields.forEach(field => {
      const errorMsg = validateField(field, formData[field]);
      newErrors[field] = errorMsg;
      if (errorMsg) isValid = false;
    });

    setError(newErrors);

    if (isValid) {
      try {
        const apiCall = container === 'login' ? loginApiCall : signupApiCall;
        const payload = container === 'login' 
          ? { email: formData.email, password: formData.password }
          : formData;
        await apiCall(payload);
        navigate(container === 'login' ? '/home' : '/');
      } catch (err) {
        setError(prev => ({ ...prev, email: `${container} failed. ${container === 'signup' ? 'Email might already exist.' : 'Please check your credentials.'}` }));
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
            <div className='flex justify-center font-semibold text-2xl px-12 py-5 pb-0 space-x-14 mt-1'>
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
          <form className='w-full max-w-xs mx-auto' onSubmit={handleSubmit}>
            <div className='flex w-full flex-col space-y-4 align-center justify-center px-7 py-3'>
              {container === "register" && (
                <InputField
                  id="fullName"
                  label="Full Name"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  error={error.fullName}
                />
              )}
              <InputField
                id="email"
                label="Email Id"
                type="text"
                value={formData.email}
                onChange={handleInputChange}
                error={error.email}
              />
              <InputField
                id="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                error={error.password}
                passwordVisible={passwordVisible}
                togglePassword={() => setPasswordVisible(!passwordVisible)}
              />
              {container === "register" && (
                <InputField
                  id="phone"
                  label="Mobile Number"
                  type="text"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={error.phone}
                />
              )}
              {container === "login" && (
                <NavLink to={'forgotPassword'}>
                  <p className='w-full text-right text-xs text-[#9D9D9D] mt-1 cursor-pointer'>Forget Password?</p>
                </NavLink>
              )}
              <button type="submit" className='bg-[#A03037] text-sm text-white w-full h-9 rounded-sm p-1 mt-3'>
                {container === "login" ? "Login" : "Signup"}
              </button>
              {container === "login" && (
                <>
                  <div className='relative flex items-center justify-center my-3'>
                    <div className='absolute border-t border-[#E1E4EA]-300 w-[80%]'></div>
                    <p className='relative bg-white px-4 text-[#343434] font-bold text-lg z-10'>OR</p>
                  </div>
                  <div className='flex justify-center space-x-4'>
                    <button className='bg-[#4266B2] text-white text-xs w-[40%] py-3 rounded-sm'>Facebook</button>
                    <button className='bg-[#E4E4E4] text-black text-xs w-[40%] py-3 rounded-sm'>Google</button>
                  </div>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Template;