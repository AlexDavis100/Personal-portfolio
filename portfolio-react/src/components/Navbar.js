import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faTimes, 
  faSun, 
  faMoon, 
  faHome,
  faUser,
  faCode,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { userName } = useUser();
  const { theme, toggleTheme } = useTheme();
  
  // Track scroll position to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  // Use theme from ThemeContext to determine icon
  const isDarkMode = theme === 'dark';
  
  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <div className="logo-wrapper">
            <div className="logo-icon">A</div>
            <div className="logo-text">
              <h1>Alex Davis</h1>
              <span className="logo-version">Portfolio v1.0</span>
            </div>
          </div>
          
          {userName && (
            <div className="user-greeting">
              <span className="greeting-text">Hello,</span>
              <span className="user-name">{userName}</span>
            </div>
          )}
        </div>
        
        <div className="navbar-controls">
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
            <span className="tooltip">
              {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </span>
          </button>
          
          <button 
            className="menu-toggle" 
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <div className="menu-icon">
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
            </div>
          </button>
        </div>
        
        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <div className="menu-header">
            <span>Navigation</span>
            <div className="menu-decorations">
              <div className="menu-line"></div>
              <div className="menu-dot"></div>
            </div>
          </div>
          
          <ul className="nav-links">
            <li className="nav-item">
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                <FontAwesomeIcon icon={faHome} />
                <span>Home</span>
                <div className="link-highlight"></div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                <FontAwesomeIcon icon={faUser} />
                <span>About</span>
                <div className="link-highlight"></div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>
                <FontAwesomeIcon icon={faCode} />
                <span>Projects</span>
                <div className="link-highlight"></div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
                <FontAwesomeIcon icon={faEnvelope} />
                <span>Contact</span>
                <div className="link-highlight"></div>
              </Link>
            </li>
          </ul>
          
          <div className="menu-footer">
            <div className="system-status">
              <div className="status-indicator active"></div>
              <span>Portfolio Online</span>
            </div>
          </div>
        </div>
        
        <div className={`menu-backdrop ${isOpen ? 'active' : ''}`} onClick={toggleMenu}></div>
      </div>
    </nav>
  );
};

export default Navbar; 