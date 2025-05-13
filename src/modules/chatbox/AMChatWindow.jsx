import React, { useState, useRef, useEffect } from 'react';
import AMDocumentPanel from './AMDocumentPanel';
import AMProfilePanel from './AMProfilePanel';
import AMuseChatLLM from './AMuseChatLLM';
import Button from '../../../components/common/Button';
import Toast from '../../../components/common/Toast';
import Loader from '../../../components/common/Loader';
import { BsSend, BsPaperclip, BsThreeDots } from 'react-icons/bs';
import { FaRobot } from 'react-icons/fa';
import { MdOutlineHeadsetMic } from 'react-icons/md';
import ReactMarkdown from 'react-markdown';
import './AMChatWindow.css';

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

  // Get the functions from the chat LLM hook
  const { 
    sendMessage, 
    isLoading, 
    relatedDocuments, 
    clearChat 
  } = AMuseChatLLM(onboardingPhase);

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
      setToastMessage('Sorry, I had trouble processing your request. Please try again.');
      setShowToast(true);
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
    setToastMessage('Your question has been sent to HR and your buddy. They will contact you soon.');
    setShowToast(true);
    setShowEscalation(false);
  };

  const handleClearChat = () => {
    // Reset messages to initial welcome message
    setMessages([
      {
        id: 1,
        sender: 'ai',
        content: "Hi there! I'm your SE onboarding assistant. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
    // Clear chat history in the hook
    clearChat();
    // Show a toast notification
    setToastMessage('Conversation cleared');
    setShowToast(true);
  };

  const formatTimestamp = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp);
  };

  return (
    <div className="chat-window-container">
      {showToast && (
        <Toast 
          message={toastMessage} 
          type="info" 
          onClose={() => setShowToast(false)} 
          duration={6000}
        />
      )}
      
      <div className="chat-header">
        <div className="chat-title">
          <div className="mentor-icon">
            🤖
          </div>
          <div>
            <h3>SE Onboarding Assistant</h3>
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
                <div className="message-avatar">
                  {message.sender === 'user' ? (
                    <div className="user-avatar">👱‍♂️</div>
                  ) : (
                    <div className="ai-avatar">
                      🤖
                    </div>
                  )}
                </div>
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
            
            {isTyping && (
              <div className="message ai-message">
                <div className="message-avatar">
                  <div className="ai-avatar">
                    🤖
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
              placeholder="Ask me anything about your onboarding..."
              rows={1}
              className="chat-input"
            />
            <div className="input-actions">
              <button className="icon-button">
                <BsPaperclip />
              </button>
              <button 
                className="send-button" 
                onClick={handleSendMessage}
                disabled={isLoading || input.trim() === ''}
              >
                {isLoading ? <Loader size="small" /> : <BsSend />}
              </button>
            </div>
          </div>
        </div>
        
        {showDocPanel && (
          <div className="side-panel">
            <AMDocumentPanel 
              documents={relatedDocuments} 
              onboardingPhase={onboardingPhase} 
              onClose={() => setShowDocPanel(false)}
            />
          </div>
        )}
      </div>
      
      <div className="chat-footer">
        <button className="footer-action" onClick={handleClearChat}>
          Clear conversation
        </button>
        <button className="footer-action escalate-button" onClick={handleEscalate}>
          <MdOutlineHeadsetMic /> Talk to human
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;