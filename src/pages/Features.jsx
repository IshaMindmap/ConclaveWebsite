import React, { useState, useEffect } from 'react';
import InputBox from '../components/InputBox';
import {
  LoginButton,
  BlueButton,
  DashboardButton,
  DenyButton,
} from '../components/Buttons';
import { useNavigate } from 'react-router-dom';
import {
  centrixlogo,
  centrixsymbol,
  centrixwhitelogo,
  robotbg,
  smallrobotbg,
  termsrobotbg,
} from '../assets';

export const Features = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  const handleClick = () => {
    console.log('Button clicked!');
    // Add any additional logic here
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
  <div className="relative flex flex-col w-full min-h-screen">
    {/* Background image layer */}
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `url(${termsrobotbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'blur(16px)',
        transform: 'scale(1.1)', // Prevent blur edges from showing
      }}
    ></div>

    {/* Overlay to darken the blurred background if needed */}
    <div className="absolute inset-0 z-10 bg-black bg-opacity-30"></div>

    {/* Content container */}
    <div className="relative z-20 flex flex-col w-full min-h-screen">
      {/* Top Panel - Logo only */}
      <div className="w-full h-32 p-4 flex justify-start items-start">
        <img
          src={centrixwhitelogo}
          alt="Centrix Logo"
          className="w-28 max-w-full"
        />
      </div>

      {/* Bottom Panel - Main Content */}
      <div className="w-full flex-grow flex flex-col justify-between items-center py-6 px-4 text-center">
        {/* Areas of Interest Card */}
        <div className="font-mulish w-full p-6 bg-white text-left rounded-lg mt-4">
          <div className="text-xl text-[#111478] italic font-bold mb-6">
            Select Area Of Interest
          </div>

          <div className="mt-4 text-base flex justify-center items-center p-4 rounded-lg bg-[#19213D] text-white italic font-bold mb-4">
            Cardiology
          </div>

          <div className="text-base flex justify-center items-center p-4 rounded-lg border border-[#19213D] bg-white text-[#19213D] italic font-bold mb-4">
            Diabetology
          </div>

          <div className="text-base flex justify-center items-center p-4 rounded-lg border border-[#19213D] bg-white text-[#19213D] italic font-bold mb-4">
            Respiratory
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col items-center">
          <div className="text-[#313131] bg-white rounded-full p-2 text-xs font-normal">
            Disclaimer | Privacy Policy | Terms Of Use
          </div>
        </div>
      </div>
    </div>
  </div>
);

  // Desktop design
  const DesktopDesign = () => (
    <div className="flex flex-row w-full min-h-screen">
      {/* Left Panel - Blue background */}
      <div
        className="w-[43.33%] p-6 md:p-8 lg:p-12 flex justify-start items-start"
        style={{
          backgroundImage: `url(${termsrobotbg})`,
        }}
      >
        <img
          src={centrixwhitelogo}
          alt="Centrix Logo"
          className="w-32 md:w-40 lg:w-48 max-w-full"
        />
      </div>

      {/* Right Panel - Login/Signup */}
      <div
        className="fill-available flex flex-col justify-between items-center py-8 md:py-10 lg:py-12 px-4 md:px-6 text-center"
        style={{
          background: 'linear-gradient(90deg, #182E33,#182A2E,#0E1C1F)',
        }}
      >
        <div className="flex-1"></div> {/* Spacer */}
        <div className="font-mulish w-[38.542vw] p-8 bg-white text-left rounded-[1.667vw]">
          <div className="text-[1.667vw] text-[#111478] italic font-[700] mb-4">
            Select Area Of Interest
          </div>
          <div className="mt-8 text-[1.667vw] flex justify-center items-center p-6 rounded-[1.146vw] bg-[#19213D] text-white italic font-[700] mb-4">
            Cardiology
          </div>
          <div className="text-[1.667vw] flex justify-center items-center p-6 rounded-[1.146vw] border border-[#19213D] bg-white text-[#19213D] italic font-[700] mb-4">
            Diabetology
          </div>
          <div className="text-[1.667vw] flex justify-center items-center p-6 rounded-[1.146vw] border border-[#19213D] bg-white text-[#19213D] italic font-[700] mb-4">
            Respiratory
          </div>
        </div>
        <div className="mt-28 flex flex-col items-center">
          <div className="text-[#313131] bg-white rounded-full p-2 text-xs md:text-sm mt-3 md:mt-4 font-normal">
            Disclaimer | Privacy Policy | Terms Of Use
          </div>
        </div>
      </div>
    </div>
  );

  // Render different layouts based on screen size
  return isMobile ? <MobileDesign /> : <DesktopDesign />;
};

export default Features;
