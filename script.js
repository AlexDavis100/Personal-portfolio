// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize loading screen
  const loadingScreen = document.querySelector('.loading-screen');
  
  // Function to show page content when everything is loaded
  function showContent() {
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      // Start animations after loading
      startAnimations();
    }, 1000);
  }

  // Initialize particles.js with error handling
  try {
    if (typeof particlesJS !== 'undefined') {
      particlesJS('particles-js', {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: '#0cffe1'
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#000000'
            }
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#0cffe1',
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'grab'
            },
            onclick: {
              enable: true,
              mode: 'push'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 1
              }
            },
            push: {
              particles_nb: 4
            }
          }
        },
        retina_detect: true
      });
      console.log('Particles.js initialized successfully');
    } else {
      console.warn('Particles.js is not loaded');
    }
  } catch (error) {
    console.error('Error initializing particles.js:', error);
  }

  // Wait for window load to ensure all resources are loaded
  window.addEventListener('load', showContent);

  // Initialize AOS animations
  try {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        offset: 100,
        once: true,
        easing: 'ease-in-out',
        delay: 100
      });
      console.log('AOS initialized successfully');
    } else {
      console.warn('AOS is not loaded');
    }
  } catch (error) {
    console.error('Error initializing AOS:', error);
  }

  // Custom cursor
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      // Add slight delay to cursor follower for smoother effect
      setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
      }, 70);
    });

    document.addEventListener('mousedown', () => {
      cursor.classList.add('active');
      cursorFollower.classList.add('active');
    });

    document.addEventListener('mouseup', () => {
      cursor.classList.remove('active');
      cursorFollower.classList.remove('active');
    });

    // Add hover effect for links and buttons
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card, .contact-card');
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        cursorFollower.classList.add('active');
      });
      
      element.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        cursorFollower.classList.remove('active');
      });
    });
  }

  // Initialize glitch text effect
  const glitchTexts = document.querySelectorAll('.glitch-text');
  glitchTexts.forEach(text => {
    if (!text.getAttribute('data-text')) {
      text.setAttribute('data-text', text.textContent);
    }
  });

  // Animated text setup
  function startAnimations() {
    // Animate hero text letters with proper delay
    const textAnimateElements = document.querySelectorAll('.text-animate');
    textAnimateElements.forEach((element, index) => {
      // Set animation delay based on index if not already set
      if (!element.style.getPropertyValue('--i')) {
        element.style.setProperty('--i', index + 1);
      }
      // Ensure animation starts
      element.style.opacity = '1';
    });

    // Initialize skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
      // Get width from style attribute and set initially to 0
      const targetWidth = bar.style.width;
      bar.style.width = '0';
      
      // Animate to target width after a short delay
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 500);
    });

    // Animate stats bars
    const statBars = document.querySelectorAll('.stat-bar span');
    statBars.forEach(bar => {
      // Get width from style attribute and set initially to 0
      const targetWidth = bar.style.width;
      bar.style.width = '0';
      
      // Animate to target width after a short delay
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 800);
    });
  }

  // Typed.js for hero section
  try {
    if (typeof Typed !== 'undefined') {
      const options = {
        strings: [
          'Tech Enthusiast',
          'Business Developer',
          'Frontend Developer',
          'Quality Analyst',
          'Creative Problem Solver'
        ],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
        smartBackspace: true,
        startDelay: 500
      };
      
      new Typed('.typed-text', options);
      console.log('Typed.js initialized successfully');
    } else {
      console.warn('Typed.js is not loaded');
    }
  } catch (error) {
    console.error('Error initializing Typed.js:', error);
  }

  // Navbar scroll effect
  const navBar = document.getElementById('desktop-nav');
  if (navBar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navBar.classList.add('scrolled');
      } else {
        navBar.classList.remove('scrolled');
      }
    });
  }

  // Hamburger menu toggle
  function toggleMenu() {
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.hamburger-icon');
    if (menu && icon) {
      menu.classList.toggle('open');
      icon.classList.toggle('open');
    }
  }

  // Make toggleMenu accessible globally
  window.togglemenu = toggleMenu;

  // Experience tabs functionality
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and panes
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      // Add active class to current button
      button.classList.add('active');
      
      // Get tab ID and activate corresponding pane
      const tabId = button.getAttribute('data-tab');
      const targetPane = document.getElementById(tabId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // Back to top button
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  
  if (themeToggle) {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    function setTheme(theme) {
      document.body.classList.remove('light-theme', 'dark-theme');
      document.body.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
    
    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(prefersDarkScheme.matches ? 'dark-theme' : 'light-theme');
    }
    
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';
      const newTheme = currentTheme === 'dark-theme' ? 'light-theme' : 'dark-theme';
      setTheme(newTheme);
    });
  }

  // Handle form submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      if (!name || !email || !message) {
        alert('Please fill out all fields');
        return;
      }
      
      // Simulate form submission (replace with actual backend integration)
      alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
      contactForm.reset();
    });
  }

  // Update copyright year
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // GSAP animations for enhanced visual effects
  try {
    if (typeof gsap !== 'undefined') {
      // Timeline for hero section
      const heroTl = gsap.timeline();
      
      heroTl.from('.hero-content', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5
      });
      
      // Floating animation for profile image
      gsap.to('.profile-image-container', {
        y: 15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      
      // Scroll indicator
      gsap.to('.scroll-indicator', {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1
      });

      // Animate section tags
      gsap.from('.section-tag, .section-tag-end', {
        opacity: 0,
        y: 10,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.section-tag',
          start: 'top 80%',
        }
      });
      
      console.log('GSAP animations initialized successfully');
    } else {
      console.warn('GSAP is not loaded');
    }
  } catch (error) {
    console.error('Error initializing GSAP animations:', error);
  }
});
