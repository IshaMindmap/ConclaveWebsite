import React from "react";

export const BlueButton = ({ text, onClick }) => {
    return (
      <div 
        className="bg-[#19213D] flex justify-center items-center rounded-[8px] text-[#FFFFFF] font-mulish font-[700] text-[0.903vw] p-[1.146vw] cursor-pointer"
        onClick={onClick} 
      >
        {text}
      </div>
    );
};

export const LoginButton = ({ text }) => {
    return (
      <div className="w-[15.972vw] bg-[#111478] flex justify-center items-center rounded-[8px] text-[#FFFFFF] font-mulish font-[700] text-[0.903vw] p-[1.146vw] cursor-pointer">
        {text}
      </div>
    );
};

export default { BlueButton, LoginButton };
