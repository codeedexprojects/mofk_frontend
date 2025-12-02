import React, { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../../StoreContext/StoreContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AppLoader from '../../Loader';

const SecondCarousel = () => {
  const { BASE_URL } = useContext(AppContext);
  const [carousel, setCarousel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchCarousel = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/carousel/view-carousels`);
        setCarousel(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCarousel();
  }, []);

  // Auto-play effect
  useEffect(() => {
    if (carousel.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carousel.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carousel.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carousel.length);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + carousel.length) % carousel.length);
  };

  if (isLoading || carousel.length === 0) {
    return (
      <div className="col-span-2 flex justify-center items-center h-[50vh]">
        <AppLoader />
      </div>
    );
  }

  return (
    <div className="w-full h-[450px] md:h-[550px] lg:h-[600px] relative overflow-hidden">
      {/* Carousel Background */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full"
          >
            <img
              src={carousel[currentSlide]?.image}
              alt={`Image showcasing ${carousel[currentSlide]?.title}`}
              className="w-full h-full object-cover object-right md:object-center"
              onError={(e) => (e.target.src = '/banner-no-image.jpg')}
            />


            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 flex items-center justify-center px-4 z-10">
        <div className="text-center max-w-2xl z-10">
          {/* Title */}
          <motion.h1
            key={`title-${currentSlide}`}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white font-black uppercase leading-tight mb-4 overflow-hidden"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.8rem)', letterSpacing: '0.02em' }}
          >
            {carousel[currentSlide]?.title}
          </motion.h1>

          {/* Description */}
          {carousel[currentSlide]?.label && (
            <motion.p
              key={`desc-${currentSlide}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed"
            >
              {carousel[currentSlide]?.label}
            </motion.p>
          )}

          {/* Button */}
          <Link
            to={{
              pathname: "/all-category",
            }}
            state={{
              category: {
                id: carousel[currentSlide]?.category,
                name: carousel[currentSlide]?.title,
              },
            }}
          >
            <motion.button
              key={`button-${currentSlide}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white font-semibold capitalize tracking-wide
                py-3 px-8 md:py-4 md:px-10 rounded-full shadow-xl 
                hover:bg-black/80 transition-all duration-300 
                hover:scale-105 hover:shadow-2xl text-sm md:text-base"
            >
              Explore Now
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Carousel Controls - Only show if multiple slides */}
      {carousel.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-300 backdrop-blur-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-300 backdrop-blur-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Carousel Indicators - Only show if multiple slides */}
      {carousel.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {carousel.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar - Only show if multiple slides */}
      {carousel.length > 1 && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
          <motion.div
            key={currentSlide}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 5, ease: 'linear' }}
            className="h-full bg-white"
          />
        </div>
      )}
    </div>
  );
};

export default SecondCarousel;