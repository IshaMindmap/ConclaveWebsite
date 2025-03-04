import InputBox from '../components/InputBox';
import {BlueButton} from '../components/Buttons';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';


export const Otp = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(['', '', '', '']);
    const mobileNumber = location.state?.mobile_number || sessionStorage.getItem("mobile_number") || '';
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

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
     if (e.key === 'Backspace' && !otp[index] && index > 0) {
       inputRefs[index - 1].current.focus();
     }
   };

   const handlePaste = (e) => {
     e.preventDefault();
     const pastedData = e.clipboardData.getData('text');

     if (/^\d+$/.test(pastedData)) {
       const digits = pastedData.slice(0, 4).split('');
       const newOtp = [...otp];
       digits.forEach((digit, index) => {
         if (index < 4) {
           newOtp[index] = digit;
         }
       });

       setOtp(newOtp);
       const lastIndex = Math.min(digits.length, 4) - 1;
       if (lastIndex >= 0 && lastIndex < 4) {
         inputRefs[lastIndex].current.focus();
       }
     }
   };


  const handleVerifyOTP = async () => {
    setError('');
    setSuccess('');

    const enteredOTP = otp.join('');

    if (enteredOTP.length !== 4) {
      setError('Please enter a 4-digit OTP');
      return;
    }

    try {
      const backendUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${backendUrl}api/v1/auth/userverify/`, {
        mobile_number: mobileNumber,
        otp: enteredOTP,
      });

      if (response.status === 200) {
        setSuccess('OTP verified successfully! Redirecting...');
        const { access, refresh } = response.data.token;

        // ✅ Store tokens in local storage
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);

        setTimeout(() => navigate('/features'), 2000); // Redirect after 2 sec
      }
    } catch (err) {
      console.log("Error Response:", err.response?.data);
      setError(err.response?.data?.message || "Invalid OTP. Try again.");
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
          {/* Show error/success messages */}
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {success && <p className="text-green text-sm mb-2">{success}</p>}

        <div >
          <BlueButton text={'CONTINUE'}  onClick={handleVerifyOTP} />
        </div>
      </div>
    </div>
  );
};

export default Otp;
