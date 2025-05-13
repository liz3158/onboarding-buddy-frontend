// useChallengePrompt
import { useState } from 'react';

const predefinedPrompts = {
  'JavaScript Basics': [
    'Create a function that reverses a string',
    'Write a function to check if a number is prime',
    'Implement a basic calculator function'
  ],
  'Arrays': [
    'Filter an array to get only unique values',
    'Find the largest number in an array',
    'Implement array rotation'
  ],
  'Functions': [
    'Create a debounce function',
    'Implement function currying',
    'Create a memoization function'
  ],
  'Async Programming': [
    'Create a Promise that resolves after N seconds',
    'Implement a basic fetch wrapper',
    'Create an async retry function'
  ]
};

const generateTemplate = (topic, difficulty = 'beginner') => {
  const templates = {
    beginner: {
      description: `Practice ${topic} with this beginner-friendly challenge.`,
      hints: ['Start by breaking down the problem', 'Consider edge cases'],
      timeLimit: '15 minutes'
    },
    intermediate: {
      description: `Enhance your ${topic} skills with this intermediate challenge.`,
      hints: ['Think about optimization', 'Consider different approaches'],
      timeLimit: '30 minutes'
    },
    advanced: {
      description: `Master ${topic} with this advanced challenge.`,
      hints: ['Focus on performance', 'Think about scalability'],
      timeLimit: '45 minutes'
    }
  };
  return templates[difficulty];
};

const useChallengePrompt = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateChallenge = async (category, difficulty = 'beginner') => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const prompts = predefinedPrompts[category];
      if (!prompts) {
        throw new Error(`No prompts available for category: ${category}`);
      }

      const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
      const template = generateTemplate(category, difficulty);

      const challenge = {
        id: Date.now(),
        title: randomPrompt,
        category,
        difficulty,
        ...template,
        testCases: [
          { input: 'example input', expectedOutput: 'expected output' },
          { input: 'edge case', expectedOutput: 'expected result' }
        ],
        initialCode: `// ${randomPrompt}\n\n// Write your solution here\n`,
      };

      setLoading(false);
      return challenge;

    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  return {
    generateChallenge,
    loading,
    error
  };
};

export default useChallengePrompt;
  