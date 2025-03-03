import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaWallet, FaUserFriends } from 'react-icons/fa';
import { BsBox } from 'react-icons/bs';
import { HiDotsHorizontal } from 'react-icons/hi';
import { useStore } from '../../context/StoreContext';

const BottomNav = () => {
  const { activeStore, switchStore } = useStore();
  const navigate = useNavigate();

  const handleStoreSwitch = () => {
    const newStore = activeStore === 'GP_daily' ? 'GP_store' : 'GP_daily';
    switchStore(newStore);
    navigate(newStore === 'GP_daily' ? '/' : '/store');
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-2xl mx-auto flex justify-between items-center px-6 py-2">
        <button
          onClick={handleStoreSwitch}
          className="flex flex-col items-center text-center w-16"
        >
          <FaHome 
            className={`text-xl mb-1 ${
              activeStore === 'GP_store' ? 'text-yellow-500' : 'text-gray-600'
            }`}
          />
          <span className="text-[10px]">Switch Store</span>
        </button>

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
  );
};

export default BottomNav; 