"use client";

import React, { useEffect, useRef } from 'react';

const WorldMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simplified world map coordinates (just for visualization)
    const mapPoints = [
      // North America
      [0.2, 0.3], [0.25, 0.25], [0.3, 0.3], [0.25, 0.35],
      // South America
      [0.3, 0.5], [0.25, 0.6], [0.3, 0.7],
      // Europe
      [0.5, 0.25], [0.55, 0.3], [0.52, 0.28],
      // Africa
      [0.5, 0.5], [0.55, 0.45], [0.5, 0.6],
      // Asia
      [0.65, 0.3], [0.7, 0.25], [0.75, 0.3], [0.8, 0.35],
      // Australia
      [0.8, 0.65], [0.85, 0.7]
    ];

    // Monitoring stations with different air quality levels (for visualization)
    const monitoringStations = [
      { pos: [0.22, 0.32], quality: 'good' },     // North America 1
      { pos: [0.28, 0.28], quality: 'moderate' }, // North America 2
      { pos: [0.26, 0.6], quality: 'poor' },      // South America
      { pos: [0.51, 0.27], quality: 'good' },     // Europe 1
      { pos: [0.54, 0.29], quality: 'moderate' }, // Europe 2
      { pos: [0.53, 0.5], quality: 'poor' },      // Africa
      { pos: [0.68, 0.28], quality: 'moderate' }, // Asia 1
      { pos: [0.76, 0.32], quality: 'poor' },     // Asia 2
      { pos: [0.82, 0.67], quality: 'good' },     // Australia
    ];

    function drawMap() {
      if (!ctx || !canvas) return;
      
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Draw map background
      ctx.fillStyle = 'rgba(16, 24, 39, 0.5)';
      ctx.fillRect(0, 0, width, height);
      
      // Draw grid lines
      ctx.strokeStyle = 'rgba(55, 65, 81, 0.5)';
      ctx.lineWidth = 0.5;
      
      // Horizontal grid lines
      for (let i = 0; i <= 5; i++) {
        ctx.beginPath();
        ctx.moveTo(0, height * i / 5);
        ctx.lineTo(width, height * i / 5);
        ctx.stroke();
      }
      
      // Vertical grid lines
      for (let i = 0; i <= 5; i++) {
        ctx.beginPath();
        ctx.moveTo(width * i / 5, 0);
        ctx.lineTo(width * i / 5, height);
        ctx.stroke();
      }
      
      // Draw continents (simplified)
      ctx.fillStyle = 'rgba(17, 94, 89, 0.4)'; // Teal color for land mass
      ctx.strokeStyle = 'rgba(20, 184, 166, 0.6)'; // Teal border
      ctx.lineWidth = 1;
      
      for (let i = 0; i < mapPoints.length; i++) {
        const [x, y] = mapPoints[i] || [0, 0];
        ctx.beginPath();
        ctx.arc((x || 0) * width, (y || 0) * height, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
      
      // Connect nearby points with lines to form continents
      ctx.strokeStyle = 'rgba(20, 184, 166, 0.4)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < mapPoints.length; i++) {
        for (let j = i + 1; j < mapPoints.length; j++) {
          const [x1, y1] = mapPoints[i] || [0, 0];
          const [x2, y2] = mapPoints[j] || [0, 0];
          
          // Only connect if points are close enough
          const distance = Math.sqrt(Math.pow((x2 || 0) - (x1 || 0), 2) + Math.pow((y2 || 0) - (y1 || 0), 2));
          if (distance < 0.15) {
            ctx.beginPath();
            ctx.moveTo((x1 || 0) * width, (y1 || 0) * height);
            ctx.lineTo((x2 || 0) * width, (y2 || 0) * height);
            ctx.stroke();
          }
        }
      }
      
      // Draw monitoring stations with different colors based on air quality
      for (const station of monitoringStations) {
        const [x, y] = station.pos;
        let color;
        
        switch (station.quality) {
          case 'good':
            color = 'rgba(16, 185, 129, 0.9)'; // Green
            break;
          case 'moderate':
            color = 'rgba(245, 158, 11, 0.9)'; // Yellow
            break;
          case 'poor':
            color = 'rgba(239, 68, 68, 0.9)'; // Red
            break;
          default:
            color = 'rgba(156, 163, 175, 0.9)'; // Gray
        }
        
        // Pulsing circle effect
        const time = Date.now() / 1000;
        const scale = 1 + 0.2 * Math.sin(time * 2 + (x || 0) * 10 + (y || 0) * 10);
        
        // Draw outer glow
        const gradient = ctx.createRadialGradient(
          (x || 0) * width, (y || 0) * height, 0,
          (x || 0) * width, (y || 0) * height, 15 * scale
        );
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc((x || 0) * width, (y || 0) * height, 15 * scale, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw station point
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc((x || 0) * width, (y || 0) * height, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Set canvas size
    const resize = () => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      drawMap();
    };

    window.addEventListener('resize', resize);
    resize();

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      drawMap();
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[250px]">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full rounded-lg"
      ></canvas>
      
      <div className="absolute bottom-2 left-2 flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
          <span className="text-gray-300">Good</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>
          <span className="text-gray-300">Moderate</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
          <span className="text-gray-300">Poor</span>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;