import React from "react";

const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-2 p-2">
      <div className="flex space-x-1">
        <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></span>
        <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
        <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
      </div>
    </div>
  );
};

export default TypingIndicator;
