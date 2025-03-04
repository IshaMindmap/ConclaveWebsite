import React from 'react';
import InputBox from '../components/InputBox';
import { BlueButton } from '../components/Buttons';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[100%] flex flex-col justify-center items-center h-[85vh]">
      <div className="max-w-[30.972vw]">
        <div className="text-[#111478] font-[700] font-mulish text-[2.222vw] mb-[1.458vw]">
          Create an account
        </div>
        <div className='flex flex-col gap-4'>
          <InputBox label={'NAME'} placeholder={'Enter name'} />
          <InputBox label={'MOBILE NO.'} placeholder={'Enter Mobile No.'} />
          <InputBox label={'EMAIL'} placeholder={'Enter Email'} />
          <InputBox
            label={'QUALIFICATION'}
            placeholder={'Enter Qualification'}
          />
        </div>
        <div className="w-[30.972vw] mt-[1.806vw]">
          <BlueButton text={'SEND OTP'} />
        </div>
        <div className="text-[#424242] font-[600] text-[0.903vw ] flex justify-center items-center mt-[1.806vw]">
          Already have an account?
          <span
            className="text-[#02A82B] cursor-pointer"
            onClick={() => {
              navigate('/signup');
            }}
          >
            &nbsp;Login{' '}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
