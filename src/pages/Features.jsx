import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { featuresbg, searchicon } from '../assets';

export const Features = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const specialties = ['Cardiology', 'Diabetology', 'Respiratory'];
  const colors = ['#BE1E23', '#233165', '#0F878C'];

  return (
    <div className="relative min-h-screen font-mulish">
      {/* Blurred background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[#00000052]"
        style={{
          backgroundImage: `url(${featuresbg})`,
          filter: 'blur(16px)',
          height: '100%',
          width: '100%',
        }}
      />

      {/* Content container */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="bg-white bg-opacity-90 font-mulish rounded-[1.667vw] p-[2vw] w-[36.25vw] h-[26.167vw]">
          <div className="flex justify-between">
            <div className="text-[#111478] font-[800] text-[1.319vw]">
              Select The Therapy
            </div>
          </div>

          <div className="pb-[1.528vw] pt-[1vw] w-full">
            <div className="gap-[1.528vw] flex flex-col mb-[1.111vw] w-full">
              <div className="italic text-[1.111vw] text-[#313131]">
                Find the perfect fit for your health goals
              </div>
              <div className="flex gap-[0.833vw] flex-col w-full">
                {specialties.map((specialty, index) => (
                  <div
                    key={index}
                    className={`p-[0.486vw] py-[1.3vw] text-center rounded-[1.111vw] font-[600] text-[1.319vw] text-white w-full cursor-pointer`}
                    style={{ backgroundColor: colors[index % colors.length] }}
                    onClick={() => setSelected(index)}
                  >
                    {specialty}
                  </div>
                ))}
              </div>
              <div className='text-white absolute bottom-4 left-[43%]'>Privacy Policy | Terms Of Use</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
