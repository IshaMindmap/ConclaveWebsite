import InputBox from '../components/InputBox';
import BlueButton from '../components/Buttons';
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
    <div className="flex gap-[0.833vw]">
      <div className=" w-[59.722vw] border-[0.3px] border-[#C6C6C6] bg-[#FFFFFF] pt-[2.222vw] p-[1.528vw] font-mulish rounded-[24px]">
        <div className="text-[#015CD3] text-[1.458vw] font-[700] mb-[1.111vw]">
          Medask Features
        </div>
        <div className="mb-[1.111vw]">
          <div className="font-[700] text-[1.25vw] text-[#313131] mb-[1.111vw]">
            For Doctors
          </div>
          <div className="flex gap-2 items-center mb-[0.833vw]">
            <div className="rounded-full w-[0.833vw] h-[0.833vw] bg-[#015CD3]"></div>
            <div className="text-[1.111vw] text-[#313131]">
              Effortless Data Management:
              <span className="text-[#A1A1A1]">
                Digitize and organize medical records with ease.
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center mb-[0.833vw]">
            <div className="rounded-full w-[0.833vw] h-[0.833vw] bg-[#015CD3]"></div>
            <div className="text-[1.111vw] text-[#313131]">
              Smart Insights:
              <span className="text-[#A1A1A1]">
                Receive actionable suggestions to enhance patient care.
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center mb-[0.833vw]">
            <div className="rounded-full w-[0.833vw] h-[0.833vw] bg-[#015CD3]"></div>
            <div className="text-[1.111vw] text-[#313131]">
              Time-Saving Tools:
              <span className="text-[#A1A1A1]">
                Automate repetitive tasks and focus on what matters most.
              </span>
            </div>
          </div>
        </div>
        <div className="mb-[1.111vw]">
          <div className="font-[700] text-[1.25vw] text-[#313131] mb-[1.111vw]">
            For Patients
          </div>
          <div className="flex gap-2 items-center mb-[0.833vw]">
            <div className="rounded-full w-[0.833vw] h-[0.833vw] bg-[#015CD3]"></div>
            <div className="text-[1.111vw] text-[#313131]">
              Simplified Records:
              <span className="text-[#A1A1A1]">
                Access your medical history in clear, easy-to-understand
                formats.
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center mb-[0.833vw]">
            <div className="rounded-full w-[0.833vw] h-[0.833vw] bg-[#015CD3]"></div>
            <div className="text-[1.111vw] text-[#313131]">
              Personalized Guidance:
              <span className="text-[#A1A1A1]">
                Get tailored recommendations for treatments and follow-ups.
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center mb-[0.833vw]">
            <div className="rounded-full w-[0.833vw] h-[0.833vw] bg-[#015CD3]"></div>
            <div className="text-[1.111vw] text-[#313131]">
              Seamless Communication:
              <span className="text-[#A1A1A1]">
                Stay connected with your healthcare provider effortlessly.
              </span>
            </div>
          </div>
        </div>
        <div className="mb-[1.111vw]">
          <div className="font-[700] text-[1.25vw] text-[#313131] mb-[1.111vw]">
            For Everyone
          </div>
          <div className="flex gap-2 items-center mb-[0.833vw]">
            <div className="rounded-full w-[0.833vw] h-[0.833vw] bg-[#015CD3]"></div>
            <div className="text-[1.111vw] text-[#313131]">
              Secure & Private:
              <span className="text-[#A1A1A1]">
                Industry-leading encryption ensures your data is always
                protected.
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center mb-[0.833vw]">
            <div className="rounded-full w-[0.833vw] h-[0.833vw] bg-[#015CD3]"></div>
            <div className="text-[1.111vw] text-[#313131]">
              User-Friendly Design:
              <span className="text-[#A1A1A1]">
                Intuitive interface for a smooth experience.
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center mb-[0.833vw]">
            <div className="rounded-full w-[0.833vw] h-[0.833vw] bg-[#015CD3]"></div>
            <div className="text-[1.111vw] text-[#313131]">
              24/7 Accessibility:
              <span className="text-[#A1A1A1]">
                Access your information anytime, anywhere.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#19213D] rounded-[1.667vw] p-[0.833vw] w-[34.972vw]">
        <div className="text-[#FFFFFF] font-[800] text-[1.319vw] mb-[1.389vw]">
          Enter OTP
        </div>
        <div className="rounded-[1.111vw] bg-[#FFFFFF] p-[1.528vw]">
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
          <div className="mb-[1.111vw]">
            <BlueButton text={'SIGN IN'} />
          </div>
          <div className="text-[#424242] font-[600] text-[0.903vw ] flex justify-center items-center">
            Register here, if not
            <span
              className="text-[#02A82B] cursor-pointer"
              onClick={() => {
                navigate('/');
              }}
            >
              &nbsp;Sign up{' '}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
