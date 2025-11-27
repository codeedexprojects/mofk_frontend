// --- UPDATED FEATURED PRODUCTS DESIGN (Matches LatestProducts UI) ---

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@material-tailwind/react";
import { MdZoomOutMap } from "react-icons/md";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import AppLoader from "../../../Loader";
import { AppContext } from "../../../StoreContext/StoreContext";
import { ImageZoomModal } from "../ImageZoomModal/ImageZoomModal";
import { UserNotLoginPopup } from "../UserNotLogin/UserNotLoginPopup";

const FeaturedProducts = () => {
  const { BASE_URL, fetchWishlistProducts } = useContext(AppContext);

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);
  const [heartIcons, setHeartIcons] = useState({});
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [openUserNotLogin, setOpenUserNotLogin] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpenUserNotLogin = () => setOpenUserNotLogin(!openUserNotLogin);

  const handleOpenImageZoom = (images, index) => {
    setOpenImageModal(!openImageModal);
    setZoomImage({ images, currentIndex: index });
  };

  // Fetch Featured Products
  const fetchFeaturedProducts = async () => {
    try {
      const params = userId ? { userId } : {};
      const response = await axios.get(`${BASE_URL}/user/products/view-products`, { params });

      const filtered = response.data.filter((p) => p.isFeaturedProduct);

      setFeaturedProducts(filtered);
      setFilteredProducts(filtered);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  // Wishlist toggle
  const handleWishlist = async (productId, title) => {
    try {
      if (!userId) return handleOpenUserNotLogin();

      const response = await axios.post(`${BASE_URL}/user/wishlist/add`, { userId, productId });

      if (response.data.isInWishlist) {
        toast.success(`${title} added to wishlist`);
        setHeartIcons((prev) => ({ ...prev, [productId]: true }));
      } else {
        toast.error(`${title} removed from wishlist`);
        setHeartIcons((prev) => ({ ...prev, [productId]: false }));
      }

      fetchWishlistProducts();
      fetchFeaturedProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // Visible items count (matching LatestProducts)
  const visibleProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(0, screenWidth < 640 ? 4 : 4);

  return (
    <>
      {/* ---------------------- HEADER ---------------------- */}
      <div className="mb-8 text-start">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Handpicked Favorites for You
        </h1>
        <p className="text-gray-600 text-sm md:text-base mt-2">
          Explore our top-rated styles that customers love — curated to elevate your wardrobe.
        </p>
      </div>

      {/* ---------------------- PRODUCT GRID ---------------------- */}
      {isLoading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <AppLoader />
        </div>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No featured products available.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {visibleProducts.map((product) => (
              <div
                key={product._id}
                className="relative group bg-white transition-transform duration-300 hover:scale-[1.02]"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-lg">
                  <Link
                    to={`/product-details/${product._id}/${product.category?.[0]?._id}`}
                    state={{
                      productId: product._id,
                      categoryId: product.category?.[0]?._id,
                    }}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-[340px] object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => (e.target.src = "/no-image.jpg")}
                    />
                  </Link>

                  {/* "Top Pick" Label */}
                  <span className="absolute top-2 left-2 bg-white text-black text-sm font-semibold px-3 py-1.5 rounded-br-xl shadow">
                    Top Pick
                  </span>

                  {/* Zoom Icon */}
                  <MdZoomOutMap
                    onClick={() => handleOpenImageZoom(product.images, 0)}
                    className="absolute bottom-2 left-2 cursor-pointer text-gray-600 bg-white w-7 h-7 p-1 rounded-full shadow-md"
                  />

                  {/* Wishlist */}
                  {product.isInWishlist || heartIcons[product._id] ? (
                    <RiHeart3Fill
                      onClick={() => handleWishlist(product._id, product.title)}
                      className="absolute top-2 right-2 cursor-pointer text-primary w-7 h-7"
                    />
                  ) : (
                    <RiHeart3Line
                      onClick={() => handleWishlist(product._id, product.title)}
                      className="absolute top-2 right-2 cursor-pointer text-black w-7 h-7"
                    />
                  )}
                </div>

                {/* Product Info */}
                <div className="pt-3">
                  <div className="flex justify-between items-start">
                    <div className="w-2/3">
                      <h4 className="font-medium text-gray-900 text-sm md:text-base truncate">
                        {product.title}
                      </h4>
                      <p className="text-gray-500 text-xs md:text-sm truncate capitalize">
                        {product.description.slice(0, 25)}...
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-black font-semibold text-sm md:text-base">
                        ₹{Math.round(product.offerPrice)}
                      </p>
                      <p className="text-gray-400 line-through text-xs md:text-sm">
                        ₹{Math.round(product.actualPrice)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More Button */}
          {filteredProducts.length > 4 && (
            <div className="flex justify-center mt-10">
              <Button
                onClick={() => setShowAll(!showAll)}
                className="bg-black text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-gray-800 transition-all"
              >
                {showAll ? "View Less" : "Show More"}
                {showAll ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </Button>
            </div>
          )}
        </>
      )}

      {/* Modals */}
      <UserNotLoginPopup open={openUserNotLogin} handleOpen={handleOpenUserNotLogin} />

      <ImageZoomModal
        open={openImageModal}
        handleOpen={handleOpenImageZoom}
        zoomImage={zoomImage}
      />
    </>
  );
};

export default FeaturedProducts;
