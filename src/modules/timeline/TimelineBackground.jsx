import React, { useEffect, useRef } from 'react';
import './TimelineBackground.scss';

const TimelineBackground = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const glowingPointsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let glowingPoints = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
      initGlowingPoints();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor(canvas.width * canvas.height / 12000);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, ${Math.random() * 0.6 + 0.1})`,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
          directionChangeTimer: 0,
          directionChangeInterval: Math.random() * 100 + 50
        });
      }
      particlesRef.current = particles;
    };

    const initGlowingPoints = () => {
      glowingPoints = [];
      const pointCount = Math.floor(canvas.width / 150);
      
      for (let i = 0; i < pointCount; i++) {
        glowingPoints.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 40 + 20,
          color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, 0.1)`,
          pulse: 0,
          pulseSpeed: Math.random() * 0.02 + 0.01
        });
      }
      glowingPointsRef.current = glowingPoints;
    };

    const drawParticles = () => {
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
    };

    const drawGlowingPoints = () => {
      glowingPoints.forEach(point => {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, point.radius * (1 + Math.sin(point.pulse) * 0.3)
        );
        gradient.addColorStop(0, point.color.replace('0.1', '0.3'));
        gradient.addColorStop(1, point.color.replace('0.1', '0'));
        ctx.fillStyle = gradient;
        ctx.arc(point.x, point.y, point.radius * (1 + Math.sin(point.pulse) * 0.3), 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawGrid = () => {
      const gridSize = 40;
      const lineOpacity = 0.1;

      ctx.strokeStyle = `rgba(100, 149, 237, ${lineOpacity})`;
      ctx.lineWidth = 0.5;

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
    };

    const updateParticles = () => {
      particles.forEach(particle => {
        particle.directionChangeTimer++;
        
        if (particle.directionChangeTimer >= particle.directionChangeInterval) {
          particle.speedX = Math.random() * 1 - 0.5;
          particle.speedY = Math.random() * 1 - 0.5;
          particle.directionChangeTimer = 0;
        }

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y > canvas.height) particle.y = 0;
      });
    };

    const updateGlowingPoints = () => {
      glowingPoints.forEach(point => {
        point.pulse += point.pulseSpeed;
        if (point.pulse > Math.PI * 2) {
          point.pulse = 0;
        }
      });
    };

    const connectParticles = () => {
      const maxDistance = 150;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = `rgba(100, 149, 237, ${opacity * 0.3})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawGrid();
      drawGlowingPoints();
      updateGlowingPoints();
      drawParticles();
      updateParticles();
      connectParticles();
      
      animationFrameId = window.requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="timeline-background-canvas"></canvas>
  );
};

export default TimelineBackground; 