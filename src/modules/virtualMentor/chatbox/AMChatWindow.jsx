import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import AMDocumentPanel from './AMDocumentPanel';
import AMProfilePanel from './AMProfilePanel';
import { useChatLLM } from './AMuseChatLLM';
import Button from '../../../components/common/Button';
import Toast from '../../../components/common/Toast';
import Loader from '../../../components/common/Loader';
import { BsSend, BsPaperclip, BsThreeDots, BsImage, BsPerson, BsRobot } from 'react-icons/bs';
import { FaRobot } from 'react-icons/fa';
import { MdOutlineHeadsetMic } from 'react-icons/md';
import ReactMarkdown from 'react-markdown';
import ChartMessage from './AMChartMessage';
import './AMChatWindow.css';

// Memoized message component to prevent unnecessary re-renders
const Message = memo(({ message, formatTimestamp }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`message ${isUser ? 'user-message' : 'ai-message'}`}>
      {!isUser && (
        <div className="message-avatar">
          <img src="/src/assets/icons/VMprofile.png" alt="Virtual Mentor" className="mentor-avatar" />
        </div>
      )}
      <div className="message-content">
        {message.content ? (
          <ReactMarkdown
            components={{
              img: ({ node, ...props }) => (
                <div className="message-image-container">
                  <img className="message-image" {...props} alt={props.alt || 'Generated image'} />
                </div>
              ),
              code: ({ node, inline, className, children, ...props }) => {
                if (inline) {
                  return <code className={className} {...props}>{children}</code>;
                }
                try {
                  // Try to parse as JSON for potential chart data
                  const jsonData = JSON.parse(children);
                  if (jsonData.type && jsonData.labels && jsonData.data) {
                    return <ChartMessage data={jsonData} />;
                  }
                } catch (e) {
                  // Not JSON or not chart data, render as code block
                  return (
                    <div className="code-block-container">
                      <pre className="code-block">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    </div>
                  );
                }
              }
            }}
          >
            {message.content}
          </ReactMarkdown>
        ) : message.visualization ? (
          <ChartMessage data={message.visualization} />
        ) : null}
        <div className="message-time">{formatTimestamp(message.timestamp)}</div>
      </div>
    </div>
  );
});

Message.displayName = 'Message';

const ChatWindow = ({ onboardingPhase = 'orientation', userProfile = {} }) => {
  // Separate state for submitted messages and current input
  const [submittedMessages, setSubmittedMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: "Hi there! I'm your SE onboarding assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [typingInput, setTypingInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEscalation, setShowEscalation] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [dailyTip, setDailyTip] = useState('');
  const [showDocPanel, setShowDocPanel] = useState(false);

  const { 
    sendMessage, 
    isLoading, 
    isGeneratingImage,
    relatedDocuments, 
    clearChat,
    error
  } = useChatLLM(onboardingPhase);

  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);

  // Memoized format timestamp function
  const formatTimestamp = useCallback((timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp);
  }, []);

  // Auto-scroll to bottom when submitted messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [submittedMessages]);

  useEffect(() => {
    generateDailyTip();
  }, [onboardingPhase]);

  const generateDailyTip = useCallback(() => {
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
  }, [onboardingPhase]);

  const handleSendMessage = async () => {
    if (!typingInput.trim()) return;
    
    const userMessage = {
      id: submittedMessages.length + 1,
      role: 'user',
      content: typingInput,
      timestamp: new Date(),
    };
    
    setSubmittedMessages(prev => [...prev, userMessage]);
    setTypingInput('');
    setIsTyping(true);
    
    try {
      const response = await sendMessage(typingInput);
      
      if (response.confidence < 0.7 && failedAttempts >= 2) {
        setShowEscalation(true);
        setFailedAttempts(0);
      } else {
        setFailedAttempts(0);
      }
      
      const aiMessage = {
        id: submittedMessages.length + 2,
        role: 'assistant',
        content: response.text,
        timestamp: new Date(),
      };
      
      setSubmittedMessages(prev => [...prev, aiMessage]);
      
      if (response.relatedDocs?.length > 0) {
        setToastMessage(`I found ${response.relatedDocs.length} relevant documents for you.`);
        setShowToast(true);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setFailedAttempts(prev => prev + 1);
      
      const errorMessage = {
        id: submittedMessages.length + 2,
        role: 'assistant',
        content: "I'm sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
      };
      
      setSubmittedMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const handleClearChat = useCallback(() => {
    setSubmittedMessages([
      {
        id: 1,
        role: 'assistant',
        content: "Hi there! I'm your SE onboarding assistant. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
    clearChat();
    setToastMessage('Conversation cleared');
    setShowToast(true);
  }, [clearChat]);

  const handleEscalate = () => {
    setToastMessage('Your question has been sent to HR and your buddy. They will contact you soon.');
    setShowToast(true);
    setShowEscalation(false);
  };

  return (
    <div className="chat-window-container">
      {showToast && (
        <div className="toast-container">
          <div className="toast-content">
            <div className="toast-icon">
              {toastMessage.includes('cleared') ? '🗑️' : '👥'}
            </div>
            <div className="toast-message">
              <h4>{toastMessage.includes('cleared') ? 'Conversation Cleared' : 'Human Support Requested'}</h4>
              <p>{toastMessage}</p>
            </div>
            <button className="toast-close" onClick={() => setShowToast(false)}>
              ✕
            </button>
          </div>
        </div>
      )}
      
      <div className="chat-header">
        <div className="chat-title">
          <div className="mentor-icon">
            <img src="/src/assets/icons/VMprofile.png" alt="Virtual Mentor" className="mentor-avatar" />
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
            {submittedMessages.map((message, index) => (
              <Message
                key={message.id}
                message={message}
                formatTimestamp={formatTimestamp}
              />
            ))}
            
            {isTyping && (
              <div className="message ai-message">
                <div className="message-avatar">
                  <img src="/src/assets/icons/VMprofile.png" alt="Virtual Mentor" className="mentor-avatar" />
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
            
            {isGeneratingImage && (
              <div className="message ai-message">
                <div className="message-avatar">
                  <img src="/src/assets/icons/VMprofile.png" alt="Virtual Mentor" className="mentor-avatar" />
                </div>
                <div className="message-content">
                  <div className="image-generation-indicator">
                    <BsImage className="image-icon" />
                    <span>Generating image...</span>
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
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chat-input-container">
            <textarea
              ref={chatInputRef}
              value={typingInput}
              onChange={(e) => setTypingInput(e.target.value)}
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
                disabled={isLoading || typingInput.trim() === ''}
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
          <span className="action-icon">🗑️</span>
          Clear conversation
        </button>
        <button className="footer-action escalate-button" onClick={handleEscalate}>
          <span className="action-icon">👥</span>
          Talk to human
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;