import React from 'react';
import { BsSearch, BsBook, BsHeadset, BsRobot, BsCalendar, BsQuestionCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import './AMHelpCenter.scss';

const AMHelpCenter = () => {
  const navigate = useNavigate();

  return (
    <div className="help-center">
      <div className="help-center-content">
        <div className="help-center-header">
          <h1>Help Center</h1>
          <p>Find answers, guides, and support for your onboarding journey.</p>
        </div>

        <div className="help-center-grid">
          <div className="help-card search-card">
            <div className="card-icon">
              <BsSearch />
            </div>
            <h3>Quick Search</h3>
            <p>Search through our knowledge base for instant answers to your questions.</p>
            <button className="card-button">Search Now</button>
          </div>

          <div className="help-card knowledge-card">
            <div className="card-icon">
              <BsBook />
            </div>
            <h3>Knowledge Base</h3>
            <p>Access comprehensive guides and documentation about our platform.</p>
            <button 
              className="card-button"
              onClick={() => navigate('/user/guidebook')}
            >
              Browse Articles
            </button>
          </div>

          <div className="help-card support-card">
            <div className="card-icon">
              <BsHeadset />
            </div>
            <h3>Live Support</h3>
            <p>Get real-time assistance from our support team via chat or email.</p>
            <button className="card-button">Contact Support</button>
          </div>

          <div className="help-card ai-card">
            <div className="card-icon">
              <BsRobot />
            </div>
            <h3>AI Assistant</h3>
            <p>Chat with our AI assistant for instant help and guidance.</p>
            <button 
              className="card-button"
              onClick={() => navigate('/user/virtual-mentor')}
            >
              Start Chat
            </button>
          </div>

          <div className="help-card schedule-card">
            <div className="card-icon">
              <BsCalendar />
            </div>
            <h3>Schedule Support</h3>
            <p>Book a session with our experts for personalized assistance.</p>
            <button className="card-button">Book Now</button>
          </div>

          <div className="help-card faq-card">
            <div className="card-icon">
              <BsQuestionCircle />
            </div>
            <h3>FAQs</h3>
            <p>Find answers to common questions about our platform and services.</p>
            <button 
              className="card-button"
              onClick={() => navigate('/user/faq')}
            >
              View FAQs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AMHelpCenter; 