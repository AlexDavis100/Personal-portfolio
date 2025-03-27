import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faLocationDot, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { useUser } from '../context/UserContext';
import '../styles/Contact.css';

const Contact = () => {
  const { userName } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [scanEffect, setScanEffect] = useState(false);

  // Update name field if userName is available
  useEffect(() => {
    if (userName) {
      setFormData(prev => ({ ...prev, name: userName }));
    }
  }, [userName]);

  // Hologram scanner effect
  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanEffect(true);
      setTimeout(() => setScanEffect(false), 1500);
    }, 7000);
    return () => clearInterval(scanInterval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({ name: userName || '', email: '', message: '' });
        setSubmitSuccess(false);
      }, 5000);
    }, 2000);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title glow-text">
          <span className="section-number">04.</span> Contact
        </h2>
        
        <div className="contact-intro">
          <p className="contact-message">
            {userName ? (
              <>Thanks for exploring my portfolio, <span className="highlight">{userName}</span>.</>
            ) : (
              <>Thanks for exploring my portfolio.</>
            )}
            {" "}Looking forward to connecting with you. Feel free to reach out through any of the channels below.
          </p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info-container glass-panel">
            <div className={`hologram-scan ${scanEffect ? 'active' : ''}`}></div>
            <h3 className="contact-info-title">
              <span className="tech-decorator"></span>
              Direct Channels
            </h3>
            
            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className="contact-details">
                  <h4>Email</h4>
                  <a href="mailto:upliftteck@gmail.com">upliftteck@gmail.com</a>
                </div>
              </div>
              
              <div className="contact-info-item">
                <div className="contact-icon">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div className="contact-details">
                  <h4>Phone</h4>
                  <a href="tel:876-508-9923">876-508-9923</a>
                </div>
              </div>
              
              <div className="contact-info-item">
                <div className="contact-icon">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </div>
                <div className="contact-details">
                  <h4>LinkedIn</h4>
                  <a href="https://www.linkedin.com/in/alex-davis-7b6bb1289/" target="_blank" rel="noopener noreferrer">
                    Alex Davis
                  </a>
                </div>
              </div>
              
              <div className="contact-info-item">
                <div className="contact-icon">
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <div className="contact-details">
                  <h4>Location</h4>
                  <p>New York, USA</p>
                </div>
              </div>
            </div>
            
            <div className="tech-indicators">
              <div className="tech-indicator"></div>
              <div className="tech-indicator"></div>
              <div className="tech-indicator"></div>
            </div>
          </div>
          
          <div className="contact-form-container glass-panel">
            <div className={`hologram-scan ${scanEffect ? 'active' : ''}`}></div>
            <h3 className="contact-form-title">
              <span className="tech-decorator"></span>
              Send Message
            </h3>
            
            {submitSuccess ? (
              <div className="success-message">
                <div className="success-icon">
                  <div className="success-checkmark"></div>
                </div>
                <h4>Message Sent!</h4>
                <p>Thank you for your message. I'll get back to you shortly.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <div className="input-container">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      disabled={isSubmitting}
                    />
                    <div className="input-focus-effect"></div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <div className="input-container">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      required
                      disabled={isSubmitting}
                    />
                    <div className="input-focus-effect"></div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <div className="input-container">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                      rows="5"
                      required
                      disabled={isSubmitting}
                    ></textarea>
                    <div className="input-focus-effect textarea"></div>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="button-loading">
                      <span></span><span></span><span></span>
                    </div>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </>
                  )}
                </button>
              </form>
            )}
            
            <div className="tech-indicators">
              <div className="tech-indicator"></div>
              <div className="tech-indicator"></div>
              <div className="tech-indicator"></div>
            </div>
          </div>
        </div>
        
        <div className="jarvis-note">
          <div className="jarvis-icon">A</div>
          <p>
            <span className="jarvis-name">Alex:</span> 
            {userName ? (
              <>Thank you for your message, <span className="highlight">{userName}</span>.</>
            ) : (
              <>I'm available for project consultations and collaborations.</>
            )} 
            Response time: typically within 24 hours.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact; 