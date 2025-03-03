import React, { useState } from 'react';
import backgroundImage from "../../../assets/store3.png";
import { Link, useNavigate } from 'react-router-dom';

interface FormData {
  username: string;
  mobile: string;
  password: string;
}

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    mobile: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const formatPhoneNumber = (number: string): string => {
    const cleaned = number.replace(/\D/g, '');
    if (!cleaned.startsWith('91')) {
      return `91${cleaned}`;
    }
    return cleaned;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formattedPhone = formatPhoneNumber(formData.mobile);
    
    // Simulate successful OTP sending
    setTimeout(() => {
      // Store user data temporarily
      localStorage.setItem('userData', JSON.stringify(formData));
      
      // Navigate to verification
      navigate('/Verification', { 
        state: { 
          phoneNumber: formattedPhone,
          message: 'Please check WhatsApp for OTP'
        } 
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="container mx-auto flex flex-col md:flex-row">
        <div 
          className="w-full md:w-1/2 bg-cover bg-center h-64 md:h-auto" 
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="max-w-md w-full space-y-8">
            <div className="mt-9">
              <p className="font-bold text-3xl mt-2">Create an account</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 text-start">
                  Username
                </label>
                <input 
                  type="text" 
                  name="username" 
                  id="username" 
                  autoComplete="username" 
                  required 
                  className="mt-1 block px-4 py-4 rounded-md w-full border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-green-500 sm:text-sm" 
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mt-8 text-start">
                  Mobile Number
                </label>
                <input 
                  type="tel" 
                  name="mobile" 
                  id="mobile" 
                  autoComplete="tel" 
                  required 
                  pattern="[0-9]*"
                  maxLength={12}
                  className="mt-1 block w-full border px-4 py-4 rounded-md border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-green-500 sm:text-sm" 
                  placeholder="Enter your mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="password" className="mt-8 block text-sm font-medium text-gray-700 text-start">
                  Password
                </label>
                <input 
                  type="password" 
                  name="password" 
                  id="password" 
                  required 
                  className="mt-1 block w-full border px-4 py-4 rounded-md border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-green-500 sm:text-sm" 
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading || formData.mobile.length < 10}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-md font-bold text-white mt-8 ${
                    isLoading || formData.mobile.length < 10
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-800 hover:bg-green-700'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Sending OTP...
                    </div>
                  ) : (
                    'Signup & Get OTP'
                  )}
                </button>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
                    Log in
                  </Link>
                </p>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                By continuing you agree to our{" "}
                <Link to="/terms" className="text-green-800 hover:underline">
                  terms & conditions
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-green-800 hover:underline">
                  privacy policy
                </Link>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;