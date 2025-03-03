import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaWallet, FaUserFriends } from 'react-icons/fa';
import { BsBox } from 'react-icons/bs';
import { HiDotsHorizontal } from 'react-icons/hi';
import walletImg from '../assets/wallet.png';
import flower1 from '../assets/Flowers.jpg';
import flower2 from '../assets/Flowers.jpg';
import flower3 from '../assets/Flowers.jpg';

import { useStore } from '../context/StoreContext';

const Home = () => {
  const navigate = useNavigate();
  const { switchStore } = useStore();

  return (
    <div className="max-w-2xl mx-auto min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="p-4 bg-white shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-500">Delivering to</span>
              <span className="text-sm font-medium">JVC, Vadodara</span>
              <span className="text-xs">▼</span>
            </div>
          </div>
          <div 
            className="bg-green-100 px-3 py-1 rounded-full cursor-pointer hover:bg-green-200"
            onClick={() => {
              switchStore('GP_store');
              localStorage.setItem('activeStore', 'GP_store');
              window.location.href = '/store';
            }}
          >
            <span className="text-sm text-green-800">GP Daily</span>
          </div>
        </div>

        <div className="flex justify-between items-start mt-2">
          <div>
            <h1 className="text-xl font-semibold">Genda Phool Daily</h1>
            <p className="text-sm text-gray-500">5:00am to 7:30am</p>
          </div>
          <Link to="/wallet" className="flex items-center justify-center w-8 h-8">
            <img src={walletImg} alt="Wallet" className="w-8 h-8 mr-5 mt-3" />
          </Link>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-600">There is no order scheduled for tomorrow</p>
          <button className="bg-green-800 text-white px-4 py-2 rounded-lg text-sm">
            Continue
          </button>
        </div>
      </header>

      {/* Packages Section */}
      <section className="p-4 mt-4">
        <h2 className="text-xl font-semibold mb-4">Discover our packages</h2>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm flex">
            <img src="" alt="Puja Flowers" className="w-1/3 rounded-lg" />
            <div className="w-2/3 pl-4">
              <h3 className="font-medium">Puja Flowers Subscription</h3>
              <p className="text-sm text-gray-500">Delivered Daily | Freshly Sourced at 5:00 AM | Free Delivery</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm flex">
            <img src="path/to/exotic-flowers-image.jpg" alt="Exotic Flowers" className="w-1/3 rounded-lg" />
            <div className="w-2/3 pl-4">
              <h3 className="font-medium">Exotic Flowers Subscription</h3>
              <p className="text-sm text-gray-500">Best Quality Flowers | Delivered Every Week | Home Improvement</p>
            </div>
          </div>
        </div>
      </section>

      {/* Review Packages Section */}
      <section className="p-4 mt-4">
        <h2 className="text-xl font-semibold mb-4">Review your created packages</h2>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm flex">
            <img src="path/to/puja-flowers-image.jpg" alt="Puja Flowers" className="w-1/3 rounded-lg" />
            <div className="w-2/3 pl-4">
              <h3 className="font-medium">Puja Flowers Subscription</h3>
              <p className="text-sm text-gray-500">Delivered Daily | Freshly Sourced at 5:00 AM | Free Delivery</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm flex">
            <img src="path/to/exotic-flowers-image.jpg" alt="Exotic Flowers" className="w-1/3 rounded-lg" />
            <div className="w-2/3 pl-4">
              <h3 className="font-medium">Exotic Flowers Subscription</h3>
              <p className="text-sm text-gray-500">Best Quality Flowers | Delivered Every Week | Home Improvement</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bouquets Section */}
      <section className="p-4 mt-4">
        <h2 className="text-xl font-semibold mb-4">Bouquets</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2 text-center">
            <div className="h-24 rounded-lg overflow-hidden">
              <img 
                src={flower1} 
                alt="Bouquet 01" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm">Bouquet 01</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="h-24 rounded-lg overflow-hidden">
              <img 
                src={flower2} 
                alt="Bouquet 02" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm">Bouquet 02</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="h-24 rounded-lg overflow-hidden">
              <img 
                src={flower3} 
                alt="Bouquet 03" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm">Bouquet 03</p>
          </div>
        </div>
      </section>

      {/* Flowers Section */}
      <section className="p-4 mt-4">
        <h2 className="text-xl font-semibold mb-4">Flowers</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2 text-center">
            <div className="h-24 rounded-lg overflow-hidden">
              <img 
                src={flower1} 
                alt="Flower 01" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm">Flower 01</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="h-24 rounded-lg overflow-hidden">
              <img 
                src={flower2} 
                alt="Flower 02" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm">Flower 02</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="h-24 rounded-lg overflow-hidden">
              <img 
                src={flower3} 
                alt="Flower 03" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm">Flower 03</p>
          </div>
        </div>
      </section>

      {/* Leaves Section */}
      <section className="p-4 mt-4">
        <h2 className="text-xl font-semibold mb-4">Leaves</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2 text-center">
            <div className="h-24 rounded-lg overflow-hidden">
              <img 
                src={flower1} 
                alt="Leaf 01" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm">Leaf 01</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="h-24 rounded-lg overflow-hidden">
              <img 
                src={flower2} 
                alt="Leaf 02" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm">Leaf 02</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="h-24 rounded-lg overflow-hidden">
              <img 
                src={flower3} 
                alt="Leaf 03" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm">Leaf 03</p>
          </div>
        </div>
      </section>

      {/* Garlands Section */}
      <section className="p-4 mt-4">
        <h2 className="text-xl font-semibold mb-4">Garlands</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2 text-center">
            <div className="h-24 rounded-lg overflow-hidden">
              <img 
                src={flower1} 
                alt="Garland 01" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm">Garland 01</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="h-24 rounded-lg overflow-hidden">
              <img 
                src={flower2} 
                alt="Garland 02" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm">Garland 02</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="h-24 rounded-lg overflow-hidden">
              <img 
                src={flower3} 
                alt="Garland 03" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm">Garland 03</p>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-2xl mx-auto flex justify-between items-center px-6 py-2">
          <Link to="/" className="flex flex-col items-center text-gray-600 text-center w-16">
            <FaHome className="text-xl mb-1 " />
            <span className="text-[10px]">Switch Store</span>
          </Link>
          
          <Link to="/packages" className="flex flex-col items-center text-gray-600 text-center w-16">
            <BsBox className="text-xl mb-1" />
            <span className="text-[10px]">Packages</span>
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
};

export default Home;
