import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <section className="about-section section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        
        <div className="about-content">
          <div className="about-image-container" data-aos="fade-right">
            <div className="about-image-wrapper">
              <img 
                src="/assets/Alex Pro Pic 2.jpg" 
                alt="Profile" 
                className="about-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/400x500.png?text=Profile+Image";
                }}
              />
              <div className="about-image-backdrop"></div>
            </div>
            <div className="tech-stack">
              <div className="tech-item">HTML</div>
              <div className="tech-item">CSS</div>
              <div className="tech-item">JavaScript</div>
              <div className="tech-item">React</div>
              <div className="tech-item">Node.js</div>
            </div>
          </div>
          
          <div className="about-text-container" data-aos="fade-left">
            <div className="about-text">
              <p>
                I am deeply passionate about continuous self-development,
                eagerly expanding my mental capacity to embrace emerging technological advancements. 
                With over 4 years of experience in the insurance industry, 
                I am a results-driven professional dedicated to propelling revenue growth, 
                forging strategic partnerships, and consistently exceeding sales targets.
              </p>
              <p>
                Leveraging market insights, I adeptly implement cutting-edge sales strategies 
                to capitalize on new business opportunities. My track record includes successful branch management 
                and meticulous quality analysis, optimizing operational efficiency while delivering exceptional customer service. 
                My robust leadership skills, combined with a customer-centric approach, prioritize client satisfaction and foster loyalty.
                I am unwaveringly committed to achieving organizational goals through a blend of innovation, collaboration, 
                and continual professional development.
              </p>
            </div>
            
            <div className="about-stats">
              <div className="stat">
                <div className="stat-number">4+</div>
                <div className="stat-label">Years in Insurance</div>
                <div className="stat-bar"><span style={{ width: "80%" }}></span></div>
              </div>
              <div className="stat">
                <div className="stat-number">3+</div>
                <div className="stat-label">Years in BPO</div>
                <div className="stat-bar"><span style={{ width: "60%" }}></span></div>
              </div>
              <div className="stat">
                <div className="stat-number">5+</div>
                <div className="stat-label">Projects Completed</div>
                <div className="stat-bar"><span style={{ width: "100%" }}></span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 