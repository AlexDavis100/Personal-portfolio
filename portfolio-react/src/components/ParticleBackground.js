import React, { useEffect, useRef } from 'react';
import '../styles/ParticleBackground.css';

// Particle class definition (moved outside of useEffect to avoid initialization error)
class Particle {
  constructor(canvas, ctx, options = {}) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = options.x || Math.random() * canvas.width;
    this.y = options.y || Math.random() * canvas.height;
    this.vx = options.vx || (Math.random() - 0.5) * 0.5;
    this.vy = options.vy || (Math.random() - 0.5) * 0.5;
    this.radius = options.radius || Math.random() * 2 + 1;
    this.originalRadius = this.radius;
    this.color = options.color || `rgba(0, 153, 255, ${Math.random() * 0.5 + 0.2})`;
    this.lifespan = options.lifespan || Infinity;
    this.age = 0;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  update() {
    this.age++;
    
    // If particle has a lifespan, shrink it as it ages
    if (this.lifespan !== Infinity) {
      const lifePercent = 1 - this.age / this.lifespan;
      this.radius = this.originalRadius * lifePercent;
      
      // Adjust opacity based on life remaining
      if (typeof this.color === 'string' && this.color.startsWith('rgba')) {
        const colorParts = this.color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([.\d]+)\)/);
        if (colorParts) {
          const opacity = parseFloat(colorParts[4]) * lifePercent;
          this.color = `rgba(${colorParts[1]}, ${colorParts[2]}, ${colorParts[3]}, ${opacity})`;
        }
      }
    }
    
    this.x += this.vx;
    this.y += this.vy;
    
    // Edge detection
    if (this.x < 0 || this.x > this.canvas.width) {
      this.vx = -this.vx * 0.8;
    }
    
    if (this.y < 0 || this.y > this.canvas.height) {
      this.vy = -this.vy * 0.8;
    }
    
    // Keep particles within canvas
    this.x = Math.max(0, Math.min(this.canvas.width, this.x));
    this.y = Math.max(0, Math.min(this.canvas.height, this.y));
    
    return this.age < this.lifespan && this.radius > 0.1;
  }
}

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mousePositionRef = useRef({ x: null, y: null });
  const frameRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Resize canvas to fill window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Track mouse movement
    const updateMousePosition = (e) => {
      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    window.addEventListener('mousemove', updateMousePosition);
    
    // Initialize particles
    const initParticles = () => {
      const particleCount = Math.min(100, Math.floor(window.innerWidth * window.innerHeight / 8000));
      const particles = [];
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas, ctx));
      }
      
      particlesRef.current = particles;
    };
    initParticles();
    
    // Create explosion of particles on click
    const handleClick = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      createExplosionParticles(x, y);
    };
    
    const createExplosionParticles = (x, y) => {
      const explosionCount = 20;
      const explosionColors = [
        'rgba(0, 204, 255, 0.8)',
        'rgba(0, 255, 204, 0.8)',
        'rgba(51, 153, 255, 0.8)',
        'rgba(0, 102, 255, 0.8)',
        'rgba(153, 204, 255, 0.8)'
      ];
      
      for (let i = 0; i < explosionCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 2;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        const radius = Math.random() * 3 + 2;
        const color = explosionColors[Math.floor(Math.random() * explosionColors.length)];
        
        particlesRef.current.push(new Particle(canvas, ctx, {
          x,
          y,
          vx,
          vy,
          radius,
          color,
          lifespan: 80 + Math.random() * 40
        }));
      }
    };
    
    window.addEventListener('click', handleClick);
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.draw();
        return particle.update();
      });
      
      // Replenish particles if needed
      if (particlesRef.current.length < 80) {
        particlesRef.current.push(new Particle(canvas, ctx));
      }
      
      // Create lines between particles that are close to each other
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 153, 255, ${(1 - distance / 150) * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      // Connect particles to mouse cursor when available
      if (mousePositionRef.current.x !== null && mousePositionRef.current.y !== null) {
        for (const particle of particlesRef.current) {
          const dx = particle.x - mousePositionRef.current.x;
          const dy = particle.y - mousePositionRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 204, 255, ${(1 - distance / 200) * 0.5})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(mousePositionRef.current.x, mousePositionRef.current.y);
            ctx.stroke();
            
            // Attract particles slightly towards cursor
            particle.vx += dx > 0 ? -0.05 : 0.05;
            particle.vy += dy > 0 ? -0.05 : 0.05;
            
            // Limit velocity
            const maxVelocity = 2;
            const velocity = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
            if (velocity > maxVelocity) {
              particle.vx = (particle.vx / velocity) * maxVelocity;
              particle.vy = (particle.vy / velocity) * maxVelocity;
            }
          }
        }
      }
      
      frameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);
  
  return (
    <canvas ref={canvasRef} className="particle-background"></canvas>
  );
};

export default ParticleBackground; 