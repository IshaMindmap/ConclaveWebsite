import InputBox from '../components/InputBox';
import {BlueButton} from '../components/Buttons';
import { useNavigate } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';

export const Otp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Focus on first input when component mounts
  useEffect(() => {
    if (inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only accept digits
    if (/^\d*$/.test(value)) {
      // Create a new OTP array with the updated value
      const newOtp = [...otp];

      // Take only the last character if more than one is pasted
      newOtp[index] = value.slice(-1);
      setOtp(newOtp);

      // If a digit was entered and there's a next input, focus it
      if (value && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    // On backspace, if input is empty and there's a previous input, focus it
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');

    // Check if pasted content contains only digits
    if (/^\d+$/.test(pastedData)) {
      // Take only the first 4 digits
      const digits = pastedData.slice(0, 4).split('');

      // Fill the OTP array
      const newOtp = [...otp];
      digits.forEach((digit, index) => {
        if (index < 4) {
          newOtp[index] = digit;
        }
      });

      setOtp(newOtp);

      // Focus on the last input or the next empty input
      const lastIndex = Math.min(digits.length, 4) - 1;
      if (lastIndex >= 0 && lastIndex < 4) {
        inputRefs[lastIndex].current.focus();
      }
    }
  };

  return (
    <div className="flex flex-col w-[100%] h-[80vh] justify-center items-center">
      <div>
        <div className="text-[#111478] font-[700] font-mulish text-[2.222vw] mb-[1.458vw]">
          Enter OTP
        </div>
        <div className="flex justify-center gap-4 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : null}
              className="w-20 h-12 text-center text-xl font-bold border-2 border-[#19213D] rounded-[8px] focus:outline-none focus:border-[#19213D] focus:ring-1 focus:ring-[#19213D]"
            />
          ))}
        </div>
        <div onClick={()=>{navigate('/features')}}>
          <BlueButton text={'CONTINUE'} />
        </div>
      </div>
    </div>
  );
};

export default Otp;
