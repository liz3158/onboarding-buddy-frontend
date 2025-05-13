import React, { useState, useEffect } from 'react';
import { BsX, BsFileEarmarkText, BsSearch, BsBook, BsTools, BsCodeSlash, BsClipboardCheck, BsPeople, BsExclamationTriangle, BsLightbulb, BsGraphUp, BsChatDots, BsSearch as BsSearchIcon, BsTrophy, BsCheckCircle, BsQuestionCircle, BsListCheck, BsDiagram3, BsCode, BsFolder, BsFileCode, BsArrowLeftRight, BsLightning } from 'react-icons/bs';
import './AMDocumentPanel.css';

const DocumentPanel = ({ type = 'onboarding', documents = [], onboardingPhase = 'orientation', onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [recommendedDocs, setRecommendedDocs] = useState([]);
  const [activeTab, setActiveTab] = useState('recommended');
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSetupTab, setActiveSetupTab] = useState('instructions');
  const [activeArchitectureTab, setActiveArchitectureTab] = useState('overview');

  // Onboarding categories with icons
  const onboardingCategories = [
    { id: 'technicalSetup', title: 'Technical Setup', icon: <BsTools />, description: 'Getting your development environment ready' },
    { id: 'architecture', title: 'Architecture & Codebase', icon: <BsCodeSlash />, description: 'Understanding our system architecture and codebase' },
    { id: 'processes', title: 'Processes & Standards', icon: <BsClipboardCheck />, description: 'Understanding our development processes and standards' },
    { id: 'teamNorms', title: 'Team Norms', icon: <BsPeople />, description: 'Understanding our team culture and practices' },
    { id: 'troubleshooting', title: 'Troubleshooting', icon: <BsExclamationTriangle />, description: 'Common issues and how to resolve them' },
    { id: 'learningPathways', title: 'Learning Pathways', icon: <BsLightbulb />, description: 'Resources to help you grow and learn' },
    { id: 'careerGoals', title: 'Career Goals', icon: <BsGraphUp />, description: 'Setting and tracking your career development' },
    { id: 'emotionalSupport', title: 'Emotional Support', icon: <BsChatDots />, description: 'Resources for work-life balance and well-being' },
    { id: 'findingInformation', title: 'Finding Information', icon: <BsSearchIcon />, description: 'Where to find various types of information' },
    { id: 'performanceFeedback', title: 'Performance Feedback', icon: <BsTrophy />, description: 'Understanding and tracking your performance' }
  ];

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

  const renderOnboardingCategories = () => {
    return (
      <div className="categories-container">
        <h3>Onboarding Categories</h3>
        <div className="categories-grid">
          {onboardingCategories.map(category => (
            <div 
              key={category.id}
              className={`category-card ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <div className="category-icon">
                {category.icon}
              </div>
              <div className="category-info">
                <h4>{category.title}</h4>
                <p>{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTeamsInfo = () => {
    return (
      <div className="teams-container">
        <h3>Team Information</h3>
        <div className="team-section">
          <h4>Engineering Team</h4>
          <div className="team-info">
            <p><strong>Structure:</strong> Agile teams with 5-8 members</p>
            <p><strong>Department Lead:</strong> John Smith (Engineering Director)</p>
            <div className="team-leads">
              <h5>Team Leads:</h5>
              <ul>
                <li>Sarah Johnson (Frontend Lead)</li>
                <li>Mike Chen (Backend Lead)</li>
                <li>Lisa Wong (DevOps Lead)</li>
              </ul>
            </div>
            <div className="team-practices">
              <h5>Team Practices:</h5>
              <ul>
                <li>Daily standups</li>
                <li>Weekly team meetings</li>
                <li>Bi-weekly retrospectives</li>
                <li>Code review requirements</li>
                <li>Testing standards</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPoliciesInfo = () => {
    return (
      <div className="policies-container">
        <h3>Company Policies</h3>
        <div className="policy-sections">
          <div className="policy-section">
            <h4>Work Hours</h4>
            <ul>
              <li><strong>Standard:</strong> 9 AM to 5 PM</li>
              <li><strong>Flexibility:</strong> Core hours 10 AM to 4 PM</li>
              <li><strong>Remote:</strong> Hybrid work model available</li>
            </ul>
          </div>
          <div className="policy-section">
            <h4>Communication</h4>
            <ul>
              <li><strong>Primary:</strong> Slack for real-time communication</li>
              <li><strong>Email:</strong> Outlook for formal communication</li>
              <li><strong>Meetings:</strong> Microsoft Teams for video calls</li>
            </ul>
          </div>
          <div className="policy-section">
            <h4>Development</h4>
            <ul>
              <li><strong>Version Control:</strong> Git with GitHub</li>
              <li><strong>Branching:</strong> GitFlow workflow</li>
              <li><strong>Deployment:</strong> CI/CD with GitHub Actions</li>
              <li><strong>Environments:</strong> Development, Staging, Production</li>
            </ul>
          </div>
          <div className="policy-section">
            <h4>Security</h4>
            <ul>
              <li><strong>Access:</strong> Role-based access control</li>
              <li><strong>Authentication:</strong> SSO with company email</li>
              <li><strong>Data:</strong> Data classification and handling policies</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderTechnicalSetup = () => {
    const technicalSetup = companyInfo.onboarding.categories.technicalSetup;
    
    return (
      <div className="technical-setup-container">
        <h3>Technical Setup Guide</h3>
        
        <div className="setup-tabs">
          <button 
            className={`setup-tab ${activeSetupTab === 'instructions' ? 'active' : ''}`}
            onClick={() => setActiveSetupTab('instructions')}
          >
            <BsListCheck className="tab-icon" />
            Setup Instructions
          </button>
          <button 
            className={`setup-tab ${activeSetupTab === 'faqs' ? 'active' : ''}`}
            onClick={() => setActiveSetupTab('faqs')}
          >
            <BsQuestionCircle className="tab-icon" />
            FAQs
          </button>
          <button 
            className={`setup-tab ${activeSetupTab === 'checklist' ? 'active' : ''}`}
            onClick={() => setActiveSetupTab('checklist')}
          >
            <BsCheckCircle className="tab-icon" />
            Validation Checklist
          </button>
        </div>
        
        <div className="setup-content">
          {activeSetupTab === 'instructions' && (
            <div className="setup-instructions">
              {technicalSetup.setupInstructions.map((step) => (
                <div key={step.step} className="setup-step">
                  <div className="step-header">
                    <span className="step-number">{step.step}</span>
                    <h4>{step.title}</h4>
                  </div>
                  <ul className="step-instructions">
                    {step.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ul>
                  <div className="step-validation">
                    <strong>Validation:</strong> {step.validation}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeSetupTab === 'faqs' && (
            <div className="setup-faqs">
              {technicalSetup.faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <h4 className="faq-question">{faq.question}</h4>
                  <div className="faq-answer">{faq.answer}</div>
                </div>
              ))}
            </div>
          )}
          
          {activeSetupTab === 'checklist' && (
            <div className="setup-checklist">
              {technicalSetup.validationChecklist.map((category, index) => (
                <div key={index} className="checklist-category">
                  <h4>{category.category}</h4>
                  <ul className="checklist-items">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="checklist-item">
                        <div className="checkbox-wrapper">
                          <input type="checkbox" id={`check-${index}-${itemIndex}`} />
                          <label htmlFor={`check-${index}-${itemIndex}`}>{item.text}</label>
                        </div>
                        {item.command && item.command !== 'N/A' && (
                          <div className="command-hint">
                            <code>{item.command}</code>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderArchitectureAndCodebase = () => {
    const architectureTabs = [
      { id: 'overview', label: 'System Overview', icon: <BsDiagram3 /> },
      { id: 'dataflow', label: 'Data Flow', icon: <BsArrowLeftRight /> },
      { id: 'code', label: 'Code Structure', icon: <BsCode /> },
      { id: 'patterns', label: 'Code Patterns', icon: <BsLightning /> },
      { id: 'decisions', label: 'Architecture Decisions', icon: <BsClipboardCheck /> }
    ];

    const renderArchitectureContent = () => {
      switch (activeArchitectureTab) {
        case 'overview':
          return (
            <div className="architecture-content">
              <h3>System Architecture Overview</h3>
              <div className="architecture-diagram">
                <img 
                  src="https://miro.medium.com/max/1400/1*Q5cJ8yGX7_8u8c_8u8c_8uA.png" 
                  alt="System Architecture Overview"
                  className="architecture-image"
                />
              </div>
              <div className="architecture-description">
                <p>Our application follows a modern microservices architecture with the following key components:</p>
                <ul>
                  <li>Frontend: React-based SPA</li>
                  <li>API Gateway: Node.js/Express</li>
                  <li>Authentication Service: JWT-based auth</li>
                  <li>Core Services: User, Content, Analytics</li>
                  <li>Databases: MongoDB, PostgreSQL</li>
                </ul>
              </div>
            </div>
          );
        case 'dataflow':
          return (
            <div className="architecture-content">
              <h3>Data Flow Patterns</h3>
              <div className="architecture-diagram">
                <img 
                  src="https://www.confluent.io/wp-content/uploads/data-flow-diagram.png" 
                  alt="Data Flow Diagram"
                  className="architecture-image"
                />
              </div>
              <div className="architecture-description">
                <p>Key data flow patterns in our system:</p>
                <ul>
                  <li>Event-driven communication between services</li>
                  <li>Message queues for async processing</li>
                  <li>Real-time data streaming for analytics</li>
                  <li>Caching layers for performance</li>
                </ul>
              </div>
            </div>
          );
        case 'code':
          return (
            <div className="architecture-content">
              <h3>Codebase Structure</h3>
              <div className="architecture-diagram">
                <img 
                  src="https://miro.medium.com/max/1400/1*Q5cJ8yGX7_8u8c_8u8c_8uA.png" 
                  alt="Codebase Structure"
                  className="architecture-image"
                />
              </div>
              <div className="code-structure">
                <div className="folder-tree">
                  <div className="folder">
                    <BsFolder /> src/
                    <div className="folder">
                      <BsFolder /> modules/
                      <div className="folder">
                        <BsFolder /> auth/
                        <div className="file"><BsFileCode /> AuthService.js</div>
                        <div className="file"><BsFileCode /> LoginForm.jsx</div>
                      </div>
                      <div className="folder">
                        <BsFolder /> user/
                        <div className="file"><BsFileCode /> UserService.js</div>
                        <div className="file"><BsFileCode /> Profile.jsx</div>
                      </div>
                    </div>
                    <div className="folder">
                      <BsFolder /> shared/
                      <div className="folder">
                        <BsFolder /> components/
                        <div className="file"><BsFileCode /> Button.jsx</div>
                        <div className="file"><BsFileCode /> Input.jsx</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        case 'patterns':
          return (
            <div className="architecture-content">
              <h3>Code Patterns</h3>
              <div className="architecture-diagram">
                <img 
                  src="https://miro.medium.com/max/1400/1*Q5cJ8yGX7_8u8c_8u8c_8uA.png" 
                  alt="Code Patterns"
                  className="architecture-image"
                />
              </div>
              <div className="code-patterns">
                <div className="pattern">
                  <h4>Service Layer Pattern</h4>
                  <pre className="code-block">
                    <code>
                      {`class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  
  async getUserById(id) {
    return this.userRepository.findById(id);
  }
}`}
                    </code>
                  </pre>
                </div>
                <div className="pattern">
                  <h4>Repository Pattern</h4>
                  <pre className="code-block">
                    <code>
                      {`class UserRepository {
  constructor(database) {
    this.database = database;
  }
  
  async findById(id) {
    return this.database.users.findOne({ _id: id });
  }
}`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          );
        case 'decisions':
          return (
            <div className="architecture-content">
              <h3>Architecture Decisions</h3>
              <div className="architecture-diagram">
                <img 
                  src="https://miro.medium.com/max/1400/1*Q5cJ8yGX7_8u8c_8u8c_8uA.png" 
                  alt="Architecture Decisions"
                  className="architecture-image"
                />
              </div>
              <div className="architecture-decisions">
                <div className="decision">
                  <h4>Microservices Architecture</h4>
                  <p>Chosen for scalability and independent deployment</p>
                  <ul>
                    <li>Pros: Independent scaling, fault isolation</li>
                    <li>Cons: Increased complexity, deployment challenges</li>
                  </ul>
                </div>
                <div className="decision">
                  <h4>React for Frontend</h4>
                  <p>Selected for component reusability and performance</p>
                  <ul>
                    <li>Pros: Virtual DOM, large ecosystem</li>
                    <li>Cons: Learning curve, bundle size</li>
                  </ul>
                </div>
              </div>
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <div className="architecture-section">
        <div className="architecture-tabs">
          {architectureTabs.map(tab => (
            <button
              key={tab.id}
              className={`architecture-tab ${activeArchitectureTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveArchitectureTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
        <div className="architecture-content-container">
          {renderArchitectureContent()}
        </div>
      </div>
    );
  };

  const renderProcessesAndStandards = () => {
    return (
      <div className="processes-container">
        <h3>Processes & Standards</h3>
        <div className="process-sections">
          <div className="process-section">
            <h4>Development Workflow</h4>
            <ul>
              <li><strong>Git Flow:</strong> Feature branches, PR reviews, CI/CD</li>
              <li><strong>Code Review:</strong> Two approvals required, automated checks</li>
              <li><strong>Testing:</strong> Unit, integration, and E2E testing requirements</li>
            </ul>
          </div>
          <div className="process-section">
            <h4>Coding Standards</h4>
            <ul>
              <li><strong>Style Guide:</strong> ESLint, Prettier configuration</li>
              <li><strong>Documentation:</strong> JSDoc, README requirements</li>
              <li><strong>Architecture:</strong> Design patterns and best practices</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderTeamNorms = () => {
    return (
      <div className="team-norms-container">
        <h3>Team Norms</h3>
        <div className="norms-sections">
          <div className="norms-section">
            <h4>Communication</h4>
            <ul>
              <li><strong>Daily Standup:</strong> 9:30 AM, 15 minutes</li>
              <li><strong>Team Chat:</strong> Slack channels and etiquette</li>
              <li><strong>Meetings:</strong> Calendar management and preparation</li>
            </ul>
          </div>
          <div className="norms-section">
            <h4>Collaboration</h4>
            <ul>
              <li><strong>Pair Programming:</strong> When and how to pair</li>
              <li><strong>Knowledge Sharing:</strong> Tech talks and documentation</li>
              <li><strong>Feedback:</strong> Code review and team feedback culture</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderTroubleshooting = () => {
    return (
      <div className="troubleshooting-container">
        <h3>Common Issues & Solutions</h3>
        <div className="troubleshooting-sections">
          <div className="troubleshooting-section">
            <h4>Development Environment</h4>
            <ul>
              <li><strong>Build Issues:</strong> Common errors and fixes</li>
              <li><strong>Dependencies:</strong> Version conflicts and resolution</li>
              <li><strong>Performance:</strong> Optimization tips and tools</li>
            </ul>
          </div>
          <div className="troubleshooting-section">
            <h4>Deployment</h4>
            <ul>
              <li><strong>CI/CD:</strong> Pipeline troubleshooting</li>
              <li><strong>Environment:</strong> Configuration issues</li>
              <li><strong>Monitoring:</strong> Log analysis and debugging</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderLearningPathways = () => {
    return (
      <div className="learning-pathways-container">
        <h3>Learning Resources</h3>
        <div className="pathways-sections">
          <div className="pathway-section">
            <h4>Technical Skills</h4>
            <ul>
              <li><strong>Frontend:</strong> React, TypeScript, CSS</li>
              <li><strong>Backend:</strong> Node.js, APIs, Databases</li>
              <li><strong>DevOps:</strong> Docker, Kubernetes, CI/CD</li>
            </ul>
          </div>
          <div className="pathway-section">
            <h4>Soft Skills</h4>
            <ul>
              <li><strong>Communication:</strong> Technical writing, presentations</li>
              <li><strong>Leadership:</strong> Project management, mentoring</li>
              <li><strong>Problem Solving:</strong> Debugging, optimization</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderCareerGoals = () => {
    return (
      <div className="career-goals-container">
        <h3>Career Development</h3>
        <div className="goals-sections">
          <div className="goals-section">
            <h4>Growth Paths</h4>
            <ul>
              <li><strong>Technical Track:</strong> Senior, Lead, Architect</li>
              <li><strong>Management Track:</strong> Team Lead, Engineering Manager</li>
              <li><strong>Specialist Track:</strong> Security, Performance, UX</li>
            </ul>
          </div>
          <div className="goals-section">
            <h4>Development Plan</h4>
            <ul>
              <li><strong>Skills Assessment:</strong> Quarterly reviews</li>
              <li><strong>Training:</strong> Courses and certifications</li>
              <li><strong>Mentorship:</strong> Finding and working with mentors</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderEmotionalSupport = () => {
    return (
      <div className="emotional-support-container">
        <h3>Wellbeing & Support</h3>
        <div className="support-sections">
          <div className="support-section">
            <h4>Work-Life Balance</h4>
            <ul>
              <li><strong>Flexible Hours:</strong> Managing your schedule</li>
              <li><strong>Remote Work:</strong> Setting boundaries</li>
              <li><strong>Time Off:</strong> Vacation and personal time</li>
            </ul>
          </div>
          <div className="support-section">
            <h4>Resources</h4>
            <ul>
              <li><strong>Mental Health:</strong> Counseling and support</li>
              <li><strong>Physical Health:</strong> Wellness programs</li>
              <li><strong>Community:</strong> Team building and social events</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderFindingInformation = () => {
    return (
      <div className="information-container">
        <h3>Information Resources</h3>
        <div className="information-sections">
          <div className="information-section">
            <h4>Documentation</h4>
            <ul>
              <li><strong>Internal Wiki:</strong> Company knowledge base</li>
              <li><strong>API Docs:</strong> Service documentation</li>
              <li><strong>Architecture:</strong> System design documents</li>
            </ul>
          </div>
          <div className="information-section">
            <h4>Tools & Platforms</h4>
            <ul>
              <li><strong>Project Management:</strong> Jira, Confluence</li>
              <li><strong>Code Repository:</strong> GitHub, GitLab</li>
              <li><strong>Monitoring:</strong> Logging and analytics tools</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderPerformanceFeedback = () => {
    return (
      <div className="performance-container">
        <h3>Performance & Feedback</h3>
        <div className="performance-sections">
          <div className="performance-section">
            <h4>Review Process</h4>
            <ul>
              <li><strong>1:1 Meetings:</strong> Regular check-ins</li>
              <li><strong>Peer Reviews:</strong> Code and project feedback</li>
              <li><strong>Performance Reviews:</strong> Quarterly assessments</li>
            </ul>
          </div>
          <div className="performance-section">
            <h4>Growth Metrics</h4>
            <ul>
              <li><strong>Technical Skills:</strong> Code quality, problem solving</li>
              <li><strong>Collaboration:</strong> Team contribution, communication</li>
              <li><strong>Leadership:</strong> Initiative, mentoring</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (type) {
      case 'onboarding':
        switch (activeCategory) {
          case 'technicalSetup':
            return renderTechnicalSetup();
          case 'architecture':
            return renderArchitectureAndCodebase();
          case 'processes':
            return renderProcessesAndStandards();
          case 'teamNorms':
            return renderTeamNorms();
          case 'troubleshooting':
            return renderTroubleshooting();
          case 'learning':
            return renderLearningPathways();
          case 'career':
            return renderCareerGoals();
          case 'emotional':
            return renderEmotionalSupport();
          case 'information':
            return renderFindingInformation();
          case 'performance':
            return renderPerformanceFeedback();
          default:
            return renderOnboardingCategories();
        }
      case 'teams':
        return renderTeamsInfo();
      case 'policies':
        return renderPoliciesInfo();
      default:
        return (
          <>
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
          </>
        );
    }
  };

  return (
    <div className="document-panel">
      {renderContent()}
    </div>
  );
};

export default DocumentPanel;