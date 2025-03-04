import React, { useState } from 'react';
import InputBox from '../components/InputBox';
import BlueButton from '../components/Buttons';
import { useNavigate } from 'react-router-dom';
import { searchicon } from '../assets';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const specialties = ['Cardiology', 'Diabetology', 'Respiratory'];
  const colors = ['#BE1E23', '#233165', '#0F878C'];
  return (
    <div className="flex gap-[0.833vw] font-mulish fill-available">
      <div className="bg-[#015CD3] rounded-[1.667vw] p-[0.833vw] w-full">
        <div className="flex justify-between">
          <div className="text-[#FFFFFF] font-[800] text-[1.319vw] mb-[1.389vw]">
            Select Therapy
          </div>
          <div className="w-[17.361vw] h-[2.778vw] bg-white rounded-[2.083vw] flex items-center px-2">
            <img src={searchicon} className="ml-2" alt="Search" />
            <input
              type="text"
              placeholder="Search therapy..."
              className="w-full h-full bg-transparent outline-none px-2"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="rounded-[1.111vw] h-[65vh] bg-[#FFFFFF] p-[1.528vw] w-full">
            <div className="gap-[1.528vw] flex flex-col mb-[1.111vw] w-full">
              <div className="text-[1.111vw] text-[#313131]">
                Find the perfect fit for your health goals
              </div>
              <div className="flex gap-[0.833vw] flex-col w-full">
                {specialties.map((specialty, index) => (
                  <div
                    key={index}
                    className={`p-[0.486vw] text-center rounded-[1.111vw] font-[600] text-[1.319vw] text-white w-full`}
                    style={{ backgroundColor: colors[index % colors.length] }} // Cycle through colors
                    onClick={() => setSelected(index)}
                  >
                    {specialty}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className="text-center rounded-[1.111vw] font-[500] text-[#A1A1A1] bg-[#FFFFFF] p-4 w-full cursor-pointer "
            onClick={() => {
              navigate('/main');
            }}
          >
            Welcome To Centrix
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
