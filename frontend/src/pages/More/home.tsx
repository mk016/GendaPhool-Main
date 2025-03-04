import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBox, 
  FaRegCalendarAlt, 
  FaClipboardList,
  FaHistory,
  FaFileInvoiceDollar,
  FaUserFriends,
  FaGift,
  FaUserCog,
  FaWallet,
  FaQuestionCircle,
  FaShieldAlt,
  FaChevronRight
} from 'react-icons/fa';

const MorePage: React.FC = () => {
  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      {/* Products and subscriptions */}
      <div className="p-4">
        <h2 className="text-gray-600 text-sm font-medium mb-3">Products and subscriptions</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Link to="/products" className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg shadow-sm w-full aspect-square flex items-center justify-center mb-2">
              <FaBox className="text-2xl text-gray-600" />
            </div>
            <span className="text-xs text-gray-700">Products</span>
          </Link>
          <Link to="/subscriptions" className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg shadow-sm w-full aspect-square flex items-center justify-center mb-2">
              <FaRegCalendarAlt className="text-2xl text-gray-600" />
            </div>
            <span className="text-xs text-gray-700">My Subscriptions</span>
          </Link>
          <Link to="/vacation" className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg shadow-sm w-full aspect-square flex items-center justify-center mb-2">
              <FaRegCalendarAlt className="text-2xl text-gray-600" />
            </div>
            <span className="text-xs text-gray-700">Set Vacation</span>
          </Link>
        </div>

        {/* Orders and Billing */}
        <h2 className="text-gray-600 text-sm font-medium mb-3">Orders and Billing</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Link to="/orders" className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg shadow-sm w-full aspect-square flex items-center justify-center mb-2">
              <FaClipboardList className="text-2xl text-gray-600" />
            </div>
            <span className="text-xs text-gray-700">My Orders</span>
          </Link>
          <Link to="/transactions" className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg shadow-sm w-full aspect-square flex items-center justify-center mb-2">
              <FaHistory className="text-2xl text-gray-600" />
            </div>
            <span className="text-xs text-gray-700">Transactions</span>
          </Link>
          <Link to="/monthly-bill" className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg shadow-sm w-full aspect-square flex items-center justify-center mb-2">
              <FaFileInvoiceDollar className="text-2xl text-gray-600" />
            </div>
            <span className="text-xs text-gray-700">Monthly Bill</span>
          </Link>
        </div>

        {/* Rewards */}
        <h2 className="text-gray-600 text-sm font-medium mb-3">Rewards</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Link to="/refer" className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg shadow-sm w-full aspect-square flex items-center justify-center mb-2">
              <FaUserFriends className="text-2xl text-gray-600" />
            </div>
            <span className="text-xs text-gray-700">Refer</span>
          </Link>
          <Link to="/offers" className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg shadow-sm w-full aspect-square flex items-center justify-center mb-2">
              <FaGift className="text-2xl text-gray-600" />
            </div>
            <span className="text-xs text-gray-700">Offers</span>
          </Link>
        </div>

        {/* Settings List */}
        <div className="space-y-4">
          <Link to="/account" className="flex items-center bg-white p-4 rounded-lg shadow-sm">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
              <FaUserCog className="text-xl text-gray-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-medium">Account & Preferences</h3>
              <p className="text-xs text-gray-500">Edit Address, Delivery details</p>
            </div>
            <FaChevronRight className="text-gray-400" />
          </Link>

          <Link to="/wallet" className="flex items-center bg-white p-4 rounded-lg shadow-sm">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
              <FaWallet className="text-xl text-gray-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-medium">Wallet & Payment Methods</h3>
              <p className="text-xs text-gray-500">Add Money, Add or remove saved cards</p>
            </div>
            <FaChevronRight className="text-gray-400" />
          </Link>

          <Link to="/help" className="flex items-center bg-white p-4 rounded-lg shadow-sm">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
              <FaQuestionCircle className="text-xl text-gray-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-medium">Need Help?</h3>
              <p className="text-xs text-gray-500">Connect with us</p>
            </div>
            <FaChevronRight className="text-gray-400" />
          </Link>

          <Link to="/legal" className="flex items-center bg-white p-4 rounded-lg shadow-sm">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
              <FaShieldAlt className="text-xl text-gray-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-medium">Legal</h3>
              <p className="text-xs text-gray-500">Privacy Policy, Terms & Conditions</p>
            </div>
            <FaChevronRight className="text-gray-400" />
          </Link>
        </div>

        {/* Version Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">Version: 1.1.2</p>
        </div>
      </div>
    </div>
  );
};

export default MorePage;
