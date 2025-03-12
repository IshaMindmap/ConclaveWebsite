import React, { useState,useEffect } from 'react';
import axios from 'axios';
import InputBox from '../components/InputBox';
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

  // Mobile design
  const MobileDesign = () => (
    <div className="flex flex-col">
      <div
        className="h-[44.71vh] p-6 pt-8 flex justify-start items-start"
        style={{
          backgroundImage: `url(${robotbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <img src={centrixwhitelogo} alt="Centrix Logo" className="w-24" />
      </div>
      <div className=" flex flex-col h-[50vh] mt-4 px-4 md:px-0 relative">
        <div className="w-full max-w-md md:max-w-[30.972vw]">
          <div className="text-[#111478] font-bold font-mulish text-2xl md:text-[2.222vw] mb-6 md:mb-[1.458vw] text-center md:text-left">
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
          <div className="w-full mt-4 md:mt-[1.806vw]">
            {/* Show errors or success messages */}
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            {success && (
              <p className="text-green-500 text-sm mb-2">{success}</p>
            )}
            <div>
              <BlueButton text={'SEND OTP'} onClick={handleSendOTP} />
            </div>
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

        {/* Footer added at the bottom */}
        <div className="absolute bottom-2 left-0 right-0 flex flex-col items-center mb-8">
          <img src={centrixsymbol} alt="Centrix Symbol" className="w-12" />
          <div className="text-[#A1A1A1] text-sm mt-4 font-normal">
            Privacy Policy | Terms Of Use
          </div>
        </div>
      </div>
    </div>
  );

  // Desktop design
  const DesktopDesign = () => (
   <div className="flex">
      <div
        className=" w-1/2 p-12 flex justify-start items-start"
        style={{
          backgroundImage: `url(${robotbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <img src={centrixwhitelogo} alt="Centrix Logo" className="max-w-full" />
      </div>
      <div className="flex self-center w-1/2 flex-col justify-center items-center h-screen px-4 md:px-0 relative">
        <div className="w-full max-w-md md:max-w-[30.972vw]">
          <div className="text-[#111478] font-bold font-mulish text-2xl md:text-[2.222vw] mb-6 md:mb-[1.458vw] text-center md:text-left">
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
          <div className="w-full mt-4 md:mt-[1.806vw]">
            {/* Show errors or success messages */}
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            {success && (
              <p className="text-green-500 text-sm mb-2">{success}</p>
            )}
            <div>
              <BlueButton text={'SEND OTP'} onClick={handleSendOTP} />
            </div>
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

        {/* Footer added at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center mb-8">
          <img src={centrixsymbol} alt="Centrix Symbol" className="w-20" />
          <div className="text-[#A1A1A1] text-sm mt-4 font-normal">
            Disclaimer | Privacy Policy | Terms Of Use
          </div>
        </div>
      </div>
    </div>
  );

  // Render different layouts based on screen size
  return isMobile ? <MobileDesign /> : <DesktopDesign />;
};

export default Login;


