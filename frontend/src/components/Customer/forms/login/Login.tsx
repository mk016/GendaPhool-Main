import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../../../../assets/loginImg.jpg";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      setError('Please enter a valid phone number.');
    } else {
      setError('');
      navigate('/otp-verification', { state: { phoneNumber } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 h-72 md:h-screen bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0  bg-opacity-30 " />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 bg-white"
      >
        <div className="max-w-md w-full space-y-8 p-6 md:p-8 rounded-2xl shadow-lg bg-white">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="font-bold text-2xl md:text-4xl mt-2 text-center bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent"
          >
            Login to your account!
          </motion.p>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="mt-8 space-y-6" 
            onSubmit={handleSubmit}
          >
            <div className="rounded-md">
              <div className="relative">
                <label htmlFor="phone-number" className="text-sm font-medium text-gray-700 mb-1 block">
                  Phone Number
                </label>
                <input
                  id="phone-number"
                  name="phoneNumber"
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ease-in-out"
                  placeholder="Enter your phone number"
                  pattern="[0-9]*"
                  maxLength={12}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Get OTP on WhatsApp
            </motion.button>

            <div className="text-sm text-center text-gray-600">
              Make sure your WhatsApp notifications are enabled
            </div>

            <div className="relative mt-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-sm text-gray-500">or</span>
              </div>
            </div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex justify-center"
            >
              <button 
                type="button"
                className="flex items-center justify-center px-6 py-3 border text-center border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 w-full sm:w-auto"
              >
                <FcGoogle className="mr-2 text-xl" />
                Login with Google
              </button>
            </motion.div>
          </motion.form>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-6"
          >
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-green-600 hover:text-green-500 transition-colors duration-200"
              >
                Sign up
              </Link>
            </p>
            <p className="text-xs text-gray-500 mt-4">
              By continuing you agree to our{" "}
              <Link to="/terms" className="text-green-800 hover:text-green-700 transition-colors duration-200">
                terms & conditions
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-green-800 hover:text-green-700 transition-colors duration-200">
                privacy policy
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;