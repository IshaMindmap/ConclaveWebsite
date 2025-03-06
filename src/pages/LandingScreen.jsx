import React from 'react';
import InputBox from '../components/InputBox';
import BlueButton, { LoginButton } from '../components/Buttons';
import { useNavigate } from 'react-router-dom';
import { centrixlogo, centrixsymbol, centrixwhitelogo } from '../assets';

export const LandingScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="flex">
      <div className="h-[100vh] bg-[#111478] w-[50%] p-[2.917vw]">
        <img src={centrixwhitelogo} />
      </div>
      <div className="flex-col justify-end mb-8 w-[50%] items-center flex font-mulish font-[700] text-[2.222vw] text-[#111478]">
        <div className="mb-[14.181vw]">
          <div
            className="text-center mb-4"
          >
            Get Started
          </div>
          <div className="flex gap-4">
            <div
              onClick={() => {
                navigate('/login');
              }}
            >
              <LoginButton text={'Login'} />
            </div>
            <div
              onClick={() => {
                navigate('/signup');
              }}
            >
            <LoginButton text={'Signup'} />
            </div>
          </div>
        </div>
        <img src={centrixsymbol} />
        <div className="text-[#A1A1A1] text-[0.903vw] mt-4 font-[400]">
          Privacy Policy | Terms Of Use
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
