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

export const Terms = () => {
  const navigate = useNavigate();
  const [screenSize, setScreenSize] = useState('desktop');

  const handleClick = () => {
    console.log('Button clicked!');
    // Add any additional logic here
  };

  // Improved screen size detection with multiple breakpoints
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 640) {
        setScreenSize('mobile');
      } else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    // Initial check
    checkScreenSize();

    // Add event listener for window resize with debounce
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkScreenSize, 100);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Mobile design - optimized for small screens
  const MobileDesign = () => (
    <div
      className="flex flex-col w-full min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${termsrobotbg})` }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>

      {/* Content Container */}
      <div className="relative flex flex-col w-full h-full">
        {/* Top Panel - Logo */}
        <div className="w-full p-4 flex justify-start items-start">
          <img
            src={centrixwhitelogo}
            alt="Centrix Logo"
            className="w-28 max-w-full"
          />
        </div>

        {/* Bottom Panel - Terms Card */}
        <div className="mt-12 w-full flex-grow flex flex-col justify-center items-center px-4 pb-6">
          {/* Terms & Conditions Card */}
          <div className="font-mulish w-full max-h-[80vh] overflow-y-auto p-6 bg-white text-left rounded-xl shadow-lg relative z-10">
            <div className="text-lg text-center text-[#19213D] font-bold mb-4">
              Terms & Conditions
            </div>
            <div className="space-y-3 mb-6">
              <div>
                <div className="text-sm text-[#313131] font-medium">
                  1. Acceptance of Terms:
                </div>
                <div className="text-sm text-[#313131]">
                  Your access to and use of centrix is subject to these Terms &
                  Conditions.
                </div>
              </div>
              <div>
                <div className="text-sm text-[#313131]">
                  2. By using the platform, you agree to comply with all
                  applicable laws and regulations.
                </div>
              </div>
              <div>
                <div className="text-sm text-[#313131] font-medium">
                  3. Eligibility:
                </div>
                <div className="text-sm text-[#313131]">
                  You must be at least 18 years old or have legal guardian
                  consent to use centrix.
                </div>
              </div>
              <div>
                <div className="text-sm text-[#313131] font-medium">
                  4. User Responsibilities:
                </div>
                <div className="text-sm text-[#313131]">
                  Provide accurate and complete information.
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <BlueButton text={'ACCEPT'} onClick={handleClick} />
              <DenyButton text={'DENY'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Tablet design - optimized for medium screens
  const TabletDesign = () => (
    <div className="flex flex-col w-full min-h-screen">
      {/* Background with overlay */}
      <div
        className="w-full h-40 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${termsrobotbg})` }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        <div className="relative p-6 flex justify-start items-start h-full">
          <img
            src={centrixwhitelogo}
            alt="Centrix Logo"
            className="w-36 max-w-full"
          />
        </div>
      </div>

      {/* Terms Content */}
      <div
        className="flex-grow flex flex-col justify-start items-center py-8 px-6"
        style={{
          background: 'linear-gradient(90deg, #182E33,#182A2E,#0E1C1F)',
        }}
      >
        {/* Terms & Conditions Card */}
        <div className="font-mulish w-full max-w-lg p-8 bg-white text-left rounded-xl shadow-lg">
          <div className="text-lg text-center text-[#19213D] font-bold mb-6">
            Terms & Conditions
          </div>
          <div className="space-y-4 mb-8">
            <div>
              <div className="font-medium">1. Acceptance of Terms:</div>
              <div>
                Your access to and use of centrix is subject to these Terms &
                Conditions.
              </div>
            </div>
            <div>
              <div>
                2. By using the platform, you agree to comply with all
                applicable laws and regulations.
              </div>
            </div>
            <div>
              <div className="font-medium">3. Eligibility:</div>
              <div>
                You must be at least 18 years old or have legal guardian consent
                to use centrix.
              </div>
            </div>
            <div>
              <div className="font-medium">4. User Responsibilities:</div>
              <div>Provide accurate and complete information.</div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <BlueButton text={'ACCEPT'} onClick={handleClick} />
            <DenyButton text={'DENY'} />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center">
          <div className="text-[#313131] bg-white rounded-full p-2 text-sm font-normal">
            Disclaimer | Privacy Policy | Terms Of Use
          </div>
        </div>
      </div>
    </div>
  );

  // Desktop design - optimized for large screens
  const DesktopDesign = () => (
    <div className="flex flex-row w-full min-h-screen">
      {/* Left Panel - Background */}
      <div
        className="w-2/5 p-12 flex justify-start items-start bg-cover bg-center"
        style={{
          backgroundImage: `url(${termsrobotbg})`,
        }}
      >
        <img
          src={centrixwhitelogo}
          alt="Centrix Logo"
          className="w-48 max-w-full"
        />
      </div>

      {/* Right Panel - Terms Content */}
      <div
        className="w-3/5 flex flex-col justify-between items-center py-12 px-8"
        style={{
          background: 'linear-gradient(90deg, #182E33,#182A2E,#0E1C1F)',
        }}
      >
        <div className="flex-1"></div> {/* Top Spacer */}
        {/* Terms & Conditions Card */}
        <div className="font-mulish w-full max-w-2xl p-10 bg-white text-left rounded-2xl shadow-xl">
          <div className="text-xl text-center text-[#19213D] font-bold mb-6">
            Terms & Conditions
          </div>
          <div className="space-y-4 mb-10">
            <div>
              <div className="text-base text-[#313131] font-medium">
                1. Acceptance of Terms:
              </div>
              <div className="text-base text-[#313131]">
                Your access to and use of centrix is subject to these Terms &
                Conditions.
              </div>
            </div>
            <div>
              <div className="text-base text-[#313131]">
                2. By using the platform, you agree to comply with all
                applicable laws and regulations.
              </div>
            </div>
            <div>
              <div className="text-base text-[#313131] font-medium">
                3. Eligibility:
              </div>
              <div className="text-base text-[#313131]">
                You must be at least 18 years old or have legal guardian consent
                to use centrix.
              </div>
            </div>
            <div>
              <div className="text-base text-[#313131] font-medium">
                4. User Responsibilities:
              </div>
              <div className="text-base text-[#313131]">
                Provide accurate and complete information.
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 ">
            <BlueButton text={'ACCEPT'} onClick={handleClick} />
            <DenyButton text={'DENY'} />
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center">
          <div className="text-[#313131] bg-white rounded-full p-3 text-sm font-normal">
            Disclaimer | Privacy Policy | Terms Of Use
          </div>
        </div>
      </div>
    </div>
  );

  // Render different layouts based on screen size
  if (screenSize === 'mobile') {
    return <MobileDesign />;
  } else if (screenSize === 'tablet') {
    return <TabletDesign />;
  } else {
    return <DesktopDesign />;
  }
};

export default Terms;
