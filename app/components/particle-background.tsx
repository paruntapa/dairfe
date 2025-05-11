"use client";

import React, { useRef, useEffect } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Set initial canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      alphaSpeed: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = Math.random() * (canvas?.height || 0);
        this.size = Math.random() * 3 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        
        // Color variations - teal/cyan/blue palette for air quality theme
        const colors = [
          'rgba(20, 184, 166, alpha)', // teal
          'rgba(6, 182, 212, alpha)',  // cyan
          'rgba(59, 130, 246, alpha)', // blue
          'rgba(124, 58, 237, alpha)'  // purple
        ];
        
        this.color = colors[Math.floor(Math.random() * colors.length)] || 'rgba(20, 184, 166, alpha)';
        this.alpha = Math.random() * 0.6 + 0.1; // Initial alpha between 0.1 and 0.7
        this.alphaSpeed = Math.random() * 0.01 + 0.001; // Speed of alpha change
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x > (canvas?.width || 0) || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > (canvas?.height || 0) || this.y < 0) {
          this.speedY = -this.speedY;
        }

        // Breathing effect - alpha oscillation
        this.alpha += this.alphaSpeed;
        if (this.alpha > 0.7 || this.alpha < 0.1) {
          this.alphaSpeed = -this.alphaSpeed;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color.replace('alpha', this.alpha.toString());
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      const particleCount = Math.min(100, Math.floor((canvas?.width || 0) * (canvas?.height || 0) / 15000));
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);
      
      // Draw and update particles
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
      
      // Draw connections
      drawConnections();
      
      animationFrameId = requestAnimationFrame(animate);
    }

    function drawConnections() {
      if (!ctx) return;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i]?.x! - particles[j]?.x!;
          const dy = particles[i]?.y! - particles[j]?.y!;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only draw connections if particles are close enough    
          const maxDistance = 150;
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(20, 184, 166, ${opacity * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i]?.x || 0, particles[i]?.y || 0);
            ctx.lineTo(particles[j]?.x || 0, particles[j]?.y || 0);
            ctx.stroke();
          }
        }
      }
    }

    // Initialize and start animation
    initParticles();
    animate();

    // Event listeners
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 bg-gradient-to-b from-black via-gray-900 to-black"
    />
  );
};

export default ParticleBackground;