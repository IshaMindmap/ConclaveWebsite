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
        const cardGap = 16; 
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
      const cardGap = 16; 
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
    <div className='flex flex-col bg-[#F6F6F6] relative'>
      <div className='flex w-full'>
        <div className='w-1/2'>
          <img src={offeringimage} alt="Market research" />
        </div>
        <div className='w-1/2 pt-[6.955vw]'>
          <div className='text-[#FF7A01] text-[1.318vw] mb-2'>WE OFFERED</div>
          <div className='text-[#0A0A0A] text-[3.66vw] mb-2'>Platform Offering</div>
          <div className='text-[#8A8A8A] text-[1.464vw]'>
            At Conclave Research, we provide a suite of innovative platforms designed to streamline your market research process and enhance your insights. Explore our products and transform the way you conduct market research!
          </div>
          <div className="mt-8 flex p-2">
            <div 
              onClick={() => handleTabChange('diy')}
              className={`cursor-pointer text-center px-4 py-2 text-sm font-medium max-w-[15vw] transition-colors ${
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
              className={`cursor-pointer flex justify-center items-center relative px-16 py-2 text-sm font-medium transition-colors ${
                activeTab === 'api' 
                  ? 'bg-black text-white' 
                  : 'bg-white text-gray-700 border-t border-r border-b border-gray-300'
              }`}
            >
              API Integration
            </div>
          </div>
        </div>
      </div>
      
      <div 
        ref={cardsContainerRef}
        className='absolute bottom-[20vh] flex fill-available overflow-x-auto gap-4 px-4 ml-[2vw]'
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {activeCardData.map((card, index) => (
          <div 
            key={index}
            className="w-[calc(20%-16px)] flex-shrink-0 py-8 px-4 transform transition-transform duration-300 flex flex-col rounded-md shadow-md"
            style={{ 
              background: currentSlide === index ? "linear-gradient(151deg, rgba(254, 204, 13, 0.7) 0%, rgba(228, 159, 0, 0.7) 100%)" : "white",
            }}
          >
            <div className="flex justify-left items-center mb-4">
              <div className={`p-4 ${currentSlide === index ? 'bg-white' : 'bg-gray-100'} rounded-full `}>
                <img src={offeringcard1} alt={`${card.title} icon`} className="w-8 h-8 self-left"/>
              </div>
            </div>
            
            <h3 className="font-[600] text-[1.364vw] mb-2 text-[#0A0A0A]">{card.title}</h3>
            
            <p className={`text-[1.118vw] font-normal ${currentSlide === index ? 'text-[#0A0A0A]' : 'text-[#8A8A8A]'}`}>
              {card.description}
            </p>
          </div>
        ))}
      </div>
      
      <div className="flex absolute bottom-[0] right-[40vw] justify-center gap-2 z-20 my-4 pb-4">
        {[...Array(totalSlides)].map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full w-3 h-3 cursor-pointer ${
              currentSlide === index ? 'bg-[#FF7A01]' : 'bg-[#E0E0E0]'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Offerings;