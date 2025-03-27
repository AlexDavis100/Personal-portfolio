import React, { useState, useEffect, useRef } from 'react';
import '../styles/TypeEffect.css';

/**
 * TypeEffect component for displaying text with a typewriter animation
 * @param {Array} phrases - Array of phrases to cycle through
 * @param {number} typingSpeed - Speed of typing animation in milliseconds
 * @param {number} deletingSpeed - Speed of deleting animation in milliseconds
 * @param {number} pauseTime - Time to pause between phrases in milliseconds
 * @param {string} cursorColor - Color of the cursor
 */
const TypeEffect = ({ 
  phrases = ["Hello World", "Welcome to my portfolio"], 
  typingSpeed = 80, 
  deletingSpeed = 50, 
  pauseTime = 1500,
  cursorColor = "#00ccff"
}) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const intervalRef = useRef(null);

  // Effect for cursor blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);

    return () => clearInterval(blinkInterval);
  }, []);

  // Effect for typing animation
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    
    const handleTyping = () => {
      // If deleting
      if (isDeleting) {
        setText(currentPhrase.substring(0, text.length - 1));
        
        // When fully deleted
        if (text.length === 1) {
          setIsDeleting(false);
          setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }
      } 
      // If typing
      else {
        setText(currentPhrase.substring(0, text.length + 1));
        
        // When fully typed
        if (text.length === currentPhrase.length) {
          // Pause before starting to delete
          clearInterval(intervalRef.current);
          
          setTimeout(() => {
            setIsDeleting(true);
            intervalRef.current = setInterval(handleTyping, deletingSpeed);
          }, pauseTime);
          
          return;
        }
      }
    };

    intervalRef.current = setInterval(
      handleTyping, 
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearInterval(intervalRef.current);
  }, [text, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <div className="type-effect-container">
      <span className="typed-text">{text}</span>
      <span 
        className={`cursor ${cursorVisible ? 'visible' : ''}`}
        style={{ backgroundColor: cursorColor }}
      ></span>
    </div>
  );
};

export default TypeEffect; 