import React from 'react';
import { locationicon, logo, mailicon, phoneicon, socialicons } from '../assets';

export const Footer = () => {
  return (
    <div className='flex flex-col'>
      <div className='text-[#0A0A0A] flex flex-col md:flex-row bg-[#F6F6F6] px-6 md:px-12 lg:px-16 py-8 md:py-10 lg:py-14'>
        <div className='mb-10 md:mb-0 md:mr-8 lg:mr-16'>
          <img src={logo} className='w-full max-w-[280px] md:max-w-[220px] lg:max-w-[280px] h-auto mb-4' alt="Company Logo" />
          <div className='text-sm md:text-base lg:text-lg max-w-full md:max-w-[280px] lg:max-w-[320px] mb-4'>
            A Quality Market Research Solution That Provides Exclusive Insights For BusinessTransformation
          </div>
          <img src={socialicons} className='h-auto w-[180px] md:w-[160px] lg:w-[180px]' alt="Social Media Icons" />
        </div>
        
        <div className='mb-8 md:mb-0 md:mr-8 lg:mr-32'>
          <div className='mt-0 md:mt-8 text-lg md:text-xl lg:text-2xl font-medium mb-4 md:mb-6'>Solutions</div>
          <div className='text-sm md:text-base lg:text-lg mb-2'>ESOMAR</div>
          <div className='text-sm md:text-base lg:text-lg mb-2'>Panel Book</div>
          <div className='text-sm md:text-base lg:text-lg mb-2'>GDPR</div>
          <div className='text-sm md:text-base lg:text-lg mb-2'>Blogs</div>
          <div className='text-sm md:text-base lg:text-lg mb-2'>Privacy Policy</div>
          <div className='text-sm md:text-base lg:text-lg mb-2'>Terms & Conditions</div>
        </div>
        
        <div className='mb-8 md:mb-0 md:mr-8 lg:mr-32'>
          <div className='mt-0 md:mt-8 text-lg md:text-xl lg:text-2xl font-medium mb-4 md:mb-6'>Explore</div>
          <div className='text-sm md:text-base lg:text-lg mb-2'>Project Management</div>
          <div className='text-sm md:text-base lg:text-lg mb-2'>Survey Programming & Hosting</div>
          <div className='text-sm md:text-base lg:text-lg mb-2'>Data Collection & Processing</div>
          <div className='text-sm md:text-base lg:text-lg mb-2'>Consulting</div>
        </div>
        <div>
          <div className='mt-0 md:mt-8 text-lg md:text-xl lg:text-2xl font-medium mb-4 md:mb-6'>Contact Us</div>
          <div className='flex gap-2 text-sm md:text-base lg:text-lg mb-2 items-center'>
            <img src={phoneicon} className='w-5 h-5 md:w-6 md:h-6' alt="Phone Icon" />
            <div>882-625-4440</div>
          </div>
          <div className='flex gap-2 text-sm md:text-base lg:text-lg mb-2 items-center'>
            <img src={mailicon} className='w-5 h-4 md:w-6 md:h-4' alt="Mail Icon" />
            <div>sales@conclaveresearch.com</div>
          </div>
          <div className='flex gap-2 text-sm md:text-base lg:text-lg mb-2'>
            <img src={locationicon} className='w-5 h-5 md:w-6 md:h-6 mt-1' alt="Location Icon" />
            <div>
              US Office <br/> 
              1007 North Orange Street, 4th FL <br/>
              3600 Wilmington, DE - 19801, <br/> 
              USA
            </div>
          </div>
        </div>
      </div>
      <div className='bg-black text-white flex justify-center items-center py-4 text-sm md:text-base'>
        Copyright © 2024 Conclave Research. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;