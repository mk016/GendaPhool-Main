import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import { useStore } from '../context/StoreContext';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { switchStore } = useStore();
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('');

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Check if user has a stored location
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      setLocation(savedLocation);
    }

    return () => clearTimeout(timer);
  }, []);

  const handleStoreSelect = (store: 'GP_daily' | 'GP_store') => {
    switchStore(store);
    localStorage.setItem('activeStore', store);
    navigate(store === 'GP_daily' ? '/' : '/store');
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center">
        <div className="w-32 h-32 mb-8">
          <img 
            src="/logo.png" 
            alt="Genda Phool Logo" 
            className="w-full h-full object-contain animate-pulse"
          />
        </div>
        <div className="text-2xl font-semibold text-green-600">Genda Phool</div>
        <div className="text-sm text-gray-500 mt-2">Fresh Flowers Daily</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Location */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome to Genda Phool</h1>
          
          <div className="flex items-center bg-gray-50 p-3 rounded-lg">
            <FaMapMarkerAlt className="text-green-600 text-xl mr-3" />
            <div className="flex-1">
              <div className="text-xs text-gray-500">DELIVER TO</div>
              <div className="text-sm font-medium">
                {location || 'Select your location'}
              </div>
            </div>
            <button 
              onClick={() => navigate('/select-location')}
              className="text-green-600 text-sm font-medium"
            >
              CHANGE
            </button>
          </div>
        </div>
      </div>

      {/* Store Selection */}
      <div className="max-w-md mx-auto px-4 py-8">
        <h2 className="text-lg font-semibold mb-4">Select Your Store</h2>
        
        {/* GP Daily Store Card */}
        <div 
          onClick={() => handleStoreSelect('GP_daily')}
          className="bg-white rounded-xl shadow-sm p-4 mb-4 cursor-pointer transform transition hover:scale-[1.02]"
        >
          <div className="flex items-start">
            <div className="w-20 h-20 bg-green-50 rounded-lg flex items-center justify-center">
              <img 
                src="/daily-store.png" 
                alt="GP Daily" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-semibold">GP Daily</h3>
              <p className="text-sm text-gray-600 mt-1">Fresh flowers delivered daily for your puja needs</p>
              <div className="flex items-center mt-2 text-green-600">
                <span className="text-sm font-medium">Get Started</span>
                <FaArrowRight className="ml-2 text-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* GP Store Card */}
        <div 
          onClick={() => handleStoreSelect('GP_store')}
          className="bg-white rounded-xl shadow-sm p-4 cursor-pointer transform transition hover:scale-[1.02]"
        >
          <div className="flex items-start">
            <div className="w-20 h-20 bg-orange-50 rounded-lg flex items-center justify-center">
              <img 
                src="/store.png" 
                alt="GP Store" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-semibold">GP Store</h3>
              <p className="text-sm text-gray-600 mt-1">Exclusive flower arrangements and decorative items</p>
              <div className="flex items-center mt-2 text-orange-500">
                <span className="text-sm font-medium">Explore Store</span>
                <FaArrowRight className="ml-2 text-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold mb-6">Why Choose Genda Phool?</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-3">
                <span className="text-xl">🌸</span>
              </div>
              <h3 className="font-medium mb-1">Fresh Daily</h3>
              <p className="text-xs text-gray-600">Flowers sourced fresh every morning</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-3">
                <span className="text-xl">⏰</span>
              </div>
              <h3 className="font-medium mb-1">On-Time</h3>
              <p className="text-xs text-gray-600">Reliable morning delivery</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-3">
                <span className="text-xl">💐</span>
              </div>
              <h3 className="font-medium mb-1">Wide Selection</h3>
              <p className="text-xs text-gray-600">All types of flowers available</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-3">
                <span className="text-xl">🎁</span>
              </div>
              <h3 className="font-medium mb-1">Special Events</h3>
              <p className="text-xs text-gray-600">Custom arrangements for occasions</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-500">By continuing, you agree to our</p>
          <div className="flex justify-center space-x-2 mt-1">
            <button className="text-xs text-green-600">Terms of Service</button>
            <span className="text-gray-400">•</span>
            <button className="text-xs text-green-600">Privacy Policy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing; 