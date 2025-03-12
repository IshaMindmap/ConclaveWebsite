import React, { useState, useEffect } from 'react';
import InputBox from '../components/InputBox';
import BlueButton, { LoginButton } from '../components/Buttons';
import { useNavigate } from 'react-router-dom';
import {
  centrixlogo,
  centrixsymbol,
  centrixwhitelogo,
  robotbg,
  smallrobotbg,
} from '../assets';

export const Terms = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

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
    <div className="flex flex-col w-full min-h-screen">
      {/* Top Panel - Blue background with dynamic height */}
      <div
        className="h-[50vh] p-4 sm:p-6 pt-6 sm:pt-8 flex justify-start items-start"
        style={{
          backgroundImage: `url(${smallrobotbg})`,
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

      {/* Bottom Panel - Login/Signup with responsive padding and width */}
      <div className="flex-1 flex flex-col justify-between items-center py-4 sm:py-6 px-4 sm:px-6 text-center">
        <div className="flex-1"></div> {/* Spacer */}
        <img
          src={centrixsymbol}
          alt="Centrix Symbol"
          className="w-10 sm:w-12"
        />
        <div className="text-center w-full max-w-md">
          <div className="font-mulish font-bold mt-6 sm:mt-8 text-2xl sm:text-3xl text-[#111478] mb-4 sm:mb-6">
            Get Started
          </div>

          <div className="flex flex-col gap-3 sm:gap-4 justify-center items-center">
            <div
              onClick={() => navigate('/login')}
              className="w-full max-w-xs sm:max-w-sm"
            >
              <LoginButton text={'Login'} />
            </div>
            <div
              onClick={() => navigate('/signup')}
              className="w-full max-w-xs sm:max-w-sm"
            >
              <LoginButton text={'Signup'} />
            </div>
          </div>
        </div>
        <div className="mt-8 sm:mt-12 flex flex-col items-center">
          <div className="text-[#A1A1A1] text-xs sm:text-sm font-normal">
            Disclaimer | Privacy Policy | Terms Of Use
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
        className="w-1/2 p-6 md:p-8 lg:p-12 flex justify-start items-start"
        style={{
          backgroundImage: `url(${robotbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <img
          src={centrixwhitelogo}
          alt="Centrix Logo"
          className="w-32 md:w-40 lg:w-48 max-w-full"
        />
      </div>

      {/* Right Panel - Login/Signup */}
      <div className="w-1/2 flex flex-col justify-between items-center py-8 md:py-10 lg:py-12 px-4 md:px-6 text-center">
        <div className="flex-1"></div> {/* Spacer */}
        <div className="text-center w-full max-w-md">
          <div className="font-mulish font-bold text-3xl md:text-4xl text-[#111478] mb-4 md:mb-6">
            Get Started
          </div>

          <div className="flex gap-3 md:gap-4 justify-center items-center">
            <div
              onClick={() => navigate('/login')}
              className="w-32 md:w-40 lg:w-48"
            >
              <LoginButton text={'Login'} />
            </div>
            <div
              onClick={() => navigate('/signup')}
              className="w-32 md:w-40 lg:w-48"
            >
              <LoginButton text={'Signup'} />
            </div>
          </div>
        </div>
        <div className="mt-24 md:mt-32 lg:mt-40 flex flex-col items-center">
          <img
            src={centrixsymbol}
            alt="Centrix Symbol"
            className="w-16 md:w-20"
          />
          <div className="text-[#A1A1A1] text-xs md:text-sm mt-3 md:mt-4 font-normal">
            Privacy Policy | Terms Of Use
          </div>
        </div>
      </div>
    </div>
  );

  // Render different layouts based on screen size
  return isMobile ? <MobileDesign /> : <DesktopDesign />;
};

export default Terms;
