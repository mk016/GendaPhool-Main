import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const Wallet = () => {
  const navigate = useNavigate();
  const balance = 240.00;

  const handlePayment = () => {
    navigate('/payment-options');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b">
        <div className="flex items-center">
          <FaArrowLeft className="mr-4 text-xl" onClick={() => navigate(-1)} />
          <h1 className="text-xl font-semibold">Wallet</h1>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Balance</div>
          <div className="font-semibold">Rs. {balance.toFixed(2)}</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Setup Autopay */}
        <div className="mb-4 p-4 border rounded-lg flex items-center">
          <input type="radio" name="paymentType" className="mr-3" />
          <span className="text-gray-700">Setup Autopay</span>
        </div>

        {/* Recharge Once Section */}
        <div className="border rounded-lg p-4 mb-4">
          <div className="flex items-center mb-4">
            <input 
              type="radio" 
              name="paymentType" 
              className="mr-3" 
              defaultChecked 
            />
            <span className="text-gray-700">Recharge Once</span>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-semibold">Rs. 1500</span>
            <span className="text-green-600">%Offer</span>
          </div>

          {/* Offers */}
          {[1, 2, 3].map((num) => (
            <div key={num} className="bg-white p-4 rounded-lg mb-2 border">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">Offer {num.toString().padStart(2, '0')}</div>
                  <div className="text-sm text-gray-500">Cashback or description</div>
                </div>
                <button className="text-green-700">APPLY</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Payment Button */}
      <div className="fixed bottom-10 left-0 right-0 p-4 bg-white border-t">
        <button
          onClick={handlePayment}
          className="w-full bg-green-800 text-white py-4 rounded-lg font-semibold"
        >
          Pay Rs. 1500
        </button>
      </div>
    </div>
  );
};

export default Wallet;
