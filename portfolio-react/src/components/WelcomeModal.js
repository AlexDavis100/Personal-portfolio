import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import '../styles/WelcomeModal.css';

const WelcomeModal = () => {
  const { saveUserName, hasInteracted } = useUser();
  const [name, setName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [modalStage, setModalStage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  // Show modal if user hasn't interacted yet
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setIsOpen(true);
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [hasInteracted]);
  
  // Focus on input when modal opens
  useEffect(() => {
    if (isOpen && modalStage === 1 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, modalStage]);
  
  // Handle welcome modal progression
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (modalStage < 1) {
          setModalStage(prev => prev + 1);
        }
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, modalStage]);
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (name.trim()) {
      setIsLoading(true);
      // Simulate loading
      setTimeout(() => {
        saveUserName(name.trim());
        setIsLoading(false);
        setIsOpen(false);
      }, 1500);
    }
  };
  
  // Handle name input change
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  
  // Close modal without submitting (skip)
  const handleSkip = () => {
    setIsOpen(false);
  };
  
  if (!isOpen) {
    return null;
  }
  
  return (
    <div className="welcome-modal-overlay">
      <div className="welcome-modal">
        <div className="modal-content">
          {modalStage === 0 && (
            <div className="modal-loading">
              <div className="modal-loading-icon">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle className="modal-circle" cx="50" cy="50" r="45" />
                </svg>
                <div className="modal-inner-circle"></div>
              </div>
              <div className="bootup-text">
                <span>INITIALIZING J.A.R.V.I.S</span>
                <span className="dots">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </span>
              </div>
            </div>
          )}
          
          {modalStage === 1 && (
            <div className="modal-welcome">
              <div className="modal-header">
                <h2>
                  <span className="jarvis-text">Portfolio</span> 
                  <span className="version-text">v1.0</span>
                </h2>
                <div className="tech-decorations">
                  <div className="tech-line"></div>
                  <div className="tech-dot"></div>
                </div>
              </div>
              
              <div className="modal-greeting">
                <p>
                  <span className="greeting-line">Welcome to my Portfolio.</span>
                  <span className="greeting-line">I'm Alex Davis, a Full Stack Developer.</span>
                  <span className="greeting-line">How may I address you?</span>
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="modal-form">
                <div className="input-wrapper">
                  <input 
                    ref={inputRef}
                    type="text" 
                    value={name} 
                    onChange={handleNameChange} 
                    placeholder="Enter your name"
                    className="name-input"
                    maxLength="25"
                  />
                  <div className="input-focus-line"></div>
                </div>
                
                <div className="modal-actions">
                  <button 
                    type="button" 
                    className="modal-button skip-button"
                    onClick={handleSkip}
                  >
                    SKIP
                  </button>
                  
                  <button 
                    type="submit" 
                    className="modal-button submit-button"
                    disabled={!name.trim() || isLoading}
                  >
                    {isLoading ? (
                      <span className="loading-indicator">
                        <FontAwesomeIcon icon={faCircleNotch} spin />
                        PROCESSING
                      </span>
                    ) : (
                      'CONFIRM'
                    )}
                  </button>
                </div>
              </form>
              
              <div className="modal-footer">
                <div className="scan-line"></div>
                <p>STARK INDUSTRIES CONFIDENTIAL • AUTHORIZED ACCESS ONLY</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="modal-corners">
          <div className="corner top-left"></div>
          <div className="corner top-right"></div>
          <div className="corner bottom-left"></div>
          <div className="corner bottom-right"></div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal; 