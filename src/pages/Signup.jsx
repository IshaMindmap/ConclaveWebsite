import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputBox from '../components/InputBox';
import { BlueButton } from '../components/Buttons';
import { useNavigate } from 'react-router-dom';
import { centrixwhitelogo, robotbg } from '../assets';

export const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [profession, setProfession] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Form validation
    if (!firstname || !email || !mobile || !country || !profession) {
      setError('Required fields must be filled!');
      return;
    }

    if (!acceptedTerms && !isMobile) {
      setError('Please accept the terms and conditions');
      return;
    }

    try {
      const backendUrl = import.meta.env.VITE_API_URL;

      const apiFormData = {
        first_name: firstname,
        last_name: lastname,
        profession: profession,
        country: country,
        city: city,
        email: email,
        mobile_number: mobile,
        tc: acceptedTerms ? 1 : 0,
      };

      const response = await axios.post(
        `${backendUrl}/api/v1/auth/register/`,
        apiFormData
      );

      if (response.status === 200) {
        setSuccess('Signup successful! Redirecting...');
        setTimeout(() => {
          sessionStorage.setItem('mobile_number', mobile);
          navigate('/otp', {
            state: { mobile_number: mobile },
          });
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      if (err.response?.data?.errors?.errors) {
        const errors = err.response.data.errors.errors;
        const firstError = Object.values(errors)[0];
        setError(firstError || 'Validation error occurred');
      } else {
        setError(err.response?.data?.message || 'Signup failed. Try again.');
      }
    }
  };

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

  return (
    <>
      {isMobile ? (
        // Mobile Design
        <div className="flex flex-col min-h-screen">
          {/* Header with logo */}
          <div
            className="h-32 p-4 flex justify-start items-start relative"
            style={{
              backgroundImage: `url(${robotbg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                backdropFilter: 'blur(8px)',
                backgroundColor: 'rgba(0,0,0,0.3)',
              }}
            ></div>
            <img
              src={centrixwhitelogo}
              alt="Centrix Logo"
              className="w-24 relative z-10"
            />
          </div>

          {/* Form section */}
          <div className="flex flex-col flex-grow p-4 sm:p-6">
            <div className="w-full max-w-md mx-auto">
              <h1 className="text-[#111478] font-bold text-2xl mb-4 text-center">
                Create an account
              </h1>

              <form onSubmit={handleSubmit}>
                {/* Mobile Form Fields */}
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex flex-col gap-3">
                    <InputBox
                      label="First Name"
                      name="firstName"
                      placeholder="Enter first name"
                      value={firstname}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <InputBox
                      label="Last Name"
                      name="lastName"
                      placeholder="Enter last name"
                      value={lastname}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <InputBox
                    label="Email"
                    name="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputBox
                    label="Mobile No."
                    name="mobile_number"
                    placeholder="Enter Mobile No."
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                  <div className="flex flex-col gap-3">
                    <InputBox
                      label="Country"
                      name="country"
                      placeholder="Select Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                    <InputBox
                      label="City"
                      name="city"
                      placeholder="Select City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <InputBox
                    label="Profession"
                    name="profession"
                    placeholder="Enter profession"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                  />
                </div>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                {success && (
                  <p className="text-green-600 text-sm mt-2">{success}</p>
                )}

                <div className="w-full mt-4">
                  <BlueButton type="submit" text="SEND OTP" />
                </div>
              </form>

              <p className="text-[#424242] font-semibold text-sm mt-4 text-center">
                Already have an account?{' '}
                <span
                  className="text-[#02A82B] cursor-pointer ml-1"
                  onClick={() => navigate('/login')}
                >
                  Login
                </span>
              </p>
            </div>

            {/* Footer */}
            <div className="mt-auto mb-4 text-center">
              <div className="text-[#A1A1A1] text-xs sm:text-sm font-normal text-center">
                Disclaimer | Privacy Policy | Terms Of Use
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Desktop Design
        <div className="flex min-h-screen">
          {/* Left side - Background image and logo */}
          <div
            className="w-1/2 p-8 md:p-12 flex justify-start items-start"
            style={{
              backgroundImage: `url(${robotbg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <img
              src={centrixwhitelogo}
              alt="Centrix Logo"
              className="w-32 md:w-40 lg:w-48"
            />
          </div>

          {/* Right side - Form */}
          <div className="w-1/2 flex flex-col justify-center items-center p-6 relative">
            <div className="w-full max-w-lg">
              <h1 className="text-[#111478] font-bold text-2xl md:text-3xl mb-6">
                Create an account
              </h1>

              <form onSubmit={handleSubmit}>
                {/* Desktop Form Fields */}
                <div className="flex flex-col gap-4 w-full max-w-lg">
                  <div className="flex gap-4">
                    <InputBox
                      label="First Name"
                      name="firstName"
                      placeholder="Enter first name"
                      value={firstname}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <InputBox
                      label="Last Name"
                      name="lastName"
                      placeholder="Enter last name"
                      value={lastname}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <InputBox
                    label="Email"
                    name="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputBox
                    label="Mobile No."
                    name="mobile_number"
                    placeholder="Enter Mobile No."
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                  <div className="flex gap-4">
                    <InputBox
                      label="Country"
                      name="country"
                      placeholder="Select Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                    <InputBox
                      label="City"
                      name="city"
                      placeholder="Select City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <InputBox
                    label="Profession"
                    name="profession"
                    placeholder="Enter Profession"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                  />
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={() => setAcceptedTerms(!acceptedTerms)}
                      className="w-4 h-4 border-2 border-[#19213D] rounded-lg cursor-pointer"
                    />
                    <span className="text-[#19213D] text-sm">
                      Accept Terms & Conditions
                    </span>
                  </label>
                </div>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                {success && (
                  <p className="text-green-600 text-sm mt-2">{success}</p>
                )}

                <div className="w-full mt-6">
                  <BlueButton type="submit" text="SEND OTP" />
                </div>
              </form>

              <p className="text-[#424242] text-center font-semibold text-sm mt-4">
                Already have an account?{' '}
                <span
                  className="text-[#02A82B] cursor-pointer ml-1"
                  onClick={() => navigate('/login')}
                >
                  Login
                </span>
              </p>
            </div>

            {/* Footer */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <div className="text-[#A1A1A1] text-xs sm:text-sm font-normal text-center">
                Disclaimer | Privacy Policy | Terms Of Use
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
