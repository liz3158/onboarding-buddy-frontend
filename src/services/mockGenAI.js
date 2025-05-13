// mockGenAI.js - Simulates the behavior of an LLM for the chat interface

// Sample documents database - in a real app, this would come from your document store
const documentsDB = [
    {
      id: 'doc1',
      title: 'Company Values',
      content: 'Our core values include innovation, integrity, teamwork, and customer focus.',
      tags: ['company', 'culture', 'values'],
      phase: 'preboarding'
    },
    {
      id: 'doc2',
      title: 'Development Environment Setup',
      content: 'Instructions for setting up your local development environment, including IDE configuration and repository access.',
      tags: ['development', 'setup', 'environment'],
      phase: 'firstDay'
    },
    {
      id: 'doc3',
      title: 'Git Workflow',
      content: 'Our branching strategy and code review process using Git and GitHub.',
      tags: ['git', 'workflow', 'development'],
      phase: 'firstDay'
    },
    {
      id: 'doc4',
      title: 'Project Architecture',
      content: 'Overview of our microservices architecture and system design principles.',
      tags: ['architecture', 'design', 'technical'],
      phase: 'firstWeek'
    },
    {
      id: 'doc5',
      title: 'Code Standards',
      content: 'Coding standards and best practices for various languages used in our projects.',
      tags: ['code', 'standards', 'development'],
      phase: 'firstWeek'
    },
    {
      id: 'doc6',
      title: 'Testing Strategy',
      content: 'Our approach to unit testing, integration testing, and end-to-end testing.',
      tags: ['testing', 'quality', 'development'],
      phase: 'firstMonth'
    },
    {
      id: 'doc7',
      title: 'Performance Expectations',
      content: 'Performance review process and career development opportunities.',
      tags: ['career', 'performance', 'review'],
      phase: 'firstMonth'
    },
    {
      id: 'doc8',
      title: 'Benefits Guide',
      content: 'Detailed information about employee benefits, including health insurance, 401(k), and more.',
      tags: ['benefits', 'hr', 'employee'],
      phase: 'preboarding'
    },
    {
      id: 'doc9',
      title: 'Office Policies',
      content: 'Guidelines for office conduct, remote work, and company equipment usage.',
      tags: ['policy', 'office', 'conduct'],
      phase: 'preboarding'
    },
    {
      id: 'doc10',
      title: 'Communication Tools',
      content: 'Overview of Slack, email, and other communication tools used at the company.',
      tags: ['communication', 'tools', 'collaboration'],
      phase: 'firstDay'
    }
  ];
  
  // Common questions and pre-written answers
  const faqResponses = {
    'how do i set up my development environment': {
      answer: 'To set up your development environment, you\'ll need to follow these steps:\n\n1. Clone the repository from our GitHub\n2. Install the required dependencies using npm/yarn\n3. Configure your .env file with the necessary environment variables\n4. Run the setup script with `npm run setup`\n\nYou can find detailed instructions in the Development Environment Setup guide in our documentation.',
      confidence: 0.95,
      documents: ['doc2', 'doc3']
    },
    'what are the company values': {
      answer: 'Our company values are centered around four core principles:\n\n• Innovation: We constantly seek new and better ways to solve problems\n• Integrity: We act ethically and transparently in all our dealings\n• Teamwork: We collaborate effectively and support each other\n• Customer Focus: We prioritize delivering value to our customers\n\nThese values guide our decision-making and how we work together as a team.',
      confidence: 0.98,
      documents: ['doc1']
    },
    'how does code review work': {
      answer: 'Our code review process follows these steps:\n\n1. Create a feature branch from development\n2. Make your changes and commit them\n3. Push your branch and create a pull request\n4. Assign at least two reviewers to your PR\n5. Address any feedback from reviewers\n6. Once approved, merge your PR\n\nWe use GitHub for code reviews, and all PRs must pass automated tests before they can be merged.',
      confidence: 0.92,
      documents: ['doc3', 'doc5']
    },
    'what benefits do we have': {
      answer: 'Our company offers a comprehensive benefits package including:\n\n• Health, dental, and vision insurance\n• 401(k) matching up to 4%\n• Flexible PTO policy with minimum 15 days\n• Remote work options\n• Professional development budget\n• Wellness program\n• Parental leave\n\nFor more detailed information, check the Benefits Guide in our HR portal.',
      confidence: 0.97,
      documents: ['doc8']
    },
    'what is the architecture of our system': {
      answer: 'Our system uses a microservices architecture built on the following technologies:\n\n• Frontend: React with TypeScript\n• Backend: Node.js microservices\n• Database: PostgreSQL for relational data, MongoDB for document storage\n• Caching: Redis\n• Message Queue: RabbitMQ\n• Containerization: Docker with Kubernetes orchestration\n\nServices communicate via REST APIs and message queues. You can find more details in the Project Architecture documentation.',
      confidence: 0.94,
      documents: ['doc4']
    }
  };

  // Map onboarding phases to document phases
  const phaseMapping = {
    'orientation': 'preboarding',
    'training': 'firstDay',
    'integration': 'firstWeek',
    'contribution': 'firstMonth'
  };

  // Find relevant documents based on query and phase
  const findRelevantDocuments = (query, phase) => {
    // Map the onboarding phase to document phase
    const docPhase = phaseMapping[phase] || 'preboarding';
    
    // Filter documents by phase
    const phaseDocs = documentsDB.filter(doc => doc.phase === docPhase);
    
    // If no documents for the phase, return some general documents
    if (phaseDocs.length === 0) {
      return documentsDB.slice(0, 3);
    }
    
    // Simple keyword matching for demo purposes
    const queryWords = query.toLowerCase().split(' ');
    const relevantDocs = phaseDocs.filter(doc => {
      const docText = (doc.title + ' ' + doc.content + ' ' + doc.tags.join(' ')).toLowerCase();
      return queryWords.some(word => docText.includes(word));
    });
    
    // Return relevant docs or fallback to phase docs
    return relevantDocs.length > 0 ? relevantDocs : phaseDocs.slice(0, 3);
  };

  // Generate a generic response for unknown queries
  const generateGenericResponse = (query) => {
    const genericResponses = [
      "I understand you're asking about " + query + ". Let me help you with that.",
      "That's a good question about " + query + ". Here's what I know.",
      "I can provide some information about " + query + ".",
      "Let me share what I know about " + query + "."
    ];
    
    return {
      text: genericResponses[Math.floor(Math.random() * genericResponses.length)],
      confidence: 0.6,
      relatedDocs: findRelevantDocuments(query, 'orientation')
    };
  };

  // Mock function to generate AI response
  export const generateAIResponse = async (query, phase = 'preboarding') => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if query matches any FAQ
    const normalizedQuery = query.toLowerCase().trim();
    const faqMatch = Object.entries(faqResponses).find(([key]) => 
      normalizedQuery.includes(key)
    );
    
    if (faqMatch) {
      const [_, response] = faqMatch;
      return {
        text: response.answer,
        confidence: response.confidence,
        relatedDocs: response.documents.map(docId => 
          documentsDB.find(doc => doc.id === docId)
        ).filter(Boolean)
      };
    }
    
    // Generate generic response for unknown queries
    return generateGenericResponse(query);
  };

  // Alias for generateAIResponse to match the import in useChatLLM
  export const mockGenerateResponse = generateAIResponse;

  // Mock function to fetch related documents for a specific phase
  export const mockFetchRelatedDocuments = async (phase = 'orientation') => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Map the onboarding phase to document phase
    const docPhase = phaseMapping[phase] || 'preboarding';
    
    // Filter documents by phase
    const phaseDocs = documentsDB.filter(doc => doc.phase === docPhase);
    
    // Return phase-specific documents or fallback to some general ones
    return phaseDocs.length > 0 ? phaseDocs : documentsDB.slice(0, 3);
  };