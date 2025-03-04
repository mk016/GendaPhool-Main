import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaChevronRight } from 'react-icons/fa';

/**
 * PaymentOptions component for handling different payment methods
 * Displays UPI, Cards, Netbanking and Wallet payment options
 */
const PaymentOptions: React.FC = () => {
  const navigate = useNavigate();
  const balance: number = 240.00;

  /**
   * List of UPI payment options
   */
  const upiOptions: string[] = ['GPAY', 'PAYTM', 'PhonePay'];
  
  /**
   * List of wallet payment options
   */
  const walletOptions: string[] = ['Amazon Pay Balance', 'Paytm', 'GPAY'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button and balance display */}
      <div className="p-4 bg-white flex items-center justify-between border-b">
        <div className="flex items-center">
          <FaArrowLeft className="mr-4 text-xl" onClick={() => navigate(-1)} />
          <h1 className="text-xl font-semibold">Payment Options</h1>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Balance</div>
          <div className="font-semibold">Rs. {balance.toFixed(2)}</div>
        </div>
      </div>

      {/* Amount Display Section */}
      <div className="bg-white p-4 mb-2">
        <div className="text-sm text-gray-500">Amount to Pay</div>
        <div className="text-xl font-semibold">Rs. 1500</div>
      </div>

      {/* UPI Payment Options Section */}
      <div className="bg-white p-4 mb-2">
        <h2 className="text-gray-600 mb-4">UPI Id</h2>
        {upiOptions.map((option) => (
          <div key={option} className="flex items-center mb-4">
            <input type="radio" name="upiOption" className="mr-3" />
            <span>{option}</span>
          </div>
        ))}
        <button className="text-green-600 flex items-center">
          <span className="mr-2">+</span> Add New UPI ID
        </button>
      </div>

      {/* Credit/Debit Cards Section */}
      <div className="bg-white p-4 mb-2">
        <h2 className="text-gray-600 mb-4">Credit/Debit Card</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input type="radio" name="paymentMethod" className="mr-3" />
            <span>Pay via cards</span>
          </div>
          <FaChevronRight className="text-gray-400" />
        </div>
      </div>

      {/* Netbanking Payment Section */}
      <div className="bg-white p-4 mb-2">
        <h2 className="text-gray-600 mb-4">Netbanking</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input type="radio" name="paymentMethod" className="mr-3" />
            <span>View All</span>
          </div>
          <FaChevronRight className="text-gray-400" />
        </div>
      </div>

      {/* Digital Wallet Payment Options */}
      <div className="bg-white p-4">
        <h2 className="text-gray-600 mb-4">Wallet</h2>
        {walletOptions.map((wallet) => (
          <div key={wallet} className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input type="radio" name="walletOption" className="mr-3" />
              <span>{wallet}</span>
            </div>
            <button className="text-green-600">Link Account</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentOptions;