import React, { useState } from 'react';
import bookCover from '../assets/images/bookImage.png';
import { FaPlus, FaMinus, FaMapMarkerAlt } from 'react-icons/fa';
import Header from '../components/Same/Header';
import Footer from '../components/Same/Footer';

const Cart = () => {
  // State to manage visibility of Address Details and Order Summary
  const [isAddressVisible, setIsAddressVisible] = useState(false);
  const [isOrderSummaryVisible, setIsOrderSummaryVisible] = useState(false);

  // Toggle functions
  const toggleAddressVisibility = () => setIsAddressVisible(!isAddressVisible);
  const toggleOrderSummaryVisibility = () => setIsOrderSummaryVisible(!isOrderSummaryVisible);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header container='home' />

      {/* Main content */}
      <main className="flex-grow">
        <div className="border border-gray-300 p-6 w-full max-w-4xl mx-auto bg-white rounded-md mt-10">
          {/* My cart title */}
          <h2 className="text-lg font-semibold mb-4">My cart (1)</h2>

          {/* Cart content */}
          <div className="flex flex-col md:flex-row justify-between gap-4">
            {/* Book info */}
            <div className="flex gap-4">
              <img src={bookCover} alt="book" className="w-24 h-28 object-cover" />

              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-medium">Don't Make Me Think</h3>
                  <p className="text-sm text-gray-600">by Steve Krug</p>
                </div>
                <p className="text-lg font-bold mt-2">
                  Rs. 1500
                  <span className="line-through text-gray-400 text-sm ml-2">Rs. 2000</span>
                </p>

                {/* Quantity controls */}
                <div className="flex items-center gap-2 mt-4">
                  <button className="px-2 py-1 border rounded text-sm"><FaMinus /></button>
                  <span className="px-3 py-1 border rounded text-sm">1</span>
                  <button className="px-2 py-1 border rounded text-sm"><FaPlus /></button>
                </div>

                <button className="text-blue-500 mt-2 text-sm">Remove</button>
              </div>
            </div>

            {/* Right section: location + place order */}
            <div className="flex flex-col gap-4 justify-between">
              <div className="relative w-full md:w-72">
                <select className="w-full border px-4 py-2 rounded appearance-none">
                  <option>Use current location</option>
                </select>
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>

              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 self-end">
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>

        {/* Address Details */}
        <div className="border border-gray-300 p-2 w-full max-w-4xl mx-auto bg-white rounded-md mt-5">
          <h2 
            className="text-lg font-semibold mb-1 cursor-pointer flex items-center justify-between"
            onClick={toggleAddressVisibility}
          >
            Address Details
            <span>{isAddressVisible ? '' : ''}</span>
          </h2>
          {isAddressVisible && (
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" className="border p-2 rounded" />
              <input type="text" placeholder="Mobile Number" className="border p-2 rounded" />
              <input type="text" placeholder="Pincode" className="border p-2 rounded" />
              <input type="text" placeholder="Locality" className="border p-2 rounded" />
              <textarea 
                placeholder="Address (Area and Street)" 
                className="border p-2 rounded col-span-1 md:col-span-2" 
                rows={3}
              ></textarea>
              <input type="text" placeholder="City/District/Town" className="border p-2 rounded" />
              <input type="text" placeholder="State" className="border p-2 rounded" />
              <input type="text" placeholder="Landmark (Optional)" className="border p-2 rounded" />
              <input type="text" placeholder="Alternate Phone (Optional)" className="border p-2 rounded" />
            </form>
          )}
        </div>

        {/* Order Summary */}
        <div className="border border-gray-300 p-2 w-full max-w-4xl mx-auto bg-white rounded-md mt-5">
          <h2 
            className="text-lg font-semibold mb-1 cursor-pointer flex items-center justify-between"
            onClick={toggleOrderSummaryVisibility}
          >
            Order Summary
            <span>{isOrderSummaryVisible ? '' : ''}</span>
          </h2>
          {isOrderSummaryVisible && (
            <div>
              <div className="flex justify-between mb-2">
                <span>Price (1 item)</span>
                <span>Rs. 1500</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Discount</span>
                <span className="text-green-600">- Rs. 500</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery Charges</span>
                <span className="text-green-600">FREE</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span>Rs. 1500</span>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;