import React, { useState, useEffect } from 'react';
import InputBox from '../components/InputBox';
import BlueButton, { LoginButton } from '../components/Buttons';
import { useNavigate } from 'react-router-dom';
import { centrixlogo, centrixsymbol, centrixwhitelogo } from '../assets';

export const LandingScreen = () => {
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
      {/* Left Panel - Blue background */}
      <div className="bg-[#111478] h-[30vh] p-12 flex justify-start items-start">
        <img src={centrixwhitelogo} alt="Centrix Logo" className="max-w-full" />
      </div>

      {/* Right Panel - Login/Signup */}
      <div className=" flex flex-col justify-between items-center py-12 px-6 text-center">
        <div className="flex-1"></div> {/* Spacer */}
        <img src={centrixsymbol} alt="Centrix Symbol" className="w-20" />
        <div className="text-center w-full max-w-md">
          <div className="font-mulish font-bold mt-4 text-3xl text-[#111478] mb-6">
            Get Started
          </div>

          <div className="flex flex-col gap-4 justify-center items-center">
            <div onClick={() => navigate('/login')} className="w-auto">
              <LoginButton text={'Login'} />
            </div>
            <div onClick={() => navigate('/signup')} className="w-auto">
              <LoginButton text={'Signup'} />
            </div>
          </div>
        </div>
        <div className="mt-24 flex flex-col items-center">
          <div className="text-[#A1A1A1] text-sm font-normal">
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
      <div className="bg-[#111478] w-1/2 p-12 flex justify-start items-start">
        <img src={centrixwhitelogo} alt="Centrix Logo" className="max-w-full" />
      </div>

      {/* Right Panel - Login/Signup */}
      <div className="w-1/2 flex flex-col justify-between items-center py-12 px-6 text-center">
        <div className="flex-1"></div> {/* Spacer */}
        <div className="text-center w-full max-w-md">
          <div className="font-mulish font-bold text-4xl text-[#111478] mb-6">
            Get Started
          </div>

          <div className="flex gap-4 justify-center items-center">
            <div onClick={() => navigate('/login')} className="w-auto">
              <LoginButton text={'Login'} />
            </div>
            <div onClick={() => navigate('/signup')} className="w-auto">
              <LoginButton text={'Signup'} />
            </div>
          </div>
        </div>
        <div className="mt-24 flex flex-col items-center">
          <img src={centrixsymbol} alt="Centrix Symbol" className="w-20" />
          <div className="text-[#A1A1A1] text-sm mt-4 font-normal">
            Privacy Policy | Terms Of Use
          </div>
        </div>
      </div>
    </div>
  );

  // Render different layouts based on screen size
  return isMobile ? <MobileDesign /> : <DesktopDesign />;
};

export default LandingScreen;
