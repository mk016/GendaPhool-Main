import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

// Define the shape of the location state, which includes the phone number
interface LocationState {
  phoneNumber: string;
}

const OTPVerification: React.FC = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const location = useLocation(); // Hook to access location state
  const phoneNumber = location.state?.phoneNumber; // Extract phone number from location state
  const [otp, setOtp] = useState<string[]>(new Array(6).fill("")); // State to hold OTP input values
  const [countdown, setCountdown] = useState<number>(29); // State for countdown timer for resending OTP
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // State to track submission status

  // Effect to handle countdown timer for OTP resend
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0)); // Decrease countdown every second
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);

  // Function to navigate back to the previous page
  const handleBack = () => {
    navigate(-1);
  };

  // Function to handle changes in OTP input fields
  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isSubmitting) return; // Prevent changes if submitting

    const value = element.value; // Get the value of the input
    if (!/^\d*$/.test(value)) return; // Only allow numeric input

    const newOtp = [...otp]; // Create a copy of the current OTP state
    newOtp[index] = value; // Update the specific index with the new value
    setOtp(newOtp); // Set the new OTP state

    // Move focus to the next input if the current one is filled
    if (value && element.nextSibling) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  // Function to handle key down events in OTP input fields
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // If backspace is pressed and the current input is empty, focus on the previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = e.currentTarget.previousSibling;
      if (prevInput) {
        (prevInput as HTMLInputElement).focus();
      }
    }
  };

  // Function to handle OTP verification
  const handleVerify = () => {
    setIsSubmitting(true); // Set submitting state to true
    
    // Simulate verification process
    setTimeout(() => {
      setIsSubmitting(false); // Reset submitting state
      navigate('/home'); // Navigate to home on successful verification
    }, 1500);
  };

  // Function to handle resending OTP
  const handleResendOTP = () => {
    if (countdown > 0) return; // Prevent resending if countdown is active
    setCountdown(29); // Reset countdown for next resend
  };

  // Function to format the phone number for display
  const formatPhoneNumber = (phone: string) => {
    if (!phone) return ''; // Return empty if no phone number
    const last4 = phone.slice(-4); // Get the last 4 digits of the phone number
    return `****${last4}`; // Mask the first digits
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-md mx-auto space-y-6">
        <button 
          onClick={handleBack} 
          className="mb-4 flex items-center text-black"
        >
          <FaArrowLeft className="text-xl" />
        </button>

        <h2 className="text-xl font-semibold">OTP Verification</h2>
        <p className="text-gray-500 text-sm">
          Enter the verification code sent to {formatPhoneNumber(phoneNumber)}
        </p>

        <div className="flex gap-2 justify-between">
          {otp.map((data, index) => (
            <input
              key={index}
              type="tel"
              maxLength={1}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl focus:border-green-500 focus:ring-1 focus:ring-green-500"
              disabled={isSubmitting} // Disable input if submitting
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={isSubmitting || otp.join('').length !== 6} // Disable if submitting or OTP is incomplete
          className={`w-full ${
            isSubmitting || otp.join('').length !== 6
              ? 'bg-gray-400'
              : 'bg-green-800 hover:bg-green-700'
          } text-white py-3 px-4 rounded-lg transition-colors`}
        >
          {isSubmitting ? 'Verifying...' : 'Verify & Proceed'}
        </button>

        <p className="text-sm text-center text-gray-500">
          Didn't get the OTP?{' '}
          <button 
            onClick={handleResendOTP}
            disabled={countdown > 0} // Disable if countdown is active
            className={`${
              countdown > 0 ? 'text-gray-400' : 'text-green-800'
            }`}
          >
            Retry {countdown > 0 ? `in ${`00:${countdown < 10 ? `0${countdown}` : countdown}`}` : 'now'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;