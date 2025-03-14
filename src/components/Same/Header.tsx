import React, { useState, useEffect } from "react";
import logo from "../../assets/images/education.svg";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import Dropdown from "./Dropdown";
import { NavLink } from "react-router-dom";

type headerProps = {
  container?: string;
};

const Header = ({ container }: headerProps) => {
  const [username, setUsername] = useState(''); // State to store the username

  // Fetch username from localStorage on mount
  useEffect(() => {
    const storedUsername = localStorage.getItem('userName'); // e.g., "amanr5413"
    if (storedUsername) {
      const displayName = storedUsername.split('5413')[0]; // Extract "amanr"
      setUsername(displayName);
    }
  }, []);

  return (
    <div className="w-full bg-[#A03037]">
      <div className="h-[60px] max-w-6xl flex justify-between mx-auto items-center px-7">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <img className="w-8" src={logo} alt="logo-img"></img>
            <p className="text-white text-xl">Bookstore</p>
          </div>
          {container === "home" && (
            <div className="hidden sm:flex items-center space-x-1 bg-white rounded-[3px]">
              <div className="flex items-center justify-center w-10 h-10">
                <IoIosSearch className="text-[#9D9D9D] text-xl" />  
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="md:w-[250px] lg:w-[450px] h-10 bg-transparent outline-none"
              />
            </div>
          )}
        </div>
        {container === "home" && (
          <div className="flex gap-5 md:space-x-12">
            <div className="flex flex-col md:hidden items-center justify-center cursor-pointer">
              <div className="flex items-center justify-center h-6">
                <IoSearch className="text-white text-xl" />
              </div>
              <p className="text-white hidden md:block text-xs mt-1">Search</p>
            </div>
            <Dropdown username={username} /> {/* Pass the username prop */}
            <NavLink to={"/cart"}>
              <div className="flex flex-col items-center justify-center cursor-pointer">
                <div className="flex items-center justify-center h-6">
                  <AiOutlineShoppingCart className="text-white text-xl" />
                </div>
                <p className="text-white hidden md:block text-xs mt-1">Cart</p>
              </div>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;