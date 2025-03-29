import React, { useState, useEffect } from 'react';
import { herobg, herobgshadow, banner2, banner3, logowhite } from '../assets';
import { useNavigate } from 'react-router-dom';

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState('right');
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();
  
  const carouselData = [
    {
      bg: herobg,
      bgShadow: herobgshadow,
      title: "ONE-STOP SOLUTION FOR",
      mainTitle: "Project Management Services",
      buttonText: "GET SOLUTION NOW"
    },
    {
      bg: banner2,
      bgShadow: herobgshadow,
      title: "PROFESSIONAL EXPERTISE IN",
      mainTitle: "Strategic Planning & Execution",
      buttonText: "LEARN MORE"
    },
    {
      bg: banner3,
      bgShadow: herobgshadow,
      title: "DELIVERING EXCELLENCE WITH",
      mainTitle: "Innovative Business Solutions",
      buttonText: "CONTACT US"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!animating) {
        setDirection('right');
        changeSlide((prev) => (prev + 1) % carouselData.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [animating, carouselData.length]);

  const goToSlide = (index) => {
    if (animating || index === currentSlide) return;
    
    const newDirection = index > currentSlide ? 'right' : 'left';
    setDirection(newDirection);
    changeSlide(index);
  };

  const changeSlide = (indexOrFunc) => {
    setAnimating(true);
    
    const nextIndex = typeof indexOrFunc === 'function' 
      ? indexOrFunc(currentSlide) 
      : indexOrFunc;
    
    setTimeout(() => {
      setCurrentSlide(nextIndex);
      
      setTimeout(() => {
        setAnimating(false);
      }, 500);
    }, 10);
  };

  const getSlideClasses = () => {
    const baseClasses = "absolute top-0 left-0 w-full h-full flex flex-col transition-transform duration-500";
    
    if (!animating) {
      return `${baseClasses} transform-none`;
    }
    
    return direction === 'right'
      ? `${baseClasses} animate-slide-out-left`
      : `${baseClasses} animate-slide-out-right`;
  };

  const getNextSlideClasses = () => {
    const baseClasses = "absolute top-0 left-0 w-full h-full flex flex-col transition-transform duration-500";
    
    if (!animating) {
      return `${baseClasses} translate-x-full hidden`;
    }
    
    return direction === 'right'
      ? `${baseClasses} animate-slide-in-right`
      : `${baseClasses} animate-slide-in-left`;
  };

  const nextSlideIndex = direction === 'right'
    ? (currentSlide + 1) % carouselData.length
    : (currentSlide - 1 + carouselData.length) % carouselData.length;

  const currentCarouselItem = carouselData[currentSlide];
  const nextCarouselItem = carouselData[nextSlideIndex];

  const renderContent = (item) => (
    <>
      {/* Navigation Menu */}
      <div className="flex justify-between z-10 px-4 md:px-[5.71vw] pt-4 md:pt-[1.635vw]">
        <div className=""><img src={logowhite} className='w-[150px] h-auto md:w-[19.985vw] md:h-[4.978vw]'/></div>
        <div className="hidden md:flex justify-center items-center text-white text-[1.025vw] gap-[2.562vw]">
          <div className="cursor-pointer hover:text-[#FECC0D] transition-colors" onClick={()=>{navigate('/aboutus')}}>ABOUT US</div>
          <div className="cursor-pointer hover:text-[#FECC0D] transition-colors" onClick={()=>{navigate('/solutions')}}>SOLUTIONS</div>
          <div className="cursor-pointer hover:text-[#FECC0D] transition-colors" onClick={()=>{navigate('/resources')}}>RESOURCES</div>
          <div className="cursor-pointer hover:text-[#FECC0D] transition-colors" onClick={()=>{navigate('/careers')}}>CAREERS</div>
          <div className="cursor-pointer hover:text-[#FECC0D] transition-colors" onClick={()=>{navigate('/contactus')}}>CONTACT US</div>
        </div>
        <div className="md:hidden flex items-center">
          <button className="text-white text-2xl">
            ☰
          </button>
        </div>
      </div>

      <div className="text-base md:text-[2.343vw] text-white text-center mt-28 md:mt-[270px] font-medium flex-grow flex flex-col justify-center px-4 md:px-0">
        <div>{item.title}</div>
        <div className="w-full flex flex-col justify-center items-center">
          <div className="max-w-full md:max-w-[60.884vw] text-3xl md:text-[5.49vw] font-bold leading-tight">
            {item.mainTitle}
          </div>
          <div className="w-auto px-6 py-2 md:w-[17.204vw] mt-4 md:h-[3.148vw] bg-[#FECC0D] text-[#0A0A0A] text-sm md:text-[1.318vw] font-normal flex justify-center items-center cursor-pointer hover:bg-[#E4A100] transition-colors">
            {item.buttonText}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="relative w-full h-[500px] md:h-[56.149vw] overflow-hidden">
      <style jsx global>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        
        @keyframes slideOutLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        
        @keyframes slideOutRight {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }
        
        .animate-slide-in-right {
          animation: slideInRight 500ms forwards;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 500ms forwards;
        }
        
        .animate-slide-out-left {
          animation: slideOutLeft 500ms forwards;
        }
        
        .animate-slide-out-right {
          animation: slideOutRight 500ms forwards;
        }
      `}</style>

      <div
        style={{
          backgroundImage: `url(${currentCarouselItem.bgShadow}), url(${currentCarouselItem.bg})`,
          backgroundSize: "cover, cover",
          backgroundPosition: "center, center",
          backgroundRepeat: "no-repeat, no-repeat",
        }}
        className={getSlideClasses()}
      >
        {renderContent(currentCarouselItem)}
      </div>

      <div
        style={{
          backgroundImage: `url(${nextCarouselItem.bgShadow}), url(${nextCarouselItem.bg})`,
          backgroundSize: "cover, cover",
          backgroundPosition: "center, center",
          backgroundRepeat: "no-repeat, no-repeat",
        }}
        className={getNextSlideClasses()}
      >
        {renderContent(nextCarouselItem)}
      </div>

      <div className="absolute bottom-6 md:bottom-16 left-0 right-0 flex justify-center gap-2 z-20">
        {carouselData.map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 md:w-4 md:h-4 ${
              currentSlide === index ? "bg-[#FECC0D]" : "bg-[#DDDDDD]"
            } rounded-full cursor-pointer transition-colors`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;