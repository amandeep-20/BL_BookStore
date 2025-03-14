import React from "react";
import Header from "../components/Same/Header";
import Footer from "../components/Same/Footer";
import Breadcrumbs from "../components/Same/Breadcrumbs";

const UserProfile = () => {
  return (
    <div>
      <Header container="home" />
      <div className="min-h-screen px-64 py-8 bg-white text-sm text-gray-800 ml-[150px]">
        <Breadcrumbs container="profile" />
        {/* Section: Personal Details */}
        <div className="bg-white border border-gray-300 rounded p-6 mb-6 w-[512px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-base">Personal Details</h2>
            <button className="text-sm text-red-500 font-medium">Save</button>
          </div>

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <p className="text-gray-500 mb-1">Full Name</p>
              <input
                type="text"
                name="fullName"
                defaultValue=""
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
              />
            </div>

            {/* Email */}
            <div>
              <p className="text-gray-500 mb-1">Email ID</p>
              <input
                type="email"
                name="email"
                defaultValue="abc@example.com"
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
              />
            </div>

            {/* Password */}
            <div>
              <p className="text-gray-500 mb-1">Password</p>
              <input
                type="password"
                name="password"
                defaultValue=""
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <p className="text-gray-500 mb-1">Mobile Number</p>
              <input
                type="text"
                name="mobile"
                defaultValue="98xxxxxx49"
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Section: Address Details */}
        <div className="bg-white border border-gray-300 rounded p-6 w-[512px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-base">Address Details</h2>
            <button className="border border-red-500 text-red-500 px-3 py-1 rounded text-sm">
              Add New Address
            </button>
          </div>

          <div className="mb-2 flex justify-between items-center">
            <span className="text-xs text-gray-500">1. WORK</span>
            <button className="text-sm text-red-500 font-medium">Save</button>
          </div>

          {/* Address */}
          <div className="mb-4">
            <p className="text-gray-500 text-xs mb-1">Address</p>
            <input
              type="text"
              name="address"
              defaultValue="H.No 31,V.P.O Binjalpur,Sector 4, Opp to Indian Bank"
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-gray-500 text-xs mb-1">City/Town</p>
              <input
                type="text"
                name="city"
                defaultValue="Ambala"
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
              />
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-1">State</p>
              <input
                type="text"
                name="state"
                defaultValue="Haryana"
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            {["Home", "Work", "Other"].map((type) => (
              <label key={type} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="addressType"
                  value={type}
                //   defaultChecked={type === "Home"}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserProfile;