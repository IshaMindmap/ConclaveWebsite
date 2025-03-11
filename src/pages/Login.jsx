import React, { useState } from 'react';
import axios from 'axios';
import InputBox from '../components/InputBox';
import { BlueButton } from '../components/Buttons';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setMobileNumber(e.target.value);
    if (error) setError('');
  };

  const handleSendOTP = async () => {
    setError('');
    setSuccess('');

    if (!mobileNumber) {
      setError('Mobile number is required!');
      return;
    }
    try {
      const backendUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${backendUrl}api/v1/auth/login/`, {
        mobile_number: mobileNumber,
      });

      if (response.status === 200) {
        setSuccess('OTP sent successfully!');
        setTimeout(() => {
          sessionStorage.setItem('mobile_number', mobileNumber);
          navigate('/otp', { state: { mobile_number: mobileNumber } });
        }, 2000);
      }
    } catch (err) {
      console.log('Error Response:', err.response?.data);
      setError(err.response?.data?.message || 'Failed to send OTP. Try again.');
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center h-screen px-4 md:px-0">
      <div className="w-full max-w-md md:max-w-[30.972vw]">
        <div className="text-[#111478] font-bold font-mulish text-2xl md:text-[2.222vw] mb-6 md:mb-[1.458vw] text-center md:text-left">
          Welcome Back
        </div>
        <InputBox
          label="MOBILE NO."
          id="mobile_number"
          name="mobile_number"
          placeholder="Enter Mobile No."
          value={mobileNumber}
          onChange={handleChange}
        />
        <div className="w-full mt-4 md:mt-[1.806vw]">
          {/* Show errors or success messages */}
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-2">{success}</p>}
          <div>
            <BlueButton text={'SEND OTP'} onClick={handleSendOTP} />
          </div>
        </div>
        <div className="text-gray-700 font-semibold text-sm md:text-[0.903vw] flex justify-center items-center mt-4 md:mt-[1.806vw]">
          Register here, if not
          <span
            className="text-[#02A82B] cursor-pointer ml-1"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
