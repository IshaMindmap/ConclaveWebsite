import React from 'react';

export const InputBox = ({
  label,
  type = 'text',
  id,
  name,
  value,
  placeholder,
  onChange,
  required = false,
}) => {
  const inputId = id || name;

  return (
    <div className="relative w-full">
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="peer w-full px-4 py-3 md:px-[1.285vw] md:py-[1.111vw] border border-[#19213D] rounded-lg text-[#19213D] placeholder:text-[#C6C6C6]"
        placeholder={placeholder}
        required={required}
      />
      <label
        htmlFor={inputId}
        className="absolute left-2 -top-2 text-[14px] text-[#19213D] bg-white px-1 peer-focus:text-[#424242]"
      >
        {label}
      </label>
    </div>
  );
};

export const InputBox1 = ({
  type = 'text',
  id,
  name,
  value,
  placeholder,
  onChange,
  onKeyDown = () => {},
  required = false,
}) => {
  const inputId = id || name;

  return (
    <input
      id={inputId}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      onKeyDown={(e) => {
        console.log(`Key Pressed: ${e.key}`); 
        if (onKeyDown) onKeyDown(e); 
      }}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900"
      placeholder={placeholder}
      required={required}
    />
  );
};



export default {InputBox,InputBox1};