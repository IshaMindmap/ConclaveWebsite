import React from 'react';
import { centrixlogo } from '../assets';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center fill-available  px-[2vw] py-[2vw] font-segoe">
        <img src={centrixlogo} className='cursor-pointer'/>
    </nav>
  );
};

export default Navbar;
