import React from 'react'
import { FaRegEnvelope } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { GrLocation } from "react-icons/gr";
import { FaInstagram, FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className='bg-gray-100 text-gray-800 pt-12 pb-6 px-6 xl:px-16 lg:px-16 relative overflow-hidden'>
        {/* Decorative flower image - bottom left */}
        <div className='absolute bottom-0 left-0 w-64 h-64 opacity-80'>
          <img
            src="/footer.png"
            alt="Decorative flowers"
            className='w-full h-full object-contain'
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-4 gap-8 xl:gap-12 lg:gap-12 relative z-10">

          {/* Brand Section */}
          <div>
            <div className='flex items-center gap-3 mb-6'>
              <div className=' w-16 h-16  flex items-center justify-center overflow-hidden '>
                <img
                  src="/logo.png"
                  alt="Logo"
                  className='w-20 h-20 object-cover'
                />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className='text-base font-semibold mb-4 text-gray-900'>Quick Links</h2>
            <ul className='space-y-2'>
              <li>
                <Link to='/' className='text-gray-700 text-sm hover:text-gray-900 transition-colors'>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/view-all-category' className='text-gray-700 text-sm hover:text-gray-900 transition-colors'>
                  Categories
                </Link>
              </li>
              <li>
                <Link to='/orders-tracking' className='text-gray-700 text-sm hover:text-gray-900 transition-colors'>
                  Order/Track Order
                </Link>
              </li>
              <li>
                <Link to='/contact' className='text-gray-700 text-sm hover:text-gray-900 transition-colors'>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h2 className='text-base font-semibold mb-4 text-gray-900'>Customer Service</h2>
            <ul className='space-y-2'>
              <li>
                <Link to='/privacy-policy' className='text-gray-700 text-sm hover:text-gray-900 transition-colors'>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to='/terms-conditions' className='text-gray-700 text-sm hover:text-gray-900 transition-colors'>
                  Terms & Condition
                </Link>
              </li>
              <li>
                <Link to='/shipping-policy' className='text-gray-700 text-sm hover:text-gray-900 transition-colors'>
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to='/refund-policy' className='text-gray-700 text-sm hover:text-gray-900 transition-colors'>
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link to='/refund-policy' className='text-gray-700 text-sm hover:text-gray-900 transition-colors'>
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className='text-base font-semibold mb-4 text-gray-900'>Contact info</h2>
            <ul className='space-y-3'>
              <li>
                <a
                  href="mailto:mofkonline@gmail.com"
                  className='text-gray-700 text-sm hover:text-gray-900 transition-colors block'
                >
                  mofkonline@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919567432832"
                  className='text-gray-700 text-sm hover:text-gray-900 transition-colors block'
                >
                  +91 9567432832
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps?q=Pooky+village+adam+sark,+andaman"
                  target="_blank"
                  rel="noopener noreferrer"
                  className='text-gray-700 text-sm hover:text-gray-900 transition-colors block'
                >
                  Mofk village adam sark, andaman
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='mt-12 pt-6 flex flex-col md:flex-row items-center justify-center gap-6 relative z-10'>
          <p className='text-gray-600 text-sm text-center'>
            ©2024 mo mo . All rights reserved
          </p>
          
          {/* Social Media Icons */}
          <div className='flex items-center gap-4'>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className='w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors'
            >
              <FaFacebook className='text-white text-sm' />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className='w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center hover:bg-blue-800 transition-colors'
            >
              <FaLinkedin className='text-white text-sm' />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className='w-8 h-8 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition-colors'
            >
              <FaYoutube className='text-white text-sm' />
            </a>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className='w-8 h-8 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors'
            >
              <FaWhatsapp className='text-white text-sm' />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer