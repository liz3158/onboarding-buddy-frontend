import { useState, useEffect, useCallback } from 'react';
import { internalDocs } from './mockInternalDocs';
import { orgData } from './mockOrgData';

const systemMessage = {
  role: "system",
  content: `You are an AI-powered onboarding assistant software engineer for our company. Your role is to help new employees navigate their onboarding journey and answer questions about company policies,
   team structures, and best practices. You are a 24/7 personal coach, tech lead, and onbording buddy for software engineers combined into one helpful assistant.

If the user asks for a chart or graph, reply ONLY with JSON in the format {type, labels, data, title}. No text outside JSON. If normal question, reply normally.

Follow these guidelines:

1. Keep responses concise and well-structured
2. Use bullet points or numbered lists for multiple points
3. Use markdown formatting:
   - **Bold** for important terms
   - *Italic* for emphasis
   - \`code\` for technical terms
   - ![Image description](image_url) for images
4. Break long responses into clear sections with headings
5. Always maintain a friendly, professional tone
6. When explaining concepts:
   - Start with a brief overview
   - Follow with specific details
   - End with practical examples
7. Keep paragraphs short and focused (2-3 sentences max)
8. For company policies:
   - Reference specific policy documents
   - Provide direct quotes when relevant
   - Include links to internal documentation
9. For team-related questions:
   - Direct to appropriate team leads
   - Explain team structures and hierarchies
   - Share team-specific best practices
10. For onboarding questions:
    - Guide through onboarding phases
    - Explain expectations and timelines
    - Provide relevant resources and contacts
11. For technical setup questions:
    - Provide step-by-step instructions
    - Include troubleshooting tips
    - Offer validation checklists
    - Reference relevant documentation
    - Suggest next steps if issues persist
12. For architecture and codebase questions:
    - Provide context-aware code explanations
    - Include relevant diagrams or visual representations
    - Explain component relationships and data flow
    - Reference specific files and code patterns
    - Highlight architectural decisions and trade-offs
13. For visual explanations:
    - When appropriate, include images to illustrate concepts
    - Use the format ![Description](image_url) in your responses
    - For diagrams, use Mermaid syntax when possible
    - For architecture diagrams, use the provided diagram templates

You can help with the following onboarding categories:

🔧 **Technical Setup**
- Local development environment setup
- VPN and access credentials
- Repository access and cloning
- Tool installation and configuration
- Environment validation
- Troubleshooting common issues

🛠️ **Architecture & Codebase**
- System architecture explanations
- Data flow and component relationships
- Key technologies and frameworks
- Codebase organization and patterns
- Context-aware code explanations
- Visual diagrams and representations
- Architectural decisions and trade-offs
- Component interaction patterns

📜 **Processes & Standards**
- PR review workflows
- Branching strategies
- Deployment procedures
- Code quality standards
- Documentation requirements
- Testing practices
- Release management
- Security protocols

🧑‍💼 **Team Norms**
- Meeting schedules and formats
- Communication channels
- Leave and time-off policies
- Team rituals and ceremonies
- Collaboration tools
- Team structure and hierarchy
- Reporting relationships
- Team-specific practices

🛡️ **Troubleshooting**
- Common development issues
- Access problems
- Environment setup errors
- Build and deployment failures
- Performance issues
- Integration problems
- Testing failures
- Security concerns

🧠 **Learning Pathways**
- Recommended learning resources
- Coding challenges and exercises
- Skill development roadmap
- Knowledge sharing opportunities
- Training programs
- Certification paths
- Mentorship opportunities
- Peer learning groups

📊 **Career Goals**
- 90-day onboarding milestones
- Performance expectations
- Growth opportunities
- Skill development focus areas
- Career progression paths
- Goal setting frameworks
- Feedback mechanisms
- Development plans

💬 **Emotional Support**
- Work-life balance guidance
- Stress management techniques
- Team integration strategies
- Confidence building
- Imposter syndrome coping
- Networking advice
- Cultural adaptation
- Personal development

🔍 **Finding Information**
- Documentation locations
- Knowledge base navigation
- Internal tool usage
- Resource discovery
- Self-service options
- Information architecture
- Search strategies
- Content organization

🏆 **Performance Feedback**
- Progress tracking
- Self-assessment tools
- Feedback mechanisms
- Improvement strategies
- Recognition opportunities
- Performance metrics
- Review processes
- Development planning

For each category, provide:
1. Clear, actionable information
2. Relevant resources and documentation
3. Step-by-step guidance when appropriate
4. Visual aids when helpful
5. Next steps and follow-up actions
6. Contact information for further assistance

Remember to:
- Be empathetic and supportive
- Provide accurate, up-to-date information
- Offer personalized guidance based on the user's role and phase
- Encourage self-sufficiency while being available for help
- Escalate sensitive topics to appropriate personnel
- Maintain confidentiality and respect privacy
- Follow up on complex issues to ensure resolution`
};

