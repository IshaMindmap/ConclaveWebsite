import React, { useState,useEffect } from 'react';
import axios from 'axios';
import InputBox from '../components/InputBox';
import { BlueButton } from '../components/Buttons';
import { useNavigate } from 'react-router-dom';
import { centrixwhitelogo, robotbg } from '../assets';

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
  const [isMobile, setIsMobile] = useState(false);

  // Detect if screen is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Mobile design
const MobileDesign = () => (
  <div className="w-full flex flex-col h-screen">
    <div
      className="p-12 flex justify-start items-start relative"
      style={{
        backgroundImage: `url(${robotbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="absolute inset-0 backdrop-blur-lg"
        style={{ backdropFilter: 'blur(16px)' }}
      ></div>
      <img
        src={centrixwhitelogo}
        alt="Centrix Logo"
        className="max-w-full relative"
      />
    </div>
    <div className="flex p-8 sm:hidden flex-col items-center w-full max-w-md">
      <h1 className="text-[#111478] font-bold text-4xl mb-6">
        Create an account
      </h1>
      <div className="flex flex-col gap-3 w-full">
        <div className="flex gap-4">
          <InputBox
            label="First Name"
            name="name"
            placeholder="Enter first name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputBox
            label="Last Name"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <InputBox
          label="Email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputBox
          label="Mobile No."
          name="mobile_number"
          placeholder="Enter Mobile No."
          value={formData.mobile_number}
          onChange={handleChange}
        />
        <div className='flex gap-4'>
          <InputBox
            label="Country"
            name="mobile_number"
            placeholder="Select Country"
            value={formData.mobile_number}
            onChange={handleChange}
          />
          <InputBox
            label="City"
            name="mobile_number"
            placeholder="Select City"
            value={formData.mobile_number}
            onChange={handleChange}
          />
        </div>
        <InputBox
          label="Profession"
          name="qualification"
          placeholder="Enter profession"
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

  // Desktop design
 const DesktopDesign = () => (
   <div className="w-full flex h-screen">
     <div
       className=" w-1/2 p-12 flex justify-start items-start"
       style={{
         backgroundImage: `url(${robotbg})`,
         backgroundSize: 'cover',
         backgroundPosition: 'center',
       }}
     >
       <img src={centrixwhitelogo} alt="Centrix Logo" className="max-w-full" />
     </div>
     {/* Desktop View */}
     <div className="relative hidden sm:flex flex-col w-1/2 justify-center items-center">
       <h1 className="text-[#111478] font-bold text-[2.222vw] mb-[1.458vw]">
         Create an account
       </h1>
       <div className="flex flex-col gap-4">
         <div className="flex gap-4">
           <InputBox
             label={'First Name'}
             id={'name'}
             name="name"
             placeholder={'Enter first name'}
             value={formData.name}
             onChange={handleChange}
           />
           <InputBox
             label={'Last Name'}
             id={'name'}
             name="name"
             placeholder={'Enter last name'}
             value={formData.name}
             onChange={handleChange}
           />
         </div>
         <InputBox
           label={'Email'}
           id={'email'}
           name="email"
           placeholder={'Enter Email'}
           value={formData.email}
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
         <div className="flex gap-4">
           <InputBox
             label={'Country'}
             id={'name'}
             name="name"
             placeholder={'Select Country'}
             value={formData.name}
             onChange={handleChange}
           />
           <InputBox
             label={'City'}
             id={'name'}
             name="name"
             placeholder={'Select City'}
             value={formData.name}
             onChange={handleChange}
           />
         </div>
         <InputBox
           label={'Profession'}
           id={'qualification'}
           name="qualification"
           placeholder={'Enter Profession'}
           value={formData.qualification}
           onChange={handleChange}
         />
         <label className="flex items-center space-x-2">
           <input
             type="checkbox"
             className="w-4 h-4 border-2 border-[#19213D] rounded-lg cursor-pointer"
           />
           <span className="text-[#19213D] font-mulish text-[0.825vw]">
             Accepted Terms & Conditions
           </span>
         </label>

         {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
         {success && <p className="text-green text-sm mb-2">{success}</p>}
       </div>
       <div className="w-[30.229vw] mt-[1.806vw]">
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
         <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center mb-8">
           <div className="text-[#A1A1A1] text-sm mt-4 font-normal">
             Disclaimer | Privacy Policy | Terms Of Use
           </div>
         </div>
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

  // Render different layouts based on screen size
  return isMobile ? <MobileDesign /> : <DesktopDesign />;
};

export default Signup;

