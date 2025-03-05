import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaWallet, FaUserFriends, FaUserCircle } from 'react-icons/fa';
import { BsBox } from 'react-icons/bs';
import { HiDotsHorizontal } from 'react-icons/hi';
import { useStore } from '../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';

interface DayInfo {
  date: string;
  day: string;
  status: 'past' | 'active' | 'future';
}

const Home2: React.FC = () => {
  const navigate = useNavigate();
  const { switchStore } = useStore();
  const [days, setDays] = useState<DayInfo[]>([]);
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [locationSearchQuery, setLocationSearchQuery] = useState('');
  const [locationPredictions, setLocationPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);

  const handleLocationSearchChange = (value: string) => {
    setLocationSearchQuery(value);
    // Add Google Places API integration here if needed
  };

  const handleLocationSelect = (prediction: google.maps.places.AutocompletePrediction) => {
    setSelectedLocation(prediction.description);
    setShowLocationSearch(false);
  };

  useEffect(() => {
    const getDays = () => {
      const today = new Date();
      const nextDays: DayInfo[] = [];
      
      for(let i = 0; i < 8; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        nextDays.push({
          date: date.getDate().toString().padStart(2, '0'),
          day: date.toLocaleDateString('en-US', { weekday: 'short' }),
          status: i === 0 ? 'active' : 'future'
        });
      }
      
      setDays(nextDays);
    };

    getDays();
  }, []);

  return (
    <div className="max-w-7xl mx-auto min-h-screen bg-gray-50 pb-20 lg:pb-0">
      {/* Header */}
      <header className="p-4 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex-1">
            {/* Location search bar */}
            <div className="relative">
              <motion.div 
                className="flex items-center space-x-1 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => setShowLocationSearch(true)}
              >
                <span className="text-sm text-gray-500">Delivering to</span>
                <span className="text-sm font-medium">
                  {selectedLocation || 'Select Location'}
                </span>
                <span className="text-xs">▼</span>
              </motion.div>

              {showLocationSearch && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <input
                      type="text"
                      value={locationSearchQuery}
                      onChange={(e) => handleLocationSearchChange(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Search location..."
                    />
                    
                    {locationPredictions.length > 0 && (
                      <div className="mt-2 max-h-60 overflow-y-auto">
                        {locationPredictions.map((prediction: google.maps.places.AutocompletePrediction) => (
                          <div
                            key={prediction.place_id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleLocationSelect(prediction)}
                          >
                            {prediction.description}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <motion.div 
            className="bg-green-100 px-4 py-2 rounded-full cursor-pointer hover:bg-green-200 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              switchStore('GP_store');
              localStorage.setItem('activeStore', 'GP_store');
              window.location.href = '/store';
            }}
          >
            <span className="text-sm font-medium text-green-800">GP Daily</span>
          </motion.div>

          <div className="flex-1 flex justify-end">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="hidden lg:block"
            >
              <FaUserCircle className="text-3xl text-gray-600 cursor-pointer" />
            </motion.div>
          </div>
        </div>

        {/* Calendar Strip */}
        <div className="mt-4 overflow-x-auto scrollbar-hide">
          <motion.div 
            className="flex space-x-4 min-w-max"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {days.map((day, index) => (
              <motion.div 
                key={day.date}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col items-center w-14 py-2 rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                  day.status === 'active' 
                    ? 'bg-orange-500 text-white shadow-lg' 
                    : day.status === 'past'
                    ? 'bg-gray-100 text-gray-500'
                    : 'bg-white border border-gray-200 hover:border-orange-300'
                }`}
              >
                <span className="text-xs font-medium">{day.day}</span>
                <span className="text-lg font-semibold">{day.date}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Order Status */}
        <motion.div 
          className="mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Order Delivered</h2>
            <motion.button 
              className="text-sm text-green-800 bg-green-100 px-4 py-2 rounded-full hover:bg-green-200 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See More
            </motion.button>
          </div>
          <p className="text-sm text-gray-600 mt-1">3 items delivered at 07:00 AM</p>
        </motion.div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Packages Section */}
        <motion.section 
          className="p-4 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold mb-4">Discover our packages</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <motion.div 
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex"
              whileHover={{ y: -5 }}
            >
              <div className="w-1/3 bg-gray-200 rounded-lg h-24"></div>
              <div className="w-2/3 pl-4">
                <h3 className="font-medium">Puja Flowers Subscription</h3>
                <p className="text-sm text-gray-500">Delivered Daily | Freshly Sourced at 5:00 AM | Free Delivery</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex"
              whileHover={{ y: -5 }}
            >
              <div className="w-1/3 bg-gray-200 rounded-lg h-24"></div>
              <div className="w-2/3 pl-4">
                <h3 className="font-medium">Exotic Flowers Subscription</h3>
                <p className="text-sm text-gray-500">Best Quality Flowers | Delivered Every Week | Home Improvement</p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Review Packages Section */}
        <motion.section 
          className="p-4 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4">Review your created packages</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <motion.div 
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex"
              whileHover={{ y: -5 }}
            >
              <div className="w-1/3 bg-gray-200 rounded-lg h-24"></div>
              <div className="w-2/3 pl-4">
                <h3 className="font-medium">Puja Flowers Subscription</h3>
                <p className="text-sm text-gray-500">Delivered Daily | Freshly Sourced at 5:00 AM | Free Delivery</p>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>

      {/* Bottom Navigation - Only visible on mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden">
        <div className="max-w-2xl mx-auto flex justify-between items-center px-6 py-2">
          <Link to="/" className="flex flex-col items-center text-gray-600 text-center w-16 hover:text-orange-500 transition-colors duration-300">
            <FaHome className="text-xl mb-1" />
            <span className="text-[10px]">Home</span>
          </Link>
          
          <Link to="/packages" className="flex flex-col items-center text-gray-600 text-center w-16 hover:text-orange-500 transition-colors duration-300">
            <BsBox className="text-xl mb-1" />
            <span className="text-[10px]">Packages</span>
          </Link>
          
          <Link to="/wallet" className="flex flex-col items-center text-gray-600 text-center w-16 hover:text-orange-500 transition-colors duration-300">
            <FaWallet className="text-xl mb-1" />
            <span className="text-[10px]">Wallet</span>
          </Link>
          
          <Link to="/refer" className="flex flex-col items-center text-gray-600 text-center w-16 hover:text-orange-500 transition-colors duration-300">
            <FaUserFriends className="text-xl mb-1" />
            <span className="text-[10px]">Refer</span>
          </Link>
          
          <Link to="/more" className="flex flex-col items-center text-gray-600 text-center w-16 hover:text-orange-500 transition-colors duration-300">
            <HiDotsHorizontal className="text-xl mb-1" />
            <span className="text-[10px]">More</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Home2;
