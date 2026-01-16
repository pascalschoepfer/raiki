import React, { useState, useEffect } from 'react';

/**
 * RaikiLogo Component
 * 
 * A scalable SVG-based company logo featuring a cyberpunk geometric design.
 * The logo consists of nested hexagonal shapes with connecting lines and 
 * a central dot, accompanied by the "raiki" brand text.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className=""] - Additional CSS classes for custom styling
 * 
 * @returns {JSX.Element} The rendered logo component
 * 
 * @example
 * // Basic usage
 * <RaikiLogo />
 * 
 * @example
 * // With custom scaling
 * <RaikiLogo className="scale-[240%]" />
 * 
 * Features:
 * - Scalable SVG design that maintains quality at any size
 * - Cyberpunk aesthetic with white strokes and opacity variations
 * - Geometric hexagonal pattern with central focus point
 * - Monospace typography for tech/cyber branding consistency
 * - Responsive design that adapts to different screen sizes
 */
/**
 * ScrambleGlitchText Component
 * 
 * Combines character scrambling with RGB glitch effects for a cyberpunk look.
 * Characters randomly change to symbols/numbers, while red/blue shadows create
 * the classic glitch separation effect.
 */
function ScrambleGlitchText({ text, className }) {
  const [displayText, setDisplayText] = useState(text);
  
  useEffect(() => {
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01';
    const originalText = text;
    
    const scramble = () => {
      // Glitch only 1-2 characters max (favor 1)
      const numToGlitch = Math.random() < 0.7 ? 1 : 2;
      let newText = originalText;
      
      for (let g = 0; g < numToGlitch; g++) {
        const randomIndex = Math.floor(Math.random() * originalText.length);
        const randomChar = chars[Math.floor(Math.random() * chars.length)];
        newText = newText.substring(0, randomIndex) + randomChar + newText.substring(randomIndex + 1);
      }
      
      setDisplayText(newText);
      
      // Reset to original after short delay
      setTimeout(() => setDisplayText(originalText), 100 + Math.random() * 80);
    };
    
    const interval = setInterval(scramble, 4000 + Math.random() * 2000); // Every 4-6 seconds
    return () => clearInterval(interval);
  }, [text]);
  
  return (
    <span 
      className={`relative ${className} transition-transform duration-100`}
      style={{
        transform: displayText !== text ? `skew(${Math.random() * 3 - 1.5}deg) scale(${0.99 + Math.random() * 0.02})` : 'none'
      }}
    >
      {/* Main text */}
      <span className="relative z-10">{displayText}</span>
      
      {/* Red glitch shadow */}
      <span className="absolute top-0 left-0 text-red-500 animate-glitch-red opacity-0">
        {displayText}
      </span>
      
      {/* Blue glitch shadow */}
      <span className="absolute top-0 left-0 text-blue-500 animate-glitch-blue opacity-0">
        {displayText}
      </span>
      
      <style jsx>{`
        @keyframes glitch-red {
          0%, 14%, 15%, 49%, 50%, 99%, 100% { 
            transform: translate(0); 
            opacity: 0;
          }
          15%, 49% { 
            transform: translate(-1px, -0.5px); 
            opacity: 0.8;
          }
        }
        @keyframes glitch-blue {
          0%, 20%, 21%, 62%, 63%, 99%, 100% { 
            transform: translate(0); 
            opacity: 0;
          }
          21%, 62% { 
            transform: translate(1px, 0.5px); 
            opacity: 0.7;
          }
        }
        .animate-glitch-red {
          animation: glitch-red 2.3s infinite;
        }
        .animate-glitch-blue {
          animation: glitch-blue 2.7s infinite;
        }
      `}</style>
    </span>
  );
}

export default function RaikiLogo({ className = "", showText = true }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Raiki company logo"
      >
        {/* Outer hexagonal frame - main brand shape */}
        <path
          d="M12 2 L22 8 L22 16 L12 22 L2 16 L2 8 Z"
          stroke="#F0E8D8"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Inner hexagonal frame - adds depth and dimension */}
        <path
          d="M12 6 L18 9.5 L18 14.5 L12 18 L6 14.5 L6 9.5 Z"
          stroke="#F0E8D8"
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />
        {/* Central focal point - represents the core/hub */}
        <circle
          cx="12"
          cy="12"
          r="2"
          fill="#F0E8D8"
        />
        {/* Top connection line - extends upward from center */}
        <line
          x1="12"
          y1="2"
          x2="12"
          y2="6"
          stroke="#F0E8D8"
          strokeWidth="1"
        />
        {/* Bottom connection line - extends downward from center */}
        <line
          x1="12"
          y1="18"
          x2="12"
          y2="22"
          stroke="#F0E8D8"
          strokeWidth="1"
        />
      </svg>
      {/* Conditionally show brand text with Japanese scramble + glitch effects */}
      {showText && (
        <ScrambleGlitchText 
          text="raiki" 
          className="text-xl font-mono font-bold text-[#d0c8b8] tracking-wider" 
        />
      )}
    </div>
  );
}