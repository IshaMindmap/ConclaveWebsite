import React, { useState } from 'react';
import InputBox from '../components/InputBox';
import BlueButton, { DashboardButton } from '../components/Buttons';
import { useNavigate } from 'react-router-dom';
import { calander, centrixwhitelogo, profile, search, searchicon, settingsicon } from '../assets';
import Cards from '../components/Cards';

export const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#111478] p-4 font-mulish">
      <div className="border border-[#C6C6C6] rounded-[1.667vw] border-[0.3px] p-4 ">
        <div className="flex justify-between mb-20">
          <img src={centrixwhitelogo} />
          <div className="flex gap-2">
            <DashboardButton text={'Dashboard'} />
            <DashboardButton text={'Documents'} />
            <DashboardButton text={'Analytics'} />
            <DashboardButton text={'Reports'} />
          </div>
          <div className="flex gap-2">
            <img src={search} />
            <img src={profile} />
            <img src={settingsicon} />
          </div>
        </div>
        <div className='flex justify-between'>
          <div className="font-[700] text-white text-[2vw]">
            Good morning, Alex!
          </div>
          <div className='text-white flex justify-center items-center gap-2'>
            <img src={calander} className='w-6' /> January 9, 2024
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <Cards />
      </div>
    </div>
  );
};

export default Dashboard;
