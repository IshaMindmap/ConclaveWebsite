import { useEffect } from "react";
import { renderMessage } from "./MarkedRenderer"; 

const MessageComponent = ({ text }) => {
  useEffect(() => {
    document.querySelectorAll(".message-link").forEach((link) => {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });
  }, [text]); 

  return <div 
  className="message-content"
  dangerouslySetInnerHTML={renderMessage(text)} 
  />;
};

export default MessageComponent;
