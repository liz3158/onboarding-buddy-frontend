// Challenge Panel
import React, { useState } from 'react';
import useChallengePrompt from '../../hooks/useChallengePrompt';

const ChallengePanel = ({ challenge, onChallengeGenerated }) => {
  const { generateChallenge, loading, error } = useChallengePrompt();
  const [difficulty, setDifficulty] = useState('beginner');

  const handleGenerateChallenge = async () => {
    const newChallenge = await generateChallenge(challenge?.category || 'JavaScript Basics', difficulty);
    if (newChallenge) {
      onChallengeGenerated(newChallenge);
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 rounded-md shadow-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 rounded-md shadow-lg">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 rounded-md shadow-lg">
      {challenge ? (
        <>
          <h2 className="text-2xl font-semibold">{challenge.title}</h2>
          <p className="mt-2 text-gray-600">{challenge.description}</p>
          {challenge.hints && (
            <div className="mt-4">
              <h3 className="font-semibold">Hints:</h3>
              <ul className="list-disc ml-6 mt-2">
                {challenge.hints.map((hint, index) => (
                  <li key={index} className="text-gray-600">{hint}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-4 flex gap-4">
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <button
              onClick={handleGenerateChallenge}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Generate New Challenge
            </button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <p className="text-gray-600">Select a challenge category or</p>
          <button
            onClick={handleGenerateChallenge}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Generate Random Challenge
          </button>
        </div>
      )}
    </div>
  );
};

export default ChallengePanel;

