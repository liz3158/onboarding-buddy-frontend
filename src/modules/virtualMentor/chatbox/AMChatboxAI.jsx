import React, { useState, useEffect } from 'react';
import { BsChatDots, BsX, BsBook, BsPeople, BsGear } from 'react-icons/bs';
import { MdOutlineOpenInFull, MdOutlineCloseFullscreen } from 'react-icons/md';
import AMChatWindow from './AMChatWindow';
import AMDocumentPanel from './AMDocumentPanel';
import AMProfilePanel from './AMProfilePanel';
import { useChatLLM } from './AMuseChatLLM';
import './AMChatboxAI.css';

const ChatboxAI = ({ userProfile, onboardingPhase = 'orientation', initialOpen = false, onClose }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');

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
    if (!initialOpen) {
      setIsOpen(false);
      setIsMinimized(false);
      setIsEnlarged(false);
      if (onClose) {
        onClose();
      }
    } else {
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <AMChatWindow
            onboardingPhase={onboardingPhase}
            userProfile={userProfile}
          />
        );
      case 'onboarding':
        return (
          <AMDocumentPanel
            type="onboarding"
            userProfile={userProfile}
          />
        );
      case 'teams':
        return (
          <AMDocumentPanel
            type="teams"
            userProfile={userProfile}
          />
        );
      case 'policies':
        return (
          <AMDocumentPanel
            type="policies"
            userProfile={userProfile}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
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

      {isOpen && (
        <div className={`chatbox-container ${isMinimized ? 'minimized' : ''} ${initialOpen ? 'from-sidebar' : ''} ${isEnlarged ? 'enlarged' : ''}`}>
          <div className="chatbox-header">
            <h3>AI Mentor</h3>
            <div className="chatbox-tabs">
              <button 
                className={`tab-button ${activeTab === 'chat' ? 'active' : ''}`}
                onClick={() => setActiveTab('chat')}
                title="Chat with AI Mentor"
              >
                <BsChatDots />
                <span>Chat</span>
              </button>
              <button 
                className={`tab-button ${activeTab === 'onboarding' ? 'active' : ''}`}
                onClick={() => setActiveTab('onboarding')}
                title="Onboarding Resources"
              >
                <BsBook />
                <span>Onboarding</span>
              </button>
              <button 
                className={`tab-button ${activeTab === 'teams' ? 'active' : ''}`}
                onClick={() => setActiveTab('teams')}
                title="Team Information"
              >
                <BsPeople />
                <span>Teams</span>
              </button>
              <button 
                className={`tab-button ${activeTab === 'policies' ? 'active' : ''}`}
                onClick={() => setActiveTab('policies')}
                title="Company Policies"
              >
                <BsGear />
                <span>Policies</span>
              </button>
            </div>
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
            {renderTabContent()}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatboxAI;