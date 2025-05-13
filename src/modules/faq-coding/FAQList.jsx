// FQA List
import React, { useState, useEffect, useRef } from 'react';
import { smoothScrollToBottom, getMessageDelay, formatTimestamp } from '../../scripts/faq';
import '../../styles/faq.css';

const Message = ({ type, content, category = null }) => {
  const isAI = type === 'ai';
  return (
    <div className={`chat-message ${isAI ? 'received' : 'sent'}`}>
      <p className="text-sm whitespace-pre-wrap">{content}</p>
      {category && (
        <span className="text-xs text-gray-500 block mt-1">{category}</span>
      )}
      <span className="text-xs text-gray-400 block mt-1">
        {formatTimestamp(new Date())}
      </span>
    </div>
  );
};

const TypingIndicator = () => (
  <div className="typing-indicator">
    <span></span>
    <span></span>
    <span></span>
  </div>
);

const FAQList = ({ faqs }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatBoxRef = useRef(null);

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      smoothScrollToBottom(chatBoxRef.current);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial AI greeting with typing animation
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages([
        {
          type: 'ai',
          content: "Hello! 👋 I'm here to help answer your questions about coding.",
          timestamp: new Date()
        }
      ]);
    }, 1500);
  }, []);

  const handleQuestionClick = async (faq) => {
    // Add user question immediately
    setMessages(prev => [
      ...prev,
      { 
        type: 'user', 
        content: faq.question,
        timestamp: new Date()
      }
    ]);

    // Show typing indicator
    setIsTyping(true);

    // Calculate delay based on answer length
    const delay = getMessageDelay(faq.answer);

    // Add AI response after delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { 
          type: 'ai', 
          content: faq.answer, 
          category: faq.category,
          timestamp: new Date()
        }
      ]);
    }, Math.min(delay, 2000)); // Cap delay at 2 seconds
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    
    const matchingFaq = faqs.find(faq => 
      faq.question.toLowerCase().includes(userInput.toLowerCase())
    );

    // Add user message
    setMessages(prev => [
      ...prev,
      {
        type: 'user',
        content: userInput,
        timestamp: new Date()
      }
    ]);

    setUserInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      if (matchingFaq) {
        setMessages(prev => [
          ...prev,
          {
            type: 'ai',
            content: matchingFaq.answer,
            category: matchingFaq.category,
            timestamp: new Date()
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            type: 'ai',
            content: "I'm not sure about that. Here are some questions I can help with:",
            timestamp: new Date()
          }
        ]);
      }
    }, 1500);
  };

  return (
    <div className="chat-container flex flex-col h-full">
      {/* Chat Box */}
      <div className="chat-box flex-1 overflow-y-auto" ref={chatBoxRef}>
        {messages.map((message, index) => (
          <Message 
            key={index} 
            type={message.type} 
            content={message.content} 
            category={message.category}
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
        
        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="suggested-questions">
            {faqs.slice(0, 5).map((faq) => (
              <button
                key={faq.id}
                onClick={() => handleQuestionClick(faq)}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <p className="text-sm text-gray-800">{faq.question}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* User Input */}
      <div className="user-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your question..."
        />
        <button onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default FAQList;
