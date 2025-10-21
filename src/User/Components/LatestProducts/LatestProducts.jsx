import { Button } from '@material-tailwind/react';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdZoomOutMap } from 'react-icons/md';
import { RiHeart3Fill, RiHeart3Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import AppLoader from '../../../Loader';
import { AppContext } from '../../../StoreContext/StoreContext';
import { ImageZoomModal } from '../ImageZoomModal/ImageZoomModal';
import { UserNotLoginPopup } from '../UserNotLogin/UserNotLoginPopup';

const LatestProducts = () => {
  const { BASE_URL, fetchWishlistProducts } = useContext(AppContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [heartIcons, setHeartIcons] = useState({});
  const [showAllLatest, setShowAllLatest] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);
  const [openUserNotLogin, setOpenUserNotLogin] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const userId = localStorage.getItem('userId');

  // Responsive handler
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOpenUserNotLogin = () => setOpenUserNotLogin(!openUserNotLogin);
  const handleOpenImageZoom = (productImages, index) => {
    setOpenImageModal(!openImageModal);
    setZoomImage({ images: productImages, currentIndex: index });
  };

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/category/get`);
        setCategories(response.data);
        setCategoriesLoading(false);
      } catch (error) {
        console.error(error);
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, [BASE_URL]);

  // Fetch latest products
  const fetchLatestProducts = async () => {
    try {
      const params = userId ? { userId } : {};
      const response = await axios.get(`${BASE_URL}/user/products/view-products`, { params });
      const filtered = response.data.filter(product => product.isLatestProduct);
      setLatestProducts(filtered);
      setFilteredProducts(filtered);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching latest products:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestProducts();
  }, []);

  // Filter products
  const filterProductsByCategory = (categoryName) => {
    setSelectedCategory(categoryName);
    if (categoryName === 'All') {
      setFilteredProducts(latestProducts);
    } else {
      const filtered = latestProducts.filter(product =>
        product.category && product.category.name === categoryName
      );
      setFilteredProducts(filtered);
    }
    setShowAllLatest(false);
  };

  // Handle wishlist
  const handleWishlist = async (productId, productTitle) => {
    try {
      if (!userId) return handleOpenUserNotLogin();
      const payload = { userId, productId };
      const response = await axios.post(`${BASE_URL}/user/wishlist/add`, payload);
      if (response.data.isInWishlist) {
        toast.success(`${productTitle} added to wishlist`);
        setHeartIcons(prev => ({ ...prev, [productId]: true }));
        fetchWishlistProducts();
      } else {
        toast.error(`${productTitle} removed from wishlist`);
        setHeartIcons(prev => ({ ...prev, [productId]: false }));
        fetchWishlistProducts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const visibleProducts = showAllLatest
    ? filteredProducts
    : filteredProducts.slice(0, screenWidth < 640 ? 4 : 4);

  return (
    <>
      {/* Section Header */}
      <div className="mb-8 text-start">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Fresh Picks, Just for You
        </h1>
        <p className="text-gray-600 text-sm md:text-base mt-2">
          Stay ahead of the trend with our latest drops — designed to move with you and make a statement.
        </p>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <AppLoader />
        </div>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          {selectedCategory === 'All'
            ? 'No latest products available.'
            : `No products in ${selectedCategory}`}
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
                    to={`/product-details/${product._id}/${product.category._id}`}
                    state={{
                      productId: product._id,
                      categoryId: product.category._id
                    }}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-[340px] object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => (e.target.src = '/no-image.jpg')}
                    />
                  </Link>

                  {/* New Label */}
                  <span className="absolute top-2 left-2 bg-white text-black text-sm font-semibold px-3 py-1.5 rounded-br-xl shadow">
                    New
                  </span>
                  {/* Wishlist Heart */}
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
                  {/* Top Row: Title + Description on left, Price on right */}
                  <div className="flex justify-between items-start">
                    {/* Title & Description */}
                    <div className="w-2/3">
                      <h4 className="font-medium text-gray-900 text-sm md:text-base truncate">
                        {product.title}
                      </h4>
                      <p className="text-gray-500 text-xs md:text-sm capitalize truncate">
                        {product.description.slice(0, 25)}...
                      </p>
                    </div>

                    {/* Price Section */}
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
                onClick={() => setShowAllLatest(!showAllLatest)}
                className="bg-black text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-gray-800 transition-all"
              >
                {showAllLatest ? 'View Less' : 'Show More'}
              </Button>
            </div>
          )}
        </>
      )}

      {/* Modals */}
      <UserNotLoginPopup open={openUserNotLogin} handleOpen={handleOpenUserNotLogin} />
      <ImageZoomModal open={openImageModal} handleOpen={handleOpenImageZoom} zoomImage={zoomImage} />
    </>
  );
};

export default LatestProducts;
