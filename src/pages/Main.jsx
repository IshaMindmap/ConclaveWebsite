import React, { useEffect, useState, useRef } from 'react';
import TypingIndicator from '../components/TypingIndicator';
import jsPDF from 'jspdf';
import MessageComponent from '../components/MessageComponent';
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
import {
  X,
  Send,
  Copy,
  Upload,
  FileText,
  PlusCircle,
  DownloadIcon,
} from 'lucide-react';
import { InputBox1 } from '../components/InputBox';
import { marked } from 'marked';

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
  const [istyping, setIsTyping] = useState(0);

  const accessToken = localStorage.getItem('access_token');
  const category = String(localStorage.getItem('category')).toUpperCase();
  const backendUrl = import.meta.env.VITE_API_URL;
  const socketUrl = import.meta.env.VITE_API_SOCKET_URL;

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

const handleDownloadChat = async (uid) => {
  console.log(uid);
  try {
    const response = await axios.get(
      `${backendUrl}api/v1/chat/chat-history/${uid}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(response?.data?.info);

    // Create an object where each key is a category and its value is the messages for that category
    const messagesByCategory = {};

    response?.data?.info?.forEach((item) => {
      const category = item.category || 'uncategorized';
      const messages = item.messages || [];

      if (!messagesByCategory[category]) {
        messagesByCategory[category] = [];
      }

      // Extract role and content from each message, filtering for only "user" and "assistant" roles
      const extractedMessages = messages
        .map((message) => {
          if (!message || typeof message !== 'object') return null;

          // Only include messages with role "user" or "assistant"
          if (message.role !== 'user' && message.role !== 'assistant')
            return null;

          return {
            role: message.role,
            content: message.content,
          };
        })
        .filter((item) => item !== null);

      // Add these messages to the appropriate category
      messagesByCategory[category].push(...extractedMessages);
    });

    console.log('Messages by category:', messagesByCategory);

    // Generate and download the PDF
    generatePDF(messagesByCategory, uid);

    return messagesByCategory;
  } catch (error) {
    console.error('Error fetching session:', error);
    return {};
  }
};

// Improved Markdown parser for PDF
const parseMarkdownForPDF = (markdown) => {
  if (!markdown) return [];

  const result = [];
  // Split by lines
  const lines = markdown.split('\n');
  let inCodeBlock = false;
  let codeContent = [];
  let codeLanguage = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle code blocks
    if (line.match(/^```/)) {
      if (!inCodeBlock) {
        // Start of code block
        inCodeBlock = true;
        codeLanguage = line.replace(/```/, '').trim();
        codeContent = [];
      } else {
        // End of code block
        inCodeBlock = false;
        result.push({
          type: 'code',
          language: codeLanguage,
          content: codeContent,
        });
      }
      continue;
    }

    if (inCodeBlock) {
      codeContent.push(line);
      continue;
    }

    // Handle headings
    const heading1Match = line.match(/^# (.+)$/);
    if (heading1Match) {
      result.push({ type: 'heading1', text: heading1Match[1] });
      continue;
    }

    const heading2Match = line.match(/^## (.+)$/);
    if (heading2Match) {
      result.push({ type: 'heading2', text: heading2Match[1] });
      continue;
    }

    const heading3Match = line.match(/^### (.+)$/);
    if (heading3Match) {
      result.push({ type: 'heading3', text: heading3Match[1] });
      continue;
    }

    // Handle list items
    const listItemMatch = line.match(/^- (.+)$/);
    if (listItemMatch) {
      result.push({
        type: 'listItem',
        text: processInlineFormatting(listItemMatch[1]),
      });
      continue;
    }

    // Handle ordered list items
    const orderedListItemMatch = line.match(/^\d+\. (.+)$/);
    if (orderedListItemMatch) {
      result.push({
        type: 'orderedListItem',
        number: line.match(/^\d+/)[0],
        text: processInlineFormatting(orderedListItemMatch[1]),
      });
      continue;
    }

    // Handle regular text with inline formatting
    if (line.trim()) {
      result.push({
        type: 'text',
        segments: processInlineFormatting(line),
      });
      continue;
    }

    // Empty line
    result.push({ type: 'empty' });
  }

  return result;
};

// Process inline formatting (bold, italic, links)
const processInlineFormatting = (text) => {
  const segments = [];
  let currentIndex = 0;

  // Process the text and identify formatting segments
  // This regex handles bold, italic, and links in one pass
  const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(\[(.+?)\]\((.+?)\))/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // If there's plain text before this match, add it
    if (match.index > currentIndex) {
      segments.push({
        type: 'plain',
        text: text.substring(currentIndex, match.index),
      });
    }

    if (match[1]) {
      // Bold text
      segments.push({
        type: 'bold',
        text: match[2],
      });
    } else if (match[3]) {
      // Italic text
      segments.push({
        type: 'italic',
        text: match[4],
      });
    } else if (match[5]) {
      // Link
      segments.push({
        type: 'link',
        text: match[6],
        url: match[7],
      });
    }

    currentIndex = match.index + match[0].length;
  }

  // If there's remaining text after the last match, add it
  if (currentIndex < text.length) {
    segments.push({
      type: 'plain',
      text: text.substring(currentIndex),
    });
  }

  // If no formatting was found, return the plain text
  if (segments.length === 0) {
    segments.push({
      type: 'plain',
      text: text,
    });
  }

  return segments;
};

// Render the parsed markdown to PDF
const renderMarkdownToPDF = (doc, parsedElements, startX, startY, maxWidth) => {
  let x = startX;
  let y = startY;

  parsedElements.forEach((element) => {
    switch (element.type) {
      case 'heading1':
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text(element.text, x, y);
        y += 12;
        break;

      case 'heading2':
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(element.text, x, y);
        y += 10;
        break;

      case 'heading3':
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(element.text, x, y);
        y += 8;
        break;

      case 'listItem':
        doc.setFontSize(12);

        // Render segments with proper formatting
        let bulletX = x + 5;
        doc.setFont('helvetica', 'normal');
        doc.text('•', x, y);

        let segmentX = bulletX + 5;
        element.text.forEach((segment) => {
          renderTextSegment(doc, segment, segmentX, y);
          segmentX += doc.getTextWidth(segment.text);
        });

        y += 6;
        break;

      case 'orderedListItem':
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`${element.number}.`, x, y);

        let numWidth = doc.getTextWidth(`${element.number}. `);
        let orderedSegmentX = x + numWidth + 2;

        element.text.forEach((segment) => {
          renderTextSegment(doc, segment, orderedSegmentX, y);
          orderedSegmentX += doc.getTextWidth(segment.text);
        });

        y += 6;
        break;

      case 'code':
        doc.setFontSize(10);
        doc.setFont('courier', 'normal');

        // Draw code block background
        doc.setFillColor(240, 240, 240);
        const codeLineHeight = 5;
        const codeBlockHeight = element.content.length * codeLineHeight + 10;
        doc.rect(x, y - 3, maxWidth - 10, codeBlockHeight, 'F');

        // Draw language label if available
        if (element.language) {
          doc.setFontSize(8);
          doc.setFont('helvetica', 'italic');
          doc.setTextColor(100, 100, 100);
          doc.text(`${element.language}`, x + 5, y + 2);
          y += 8;
        } else {
          y += 5;
        }

        // Draw code content
        doc.setFontSize(10);
        doc.setFont('courier', 'normal');
        doc.setTextColor(0, 0, 0);

        element.content.forEach((line) => {
          // Check if we need a new page
          if (y > 280) {
            doc.addPage();
            y = 20;
          }

          // Split long lines
          const codeLines = doc.splitTextToSize(line, maxWidth - 20);
          codeLines.forEach((splitLine) => {
            doc.text(splitLine, x + 5, y);
            y += codeLineHeight;
          });
        });

        y += 5;
        break;

      case 'text':
        doc.setFontSize(12);

        // Improved text wrapping algorithm
        let remainingSegments = [...element.segments];
        let currentLine = [];
        let lineX = x;

        while (remainingSegments.length > 0) {
          const segment = remainingSegments[0];

          // Handle word wrapping for long segments
          if (
            segment.type === 'plain' &&
            segment.text.includes(' ') &&
            getSegmentWidth(doc, segment) > startX + maxWidth - lineX
          ) {
            // Split the segment at spaces
            const words = segment.text.split(' ');
            let currentText = '';
            let nextText = '';
            let wordIndex = 0;

            // Build up current text until it would exceed width
            while (wordIndex < words.length) {
              const testText =
                currentText + (currentText ? ' ' : '') + words[wordIndex];
              const testWidth = doc.getTextWidth(testText);

              if (lineX + testWidth <= startX + maxWidth) {
                currentText = testText;
                wordIndex++;
              } else {
                break;
              }
            }

            // Remaining words go to next text
            if (wordIndex < words.length) {
              nextText = words.slice(wordIndex).join(' ');
            }

            // Add current text to this line
            if (currentText) {
              currentLine.push({
                type: 'plain',
                text: currentText,
                x: lineX,
              });

              lineX += doc.getTextWidth(currentText);
            }

            // Replace current segment with remaining text for next line
            if (nextText) {
              remainingSegments[0] = {
                type: 'plain',
                text: nextText,
              };
            } else {
              remainingSegments.shift();
            }

            // If we processed some words, go to next segment
            if (currentText) {
              continue;
            }
          }

          // Normal segment processing
          const segmentWidth = getSegmentWidth(doc, segment);

          // If this segment would exceed the line width, start a new line
          if (lineX + segmentWidth > startX + maxWidth) {
            // Render the current line
            renderTextLine(doc, currentLine, x, y);

            // Reset for next line
            y += 6;
            lineX = x;
            currentLine = [];
          }

          // Add segment to current line
          currentLine.push({ ...segment, x: lineX });
          lineX += segmentWidth;

          // Remove processed segment
          remainingSegments.shift();
        }

        // Render any remaining line
        if (currentLine.length > 0) {
          renderTextLine(doc, currentLine, x, y);
          y += 6;
        }
        break;

      case 'empty':
        y += 4;
        break;
    }

    // Check if we need a new page for the next element
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
  });

  return y; // Return the new Y position
};

// Helper to render a text segment with proper formatting
const renderTextSegment = (doc, segment, x, y) => {
  switch (segment.type) {
    case 'plain':
      doc.setFont('helvetica', 'normal');
      break;
    case 'bold':
      doc.setFont('helvetica', 'bold');
      break;
    case 'italic':
      doc.setFont('helvetica', 'italic');
      break;
    case 'link':
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 255);
      break;
  }

  doc.text(segment.text, x, y);

  // Reset color if it was a link
  if (segment.type === 'link') {
    doc.setTextColor(0, 0, 0);
  }
};

// Helper to render a line of text segments
const renderTextLine = (doc, lineSegments, x, y) => {
  lineSegments.forEach((segment) => {
    renderTextSegment(doc, segment, segment.x, y);
  });
};

// Helper to get the width of a segment
const getSegmentWidth = (doc, segment) => {
  switch (segment.type) {
    case 'bold':
      doc.setFont('helvetica', 'bold');
      break;
    case 'italic':
      doc.setFont('helvetica', 'italic');
      break;
    case 'link':
    case 'plain':
      doc.setFont('helvetica', 'normal');
      break;
  }

  return doc.getTextWidth(segment.text);
};

const generatePDF = (messagesByCategory, uid) => {
  // Create a new PDF document with more restrictive margins
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  // Define page dimensions and margins
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40; // Increased margin
  const contentWidth = pageWidth - margin * 2; // More narrow content area
  const startX = margin;
  let y = margin + 10; // Start lower for better top margin

  // Add title with proper wrapping
  doc.setFontSize(16); // Slightly smaller title
  doc.setFont('helvetica', 'bold');
  const titleText = `Chat History`;
  const titleLines = doc.splitTextToSize(titleText, contentWidth);
  doc.text(titleLines, startX, y);
  y += titleLines.length * 20 + 10;

  // Loop through each category
  Object.entries(messagesByCategory).forEach(([category, messages]) => {
    // Check if we need a new page
    if (y > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }

    // Add category header with proper wrapping
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    const categoryText = `Category: ${category}`;
    const categoryLines = doc.splitTextToSize(categoryText, contentWidth);
    doc.text(categoryLines, startX, y);
    y += categoryLines.length * 18 + 10;

    // Add each message
    messages.forEach((message) => {
      // Check if we need a new page
      if (y > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }

      // Format based on message role
      if (message.role === 'user') {
        // User message header
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('User:', startX, y);
        y += 20;

        // User message content with proper wrapping
        doc.setFont('helvetica', 'normal');
        const userContentLines = doc.splitTextToSize(
          message.content,
          contentWidth - 20
        );

        // Handle page breaks for long content
        for (let i = 0; i < userContentLines.length; i++) {
          if (y > pageHeight - margin) {
            doc.addPage();
            y = margin;
          }

          doc.text(userContentLines[i], startX + 20, y);
          y += 14;
        }

        y += 10; // Space after message
      } else {
        // Assistant message header
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Assistant:', startX, y);
        y += 20;

        // For assistant messages, we'll handle markdown more carefully
        try {
          // Parse markdown content
          const parsedMarkdown = parseMarkdownForPDF(message.content);

          // Render each markdown element with proper width constraints
          parsedMarkdown.forEach((element) => {
            // Check if element would fit on current page
            const estimatedHeight = getEstimatedElementHeight(
              element,
              doc,
              contentWidth - 20
            );
            if (y + estimatedHeight > pageHeight - margin) {
              doc.addPage();
              y = margin;
            }

            // Render the element with strict width control
            y = renderMarkdownElement(
              doc,
              element,
              startX + 20,
              y,
              contentWidth - 20
            );
          });
        } catch (error) {
          // Fallback for markdown parsing errors
          console.error('Error parsing markdown:', error);
          doc.setFont('helvetica', 'normal');
          const fallbackLines = doc.splitTextToSize(
            message.content,
            contentWidth - 20
          );

          for (let i = 0; i < fallbackLines.length; i++) {
            if (y > pageHeight - margin) {
              doc.addPage();
              y = margin;
            }

            doc.text(fallbackLines[i], startX + 20, y);
            y += 14;
          }
        }

        y += 15; // Extra space after assistant message
      }

      y += 10; // Space between messages
    });

    y += 15; // Space between categories
  });

  // Save the PDF
  doc.save(`chat_history.pdf`);
};

// Estimate height of a markdown element
const getEstimatedElementHeight = (element, doc, maxWidth) => {
  switch (element.type) {
    case 'heading1':
      return 30;
    case 'heading2':
      return 25;
    case 'heading3':
      return 22;
    case 'listItem':
    case 'orderedListItem':
      // For list items, calculate based on text length
      doc.setFontSize(12);
      const listItemText = Array.isArray(element.text)
        ? element.text.map((s) => s.text).join('')
        : element.text;
      const listLines = doc.splitTextToSize(listItemText, maxWidth - 20); // Account for bullet indent
      return listLines.length * 16 + 5;
    case 'code':
      // Code blocks height depends on number of lines and possible wrapping
      return element.content.length * 14 + 20; // Line height plus padding
    case 'text':
      // Calculate text height based on wrapping
      doc.setFontSize(12);
      let fullText = '';
      if (Array.isArray(element.segments)) {
        fullText = element.segments.map((seg) => seg.text).join('');
      } else {
        fullText = element.text || '';
      }
      const textLines = doc.splitTextToSize(fullText, maxWidth);
      return textLines.length * 16;
    case 'empty':
      return 10;
    default:
      return 15;
  }
};

// Render a markdown element with strict width control
const renderMarkdownElement = (doc, element, x, y, maxWidth) => {
  switch (element.type) {
    case 'heading1':
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      const heading1Lines = doc.splitTextToSize(element.text, maxWidth);
      doc.text(heading1Lines, x, y);
      return y + heading1Lines.length * 20 + 5;

    case 'heading2':
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      const heading2Lines = doc.splitTextToSize(element.text, maxWidth);
      doc.text(heading2Lines, x, y);
      return y + heading2Lines.length * 18 + 5;

    case 'heading3':
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      const heading3Lines = doc.splitTextToSize(element.text, maxWidth);
      doc.text(heading3Lines, x, y);
      return y + heading3Lines.length * 16 + 5;

    case 'listItem':
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      // Draw bullet point
      doc.text('•', x, y);

      // Draw list item text with proper wrapping
      let listItemText = '';
      if (Array.isArray(element.text)) {
        listItemText = element.text.map((seg) => seg.text).join('');
      } else {
        listItemText = element.text;
      }

      const listLines = doc.splitTextToSize(listItemText, maxWidth - 15);
      let listY = y;

      for (let i = 0; i < listLines.length; i++) {
        doc.text(listLines[i], x + 15, listY);
        listY += 16;
      }

      return listY + 2;

    case 'orderedListItem':
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      // Draw number
      const numberText = `${element.number}.`;
      doc.text(numberText, x, y);

      // Calculate indent based on number width
      const numberWidth = doc.getTextWidth(numberText);
      const indent = numberWidth + 5;

      // Draw ordered list item text with proper wrapping
      let orderedItemText = '';
      if (Array.isArray(element.text)) {
        orderedItemText = element.text.map((seg) => seg.text).join('');
      } else {
        orderedItemText = element.text;
      }

      const orderedLines = doc.splitTextToSize(
        orderedItemText,
        maxWidth - indent - 5
      );
      let orderedY = y;

      for (let i = 0; i < orderedLines.length; i++) {
        doc.text(orderedLines[i], x + indent, orderedY);
        orderedY += 16;
      }

      return orderedY + 2;

    case 'code':
      doc.setFontSize(10);
      doc.setFont('courier', 'normal');

      // Draw code block background
      doc.setFillColor(240, 240, 240);

      // Calculate height based on content
      let codeContentHeight = 0;
      const processedCodeLines = [];

      // Pre-process each line to handle wrapping
      element.content.forEach((line) => {
        const wrappedLines = doc.splitTextToSize(line, maxWidth - 10);
        processedCodeLines.push(...wrappedLines);
        codeContentHeight += wrappedLines.length * 14;
      });

      const codeBlockHeight = codeContentHeight + 15;
      doc.rect(x - 5, y - 10, maxWidth + 5, codeBlockHeight, 'F');

      // Draw language label if available
      let codeY = y;
      if (element.language) {
        doc.setFontSize(8);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(100, 100, 100);
        doc.text(`${element.language}`, x, codeY);
        codeY += 12;
      }

      // Draw code content
      doc.setFontSize(10);
      doc.setFont('courier', 'normal');
      doc.setTextColor(0, 0, 0);

      processedCodeLines.forEach((line) => {
        // Check for page break
        if (codeY > doc.internal.pageSize.getHeight() - 40) {
          doc.addPage();
          codeY = 40;

          // Redraw background on new page for continuity
          const remainingLines =
            processedCodeLines.length - processedCodeLines.indexOf(line);
          const remainingHeight = remainingLines * 14 + 5;
          doc.setFillColor(240, 240, 240);
          doc.rect(x - 5, codeY - 10, maxWidth + 5, remainingHeight, 'F');
        }

        doc.text(line, x, codeY);
        codeY += 14;
      });

      return codeY + 5;

    case 'text':
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');

      // Handle text with segments
      if (Array.isArray(element.segments)) {
        let fullText = element.segments.map((seg) => seg.text).join('');
        const wrappedLines = doc.splitTextToSize(fullText, maxWidth);

        let textY = y;
        wrappedLines.forEach((line) => {
          if (textY > doc.internal.pageSize.getHeight() - 40) {
            doc.addPage();
            textY = 40;
          }

          doc.text(line, x, textY);
          textY += 16;
        });

        return textY;
      } else {
        // Simple text
        const textContent = element.text || '';
        const textLines = doc.splitTextToSize(textContent, maxWidth);

        let textY = y;
        textLines.forEach((line) => {
          if (textY > doc.internal.pageSize.getHeight() - 40) {
            doc.addPage();
            textY = 40;
          }

          doc.text(line, x, textY);
          textY += 16;
        });

        return textY;
      }

    case 'empty':
      return y + 10;

    default:
      return y + 14;
  }
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
          setIsTyping(0);
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
    setIsTyping(1);

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
        setIsTyping(0);
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
          {/* <h3 className="text-[#111478] text-lg font-bold">
            Here is some prompts for you
          </h3> */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* <div className="mb-5 max-h-[30vh] overflow-y-auto">
          {[...Array(8)].map((_, index) => (
            <p key={index} className="text-[#111478] text-sm mb-3">
              Here is some prompts for you.....
            </p>
          ))}
        </div> */}

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
              className="w-7 h-7 flex items-center justify-center bg-white rounded-lg"
              onClick={() => handleDownloadChat(sessionUid)}
            >
              <DownloadIcon className="w-3 h-3 object-contain" />
            </button>
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
                      <MessageComponent text={msg.text} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Real-time typing effect */}
            {currentAssistantMessage && (
              <div className="rounded-lg bg-white text-[#19213D] drop-shadow-sm border-l-4 border-[#19213D] w-fit max-w-[80%] text-sm p-3">
                <MessageComponent text={currentAssistantMessage} />
              </div>
            )}
          </div>

          {/* Bottom input field (shows only after user submits a message) */}
          {showInputAtBottom && (
            <div className="mb-2">
              <div className="flex flex-wrap gap-2 mb-2">
                <div
                  className={`flex p-2 py-1 ${
                    docscategory == '1'
                      ? 'text-white bg-[#19213D]'
                      : 'text-[#313131] bg-white'
                  } border  border-[#C6C6C6] rounded-full text-xs cursor-pointer`}
                  onClick={() => setDocsCategory('1')}
                >
                  • MedAsk
                </div>
                <div
                  className={`flex p-2 py-1 ${
                    docscategory == '2'
                      ? 'text-white bg-[#19213D]'
                      : 'text-[#313131] bg-white'
                  }  border  border-[#C6C6C6] rounded-full text-xs cursor-pointer`}
                  onClick={() => setDocsCategory('2')}
                >
                  • Pubmed
                </div>
                <div
                  className={`flex p-2 py-1 ${
                    docscategory == '3'
                      ? 'text-white bg-[#19213D]'
                      : 'text-[#313131] bg-white'
                  } border border-[#C6C6C6] rounded-full text-xs cursor-pointer`}
                  onClick={() => setDocsCategory('3')}
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
      <div className="h-[85vh] ms-4 w-1/5 border border-gray-300 bg-white pt-0 p-6 font-mulish rounded-2xl">
        <div className="">
          <h3 className="flex text-[#111478] text-xl font-bold mb-4 justify-between items-center">
            {/* <span>Here is some prompts for you</span> */}
            {/* <img src={minimizeicon} alt="Minimize" className="cursor-pointer" /> */}
          </h3>
          {/* <div className="mb-5 min-h-[180px] max-h-[200px] overflow-y-auto hide-scroll-bar"> */}
          {/* <p className="text-[#111478] text-base mb-3">
              Here is some prompts for you.....
            </p> */}
          {/* Repeated content simplified for clarity */}
          {/* {[...Array(10)].map((_, index) => (
              <p key={index} className="text-[#111478] text-base mb-3">
                Here is some prompts for you.....
              </p>
            ))} */}
          {/* </div> */}
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
            <div
              className="bg-white cursor-pointer h-[40px] w-[50px] p-4  flex items-center justify-center rounded-lg"
              onClick={() => {
                handleDownloadChat(sessionUid);
              }}
            >
              <DownloadIcon />
            </div>

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
                      <MessageComponent text={msg.text} />
                    </div>
                  </div>
                ))}

                <div className="text-[#19213D]  w-fit max-w-screen-sm text-base p-3" />
                {istyping ? <TypingIndicator /> : ''}
              </div>
            )}

            {/* Real-time typing effect */}
            {currentAssistantMessage && (
              <div className="rounded-lg bg-white text-[#19213D] drop-shadow-sm border-l-4 border-[#19213D] w-fit max-w-screen-sm text-base p-3">
                <MessageComponent text={currentAssistantMessage} />
              </div>
            )}
          </div>

          {/* Bottom input field (shows only after user submits a message) */}
          {showInputAtBottom && (
            <div className="flex flex-col mt-4 mb-4">
              <div className="flex flex-wrap gap-2 mb-2">
                <div
                  className={`flex p-4 py-2 ${
                    docscategory == '1'
                      ? 'text-white bg-[#19213D]'
                      : 'text-[#313131] bg-white'
                  } border border-[#C6C6C6] rounded-full cursor-pointer`}
                  onClick={() => setDocsCategory('1')}
                >
                  • MedAsk
                </div>
                <div
                  className={`flex p-4 py-2 ${
                    docscategory == '2'
                      ? 'text-white bg-[#19213D]'
                      : 'text-[#313131] bg-white'
                  } border border-[#C6C6C6] rounded-full cursor-pointer`}
                  onClick={() => setDocsCategory('2')}
                >
                  • Pubmed
                </div>
                <div
                  className={`flex p-4 py-2 ${
                    docscategory == '3'
                      ? 'text-white bg-[#19213D]'
                      : 'text-[#313131] bg-white'
                  } border border-[#C6C6C6] rounded-full cursor-pointer`}
                  onClick={() => setDocsCategory('3')}
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
