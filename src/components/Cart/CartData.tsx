// import React, { useState } from 'react';
// import bookCover from '../../assets/images/bookImage.png';
// import { FaPlus, FaMinus, FaMapMarkerAlt } from 'react-icons/fa';

// const CartData = () => {
//   const [cartCount, setCartCount] = useState(1);
//   const [isAddressVisible, setIsAddressVisible] = useState(false);
//   const [isOrderSummaryVisible, setIsOrderSummaryVisible] = useState(false);

//   const toggleAddressVisibility = () => setIsAddressVisible(!isAddressVisible);
//   const toggleOrderSummaryVisibility = () => setIsOrderSummaryVisible(!isOrderSummaryVisible);

//   const incrementCart = () => setCartCount(prevCount => prevCount + 1);
//   const decrementCart = () => {
//     if (cartCount > 1) {
//       setCartCount(prevCount => prevCount - 1);
//     }
//   };

//   return (
//     <div>
//       <main className="flex-grow">
//         <div className="h-[300px] border border-gray-300 p-8 w-full  mx-auto bg-white rounded-md mt-4">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-semibold">My cart (1)</h2>
//             <div className="relative w-full md:w-72">
//               <select className="w-full border px-4 py-2 rounded appearance-none pr-10">
//                 <option>Use current location</option>
//               </select>
//               <FaMapMarkerAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//             </div>
//           </div>

//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <div className="flex items-center gap-4">
//               <img src={bookCover} alt="book" className="w-24 h-28 object-cover" />
//               <div className="flex flex-col justify-between">
//                 <div>
//                   <h3 className="text-base font-medium">Don't Make Me Think</h3>
//                   <p className="text-sm text-gray-600">by Steve Krug</p>
//                   <p className="text-lg font-bold mt-2">
//                     Rs. 1500 <span className="line-through text-gray-400 text-sm ml-2">Rs. 2000</span>
//                   </p>
//                 </div>
//                 <div className="flex gap-2 mt-4">
//                   <button
//                     onClick={decrementCart}
//                     className={`cursor-pointer w-7 h-7 flex items-center justify-center bg-[#FAFAFA] border-[#DBDBDB] border-2 rounded-full ${
//                       cartCount === 1 ? 'text-[#DBDBDB]' : 'text-black'
//                     }`}
//                   >
//                     <FaMinus />
//                   </button>
//                   <div className="w-8 h-7 select-none flex items-center justify-center bg-[#FAFAFA] border-[#DBDBDB] border-2">
//                     <p className="text-lg">{cartCount}</p>
//                   </div>
//                   <button
//                     onClick={incrementCart}
//                     className="cursor-pointer w-7 h-7 flex items-center justify-center bg-[#FAFAFA] border-[#DBDBDB] border-2 rounded-full"
//                   >
//                     <FaPlus />
//                   </button>
//                   <button className="text-blue-500  text-sm ml-4">Remove</button>
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col gap-4 justify-between items-end">
//               {/* Removed the dropdown from here */}
//             </div>
//           </div>
//         </div>

//         {/* Address Details Section */}
//         <div className="border border-gray-300 p-6 w-full  mx-auto bg-white rounded-md mt-5">
//           <h2
//             className="text-lg font-semibold mb-6 cursor-pointer"
//             onClick={toggleAddressVisibility}
//           >
//             Customer Details
//           </h2>
//           {isAddressVisible && (
//             <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   className="w-[80%] border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
//                 <input
//                   type="text"
//                   placeholder="Mobile Number"
//                   className="w-[80%] border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="col-span-1 md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
//                 <textarea
//                   placeholder="Address (Area and Street)"
//                   className="w-[90%] border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   rows={3}
//                 ></textarea>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">City/Town</label>
//                 <input
//                   type="text"
//                   placeholder="City/District/Town"
//                   className="w-[80%] border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
//                 <input
//                   type="text"
//                   placeholder="State"
//                   className="w-[80%] border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="col-span-1 md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
//                 <div className="flex items-center gap-6">
//                   <div className="flex items-center">
//                     <input
//                       type="radio"
//                       name="addressType"
//                       value="home"
//                       className="mr-2"
//                     />
//                     <label>Home</label>
//                   </div>
//                   <div className="flex items-center">
//                     <input
//                       type="radio"
//                       name="addressType"
//                       value="work"
//                       className="mr-2"
//                     />
//                     <label>Work</label>
//                   </div>
//                   <div className="flex items-center">
//                     <input
//                       type="radio"
//                       name="addressType"
//                       value="other"
//                       className="mr-2"
//                     />
//                     <label>Other</label>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           )}
//         </div>

