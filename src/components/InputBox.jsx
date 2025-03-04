import React from "react";

const InputBox = ({ label, type = "text", id, name, value, placeholder, onChange }) => {
  return (
    <div className="relative w-full">
      {/* Input Field */}
      <input
        id={id}
        name={name} 
        type={type}
        value={value} 
        onChange={onChange} 
        className="peer w-full px-[1.285vw] py-[1.111vw] border border-[#C6C6C6] rounded-lg text-[#015CD3] focus:outline-none focus:border-[#015CD3] placeholder:text-[#313131]"
        placeholder={placeholder}
      />

      <label
        htmlFor={id}
        className="absolute left-0 -top-2 text-[14px] text-[#C6C6C6] bg-white px-1 
          peer-focus:text-[#424242]"
      >
        {label}
      </label>
    </div>
  );
};

export default InputBox;
