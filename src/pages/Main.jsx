import React, {useEffect, useState ,useRef} from 'react';
import { marked } from "marked";
import DOMPurify from "dompurify";
import InputBox from '../components/InputBox';
import BlueButton from '../components/Buttons';
import { useNavigate } from 'react-router-dom';
import { copyicon, minimizeicon, newimg, sendicon, text, upload } from '../assets';
import axios from "axios";
import { X, Send, Copy, Upload, FileText, PlusCircle } from 'lucide-react';

const Main = () => {
  const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
     const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const [userInput, setUserInput] = useState('');
  // const [messages, setMessages] = useState([]);
  // const [showInputAtBottom, setShowInputAtBottom] = useState(false);
  // const [currentAssistantMessage, setCurrentAssistantMessage] = useState('');
  // const currentMessageRef = useRef(''); 
  // const messagesEndRef = useRef(null);
  // const [sessionUid, setSessionUid] = useState(null);
  // const [socket, setSocket] = useState(null);
  // const [recentSessions, setRecentSessions] = useState([]); 

  // const accessToken = localStorage.getItem("access_token")
  // const category = String(localStorage.getItem("category")).toUpperCase()
  // const backendUrl = import.meta.env.VITE_API_URL;
  // const socketUrl = import.meta.env.VITE_API_SOCKET_URL;
  // const renderer = new marked.Renderer();


  // // ===== CONVERT MARKDOWN TO HTML =====
  
  // renderer.link = (href, title, text) => {
  //   console.log("href:", href, "title:", title, "text:", text);
  
  //   const safeHref = typeof href === "object" ? href.href : href;
  //   const safeTitle = title ? ` title="${title}"` : ""; 
  //   const safeText = text || safeHref; 
  //   return `<a href="${safeHref}"${safeTitle} target="_blank" rel="noopener noreferrer">${safeText}</a>`;

  // };
  // marked.setOptions({
  //   breaks: true,  // ✅ Enables line breaks
  //   gfm: true,  // ✅ Enables GitHub Flavored Markdown
  //   headerIds: true, // ✅ Disables automatic header IDs
  //   langPrefix: "language-", // ✅ Helps with syntax highlighting
  //   renderer: renderer,  // ✅ Use custom renderer
  // });

  // const renderMessage = (text) => {
  //   if (!text) return { __html: "" };  // ✅ Prevent errors with empty input
  //   return { __html: marked.parse(text) };  // ✅ Returns correct format for React
  // };

  // const handleSessionClick = (uid) => {
  //   setMessages([]);
  //   setSessionUid(uid);  
  //   localStorage.setItem('session_uid', uid);
  //   setSocket(new WebSocket(`${socketUrl}ws/chat/${uid}/?token=${accessToken}`)); 
    
  // };

  
  // // ========= GET AND CREATE ACTIVE SESSION ========
  // useEffect(() => {
  //   const fetchSession = async () => {
  //     try {
  //       const response = await axios.post(
  //         `${backendUrl}api/v1/docs/get-or-create-session/`,
  //         { category: String(category).toLowerCase() },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       const sessionId = response.data?.session_id;
  //       setSessionUid(sessionId);
  //       localStorage.setItem('session_uid', sessionId);
  //     } catch (error) {
  //       console.error("Error fetching session:", error);
  //     }
  //   };

  //   fetchSession();
  // }, []);


  // // ======= FETCH CHAT HISTORY AFTER SESSION ID EXISTS =======
  // useEffect(() => {
  //   if (!sessionUid) return; 

  //   const fetchChatHistory = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${backendUrl}api/v1/chat/chat-history/${sessionUid}/`, 
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       const chatHistory = response.data.info.flatMap((chat) =>
  //         chat.messages
  //           .filter((msg) => msg.role !== "system")
  //           .map((msg) => ({
  //             text: msg.content,
  //             isUser: msg.role === "user",
  //           }))
  //       );
    
    
  //       // ✅ Prevent duplicate messages by checking previous state
  //       setMessages((prevMessages) => {
  //         const mergedMessages = [...prevMessages];
    
  //         chatHistory.forEach((newMsg) => {
  //           // Check if the message already exists before adding
  //           if (!mergedMessages.some((msg) => msg.text === newMsg.text && msg.isUser === newMsg.isUser)) {
  //             mergedMessages.push(newMsg);
  //           }
  //         });
    
  //         return mergedMessages;
  //       });

  //     } catch (error) {
  //       console.error("Error fetching chat history:", error);
  //     }
  //   };

  //   fetchChatHistory();
  // }, [sessionUid]); 

  // // =======   WEBSOCKET CONFIGURATION  ========
  // useEffect(() => {
  //   if (!sessionUid) return; 
  
  //   let isConnected = false; // Track WebSocket connection status
  //   let reconnectTimeout = null; // Store reconnection timeout
    
  //   // Close existing WebSocket before creating a new one
  //   if (socket) {
  //     socket.close();
  //   }
  
  //   const ws = new WebSocket(`${socketUrl}ws/chat/${sessionUid}/?token=${accessToken}`);
    
  //   ws.onopen = () => {
  //     console.log("✅ WebSocket Connected to session:", sessionUid);
  //     isConnected = true;
  //     setSocket(ws); 
  //   };
  
  //   ws.onmessage = (event) => {
  //     console.log("📩 Received Message:", event.data);
  //     const receivedMessage = JSON.parse(event.data);
  
  //     if (receivedMessage.status === "start") {
  //       currentMessageRef.current = receivedMessage.assistant; 
  //       setCurrentAssistantMessage(currentMessageRef.current);
  //     } else if (receivedMessage.status === "generating") {
  //       currentMessageRef.current += receivedMessage.assistant; 
  //       setCurrentAssistantMessage(currentMessageRef.current);
  //     } else if (receivedMessage.status === "end") {
  //       setMessages((prev) => [
  //         ...prev,
  //         { text: currentMessageRef.current + receivedMessage.assistant, isUser: false },
  //       ]);
  //       setCurrentAssistantMessage(''); 
  //     }
  //   };
  
  //   ws.onerror = (error) => {
  //     console.error("WebSocket Error:", error);
  //   };
  
  //   ws.onclose = () => {
  //     console.log("❌ WebSocket Disconnected.");
      
  //     if (!isConnected) return; 
  
  //     // Attempt to reconnect after 5 seconds
  //     reconnectTimeout = setTimeout(() => {
  //       console.log("♻️ Attempting WebSocket Reconnection...");
  //       setSocket(new WebSocket(`${socketUrl}ws/chat/${sessionUid}/?token=${accessToken}`));
  //     }, 5000);
  //   };
  
  //   return () => {
  //     console.log("🛑 Cleaning up WebSocket for session:", sessionUid);
  //     isConnected = false; 
  //     ws.close(); 
  //     if (reconnectTimeout) clearTimeout(reconnectTimeout);
  //   };
  
  // }, [sessionUid]); 

  // // =======   MESSAGE HANDLING  ========
  // const handleSendClick = () => {
    
  //   if (userInput.trim()) {
  //     const newMessage = { text: userInput, isUser: true };
  //     setMessages([...messages, newMessage]);

  //     if (socket && socket.readyState === WebSocket.OPEN) {
  //       socket.send(JSON.stringify({
  //         user: userInput,
  //         category: "1",
  //         session_uid: sessionUid,
  //       }));

  //       socket.onerror = (error) => {
  //         console.error("WebSocket Error:", error);
  //       };
  //     }

  //     setUserInput('');
  //     setShowInputAtBottom(true);
  //   }
  // };


  // // ==== SCROLL AUTO IN BOTTOM =====
  // useEffect(() => {
  //   if (messagesEndRef.current) {
  //     messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  //   }
  // }, [messages, currentAssistantMessage]); // Runs whenever messages update

  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter') handleSendClick();
  // };



  // // ======== RECENT ACTIVITIES LIST ========
  // useEffect(() => {
  //   const fetchRecentActivity = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${backendUrl}api/v1/docs/category/sessions/${String(category).toLowerCase()}/`, 
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
        
  //       setRecentSessions(response.data);
  //     } catch (error) {
  //       console.error("Error fetching recent activity:", error);
  //     }
  //   };

  //   fetchRecentActivity();
  // }, [sessionUid]);


  // // ========== NEW CHAT ==========
  // const handleNewChat = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${backendUrl}api/v1/docs/sessions/`,
  //       {
  //         category: String(category).toLowerCase(),
  //         title: `New Chat of ${category}`, 
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  
  //     if (response.data.status) {
  //       const newSessionUid = response.data.active_session_uid;
  //       setMessages([]);
  //       if (socket) {
  //         socket.close(); 
  //       } 
  //       setSessionUid(newSessionUid);
  //       localStorage.setItem("session_uid", newSessionUid);
  //     }
  //   } catch (error) {
  //     console.error("Error creating new session:", error);
  //   }
  // };



  // // =========== CLEAR ALL CHATS ========
  // const handleClearChat = async () => {
  //   if (!sessionUid) return;  
  
  //   try {
  //     const response = await axios.delete(
  //       `${backendUrl}api/v1/chat/chat-history/${sessionUid}/`,  
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  
  //     if (response.status === 200) {
  //       console.log("✅ Chat history cleared");
  //       setMessages([]); 
  //     }
  //   } catch (error) {
  //     console.error("❌ Error clearing chat history:", error);
  //   }
  // };
  
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


 const MobileDesign = () => (
   <div className="flex flex-col md:flex-row gap-2 h-screen w-full">
     {/* Sidebar - hidden on mobile by default, shown when toggled */}
     <div
       className={`${
         isSidebarOpen ? 'fixed inset-0 z-50 bg-black bg-opacity-50' : 'hidden'
       } md:static md:block md:bg-transparent md:z-auto`}
     >
       <div
         className={`h-full w-full max-w-xs md:w-1/4 lg:w-1/5 bg-white p-4 md:p-6 font-mulish rounded-lg md:rounded-2xl border border-gray-300 transform transition-transform duration-300 ${
           isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
         } md:translate-x-0`}
       >
         <div className="flex justify-between items-center mb-4">
           <h3 className="text-[#111478] text-lg md:text-xl font-bold">
             Here is some prompts for you
           </h3>
           <button
             onClick={() => setIsSidebarOpen(false)}
             className="md:hidden text-gray-500"
           >
             <X size={20} />
           </button>
         </div>

         <div className="mb-5 h-48 md:h-60 overflow-y-auto">
           {[...Array(8)].map((_, index) => (
             <p
               key={index}
               className="text-[#111478] text-sm md:text-base mb-3"
             >
               Here is some prompts for you.....
             </p>
           ))}
         </div>

         <div className="text-[#111478] text-lg md:text-xl font-bold mb-4 flex gap-2">
           Recent uploads and activity
         </div>

         <div className="h-48 md:h-60 overflow-y-auto">
           <div className="bg-[#F7F9FB] text-center p-5 rounded-lg flex flex-row items-center justify-center">
             <div className="w-1 h-1 bg-[#111478] mx-1 rounded-full"></div>
             <div className="w-1 h-1 bg-[#111478] mx-1 rounded-full"></div>
             <div className="w-1 h-1 bg-[#111478] mx-1 rounded-full"></div>
           </div>
         </div>
       </div>
     </div>

     {/* Main content area */}
     <div className="flex-1 bg-[#19213D] rounded-lg md:rounded-2xl p-3 md:p-4 flex flex-col h-full">
       {/* Header area */}
       <div className="flex justify-between items-center mb-3 md:mb-4">
         {/* Menu toggle for mobile */}
         <button
           onClick={() => setIsSidebarOpen(true)}
           className="text-white md:hidden"
         >
           <svg
             xmlns="http://www.w3.org/2000/svg"
             width="24"
             height="24"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round"
           >
             <line x1="3" y1="12" x2="21" y2="12"></line>
             <line x1="3" y1="6" x2="21" y2="6"></line>
             <line x1="3" y1="18" x2="21" y2="18"></line>
           </svg>
         </button>

         <div className="font-mulish text-white font-bold text-base md:text-xl truncate">
           Welcome to the world of
         </div>

         <div className="flex gap-1 md:gap-2">
           <button className="text-white bg-[#111478] p-1 md:p-2 rounded-full">
             <PlusCircle size={18} />
           </button>
           <button className="text-white bg-[#111478] p-1 md:p-2 rounded-full">
             <FileText size={18} />
           </button>
           <button className="text-white bg-[#111478] p-1 md:p-2 rounded-full">
             <Upload size={18} />
           </button>
         </div>
       </div>

       {/* Input field (top) */}
       <div className="flex mb-2">
         <div className="relative p-1 md:p-2 w-full">
           <input
             type="text"
             placeholder="Ask Me"
             className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg md:rounded-xl bg-white text-gray-900 text-sm md:text-base"
           />
           <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
             <Send size={18} />
           </button>
         </div>
       </div>

       {/* Chat area */}
       <div className="rounded-lg md:rounded-xl font-mulish text-sm md:text-base text-gray-800 bg-white p-2 flex-1 flex flex-col">
         <div className="flex-1 overflow-y-auto px-2 rounded-lg bg-[#f3f3f3] mb-2">
           {/* Messages would go here */}
         </div>

         {/* Footer */}
         <div className="flex flex-col md:flex-row justify-between text-xs md:text-sm text-gray-600 mt-1">
           <div className="mb-1 md:mb-0">
             Disclaimer <span className="mx-1 text-gray-300">|</span>
             Privacy Policy <span className="mx-1 text-gray-300">|</span>
             Terms & Conditions
           </div>
           <div className="text-xs">
             For Pubmed, we are only relying on data from Pubmed and not
             responsible for accuracy
           </div>
         </div>
       </div>
     </div>
   </div>
 );

  const DesktopDesign = () => (
    <div className="flex gap-[0.833vw]">
      <div className="h-[85vh] ms-4 w-[20%] border-[0.3px] border-[#C6C6C6] bg-[#FFFFFF] pt-[2.222vw] p-[1.528vw] font-mulish rounded-[24px]">
        <div className="">
          <h3 className="flex text-[#111478] text-[1.319vw] font-[700] mb-[1.111vw]">
            <span>Here is some prompts for you</span> <img src={minimizeicon} />
          </h3>
          <div className=" mb-5 min-h-[180px] max-h-[200px] overflow-y-scroll hide-scroll-bar">
            <p className="text-[#111478] text-[1rem] mb-3">
              Here is some prompts for you.....
            </p>
            <p className="text-[#111478] text-[1rem] mb-3">
              Here is some prompts for you.....
            </p>
            <p className="text-[#111478] text-[1rem] mb-3">
              Here is some prompts for you.....
            </p>
            <p className="text-[#111478] text-[1rem] mb-3">
              Here is some prompts for you.....
            </p>
            <p className="text-[#111478] text-[1rem] mb-3">
              Here is some prompts for you.....
            </p>
            <p className="text-[#111478] text-[1rem] mb-3">
              Here is some prompts for you.....
            </p>
            <p className="text-[#111478] text-[1rem] mb-3">
              Here is some prompts for you.....
            </p>
            <p className="text-[#111478] text-[1rem] mb-3">
              Here is some prompts for you.....
            </p>
            <p className="text-[#111478] text-[1rem] mb-3">
              Here is some prompts for you.....
            </p>
            <p className="text-[#111478] text-[1rem] mb-3">
              Here is some prompts for you.....
            </p>
            <p className="text-[#111478] text-[1rem] mb-3">
              Here is some prompts for you.....
            </p>
          </div>
        </div>

        <div className="text-[#111478] text-[1.319vw] font-[700] mb-[1.111vw] flex gap-2">
          Recent uploads and activity
        </div>
        <div className="min-h-[180px] max-h-[200px] overflow-y-scroll hide-scroll-bar">
          {/* {recentSessions?.info && recentSessions.info.length > 0 ? (
            recentSessions.info.map((session, index) => (
              <p 
              key={index}
              onClick={() => handleSessionClick(session.uid)}
              className={`text-[#111478] text-[1rem] mb-3 cursor-pointer ${sessionUid==session.uid?'font-[700]':''}`}
              >
                {session.title || "Untitled Session"}
              </p>
              
            ))
          ) : (
            <div className="bg-[#F7F9FB] text-center p-5 rounded-lg flex flex-row align-middle justify-center">
              <div className='w-[4px] h-[4px] bg-[#111478] me-1 rounded-lg'></div>
              <div className='w-[4px] h-[4px] bg-[#111478] me-1 rounded-lg'></div>
              <div className='w-[4px] h-[4px] bg-[#111478] me-1 rounded-lg'></div>   
            </div>
          )} */}
        </div>
      </div>
      <div className="bg-[#19213D] rounded-[1.667vw] p-[0.833vw] w-[80%] me-4">
        <div className="flex justify-between items-center">
          <div className="font-mulish flex justify-center items-center text-[#FFFFFF] font-[800] text-[1.319vw] mb-[1.389vw]">
            Welcome to the world of
            {/* {category} */}
          </div>
          {/* <div className="flex gap-2">
            <div 
            // onClick={handleClearChat}
            className="text-[#313131] bg-white px-4 py-2 w-[7.708vw] rounded-[2.083vw] cursor-pointer"
            >
              Clear Chat
            </div>
            <div 
            // onClick={handleNewChat}
            className="text-[#313131] bg-white px-4 py-2 w-[7.708vw] rounded-[2.083vw] cursor-pointer"
            >
              New Chat
            </div>
          </div> */}
          <div className="flex gap-2 mr-4">
            <img src={newimg} />
            <img src={text} />
            <img src={upload} />
          </div>
        </div>

        {/* Original input position (shows only when not at bottom) */}
        {/* {!showInputAtBottom && ( */}
        <div className="flex mb-2">
          <div className="relative p-2 w-full">
            <input
              type="text"
              placeholder="Ask Me"
              className="w-full px-4 py-3 border border-gray-300 rounded-[1.111vw] bg-white text-gray-900"
              // value={userInput}
              // onChange={(e) => setUserInput(e.target.value)}
              // onKeyPress={handleKeyPress}
            />
            <img
              src={sendicon}
              className="absolute right-4 bottom-3 cursor-pointer"
              // onClick={handleSendClick}
            />
          </div>
          {/* <img src={copyicon} className="self-center" /> */}
        </div>
        {/* )} */}

        <div className="rounded-[1.111vw] font-mulish text-[1.111vw] text-[#313131] capitalize bg-[#FFFFFF] p-2 relative">
          <div
            // ref={messagesEndRef}
            className="chats-list h-[54vh] overflow-y-scroll  px-2 rounded-2xl hide-scroll-bar inset-shadow-xs bg-[#f3f3f3]"
          >
            {/* Messages from user (if any) */}
            {/* {messages.length > 0 && (
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
                        <div dangerouslySetInnerHTML={renderMessage(msg.text)} /> 
                      </div>
                    </div>
                  ))}
                </div>
              )} */}

            {/* Real-time typing effect */}
            {/* {currentAssistantMessage && (
                <div className="rounded-lg bg-[#fff] text-[#19213D] drop-shadow-sm border-l-4 border-[#19213D] w-fit max-w-screen-sm text-[1rem] p-3">
                  <div dangerouslySetInnerHTML={renderMessage(currentAssistantMessage)} /> 
                </div>
              )} */}
          </div>

          {/* Bottom input field (shows only after user submits a message) */}
          {/* {showInputAtBottom && (
                <div className="flex flex-col mt-4 mb-4">
            <div className="flex gap-2">
              <div className="flex p-4 py-2 text-white bg-[#19213D] rounded-full">
                • MedAsk
              </div>

              <div className="flex p-4 py-2 text-[#313131] border border-[#C6C6C6] rounded-full">
                • Pubmed
              </div>
              <div className="flex p-4 py-2 text-[#313131] border border-[#C6C6C6] rounded-full">
                • Upload
              </div>
            </div>
            <div className="relative p-2 w-full">
              <input
                type="text"
                placeholder="Ask Me"
                className="w-full px-4 py-3 border border-gray-300 rounded-[1.111vw] bg-white text-gray-900"
                // value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                // onKeyPress={handleKeyPress}
              />
              <img
                src={sendicon}
                className="absolute right-4 bottom-3 cursor-pointer"
                // onClick={handleSendClick}
              />
            </div>
            {/* <img src={copyicon} className="self-center" /> 
          </div>
              )} */}

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
   return isMobile ? <MobileDesign /> : <DesktopDesign />;
};
export default Main;
