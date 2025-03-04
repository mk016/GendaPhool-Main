import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import backgroundImage from "../../../assets/store3.png";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simple UI feedback instead of backend connectivity
    if (phoneNumber.length < 10) {
      setError('Please enter a valid phone number.');
    } else {
      setError('');
      // Redirect to OTP verification page with phone number
      navigate('/otp-verification', { state: { phoneNumber } });
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div
        className="w-full md:w-1/2 h-72 md:h-auto bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 border-l border-white">
        <div className="max-w-md w-full space-y-8 border border-gray-300 p-4 rounded-lg">
          <p className="font-bold text-2xl md:text-4xl mt-2 text-center">
            Login to your account!
          </p>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm">
              <div>
                <label htmlFor="phone-number" className="sr-only">
                  Phone Number
                </label>
                <input
                  id="phone-number"
                  name="phoneNumber"
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your phone number"
                  pattern="[0-9]*"
                  maxLength={12}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
              >
                Get OTP on WhatsApp
              </button>
            </div>
            <div className="text-sm text-center text-gray-600">
              Make sure your WhatsApp notifications are enabled
            </div>
            <div className="relative mt-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white text-sm text-gray-500">or</span>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
              <button 
                type="button"
                className="flex items-center justify-center px-6 py-4 border text-center border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 w-full sm:w-auto"
              >
                <FcGoogle className="mr-2" />
                Login with Google
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-green-600 hover:text-green-500"
              >
                Sign up
              </Link>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              By continuing you agree to our{" "}
              <Link to="/terms" className="text-green-800 hover:underline">
                terms & conditions
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-green-800 hover:underline">
                privacy policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;