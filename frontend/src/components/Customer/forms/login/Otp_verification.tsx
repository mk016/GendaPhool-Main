import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Define the interface for the location state to extract the phone number
interface LocationState {
  phoneNumber: string;
}

const OTPVerification: React.FC = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const location = useLocation(); // Hook to access location object
  const phoneNumber = location.state?.phoneNumber; // Extract phone number from location state
  const [otp, setOtp] = useState<string[]>(new Array(6).fill("")); // State to hold OTP input values
  const [countdown, setCountdown] = useState<number>(29); // State for countdown timer
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // State to manage submission status

  // Effect to handle countdown timer
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
    if (!/^\d*$/.test(value)) return; // Only allow digits
    const newOtp = [...otp]; // Create a copy of the current OTP state
    newOtp[index] = value; // Update the specific index with the new value
    setOtp(newOtp); // Set the new OTP state
    if (value && element.nextSibling) {
      (element.nextSibling as HTMLInputElement).focus(); // Move focus to the next input if value is entered
    }
  };

  // Function to handle key down events in OTP input fields
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = e.currentTarget.previousSibling; // Get the previous input
      if (prevInput) {
        (prevInput as HTMLInputElement).focus(); // Move focus to the previous input if current is empty
      }
    }
  };

  // Function to handle OTP verification
  const handleVerify = () => {
    setIsSubmitting(true); // Set submitting state to true
    setTimeout(() => {
      setIsSubmitting(false); // Reset submitting state after 1.5 seconds
      navigate('/home'); // Navigate to home after verification
    }, 1500);
  };

  // Function to handle resending OTP
  const handleResendOTP = () => {
    if (countdown > 0) return; // Prevent resending if countdown is active
    setCountdown(29); // Reset countdown to 29 seconds
  };

  // Function to format the phone number for display
  const formatPhoneNumber = (phone: string) => {
    if (!phone) return '';
    const last4 = phone.slice(-4); // Get the last 4 digits of the phone number
    return `****${last4}`; // Mask the phone number except for the last 4 digits
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-400" />
      <div className="relative flex items-center justify-center h-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} // Initial animation state
          animate={{ opacity: 1, y: 0 }} // Final animation state
          transition={{ duration: 0.6 }} // Animation duration
          className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-2xl shadow-xl"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }} // Scale effect on hover
            whileTap={{ scale: 0.95 }} // Scale effect on tap
            onClick={handleBack} // Navigate back on click
            className="flex items-center text-gray-600 hover:text-green-700 transition-colors duration-200"
          >
            <FaArrowLeft className="text-xl sm:text-2xl" />
            <span className="ml-2 text-sm hidden sm:inline">Back</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 10 }} // Initial animation state for title
            animate={{ opacity: 1, y: 0 }} // Final animation state for title
            transition={{ delay: 0.2 }} // Delay for animation
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">OTP Verification</h2>
            <p className="mt-3 text-gray-600">
              Enter the verification code sent to {formatPhoneNumber(phoneNumber)} 
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }} // Initial animation state for OTP inputs
            animate={{ opacity: 1, y: 0 }} // Final animation state for OTP inputs
            transition={{ delay: 0.4 }} // Delay for animation
            className="flex gap-2 sm:gap-3 justify-between mt-8 mx-auto"
          >
            {otp.map((data, index) => (
              <motion.input
                key={index}
                whileFocus={{ scale: 1.05 }} // Scale effect on focus
                type="tel" // Input type for OTP
                maxLength={1} // Limit input to 1 character
                value={data} // Current value of the input
                onChange={(e) => handleChange(e.target, index)} // Handle change event
                onKeyDown={(e) => handleKeyDown(e, index)} // Handle key down event
                className="w-10 h-12 sm:w-14 sm:h-16 border-2 border-gray-300 rounded-xl text-center text-xl sm:text-2xl font-semibold focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                disabled={isSubmitting} // Disable input if submitting
              />
            ))}
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }} // Scale effect on hover
            whileTap={{ scale: 0.98 }} // Scale effect on tap
            onClick={handleVerify} // Handle verification on click
            disabled={isSubmitting || otp.join('').length !== 6} // Disable if submitting or OTP is not complete
            className={`w-full ${
              isSubmitting || otp.join('').length !== 6
                ? 'bg-gray-400' // Gray background if disabled
                : 'bg-green-600 hover:bg-green-700' // Green background if enabled
            } text-white py-4 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 transform`}
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }} // Rotate animation for loading
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }} // Continuous rotation
                className="inline-block w-6 h-6 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              'Verify & Proceed' // Button text when not submitting
            )}
          </motion.button>

          <motion.p 
            initial={{ opacity: 0 }} // Initial animation state for retry message
            animate={{ opacity: 1 }} // Final animation state for retry message
            transition={{ delay: 0.6 }} // Delay for animation
            className="text-sm sm:text-base text-center text-gray-600"
          >
            Didn't get the OTP?{' '}
            <motion.button 
              whileHover={{ scale: 1.05 }} // Scale effect on hover
              onClick={handleResendOTP} // Handle resend OTP on click
              disabled={countdown > 0} // Disable if countdown is active
              className={`${
                countdown > 0 ? 'text-gray-400' : 'text-green-600 hover:text-green-700' // Change text color based on countdown
              } font-medium transition-colors duration-200`}
            >
              Retry {countdown > 0 ? `in ${`00:${countdown < 10 ? `0${countdown}` : countdown}`}` : 'now'} 
            </motion.button>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default OTPVerification;