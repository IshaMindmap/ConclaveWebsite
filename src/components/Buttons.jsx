import React from "react";

export const BlueButton = ({ text, onClick }) => {
  return (
    <div
      className="bg-[#19213D] w-full flex justify-center items-center rounded-lg text-white font-mulish font-bold text-sm md:text-[0.903vw] p-3 md:p-[1.146vw] cursor-pointer"
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export const LoginButton = ({ text }) => {
  return (
    <div className="w-full  w-56 bg-[#111478] flex justify-center items-center rounded-[8px] text-white font-mulish font-bold text-sm md:text-base py-3 px-4 md:px-6 cursor-pointer hover:bg-[#1a1e9a] transition-colors">
      {text}
    </div>
  );
};

export const DashboardButton = ({ text }) => {
  return (
    <div className="w-[8rem] bg-[#6868684D] flex justify-center items-center rounded-[8px] text-[#FFFFFF] font-mulish font-[700] text-[0.903vw] py-[0.625vw] cursor-pointer">
      {text}
    </div>
  );
};



export default { DashboardButton,BlueButton, LoginButton };
