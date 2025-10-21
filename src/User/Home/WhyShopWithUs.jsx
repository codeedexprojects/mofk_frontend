import React from "react";
import { FaLeaf, FaMedal, FaHeadset, FaSmile } from "react-icons/fa";

const WhatWeDo = () => {
  const features = [
    {
      icon: <FaLeaf className="text-4xl mb-4 text-white" />,
      title: "Sustainable Design",
      text: "Eco-Friendly Materials For Mindful, Lasting Fashion",
      dark: true,
    },
    {
      icon: <FaMedal className="text-4xl mb-4 text-black" />,
      title: "Premium Quality",
      text: "Crafted With The Finest Materials And Attention To Detail",
      dark: false,
    },
    {
      icon: <FaHeadset className="text-4xl mb-4 text-white" />,
      title: "24/7 Support",
      text: "Round-The-Clock Customer Support For Your Needs",
      dark: true,
    },
    {
      icon: <FaSmile className="text-4xl mb-4 text-black" />,
      title: "Satisfaction Guaranteed",
      text: "30-Day Return Policy For Your Peace Of Mind",
      dark: false,
    },
  ];

  return (
    <div className="bg-white py-12 px-4 sm:px-8 md:px-16">
      <div className="mb-8 text-start">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          What We Do
        </h1>
        <p className="text-gray-600 text-sm md:text-base mt-2">
          We design clothing that blends comfort, creativity, and confidence — made to fit your lifestyle, not define it.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6  mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`rounded-lg p-6 shadow-md text-center transition-transform duration-300 hover:scale-105 ${
              feature.dark ? "bg-black text-white" : "bg-white text-black border border-gray-200"
            }`}
          >
            <div className="flex flex-col items-center justify-center h-full">
              {feature.icon}
              <h3
                className={`text-sm font-semibold uppercase ${
                  feature.dark ? "text-white" : "text-black"
                }`}
              >
                {feature.title}
              </h3>
              <p
                className={`mt-2 text-xs ${
                  feature.dark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {feature.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatWeDo;
