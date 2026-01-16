'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * NeuralNetwork (MouseTrail) Component
 * 
 * An interactive canvas-based neural network animation that creates electrical particles
 * in response to mouse movement. Features real-time particle generation, electrical
 * crackling effects, dynamic connections between particles, and smooth color transitions.
 * 
 * The component creates a cyberpunk aesthetic with:
 * - Real-time particle generation following mouse cursor
 * - Electrical crackling effects with sparks and jitter
 * - Dynamic neural network connections between nearby particles
 * - Smooth color cycling between yellow and green (10-second cycle)
 * - Performance optimizations including throttling and particle limits
 * 
 * @returns {JSX.Element} Canvas element with neural network animation
 * 
 * @example
 * <div className="relative overflow-hidden">
 *   <NeuralNetwork />
 *   <div className="relative z-10">
 *     <!-- Your content here -->
 *   </div>
 * </div>
 * 
 * Performance Features:
 * - Throttled mouse events (120ms) to prevent excessive particle generation
 * - Particle limit (45 max) for memory management
 * - Automatic cleanup of dead particles
 * - Optimized canvas rendering with requestAnimationFrame
 * 
 * Visual Features:
 * - Electrical particle effects with realistic crackling and sparks
 * - Dynamic color transitions using sine wave interpolation
 * - Neural network connections between particles within 90px range
 * - Responsive canvas that adapts to container size
 */
