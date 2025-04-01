import React, { useState, useEffect, useRef } from 'react';
import { offeringcard1, offeringimage } from '../assets';

const Offerings = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('diy');
  const cardsContainerRef = useRef(null);
  const totalDiySlides = 8;
  const totalApiSlides = 6;
  
  const totalSlides = activeTab === 'diy' ? totalDiySlides : totalApiSlides;
  
  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % totalSlides;
      setCurrentSlide(nextSlide);
      
      if (cardsContainerRef.current) {
        const cardWidth = cardsContainerRef.current.children[0].offsetWidth;
        const cardGap = window.innerWidth < 640 ? 16 : 24; // Gap in pixels
        const newScrollPosition = Math.max(0, (cardWidth + cardGap) * nextSlide - cardWidth);
        
        cardsContainerRef.current.scrollTo({
          left: newScrollPosition,
          behavior: 'smooth'
        });
      }
    }, 3000);
    
    return () => clearInterval(interval); 
  }, [currentSlide, totalSlides, activeTab]);
  
  const goToSlide = (index) => {
    setCurrentSlide(index);
    
    if (cardsContainerRef.current) {
      const cardWidth = cardsContainerRef.current.children[0].offsetWidth;
      const cardGap = window.innerWidth < 640 ? 16 : 24; // Gap in pixels
      const newScrollPosition = Math.max(0, (cardWidth + cardGap) * index - cardWidth);
      
      cardsContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentSlide(0);
    
    if (cardsContainerRef.current) {
      cardsContainerRef.current.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    }
  };

  const diyCardData = [
    {
      title: "Effortless Dashboard Navigation",
      description: "User-Friendly Interface & Intuitive dashboard for easy navigation."
    },
    {
      title: "Streamlined Project Setup",
      description: "Interactive UI for quick project setup and quota management."
    },
    {
      title: "Tailored Question Library",
      description: "Customizable Question Library to suit your specific targeting and research needs."
    },
    {
      title: "Instant Response Tracking",
      description: "Real-time data collection to monitor responses as they come in."
    },
    {
      title: "Flexible Data Export",
      description: "Export data to various formats like CSV, Excel, and SPSS for easy analysis."
    },
    {
      title: "Advanced Analytics",
      description: "Powerful data visualization and insights generation tools."
    },
    {
      title: "Multi-Device Compatibility",
      description: "Access your research data on desktop, tablet, or mobile devices."
    },
    {
      title: "Automated Reporting",
      description: "Generate comprehensive reports with just a few clicks."
    }
  ];
  
  const apiCardData = [
    {
      title: "Seamless API Integration",
      description: "Connect your existing systems with our platform using RESTful APIs."
    },
    {
      title: "Custom Webhooks",
      description: "Set up event-triggered notifications to automate your workflow."
    },
    {
      title: "Secure Authentication",
      description: "OAuth 2.0 and API key authentication for secure access control."
    },
    {
      title: "Comprehensive Documentation",
      description: "Detailed API documentation with examples and SDKs for major languages."
    },
    {
      title: "Rate Limiting Controls",
      description: "Flexible rate limiting to manage API usage and prevent overload."
    },
    {
      title: "Data Transformation",
      description: "Convert data formats seamlessly between your systems and our platform."
    }
  ];
  
  const activeCardData = activeTab === 'diy' ? diyCardData : apiCardData;

  return (
    <div className='flex flex-col bg-[#F6F6F6] relative md:min-h-0'>
      {/* Main content section */}
      <div className='flex flex-col md:flex-row w-full'>
        {/* Image container - full width on mobile, half on larger screens */}
        <div className='w-full hidden md:flex md:w-1/2 h-fit'>
          <img src={offeringimage} alt="Market research" className=" h-[85%] min-h-[928px]" />
        </div>
        
        {/* Text content - full width on mobile, half on larger screens */}
        <div className='w-full md:w-1/2 p-4 sm:p-6 md:pt-12 lg:pt-20'>
          <div className='text-[#FF7A01] text-sm sm:text-base md:text-lg lg:text-xl mb-1 sm:mb-2'>WE OFFERED</div>
          <div className='text-[#0A0A0A] text-xl sm:text-2xl md:text-3xl lg:text-5xl mb-2'>Platform Offerings</div>
          <div className='text-[#8A8A8A] text-xs sm:text-sm md:text-base lg:text-xl'>
            At Conclave Research, we provide a suite of innovative platforms designed to streamline your market research process and enhance your insights. Explore our products and transform the way you conduct market research!
          </div>
          
          {/* Tab controls */}
          <div className="mt-3 sm:mt-4 md:mt-8 flex flex-col sm:flex-row p-2">
            <div 
              onClick={() => handleTabChange('diy')}
              className={`cursor-pointer min-w-[160px] text-center px-2 md:px-4 py-2 text-xs md:text-sm font-medium mb-2 sm:mb-0 max-w-full sm:max-w-[200px] md:max-w-[250px] transition-colors ${
                activeTab === 'diy' 
                  ? 'bg-black text-white' 
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              DIY Data Collection and 
              Project Management Platform
            </div>
            <div 
              onClick={() => handleTabChange('api')}
              className={`cursor-pointer flex justify-center items-center relative sm:px-12 md:px-12 py-2 text-xs md:text-sm font-medium transition-colors ${
                activeTab === 'api' 
                  ? 'bg-black text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 sm:border-t sm:border-r sm:border-b sm:border-l-0'
              }`}
            >
              API Integration
            </div>
          </div>
        </div>
      </div>
      
      {/* Cards section with positioning and container */}
      <div className="relative w-full mt-6 md:mt-0">
        {/* Cards container - scrollable horizontally */}
        <div 
          ref={cardsContainerRef}
          className='relative md:absolute md:bottom-[12rem] left-0 right-0 flex overflow-x-auto gap-4 md:gap-6 px-4 md:px-6 mx-auto'
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {activeCardData.map((card, index) => (
            <div 
              key={index}
              className="max-w-[12rem] sm:max-w-[14rem] md:max-w-[14rem] lg:max-w-[14rem] xl:max-w-[16rem] flex-shrink-0 py-6 sm:py-7 md:py-8 px-5 md:px-6 transform transition-transform duration-300 flex flex-col rounded-md shadow-md"
              style={{ 
                background: currentSlide === index ? "linear-gradient(151deg, rgba(254, 204, 13, 0.7) 0%, rgba(228, 159, 0, 0.7) 100%)" : "white",

              }}
            >
              <div className="flex justify-left items-center mb-3 sm:mb-4">
                <div className={`p-2 sm:p-3 md:p-4 ${currentSlide === index ? 'bg-white' : 'bg-gray-100'} rounded-full `}>
                  <img src={offeringcard1} alt={`${card.title} icon`} className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 self-left"/>
                </div>
              </div>
              
              <h3 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl mb-1 sm:mb-2 text-[#0A0A0A]">{card.title}</h3>
              
              <p className={`text-xs sm:text-sm md:text-base font-normal ${currentSlide === index ? 'text-[#0A0A0A]' : 'text-[#8A8A8A]'}`}>
                {card.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Pagination dots */}
        <div className="flex bottom-[-2.5rem] left-[40%] absolute md:bottom-[4rem] md:left-[51%] right-0 gap-1.5 sm:gap-2 z-20 my-4">
          {[...Array(totalSlides)].map((_, index) => (
            <div
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 cursor-pointer ${
                currentSlide === index ? 'bg-[#FF7A01]' : 'bg-[#E0E0E0]'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offerings;