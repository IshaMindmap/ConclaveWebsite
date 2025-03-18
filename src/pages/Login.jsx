import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {InputBox} from '../components/InputBox';
import { BlueButton } from '../components/Buttons';
import { useNavigate } from 'react-router-dom';
import { centrixsymbol, centrixwhitelogo, robotbg } from '../assets';

export const Login = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setMobileNumber(e.target.value);
    if (error) setError('');
  };

  const handleSendOTP = async () => {
    setError('');
    setSuccess('');

    if (!mobileNumber) {
      setError('Mobile number is required!');
      return;
    }
    try {
      const backendUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${backendUrl}api/v1/auth/login/`, {
        mobile_number: mobileNumber,
      });

      if (response.status === 200) {
        setSuccess('OTP sent successfully!');
        setTimeout(() => {
          sessionStorage.setItem('mobile_number', mobileNumber);
          navigate('/otp', { state: { mobile_number: mobileNumber } });
        }, 2000);
      }
    } catch (err) {
      console.log('Error Response:', err.response?.data);
      setError(err.response?.data?.message || 'Failed to send OTP. Try again.');
    }
  };

  // Detect if screen is mobile with more specific breakpoints
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

  // Form section component - shared between mobile and desktop
  const FormSection = () => (
    <div className="w-full max-w-md lg:max-w-lg">
      <div className="text-[#111478] font-bold font-mulish text-xl sm:text-2xl lg:text-3xl mb-4 sm:mb-6 text-center md:text-left">
        Welcome Back
      </div>
        <InputBox
          label="MOBILE NO."
          id="mobile_number"
          name="mobile_number"
          placeholder="Enter Mobile No."
          value={mobileNumber}
          onChange={handleChange}
        />
      <div className="w-full mt-4 md:mt-6">
        {/* Show errors or success messages */}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green text-sm mb-2">{success}</p>}
        <div>
          <BlueButton text={'SEND OTP'} onClick={handleSendOTP} />
        </div>
      </div>
      <div className="text-gray-700 font-semibold text-xs sm:text-sm flex justify-center items-center mt-4 md:mt-6">
        Register here, if not
        <span
          className="text-[#02A82B] cursor-pointer ml-1"
          onClick={() => navigate('/signup')}
        >
          Sign up
        </span>
      </div>
    </div>
  );

  // Footer component - shared between mobile and desktop
  const Footer = ({ className }) => (
    <div className={`flex flex-col items-center ${className}`}>
      <img
        src={centrixsymbol}
        alt="Centrix Symbol"
        className="w-10 sm:w-12 md:w-16 lg:w-20"
      />
      <div className="text-[#A1A1A1] text-xs sm:text-sm mt-2 sm:mt-4 font-normal text-center">
        {isMobile
          ? 'Privacy Policy | Terms Of Use'
          : 'Disclaimer | Privacy Policy | Terms Of Use'}
      </div>
    </div>
  );

  // Mobile design
  const MobileDesign = () => (
    <div className="flex flex-col min-h-screen">
      <div
        className="h-[40vh] sm:h-[45vh] p-4 sm:p-6 pt-6 sm:pt-8 flex justify-start items-start"
        style={{
          backgroundImage: `url(${robotbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <img
          src={centrixwhitelogo}
          alt="Centrix Logo"
          className="w-20 sm:w-24"
        />
      </div>
      <div className="flex flex-col flex-grow px-4 sm:px-6 py-6 relative">
        <div className="mx-auto w-full max-w-md">
          <FormSection />
        </div>

        {/* Footer positioned at bottom */}
        <Footer className="mt-auto mb-6" />
      </div>
    </div>
  );

  // Desktop design
  const DesktopDesign = () => (
    <div className="flex min-h-screen">
      <div
        className="w-1/2 p-8 md:p-12 flex justify-start items-start"
        style={{
          backgroundImage: `url(${robotbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <img
          src={centrixwhitelogo}
          alt="Centrix Logo"
          className="w-32 md:w-40 lg:w-48"
        />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center px-4 md:px-8 lg:px-12 relative">
        <div className="w-full max-w-md lg:max-w-lg">
          <FormSection />
        </div>

        {/* Footer positioned at bottom */}
        <Footer className="absolute bottom-0 left-0 right-0 mb-6" />
      </div>
    </div>
  );

  // Render different layouts based on screen size
  return isMobile ? <MobileDesign /> : <DesktopDesign />;
};

export default Login;
