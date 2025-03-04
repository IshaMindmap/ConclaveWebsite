import React, { useState } from 'react';
import InputBox from '../components/InputBox';
import BlueButton, { DashboardButton } from '../components/Buttons';
import { useNavigate } from 'react-router-dom';
import { centrixwhitelogo, searchicon } from '../assets';

export const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#111478] p-4">
      <div className="border border-[#C6C6C6] rounded-[1.667vw] border-[0.3px] p-2 ">
        <div></div>
        <img src={centrixwhitelogo} />
      </div>
      <div>
        <DashboardButton text={"Dashboard"}/>
      </div>
    </div>
  );
};

export default Dashboard;
