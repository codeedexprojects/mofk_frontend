import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-white py-12 px-4 sm:px-8 md:px-16">
      {/* Header Section */}
      <div className="mb-8 text-start">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          About Us
        </h1>
        <p className="text-gray-600 text-sm md:text-base mt-2">
          Born in India, inspired by self-expression, made for every story.
        </p>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left - Image */}
        <div className="flex justify-center md:justify-start">
          <img
            src="./about.jpg"
            alt="About us"
            className="rounded-lg shadow-md w-full max-w-md object-cover"
          />
        </div>

        {/* Right - Text */}
        <div className="text-gray-700 text-sm md:text-base leading-relaxed">
          <p className="mb-4">
            Our designs blend modern aesthetics with vibrant individuality,
            creating clothing that’s as expressive as it is comfortable.
          </p>
          <p className="mb-4">
            Each piece is thoughtfully crafted using soft, breathable materials
            and minimal yet dynamic designs, made to move with your lifestyle
            and mood.
          </p>
          <p>
            Whether it’s cozy nightwear or everyday essentials, we focus on
            comfort, quality, and creativity — so you can feel good, look bold,
            and be yourself.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
