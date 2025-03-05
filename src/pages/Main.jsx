import React, {useEffect, useState ,useRef} from 'react';
import InputBox from '../components/InputBox';
import BlueButton from '../components/Buttons';
import { useNavigate } from 'react-router-dom';
import { copyicon, minimizeicon, sendicon } from '../assets';
import axios from "axios";

const Main = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [showInputAtBottom, setShowInputAtBottom] = useState(false);
  const [currentAssistantMessage, setCurrentAssistantMessage] = useState('');
  const currentMessageRef = useRef(''); 
  const messagesEndRef = useRef(null);
  const [sessionUid, setSessionUid] = useState(null);
  const [socket, setSocket] = useState(null);

  const accessToken = localStorage.getItem("access_token")
  const category = String(localStorage.getItem("category")).toUpperCase()
  const backendUrl = import.meta.env.VITE_API_URL;
  const socketUrl = import.meta.env.VITE_API_SOCKET_URL;

  
  // ========= GET AND CREATE ACTIVE SESSION ========
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.post(
          `${backendUrl}api/v1/docs/get-or-create-session/`,
          { category: "cardiology" },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const sessionId = response.data?.session_id;
        setSessionUid(sessionId);
        localStorage.setItem('session_uid', sessionId);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();
  }, []);


  // ======= FETCH CHAT HISTORY AFTER SESSION ID EXISTS =======
  useEffect(() => {
    if (!sessionUid) return; 

    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}api/v1/chat/chat-history/${sessionUid}/`, 
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const chatHistory = response.data.info.flatMap((chat) =>
          chat.messages
            .filter((msg) => msg.role !== "system")
            .map((msg) => ({
              text: msg.content,
              isUser: msg.role === "user",
            }))
        );
    
        console.log("Fetched Chat History:", chatHistory);
    
        // ✅ Prevent duplicate messages by checking previous state
        setMessages((prevMessages) => {
          const mergedMessages = [...prevMessages];
    
          chatHistory.forEach((newMsg) => {
            // Check if the message already exists before adding
            if (!mergedMessages.some((msg) => msg.text === newMsg.text && msg.isUser === newMsg.isUser)) {
              mergedMessages.push(newMsg);
            }
          });
    
          return mergedMessages;
        });

      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, [sessionUid]); 

  // =======   WEBSOCKET CONFIGURATION  ========
  useEffect(() => {
    if (!sessionUid) return; 

    const ws = new WebSocket(`${socketUrl}ws/chat/${sessionUid}/?token=${accessToken}`);
    setSocket(ws);

    ws.onopen = () => {
      console.log("✅ WebSocket Connected");
    };

    ws.onmessage = (event) => {
      console.log("📩 Received Message:", event.data);
      const receivedMessage = JSON.parse(event.data);
      if (receivedMessage.status === "start") {
        currentMessageRef.current = receivedMessage.assistant; 
        setCurrentAssistantMessage(currentMessageRef.current);
      } else if (receivedMessage.status === "generating") {
        currentMessageRef.current += receivedMessage.assistant; 
        setCurrentAssistantMessage(currentMessageRef.current);
      } else if (receivedMessage.status === "end") {
        
        setMessages((prev) => [
          ...prev,
          { text: currentMessageRef.current + receivedMessage.assistant, isUser: false },
        ]);
        setCurrentAssistantMessage(''); 
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket Disconnected, Attempting Reconnection...");
      setTimeout(() => {
        setSocket(new WebSocket(`${socketUrl}ws/chat/${sessionUid}/?token=${accessToken}`));
      }, 5000); 
    };

    return () => {
      ws.close();
    };
  }, [sessionUid]); 

  // =======   MESSAGE HANDLING  ========
  const handleSendClick = () => {
    
    if (userInput.trim()) {
      const newMessage = { text: userInput, isUser: true };
      setMessages([...messages, newMessage]);

      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
          user: userInput,
          category: "1",
          session_uid: sessionUid,
        }));

        socket.onerror = (error) => {
          console.error("WebSocket Error:", error);
        };
      }

      setUserInput('');
      setShowInputAtBottom(true);
    }
  };


  // ==== SCROLL AUTO IN BOTTOM =====
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages, currentAssistantMessage]); // Runs whenever messages update

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendClick();
  };



  return (
    <div className="flex gap-[0.833vw]">
      <div className="h-[85vh] ms-4 w-[20%] border-[0.3px] border-[#C6C6C6] bg-[#FFFFFF] pt-[2.222vw] p-[1.528vw] font-mulish rounded-[24px]">
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
      <div className="bg-[#19213D] rounded-[1.667vw] p-[0.833vw] w-[80%] me-4">
        <div className="flex justify-between items-center">
          <div className="font-mulish flex justify-center items-center text-[#FFFFFF] font-[800] text-[1.319vw] mb-[1.389vw]">
            Welcome to the world of {category}
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

        <div className="rounded-[1.111vw] font-mulish text-[1.111vw] text-[#313131] capitalize bg-[#FFFFFF] p-2 relative">
          <div 
          ref={messagesEndRef}
          className='h-[54vh] overflow-y-scroll  px-2 rounded-2xl hide-scroll-bar inset-shadow-xs bg-[#f3f3f3]'
          >
              {/* Messages from user (if any) */}
              {messages.length > 0 && (
                <div className="mt-4">
                  {messages.map((msg, index) => (
                    <div key={index} className="mb-2">
                      <div
                        className={`p-2 rounded-lg  mb-5 ${
                          msg.isUser
                            ? 'bg-[#19213D] text-[#fff] drop-shadow-sm ml-auto w-fit max-w-screen-sm text-[1rem] p-3 text-right'
                            : 'bg-[#fff] text-[#19213D] drop-shadow-sm border-l-4 border-[#19213D] w-fit max-w-screen-sm text-[1rem] p-3'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Real-time typing effect */}
              {currentAssistantMessage && (
                <div className="mt-2 p-2 bg-gray-200 text-gray-700 rounded-lg italic">
                  {currentAssistantMessage}
                </div>
              )}
            
            </div>

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
          <div className="flex justify-between">
            <div className="text-[#313131] text-[0.833vw] mt-2 cursor-pointer">
              Disclaimer <span className="text-[#D9D9D9]">|</span> Privacy
              Policy
              <span className="text-[#D9D9D9]">|</span> Terms & Conditions
            </div>
            <div className="text-[#313131] text-[0.556vw] mt-4">
              For Pubmed, we are only relaying on data from Pubmed and not
              responsible for accuracy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
