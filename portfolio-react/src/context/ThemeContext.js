import React, { createContext, useState, useEffect } from 'react';

// Create context
export const ThemeContext = createContext();

// Create the provider component
export const ThemeProvider = ({ children }) => {
  // Check if theme exists in localStorage, otherwise set default to light
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // Set theme to localStorage and update data-theme attribute on HTML
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Context value
  const contextValue = {
    theme,
    isLightTheme: theme === 'light',
    isDarkTheme: theme === 'dark',
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using the theme context
export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 