import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const UserProfileContext = createContext();

// Provider component
export const UserProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [onboardingProgress, setOnboardingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch user profile
    const fetchUserProfile = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const userData = {
          id: 'user123',
          name: 'Alex Johnson',
          email: 'alex.johnson@company.com',
          role: 'Frontend',
          team: 'Product',
          startDate: '2023-05-15',
          manager: 'Sarah Williams',
          buddy: 'Michael Chen'
        };
        
        setProfile(userData);
        
        // Calculate mock progress
        const progress = Math.floor(Math.random() * 100);
        setOnboardingProgress(progress);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserProfile();
  }, []);
  
  // Update progress
  const updateProgress = (newProgress) => {
    setOnboardingProgress(newProgress);
    // In a real app, save to API
  };
  
  const value = {
    profile,
    onboardingProgress,
    isLoading,
    updateProgress
  };
  
  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
};

// Custom hook for using the context
export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};