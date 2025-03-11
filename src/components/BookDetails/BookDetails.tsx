import React, { useState } from 'react'
import bookImage from '../../assets/images/bookImage.png'
import bookImage2 from '../../assets/images/bookImage2.png'
import { FaHeart } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import { FaMinus } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import Feedback from './Feedback';
import FeedbackForm from './FeedbackForm';

const images = [bookImage, bookImage2]

function BookDetails() {

    const [imageActive, setImageActive] = useState(0)
    const [addToCart, setAddToCart] = useState(false)
    const [cartCount, setCartCount] = useState(1)

    const incrementCart = () => {
        setCartCount(prevCount => prevCount + 1)
    }

    const decrementCart = () => {
        if (cartCount > 1) {
            setCartCount(prevCount => prevCount - 1)
        }
    }

    return (
        <div className='flex flex-col md:flex-row mt-6'>
            <div className='md:w-[40%] flex-col'>
                <div className='flex'>
                    <div>
                        <div onClick={() => setImageActive(0)} className={`cursor-pointer h-[68px] p-2 flex justify-center items-center border-2 ${imageActive === 0 ? 'border-red-500' : 'border-[#E0E0E0]'}`}>
                            <img className='w-10' src={bookImage} alt='book-image-1' />
                        </div>
                        <div onClick={() => setImageActive(1)} className={`cursor-pointer h-[68px] p-2 flex justify-center items-center border-2 ${imageActive === 1 ? 'border-red-500' : 'border-[#E0E0E0]'}`}>
                            <img className='w-10' src={bookImage2} alt='book-image-2' />
                        </div>
                    </div>
                    <div className='w-[82%] flex-col justify-center items-center p-8 h-auto border-2 border-[#E0E0E0]'>
                        <img className='w-72' src={images[imageActive]} alt="" />
                    </div>
                </div>
                <div className='flex xl:gap-2 ml-2 xl:ml-0 w-full space-x-2 justify-end p-2 md:p-4'>
                    {
                        addToCart ? (
                            <div className='h-10 md:h-12 w-32 sm:w-36 md:w-40 flex items-center justify-between'>
                                <div onClick={decrementCart} className='cursor-pointer w-7 sm:w-8 md:w-9 h-7 sm:h-8 md:h-9 flex items-center justify-center bg-[#FAFAFA] border-[#DBDBDB] border-2 rounded-full'>
                                    <p className={`${cartCount === 1 ? "text-[#DBDBDB]" : "text-black"} text-base sm:text-lg`}><FaMinus /></p>
                                </div>
                                <div className='w-8 sm:w-10 md:w-12 h-7 sm:h-8 md:h-9 select-none flex items-center justify-center bg-[#FAFAFA] border-[#DBDBDB] border-2'>
                                    <p className='text-lg sm:text-xl'>{cartCount}</p>
                                </div>
                                <div onClick={incrementCart} className='cursor-pointer w-7 sm:w-8 md:w-9 h-7 sm:h-8 md:h-9 flex items-center justify-center bg-[#FAFAFA] border-[#DBDBDB] border-2 rounded-full'>
                                    <p className='text-lg sm:text-xl'><IoAdd /></p>
                                </div>
                            </div>
                        ) : (
                            <button onClick={() => setAddToCart(true)} className='h-10 md:h-12 w-32 sm:w-36 md:w-40 bg-[#A03037] text-white flex items-center justify-center'>ADD TO BAG</button>
                        )
                    }
                    <div className='h-10 md:h-12 flex select-none items-center justify-center gap-1 sm:gap-2 md:gap-3 w-32 sm:w-36 md:w-40 bg-[#373434] cursor-pointer text-white'>
                        <div>
                            <FaHeart className='text-white' />
                        </div>
                        <p className='text-xs sm:text-sm md:text-base'>WISHLIST</p>
                    </div>
                </div>
            </div>
            <div className='md:w-[60%] flex flex-col gap-6 ml-6'>
                <div className='flex select-none flex-col gap-1 border-b-2 border-[#E0E0E0] w-full'>
                    <p className='text-3xl text-[#373434]'>Don't Make Me Think</p>
                    <p className='text-[#878787] text-lg'>by Steve Krug</p>

                    <div className='flex text-xs items-center gap-2'>
                        <div className='flex h-5 px-2 items-center justify-center text-white text-xs bg-[#388E3C] rounded-sm'>
                            <span>4.5</span>
                            <IoStar className='text-white text-xs ml-0.5' />
                        </div>
                        <p className='text-[#878787]'>(20)</p>
                    </div>

                    <div className='flex items-center space-x-2 mt-2 mb-5'>
                        <p className='font-semibold text-[#373434] text-3xl'>Rs. 1500</p>
                        <p className='text-[#878787] text-sm line-through'>Rs. 2000</p>
                    </div>
                </div>

                <div className='flex mt-2 flex-col gap-2 border-b-2 border-[#E0E0E0] w-full'>
                    <p className='text-[#878787] text-sm'>Book Details</p>
                    <p className='text-[#373434] text-xs mb-10'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic</p>
                </div>

                <div>
                    <FeedbackForm />
                    <Feedback />
                </div>
            </div>
        </div>
    )
}

export default BookDetails