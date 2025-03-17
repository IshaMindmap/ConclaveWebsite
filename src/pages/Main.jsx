import React, { useEffect, useState, useRef } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import BlueButton from '../components/Buttons';
import { useNavigate } from 'react-router-dom';
import {
  copyicon,
  minimizeicon,
  newimg,
  sendicon,
  text,
  upload,
} from '../assets';
import axios from 'axios';
import { X, Send, Copy, Upload, FileText, PlusCircle } from 'lucide-react';
import { InputBox1 } from '../components/InputBox';

const Main = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [showInputAtBottom, setShowInputAtBottom] = useState(false);
  const [currentAssistantMessage, setCurrentAssistantMessage] = useState('');
  const currentMessageRef = useRef('');
  const messagesEndRef = useRef(null);
  const [sessionUid, setSessionUid] = useState(null);
  const [socket, setSocket] = useState(null);
  const [recentSessions, setRecentSessions] = useState([]);
  const [docscategory, setDocsCategory] = useState('1');

  const accessToken = localStorage.getItem('access_token');
  const category = String(localStorage.getItem('category')).toUpperCase();
  const backendUrl = import.meta.env.VITE_API_URL;
  const socketUrl = import.meta.env.VITE_API_SOCKET_URL;
  const renderer = new marked.Renderer();

  // ===== CONVERT MARKDOWN TO HTML =====
  renderer.link = (href, title, text) => {
    const safeHref = typeof href === 'object' ? href.href : href;
    const safeTitle = title ? ` title="${title}"` : '';
    const safeText = text || safeHref;
    return `<a href="${safeHref}"${safeTitle} target="_blank" rel="noopener noreferrer">${safeText}</a>`;
  };

  marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: true,
    langPrefix: 'language-',
    renderer: renderer,
  });

  const renderMessage = (text) => {
    if (!text) return { __html: '' };
    // Use DOMPurify to sanitize HTML before setting it
    return { __html: DOMPurify.sanitize(marked.parse(text)) };
  };

  const handleSessionClick = (uid) => {
    if (uid === sessionUid) return; // Don't reload if it's the same session

    setMessages([]);
    setCurrentAssistantMessage('');
    currentMessageRef.current = '';
    setSessionUid(uid);
    localStorage.setItem('session_uid', uid);

    if (socket) {
      socket.close();
    }

    const newSocket = new WebSocket(
      `${socketUrl}ws/chat/${uid}/?token=${accessToken}`
    );
    setSocket(newSocket);
  };

  // ========= GET AND CREATE ACTIVE SESSION ========
  useEffect(() => {
    const fetchSession = async () => {
      if (!accessToken || !category) {
        console.error('Missing access token or category');
        return;
      }

      try {
        const response = await axios.post(
          `${backendUrl}api/v1/docs/get-or-create-session/`,
          { category: String(category).toLowerCase() },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const sessionId = response.data?.session_id;
        if (sessionId) {
          setSessionUid(sessionId);
          localStorage.setItem('session_uid', sessionId);
        } else {
          console.error('No session ID returned from API');
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };

    if (accessToken && category) {
      fetchSession();
    }
  }, [accessToken, category, backendUrl]);

  // ======= FETCH CHAT HISTORY AFTER SESSION ID EXISTS =======
  useEffect(() => {
    if (!sessionUid || !accessToken) return;

    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}api/v1/chat/chat-history/${sessionUid}/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data && response.data.info) {
          const chatHistory = response.data.info.flatMap((chat) =>
            (chat.messages || [])
              .filter((msg) => msg.role !== 'system')
              .map((msg) => ({
                text: msg.content,
                isUser: msg.role === 'user',
              }))
          );

          // ✅ Prevent duplicate messages by checking previous state
          setMessages((prevMessages) => {
            const mergedMessages = [...prevMessages];

            chatHistory.forEach((newMsg) => {
              // Check if the message already exists before adding
              if (
                !mergedMessages.some(
                  (msg) =>
                    msg.text === newMsg.text && msg.isUser === newMsg.isUser
                )
              ) {
                mergedMessages.push(newMsg);
              }
            });

            // If we have messages, show the input at bottom
            if (mergedMessages.length > 0) {
              setShowInputAtBottom(true);
            }

            return mergedMessages;
          });
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
  }, [sessionUid, accessToken, backendUrl]);

  // =======   WEBSOCKET CONFIGURATION  ========
  useEffect(() => {
    if (!sessionUid || !accessToken) return;

    let isComponentMounted = true;
    let reconnectTimeout = null;

    // Close existing WebSocket before creating a new one
    if (socket) {
      socket.close();
    }

    const ws = new WebSocket(
      `${socketUrl}ws/chat/${sessionUid}/?token=${accessToken}`
    );

    ws.onopen = () => {
      console.log('✅ WebSocket Connected to session:', sessionUid);
      if (isComponentMounted) {
        setSocket(ws);
      }
    };

    ws.onmessage = (event) => {
      if (!isComponentMounted) return;

      try {
        const receivedMessage = JSON.parse(event.data);

        if (receivedMessage.status === 'start') {
          currentMessageRef.current = receivedMessage.assistant || '';
          setCurrentAssistantMessage(currentMessageRef.current);
        } else if (receivedMessage.status === 'generating') {
          currentMessageRef.current += receivedMessage.assistant || '';
          setCurrentAssistantMessage(currentMessageRef.current);
        } else if (receivedMessage.status === 'end') {
          const finalMessage =
            currentMessageRef.current + (receivedMessage.assistant || '');
          setMessages((prev) => [
            ...prev,
            {
              text: finalMessage,
              isUser: false,
            },
          ]);
          currentMessageRef.current = '';
          setCurrentAssistantMessage('');
        }
      } catch (error) {
        console.error('Error parsing message:', error, event.data);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    ws.onclose = (event) => {
      console.log('❌ WebSocket Disconnected.', event.code, event.reason);

      // Only attempt to reconnect if component is still mounted
      if (isComponentMounted) {
        // Attempt to reconnect after 5 seconds
        reconnectTimeout = setTimeout(() => {
          console.log('♻️ Attempting WebSocket Reconnection...');
          if (isComponentMounted) {
            setSocket(
              new WebSocket(
                `${socketUrl}ws/chat/${sessionUid}/?token=${accessToken}`
              )
            );
          }
        }, 5000);
      }
    };

    return () => {
      isComponentMounted = false;
      ws.close();
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };
  }, [sessionUid, accessToken, socketUrl]);

  // =======   MESSAGE HANDLING  ========
  const handleSendClick = () => {
    if (!userInput.trim()) return;

    const newMessage = { text: userInput, isUser: true };
    setMessages((prev) => [...prev, newMessage]);

    if (socket && socket.readyState === WebSocket.OPEN) {

      try {
        socket.send(
          JSON.stringify({
            user: userInput,
            category: docscategory,
            session_uid: sessionUid,
          })
        );
      } catch (error) {
        console.error('Error sending message:', error);
      }
    } else {
      console.error(
        'WebSocket not ready:',
        socket ? socket.readyState : 'socket is null'
      );
    }

    setUserInput('');
    setShowInputAtBottom(true);
  };

  // ==== SCROLL AUTO IN BOTTOM =====
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages, currentAssistantMessage]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      handleSendClick();
    }
  };

  // ======== RECENT ACTIVITIES LIST ========
  useEffect(() => {
    if (!accessToken || !category) return;

    const fetchRecentActivity = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}api/v1/docs/category/sessions/${String(
            category
          ).toLowerCase()}/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        setRecentSessions(response.data || { info: [] });
      } catch (error) {
        console.error('Error fetching recent activity:', error);
      }
    };

    fetchRecentActivity();
  }, [sessionUid, accessToken, category, backendUrl]);

  // ========== NEW CHAT ==========
  const handleNewChat = async () => {
    if (!accessToken || !category) {
      console.error('Missing access token or category');
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}api/v1/docs/sessions/`,
        {
          category: String(category).toLowerCase(),
          title: `New Chat of ${category}`,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status) {
        const newSessionUid = response.data.active_session_uid;
        setMessages([]);
        setCurrentAssistantMessage('');
        currentMessageRef.current = '';

        if (socket) {
          socket.close();
        }

        setSessionUid(newSessionUid);
        localStorage.setItem('session_uid', newSessionUid);

        // Show input at top for new chats
        setShowInputAtBottom(false);
      }
    } catch (error) {
      console.error('Error creating new session:', error);
    }
  };

  // =========== CLEAR ALL CHATS ========
  const handleClearChat = async () => {
    if (!sessionUid || !accessToken) return;

    try {
      const response = await axios.delete(
        `${backendUrl}api/v1/chat/chat-history/${sessionUid}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        console.log('✅ Chat history cleared');
        setMessages([]);
        setShowInputAtBottom(false);
      }
    } catch (error) {
      console.error('❌ Error clearing chat history:', error);
    }
  };

  // Check if mobile
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

  return isMobile ? (
    <div className="flex flex-col h-screen w-full">
      {/* Sidebar overlay - shown only when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar - slides in from left */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white z-50 transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } p-4 overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[#111478] text-lg font-bold">
            Here is some prompts for you
          </h3>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-5 max-h-[30vh] overflow-y-auto">
          {[...Array(8)].map((_, index) => (
            <p key={index} className="text-[#111478] text-sm mb-3">
              Here is some prompts for you.....
            </p>
          ))}
        </div>

        <div className="text-[#111478] text-lg font-bold mb-4">
          Recent uploads and activity
        </div>

        <div className="max-h-[40vh] overflow-y-auto">
          {recentSessions?.info && recentSessions.info.length > 0 ? (
            recentSessions.info.map((session, index) => (
              <p
                key={index}
                onClick={() => handleSessionClick(session.uid)}
                className={`text-[#111478] text-sm mb-3 cursor-pointer ${
                  sessionUid === session.uid ? 'font-bold' : ''
                }`}
              >
                {session.title || 'Untitled Session'}
              </p>
            ))
          ) : (
            <div className="bg-[#F7F9FB] text-center p-5 rounded-lg flex flex-row items-center justify-center">
              <div className="w-1 h-1 bg-[#111478] mx-1 rounded-full"></div>
              <div className="w-1 h-1 bg-[#111478] mx-1 rounded-full"></div>
              <div className="w-1 h-1 bg-[#111478] mx-1 rounded-full"></div>
            </div>
          )}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 bg-[#19213D] p-3 flex flex-col h-full">
        {/* Header area */}
        <div className="flex justify-between items-center mb-3">
          {/* Menu toggle for mobile */}
          <button onClick={() => setIsSidebarOpen(true)} className="text-white">
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

          <div className="flex gap-2">
            <button
              className="w-8 h-8 flex items-center justify-center"
              onClick={handleNewChat}
            >
              <img
                src={newimg}
                alt="New Chat"
                className="w-full h-full object-contain"
              />
            </button>
            <button className="w-8 h-8 flex items-center justify-center">
              <img
                src={text}
                alt="Text"
                className="w-full h-full object-contain"
              />
            </button>
            <button className="w-8 h-8 flex items-center justify-center">
              <img
                src={upload}
                alt="Upload"
                className="w-full h-full object-contain"
              />
            </button>
          </div>
        </div>

        {/* Input field (top) */}
        {!showInputAtBottom && (
          <div className="flex mb-2">
            <div className="relative w-full">
              <InputBox1
                type="text"
                id="Input1"
                placeholder="Ask Me"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={handleSendClick}
              >
                <img src={sendicon} alt="Send" className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Chat area */}
        <div className="rounded-lg font-mulish text-sm text-[#313131] bg-white p-2 flex-1 flex flex-col">
          <div
            ref={messagesEndRef}
            className="chats-list flex-1 overflow-y-auto px-2 rounded-lg bg-[#f3f3f3] mb-2"
          >
            {/* Messages from user (if any) */}
            {messages.length > 0 && (
              <div className="mt-4">
                {messages.map((msg, index) => (
                  <div key={index} className="mb-2">
                    <div
                      className={`p-2 rounded-lg mb-5 ${
                        msg.isUser
                          ? 'bg-[#19213D] text-white drop-shadow-sm ml-auto w-fit max-w-[80%] text-sm p-3 text-right'
                          : 'bg-white text-[#19213D] drop-shadow-sm border-l-4 border-[#19213D] w-fit max-w-[80%] text-sm p-3'
                      }`}
                    >
                      <div
                        className="message-content"
                        dangerouslySetInnerHTML={renderMessage(msg.text)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Real-time typing effect */}
            {currentAssistantMessage && (
              <div className="rounded-lg bg-white text-[#19213D] drop-shadow-sm border-l-4 border-[#19213D] w-fit max-w-[80%] text-sm p-3">
                <div
                  className="message-content"
                  dangerouslySetInnerHTML={renderMessage(
                    currentAssistantMessage
                  )}
                />
              </div>
            )}
          </div>

          {/* Bottom input field (shows only after user submits a message) */}
          {showInputAtBottom && (
            <div className="mb-2">
              <div className="flex flex-wrap gap-2 mb-2">
                <div 
                  className={`flex p-2 py-1 ${(docscategory=='1')?'text-white bg-[#19213D]' :'text-[#313131] bg-white'} border  border-[#C6C6C6] rounded-full text-xs cursor-pointer`}
                  onClick={()=>setDocsCategory('1')}
                >
                  • MedAsk
                </div>
                <div 
                  className={`flex p-2 py-1 ${(docscategory=='2')?'text-white bg-[#19213D]' :'text-[#313131] bg-white'}  border  border-[#C6C6C6] rounded-full text-xs cursor-pointer`}
                  onClick={()=>setDocsCategory('2')}
                >
                  • Pubmed
                </div>
                <div 
                  className={`flex p-2 py-1 ${(docscategory=='3')?'text-white bg-[#19213D]' :'text-[#313131] bg-white'} border border-[#C6C6C6] rounded-full text-xs cursor-pointer`}
                  onClick={()=>setDocsCategory('3')}
                >
                  • Open Source
                </div>
              </div>
              <div className="relative w-full">
                <InputBox1
                  type="text"
                  id="Input2"
                  placeholder="Ask Me"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={handleSendClick}
                >
                  <img src={sendicon} alt="Send" className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Footer links */}
          <div className="flex flex-col">
            <div className="text-[#313131] text-xs mb-1">
              Disclaimer <span className="text-[#D9D9D9] mx-1">|</span>
              Privacy Policy <span className="text-[#D9D9D9] mx-1">|</span>
              Terms & Conditions
            </div>
            <div className="text-[#313131] text-xs">
              For Pubmed, we are only relying on data from Pubmed and not
              responsible for accuracy
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex gap-4">
      {/* Left sidebar */}
      <div className="h-[85vh] ms-4 w-1/5 border border-gray-300 bg-white pt-8 p-6 font-mulish rounded-2xl">
        <div className="">
          <h3 className="flex text-[#111478] text-xl font-bold mb-4 justify-between items-center">
            <span>Here is some prompts for you</span>
            <img src={minimizeicon} alt="Minimize" className="cursor-pointer" />
          </h3>
          <div className="mb-5 min-h-[180px] max-h-[200px] overflow-y-auto hide-scroll-bar">
            <p className="text-[#111478] text-base mb-3">
              Here is some prompts for you.....
            </p>
            {/* Repeated content simplified for clarity */}
            {[...Array(10)].map((_, index) => (
              <p key={index} className="text-[#111478] text-base mb-3">
                Here is some prompts for you.....
              </p>
            ))}
          </div>
        </div>

        <div className="text-[#111478] text-xl font-bold mb-4 flex gap-2">
          Recent uploads and activity
        </div>
        <div className="min-h-[180px] max-h-[200px] overflow-y-auto hide-scroll-bar">
          {recentSessions?.info && recentSessions.info.length > 0 ? (
            recentSessions.info.map((session, index) => (
              <p
                key={index}
                onClick={() => handleSessionClick(session.uid)}
                className={`text-[#111478] text-base mb-3 cursor-pointer ${
                  sessionUid === session.uid ? 'font-bold' : ''
                }`}
              >
                {session.title || 'Untitled Session'}
              </p>
            ))
          ) : (
            <div className="bg-[#F7F9FB] text-center p-5 rounded-lg flex flex-row items-center justify-center">
              <div className="w-1 h-1 bg-[#111478] mx-1 rounded-full"></div>
              <div className="w-1 h-1 bg-[#111478] mx-1 rounded-full"></div>
              <div className="w-1 h-1 bg-[#111478] mx-1 rounded-full"></div>
            </div>
          )}
        </div>
      </div>

      {/* Main content area */}
      <div className="bg-[#19213D] rounded-2xl p-4 w-4/5 me-4">
        <div className="flex justify-between items-center">
          <div className="font-mulish flex justify-center items-center text-white font-bold text-xl mb-5">
            Welcome to the world of {category}
          </div>
          <div className="flex gap-2 mr-4">
            <img
              src={newimg}
              alt="New"
              className="cursor-pointer"
              onClick={handleNewChat}
            />
            <img src={text} alt="Text" className="cursor-pointer" />
            <img src={upload} alt="Upload" className="cursor-pointer" />
          </div>
        </div>

        {/* Original input position (shows only when not at bottom) */}
        {!showInputAtBottom && (
          <div className="flex mb-2">
            <div className="relative p-2 w-full">
              <InputBox1
                type="text"
                id="Input3"
                placeholder="Ask Me"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button
                className="absolute right-4 bottom-3 cursor-pointer"
                onClick={handleSendClick}
              >
                <img src={sendicon} alt="Send" />
              </button>
            </div>
          </div>
        )}

        <div className="rounded-lg font-mulish text-base text-[#313131] capitalize bg-white p-2 relative">
          <div
            ref={messagesEndRef}
            className="chats-list h-[54vh] overflow-y-auto px-2 rounded-xl hide-scroll-bar inset-shadow-xs bg-[#f3f3f3]"
          >
            {/* Messages from user (if any) */}
            {messages.length > 0 && (
              <div className="mt-4">
                {messages.map((msg, index) => (
                  <div key={index} className="mb-2">
                    <div
                      className={`p-2 rounded-lg mb-5 ${
                        msg.isUser
                          ? 'bg-[#19213D] text-white drop-shadow-sm ml-auto w-fit max-w-screen-sm text-base p-3 text-right'
                          : 'bg-white text-[#19213D] drop-shadow-sm border-l-4 border-[#19213D] w-fit max-w-screen-sm text-base p-3'
                      }`}
                    >
                      <div
                        className="message-content"
                        dangerouslySetInnerHTML={renderMessage(msg.text)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Real-time typing effect */}
            {currentAssistantMessage && (
              <div className="rounded-lg bg-white text-[#19213D] drop-shadow-sm border-l-4 border-[#19213D] w-fit max-w-screen-sm text-base p-3">
                <div
                  className="message-content"
                  dangerouslySetInnerHTML={renderMessage(
                    currentAssistantMessage
                  )}
                />
              </div>
            )}
          </div>

          {/* Bottom input field (shows only after user submits a message) */}
          {showInputAtBottom && (
            <div className="flex flex-col mt-4 mb-4">
              <div className="flex flex-wrap gap-2 mb-2">
                <div
                 className={`flex p-4 py-2 ${(docscategory=='1')?'text-white bg-[#19213D]' :'text-[#313131] bg-white'} border border-[#C6C6C6] rounded-full cursor-pointer`}
                 onClick={()=>setDocsCategory('1')}
                >
                  • MedAsk
                </div>
                <div 
                  className={`flex p-4 py-2 ${(docscategory=='2')?'text-white bg-[#19213D]' :'text-[#313131] bg-white'} border border-[#C6C6C6] rounded-full cursor-pointer`}
                  onClick={()=>setDocsCategory('2')}
                >
                  • Pubmed
                </div>
                <div 
                  className={`flex p-4 py-2 ${(docscategory=='3')?'text-white bg-[#19213D]' :'text-[#313131] bg-white'} border border-[#C6C6C6] rounded-full cursor-pointer`}
                  onClick={()=>setDocsCategory('3')}
                >
                  • Open Source
                </div>
              </div>
              <div className="relative p-2 w-full">
                <InputBox1
                  type="text"
                  id="Input4"
                  placeholder="Ask Me"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <button
                  className="absolute right-4 bottom-3 cursor-pointer"
                  onClick={handleSendClick}
                >
                  <img src={sendicon} alt="Send" />
                </button>
              </div>
            </div>
          )}

          {/* Footer links */}
          <div className="flex flex-wrap justify-between">
            <div className="text-[#313131] text-sm mt-2 cursor-pointer">
              Disclaimer <span className="text-[#D9D9D9] mx-1">|</span> Privacy
              Policy
              <span className="text-[#D9D9D9] mx-1">|</span> Terms & Conditions
            </div>
            <div className="text-[#313131] text-xs mt-4">
              For Pubmed, we are only relying on data from Pubmed and not
              responsible for accuracy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;