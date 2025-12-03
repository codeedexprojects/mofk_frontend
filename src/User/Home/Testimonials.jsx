import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../StoreContext/StoreContext";

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { BASE_URL } = useContext(AppContext);

  // Fetch testimonials from API
  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/testimonial/get`);
      setTestimonials(response.data || []);
    } catch (error) {
      console.error("Error fetching testimonials", error);
    }
  };

  // Load testimonials on mount
  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Auto-change testimonial every 5 seconds
  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [testimonials]);

  // Show 3 testimonials rotating automatically
  const visibleTestimonials =
    testimonials.length > 0
      ? [
          testimonials[currentIndex],
          testimonials[(currentIndex + 1) % testimonials.length],
          testimonials[(currentIndex + 2) % testimonials.length],
        ]
      : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4 sm:px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-start">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Loved by Hundreds, Worn by Hearts.
          </h1>
          <p className="text-gray-600 text-sm md:text-base mt-2">
            Hear what our community says about their favorites — comfort you’ll feel, quality you’ll trust.
          </p>
        </div>

        {/* 🚫 No Testimonials Section */}
        {testimonials.length === 0 && (
          <div className="py-24 flex flex-col items-center justify-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-gray-400 mb-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M7 8h10M7 12h4m1 8a9 9 0 100-18 9 9 0 000 18z"
              />
            </svg>

            <h2 className="text-xl font-semibold text-gray-700">
              No Testimonials Yet
            </h2>
            
          </div>
        )}

        {/* Testimonials Grid */}
        {testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500">
            {visibleTestimonials.map(
              (testimonial, index) =>
                testimonial && (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md flex flex-col"
                  >
                    <div className="bg-white rounded-t-lg p-6">
                      <div className="bg-black text-white rounded-lg p-4">
                        <div className="mb-4">
                          <svg
                            className="w-10 h-10 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                          </svg>
                        </div>

                        <p>{testimonial.description}</p>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-center mb-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                        />
                      </div>

                      <div className="text-center">
                        <p className="font-semibold text-gray-900">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {testimonial.place}
                        </p>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