// Comprehensive company information
const companyInfo = {
  onboarding: {
    phases: {
      orientation: {
        duration: "1-2 weeks",
        focus: "Company culture, policies, and basic setup",
        keyContacts: ["HR Manager", "Team Lead", "IT Support"]
      },
      training: {
        duration: "2-4 weeks",
        focus: "Technical skills, tools, and processes",
        keyContacts: ["Technical Lead", "Senior Developer", "Product Manager"]
      },
      integration: {
        duration: "4-6 weeks",
        focus: "Team integration and project involvement",
        keyContacts: ["Team Lead", "Project Manager", "Mentor"]
      },
      contribution: {
        duration: "Ongoing",
        focus: "Active project contribution and growth",
        keyContacts: ["Team Lead", "Technical Lead", "Product Owner"]
      }
    },
    resources: {
      documentation: "Internal Wiki",
      training: "Learning Management System",
      support: "IT Help Desk"
    },
    categories: {
      technicalSetup: {
        title: "Technical Setup",
        description: "Getting your development environment ready",
        resources: [
          {
            title: "Local Environment Setup Guide",
            url: "/docs/setup/local-environment",
            description: "Step-by-step guide to set up your development environment"
          },
          {
            title: "VPN Access Instructions",
            url: "/docs/access/vpn-setup",
            description: "How to obtain and configure VPN credentials"
          },
          {
            title: "Repository Access Guide",
            url: "/docs/setup/repo-access",
            description: "Instructions for accessing and cloning repositories"
          }
        ],
        setupInstructions: [
          {
            step: 1,
            title: "Install Required Software",
            instructions: [
              "Install Node.js (v16.x or higher)",
              "Install Git (latest version)",
              "Install VS Code with recommended extensions",
              "Install Docker Desktop"
            ],
            validation: "Run `node -v`, `git --version`, and `docker --version` to verify installations"
          },
          {
            step: 2,
            title: "Configure Git",
            instructions: [
              "Set your name: `git config --global user.name \"Your Name\"`",
              "Set your email: `git config --global user.email \"your.email@company.com\"`",
              "Generate SSH key: `ssh-keygen -t ed25519 -C \"your.email@company.com\"`",
              "Add SSH key to your Git account"
            ],
            validation: "Run `git config --list` to verify your settings"
          },
          {
            step: 3,
            title: "Set Up VPN",
            instructions: [
              "Request VPN access from IT Support",
              "Install VPN client (Cisco AnyConnect)",
              "Configure VPN with provided credentials",
              "Connect to VPN and verify access to internal resources"
            ],
            validation: "Check if you can access internal websites and repositories"
          },
          {
            step: 4,
            title: "Clone Repositories",
            instructions: [
              "Request access to required repositories",
              "Clone repositories: `git clone git@github.com:company/repo-name.git`",
              "Set up project dependencies: `npm install`",
              "Configure environment variables"
            ],
            validation: "Run `npm run build` to verify the project builds successfully"
          },
          {
            step: 5,
            title: "Configure Development Tools",
            instructions: [
              "Install VS Code extensions from `.vscode/extensions.json`",
              "Configure ESLint and Prettier",
              "Set up debugging configurations",
              "Configure terminal settings"
            ],
            validation: "Open VS Code and verify extensions are installed and configured"
          }
        ],
        faqs: [
          {
            question: "What should I do if I encounter permission issues with repositories?",
            answer: "Contact your team lead or the repository administrator to request access. Make sure you've added your SSH key to your Git account."
          },
          {
            question: "How do I troubleshoot VPN connection issues?",
            answer: "1. Verify your credentials are correct. 2. Check if the VPN server is accessible. 3. Try disconnecting and reconnecting. 4. Contact IT Support if issues persist."
          },
          {
            question: "What should I do if npm install fails?",
            answer: "1. Clear npm cache: `npm cache clean --force`. 2. Delete node_modules folder and package-lock.json. 3. Try installing again: `npm install`. 4. Check for Node.js version compatibility."
          },
          {
            question: "How do I set up environment variables?",
            answer: "1. Copy `.env.example` to `.env`. 2. Fill in the required values. 3. For local development, use development values. 4. Never commit `.env` files to repositories."
          },
          {
            question: "What should I do if Docker containers fail to start?",
            answer: "1. Check Docker Desktop is running. 2. Verify port availability. 3. Check container logs: `docker logs container-name`. 4. Try rebuilding containers: `docker-compose down && docker-compose up --build`."
          }
        ],
        validationChecklist: [
          {
            category: "Software Installation",
            items: [
              { text: "Node.js installed and verified", command: "node -v" },
              { text: "Git installed and verified", command: "git --version" },
              { text: "Docker installed and verified", command: "docker --version" },
              { text: "VS Code installed with extensions", command: "code --list-extensions" }
            ]
          },
          {
            category: "Git Configuration",
            items: [
              { text: "Git username configured", command: "git config user.name" },
              { text: "Git email configured", command: "git config user.email" },
              { text: "SSH key generated", command: "ls -la ~/.ssh" },
              { text: "SSH key added to Git account", command: "ssh -T git@github.com" }
            ]
          },
          {
            category: "VPN Access",
            items: [
              { text: "VPN client installed", command: "which cisco-anyconnect" },
              { text: "VPN credentials received", command: "N/A" },
              { text: "VPN connection successful", command: "ping internal-resource" },
              { text: "Internal resources accessible", command: "curl internal-url" }
            ]
          },
          {
            category: "Repository Access",
            items: [
              { text: "Repository access requested", command: "N/A" },
              { text: "Repository cloned successfully", command: "ls repo-directory" },
              { text: "Dependencies installed", command: "npm list --depth=0" },
              { text: "Project builds successfully", command: "npm run build" }
            ]
          },
          {
            category: "Development Environment",
            items: [
              { text: "VS Code extensions installed", command: "code --list-extensions" },
              { text: "ESLint configured", command: "npx eslint --print-config ." },
              { text: "Prettier configured", command: "npx prettier --check ." },
              { text: "Environment variables set", command: "cat .env" }
            ]
          }
        ]
      },
      architecture: {
        title: "Architecture & Codebase",
        description: "Understanding our system architecture and codebase",
        resources: [
          {
            title: "System Architecture Overview",
            url: "/docs/architecture/overview",
            description: "High-level overview of our system architecture"
          },
          {
            title: "Data Flow Diagrams",
            url: "/docs/architecture/data-flow",
            description: "Visual representation of data flow through our systems"
          },
          {
            title: "Technology Stack Guide",
            url: "/docs/architecture/tech-stack",
            description: "Overview of technologies and frameworks we use"
          }
        ],
        architectureOverview: {
          title: "System Architecture Overview",
          description: "Our application follows a modern microservices architecture with a clear separation of concerns.",
          diagram: {
            type: "mermaid",
            code: `
graph TD
    A[Client Browser] --> B[Frontend SPA]
    B --> C[API Gateway]
    C --> D[Authentication Service]
    C --> E[User Service]
    C --> F[Content Service]
    C --> G[Analytics Service]
    E --> H[(User Database)]
    F --> I[(Content Database)]
    G --> J[(Analytics Database)]
    D --> K[Identity Provider]
            `
          },
          keyComponents: [
            {
              name: "Frontend SPA",
              description: "Single Page Application built with React and TypeScript",
              technologies: ["React", "TypeScript", "Redux", "Material UI"]
            },
            {
              name: "API Gateway",
              description: "Central entry point for all client requests",
              technologies: ["Node.js", "Express", "JWT"]
            },
            {
              name: "Authentication Service",
              description: "Handles user authentication and authorization",
              technologies: ["Node.js", "OAuth 2.0", "JWT"]
            },
            {
              name: "User Service",
              description: "Manages user profiles and preferences",
              technologies: ["Node.js", "MongoDB", "Redis"]
            },
            {
              name: "Content Service",
              description: "Handles content creation, storage, and retrieval",
              technologies: ["Node.js", "PostgreSQL", "Elasticsearch"]
            },
            {
              name: "Analytics Service",
              description: "Processes and analyzes user behavior data",
              technologies: ["Python", "Apache Spark", "BigQuery"]
            }
          ]
        },
        dataFlow: {
          title: "Data Flow Patterns",
          description: "Understanding how data moves through our system",
          diagrams: [
            {
              title: "User Authentication Flow",
              type: "mermaid",
              code: `
sequenceDiagram
    participant User
    participant Frontend
    participant Gateway
    participant Auth
    participant UserService
    
    User->>Frontend: Enter credentials
    Frontend->>Gateway: POST /auth/login
    Gateway->>Auth: Validate credentials
    Auth->>UserService: Get user profile
    UserService-->>Auth: Return user data
    Auth-->>Gateway: Return JWT token
    Gateway-->>Frontend: Return JWT token
    Frontend->>Frontend: Store token in localStorage
    Frontend-->>User: Redirect to dashboard
              `
            },
            {
              title: "Content Creation Flow",
              type: "mermaid",
              code: `
sequenceDiagram
    participant User
    participant Frontend
    participant Gateway
    participant ContentService
    participant Storage
    
    User->>Frontend: Create new content
    Frontend->>Gateway: POST /content
    Gateway->>ContentService: Create content
    ContentService->>Storage: Store content
    Storage-->>ContentService: Confirm storage
    ContentService-->>Gateway: Return content ID
    Gateway-->>Frontend: Return success
    Frontend-->>User: Show success message
              `
            }
          ]
        },
        codebaseStructure: {
          title: "Codebase Organization",
          description: "Our codebase follows a modular structure with clear separation of concerns",
          structure: [
            {
              path: "src/",
              description: "Main source code directory",
              children: [
                {
                  path: "modules/",
                  description: "Feature modules organized by domain",
                  children: [
                    {
                      path: "auth/",
                      description: "Authentication module",
                      files: ["AuthService.js", "LoginForm.jsx", "RegisterForm.jsx"]
                    },
                    {
                      path: "user/",
                      description: "User management module",
                      files: ["UserService.js", "Profile.jsx", "Settings.jsx"]
                    },
                    {
                      path: "content/",
                      description: "Content management module",
                      files: ["ContentService.js", "Editor.jsx", "Viewer.jsx"]
                    }
                  ]
                },
                {
                  path: "shared/",
                  description: "Shared components and utilities",
                  children: [
                    {
                      path: "components/",
                      description: "Reusable UI components",
                      files: ["Button.jsx", "Input.jsx", "Modal.jsx"]
                    },
                    {
                      path: "utils/",
                      description: "Utility functions",
                      files: ["api.js", "validation.js", "formatting.js"]
                    }
                  ]
                },
                {
                  path: "config/",
                  description: "Configuration files",
                  files: ["app.js", "routes.js", "constants.js"]
                }
              ]
            }
          ]
        },
        codePatterns: {
          title: "Code Patterns and Best Practices",
          description: "Common patterns used throughout our codebase",
          patterns: [
            {
              name: "Service Layer Pattern",
              description: "Business logic is encapsulated in service classes",
              example: {
                language: "javascript",
                code: `
// UserService.js
class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  
  async getUserById(id) {
    return this.userRepository.findById(id);
  }
  
  async updateUser(id, userData) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    
    const updatedUser = { ...user, ...userData };
    return this.userRepository.save(updatedUser);
  }
}
                `
              }
            },
            {
              name: "Repository Pattern",
              description: "Data access is abstracted through repository interfaces",
              example: {
                language: "javascript",
                code: `
// UserRepository.js
class UserRepository {
  constructor(database) {
    this.database = database;
  }
  
  async findById(id) {
    return this.database.users.findOne({ _id: id });
  }
  
  async save(user) {
    if (user._id) {
      return this.database.users.updateOne(
        { _id: user._id },
        { $set: user }
      );
    } else {
      return this.database.users.insertOne(user);
    }
  }
}
                `
              }
            },
            {
              name: "Component Composition",
              description: "UI components are composed of smaller, reusable components",
              example: {
                language: "jsx",
                code: `
// UserProfile.jsx
import React from 'react';
import { Card, Avatar, UserInfo, UserActions } from '../shared/components';

const UserProfile = ({ user }) => {
  return (
    <Card>
      <Avatar src={user.avatarUrl} alt={user.name} />
      <UserInfo 
        name={user.name}
        email={user.email}
        role={user.role}
      />
      <UserActions 
        onEdit={() => handleEdit(user.id)}
        onDelete={() => handleDelete(user.id)}
      />
    </Card>
  );
};

export default UserProfile;
                `
              }
            }
          ]
        },
        architecturalDecisions: {
          title: "Architectural Decisions",
          description: "Key decisions that shaped our architecture",
          decisions: [
            {
              title: "Microservices Architecture",
              description: "We chose a microservices architecture to enable independent scaling and deployment of different parts of our system.",
              pros: [
                "Independent scaling of services",
                "Fault isolation",
                "Technology diversity",
                "Smaller, focused teams"
              ],
              cons: [
                "Increased operational complexity",
                "Distributed system challenges",
                "More complex deployment",
                "Inter-service communication overhead"
              ]
            },
            {
              title: "React for Frontend",
              description: "We use React for our frontend to leverage its component-based architecture and rich ecosystem.",
              pros: [
                "Component reusability",
                "Virtual DOM for performance",
                "Large ecosystem of libraries",
                "Strong community support"
              ],
              cons: [
                "Learning curve for new developers",
                "Need for additional libraries for routing, state management",
                "JavaScript fatigue"
              ]
            },
            {
              title: "MongoDB for User Data",
              description: "We use MongoDB for storing user data due to its flexibility with schema changes.",
              pros: [
                "Schema flexibility",
                "Horizontal scaling",
                "JSON-like document structure",
                "Good for rapid development"
              ],
              cons: [
                "Less ACID compliance than relational databases",
                "Complex queries can be challenging",
                "Memory usage can be high"
              ]
            }
          ]
        }
      },
      processes: {
        title: "Processes & Standards",
        description: "Understanding our development processes and standards",
        resources: [
          {
            title: "PR Review Process",
            url: "/docs/processes/pr-review",
            description: "Step-by-step guide to our PR review process"
          },
          {
            title: "Branching Strategy",
            url: "/docs/processes/branching",
            description: "Our Git branching strategy and workflow"
          },
          {
            title: "Deployment Procedures",
            url: "/docs/processes/deployment",
            description: "How we deploy code to different environments"
          }
        ]
      },
      teamNorms: {
        title: "Team Norms",
        description: "Understanding our team culture and practices",
        resources: [
          {
            title: "Meeting Schedule",
            url: "/docs/team/meetings",
            description: "Overview of team meetings and ceremonies"
          },
          {
            title: "Communication Channels",
            url: "/docs/team/communication",
            description: "Which channels to use for different types of communication"
          },
          {
            title: "Leave Policy",
            url: "/docs/policies/leave",
            description: "How to request and manage time off"
          }
        ]
      },
      troubleshooting: {
        title: "Troubleshooting",
        description: "Common issues and how to resolve them",
        resources: [
          {
            title: "Common Development Issues",
            url: "/docs/troubleshooting/dev-issues",
            description: "Solutions to common development environment issues"
          },
          {
            title: "Access Problems Guide",
            url: "/docs/troubleshooting/access",
            description: "How to resolve common access and permission issues"
          },
          {
            title: "Build and Deployment Troubleshooting",
            url: "/docs/troubleshooting/build-deploy",
            description: "Solutions to common build and deployment failures"
          }
        ]
      },
      learningPathways: {
        title: "Learning Pathways",
        description: "Resources to help you grow and learn",
        resources: [
          {
            title: "Learning Resources",
            url: "/docs/learning/resources",
            description: "Curated list of learning resources for different technologies"
          },
          {
            title: "Coding Challenges",
            url: "/docs/learning/challenges",
            description: "Coding challenges to help understand our systems"
          },
          {
            title: "Skill Development Roadmap",
            url: "/docs/learning/roadmap",
            description: "Recommended learning path for different roles"
          }
        ]
      },
      careerGoals: {
        title: "Career Goals",
        description: "Setting and tracking your career development",
        resources: [
          {
            title: "90-Day Onboarding Plan",
            url: "/docs/career/90-day-plan",
            description: "Milestones and goals for your first 90 days"
          },
          {
            title: "Performance Expectations",
            url: "/docs/career/expectations",
            description: "What's expected at different career levels"
          },
          {
            title: "Growth Opportunities",
            url: "/docs/career/growth",
            description: "Paths for career advancement and skill development"
          }
        ]
      },
      emotionalSupport: {
        title: "Emotional Support",
        description: "Resources for work-life balance and well-being",
        resources: [
          {
            title: "Work-Life Balance Guide",
            url: "/docs/support/work-life",
            description: "Tips for maintaining work-life balance"
          },
          {
            title: "Mentorship Program",
            url: "/docs/support/mentorship",
            description: "How to get the most from your mentor relationship"
          },
          {
            title: "Employee Assistance Program",
            url: "/docs/support/eap",
            description: "Resources available through our EAP"
          }
        ]
      },
      findingInformation: {
        title: "Finding Information",
        description: "Where to find various types of information",
        resources: [
          {
            title: "Documentation Index",
            url: "/docs/info/index",
            description: "Central index of all internal documentation"
          },
          {
            title: "API Documentation",
            url: "/docs/info/api",
            description: "Where to find API documentation"
          },
          {
            title: "Process Documentation",
            url: "/docs/info/processes",
            description: "Where to find process documentation"
          }
        ]
      },
      performanceFeedback: {
        title: "Performance Feedback",
        description: "Understanding and tracking your performance",
        resources: [
          {
            title: "Performance Review Process",
            url: "/docs/performance/review",
            description: "How our performance review process works"
          },
          {
            title: "Self-Assessment Guide",
            url: "/docs/performance/self-assessment",
            description: "How to conduct an effective self-assessment"
          },
          {
            title: "Feedback Request Guide",
            url: "/docs/performance/feedback",
            description: "How to request and give effective feedback"
          }
        ]
      }
    }
  },
  teams: {
    structure: "Agile teams with 5-8 members",
    leads: {
      department: "John Smith (Engineering Director)",
      teams: [
        "Sarah Johnson (Frontend Lead)",
        "Mike Chen (Backend Lead)",
        "Lisa Wong (DevOps Lead)"
      ]
    },
    practices: [
      "Daily standups",
      "Weekly team meetings",
      "Bi-weekly retrospectives",
      "Code review requirements",
      "Testing standards"
    ]
  },
  policies: {
    workHours: {
      standard: "9 AM to 5 PM",
      flexibility: "Core hours 10 AM to 4 PM",
      remote: "Hybrid work model available"
    },
    communication: {
      primary: "Slack for real-time communication",
      email: "Outlook for formal communication",
      meetings: "Microsoft Teams for video calls"
    },
    development: {
      versionControl: "Git with GitHub",
      branching: "GitFlow workflow",
      deployment: "CI/CD with GitHub Actions",
      environments: ["Development", "Staging", "Production"]
    },
    security: {
      access: "Role-based access control",
      authentication: "SSO with company email",
      data: "Data classification and handling policies"
    }
  },
  tools: {
    development: {
      ide: "VS Code with company extensions",
      terminal: "iTerm2 or Windows Terminal",
      database: "PostgreSQL, MongoDB"
    },
    collaboration: {
      project: "Jira for task management",
      documentation: "Confluence for team docs",
      design: "Figma for UI/UX design"
    },
    communication: {
      chat: "Slack for team communication",
      email: "Outlook for formal communication",
      meetings: "Microsoft Teams for video calls"
    }
  }
};

