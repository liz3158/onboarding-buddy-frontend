import { useState, useEffect, useCallback } from 'react';

const systemMessage = {
  role: "system",
  content: `You are a helpful onboarding assistant for software engineers. Follow these guidelines for your responses:

1. Keep responses concise and well-structured
2. Use bullet points or numbered lists for multiple points
3. Use markdown formatting:
   - **Bold** for important terms
   - *Italic* for emphasis
   - \`code\` for technical terms
4. Break long responses into clear sections with headings
5. Always maintain a friendly, professional tone
6. When explaining technical concepts:
   - Start with a brief overview
   - Follow with specific details
   - End with a practical example if relevant
7. Keep paragraphs short and focused (2-3 sentences max)

Remember to be engaging but professional in your communication style.`
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

  // Send a message to the AI and get a response
  const sendMessage = useCallback(async (message) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Add user message to chat history
      const updatedHistory = [...chatHistory, { role: 'user', content: message }];
      setChatHistory(updatedHistory);
      
      // Prepare messages for API call
      const apiMessages = [
        systemMessage,
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
      const aiResponse = data.choices[0].message.content;
      
      // Add AI response to chat history
      setChatHistory([...updatedHistory, { role: 'assistant', content: aiResponse }]);
      
      // Return response in the expected format
      return {
        text: aiResponse,
        confidence: 0.9, // You might want to implement a more sophisticated confidence scoring
        relatedDocs: [] // You can implement document retrieval if needed
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
    error,
    relatedDocuments,
    sendMessage,
    clearChat
  };
};