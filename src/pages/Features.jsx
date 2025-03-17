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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selected, setSelected] = useState(null);
  const specialties = ['Cardiology', 'Diabetology', 'Respiratory'];
  const [activetab , setActiveTab] = useState(0)

  const handleCategory= (index) =>{
  
    if(specialties[index]){
      let category = specialties[index]
      category= String(category).toLowerCase()
      localStorage.setItem("category", category);
      localStorage.setItem("activetab", index);
      navigate('/main')
    }
  }


  useEffect(() => {
    let tab = localStorage.getItem("activetab");
    if(tab!='null'){
      setActiveTab(tab)
    }
    
  }, []);


  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width < 768);
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mobile design with improved responsiveness
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
        <div className="w-full h-20 sm:h-24 p-4 flex justify-start items-start">
          <img
            src={centrixwhitelogo}
            alt="Centrix Logo"
            className="w-20 sm:w-24 max-w-full"
          />
        </div>

        {/* Bottom Panel - Main Content */}
        <div className="w-full flex-grow flex flex-col justify-between items-center py-4 sm:py-6 px-3 sm:px-4 text-center">
          {/* Areas of Interest Card */}
          <div className="font-mulish w-full max-w-md p-4 sm:p-6 bg-white text-left rounded-lg mt-28">
            <div className="text-lg sm:text-xl text-[#111478] italic font-bold mb-4 sm:mb-6">
              Select Area Of Interest 
            </div>
            {specialties.map((specialty, index) => (
              <div
                key={index} 
                className={`mt-3 cursor-pointer sm:mt-4 text-sm sm:text-base flex justify-center items-center p-3 sm:p-4 rounded-lg border-[#19213D] border-[1px] ${(activetab==index)?'bg-[#19213D] text-white':'text-[#19213D] border-[#19213D] bg-white'} italic font-bold mb-3 sm:mb-4`}
                onClick={() => handleCategory(index)}
              >
                {specialty}
              </div>
            ))}

            {/* <div className="text-sm cursor-pointer sm:text-base flex justify-center items-center p-3 sm:p-4 rounded-lg border border-[#19213D] bg-white text-[#19213D] italic font-bold mb-3 sm:mb-4">
              Diabetology
            </div>

            <div className="text-sm cursor-pointer sm:text-base flex justify-center items-center p-3 sm:p-4 rounded-lg border border-[#19213D] bg-white text-[#19213D] italic font-bold mb-3 sm:mb-4">
              Respiratory
            </div> */}

          </div>

          {/* Footer */}
          <div className="mt-6 sm:mt-8 flex flex-col items-center">
            <div className="text-[#313131] bg-white rounded-full py-1 px-3 sm:p-2 text-xs font-normal">
              Disclaimer | Privacy Policy | Terms Of Use
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Desktop design with improved responsive units
  const DesktopDesign = () => {
    // Calculate responsive card width based on window width
    const cardWidth = Math.min(500, windowWidth * 0.38); // Max 500px or 38% of window

    return (
      <div className="flex flex-row w-full min-h-screen">
        {/* Left Panel - Blue background */}
        <div
          className="w-5/12 lg:w-[43%] p-6 md:p-8 lg:p-12 flex justify-start items-start"
          style={{
            backgroundImage: `url(${termsrobotbg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <img
            src={centrixwhitelogo}
            alt="Centrix Logo"
            className="w-28 md:w-36 lg:w-44 max-w-full"
          />
        </div>

        {/* Right Panel - Login/Signup */}
        <div
          className="flex-1 flex flex-col justify-between items-center py-8 md:py-10 lg:py-12 px-4 md:px-6 text-center"
          style={{
            background: 'linear-gradient(90deg, #182E33,#182A2E,#0E1C1F)',
          }}
        >
          <div className="flex-1"></div> {/* Spacer */}
          <div
            className="font-mulish p-6 md:p-8 bg-white text-left rounded-xl md:rounded-2xl"
            style={{ width: `${cardWidth}px` }}
          >
            <div className="text-lg md:text-xl lg:text-2xl text-[#111478] italic font-bold mb-4">
              Select Area Of Interest
            </div>
            {specialties.map((specialty, index) => (
              <div 
                key={index} 
                className={`mt-6 cursor-pointer md:mt-8 text-base md:text-lg lg:text-xl flex justify-center items-center p-4 md:p-6 rounded-lg md:rounded-xl border-[#19213D] border-[1px] ${(activetab==index)?'bg-[#19213D]   text-white':'text-[#19213D] border-[#19213D] bg-white'} italic font-bold mb-4`}
                onClick={() => handleCategory(index)}
              >
                {specialty}
              </div>
            ))}


          </div>
          <div className="mt-16 md:mt-20 lg:mt-28 flex flex-col items-center">
            <div className="text-[#313131] bg-white rounded-full p-2 text-xs md:text-sm mt-3 md:mt-4 font-normal">
              Disclaimer | Privacy Policy | Terms Of Use
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render different layouts based on screen size
  return isMobile ? <MobileDesign /> : <DesktopDesign />;
};

export default Features;
