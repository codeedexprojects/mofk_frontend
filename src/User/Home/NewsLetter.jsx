import React from "react";

export default function JoinTheTribe() {
  return (
    <div className="w-full flex justify-center py-12 px-4">
      <div className="max-w-6xl w-full bg-white border border-gray-200 p-10 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Left Section */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-3">
              Join the Tribe.
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Be the first to know about new drops, exclusive offers, and stories — 
              plus, enjoy 10% off your first order.
            </p>
          </div>

          {/* Right Section */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full md:w-auto flex-grow border border-gray-400 rounded px-4 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-black"
              />
              <button className="bg-black text-white px-5 py-2 rounded">
                Sign Up
              </button>
            </div>
            <p className="text-sm text-gray-700">
              By clicking Sign Up you're confirming that you agree with our Terms and Conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
