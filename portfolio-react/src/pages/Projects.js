import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/Projects.css';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Professional Website',
      description: 'A responsive professional portfolio website showcasing my skills and experience.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/AlexDavis100',
      demo: 'https://alexdavis-professionalprofile.netlify.app',
      image: '/assets/projects/project1.jpg',
    },
    {
      id: 2,
      title: 'Weather App using API',
      description: 'A real-time weather application that fetches data using weather APIs.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'API'],
      github: 'https://github.com/AlexDavis100/Weather-App-2-',
      demo: 'https://weather-forecast-by-uplifttech.netlify.app/',
      image: '/assets/projects/project2.jpg',
    },
    {
      id: 3,
      title: 'Ecommerce Website',
      description: 'A fully functional ecommerce website with product listings and checkout functionality.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/AlexDavis100',
      demo: 'https://serenajewelriesandessentials.netlify.app/',
      image: '/assets/projects/project3.jpg',
    },
    {
      id: 4,
      title: 'Company Website',
      description: 'A business website for UpLiftTeck showcasing company services and information.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/AlexDavis100/UpliftTech-Website',
      demo: 'https://upliftteck.co/',
      image: '/assets/projects/project4.jpg',
    },
    {
      id: 5,
      title: 'Django CRM App',
      description: 'A customer relationship management application built using Django framework.',
      technologies: ['Python', 'Django', 'HTML', 'CSS'],
      github: 'https://github.com/AlexDavis100/Django-CROM',
      demo: null,
      image: '/assets/projects/project5.jpg',
    }
  ];

  return (
    <section className="projects-section section">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        
        <div className="projects-filter">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Web Development</button>
          <button className="filter-btn">Frontend</button>
          <button className="filter-btn">Backend</button>
        </div>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              className="project-card" 
              key={project.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="project-img-container">
                <img 
                  src={project.image} 
                  alt={project.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/600x400.png?text=${project.title.replace(' ', '+')}`;
                  }}
                />
                <div className="project-overlay">
                  <div className="project-links">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                        <FontAwesomeIcon icon={faGithub} />
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                        <FontAwesomeIcon icon={faExternalLinkAlt} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, i) => (
                    <span key={i}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 