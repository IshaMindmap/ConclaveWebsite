import React from 'react';
import { centrixlogo, profilepic, settings } from '../assets';

const NavbarWithProfile = () => {
  return (
    <nav className="flex justify-between items-center fill-available  px-[21px] py-[12px] font-segoe">
      <div className="flex gap-[0.313vw] cursor-pointer">
        <img src={centrixlogo} />
      </div>
      <div className="flex justify-center items-center">
        <div className="mr-[3.333vw] font-mulish">
          Hi <b>Rahul</b> welcome to medask
        </div>
        <div className="border-[0.3px] rounded-[2.083vw] border-[#C6C6C6] bg-[#FFFFFF] p-[0.278vw] flex gap-[0.694vw] font-mulish">
          <img src={profilepic} alt="profile picture" />
          <div className="text-[1.111vw] text-center flex items-center">
            My profile
          </div>
        </div>
        <div className="ml-2 w-[2.778vw] flex justify-center items-center h-[2.778vw] border-[0.3px] rounded-full border-[#C6C6C6] bg-[#FFFFFF] p-[0.278vw] flex gap-[0.694vw] font-mulish">
          <img
            src={settings}
            alt="settings pic"
            className="w-[1.389vw] h-[1.389vw]"
          />
        </div>
      </div>
    </nav>
  );
};

export default NavbarWithProfile;
