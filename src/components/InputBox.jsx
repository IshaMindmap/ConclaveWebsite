import React from 'react';

const InputBox = ({ label, type = 'text', id, placeholder }) => {
  return (
    <div className="relative w-full">
      {/* Input Field */}
      <input
        id={id}
        type={type}
        className="peer w-full px-[1.285vw] py-[1.111vw] border border-[#19213D] rounded-lg text-[#19213D] placeholder:text-[#C6C6C6]"
        placeholder={placeholder}
      />

      {/* Label */}
      <label
        htmlFor={id}
        className="absolute left-0 -top-2 text-[14px] text-[#19213D] bg-white px-1 
          peer-focus:text-[#424242]"
      >
        {label}
      </label>
    </div>
  );
};

export default InputBox;
