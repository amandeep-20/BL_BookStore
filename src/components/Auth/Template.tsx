import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import loginSignupImage from '../../assets/images/loginSignupImage.png';
import { loginApiCall, signupApiCall } from '../../utils/API';

type FormDataKey = 'fullName' | 'email' | 'password' | 'phone';
interface FormData {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}
interface LoginPayload {
  email: string;
  password: string;
}
interface SignupPayload extends FormData {}

interface TemplateProps {
  container: 'login' | 'register';
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const phoneRegex = /^\d{10}$/;

const Template: React.FC<TemplateProps> = ({ container }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    phone: '',
  });

  const [error, setError] = useState<Partial<Record<FormDataKey, string>>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateField = (field: FormDataKey, value: string) => {
    switch (field) {
      case 'fullName':
        return value ? '' : 'Full name is required';
      case 'email':
        return emailRegex.test(value) ? '' : 'Invalid email format';
      case 'password':
        return passwordRegex.test(value)
          ? ''
          : 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character.';
      case 'phone':
        return phoneRegex.test(value) ? '' : 'Please enter a valid 10-digit phone number';
      default:
        return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fields: FormDataKey[] = container === 'login' ? ['email', 'password'] : ['fullName', 'email', 'password', 'phone'];
    let isValid = true;
    const newErrors = { ...error };

    fields.forEach((field) => {
      const errorMsg = validateField(field, formData[field]);
      newErrors[field] = errorMsg;
      if (errorMsg) isValid = false;
    });

    setError(newErrors);

    if (isValid) {
      try {
        if (container === 'login') {
          const loginPayload: LoginPayload = { email: formData.email, password: formData.password };
          await loginApiCall(loginPayload);
          toast.success('Login Successful!', {
            position: 'top-right',
            autoClose: 3000,
          });
          setTimeout(() => navigate('/home'), 1000);
        } else {
          const signupPayload: SignupPayload = formData;
          await signupApiCall(signupPayload);
          navigate('/');
        }
      } catch (err) {
        setError((prev) => ({
          ...prev,
          email: `${container} failed. ${container === 'register' ? 'Email might already exist.' : 'Please check your credentials.'}`,
        }));
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#9D9D9D] p-4">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl gap-6 md:gap-0">
        <div className="bg-[#F5F5F5] w-full md:w-1/2 max-w-md h-auto min-h-[391px] rounded-3xl shadow-xl flex flex-col space-y-6 items-center justify-center p-4">
          <div className="flex justify-center">
            <img
              src={loginSignupImage}
              alt="login-signup-image"
              className="rounded-full w-3/4 max-w-[200px]"
            />
          </div>
          <div className="text-center">
            <p className="font-semibold text-[#0A0102] text-lg">ONLINE BOOK SHOPPING</p>
          </div>
        </div>
        <div className="bg-[#F5F5F5] w-full max-w-md h-auto rounded-[7px] shadow-xl p-4">
          <div className="w-full">
            <div className="flex justify-center font-semibold text-xl md:text-2xl py-5 pb-0 space-x-8 md:space-x-14">
              <div className="flex flex-col items-center">
                <a href="/" className={container === 'login' ? 'active' : ''} data-discover="true">
                  <p className={container === 'login' ? 'text-black cursor-pointer' : 'text-[#878787] cursor-pointer'}>
                    LOGIN
                  </p>
                  {container === 'login' && (
                    <div className="border-b-[6px] rounded-xl border-[#A03037] w-10 mt-1" />
                  )}
                </a>
              </div>
              <div className="flex flex-col items-center">
                <a href="/register" className={container === 'register' ? 'active' : ''} data-discover="true">
                  <p className={container === 'register' ? 'text-black cursor-pointer' : 'text-[#878787] cursor-pointer'}>
                    SIGNUP
                  </p>
                  {container === 'register' && (
                    <div className="border-b-[6px] rounded-xl border-[#A03037] w-10 mt-1" />
                  )}
                </a>
              </div>
            </div>
          </div>
          <form
            className="w-full mt-4"
            onSubmit={handleSubmit}
            data-testid="auth-form"
          >
            <div className="flex w-full flex-col space-y-4 px-4 py-3">
              {container === 'register' && (
                <div className="flex flex-col items-center w-full">
                  <label htmlFor="fullName" className="text-xs font-normal self-start">
                    Full Name
                  </label>
                  <div className="relative w-full">
                    <input
                      className="w-full h-9 border-2 rounded-sm p-2 outline-none focus:border-red-600"
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>
                  {error.fullName && <p className="text-red-600 text-xs">{error.fullName}</p>}
                </div>
              )}
              <div className="flex flex-col items-center w-full">
                <label htmlFor="email" className="text-xs font-normal self-start">
                  Email Id
                </label>
                <div className="relative w-full">
                  <input
                    className="w-full h-9 border-2 rounded-sm p-2 outline-none focus:border-red-600"
                    id="email"
                    type="text"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                {error.email && <p className="text-red-600 text-xs">{error.email}</p>}
              </div>
              <div className="flex flex-col items-center w-full">
                <label htmlFor="password" className="text-xs font-normal self-start">
                  Password
                </label>
                <div className="relative w-full">
                  <input
                    className="w-full h-9 border-2 rounded-sm p-2 outline-none focus:border-red-600"
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <svg
                    className="absolute right-2 top-3 cursor-pointer text-[#9D9D9D]"
                    fill="currentColor"
                    height="1em"
                    stroke="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="256" cy="256" r="64" />
                    <path d="M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96c-42.52 0-84.33 12.15-124.27 36.11-40.73 24.43-77.63 60.12-109.68 106.07a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416c46.71 0 93.81-14.43 136.2-41.72 38.46-24.77 72.72-59.66 99.08-100.92a32.2 32.2 0 0 0-.1-34.76zM256 352a96 96 0 1 1 96-96 96.11 96.11 0 0 1-96 96z" />
                  </svg>
                </div>
                {error.password && <p className="text-red-600 text-xs">{error.password}</p>}
              </div>
              {container === 'register' && (
                <div className="flex flex-col items-center w-full">
                  <label htmlFor="phone" className="text-xs font-normal self-start">
                    Mobile Number
                  </label>
                  <div className="relative w-full">
                    <input
                      className="w-full h-9 border-2 rounded-sm p-2 outline-none focus:border-red-600"
                      id="phone"
                      type="text"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  {error.phone && <p className="text-red-600 text-xs">{error.phone}</p>}
                </div>
              )}
              {container === 'login' && (
                <a href="/forgotPassword" className="" data-discover="true">
                  <p className="w-full text-right text-xs text-[#9D9D9D] mt-1 cursor-pointer">
                    Forget Password?
                  </p>
                </a>
              )}
              <button
                className="bg-[#A03037] text-sm text-white w-full h-9 rounded-sm p-1 mt-3"
                type="submit"
              >
                {container === 'login' ? 'Login' : 'Signup'}
              </button>
              {container === 'login' && (
                <>
                  <div className="relative flex items-center justify-center my-3">
                    <div className="absolute border-t border-[#E1E4EA] w-[80%]" />
                    <p className="relative bg-[#F5F5F5] px-4 text-[#343434] font-bold text-lg z-10">OR</p>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <button className="bg-[#4266B2] text-white text-xs w-full sm:w-[40%] py-3 rounded-sm">
                      Facebook
                    </button>
                    <button className="bg-[#E4E4E4] text-black text-xs w-full sm:w-[40%] py-3 rounded-sm">
                      Google
                    </button>
                  </div>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Template;