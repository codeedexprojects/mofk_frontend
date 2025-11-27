import React from 'react'
import UserCarousel from '../Components/Carousel/Carousel'
import ShopByCategory from '../Components/UserCategory/ShopByCategory'
import LatestProducts from '../Components/LatestProducts/LatestProducts'
import FeaturedProducts from '../Components/FeaturedProducts/FeaturedProducts'
import Footer from '../Components/Footer/Footer'
import OfferProducts from '../Components/OfferProducts/OfferProducts'
import WhyShopWithUs from './WhyShopWithUs'
import NewsletterSection from './NewsLetter'
import DreamComfortBanner from './SecondCarousel'
import AboutUs from './AboutUs'
import Testimonials from './Testimonials'


const UserHome = () => {
    return (
        <>
            <UserCarousel />
               <ShopByCategory />
            <div className='bg-white p-4 xl:p-16 lg:p-16 space-y-8 xl:space-y-14 lg:space-y-14'>
             
                <LatestProducts />
                <DreamComfortBanner></DreamComfortBanner>
                
                <OfferProducts />
                <FeaturedProducts />
               
            </div>
            <AboutUs></AboutUs>
             <WhyShopWithUs></WhyShopWithUs>
             <Testimonials></Testimonials>
             <NewsletterSection></NewsletterSection>
            <div>
                <Footer />
            </div>
        </>
    )
}

export default UserHome