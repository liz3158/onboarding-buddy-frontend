import React, { useState, useRef, useEffect } from 'react';
import { useChatLLM } from './useChatLLM';
import DocumentPanel from './DocumentPanel';
import Button from '../../../components/common/Button';
import Toast from '../../../components/common/Toast';
import Loader from '../../../components/common/Loader';
import { BsSend, BsPaperclip, BsThreeDots, BsTrash, BsExclamationCircle, BsCheckCircle, BsHeadset, BsExclamationTriangle } from 'react-icons/bs';
import { FaRobot } from 'react-icons/fa';
import { MdOutlineHeadsetMic } from 'react-icons/md';
import ReactMarkdown from 'react-markdown';
import profileIcon from '../../../assets/icons/profileicon.png';
import './ChatWindow.css';

const ChatWindow = ({ onboardingPhase = 'orientation', userProfile = {} }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      content: "Hi there! I'm your SE onboarding assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEscalation, setShowEscalation] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [dailyTip, setDailyTip] = useState('');
  const [showDocPanel, setShowDocPanel] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  const [showEscalationPopup, setShowEscalationPopup] = useState(false);
  const [showClearPopup, setShowClearPopup] = useState(false);

  // Get the functions from the chat LLM hook
  const { 
    sendMessage, 
    isLoading, 
    relatedDocuments, 
    clearChat 
  } = useChatLLM(onboardingPhase);

  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);

  // Auto-scroll to the bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Generate daily tip based on onboarding phase
  useEffect(() => {
    generateDailyTip();
  }, [onboardingPhase]);

  const generateDailyTip = () => {
    const tips = {
      orientation: [
        "Don't forget to set up your development environment! Check the guide in the resources tab.",
        "Have you joined all the required Slack channels? Ask your buddy if you're missing any.",
        "Pro tip: Create bookmarks for all the internal tools you'll be using daily."
      ],
      training: [
        "Remember to complete today's assigned tutorials before the sync-up meeting.",
        "Stuck on a concept? Schedule a 15-minute call with your mentor for quick clarification.",
        "Try explaining what you learned today to someone else - it solidifies your understanding."
      ],
      integration: [
        "Consider setting up 1:1 coffee chats with team members to understand their roles better.",
        "Now is a good time to start documenting questions you have about the codebase.",
        "Have you reviewed our coding standards document yet? It's essential before your first PR."
      ],
      contribution: [
        "Before submitting your PR, run through our PR checklist in the Engineering Handbook.",
        "Don't be afraid to ask for help in the team channel when you're blocked.",
        "Pro tip: Add comments to your code explaining your thought process for your first few PRs."
      ]
    };

    const phaseTips = tips[onboardingPhase] || tips.orientation;
    const randomTip = phaseTips[Math.floor(Math.random() * phaseTips.length)];
    setDailyTip(randomTip);
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;
    
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsTyping(true);
    setError(null);
    
    try {
      // Send the message to the LLM service
      const response = await sendMessage(input);
      
      // Check if the AI couldn't answer properly
      if (response.confidence < 0.7) {
        setFailedAttempts(prev => prev + 1);
        
        if (failedAttempts >= 2) { // Show escalation option after 3 attempts (0, 1, 2)
          setShowEscalation(true);
        }
      } else {
        setFailedAttempts(0);
        setShowEscalation(false);
      }
      
      // Show document panel if there are related documents
      if (response.relatedDocs && response.relatedDocs.length > 0) {
        setShowDocPanel(true);
      }
      
      const aiMessage = {
        id: messages.length + 2,
        sender: 'ai',
        content: response.text,
        timestamp: new Date(),
        relatedDocs: response.relatedDocs || []
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setError({
        title: 'Connection Error',
        message: 'Sorry, I had trouble processing your request. Please try again.',
        retry: true
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEscalate = () => {
    setShowEscalationPopup(true);
  };

  const handleEscalationConfirm = () => {
    setShowEscalationPopup(false);
    displayToast({
      title: 'Support Request Sent',
      message: 'Your request has been sent to our support team. They will contact you shortly.',
      type: 'success',
      actions: [
        {
          label: 'View Status',
          onClick: () => {
            // Add your status view logic here
            console.log('Viewing support request status');
          }
        },
        {
          label: 'Dismiss',
          onClick: () => setToast(prev => ({ ...prev, show: false }))
        }
      ]
    });
  };

  const handleEscalationCancel = () => {
    setShowEscalationPopup(false);
  };

  const displayToast = (config) => {
    setToast({ 
      show: true, 
      ...config 
    });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  const handleClearChat = () => {
    setShowClearPopup(true);
  };

  const handleClearConfirm = () => {
    // Clear chat history in the hook
    clearChat();
    
    // Reset all states
    setMessages([
      {
        id: 1,
        sender: 'ai',
        content: "Hi there! I'm your SE onboarding assistant. How can I help you today?",
        timestamp: new Date(),
      }
    ]);
    setInput('');
    setIsTyping(false);
    setShowEscalation(false);
    setFailedAttempts(0);
    setError(null);
    setShowDocPanel(false);
    
    // Close the popup and show success message
    setShowClearPopup(false);
    displayToast({
      title: 'Conversation Cleared',
      message: 'Your chat history has been cleared successfully.',
      type: 'success',
      actions: [
        {
          label: 'Dismiss',
          onClick: () => setToast(prev => ({ ...prev, show: false }))
        }
      ]
    });
  };

  const handleClearCancel = () => {
    setShowClearPopup(false);
  };

  const handleRetry = () => {
    setError(null);
    handleSendMessage();
  };

  const formatTimestamp = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp);
  };

  return (
    <div className="chat-window-container">
      {toast.show && (
        <div className={`toast-notification ${toast.type}`}>
          <BsCheckCircle className="toast-icon" />
          <div className="toast-content">
            <div className="toast-title">{toast.title}</div>
            <div className="toast-message">{toast.message}</div>
            {toast.actions && (
              <div className="toast-actions">
                {toast.actions.map((action, index) => (
                  <button
                    key={index}
                    className="toast-button"
                    onClick={action.onClick}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="chat-header">
        <div className="chat-title">
          <div className="mentor-icon">
            <img src={profileIcon} alt="Help Center" />
          </div>
          <div>
            <h3>AI Assistant</h3>
            <span className="online-status">Online</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="icon-button" onClick={() => setShowDocPanel(!showDocPanel)}>
            <BsThreeDots />
          </button>
        </div>
      </div>

      <div className="chat-layout">
        <div className="chat-messages-container">
          {dailyTip && (
            <div className="daily-tip">
              <span className="tip-label">Daily Tip:</span> {dailyTip}
            </div>
          )}
          
          <div className="chat-messages">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
              >
                {message.sender === 'ai' && (
                  <div className="message-avatar">
                    <div className="ai-avatar">
                      <img src={profileIcon} alt="AI Mentor" />
                    </div>
                  </div>
                )}
                <div className="message-content">
                  {message.sender === 'user' ? (
                    <div className="message-text">{message.content}</div>
                  ) : (
                    <div className="message-text markdown-content">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  )}
                  <div className="message-time">{formatTimestamp(message.timestamp)}</div>
                </div>
              </div>
            ))}
            
            {error && (
              <div className="error-message">
                <BsExclamationCircle className="error-message-icon" />
                <div className="error-message-content">
                  <div className="error-message-title">{error.title}</div>
                  <div className="error-message-text">{error.message}</div>
                  {error.retry && (
                    <div className="error-message-actions">
                      <button className="error-message-button" onClick={handleRetry}>
                        Try Again
                      </button>
                      <button className="error-message-button" onClick={() => setError(null)}>
                        Dismiss
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {isTyping && (
              <div className="message ai-message">
                <div className="message-avatar">
                  <div className="ai-avatar">
                    <img src={profileIcon} alt="AI Mentor" />
                  </div>
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            {showEscalation && (
              <div className="escalation-prompt">
                <p>I'm having trouble answering your question properly. Would you like me to escalate this to HR or your buddy?</p>
                <div className="escalation-actions">
                  <Button 
                    label="Yes, escalate" 
                    onClick={handleEscalate} 
                    variant="primary" 
                    size="small"
                  />
                  <Button 
                    label="No, continue chatting" 
                    onClick={() => setShowEscalation(false)} 
                    variant="secondary" 
                    size="small"
                  />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chat-input-container">
            <textarea
              ref={chatInputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              rows={1}
              className="chat-input"
            />
            <div className="input-actions">
              <button 
                className="send-button" 
                onClick={handleSendMessage}
                disabled={isLoading || input.trim() === ''}
                title="Send message"
              >
                <BsSend size={20} />
              </button>
            </div>
          </div>
        </div>
        
        {showDocPanel && (
          <div className="side-panel">
            <DocumentPanel 
              documents={relatedDocuments} 
              onboardingPhase={onboardingPhase} 
              onClose={() => setShowDocPanel(false)}
            />
          </div>
        )}
      </div>
      
      <div className="chat-footer">
        <button className="footer-action" onClick={handleClearChat}>
          <BsTrash size={16} />
          Clear conversation
        </button>
        <button className="footer-action escalate-button" onClick={handleEscalate}>
          <MdOutlineHeadsetMic size={16} />
          Talk to human
        </button>
      </div>

      {showEscalationPopup && (
        <>
          <div className="escalation-popup-overlay" onClick={handleEscalationCancel} />
          <div className="escalation-popup">
            <div className="escalation-popup-header">
              <BsHeadset className="escalation-popup-icon" />
              <h3 className="escalation-popup-title">Talk to Human Support</h3>
            </div>
            <div className="escalation-popup-content">
              Would you like to connect with our human support team? They will be able to assist you with your query and provide personalized help.
            </div>
            <div className="escalation-popup-actions">
              <button 
                className="escalation-popup-button"
                onClick={handleEscalationCancel}
              >
                Cancel
              </button>
              <button 
                className="escalation-popup-button primary"
                onClick={handleEscalationConfirm}
              >
                Connect with Support
              </button>
            </div>
          </div>
        </>
      )}

      {showClearPopup && (
        <>
          <div className="clear-conversation-popup-overlay" onClick={handleClearCancel} />
          <div className="clear-conversation-popup">
            <div className="clear-conversation-popup-header">
              <BsExclamationTriangle className="clear-conversation-popup-icon" />
              <h3 className="clear-conversation-popup-title">Clear Conversation</h3>
            </div>
            <div className="clear-conversation-popup-content">
              Are you sure you want to clear this conversation? This action cannot be undone and all chat history will be permanently deleted.
            </div>
            <div className="clear-conversation-popup-actions">
              <button 
                className="clear-conversation-popup-button"
                onClick={handleClearCancel}
              >
                Cancel
              </button>
              <button 
                className="clear-conversation-popup-button primary"
                onClick={handleClearConfirm}
              >
                Clear Conversation
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWindow;