import { calandercard, dropdown } from "../assets";
import { Calendar } from 'lucide-react';
 
export const Cards = ({ head, users, increase, main }) => {
  return (
    <main className="flex flex-col gap-[1.514rem] p-[1rem] bg-white rounded-[1.667vw] w-[14.891rem]">
      <div className="flex justify-left items-center font-[700] gap-[0.75rem] text-[1.125rem] ">
        <img src={calandercard} />
        <p>{head}</p>
      </div>
      <section className="flex flex-col gap-[0.3rem]">
        <div className=" flex justify-between">
          <div className="text-[2rem] font-[700] text-[#313131]">{users}</div>
          <div className="flex w-[3.9rem] p-[0.375rem] justify-between text-[#2CB85D] self-center  text-center bg-[#DBEFE9] rounded-[0.438rem]">
            {increase} <img src={dropdown} className="w-3 self-center" />
          </div>
        </div>
        <div className="text-[#A1A1A1] font-[600]">{main}</div>
      </section>
      
    </main>
  );
};


export const GraphCards = ({ graph, name }) => {
  return (
    <div className="font-mulish font-[600] w-[24.938rem] h-[15.313rem] bg-white rounded-[1.5rem] p-[1rem]">
      <div className="flex justify-between">
        <p>{name}</p>
      </div>
      <div>
        {graph}
      </div>
    </div>
  );
};


export const UserGrowthDashboard = () => {
  const segments = [
    { color: '#4CAF50', percentage: 20, label: 'User Growth', value: '25%' },
    { color: '#2196F3', percentage: 20, label: 'Active Users', value: '25%' },
    { color: '#FFC107', percentage: 35, label: 'Inactive Users', value: '25%' },
    { color: '#FF9800', percentage: 25, label: 'Fill', value: '256 × 19 Hug' },
  ];
 
  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl h-[15.313rem] p-4 shadow-lg">
  
        <div className="flex justify-between items-center ">
          <div className="text-[1rem] font-mulish font-bold px-2 py-1 w-full max-w-md">
            User Growth
          </div>
          <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1">
          <div className="text-blue-800 text-[0.625rem] w-[3.45rem] font-[600]">This Month</div>
          <Calendar className="h-[0.7rem] w-[0.7rem] text-blue-800" />
          </div>
        </div>
        <div className="relative flex justify-center items-center">
                {/* Donut chart */}
                  <svg width="160" height="160" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="white"
                    stroke="#e0e0e0"
                    strokeWidth="0"
                  />
                  {/* Calculate and render each segment */}
                  {segments.map((segment, index) => {
                    // Calculate start and end positions for each arc
                    let cumulativePercentage = segments
                      .slice(0, index)
                      .reduce((sum, seg) => sum + seg.percentage, 0);
                    const startAngle = (cumulativePercentage / 100) * Math.PI * 2 - Math.PI / 2;
                    const endAngle = ((cumulativePercentage + segment.percentage) / 100) * Math.PI * 2 - Math.PI / 2;
                    // Calculate the SVG arc path
                    const largeArcFlag = segment.percentage > 50 ? 1 : 0;
                    const startX = 50 + 40 * Math.cos(startAngle);
                    const startY = 50 + 40 * Math.sin(startAngle);
                    const endX = 50 + 40 * Math.cos(endAngle);
                    const endY = 50 + 40 * Math.sin(endAngle);
                    // Create the arc path
                    const pathData = [
                      `M 50 50`,
                      `L ${startX} ${startY}`,
                      `A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                      `L 50 50`
                    ].join(' ');
                    return (
                    <path
                        key={index}
                        d={pathData}
                        fill={segment.color}
                        stroke="white"
                        strokeWidth="1"
                      />
                    );
                  })}
                  {/* Inner white circle to create donut hole */}
      <circle cx="50" cy="50" r="25" fill="white" />
      </svg>
      
                {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
      <div className="text-[0.563rem] font-bold">4,596</div>
      <div className="text-gray-500 text-[0.406rem]">Visitors this month</div>
      </div>
        </div>

        <div className="flex justify-around items-center gap-[0.047rem]">
          {segments.slice(0, 3).map((segment, index) => (
            <div key={index} className="flex items-center ">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: segment.color }}></div>
              <span className="text-gray-700 text-[0.625rem] mr-1">{segment.label}</span>
              <span className="text-blue-600 text-[0.625rem] ">{segment.value}</span>
            </div>
          ))}
      </div>
      </div>

  );
};
 
export const MostSearchedDashboard = () => {
  // Document types data with percentages
  const documentTypes = [
    { type: 'Video', percentage: '25%' },
    { type: 'Textbook', percentage: '25%' },
    { type: 'PDF', percentage: '25%' },
    { type: 'Word', percentage: '25%' },
    { type: 'PPT', percentage: '25%' },
    { type: 'Weblinks', percentage: '25%' },
    { type: 'Images', percentage: '25%' },
    { type: 'Conference', percentage: '25%' },
    { type: 'Journals', percentage: '25%' },
    { type: 'Graphs', percentage: '25%' },
  ];
 
  return (
<div className="w-full max-w-4xl mx-auto bg-white rounded-3xl h-[15.313rem] p-4 shadow-lg">

<div className="flex justify-between items-center ">
          <div className="text-[1rem] font-mulish font-bold px-2 py-1 w-full max-w-md">
          Most Searched
          </div>
          <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1">
          <div className="text-blue-800 text-[0.625rem] w-[3.45rem] font-[600]">This Month</div>
          <Calendar className="h-[0.7rem] w-[0.7rem] text-blue-800" />
          </div>
        </div>
 
        <div className="flex">
          {/* Overlapping circles visualization */}
        <div className="w-[70%] relative">
                    {/* Black Circle (Respiratory) */}
        <div className="absolute  top-10 left-[4.6rem] w-[3.875rem] h-[3.875rem] rounded-full bg-black flex items-center justify-center text-white text-center z-20">
        <div className="text-[0.535rem]">
        <div className=" font-bold">105k</div>
        <div className="">Respiratory</div>
        </div>
        </div>
                    {/* Blue Circle (Cardiology) */}
        <div className="absolute top-[3.5rem] left-[0.625rem] w-[7.49rem] h-[7.49rem] rounded-full bg-blue-500 flex items-center justify-center text-white text-center z-10">
        <div className="text-[0.535rem]">
        <div className="font-bold">105k</div>
        <div className="">Cardiology</div>
        </div>
        </div>
 
            {/* Yellow Circle (Diabetology) */}
        <div className="absolute top-[2.5rem] left-[7rem] w-[7.49rem] h-[7.49rem] rounded-full bg-yellow-400 flex items-center justify-center text-black text-center z-10">
        <div className="text-[0.535rem]">
        <div className=" font-bold">35k</div>
        <div className="">Diabetology</div>
        </div>
        </div>
        </div>
        {/* Most used document types */}
        <div className="w-[30%] text-[0.625rem]">
        <div className="mb-2  font-medium">Most used doc.</div>
        <div className="bg-gray-100 p-3 rounded-md  h-[10.063rem] overflow-y-auto">
        <ul>
                {documentTypes.map((doc, index) => (
        <li key={index} className="flex justify-between items-center mb-2">
        <div className="flex items-center">
        <div className="w-[3.5px] h-[3.5px] bg-gray-500 rounded-full mr-2"></div>
        <span>{doc.type}</span>
        </div>
        <span className="text-right">{doc.percentage}</span>
        </li>
                        ))}
        </ul>
        </div>
        </div>
        </div>
        </div>

  );
};
