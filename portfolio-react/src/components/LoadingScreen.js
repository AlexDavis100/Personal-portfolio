import React from 'react';
import '../styles/LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loader">
        <div className="loader-inner"></div>
      </div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingScreen; 