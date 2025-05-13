import React, { createContext, useContext, useState } from 'react';

const ChallengeContext = createContext();

export function ChallengeProvider({ children }) {
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [challengeHistory, setChallengeHistory] = useState([]);

  const updateChallenge = (challenge) => {
    setCurrentChallenge(challenge);
    setUserCode(challenge?.initialCode || '');
    setChallengeHistory(prev => [...prev, challenge]);
  };

  return (
    <ChallengeContext.Provider value={{
      currentChallenge,
      userCode,
      challengeHistory,
      updateChallenge,
      setUserCode
    }}>
      {children}
    </ChallengeContext.Provider>
  );
}

export function useChallenge() {
  const context = useContext(ChallengeContext);
  if (!context) {
    throw new Error('useChallenge must be used within a ChallengeProvider');
  }
  return context;
}
