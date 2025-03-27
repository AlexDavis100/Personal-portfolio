import React, { useEffect, useRef, useState } from 'react';
import '../styles/TechCursor.css';

const TechCursor = () => {
  const cursorRef = useRef(null);
  const cursorRingRef = useRef(null);
  const cursorDotRef = useRef(null);
  const trailsRef = useRef([]);
  const clickRippleRef = useRef(null);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  
  // Number of trail elements
  const trailCount = 5;
  
  useEffect(() => {
    // Create cursor trail elements
    const trails = [];
    for (let i = 0; i < trailCount; i++) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.opacity = 1 - (i / trailCount);
      trail.style.width = `${16 - (i * 2)}px`;
      trail.style.height = `${16 - (i * 2)}px`;
      document.body.appendChild(trail);
      trails.push(trail);
    }
    trailsRef.current = trails;
    
    // Create click ripple element
    const clickRipple = document.createElement('div');
    clickRipple.className = 'click-ripple';
    document.body.appendChild(clickRipple);
    clickRippleRef.current = clickRipple;
    
    // Track cursor movement
    const onMouseMove = (e) => {
      if (!cursorVisible) setCursorVisible(true);
      
      // Main cursor position with slight lag
      if (cursorRef.current && cursorRingRef.current && cursorDotRef.current) {
        // Smooth cursor following
        requestAnimationFrame(() => {
          cursorRef.current.style.left = `${e.clientX}px`;
          cursorRef.current.style.top = `${e.clientY}px`;
          
          // Cursor dot follows immediately
          cursorDotRef.current.style.left = `${e.clientX}px`;
          cursorDotRef.current.style.top = `${e.clientY}px`;
        });
      }
      
      // Update trail positions with delay
      trailsRef.current.forEach((trail, index) => {
        setTimeout(() => {
          if (trail) {
            trail.style.left = `${e.clientX - trail.offsetWidth / 2}px`;
            trail.style.top = `${e.clientY - trail.offsetHeight / 2}px`;
          }
        }, index * 40); // Staggered delay for trail effect
      });
    };
    
    // Handle mouse down/up events for click effect
    const onMouseDown = (e) => {
      setIsClicking(true);
      
      // Create particle explosion on click
      createClickParticles(e.clientX, e.clientY);
      
      // Trigger ripple effect
      if (clickRippleRef.current) {
        clickRippleRef.current.style.left = `${e.clientX}px`;
        clickRippleRef.current.style.top = `${e.clientY}px`;
        clickRippleRef.current.classList.add('active');
        
        setTimeout(() => {
          if (clickRippleRef.current) {
            clickRippleRef.current.classList.remove('active');
          }
        }, 700);
      }
    };
    
    const onMouseUp = () => {
      setIsClicking(false);
    };
    
    // Hide cursor when leaving window
    const onMouseLeave = () => {
      setCursorVisible(false);
    };
    
    // Show cursor when entering window
    const onMouseEnter = () => {
      setCursorVisible(true);
    };
    
    // Change cursor style on clickable elements
    const onElementHover = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add('cursor-hover');
      }
    };
    
    const onElementLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove('cursor-hover');
      }
    };
    
    // Add event listeners
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    
    // Add hover effect to all clickable elements
    const clickableElements = document.querySelectorAll('a, button, input, select, textarea, [role="button"]');
    clickableElements.forEach(element => {
      element.addEventListener('mouseenter', onElementHover);
      element.addEventListener('mouseleave', onElementLeave);
    });
    
    // Create click particles
    function createClickParticles(x, y) {
      const particleCount = 12;
      const colors = ['#00ccff', '#0088ff', '#5500ff', '#00ffcc', '#ffffff'];
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Random size between 4px and 8px
        const size = Math.random() * 4 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Position at click
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        document.body.appendChild(particle);
        
        // Random direction and speed
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 120 + 50;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        
        // Animate the particle
        let startTime = null;
        
        function animateParticle(timestamp) {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;
          
          // Position based on velocity and time
          const tx = x + vx * (elapsed / 1000);
          const ty = y + vy * (elapsed / 1000) + 0.5 * 980 * Math.pow(elapsed / 1000, 2); // Add gravity
          
          particle.style.transform = `translate(${tx - x}px, ${ty - y}px)`;
          
          // Fade out
          const opacity = 1 - elapsed / 1000;
          if (opacity > 0) {
            particle.style.opacity = opacity;
            requestAnimationFrame(animateParticle);
          } else {
            particle.remove();
          }
        }
        
        requestAnimationFrame(animateParticle);
      }
    }
    
    // Cleanup on unmount
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      
      clickableElements.forEach(element => {
        element.removeEventListener('mouseenter', onElementHover);
        element.removeEventListener('mouseleave', onElementLeave);
      });
      
      trailsRef.current.forEach(trail => {
        if (trail) trail.remove();
      });
      
      if (clickRippleRef.current) {
        clickRippleRef.current.remove();
      }
    };
  }, [cursorVisible]);
  
  return (
    <>
      <div
        ref={cursorRef}
        className={`tech-cursor ${cursorVisible ? 'visible' : ''} ${isClicking ? 'clicking' : ''}`}
      >
        <div className="cursor-ring"></div>
      </div>
      <div
        ref={cursorDotRef}
        className={`cursor-dot ${cursorVisible ? 'visible' : ''}`}
      ></div>
    </>
  );
};

export default TechCursor; 