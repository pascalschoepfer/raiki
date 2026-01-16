'use client';

import { useState } from 'react';
import NeuralNetwork from '../components/MouseTrail';

/**
 * Logo Animation Demo Page
 * 
 * Shows various glitch, flicker, and crackle effects for the Raiki logo text
 */
export default function LogoDemo() {
  const [currentEffect, setCurrentEffect] = useState('glitch');

  const logoEffects = {
    // Basic flickering
    flicker: (
      <span className="text-4xl font-mono font-bold text-[#e8e0d5] tracking-wider animate-pulse">
        raiki
        <style jsx>{`
          @keyframes flicker {
            0%, 19.9%, 22%, 62.9%, 64%, 99.9%, 100% {
              opacity: 1;
            }
            20%, 21.9%, 63%, 63.9% {
              opacity: 0.4;
            }
          }
          .animate-flicker {
            animation: flicker 3s linear infinite;
          }
        `}</style>
      </span>
    ),

    // Glitch with color shifts
    glitch: (
      <span className="relative text-4xl font-mono font-bold text-[#e8e0d5] tracking-wider">
        <span className="relative z-10">raiki</span>
        <span className="absolute top-0 left-0 text-red-500 animate-glitch-1">raiki</span>
        <span className="absolute top-0 left-0 text-blue-500 animate-glitch-2">raiki</span>
        <style jsx>{`
          @keyframes glitch-1 {
            0%, 14%, 15%, 49%, 50%, 99%, 100% { 
              transform: translate(0); 
              opacity: 0;
            }
            15%, 49% { 
              transform: translate(-2px, -1px); 
              opacity: 0.7;
            }
          }
          @keyframes glitch-2 {
            0%, 20%, 21%, 62%, 63%, 99%, 100% { 
              transform: translate(0); 
              opacity: 0;
            }
            21%, 62% { 
              transform: translate(2px, 1px); 
              opacity: 0.7;
            }
          }
          .animate-glitch-1 {
            animation: glitch-1 2s infinite;
          }
          .animate-glitch-2 {
            animation: glitch-2 2s infinite;
          }
        `}</style>
      </span>
    ),

    // Random character scrambling
    scramble: (
      <ScrambleText text="raiki" className="text-4xl font-mono font-bold text-[#e8e0d5] tracking-wider" />
    ),

    // Electrical crackling
    crackle: (
      <span className="relative text-4xl font-mono font-bold text-[#e8e0d5] tracking-wider">
        raiki
        <span className="absolute -top-1 -right-1 text-yellow-400 text-xs animate-ping opacity-75">⚡</span>
        <span className="absolute -bottom-1 -left-1 text-blue-400 text-xs animate-pulse opacity-50">⚡</span>
        <style jsx>{`
          @keyframes electrical {
            0%, 100% { 
              text-shadow: 0 0 5px rgba(255,255,255,0.5);
            }
            25% { 
              text-shadow: 0 0 10px rgba(255,255,255,0.8), 0 0 15px rgba(0,255,255,0.3);
            }
            50% { 
              text-shadow: 0 0 5px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,0,0.3);
            }
            75% { 
              text-shadow: 0 0 8px rgba(255,255,255,0.7), 0 0 12px rgba(255,0,255,0.3);
            }
          }
          .animate-electrical {
            animation: electrical 1.5s ease-in-out infinite;
          }
        `}</style>
      </span>
    ),

    // Matrix-style reveal
    matrix: (
      <MatrixText text="raiki" className="text-4xl font-mono font-bold text-green-400 tracking-wider" />
    ),

    // Neon glow pulsing
    neon: (
      <span className="text-4xl font-mono font-bold text-[#e8e0d5] tracking-wider animate-neon">
        raiki
        <style jsx>{`
          @keyframes neon {
            0%, 100% {
              text-shadow: 
                0 0 5px rgba(255,255,255,0.5),
                0 0 10px rgba(0,255,255,0.3),
                0 0 15px rgba(0,255,255,0.2),
                0 0 20px rgba(0,255,255,0.1);
            }
            50% {
              text-shadow: 
                0 0 10px rgba(255,255,255,0.8),
                0 0 20px rgba(0,255,255,0.6),
                0 0 30px rgba(0,255,255,0.4),
                0 0 40px rgba(0,255,255,0.2);
            }
          }
          .animate-neon {
            animation: neon 2s ease-in-out infinite;
          }
        `}</style>
      </span>
    ),

    // Static/TV interference
    static: (
      <span className="relative text-4xl font-mono font-bold text-[#e8e0d5] tracking-wider">
        raiki
        <div className="absolute inset-0 opacity-30 animate-static bg-gradient-to-b from-transparent via-white to-transparent"></div>
        <style jsx>{`
          @keyframes static {
            0% { 
              transform: translateY(-100%) scaleX(0.1);
              opacity: 0.8;
            }
            5% { 
              transform: translateY(-50%) scaleX(0.3);
              opacity: 0.4;
            }
            10% { 
              transform: translateY(0%) scaleX(0.1);
              opacity: 0.8;
            }
            15% { 
              transform: translateY(50%) scaleX(0.2);
              opacity: 0.2;
            }
            20% { 
              transform: translateY(100%) scaleX(0.1);
              opacity: 0.6;
            }
            25% { 
              transform: translateY(150%) scaleX(0.1);
              opacity: 0;
            }
            100% { 
              transform: translateY(150%) scaleX(0.1);
              opacity: 0;
            }
          }
          .animate-static {
            animation: static 3s ease-in-out infinite;
          }
        `}</style>
      </span>
    ),

    // Simple breathing
    breathe: (
      <span className="text-4xl font-mono font-bold text-[#e8e0d5] tracking-wider animate-breathe">
        raiki
        <style jsx>{`
          @keyframes breathe {
            0%, 100% { 
              transform: scale(1);
              opacity: 1;
            }
            50% { 
              transform: scale(1.05);
              opacity: 0.8;
            }
          }
          .animate-breathe {
            animation: breathe 3s ease-in-out infinite;
          }
        `}</style>
      </span>
    )
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#100c08] via-[#1a1510] to-[#251c15]">
      <div className="relative overflow-hidden h-full">
        <NeuralNetwork />
        
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-20 px-6 py-2 bg-transparent">
          <nav className="max-w-7xl mx-auto flex items-center justify-between">
            <a href="/" className="text-[#a09080] hover:text-[#e8e0d5] transition-colors duration-300 font-mono">← back</a>
          </nav>
        </header>

        {/* Main Content */}
        <div className="absolute inset-0 flex flex-col justify-center z-10 px-6 pt-16 pb-16">
          <div className="max-w-6xl mx-auto text-center">
            
            {/* Title */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-[#e8e0d5] mb-4 font-mono">
                Logo Animation Effects
              </h1>
              
              {/* Effect Buttons */}
              <div className="flex flex-wrap gap-2 justify-center mb-8">
                {Object.keys(logoEffects).map((effect) => (
                  <button
                    key={effect}
                    onClick={() => setCurrentEffect(effect)}
                    className={`px-3 py-1 rounded font-mono text-xs transition-all duration-300 ${
                      currentEffect === effect
                        ? 'bg-white text-black'
                        : 'bg-[#1a1815] text-[#c0b8a8] hover:bg-[#2a2520] hover:text-[#e8e0d5]'
                    }`}
                  >
                    {effect}
                  </button>
                ))}
              </div>
            </div>

            {/* Demo Area */}
            <div className="mb-8">
              <div className="bg-[#151210]/60 backdrop-blur-sm border border-[#3d3530] rounded-lg p-12 mb-4 min-h-[200px] flex items-center justify-center">
                {logoEffects[currentEffect]}
              </div>
              <p className="text-[#a09080] text-sm capitalize">
                {currentEffect} effect
              </p>
            </div>

            {/* Description */}
            <div className="text-center bg-[#151210]/60 backdrop-blur-sm border border-[#3d3530] rounded-lg p-6">
              <h3 className="text-[#e8e0d5] font-mono text-lg mb-2">Effect Descriptions</h3>
              <div className="text-[#c0b8a8] text-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div><strong>flicker:</strong> Random opacity changes</div>
                <div><strong>glitch:</strong> RGB color separation</div>
                <div><strong>scramble:</strong> Character randomization</div>
                <div><strong>crackle:</strong> Electrical sparks</div>
                <div><strong>matrix:</strong> Green code reveal</div>
                <div><strong>neon:</strong> Glowing pulses</div>
                <div><strong>static:</strong> TV interference</div>
                <div><strong>breathe:</strong> Gentle scaling</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// Scramble Text Component
function ScrambleText({ text, className }) {
  const [displayText, setDisplayText] = useState(text);
  
  useState(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    const originalText = text;
    
    const scramble = () => {
      if (Math.random() < 0.1) { // 10% chance to scramble
        let newText = '';
        for (let i = 0; i < originalText.length; i++) {
          if (Math.random() < 0.3) { // 30% chance per character
            newText += chars[Math.floor(Math.random() * chars.length)];
          } else {
            newText += originalText[i];
          }
        }
        setDisplayText(newText);
        
        // Reset to original after 100ms
        setTimeout(() => setDisplayText(originalText), 100);
      }
    };
    
    const interval = setInterval(scramble, 800);
    return () => clearInterval(interval);
  }, [text]);
  
  return <span className={className}>{displayText}</span>;
}

// Matrix Text Component
function MatrixText({ text, className }) {
  const [displayText, setDisplayText] = useState('█'.repeat(text.length));
  
  useState(() => {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    let revealed = 0;
    
    const reveal = () => {
      if (revealed < text.length) {
        let newText = '';
        for (let i = 0; i < text.length; i++) {
          if (i < revealed) {
            newText += text[i];
          } else if (i === revealed) {
            newText += Math.random() < 0.7 ? chars[Math.floor(Math.random() * chars.length)] : text[i];
          } else {
            newText += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        setDisplayText(newText);
        
        if (Math.random() < 0.3) {
          revealed++;
        }
      } else {
        revealed = 0;
        setDisplayText('█'.repeat(text.length));
      }
    };
    
    const interval = setInterval(reveal, 150);
    return () => clearInterval(interval);
  }, [text]);
  
  return <span className={className}>{displayText}</span>;
}