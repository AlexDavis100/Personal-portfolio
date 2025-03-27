import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <section className="not-found-section">
      <div className="container">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The page you are looking for doesn't exist or has been moved.</p>
          <div className="actions">
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
        <div className="not-found-animation">
          <div className="astronaut">
            <div className="astronaut-body"></div>
            <div className="astronaut-head"></div>
            <div className="astronaut-arm left"></div>
            <div className="astronaut-arm right"></div>
            <div className="astronaut-leg left"></div>
            <div className="astronaut-leg right"></div>
          </div>
          <div className="planet"></div>
          <div className="stars"></div>
        </div>
      </div>
    </section>
  );
};

export default NotFound; 