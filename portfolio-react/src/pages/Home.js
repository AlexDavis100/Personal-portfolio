import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faDownload, faPaperPlane, faCode, faAtom, faRocket } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../context/UserContext';
import '../styles/Home.css';

// Import on demand with React.lazy
const LazyParticleBackground = React.lazy(() => import('../components/ParticleBackground'));
const LazyTypeEffect = React.lazy(() => import('../components/TypeEffect'));

const Home = () => {
  const { userName } = useUser();
  const [isProfileImageLoaded, setIsProfileImageLoaded] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const textOptions = [
    "Full Stack Developer",
    "Tech Enthusiast & Professional",
    "UpLiftTeck Founder & CEO",
    "Web Developer"
  ];

  // Load profile image dynamically to improve initial render time
  const [profileImage, setProfileImage] = useState(null);
  useEffect(() => {
    // Dynamically import the profile image
    import('../assets/profile.jpg')
      .then(image => {
        setProfileImage(image.default);
      })
      .catch(err => console.error("Failed to load profile image:", err));
      
    // Show particles after a short delay to prioritize main content rendering
    const timer = setTimeout(() => {
      setShowParticles(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Hologram flicker effect with useCallback to prevent recreation on each render
  const setupHologramFlicker = useCallback(() => {
    const flickerElement = () => {
      const hologramElements = document.querySelectorAll('.hologram-flicker');
      hologramElements.forEach(el => {
        if (Math.random() > 0.7) { // Reduced frequency of flickers
          el.classList.add('flicker');
          setTimeout(() => {
            el.classList.remove('flicker');
          }, 150);
        }
      });
    };
    
    const flickerInterval = setInterval(flickerElement, 3000); // Less frequent flicker
    return () => clearInterval(flickerInterval);
  }, []);

  useEffect(() => {
    const cleanup = setupHologramFlicker();
    return cleanup;
  }, [setupHologramFlicker]);

  // Handle profile image loading
  const handleImageLoad = () => {
    setIsProfileImageLoaded(true);
  };

  return (
    <div id="home" className="hero-section">
      {/* Lazy load particle background */}
      {showParticles && (
        <React.Suspense fallback={null}>
          <LazyParticleBackground />
        </React.Suspense>
      )}
      
      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-greeting hologram-flicker">
            {userName ? (
              <span>Hello <span className="glow-text">{userName}</span>, I'm</span>
            ) : (
              <span>Hello, I'm</span>
            )}
          </div>
          
          <h1 className="hero-name">
            Alex Davis
            <div className="hero-name-decorator"></div>
          </h1>
          
          <div className="hero-title-container">
            <React.Suspense fallback={<h2 className="hero-title">Innovator</h2>}>
              <LazyTypeEffect phrases={textOptions} typingSpeed={80} deletingSpeed={50} pauseTime={2000} />
            </React.Suspense>
          </div>
          
          <p className="hero-description">
            Passionate about continuous self-development and embracing new technologies. With 
            experience in both insurance and tech industries, I create innovative solutions 
            and deliver exceptional results. Welcome to my digital portfolio where you can 
            explore my projects and technical skills.
          </p>
          
          <div className="company-info glass-panel">
            <a href="https://upliftteck.co" target="_blank" rel="noopener noreferrer" className="logo-link">
              <div className="stark-logo">
                <span>UPLIFT</span>
                <span className="industries">TECK</span>
              </div>
              <p>Changing the world through innovation</p>
            </a>
          </div>

          <div className="hero-buttons">
            <a href="/assets/Alex Davis - CV 24.pdf" download className="download-button">
              <span>View Resume</span>
              <FontAwesomeIcon icon={faDownload} />
            </a>
            <a href="#contact" className="contact-button">
              <span>Get in Touch</span>
              <FontAwesomeIcon icon={faPaperPlane} />
            </a>
          </div>
          
          <div className="socials-container">
            <a href="https://www.linkedin.com/in/alex-davis-7b6bb1289/" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a href="https://github.com/AlexDavis28" target="_blank" rel="noopener noreferrer" className="social-icon github">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </div>
        
        <div className={`hero-image-container holographic ${isProfileImageLoaded ? 'loaded' : ''}`}>
          <div className="image-hologram-effect"></div>
          {profileImage && (
            <img 
              src={profileImage} 
              alt="Alex Davis" 
              className="profile-img" 
              onLoad={handleImageLoad}
            />
          )}
          
          {/* Floating tech icons around image - only show when profile image is loaded */}
          {isProfileImageLoaded && (
            <>
              <div className="floating-icons">
                <div className="floating-icon icon-1">
                  <FontAwesomeIcon icon={faCode} />
                </div>
                <div className="floating-icon icon-2">
                  <FontAwesomeIcon icon={faAtom} />
                </div>
                <div className="floating-icon icon-3">
                  <FontAwesomeIcon icon={faRocket} />
                </div>
              </div>
              
              {/* Tech scan lines */}
              <div className="scan-line-container">
                <div className="scan-line"></div>
                <div className="scan-line"></div>
                <div className="scan-line"></div>
              </div>
              
              {/* Tech data points */}
              <div className="data-points">
                <div className="data-point dp1"></div>
                <div className="data-point dp2"></div>
                <div className="data-point dp3"></div>
                <div className="data-point dp4"></div>
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="jarvis-assistant">
        <div className="jarvis-circle"></div>
        <div className="jarvis-wave"></div>
        <div className="jarvis-text">PORTFOLIO LOADED</div>
      </div>
    </div>
  );
}

export default Home; 