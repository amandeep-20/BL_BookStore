import  { useContext, useState, useEffect } from 'react';
import logo from '../../assets/images/education.svg';
import { IoIosSearch } from 'react-icons/io';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { IoSearch } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import Dropdown from '../Same/Dropdown';
import { getCartItems } from '../../utils/API';
import { SearchContext } from '../../context/SearchProvider';

type HeaderProps = {
    container?: string;
};

const Header = ({ container }: HeaderProps) => {
    const { searchQuery, setSearchQuery }: any = useContext(SearchContext);
    const [username, setUsername] = useState('');
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const storedUsername = localStorage.getItem('userName');
        if (storedUsername) {
            const displayName = storedUsername.split('5413')[0];
            setUsername(displayName);
        }
    }, []);

    useEffect(() => {
        const fetchCartCount = async () => {
            try {
                const response = await getCartItems();
                if (response.success) {
                    type CartItem = { quantityToBuy: number };
                    const cartItems: { quantity: number }[] = response.result.map((item: CartItem) => ({
                        quantity: item.quantityToBuy,
                    }));
                    const totalCount = cartItems.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0);
                    setCartCount(totalCount);
                }
            } catch (err) {
                setCartCount(0);
            }
        };

        fetchCartCount();
    }, []);

    return (
        <div className='w-full bg-[#A03037]'>
            <div className='h-[60px] max-w-6xl flex justify-between mx-auto items-center px-7'>
                <div className='flex items-center space-x-8'>
                    <NavLink to={'/login'}>
                        <div className='flex items-center space-x-2'>
                            <img className='w-8' src={logo} alt='logo-img' />
                            <p className='text-white text-xl'>Bookstore</p>
                        </div>
                    </NavLink>
                    {container === 'home' && (
                        <div className='hidden sm:flex items-center space-x-1 bg-white rounded-[3px]'>
                            <div className='flex items-center justify-center w-10 h-10'>
                                <IoIosSearch className='text-[#9D9D9D] text-xl' />
                            </div>
                            <input
                                type='text'
                                placeholder='Search...'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className='md:w-[250px] lg:w-[450px] h-10 bg-transparent outline-none'
                            />
                        </div>
                    )}
                </div>
                {container === 'home' && (
                    <div className='flex gap-5 md:space-x-12'>
                        <div className='flex flex-col md:hidden items-center justify-center cursor-pointer'>
                            <div className='flex items-center justify-center h-6'>
                                <IoSearch className='text-white text-xl' />
                            </div>
                            <p className='text-white hidden md:block text-xs mt-1'>Search</p>
                        </div>
                        <Dropdown username={username} />
                        <NavLink to={'/cart'}>
                            <div className='flex flex-col items-center justify-center cursor-pointer relative'>
                                <div className='flex items-center justify-center h-6'>
                                    <AiOutlineShoppingCart className='text-white text-xl' />
                                    {cartCount > 0 && (
                                        <span className='absolute -top-2 -right-2 bg-white text-[#A03037] rounded-full w-5 h-5 flex items-center justify-center text-xs'>
                                            {cartCount}
                                        </span>
                                    )}
                                </div>
                                <p className='text-white hidden md:block text-xs mt-1'>Cart</p>
                            </div>
                        </NavLink>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;