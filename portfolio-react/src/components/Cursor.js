import React, { useEffect, useState, useRef } from 'react';
import '../styles/Cursor.css';

const Cursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;

    // Add event listener for mouse movement
    const onMouseMove = (e) => {
      // Set cursor position with a slight delay for trailing effect
      requestAnimationFrame(() => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      });

      // Set cursor dot position immediately
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
    };

    // Handle mouse interactions with clickable elements
    const onMouseDown = () => {
      cursor.classList.add('cursor-clicked');
      cursorDot.classList.add('cursor-dot-clicked');
    };

    const onMouseUp = () => {
      cursor.classList.remove('cursor-clicked');
      cursorDot.classList.remove('cursor-dot-clicked');
    };

    const onMouseEnter = () => {
      setIsVisible(true);
      cursor.classList.remove('cursor-hidden');
      cursorDot.classList.remove('cursor-dot-hidden');
    };

    const onMouseLeave = () => {
      setIsVisible(false);
      cursor.classList.add('cursor-hidden');
      cursorDot.classList.add('cursor-dot-hidden');
    };

    // Add hover effect for clickable elements
    const addHoverEffect = () => {
      const clickables = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
      
      clickables.forEach((element) => {
        element.addEventListener('mouseenter', () => {
          cursor.classList.add('cursor-hover');
          cursorDot.classList.add('cursor-dot-hover');
        });
        
        element.addEventListener('mouseleave', () => {
          cursor.classList.remove('cursor-hover');
          cursorDot.classList.remove('cursor-dot-hover');
        });
      });
    };

    // Initialize
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    
    // Don't show custom cursor on mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      setIsVisible(false);
      cursor.classList.add('cursor-hidden');
      cursorDot.classList.add('cursor-dot-hidden');
    }

    // Add hover effect after DOM is fully loaded
    window.addEventListener('load', addHoverEffect);

    // Cleanup event listeners
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('load', addHoverEffect);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className={`cursor ${isVisible ? '' : 'cursor-hidden'}`}
      ></div>
      <div 
        ref={cursorDotRef} 
        className={`cursor-dot ${isVisible ? '' : 'cursor-dot-hidden'}`}
      ></div>
    </>
  );
};

export default Cursor; 