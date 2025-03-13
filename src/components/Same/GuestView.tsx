import React from 'react'
import Img from '../../assets/images/Page-1.svg'
import Header from '../Same/Header'
import { NavLink } from 'react-router-dom'
function GuestView() {
  return (
    <div>
      <Header />
      <div className='flex flex-col justify-center items-center min-h-[75vh] gap-7'>
          <div className='flex flex-col items-center'>
              <p className='text-xl font-semibold text-[#0A0102]'>PLEASE LOG IN</p>
              <p className='text-xs text-[#9D9D9D] font-semibold'>Login to view items in your wishlist.</p>
          </div>
          <div>
              <img src={Img} alt='placeholder-image'/>
          </div>
          <NavLink to={"/"}>
            <div>
                <button className='text-[#A03037] font-normal border-[#A03037] border-2 text-xs py-2 px-6 mt-2'>LOGIN/SIGNUP</button>
            </div>
          </NavLink>
      </div>
    </div>
  )
}

export default GuestView