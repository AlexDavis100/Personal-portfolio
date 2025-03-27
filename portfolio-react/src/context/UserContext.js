import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const UserContext = createContext();

// Custom hook to use the context
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // Check localStorage on initial load
  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const storedInteraction = localStorage.getItem('hasInteracted');
    
    if (storedName) {
      setUserName(storedName);
    }
    
    if (storedInteraction) {
      setHasInteracted(storedInteraction === 'true');
    }
  }, []);
  
  // Save userName to localStorage when it changes
  useEffect(() => {
    if (userName) {
      localStorage.setItem('userName', userName);
    }
  }, [userName]);
  
  // Save interaction state to localStorage
  useEffect(() => {
    localStorage.setItem('hasInteracted', hasInteracted);
  }, [hasInteracted]);
  
  // Function to save user name
  const saveUserName = (name) => {
    setUserName(name);
    setHasInteracted(true);
  };
  
  // Expose context values
  const value = {
    userName,
    saveUserName,
    hasInteracted
  };
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext; 