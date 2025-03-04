import React,{useState} from 'react';
import InputBox from '../components/InputBox';
import BlueButton from '../components/Buttons';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const navigate=useNavigate();
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
          Sign Up
        </div>
        <div className="rounded-[1.111vw] bg-[#FFFFFF] p-[1.528vw]">
          <div className="gap-[0.694vw] flex flex-col mb-[1.111vw]">
            <InputBox label={'Name'} id={'Name'} placeholder={'Enter name'} />
            <InputBox
              label={'Mobile No.'}
              id={'Name'}
              placeholder={'Enter Mobile No.'}
            />
            <InputBox label={'Email'} id={'Name'} placeholder={'Enter Email'} />
            <InputBox
              label={'Qualification'}
              id={'Name'}
              placeholder={'Enter Qualification'}
            />
          </div>
          <div className="mb-[1.111vw]">
            <BlueButton text={'SEND OTP'} />
          </div>
          <div className="text-[#424242] font-[600] text-[0.903vw ] flex justify-center items-center">
            Register here, if not
            <span
              className="text-[#02A82B] cursor-pointer"
              onClick={() => {
                navigate('/login');
              }}
            >
              &nbsp;Sign in{' '}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
