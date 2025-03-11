import InputBox from '../components/InputBox';
import { BlueButton } from '../components/Buttons';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export const Otp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);
  const mobileNumber =
    location.state?.mobile_number ||
    sessionStorage.getItem('mobile_number') ||
    '';
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    if (inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value.slice(-1);
      setOtp(newOtp);
      if (value && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.slice(0, 4).split('');
      const newOtp = [...otp];
      digits.forEach((digit, index) => {
        if (index < 4) {
          newOtp[index] = digit;
        }
      });

      setOtp(newOtp);
      const lastIndex = Math.min(digits.length, 4) - 1;
      if (lastIndex >= 0 && lastIndex < 4) {
        inputRefs[lastIndex].current.focus();
      }
    }
  };

  const handleVerifyOTP = async () => {
    setError('');
    setSuccess('');
    const enteredOTP = otp.join('');

    if (enteredOTP.length !== 4) {
      setError('Please enter a 4-digit OTP');
      return;
    }

    try {
      const backendUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(
        `${backendUrl}api/v1/auth/userverify/`,
        {
          mobile_number: mobileNumber,
          otp: enteredOTP,
        }
      );

      if (response.status === 200) {
        setSuccess('OTP verified successfully! Redirecting...');
        const { access, refresh } = response.data.token;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);

        setTimeout(() => navigate('/features'), 2000);
      }
    } catch (err) {
      console.log('Error Response:', err.response?.data);
      setError(err.response?.data?.message || 'Invalid OTP. Try again.');
    }
  };

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-[#111478] font-bold font-mulish text-2xl sm:text-3xl mb-6">
          Enter OTP
        </h1>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : null}
              className="w-12 h-12 sm:w-16 sm:h-16 text-center text-lg sm:text-2xl font-bold border-2 border-[#19213D] rounded-lg focus:outline-none focus:border-[#19213D] focus:ring-2 focus:ring-[#19213D] transition-all duration-150"
            />
          ))}
        </div>

        {/* Error/Success Messages */}
        {error && (
          <p className="text-red-500 text-sm sm:text-base mb-2">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-sm sm:text-base mb-2">{success}</p>
        )}

        {/* Continue Button */}
        <div className="flex justify-center">
          <BlueButton text="CONTINUE" onClick={handleVerifyOTP} />
        </div>
        <div className="text-gray-700 font-semibold text-sm md:text-[0.903vw] flex justify-center items-center mt-4 md:mt-[1.806vw]">
          Register here, if not
          <span
            className="text-[#02A82B] cursor-pointer ml-1"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Otp;
