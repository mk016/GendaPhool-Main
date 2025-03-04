import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../../context/StoreContext';
import { FaShoppingCart, FaSearch, FaHome, FaWallet, FaUserFriends } from 'react-icons/fa';
import { BsBox } from 'react-icons/bs';
import { HiDotsHorizontal } from 'react-icons/hi';

function Home() {
  const navigate = useNavigate();
  const { switchStore } = useStore();

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      {/* Store Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            <span className="text-sm text-gray-500">Delivering to</span>
            <span className="text-sm font-medium">JVC, Vadodara</span>
            <span className="text-xs">▼</span>
          </div>
          <div 
            className="bg-orange-400 px-3 py-1 rounded-full cursor-pointer"
            onClick={() => {
              switchStore('GP_daily');
              localStorage.setItem('activeStore', 'GP_daily');
              navigate('/');
            }}
          >
            <span className="text-sm text-white font-medium">GP Store</span>
          </div>
        </div>
        <div className="mb-2">
          <h1 className="text-lg font-semibold">Genda_Phool_Store</h1>
          <p className="text-xs text-gray-600">5:00am to 8:30pm</p>
        </div>
      </div>

      {/* Search Icon - Fixed Position */}
      <div className="fixed right-4 bottom-30 z-10">
        <button 
          className="bg-green-600 text-white p-3 rounded-full shadow-lg"
          onClick={() => navigate('/store/search')}
        >
          <FaSearch />
        </button>
      </div>

      {/* Promotional Slides */}
      <div className="p-4">
        <div className="bg-gray-200 rounded-lg h-40 w-full flex items-center justify-center mb-6">
          <p className="text-gray-600 font-medium">Promotional slides</p>
        </div>

        {/* Order Again Section */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Order Again</h2>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <div key={index} className="mb-4">
                <div className="bg-gray-200 rounded-lg h-20 mb-1"></div>
                <p className="text-xs text-center font-medium">Flower {(index % 3) + 1}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Deals of the day */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Deals of the day</h2>
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((item, index) => (
              <div key={index} className="mb-4">
                <div className="bg-gray-200 rounded-lg h-20 mb-1"></div>
                <p className="text-xs text-center font-medium">Flower {(index % 3) + 1}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Exotic Flowers & Bouquets */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Exotic Flowers & Bouquets</h2>
            <span className="text-xs text-green-600 font-medium">View all</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((item, index) => (
              <div key={index} className="mb-4">
                <div className="bg-gray-200 rounded-lg h-20 mb-1"></div>
                <p className="text-xs text-center font-medium">Flower {(index % 3) + 1}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Puja Flowers & Leaves */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Puja Flowers & Leaves</h2>
            <span className="text-xs text-green-600 font-medium">View all</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((item, index) => (
              <div key={index} className="mb-4">
                <div className="bg-gray-200 rounded-lg h-20 mb-1"></div>
                <p className="text-xs text-center font-medium">Flower {(index % 3) + 1}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Puja Garlands */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Puja Garlands</h2>
            <span className="text-xs text-green-600 font-medium">View all</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((item, index) => (
              <div key={index} className="mb-4">
                <div className="bg-gray-200 rounded-lg h-20 mb-1"></div>
                <p className="text-xs text-center font-medium">Flower {(index % 3) + 1}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Festive Torans */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Festive Torans</h2>
            <span className="text-xs text-green-600 font-medium">View all</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((item, index) => (
              <div key={index} className="mb-4">
                <div className="bg-gray-200 rounded-lg h-20 mb-1"></div>
                <p className="text-xs text-center font-medium">Flower {(index % 3) + 1}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Wedding Special */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Wedding Special</h2>
            <span className="text-xs text-green-600 font-medium">View all</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((item, index) => (
              <div key={index} className="mb-4">
                <div className="bg-gray-200 rounded-lg h-20 mb-1"></div>
                <p className="text-xs text-center font-medium">Flower {(index % 3) + 1}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Customized Orders */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Customized Orders</h2>
          <div className="bg-gray-200 rounded-lg h-32 w-full flex items-center justify-center">
            <p className="text-gray-600 font-medium">Custom order form</p>
          </div>
        </section>
      </div>

      {/* Cart Indicator */}
      <div className="fixed bottom-16 left-0 right-0 bg-yellow-500 text-white py-3 px-4">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <div className="flex items-center">
            <FaShoppingCart className="mr-2" />
            <span>1 item in cart</span>
          </div>
          <button className="bg-white text-yellow-500 px-3 py-1 rounded-md text-sm font-medium">
            View cart
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto flex justify-between items-center px-6 py-2">
          <Link to="/store" className="flex flex-col items-center text-green-600 text-center w-16">
            <FaHome className="text-xl mb-1" />
            <span className="text-[10px]">Switch Store</span>
          </Link>
          
          <Link to="/products" className="flex flex-col items-center text-gray-600 text-center w-16">
            <BsBox className="text-xl mb-1" />
            <span className="text-[10px]">Products</span>
          </Link>
          
          <Link to="/wallet" className="flex flex-col items-center text-gray-600 text-center w-16">
            <FaWallet className="text-xl mb-1" />
            <span className="text-[10px]">Wallet</span>
          </Link>
          
          <Link to="/refer" className="flex flex-col items-center text-gray-600 text-center w-16">
            <FaUserFriends className="text-xl mb-1" />
            <span className="text-[10px]">Refer</span>
          </Link>
          
          <Link to="/more" className="flex flex-col items-center text-gray-600 text-center w-16">
            <HiDotsHorizontal className="text-xl mb-1" />
            <span className="text-[10px]">More</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Home;
