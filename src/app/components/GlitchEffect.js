'use client';

import { useEffect, useRef } from 'react';

/**
 * GlitchEffect Component
 * 
 * Creates a cyberpunk glitch effect with pink/green particles and screen distortions.
 * Adds random screen glitch lines and digital artifacts for authentic hacker aesthetic.
 */
export default function GlitchEffect() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // No mouse interaction - purely background effect

    const animate = () => {
      // Calmer glitch clear effect - 60% less frequent
      if (Math.random() < 0.032) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      
      // Calmer random screen glitch lines - 60% less frequent
      if (Math.random() < 0.012) {
        ctx.fillStyle = Math.random() < 0.5 ? '#ff0080' : '#00ff80';
        ctx.globalAlpha = 0.6;
        ctx.fillRect(0, Math.random() * canvas.height, canvas.width, 1 + Math.random() * 2);
        ctx.globalAlpha = 1;
      }

      // No particles - pure background glitch only

      // Calmer full-screen digital artifacts - 60% less frequent
      if (Math.random() < 0.004) {
        ctx.save();
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = Math.random() < 0.5 ? '#ff0080' : '#00ff80';
        for (let i = 0; i < 5; i++) {
          ctx.fillRect(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 20 + 2,
            Math.random() * 20 + 2
          );
        }
        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-5"
      style={{
        width: '100%',
        height: '100%',
        background: 'transparent',
        mixBlendMode: 'screen'
      }}
    />
  );
}