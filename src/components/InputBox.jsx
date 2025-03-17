import React from 'react';

const InputBox = ({
  label,
  type = 'text',
  id,
  name,
  value,
  placeholder,
  onChange,
  required = false,
}) => {
  // Ensure id is available for label association
  const inputId = id || name;

  return (
    <div className="relative w-full">
      {/* Input Field */}
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

export default InputBox;