// Add a function to generate images using DALL-E
const generateImage = async (prompt) => {
  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate image');
    }

    const data = await response.json();
    return data.data[0].url;
  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }
};

/**
 * Custom hook to handle chat interactions with OpenAI API
 * @param {string} onboardingPhase - Current phase of onboarding (orientation, training, integration, contribution)
 * @returns {Object} - Methods and state for chat LLM interaction
 */
export const useChatLLM = (onboardingPhase = 'orientation') => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [relatedDocuments, setRelatedDocuments] = useState([]);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const handleVisualizationRequest = (message) => {
    if (message.toLowerCase().includes('visualize') || 
        message.toLowerCase().includes('chart') || 
        message.toLowerCase().includes('graph')) {
      return true;
    }
    return false;
  };

  // Send a message to the AI and get a response
  const sendMessage = useCallback(async (message) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Check for visualization request
      const isVisualizationRequest = handleVisualizationRequest(message);
      
      // Add user message to chat history
      const updatedHistory = [...chatHistory, { role: 'user', content: message }];
      setChatHistory(updatedHistory);

      // Prepare messages for API call
      const apiMessages = [
        systemMessage,
        {
          role: "system",
          content: isVisualizationRequest ? 
            `You are an onboarding assistant. If the user asks for a chart or graph, reply ONLY with JSON in the format {type, labels, data, title}. No text outside JSON. If normal question, reply normally.` :
            `Company Information Context: ${JSON.stringify(companyInfo)}`
        },
        ...updatedHistory.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ];

      // Call OpenAI API
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: apiMessages,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from OpenAI');
      }

      const data = await response.json();
      let aiResponse = data.choices[0].message.content;

      if (isVisualizationRequest) {
        try {
          // Try to parse the response as JSON
          const chartData = JSON.parse(aiResponse);
          // Convert the simple format to Chart.js format
          const visualizationData = {
            type: 'visualization',
            chartType: chartData.type || 'bar',
            data: {
              labels: chartData.labels,
              datasets: [{
                label: chartData.title,
                data: chartData.data,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1
              }]
            }
          };
          
          // Add visualization message to chat history
          setChatHistory([...updatedHistory, { 
            role: 'assistant', 
            content: '', 
            visualization: visualizationData 
          }]);
          return visualizationData;
        } catch (e) {
          console.error('Failed to parse chart data:', e);
        }
      }
      
      // Handle regular text response
      const imageRegex = /!\[(.*?)\]\(GENERATE_IMAGE:(.*?)\)/g;
      const imageMatches = [...aiResponse.matchAll(imageRegex)];
      
      if (imageMatches.length > 0) {
        setIsGeneratingImage(true);
        
        for (const match of imageMatches) {
          const [fullMatch, altText, prompt] = match;
          const imageUrl = await generateImage(prompt);
          
          if (imageUrl) {
            aiResponse = aiResponse.replace(fullMatch, `![${altText}](${imageUrl})`);
          } else {
            aiResponse = aiResponse.replace(fullMatch, '');
          }
        }
        
        setIsGeneratingImage(false);
      }
      
      setChatHistory([...updatedHistory, { role: 'assistant', content: aiResponse }]);
      
      return {
        text: aiResponse,
        confidence: 0.9,
        relatedDocs: []
      };
    } catch (err) {
      console.error('Error generating AI response:', err);
      setError('Failed to generate response');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [chatHistory]);

  // Clear chat history
  const clearChat = useCallback(() => {
    setChatHistory([]);
    setRelatedDocuments([]);
  }, []);

  return {
    chatHistory,
    isLoading,
    isGeneratingImage,
    error,
    relatedDocuments,
    sendMessage,
    clearChat
  };
};