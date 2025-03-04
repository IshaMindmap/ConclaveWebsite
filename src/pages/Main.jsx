import React, { useState } from 'react';
import InputBox from '../components/InputBox';
import BlueButton from '../components/Buttons';
import { useNavigate } from 'react-router-dom';
import { copyicon, minimizeicon, sendicon } from '../assets';

const Main = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [showInputAtBottom, setShowInputAtBottom] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && userInput.trim()) {
      // Add user message to messages array
      setMessages([...messages, { text: userInput, isUser: true }]);
      // Clear input
      setUserInput('');
      // Move input to bottom
      setShowInputAtBottom(true);
    }
  };

  const handleSendClick = () => {
    if (userInput.trim()) {
      // Add user message to messages array
      setMessages([...messages, { text: userInput, isUser: true }]);
      // Clear input
      setUserInput('');
      // Move input to bottom
      setShowInputAtBottom(true);
    }
  };

  return (
    <div className="flex gap-[0.833vw]">
      <div className="h-[85vh] w-[30.722vw] border-[0.3px] border-[#C6C6C6] bg-[#FFFFFF] pt-[2.222vw] p-[1.528vw] font-mulish rounded-[24px]">
        <div className="text-[#111478] text-[1.319vw] font-[700] mb-[1.111vw] flex gap-2">
          Here is some prompts for you <img src={minimizeicon} />
        </div>
        <div className="text-[#111478] text-[1.319vw] font-[700] mb-[1.111vw] flex gap-2">
          Recent uploads and activity
        </div>
        <div className="rounded-[1.111vw] bg-[#F7F9FB] text-center p-4">
          ...
        </div>
      </div>
      <div className="bg-[#19213D] rounded-[1.667vw] p-[0.833vw] w-[66vw]">
        <div className="flex justify-between items-center">
          <div className="font-mulish flex justify-center items-center text-[#FFFFFF] font-[800] text-[1.319vw] mb-[1.389vw]">
            Welcome to the world of Cardiology,
          </div>
          <div className="flex gap-2">
            <div className="text-[#313131] bg-white px-4 py-2 w-[7.708vw] rounded-[2.083vw]">
              Clear Chat
            </div>
            <div className="text-[#313131] bg-white px-4 py-2 w-[7.708vw] rounded-[2.083vw]">
              New Chat
            </div>
          </div>
        </div>

        {/* Original input position (shows only when not at bottom) */}
        {!showInputAtBottom && (
          <div className="flex mb-2">
            <div className="relative p-2 w-[95%]">
              <input
                type="text"
                placeholder="Ask Me"
                className="w-full px-4 py-3 border border-gray-300 rounded-[1.111vw] bg-white text-gray-900"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <img
                src={sendicon}
                className="absolute right-4 bottom-3 cursor-pointer"
                onClick={handleSendClick}
              />
            </div>
            <img src={copyicon} className="self-center" />
          </div>
        )}

        <div className="rounded-[1.111vw] font-mulish text-[1.111vw] text-[#313131] capitalize bg-[#FFFFFF] p-[1.528vw] relative">
          {/* Main content */}
          <div>1. Acceptance of Terms:</div>
          <div>
            Your access to and use of centrix is subject to these Terms &
            Conditions.{' '}
          </div>
          <div>
            2. By using the platform, you agree to comply with all applicable
            laws and regulations.
          </div>{' '}
          <div>3. Eligibility:</div>
          <div>
            You must be at least 18 years old or have legal guardian consent to
            use centrix.
          </div>{' '}
          <div>4. User Responsibilities:</div>{' '}
          <div>
            <li>Provide accurate and complete information.</li>
          </div>
          <div className="mt-8">1. Acceptance of Terms:</div>
          <div>
            Your access to and use of centrix is subject to these Terms &
            Conditions.{' '}
          </div>
          <div>
            2. By using the platform, you agree to comply with all applicable
            laws and regulations.
          </div>{' '}
          <div>3. Eligibility:</div>
          <div>
            You must be at least 18 years old or have legal guardian consent to
            use centrix.
          </div>{' '}
          <div>4. User Responsibilities:</div>{' '}
          <div>
            <li>Provide accurate and complete information.</li>
          </div>
          {/* Messages from user (if any) */}
          {messages.length > 0 && (
            <div className="mt-4">
              {messages.map((msg, index) => (
                <div key={index} className="mb-2">
                  <div
                    className={`p-2 rounded-lg ${
                      msg.isUser
                        ? 'bg-blue-100 ml-auto max-w-3/4 text-right'
                        : 'bg-gray-100 max-w-3/4'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Bottom input field (shows only after user submits a message) */}
          {showInputAtBottom && (
            <div className="flex mt-4 mb-4">
              <div className="relative p-2 w-[95%]">
                <input
                  type="text"
                  placeholder="Ask Me"
                  className="w-full px-4 py-3 border border-gray-300 rounded-[1.111vw] bg-white text-gray-900"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <img
                  src={sendicon}
                  className="absolute right-4 bottom-3 cursor-pointer"
                  onClick={handleSendClick}
                />
              </div>
              <img src={copyicon} className="self-center" />
            </div>
          )}
          {/* Footer links */}
          <div className="text-[#313131] text-[0.833vw] mt-4 cursor-pointer">
            Disclaimer <span className="text-[#D9D9D9]">|</span> Privacy Policy
            <span className="text-[#D9D9D9]">|</span> Terms & Conditions
          </div>
          {/* Bottom right rectangle */}
          <div className="absolute bottom-0 right-0 w-[15vw] h-[10vw] bg-[#F9FBFF] rounded-tl-[1.111vw] rounded-br-[1.111vw] flex items-end justify-center">
            {/* Inner rectangle */}
            <div className="w-[13vw] flex-col gap-2 h-[9vw] p-2 flex justify-center items-center mb-0 bg-white rounded-[0.8vw] border-[0.3px] border-[#C6C6C6]">
              <div className="border border-[#19213D] w-full h-[3.139vw] flex justify-center items-center rounded-[0.833vw] border-[#19213D] bg-[#F7F9FB]">
                Source Selection
              </div>
              <div className="border border-[#19213D] w-full h-[3.139vw] flex justify-center items-center rounded-[0.833vw] border-[#19213D] bg-[#F7F9FB]">
                Export
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
