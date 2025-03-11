import React, { useState } from 'react';
import axios from 'axios';
import InputBox from '../components/InputBox';
import { BlueButton } from '../components/Buttons';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_number: '',
    qualification: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (
      !formData.name ||
      !formData.email ||
      !formData.mobile_number ||
      !formData.qualification
    ) {
      setError('All fields are required!');
      return;
    }

    try {
      const backendUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(
        `${backendUrl}api/v1/auth/register/`,
        formData
      );

      if (response.status === 200) {
        setSuccess('Signup successful! Redirecting...');
        setTimeout(() => {
          sessionStorage.setItem('mobile_number', formData.mobile_number);
          navigate('/otp', {
            state: { mobile_number: formData.mobile_number },
          });
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      if (err.response?.data?.errors?.errors?.mobile_number) {
        setError(err.response?.data?.errors?.errors?.mobile_number);
      } else if (err.response?.data?.errors?.errors?.email) {
        setError(err.response?.data?.errors?.errors?.email);
      } else {
        setError(err.response?.data?.message || 'Signup failed. Try again.');
      }
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center h-screen px-4">
      {/* Desktop View */}
      <div className="hidden sm:flex flex-col items-center max-w-[30.972vw]">
        <h1 className="text-[#111478] font-bold text-[2.222vw] mb-[1.458vw]">
          Create an account
        </h1>
        <div className="flex flex-col gap-4">
          <InputBox
            label={'Name'}
            id={'name'}
            name="name"
            placeholder={'Enter name'}
            value={formData.name}
            onChange={handleChange}
          />
          <InputBox
            label={'Mobile No.'}
            id={'mobile_number'}
            name="mobile_number"
            placeholder={'Enter Mobile No.'}
            value={formData.mobile_number}
            onChange={handleChange}
          />
          <InputBox
            label={'Email'}
            id={'email'}
            name="email"
            placeholder={'Enter Email'}
            value={formData.email}
            onChange={handleChange}
          />
          <InputBox
            label={'Qualification'}
            id={'qualification'}
            name="qualification"
            placeholder={'Enter Qualification'}
            value={formData.qualification}
            onChange={handleChange}
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {success && <p className="text-green text-sm mb-2">{success}</p>}
        </div>
        <div className="w-full mt-[1.806vw]">
          <BlueButton text="SEND OTP" onClick={handleSubmit} />
        </div>
        <p className="text-[#424242] font-semibold text-[0.903vw] mt-[1.806vw]">
          Already have an account?
          <span
            className="text-[#02A82B] cursor-pointer"
            onClick={() => navigate('/login')}
          >
            {' '}
            Login
          </span>
        </p>
      </div>

      {/* Mobile View */}
      <div className="flex sm:hidden flex-col items-center w-full max-w-md">
        <h1 className="text-[#111478] font-bold text-2xl mb-6">
          Create an account
        </h1>
        <div className="flex flex-col gap-3 w-full">
          <InputBox
            label="Name"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputBox
            label="Mobile No."
            name="mobile_number"
            placeholder="Enter Mobile No."
            value={formData.mobile_number}
            onChange={handleChange}
          />
          <InputBox
            label="Email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputBox
            label="Qualification"
            name="qualification"
            placeholder="Enter Qualification"
            value={formData.qualification}
            onChange={handleChange}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}
        </div>
        <div className="w-full mt-4">
          <BlueButton text="SEND OTP" onClick={handleSubmit} />
        </div>
        <p className="text-[#424242] font-semibold text-sm mt-4">
          Already have an account?
          <span
            className="text-[#02A82B] cursor-pointer"
            onClick={() => navigate('/login')}
          >
            {' '}
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
