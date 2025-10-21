import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../../StoreContext/StoreContext";
import axios from "axios";
import AppLoader from "../../../Loader";
import { motion } from "framer-motion";

const ShopByCategory = () => {
  const { BASE_URL } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/category/get`);
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, [BASE_URL]);

  return (
    <div className="py-12 px-4 sm:px-8 md:px-16">
      {/* Header */}
      <div className="text-left mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Find Your Fit.
        </h1>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl">
          Explore collections made for every mood — from breezy nightwear to bold everyday essentials.
        </p>
      </div>

      {/* Loader */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <AppLoader />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id || index}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-xl group cursor-pointer"
            >
              <Link
                to={{ pathname: "/all-category" }}
                state={{ category }}
                className="block w-full h-full"
              >
                <img
                  src={category?.imageUrl}
                  alt={category.name || "Category Image"}
                  onError={(e) => (e.target.src = "/no-image.jpg")}
                  className="w-full h-[200px] md:h-[250px] object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Centered Full Width Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full py-4 transform transition-all duration-500 group-hover:backdrop-blur-sm">
                    <div className="text-center">
                      <h3 className="text-white text-lg md:text-xl font-semibold mb-1 capitalize">
                        {category.name}
                      </h3>
                      <p className="text-white/90 text-sm">Explore all</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopByCategory;
