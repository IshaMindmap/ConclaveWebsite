import React from "react";
import { calandercard, dropdown } from "../assets";

const Cards = ({ head, users, increase, main }) => {
  return (
    <div className="p-4 bg-white rounded-[1.667vw] max-w-[16.528vw]">
      <div className="flex justify-left items-center font-[700] gap-2 text-[1.25vw] mb-[0.8vw]">
        <img src={calandercard} />
        {head}
      </div>
      <div className="text-[2.5vw] font-[700] text-[#313131] flex justify-between">
        <div>{users}</div>
        <div className="flex w-[4.333vw] p-1 justify-between text-[#2CB85D] self-center h-[1.528vw] text-center bg-[#DBEFE9] rounded-[0.486vw] text-[0.833vw]">
          {increase} <img src={dropdown} className="w-3 self-center" />
        </div>
      </div>
      <div className="text-[#A1A1A1] font-[600] mt-4">{main}</div>
    </div>
  );
};

export default Cards;
