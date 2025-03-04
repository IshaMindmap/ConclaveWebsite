import React from 'react';
import InputBox from '../components/InputBox';
import {BlueButton} from '../components/Buttons';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[100%] flex flex-col justify-center items-center h-[85vh]">
      <div className="max-w-[30.972vw]">
        <div className="text-[#111478] font-[700] font-mulish text-[2.222vw] mb-[1.458vw]">
          Welcome Back
        </div>
        <InputBox label={'MOBILE NO.'} placeholder={'Enter Mobile No.'} />
        <div className="w-[30.972vw] mt-[1.806vw]">
          <BlueButton text={'SEND OTP'} />
        </div>
        <div className="text-[#424242] font-[600] text-[0.903vw ] flex justify-center items-center mt-[1.806vw]">
          Register here, if not
          <span
            className="text-[#02A82B] cursor-pointer"
            onClick={() => {
              navigate('/signup');
            }}
          >
            &nbsp;Sign up{' '}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
