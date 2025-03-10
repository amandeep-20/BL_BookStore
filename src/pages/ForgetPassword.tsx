import React from 'react'
import Header from '../components/Same/Header'
import { NavLink } from 'react-router-dom'

const ForgotPassword = () => {
    return (
        <div>
            <Header />
            <div className='w-full flex justify-center items-center h-[80vh]'>
                <div className='flex flex-col items-center'>
                    <p className='font-semibold text-[#0A0102] text-2xl'>Forgot your password?</p>
                    <div className='w-[424px] border-2 border-[#E4E4E4] rounded-md mt-4 flex flex-col space-y-4 items-center'>
                        <p className='text-sm text-[#878787] w-[70%] mt-8'>Enter your email address and we'll send you a link to reset your password.</p>
                        <div className='flex flex-col w-[70%]'>
                            <label className='text-xs font-semibold' htmlFor='email'>Email Id</label>
                            <input type='text' id='email' className='w-full h-9 border-2 rounded-sm p-2 outline-none focus:border-red-600' />
                        </div>
                        <button className='bg-[#A03037] text-sm text-white w-[70%] h-9 rounded-sm p-1 mt-3'>Reset Password</button>
                        <div className='flex h-[100px] bg-[#F9F9F8] border-t-2 border-[#E4E4E4] items-center justify-center w-full font-semibold'>
                            <NavLink to={'/register'}>
                                <p className='cursor-pointer'>CREATE ACCOUNT</p>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword