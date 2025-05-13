import React, { useState, useEffect } from 'react';
import { BsX, BsFileEarmarkText, BsSearch, BsBook } from 'react-icons/bs';
import './DocumentPanel.css';

const DocumentPanel = ({ documents = [], onboardingPhase = 'orientation', onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [recommendedDocs, setRecommendedDocs] = useState([]);
  const [activeTab, setActiveTab] = useState('recommended');

  // Phase-based document recommendations
  const phaseRecommendations = {
    orientation: [
      {
        id: 'onb-001',
        title: 'Welcome to the Engineering Team',
        type: 'handbook',
        icon: 'book',
        description: 'Overview of our engineering practices and culture.',
        url: '/docs/welcome-handbook.pdf'
      },
      {
        id: 'onb-002',
        title: 'Development Environment Setup',
        type: 'guide',
        icon: 'code',
        description: 'Step-by-step guide to set up your local environment.',
        url: '/docs/dev-setup.md'
      },
      {
        id: 'onb-003',
        title: 'Company Tools & Access',
        type: 'checklist',
        icon: 'list',
        description: 'List of tools you need access to and how to request them.',
        url: '/docs/tools-access.pdf'
      }
    ],
    training: [
      {
        id: 'tr-001',
        title: 'Architecture Overview',
        type: 'slides',
        icon: 'presentation',
        description: 'High-level overview of our system architecture.',
        url: '/docs/architecture-slides.pdf'
      },
      {
        id: 'tr-002',
        title: 'Coding Standards',
        type: 'guide',
        icon: 'code',
        description: 'Our coding standards and best practices.',
        url: '/docs/coding-standards.md'
      },
      {
        id: 'tr-003',
        title: 'Technical Terminology',
        type: 'glossary',
        icon: 'book',
        description: 'Common terms and definitions used in our codebase.',
        url: '/docs/terminology.pdf'
      }
    ],
    integration: [
      {
        id: 'int-001',
        title: 'Code Review Guidelines',
        type: 'guide',
        icon: 'code',
        description: 'How we conduct code reviews and what to expect.',
        url: '/docs/code-review.md'
      },
      {
        id: 'int-002',
        title: 'Team Structure & Responsibilities',
        type: 'handbook',
        icon: 'book',
        description: 'Overview of team roles and responsibilities.',
        url: '/docs/team-structure.pdf'
      },
      {
        id: 'int-003',
        title: 'Git Workflow',
        type: 'guide',
        icon: 'code',
        description: 'Our git branching strategy and workflow.',
        url: '/docs/git-workflow.md'
      }
    ],
    contribution: [
      {
        id: 'con-001',
        title: 'Pull Request Template',
        type: 'template',
        icon: 'code',
        description: 'Template for creating pull requests.',
        url: '/docs/pr-template.md'
      },
      {
        id: 'con-002',
        title: 'Testing Standards',
        type: 'guide',
        icon: 'code',
        description: 'How we test our code and what coverage we expect.',
        url: '/docs/testing-standards.md'
      },
      {
        id: 'con-003',
        title: 'Deployment Process',
        type: 'handbook',
        icon: 'book',
        description: 'How code gets from PR to production.',
        url: '/docs/deployment.pdf'
      }
    ]
  };

  // Set recommended docs based on onboarding phase
  useEffect(() => {
    const phaseSpecificDocs = phaseRecommendations[onboardingPhase] || phaseRecommendations.orientation;
    setRecommendedDocs(phaseSpecificDocs);
    
    if (documents.length === 0) {
      setFilteredDocs(phaseSpecificDocs);
    } else {
      // Combine conversation-related documents with phase recommendations
      // but avoid duplicates based on id
      const allIds = new Set(documents.map(doc => doc.id));
      const combinedDocs = [
        ...documents,
        ...phaseSpecificDocs.filter(doc => !allIds.has(doc.id))
      ];
      setFilteredDocs(combinedDocs);
    }
  }, [onboardingPhase, documents]);

  // Filter documents based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredDocs(activeTab === 'recommended' ? recommendedDocs : documents);
      return;
    }
    
    const docsToFilter = activeTab === 'recommended' ? recommendedDocs : documents;
    const filtered = docsToFilter.filter(doc => 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredDocs(filtered);
  }, [searchTerm, activeTab, recommendedDocs, documents]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm('');
    setFilteredDocs(tab === 'recommended' ? recommendedDocs : documents);
  };

  const getIconComponent = (iconType) => {
    switch (iconType) {
      case 'book':
        return <BsBook />;
      default:
        return <BsFileEarmarkText />;
    }
  };

  const handleOpenDocument = (doc) => {
    // In a real app, this would open the document or navigate to it
    console.log('Opening document:', doc);
    // For demo purposes, we'll just alert
    alert(`Opening document: ${doc.title}`);
  };

  return (
    <div className="document-panel">
      <div className="panel-header">
        <h3>Resources</h3>
        <button className="close-button" onClick={onClose}>
          <BsX />
        </button>
      </div>
      
      <div className="search-container">
        <BsSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'recommended' ? 'active' : ''}`}
          onClick={() => handleTabChange('recommended')}
        >
          Recommended
        </button>
        <button
          className={`tab ${activeTab === 'conversation' ? 'active' : ''}`}
          onClick={() => handleTabChange('conversation')}
        >
          From Conversation
        </button>
      </div>
      
      <div className="documents-list">
        {filteredDocs.length > 0 ? (
          filteredDocs.map((doc) => (
            <div 
              key={doc.id} 
              className="document-item"
              onClick={() => handleOpenDocument(doc)}
            >
              <div className="document-icon">
                {getIconComponent(doc.icon)}
              </div>
              <div className="document-info">
                <h4>{doc.title}</h4>
                <p>{doc.description}</p>
                <span className="document-type">{doc.type}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="no-documents">
            <p>No documents found</p>
          </div>
        )}
      </div>
      
      {activeTab === 'recommended' && (
        <div className="panel-footer">
          <p>Documents recommended for <strong>{onboardingPhase}</strong> phase</p>
        </div>
      )}
    </div>
  );
};

export default DocumentPanel;