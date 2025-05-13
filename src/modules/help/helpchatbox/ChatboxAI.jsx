import React, { useState, useEffect } from 'react';
import { BsChatDots, BsX } from 'react-icons/bs';
import { MdOutlineOpenInFull, MdOutlineCloseFullscreen } from 'react-icons/md';
import ChatWindow from './ChatWindow';
import './ChatboxAI.css';

const ChatboxAI = ({ userProfile, onboardingPhase = 'orientation', initialOpen = false, onClose }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);

  useEffect(() => {
    setIsOpen(initialOpen);
  }, [initialOpen]);

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const minimizeChat = (e) => {
    e.stopPropagation();
    setIsMinimized(true);
    setIsEnlarged(false);
  };

  const closeChat = (e) => {
    e.stopPropagation();
    // Only allow closing if not in Virtual Mentor page (initialOpen is false)
    if (!initialOpen) {
      setIsOpen(false);
      setIsMinimized(false);
      setIsEnlarged(false);
      if (onClose) {
        onClose();
      }
    } else {
      // If in Virtual Mentor page, just minimize instead of closing
      minimizeChat(e);
    }
  };

  const toggleSize = (e) => {
    e.stopPropagation();
    setIsEnlarged(!isEnlarged);
    if (isMinimized) {
      setIsMinimized(false);
    }
  };

  return (
    <>
      {/* Floating chat icon button - only show when not opened from sidebar */}
      {!initialOpen && (
        <button 
          className={`chat-toggle-button ${isOpen ? 'open' : ''}`}
          onClick={toggleChat}
          aria-label="Toggle Chat Assistant"
        >
          {isMinimized ? (
            <div className="minimized-preview">
              <BsChatDots />
              <span className="minimized-text">Chat with AI Mentor</span>
            </div>
          ) : (
            <BsChatDots />
          )}
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className={`chatbox-container ${isMinimized ? 'minimized' : ''} ${initialOpen ? 'from-sidebar' : ''} ${isEnlarged ? 'enlarged' : ''}`}>
          <div className="chatbox-header">
            <h3>Help Center</h3>
            <div className="chatbox-controls">
              <button 
                className="control-button" 
                onClick={toggleSize}
                title={isEnlarged ? "Minimize window" : "Enlarge window"}
              >
                {isEnlarged ? <MdOutlineCloseFullscreen size={20} /> : <MdOutlineOpenInFull size={20} />}
              </button>
              <button 
                className="control-button" 
                onClick={minimizeChat}
                title="Minimize chat"
              >
                <span className="minimize-icon"></span>
              </button>
              {!initialOpen && (
                <button 
                  className="control-button close" 
                  onClick={closeChat}
                  title="Close chat"
                >
                  <BsX size={20} />
                </button>
              )}
            </div>
          </div>
          
          <div className="chatbox-content">
            <ChatWindow
              onboardingPhase={onboardingPhase}
              userProfile={userProfile}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatboxAI;