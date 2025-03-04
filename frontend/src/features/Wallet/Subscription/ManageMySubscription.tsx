import React, { useState } from 'react';
import { FaArrowLeft, FaCcVisa, FaGooglePay, FaTimes } from 'react-icons/fa';
import { SiPaytm } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';

// Define types for component props and state
interface SuccessModalProps {
  message: string;
  onClose: () => void;
}

const ManageMySubscription: React.FC = () => {
  const navigate = useNavigate();
  const [subscriptionType, setSubscriptionType] = useState<string>('Daily');
  const [nextDeliveryDate, setNextDeliveryDate] = useState<string>('15th Dec 2024');
  const [isEditingType, setIsEditingType] = useState<boolean>(false);
  const [isEditingDate, setIsEditingDate] = useState<boolean>(false);
  const [showPauseModal, setShowPauseModal] = useState<boolean>(false);
  const [showResumeModal, setShowResumeModal] = useState<boolean>(false);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [pauseDuration, setPauseDuration] = useState<string>('oneDay');
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Success Modal States
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleTypeEdit = (): void => {
    setIsEditingType(!isEditingType);
  };

  const handleDateEdit = (): void => {
    setIsEditingDate(!isEditingDate);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSubscriptionType(e.target.value);
    setIsEditingType(false);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNextDeliveryDate(e.target.value);
    setIsEditingDate(false);
  };

  const handlePause = (): void => {
    setIsPaused(true);
    setShowPauseModal(false);
    setSuccessMessage('Your Exotic flower Pack Subscription has been paused from 3 Jan 2025 to 4 Jan 2025');
    setShowSuccessModal(true);
  };

  const handleResume = (): void => {
    setIsPaused(false);
    setSuccessMessage('Your Exotic flower Pack Subscription has been resumed from 4 Jan 2025');
    setShowSuccessModal(true);
  };

  // Success Modal Component
  const SuccessModal: React.FC<SuccessModalProps> = ({ message, onClose }) => (
    <div className="fixed inset-0 flex bg-opacity-20 backdrop-blur-sm items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md m-4">
        <h2 className="text-xl font-semibold mb-4">
          {isPaused ? 'Subscription Paused!' : 'Subscription Resumed!'}
        </h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-green-600 text-white py-2 rounded-lg"
        >
          Awesome!
        </button>
      </div>
    </div>
  );

  // Cancel Modal Component
  const CancelModal: React.FC = () => (
    <div className="fixed inset-0 flex bg-opacity-20 backdrop-blur-sm items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md m-4">
        <h2 className="text-xl font-semibold mb-4">Remove Subscription?</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want remove your Exotic flower Pack Subscription
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setShowCancelModal(false)}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg"
          >
            Go back
          </button>
          <button
            onClick={() => {
              setShowCancelModal(false);
              navigate('/home');
            }}
            className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg"
          >
            Remove Subscription
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white p-4 relative">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="text-black">
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-semibold">Manage My Subscription</h1>
      </div>

      {/* Amount Due Card */}
      <div className="border border-green-500 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-gray-600 text-sm">Amount Due</p>
            <p className="text-xl font-semibold text-red-500">Rs. 149.00</p>
          </div>
          <button className="bg-green-600 text-white px-6 py-2 rounded-md">
            Pay Now
          </button>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-600">Pay via</p>
          <div className="flex gap-4">
            <FaCcVisa size={24} className="text-blue-600" />
            <SiPaytm size={24} className="text-blue-500" />
            <FaGooglePay size={24} className="text-gray-600" />
          </div>
        </div>
      </div>

      {/* Subscription Details */}
      <div className="bg-[#FFF9F0] rounded-lg p-4 mb-6">
        <h2 className="font-semibold mb-4">Your Subscription</h2>
        <div className="flex gap-4 items-center mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
          <div>
            <p className="font-medium">Exotic Flowers Pack Subscription</p>
            <p className="text-gray-600">Rs. 149.00</p>
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div>
            <p className="text-gray-600 text-sm mb-1">Subscription Type</p>
            <div className="flex items-center">
              {isEditingType ? (
                <select 
                  value={subscriptionType}
                  onChange={handleTypeChange}
                  className="font-medium border rounded p-1"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              ) : (
                <p className="font-medium">{subscriptionType}</p>
              )}
              <button onClick={handleTypeEdit} className="ml-2 text-green-600">✏️</button>
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Next Delivery Date</p>
            <div className="flex items-center">
              {isEditingDate ? (
                <input
                  type="date"
                  value={nextDeliveryDate}
                  onChange={handleDateChange}
                  className="font-medium border rounded p-1"
                />
              ) : (
                <p className="font-medium">{nextDeliveryDate}</p>
              )}
              <button onClick={handleDateEdit} className="ml-2 text-green-600">✏️</button>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center">
          Changes made to delivery schedule after 12 AM will come in effect the next day. 
          Pause/cancel request must be made the previous night before 12 am.
        </p>
      </div>

      {/* Try Something New */}
      <div className="bg-[#FFF9F0] rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <p className="font-medium">Wish to try something new?</p>
          <button 
            onClick={() => navigate('/home')}
            className="bg-[#F4A460] text-white px-4 py-2 rounded-md"
          >
            Change Packs
          </button>
        </div>
      </div>

      {/* Delivery Details */}
      <div className="mb-6">
        <h2 className="font-semibold mb-4">Delivery Details</h2>
        <p className="text-gray-600 text-sm mb-2">Delivering to</p>
        <p className="mb-4">B-149, Shilp Residency, ring road, 390009</p>
        <p className="text-gray-600">Your next delivery will be on 04 Jan 2025</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button 
          onClick={() => isPaused ? handleResume() : setShowPauseModal(true)} 
          className={`flex-1 py-3 rounded-lg ${
            isPaused 
              ? 'bg-green-600 text-white' 
              : 'border border-orange-400 text-orange-400'
          }`}
        >
          {isPaused ? 'Resume Subscription' : 'Pause Subscription'}
        </button>
        <button 
          onClick={() => setShowCancelModal(true)}
          className="flex-1 border border-red-500 text-red-500 py-3 rounded-lg"
        >
          Cancel Subscription
        </button>
      </div>

      {/* Pause Subscription Modal */}
      {showPauseModal && (
        <div className="fixed inset-0 flex bg-opacity-20  backdrop-blur-sm items-end justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-t-2xl p-6 animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Pause Subscription</h2>
              <button 
                onClick={() => setShowPauseModal(false)}
                className="text-gray-500"
              >
                <FaTimes size={24} />
              </button>
            </div>

            {/* Subscription Info */}
            <div className="bg-[#FFF9F0] rounded-lg p-4 mb-6">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                <div>
                  <p className="font-medium">Exotic Flowers Pack Subscription</p>
                  <p className="text-gray-600">Rs. 149.00</p>
                </div>
              </div>
            </div>

            {/* Duration Selection */}
            <div className="mb-6">
              <h3 className="font-medium mb-4">Select Duration</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="duration"
                    value="oneDay"
                    checked={pauseDuration === 'oneDay'}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPauseDuration(e.target.value)}
                    className="w-4 h-4 text-green-600"
                  />
                  <div>
                    <p className="font-medium">For Next 1 Day</p>
                    <p className="text-sm text-gray-500">Starting from tomorrow</p>
                  </div>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="duration"
                    value="custom"
                    checked={pauseDuration === 'custom'}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPauseDuration(e.target.value)}
                    className="w-4 h-4 text-green-600"
                  />
                  <p className="font-medium">Customize dates</p>
                </label>
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center mb-6">
              Changes made to delivery schedule after 12 AM will come in effect the next day. 
              Pause/cancel request must be made the previous night before 12 am.
            </p>

            <button 
              onClick={handlePause}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal 
          message={successMessage}
          onClose={() => setShowSuccessModal(false)}
        />
      )}

      {/* Cancel Modal */}
      {showCancelModal && <CancelModal />}
    </div>
  );
};

export default ManageMySubscription;