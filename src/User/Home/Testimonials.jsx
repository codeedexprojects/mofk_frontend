import React from 'react';

export default function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      text: "Absolutely love this nightwear — it's so soft and comfortable! Every piece feels made just for me.",
      name: "Lora Smith",
      title: "creative director,",
      location: "New York",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      text: "Absolutely love this nightwear — it's so soft and comfortable! Every piece feels made just for me.",
      name: "Lora Smith",
      title: "creative director,",
      location: "New York",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      text: "Absolutely love this nightwear — it's so soft and comfortable! Every piece feels made just for me.",
      name: "Lora Smith",
      title: "creative director,",
      location: "New York",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    }
  ];

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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-md flex flex-col">
              {/* Quote Icon and Text Section with Black Background */}
              <div className="bg-white rounded-t-lg p-6">
                <div className="bg-black text-white rounded-lg p-4">
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                    </svg>
                  </div>

                  {/* Testimonial Text */}
                  <p>
                    {testimonial.text}
                  </p>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Profile Image */}
                <div className="flex justify-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                  />
                </div>

                {/* Name and Title */}
                <div className="text-center">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">
                    {testimonial.title} {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
