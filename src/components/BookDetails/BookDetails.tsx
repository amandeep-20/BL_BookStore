import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import bookImage from '../../assets/images/bookImage.png';
import { FaHeart } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import Feedback from './Feedback';
import { addWishlist, removeWishlist, getWishlist, addToCart } from '../../utils/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BookDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const { book } = location.state || {};
    const bookData = book || {};
    const [imageActive, setImageActive] = useState(0);
    const [addToCartState, setAddToCartState] = useState(false);
    const [cartCount, setCartCount] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const fetchWishListStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsWishlisted(false);
                return;
            }
            const wishlist = await getWishlist(token);
            const isBookWishlisted = wishlist.some(item => 
                item._id === bookData._id || item === bookData._id
            );
            setIsWishlisted(isBookWishlisted);
        } catch (error) {
            setIsWishlisted(false);
        }
    };

    useEffect(() => {
        if (bookData._id) {
            fetchWishListStatus();
        }
    }, [bookData._id]);

    const handleAddToCart = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await addToCart(bookData._id);
            if (response.success) {
                setAddToCartState(true);
                toast.success('Added to cart successfully!', {
                    position: "top-right",
                    autoClose: 2000,
                });
                setTimeout(() => {
                    navigate('/cart', {
                        state: {
                            cartItems: [{
                                id: bookData._id,
                                name: bookData.bookName,
                                author: bookData.author,
                                price: bookData.discountPrice,
                                originalPrice: bookData.price,
                                image: bookData.pic || bookImage,
                                quantity: cartCount
                            }]
                        }
                    });
                }, 1000);
            }
        } catch (err) {
            const errorMessage = (err as any)?.response?.data?.message || (err as any)?.message || 'Failed to add item to cart';
            setError(errorMessage);
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 2000,
            });
            if (errorMessage === 'No authentication token found. Please log in.' || (err as any)?.response?.status === 401) {
                setTimeout(() => navigate('/guest'), 1000);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleWishlist = async () => {
        try {
            if (isWishlisted) {
                await removeWishlist(bookData._id);
                setIsWishlisted(false);
                toast.success('Removed from wishlist!', {
                    position: "top-right",
                    autoClose: 2000,
                });
            } else {
                await addWishlist(bookData._id);
                setIsWishlisted(true);
                toast.success('Added to wishlist!', {
                    position: "top-right",
                    autoClose: 2000,
                });
            }
        } catch (error) {
            await fetchWishListStatus();
            toast.error('Wishlist action failed!', {
                position: "top-right",
                autoClose: 2000,
            });
        }
    };

    return (
        <div className='flex flex-col md:flex-row mt-6'>
            <ToastContainer />
            <div className='md:w-[40%] flex-col'>
                <div className='flex'>
                    <div>
                        <button onClick={() => setImageActive(0)} className={`cursor-pointer h-[68px] p-2 flex justify-center items-center border-2 ${imageActive === 0 ? 'border-red-500' : 'border-[#E0E0E0]'}`}>
                            <img className='w-10' src={bookData.pic} alt='book-image-1' />
                        </button>
                        <button onClick={() => setImageActive(1)} className={`cursor-pointer h-[68px] p-2 flex justify-center items-center border-2 ${imageActive === 1 ? 'border-red-500' : 'border-[#E0E0E0]'}`}>
                            <img className='w-10' src={bookImage} alt='book-image-2' />
                        </button>
                    </div>
                    <div className='w-[82%] flex-col justify-center items-center p-8 h-auto border-2 border-[#E0E0E0]'>
                        <img className='w-72' src={imageActive ? bookImage : bookData.pic} alt={bookData.bookName} />
                    </div>
                </div>
                <div className='flex xl:gap-2 ml-2 xl:ml-0 w-full space-x-2 justify-end p-2 md:p-4'>
                    {addToCartState ? (
                        <div className='h-10 md:h-12 w-32 sm:w-36 md:w-40 flex items-center justify-between'>
                            <button
                                onClick={() => cartCount > 1 && setCartCount(prevCount => prevCount - 1)}
                                className='w-8 h-8 flex items-center justify-center bg-gray-200'
                            >
                                -
                            </button>
                            <span className='text-lg'>{cartCount}</span>
                            <button
                                onClick={() => setCartCount(prevCount => prevCount + 1)}
                                className='w-8 h-8 flex items-center justify-center bg-gray-200'
                            >
                                +
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleAddToCart}
                            disabled={isLoading}
                            className={`h-10 md:h-12 w-32 sm:w-36 md:w-40 bg-[#A03037] text-white flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Adding...' : 'ADD TO CART'}
                        </button>
                    )}
                    <button
                        onClick={handleWishlist}
                        className={`h-10 md:h-12 flex select-none items-center justify-center gap-1 sm:gap-2 md:gap-3 w-32 sm:w-36 md:w-40 ${isWishlisted ? 'bg-white border-2 border-[#A03037]' : 'bg-[#373434]'} cursor-pointer hover:bg-[#4D4D4D]`}
                    >
                        <FaHeart className={isWishlisted ? 'text-[#A03037]' : 'text-white'} />
                        <p className={`text-xs sm:text-sm md:text-base ${isWishlisted ? 'text-[#A03037]' : 'text-white'}`}>{isWishlisted ? "WISHLISTED" : "WISHLIST"}</p>
                    </button>
                </div>
            </div>
            <div className='md:w-[60%] flex flex-col gap-6 ml-6'>
                <div className='flex select-none flex-col gap-1 border-b-2 border-[#E0E0E0] w-full'>
                    <p className='text-3xl text-[#373434]'>{bookData.bookName}</p>
                    <p className='text-[#878787] text-lg'>by {bookData.author}</p>
                    <div className='flex text-xs items-center gap-2'>
                        <div className='flex h-5 px-2 items-center justify-center text-white text-xs bg-[#388E3C] rounded-sm'>
                            <span>4.5</span>
                            <IoStar className='text-white text-xs ml-0.5' />
                        </div>
                        <p className='text-[#878787]'>({bookData.quantity})</p>
                    </div>
                    <div className='flex items-center space-x-2 mt-2 mb-5'>
                        <p className='font-semibold text-[#373434] text-3xl'>Rs. {bookData.discountPrice}</p>
                        <p className='text-[#878787] text-sm line-through'>Rs. {bookData.price}</p>
                    </div>
                </div>
                <div className='flex mt-2 flex-col gap-2 border-b-2 border-[#E0E0E0] w-full'>
                    <p className='text-[#878787] text-sm'>Book Details</p>
                    <p className='text-[#373434] text-xs mb-10'>{bookData.description || "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}</p>
                </div>
                <div>
                    <Feedback />
                </div>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    );
}

export default BookDetails;