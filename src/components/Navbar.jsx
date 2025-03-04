import React from 'react';
import { centrixlogo } from '../assets';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center fill-available  px-[21px] py-[12px] font-segoe">
      <div className="flex gap-[0.313vw] cursor-pointer">
        <img src={centrixlogo} />
        <div className="text-[#2B2B2B] text-[2.296vw]">centrix</div>
      </div>
      <div className="font-mulish text-[1.319vw]">
        Hi <b>Rahul</b> welcome to medask
      </div>
    </nav>
  );
};

export default Navbar;
