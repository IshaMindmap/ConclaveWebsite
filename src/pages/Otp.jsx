import InputBox from '../components/InputBox';
import { BlueButton } from '../components/Buttons';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { centrixwhitelogo, robotbg } from '../assets';

export const Otp = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
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

  // Detect if screen is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Responsive OTP input component
  const OtpInputs = () => (
    <div className="flex justify-center items-center gap-2 sm:gap-4 mb-6">
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
          className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-16 text-center text-base sm:text-lg font-bold border-2 border-[#19213D] rounded-lg focus:outline-none focus:border-[#19213D] focus:ring-2 focus:ring-[#19213D] transition-all duration-150"
        />
      ))}
    </div>
  );

  // Mobile design with improved responsiveness
  const MobileDesign = () => (
    <div className="flex flex-col min-h-screen">
      {/* Left Side with Background Image */}
      <div
        className="h-[40vh] sm:h-[35vh] p-4 sm:p-6 pt-6 sm:pt-8 flex justify-start items-start"
        style={{
          backgroundImage: `url(${robotbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <img
          src={centrixwhitelogo}
          alt="Centrix Logo"
          className="w-32 sm:w-40 max-w-full"
        />
      </div>

      {/* Right Side (OTP Form) */}
      <div className="flex-1 flex justify-center items-center p-4 sm:p-6">
        <div className="w-full max-w-md text-center flex flex-col justify-center items-center">
          <h1 className="text-[#111478] font-bold font-mulish text-xl sm:text-2xl mb-4 sm:mb-6">
            Enter OTP
          </h1>

          {/* OTP Inputs */}
          <OtpInputs />

          {/* Error/Success Messages */}
          {error && (
            <p className="text-red-500 text-xs sm:text-sm mb-2">{error}</p>
          )}
          {success && (
            <p className="text-green text-xs sm:text-sm mb-2">{success}</p>
          )}

          {/* Continue Button (Centered) */}
          <div className="w-full sm:w-[85%] flex justify-center items-center">
            <BlueButton text="CONTINUE" onClick={handleVerifyOTP} />
          </div>

          {/* Sign Up Link */}
          <div className="text-gray-700 font-semibold text-xs sm:text-sm mt-3 sm:mt-4">
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
    </div>
  );

  // Desktop design with improved responsiveness
  const DesktopDesign = () => (
    <div className="flex h-screen">
      {/* Left Side with Background Image */}
      <div
        className="w-5/12 lg:w-1/2 p-8 md:p-10 lg:p-12 flex justify-start items-start"
        style={{
          backgroundImage: `url(${robotbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <img
          src={centrixwhitelogo}
          alt="Centrix Logo"
          className="w-40 lg:w-48 max-w-full"
        />
      </div>

      {/* Right Side (OTP Form) */}
      <div className="w-7/12 lg:w-1/2 flex justify-center items-center p-6">
        <div className="w-full max-w-md text-center flex flex-col justify-center items-center">
          <h1 className="text-[#111478] font-bold font-mulish text-2xl md:text-3xl mb-6">
            Enter OTP
          </h1>

          {/* OTP Inputs */}
          <OtpInputs />

          {/* Error/Success Messages */}
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {success && <p className="text-green text-sm mb-2">{success}</p>}

          {/* Continue Button (Centered) */}
          <div className="w-[85%] flex justify-center items-center">
            <BlueButton text="CONTINUE" onClick={handleVerifyOTP} />
          </div>

          {/* Sign Up Link */}
          <div className="text-gray-700 font-semibold text-sm mt-4">
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
    </div>
  );

  // Render different layouts based on screen size
  return isMobile ? <MobileDesign /> : <DesktopDesign />;
};

export default Otp;
