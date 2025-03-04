import React from 'react';

const BlueButton = ({ text }) => {
  return (
    <div className="bg-[#19213D] flex justify-center items-center rounded-[8px] text-[#FFFFFF] font-mulish font-[700] text-[0.903vw] p-[1.146vw] cursor-pointer">
      {text}
    </div>
  );
};

export default BlueButton;
