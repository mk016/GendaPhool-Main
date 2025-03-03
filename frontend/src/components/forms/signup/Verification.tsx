import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

interface LocationState {
  phoneNumber: string;
}

const Verification: React.FC = () => { 
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber;
  const [countdown, setCountdown] = useState<number>(29);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!phoneNumber) {
      navigate('/signup');
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [phoneNumber, navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isSubmitting) return;

    const value = element.value;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && element.nextSibling) {
      (element.nextSibling as HTMLInputElement).focus();
    }

    // Auto-submit when all digits are entered
    if (index === 5 && value) {
      const completeOtp = [...newOtp.slice(0, 5), value];
      if (completeOtp.every(digit => digit !== "")) {
        handleVerify();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = e.currentTarget.previousSibling;
      if (prevInput) {
        (prevInput as HTMLInputElement).focus();
      }
    }
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) return;

    setIsSubmitting(true);
    setError('');

    // Simulate verification process
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/discover-store'); // Navigate to next page
    }, 1500);
  };

  const handleResendOTP = () => {
    if (countdown > 0) return;

    setCountdown(29);
    setError('');
  };

  const formatPhoneNumber = (phone: string) => {
    if (!phone) return '';
    const last4 = phone.slice(-4);
    return `****${last4}`;
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-md mx-auto space-y-6">
        <button onClick={handleBack} className="mb-4 flex items-center text-black">
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
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              className="w-12 h-12 border border-green-500 rounded-lg text-center text-xl focus:border-green-500 focus:ring-1 focus:ring-green-500"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              disabled={isSubmitting}
            />
          ))}
        </div>

        <button 
          onClick={handleVerify} 
          disabled={isSubmitting || otp.join('').length !== 6}
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
            disabled={countdown > 0}
            className={`${
              countdown > 0 ? 'text-gray-400' : 'text-green-800'
            }`}
          >
            Retry {countdown > 0 ? `in ${`00:${countdown < 10 ? `0${countdown}` : countdown}`}` : 'now'}
          </button>
        </p>

        {error && <p className="text-sm text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
}

export default Verification;