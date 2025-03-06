import React from "react";
import { calandercard, dropdown } from "../assets";

const Cards = ({ label, type = "text", id, name, value, placeholder, onChange }) => {
  return (
    <div className="p-4 bg-white rounded-[1.667vw] max-w-[16.528vw]">
      <div className="flex justify-left items-center font-[700] gap-2 text-[1.25vw] mb-[3.264vw]">
        <img src={calandercard} />
        Total Users
      </div>
      <div className="text-[2.5vw] font-[700] text-[#313131] flex justify-between">
        <div>150</div>
        <div className="flex w-[4.333vw] p-1 justify-between text-[#2CB85D] self-center h-[1.528vw] text-center bg-[#DBEFE9] rounded-[0.486vw] text-[0.833vw]">
          +200 <img src={dropdown} className="w-3 self-center" />
        </div>
      </div>
      <div className="text-[#A1A1A1] font-[600] mt-4">Recent Activities</div>
    </div>
  );
};

export default Cards;
