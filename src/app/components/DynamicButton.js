'use client';

import { useEffect, useState } from 'react';

/**
 * DynamicButton Component
 * 
 * A button that dynamically changes its glow color to match the mouse effect colors.
 * Cycles between pink and green with the same timing as the neural network effect.
 */
export default function DynamicButton({ href, children, className = "" }) {
  const [glowColor, setGlowColor] = useState('rgb(255, 0, 128)'); // Start with pink

  useEffect(() => {
    let colorCycle = 0;
    
    const updateColor = () => {
      // Same 8-second cycle as the mouse effect
      colorCycle += 16; // ~60fps
      const cycleTime = (colorCycle % 8000) / 8000; // 0 to 1
      
      // Same color transition: pink -> green -> pink
      const colorPhase = Math.sin(cycleTime * Math.PI * 2) * 0.5 + 0.5; // 0 to 1
      
      // Glitch Pink: (255, 0, 128), Glitch Green: (0, 255, 128)
      const r = Math.round(255 - 255 * colorPhase);
      const g = Math.round(0 + 255 * colorPhase);
      const b = 128; // Keep blue constant for consistency
      
      setGlowColor(`rgb(${r}, ${g}, ${b})`);
    };

    const interval = setInterval(updateColor, 16); // ~60fps
    return () => clearInterval(interval);
  }, []);

  return (
    <a 
      href={href} 
      className={`group bg-gray-900 border-2 border-gray-400 px-4 py-3 relative overflow-hidden transition-all duration-200 hover:scale-105 cursor-pointer flex items-center justify-center whitespace-nowrap w-32 ${className}`}
      style={{
        '--glow-color': glowColor,
      }}
      onMouseEnter={(e) => {
        e.target.style.borderColor = glowColor;
        e.target.style.boxShadow = `0 10px 15px -3px ${glowColor}30, 0 4px 6px -2px ${glowColor}30`;
      }}
      onMouseLeave={(e) => {
        e.target.style.borderColor = '#9ca3af'; // gray-400
        e.target.style.boxShadow = 'none';
      }}
    >
      <div className="absolute inset-0 bg-gray-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
      <span className="relative text-gray-400 group-hover:text-white text-sm tracking-wider">{children}</span>
    </a>
  );
}