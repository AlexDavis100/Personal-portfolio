import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>Alex Davis</h2>
            <p>Software Developer</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-nav">
              <h3>Navigation</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/projects">Projects</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            
            <div className="footer-social">
              <h3>Connect</h3>
              <div className="social-icons">
                <a href="https://www.linkedin.com/in/alex-davis-7b6bb1289/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
                <a href="https://github.com/AlexDavis28" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Alex Davis. All rights reserved.</p>
          <p>Built with React</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 