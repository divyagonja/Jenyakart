import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Linkedin, Github } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <Link 
              to="/" 
              className="flex items-center space-x-2 group mb-4"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <span className="text-white font-bold text-sm">J</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                JenyaKart
              </span>
            </Link>
            <p className="text-gray-600 text-sm mb-4">
              Your one-stop shop for premium products at unbeatable prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-700 transition-colors duration-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm">
                  Return Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Stay Updated</h3>
            <p className="text-gray-600 text-sm mb-4">
              Subscribe to our newsletter for the latest products and offers.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 w-full border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <button 
                type="submit" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-r-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Accepted Payment Methods</h4>
          <div className="flex flex-wrap gap-4">
            {/* Using more reliable SVG sources for payment icons */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32" className="grayscale hover:grayscale-0 transition-all duration-300">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24" height="32" className="grayscale hover:grayscale-0 transition-all duration-300">
              <path fill="#000" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="32" height="32" className="grayscale hover:grayscale-0 transition-all duration-300">
              <path fill="#1434CB" d="M470.1 231.3s7.6 37.2 9.3 45H446c3.3-8.9 16-43 16-43-3.1 4-5.9 7.8-7.7 10l-2.3-10.5zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM152.5 331.2L215.7 176h-42.5l-39.3 106-4.3-21.5-14-71.4c-2.3-9.9-9.4-12.7-18.2-13.1H32.7l-.7 3.1c15.9 4 29.5 9.8 42.3 17.1l35.7 135h42.8zm94.5.2h41.2l25.2-155.4h-40.7zM366.2 176h-41.9l-34.7 155.4h37.5zm40.5 0l-32.2 155.4H419l47.3-155.4z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="32" height="32" className="grayscale hover:grayscale-0 transition-all duration-300">
              <path fill="#FF5F00" d="M482.9 212.3L495.9 212.3 495.9 300.4 482.9 300.4z" />
              <path fill="#EB001B" d="M501.5 256.4c0-16.9 7.9-32.9 21.4-43.1-9.5-7.5-21.2-11.4-33.4-11.2-29.2-.2-52.9 23.5-53.1 52.7-.2 29.2 23.5 52.9 52.7 53.1h.4c12.1.2 23.9-3.7 33.4-11.2-13.5-10.2-21.4-26.2-21.4-43.1v2.8z" />
              <path fill="#F79E1B" d="M554.5 256.4c0 29.2-23.7 52.9-52.9 52.9-12.1.2-23.9-3.7-33.4-11.2 13.5-10.2 21.4-26.2 21.4-43.1s-7.9-32.9-21.4-43.1c9.5-7.5 21.2-11.4 33.4-11.2 29.2 0 52.9 23.7 52.9 52.9v2.8z" />
              <path fill="#000" d="M576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM64.3 239.3l.9-4.5c2.7.6 5.2 1.1 7.9 1.1 4.2 0 5.5-1.9 5.5-4 0-6.6-13.8-2.8-13.8-11.7 0-6.6 6-9.9 14.3-9.9 2.7 0 5.8.6 8.8 1.1l-.9 4.4c-2.2-.5-4.7-.8-7.1-.8-3.7 0-5.5 1.6-5.5 3.7 0 6 13.8 2.7 13.8 12 0 6.5-6.3 10-14.5 10-3.6-.1-7.2-.9-9.4-1.4zm53.4-16.3c0 12.4-7.7 17.7-18.5 17.7-10.9 0-18-5.5-18-17.7 0-11.9 7.9-17.5 18.3-17.5 10.8-.1 18.2 5.5 18.2 17.5zm-9.7 0c0-7.7-3.5-12.5-8.8-12.5-5.2 0-8.7 4.9-8.7 12.5 0 7.8 3.4 12.8 8.7 12.8 5.5 0 8.8-5 8.8-12.8zm44.2 16.3h-8.8l-.9-3.2c-2.9 2.9-6.7 4.2-10.6 4.2-8.3 0-13.5-5.5-13.5-15.2 0-10.9 6.6-17.9 17.1-17.9 3.3 0 7.4.8 10.9 2.1l-2.2 6.9c-2.5-1.2-5.1-1.8-7.7-1.8-5.5 0-8.3 4.1-8.3 10.2 0 6.2 3 9.8 8.3 9.8 1.7-.1 3.4-.5 4.9-1.3v-5.6h-6.1v-6.3h14.9v18.1zm41.8-26.6l-2.3 7.8c-2.1-.8-4.4-1.2-6.7-1.2-5.5 0-8.7 3.9-8.7 12s3 12.3 8.7 12.3c2.3 0 4.8-.5 7.1-1.4l1.9 7.9c-2.7 1.2-6.1 1.7-9.5 1.7-12.8 0-18.1-8-18.1-20.1 0-13.4 6.5-21.3 19.2-21.3 3.1 0 6.1.6 8.4 1.3zm21.4 10.3c-10.9 0-18-5.5-18-17.7 0-11.9 7.9-17.5 18.3-17.5 10.8 0 18.2 5.5 18.2 17.5 0 12.4-7.7 17.7-18.5 17.7zm0-30.3c-5.2 0-8.7 4.9-8.7 12.5 0 7.8 3.4 12.8 8.7 12.8 5.5 0 8.8-5 8.8-12.8 0-7.7-3.5-12.5-8.8-12.5zm45.3 29.3l-1.7-6.1c-2.3 4.8-5.7 7.1-9.9 7.1-8.3 0-13.7-6.5-13.7-18.1 0-12.1 5.9-19.6 15.9-19.6 5.7 0 11.4 1.9 14.7 3.7l-3.1 7.5c-2.4-1.5-5.1-2.4-7.9-2.4-4.8 0-7.7 3.7-7.7 10.2 0 7 2.9 10.9 7.7 10.9 1.7 0 3.3-.5 4.9-1.5v-5.2h-6.1v-6.6h14.9v20.1h-8zm40.2 0c-2.9-5-4.8-8.2-8-13.1v13.1h-8.7v-49.4h8.7v31.2c2.9-3.8 4.8-6.6 7.1-10.9h10.5c-3.8 6.4-5.7 9.6-9.5 14.9 4.1 6.3 8.9 13.7 12.4 18.5l-12.5-.3z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="32" height="32" className="grayscale hover:grayscale-0 transition-all duration-300">
              <path fill="#006FCF" d="M48 480C21.49 480 0 458.5 0 432V80C0 53.49 21.49 32 48 32H528C554.5 32 576 53.49 576 80V82.43H500.5L483.5 130L466.6 82.43H369.4V145.6L341.3 82.43H262.7L181 267.1H246.8V430.9H576V432C576 458.5 554.5 480 528 480H48zM482.3 112.7L445.2 209.6H519.5L482.3 112.7zM482.4 369.6L559.7 143.8H444.9L368 369.6H482.4zM262.7 369.6L308.8 255.1L327.5 307.8L320.2 327.4H368L391.2 246.8L329.7 143.8H262.7V369.6zM198.2 181.4L143.1 143.8H88.09L88.3 152.1L135.2 193.2C135.2 193.2 151.6 184.3 158.7 181.4C158.7 181.4 170.7 175.8 198.2 181.4z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="32" height="32" className="grayscale hover:grayscale-0 transition-all duration-300">
              <path fill="#F7931A" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zm-141.651-35.33c4.937-32.999-20.191-50.739-54.55-62.573l11.146-44.702-27.213-6.781-10.851 43.524c-7.154-1.783-14.502-3.464-21.803-5.13l10.929-43.81-27.198-6.781-11.153 44.686c-5.922-1.349-11.735-2.682-17.377-4.084l.031-.14-37.53-9.37-7.239 29.062s20.191 4.627 19.765 4.913c11.022 2.751 13.014 10.044 12.68 15.825l-12.696 50.925c.76.194 1.744.473 2.829.907-.907-.225-1.876-.473-2.876-.713l-17.796 71.338c-1.349 3.348-4.767 8.37-12.471 6.464.271.395-19.78-4.937-19.78-4.937l-13.51 31.147 35.414 8.827c6.588 1.651 13.045 3.379 19.4 5.006l-11.262 45.213 27.182 6.781 11.153-44.733a1038.209 1038.209 0 0 0 21.687 5.627l-11.115 44.523 27.213 6.781 11.262-45.128c46.404 8.781 81.299 5.239 95.986-36.727 11.836-33.79-.589-53.281-25.004-65.991 17.78-4.098 31.174-15.792 34.747-39.949zm-62.177 87.179c-8.41 33.79-65.308 15.523-83.755 10.943l14.944-59.899c18.446 4.603 77.6 13.717 68.811 48.956zm8.417-87.667c-7.673 30.736-55.031 15.12-70.393 11.292l13.548-54.327c15.363 3.828 64.836 10.973 56.845 43.035z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="20" height="32" className="grayscale hover:grayscale-0 transition-all duration-300">
              <path fill="#8A92B2" d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24" height="32" className="grayscale hover:grayscale-0 transition-all duration-300">
              <path fill="#00457C" d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4.7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9.7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z" />
            </svg>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} JenyaKart. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center">
            <p className="text-gray-500 text-sm">
              Designed by <a href="https://divyagonja.netlify.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">Divya Gonja</a>
            </p>
            <a href="https://github.com/divyagonja" target="_blank" rel="noopener noreferrer" className="ml-2 text-gray-400 hover:text-gray-600 transition-colors duration-300">
              <Github size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer