import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaWallet, FaUserFriends } from 'react-icons/fa';
import { BsBox } from 'react-icons/bs';
import { HiDotsHorizontal } from 'react-icons/hi';
import { useStore } from '../context/StoreContext';

interface DayInfo {
  date: string;
  day: string;
  status: 'past' | 'active' | 'future';
}

const Home2: React.FC = () => {
  const navigate = useNavigate();
  const { switchStore } = useStore();

  const days: DayInfo[] = [
    { date: '31', day: 'Tue', status: 'past' },
    { date: '01', day: 'Wed', status: 'past' },
    { date: '02', day: 'Thu', status: 'past' },
    { date: '03', day: 'Fri', status: 'active' },
    { date: '04', day: 'Sat', status: 'future' },
    { date: '05', day: 'Sun', status: 'future' },
    { date: '06', day: 'Mon', status: 'future' },
    { date: '07', day: 'Tue', status: 'future' },
  ];

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

        {/* Calendar Strip */}
        <div className="mt-4 overflow-x-auto">
          <div className="flex space-x-4 min-w-max">
            {days.map((day) => (
              <div 
                key={day.date}
                className={`flex flex-col items-center w-12 py-2 rounded-lg ${
                  day.status === 'active' 
                    ? 'bg-orange-500 text-white' 
                    : day.status === 'past'
                    ? 'bg-gray-100 text-gray-500'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <span className="text-xs">{day.day}</span>
                <span className="text-lg font-semibold">{day.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Status */}
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Order Delivered</h2>
            <button className="text-sm text-green-800 bg-green-100 px-3 py-1 rounded-full">
              See More
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">3 items delivered at 07:00 AM</p>
        </div>
      </header>

      {/* Packages Section */}
      <section className="p-4 mt-4">
        <h2 className="text-xl font-semibold mb-4">Discover our packages</h2>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm flex">
            <div className="w-1/3 bg-gray-200 rounded-lg h-24"></div>
            <div className="w-2/3 pl-4">
              <h3 className="font-medium">Puja Flowers Subscription</h3>
              <p className="text-sm text-gray-500">Delivered Daily | Freshly Sourced at 5:00 AM | Free Delivery</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm flex">
            <div className="w-1/3 bg-gray-200 rounded-lg h-24"></div>
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
            <div className="w-1/3 bg-gray-200 rounded-lg h-24"></div>
            <div className="w-2/3 pl-4">
              <h3 className="font-medium">Puja Flowers Subscription</h3>
              <p className="text-sm text-gray-500">Delivered Daily | Freshly Sourced at 5:00 AM | Free Delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-2xl mx-auto flex justify-between items-center px-6 py-2">
          <Link to="/" className="flex flex-col items-center text-gray-600 text-center w-16">
            <FaHome className="text-xl mb-1" />
            <span className="text-[10px]">Home</span>
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

export default Home2;