//         {/* Order Summary Section */}
//         <div className="border border-gray-300 p-6 w-full  mx-auto bg-white rounded-md mt-10">
//           <h2
//             className="text-lg font-semibold mb-4 cursor-pointer"
//             onClick={toggleOrderSummaryVisibility}
//           >
//             Order summery
//           </h2>
//           {isOrderSummaryVisible && (
//             <>
//               <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
//                 <div className="flex items-center gap-4">
//                   <img src={bookCover} alt="book" className="w-24 h-28 object-cover" />
//                   <div className="flex flex-col justify-between">
//                     <div>
//                       <h3 className="text-base font-medium">Don't Make Me Think</h3>
//                       <p className="text-sm text-gray-600">by Steve Krug</p>
//                       <p className="text-lg font-bold mt-2">
//                         Rs. 1500 <span className="line-through text-gray-400 text-sm ml-2">Rs. 2000</span>
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-end">
//                 <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
//                   CHECKOUT
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default CartData;


import React, { useState } from 'react';
import bookCover from '../../assets/images/bookImage.png';
import { FaPlus, FaMinus, FaMapMarkerAlt } from 'react-icons/fa';

const CartData = () => {
  const [cartCount, setCartCount] = useState(1);
  const [isAddressVisible, setIsAddressVisible] = useState(false);
  const [isOrderSummaryVisible, setIsOrderSummaryVisible] = useState(false);

  const toggleAddressVisibility = () => setIsAddressVisible(!isAddressVisible);
  const toggleOrderSummaryVisibility = () => setIsOrderSummaryVisible(!isOrderSummaryVisible);

  const incrementCart = () => setCartCount(prevCount => prevCount + 1);
  const decrementCart = () => {
    if (cartCount > 1) {
      setCartCount(prevCount => prevCount - 1);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <main className="flex-grow">
        {/* Cart Section */}
        <div className="border border-gray-300 p-4 sm:p-6 md:p-6 w-full bg-white rounded-md mt-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h2 className="text-lg font-semibold mb-2 sm:mb-0">My cart (1)</h2>
            <div className="relative w-full sm:w-72">
              <select className="w-full border px-4 py-2 rounded appearance-none pr-10">
                <option>Use current location</option>
              </select>
              <FaMapMarkerAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-4 w-full">
              <img
                src={bookCover}
                alt="book"
                className="w-20 h-24 sm:w-24 sm:h-28 object-cover"
              />
              <div className="flex flex-col justify-between w-full">
                <div>
                  <h3 className="text-base font-medium">Don't Make Me Think</h3>
                  <p className="text-sm text-gray-600">by Steve Krug</p>
                  <p className="text-lg font-bold mt-2">
                    Rs. 1500 <span className="line-through text-gray-400 text-sm ml-2">Rs. 2000</span>
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <button
                    onClick={decrementCart}
                    className={`w-7 h-7 flex items-center justify-center bg-[#FAFAFA] border-[#DBDBDB] border-2 rounded-full ${
                      cartCount === 1 ? 'text-[#DBDBDB]' : 'text-black'
                    }`}
                  >
                    <FaMinus />
                  </button>
                  <div className="w-8 h-7 select-none flex items-center justify-center bg-[#FAFAFA] border-[#DBDBDB] border-2">
                    <p className="text-lg">{cartCount}</p>
                  </div>
                  <button
                    onClick={incrementCart}
                    className="w-7 h-7 flex items-center justify-center bg-[#FAFAFA] border-[#DBDBDB] border-2 rounded-full"
                  >
                    <FaPlus />
                  </button>
                  <button className="text-blue-500 text-sm ml-4">Remove</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Address Details Section */}
        <div className="border border-gray-300 p-4 sm:p-6 w-full bg-white rounded-md mt-5">
          <h2
            className="text-lg font-semibold mb-4 cursor-pointer"
            onClick={toggleAddressVisibility}
          >
            Customer Details
          </h2>
          {isAddressVisible && (
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                <input
                  type="text"
                  placeholder="Mobile Number"
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  placeholder="Address (Area and Street)"
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City/Town</label>
                <input
                  type="text"
                  placeholder="City/District/Town"
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <input
                  type="text"
                  placeholder="State"
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  <div className="flex items-center">
                    <input type="radio" name="addressType" value="home" className="mr-2" />
                    <label>Home</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" name="addressType" value="work" className="mr-2" />
                    <label>Work</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" name="addressType" value="other" className="mr-2" />
                    <label>Other</label>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Order Summary Section */}
        <div className="border border-gray-300 p-4 sm:p-6 w-full bg-white rounded-md mt-10">
          <h2
            className="text-lg font-semibold mb-4 cursor-pointer"
            onClick={toggleOrderSummaryVisibility}
          >
            Order Summary
          </h2>
          {isOrderSummaryVisible && (
            <>
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={bookCover}
                    alt="book"
                    className="w-20 h-24 sm:w-24 sm:h-28 object-cover"
                  />
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-medium">Don't Make Me Think</h3>
                      <p className="text-sm text-gray-600">by Steve Krug</p>
                      <p className="text-lg font-bold mt-2">
                        Rs. 1500 <span className="line-through text-gray-400 text-sm ml-2">Rs. 2000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-2 rounded hover:bg-blue-700">
                  CHECKOUT
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default CartData;