export default function NeuralNetwork() {
  const [isMounted, setIsMounted] = useState(false);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });
  const colorCycleRef = useRef(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = particlesRef.current;
    let lastMouseMoveTime = 0;
    const throttleDelay = 120;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

      /**
     * ElectricalParticle Class
     * 
     * Represents a single electrical particle in the neural network animation.
     * Each particle has position, velocity, life span, and visual properties.
     * Particles exhibit electrical behavior through crackling movement and sparks.
     */
    class ElectricalParticle {
      /**
       * Create a new electrical particle
       * @param {number} x - Initial X position
       * @param {number} y - Initial Y position
       */
      constructor(x, y) {
        this.x = x;                                      // Current X position
        this.y = y;                                      // Current Y position
        this.vx = (Math.random() - 0.5) * 1.5;          // X velocity - slightly faster
        this.vy = (Math.random() - 0.5) * 1.5;          // Y velocity - slightly faster
        this.life = 1;                                   // Life span (1.0 = fully alive, 0 = dead)
        this.decay = 0.0012 + Math.random() * 0.0008;   // Slower decay for longer-lasting particles
        this.size = Math.random() * 3 + 1.5;            // Smaller, sharper particles (1.5-4.5px)
        this.intensity = Math.random() * 0.4 + 0.8;     // Higher intensity (0.8-1.2)
        this.cracklePhase = Math.random() * Math.PI * 2; // Phase for electrical crackling
      }

      /**
       * Update particle position, life, and electrical effects
       * Called once per animation frame
       */
      update() {
        // Apply velocity to position
        this.x += this.vx;
        this.y += this.vy;
        
        // Reduce life span each frame
        this.life -= this.decay;
        
        // Apply air resistance to velocity
        this.vx *= 0.99;
        this.vy *= 0.99;
        
        // Generate gentle electrical crackling effect
        // Creates subtle electrical movement
        this.cracklePhase += 0.15;
        const crackleIntensity = 0.8 + Math.sin(this.cracklePhase) * 0.4;
        this.x += (Math.random() - 0.5) * crackleIntensity;
        this.y += (Math.random() - 0.5) * crackleIntensity;
      }

      /**
       * Render the particle with electrical effects
       * @param {Object} color - RGB color object {r, g, b}
       */
      draw(color) {
        if (this.life <= 0) return; // Skip dead particles
        
        // Calculate alpha based on life and intensity
        const alpha = this.life * this.intensity;
        // Add flickering effect for electrical appearance
        const flickerAlpha = alpha * (0.8 + Math.random() * 0.4);
        
        ctx.save();
        
        // Draw main particle as glowing orb
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${flickerAlpha})`;
        ctx.globalAlpha = flickerAlpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Generate subtle electrical sparks around main particle
        // 15% chance per frame creates calm spark density
        if (Math.random() < 0.15) {
          for (let i = 0; i < 2; i++) {
            // Position sparks randomly around particle (20px radius for looser grouping)
            const sparkX = this.x + (Math.random() - 0.5) * 20;
            const sparkY = this.y + (Math.random() - 0.5) * 20;
            
            // Draw gentle spark
            ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${flickerAlpha * 0.6})`;
            ctx.beginPath();
            ctx.arc(sparkX, sparkY, 0.4 + Math.random() * 0.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        
        ctx.restore();
      }
    }

    /**
     * Mouse Movement Handler
     * 
     * Creates new electrical particles at mouse position when cursor moves.
     * Throttled to prevent performance issues from excessive particle generation.
     * 
     * @param {MouseEvent} e - Mouse move event
     */
    const handleMouseMove = (e) => {
      const now = Date.now();
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate mouse speed
      const deltaX = x - mouseRef.current.x;
      const deltaY = y - mouseRef.current.y;
      const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      mouseRef.current.x = x;
      mouseRef.current.y = y;

      // Dynamic throttling based on speed
      const dynamicThrottle = Math.max(30, throttleDelay - speed * 2);
      if (now - lastMouseMoveTime < dynamicThrottle) return;
      lastMouseMoveTime = now;

      // Create more particles when moving fast, fewer when slow
      const numParticles = Math.min(4, Math.max(1, Math.floor(speed / 15)));
      
      for (let i = 0; i < numParticles; i++) {
        particles.push(new ElectricalParticle(
          x + (Math.random() - 0.5) * 20,
          y + (Math.random() - 0.5) * 20
        ));
      }

      // Dynamic particle limit based on speed
      const maxParticles = Math.min(40, 20 + speed);
      if (particles.length > maxParticles) {
        particles.splice(0, particles.length - maxParticles);
      }
    };

    /**
     * Draw Neural Network Connections
     *
     * Creates persistent connections between all particles until they fade.
     * All particles stay connected regardless of distance.
     *
     * @param {Object} color - RGB color object {r, g, b}
     */
    const drawConnections = (color) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          if (p1.life <= 0 || p2.life <= 0) continue;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Always connect, fade based on life only (not distance)
          const baseAlpha = p1.life * p2.life * 0.6;
          // Slight distance fade for very far particles
          const distanceFade = distance > 200 ? Math.max(0.3, 1 - (distance - 200) / 300) : 1;
          const finalAlpha = baseAlpha * distanceFade;

          if (finalAlpha > 0.05) {
            ctx.save();
            ctx.globalAlpha = finalAlpha;
            ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 1.0)`;
            ctx.lineWidth = 1;

            // Draw smooth connection line
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    /**
     * Dynamic Color Generation
     *
     * Creates subtle green color variations matching the fundarb style.
     * Uses the #70c060 green as base with gentle brightness oscillation.
     *
     * @returns {Object} RGB color object {r, g, b}
     */
    const getColorAtTime = () => {
      // 6 second cycle for subtle brightness variation
      colorCycleRef.current += 16; // ~60fps
      const cycleTime = (colorCycleRef.current % 6000) / 6000; // 0 to 1

      // Subtle brightness oscillation
      const brightness = 0.85 + Math.sin(cycleTime * Math.PI * 2) * 0.15; // 0.7 to 1.0

      // Base color: #70c060 (112, 192, 96) - fundarb green
      const r = Math.round(112 * brightness);
      const g = Math.round(192 * brightness);
      const b = Math.round(96 * brightness);

      return { r, g, b };
    };

    /**
     * Main Animation Loop
     * 
     * Core rendering loop that updates all particles, draws connections,
     * and handles cleanup. Runs at ~60 FPS using requestAnimationFrame
     * for smooth, optimized animation performance.
     */
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const currentColor = getColorAtTime();

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.update();
        particle.draw(currentColor);
        
        if (particle.life <= 0) {
          particles.splice(i, 1);
        }
      }

      // Draw neural network connections
      drawConnections(currentColor);

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();
    
    // Add mouse move listener
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        width: '100%',
        height: '100%',
        background: 'transparent',
      }}
    />
  );
}