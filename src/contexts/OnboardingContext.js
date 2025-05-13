import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUserProfile } from './UserProfileContext';

// Create context
const OnboardingContext = createContext();

// Provider component
export const OnboardingProvider = ({ children }) => {
  const [onboardingPhase, setOnboardingPhase] = useState('preboarding');
  const [userProgress, setUserProgress] = useState(0);
  const [completedTasks, setCompletedTasks] = useState([]);
  const { profile, onboardingProgress } = useUserProfile();
  
  useEffect(() => {
    // Determine onboarding phase based on progress
    if (onboardingProgress) {
      setUserProgress(onboardingProgress);
      
      if (onboardingProgress < 25) {
        setOnboardingPhase('preboarding');
      } else if (onboardingProgress < 50) {
        setOnboardingPhase('firstDay');
      } else if (onboardingProgress < 75) {
        setOnboardingPhase('firstWeek');
      } else {
        setOnboardingPhase('firstMonth');
      }
    }
  }, [onboardingProgress]);
  
  // Update completed tasks
  const completeTask = (taskId) => {
    if (!completedTasks.includes(taskId)) {
      setCompletedTasks([...completedTasks, taskId]);
      // In a real app, update progress based on task completion
      // and save to backend
    }
  };
  
  // Manually set the onboarding phase (e.g. for testing)
  const setPhase = (phase) => {
    if (['preboarding', 'firstDay', 'firstWeek', 'firstMonth'].includes(phase)) {
      setOnboardingPhase(phase);
    }
  };
  
  const value = {
    onboardingPhase,
    userProgress,
    completedTasks,
    completeTask,
    setPhase
  };
  
  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

// Custom hook for using the context
export const useOnboardingContext = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboardingContext must be used within an OnboardingProvider');
  }
  return context;
};