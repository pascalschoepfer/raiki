'use client';

import { useState } from 'react';

/**
 * Mouse Effects Demo Page
 * 
 * Shows various mouse trail and interaction effects with different themes:
 * - Cool/Modern
 * - Clean/Minimal
 * - Matrix/Digital
 * - Nerdy/Techy
 * - Hacky/Glitch
 */
export default function MouseEffectsDemo() {
  const [currentEffect, setCurrentEffect] = useState('neural');

  const effects = {
    // Current neural network effect
    neural: <NeuralNetworkEffect />,
    
    // Cool modern with smooth trails
    modern: <ModernTrailEffect />,
    
    // Clean minimal geometric
    clean: <CleanGeometricEffect />,
    
    // Matrix digital rain
    matrix: <MatrixRainEffect />,
    
    // Nerdy code particles
    nerdy: <CodeParticleEffect />,
    
    // Hacky glitch effect
    hacky: <GlitchHackerEffect />,
    
    // Bonus: Cyberpunk neon
    cyberpunk: <CyberpunkNeonEffect />,
    
    // Bonus: Terminal grid
    terminal: <TerminalGridEffect />
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#0c0a08] via-[#151210] to-[#1f1a15] relative">
      {/* Current Effect */}
      {effects[currentEffect]}
      
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 px-6 py-4 bg-black/20 backdrop-blur-sm">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="text-gray-400 hover:text-white transition-colors duration-300 font-mono">← back</a>
          <h1 className="text-white font-mono text-lg">Mouse Effects Demo</h1>
        </nav>
      </header>

      {/* Effect Selector */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 bg-black/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white font-mono text-lg mb-4 text-center">Choose Your Effect</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            {Object.keys(effects).map((effect) => (
              <button
                key={effect}
                onClick={() => setCurrentEffect(effect)}
                className={`px-3 py-2 rounded font-mono text-xs transition-all duration-300 ${
                  currentEffect === effect
                    ? 'bg-white text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-600'
                }`}
              >
                {effect}
              </button>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-gray-400 text-sm capitalize font-mono">
              Current: {currentEffect} effect
            </p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute top-20 left-6 z-20 bg-black/60 backdrop-blur-sm p-4 rounded border border-gray-700 max-w-sm">
        <h3 className="text-white font-mono text-sm mb-2">Instructions</h3>
        <p className="text-gray-300 text-xs font-mono leading-relaxed">
          Move your mouse around to see the effect. Each has different behaviors and aesthetics.
        </p>
      </div>
    </div>
  );
}

// Effect 1: Current Neural Network (baseline)
function NeuralNetworkEffect() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#0c0a08] via-[#151210] to-[#1f1a15]">
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-mono font-bold text-white/20">Neural Network</h1>
      </div>
      {/* Import the existing MouseTrail component here in real implementation */}
    </div>
  );
}

// Effect 2: Modern Trail - Smooth flowing particles
function ModernTrailEffect() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <canvas
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
        ref={(canvas) => {
          if (!canvas) return;
          
          const ctx = canvas.getContext('2d');
          canvas.width = canvas.offsetWidth;
          canvas.height = canvas.offsetHeight;
          
          const particles = [];
          let mouseX = 0, mouseY = 0;
          
          class ModernParticle {
            constructor(x, y) {
              this.x = x;
              this.y = y;
              this.vx = (Math.random() - 0.5) * 2;
              this.vy = (Math.random() - 0.5) * 2;
              this.life = 1;
              this.decay = 0.01;
              this.size = Math.random() * 6 + 2;
            }
            
            update() {
              this.x += this.vx;
              this.y += this.vy;
              this.life -= this.decay;
              this.vx *= 0.99;
              this.vy *= 0.99;
            }
            
            draw() {
              ctx.save();
              ctx.globalAlpha = this.life;
              const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
              gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
              gradient.addColorStop(1, 'rgba(147, 51, 234, 0.2)');
              ctx.fillStyle = gradient;
              ctx.beginPath();
              ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }
          }
          
          const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Add new particles at mouse position
            if (Math.random() < 0.3) {
              particles.push(new ModernParticle(mouseX, mouseY));
            }
            
            // Update and draw particles
            for (let i = particles.length - 1; i >= 0; i--) {
              const particle = particles[i];
              particle.update();
              particle.draw();
              
              if (particle.life <= 0) {
                particles.splice(i, 1);
              }
            }
            
            requestAnimationFrame(animate);
          };
          
          const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
          };
          
          window.addEventListener('mousemove', handleMouseMove);
          animate();
          
          return () => {
            window.removeEventListener('mousemove', handleMouseMove);
          };
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-mono font-bold text-white/20">Modern Trail</h1>
      </div>
    </div>
  );
}

// Effect 3: Clean Geometric - Minimal shapes
function CleanGeometricEffect() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <canvas
        className="absolute inset-0 w-full h-full"
        ref={(canvas) => {
          if (!canvas) return;
          
          const ctx = canvas.getContext('2d');
          canvas.width = canvas.offsetWidth;
          canvas.height = canvas.offsetHeight;
          
          const shapes = [];
          let mouseX = 0, mouseY = 0;
          
          class GeometricShape {
            constructor(x, y) {
              this.x = x;
              this.y = y;
              this.size = Math.random() * 20 + 10;
              this.rotation = 0;
              this.rotationSpeed = (Math.random() - 0.5) * 0.1;
              this.life = 1;
              this.decay = 0.02;
              this.type = Math.floor(Math.random() * 3); // 0: circle, 1: square, 2: triangle
            }
            
            update() {
              this.rotation += this.rotationSpeed;
              this.life -= this.decay;
              this.size *= 0.995;
            }
            
            draw() {
              ctx.save();
              ctx.globalAlpha = this.life * 0.6;
              ctx.translate(this.x, this.y);
              ctx.rotate(this.rotation);
              ctx.strokeStyle = '#374151';
              ctx.lineWidth = 2;
              
              if (this.type === 0) {
                // Circle
                ctx.beginPath();
                ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                ctx.stroke();
              } else if (this.type === 1) {
                // Square
                ctx.strokeRect(-this.size/2, -this.size/2, this.size, this.size);
              } else {
                // Triangle
                ctx.beginPath();
                ctx.moveTo(0, -this.size/2);
                ctx.lineTo(-this.size/2, this.size/2);
                ctx.lineTo(this.size/2, this.size/2);
                ctx.closePath();
                ctx.stroke();
              }
              
              ctx.restore();
            }
          }
          
          const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            if (Math.random() < 0.1) {
              shapes.push(new GeometricShape(mouseX, mouseY));
            }
            
            for (let i = shapes.length - 1; i >= 0; i--) {
              const shape = shapes[i];
              shape.update();
              shape.draw();
              
              if (shape.life <= 0) {
                shapes.splice(i, 1);
              }
            }
            
            requestAnimationFrame(animate);
          };
          
          const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
          };
          
          window.addEventListener('mousemove', handleMouseMove);
          animate();
          
          return () => {
            window.removeEventListener('mousemove', handleMouseMove);
          };
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-mono font-bold text-gray-600/20">Clean Geometric</h1>
      </div>
    </div>
  );
}

// Effect 4: Matrix Rain - Digital falling code
function MatrixRainEffect() {
  return (
    <div className="absolute inset-0 bg-black">
      <canvas
        className="absolute inset-0 w-full h-full"
        ref={(canvas) => {
          if (!canvas) return;
          
          const ctx = canvas.getContext('2d');
          canvas.width = canvas.offsetWidth;
          canvas.height = canvas.offsetHeight;
          
          const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
          const fontSize = 14;
          const columns = Math.floor(canvas.width / fontSize);
          const drops = new Array(columns).fill(1);
          let mouseX = 0, mouseY = 0;
          
          const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff00';
            ctx.font = `${fontSize}px monospace`;
            
            for (let i = 0; i < drops.length; i++) {
              const text = chars[Math.floor(Math.random() * chars.length)];
              const x = i * fontSize;
              const y = drops[i] * fontSize;
              
              // Bright green near mouse
              const distance = Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2);
              if (distance < 100) {
                ctx.fillStyle = '#00ff00';
              } else {
                ctx.fillStyle = '#004400';
              }
              
              ctx.fillText(text, x, y);
              
              if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
              }
              drops[i]++;
            }
            
            requestAnimationFrame(animate);
          };
          
          const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
          };
          
          window.addEventListener('mousemove', handleMouseMove);
          animate();
          
          return () => {
            window.removeEventListener('mousemove', handleMouseMove);
          };
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-mono font-bold text-green-500/20">Matrix Rain</h1>
      </div>
    </div>
  );
}

// Effect 5: Code Particles - Floating code snippets
function CodeParticleEffect() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800">
      <canvas
        className="absolute inset-0 w-full h-full"
        ref={(canvas) => {
          if (!canvas) return;
          
          const ctx = canvas.getContext('2d');
          canvas.width = canvas.offsetWidth;
          canvas.height = canvas.offsetHeight;
          
          const codeSnippets = [
            'function()', 'const x =', 'if (true)', '{}', '[]', '=>', 'console.log',
            'return', 'async', 'await', 'import', 'export', 'class', 'extends',
            'true', 'false', 'null', 'undefined', '&&', '||', '!==', '===',
            '<div>', '</div>', 'useState', 'useEffect', 'onClick', 'props'
          ];
          
          const particles = [];
          let mouseX = 0, mouseY = 0;
          
          class CodeParticle {
            constructor(x, y) {
              this.x = x;
              this.y = y;
              this.vx = (Math.random() - 0.5) * 1;
              this.vy = (Math.random() - 0.5) * 1;
              this.life = 1;
              this.decay = 0.008;
              this.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
              this.rotation = Math.random() * Math.PI * 2;
              this.rotationSpeed = (Math.random() - 0.5) * 0.02;
            }
            
            update() {
              this.x += this.vx;
              this.y += this.vy;
              this.rotation += this.rotationSpeed;
              this.life -= this.decay;
              this.vx *= 0.99;
              this.vy *= 0.99;
            }
            
            draw() {
              ctx.save();
              ctx.globalAlpha = this.life;
              ctx.translate(this.x, this.y);
              ctx.rotate(this.rotation);
              ctx.fillStyle = '#60a5fa';
              ctx.font = '12px monospace';
              ctx.textAlign = 'center';
              ctx.fillText(this.text, 0, 0);
              ctx.restore();
            }
          }
          
          const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            if (Math.random() < 0.1) {
              particles.push(new CodeParticle(mouseX, mouseY));
            }
            
            for (let i = particles.length - 1; i >= 0; i--) {
              const particle = particles[i];
              particle.update();
              particle.draw();
              
              if (particle.life <= 0) {
                particles.splice(i, 1);
              }
            }
            
            requestAnimationFrame(animate);
          };
          
          const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
          };
          
          window.addEventListener('mousemove', handleMouseMove);
          animate();
          
          return () => {
            window.removeEventListener('mousemove', handleMouseMove);
          };
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-mono font-bold text-white/20">Code Particles</h1>
      </div>
    </div>
  );
}

// Effect 6: Glitch Hacker - Distorted effects
function GlitchHackerEffect() {
  return (
    <div className="absolute inset-0 bg-black">
      <canvas
        className="absolute inset-0 w-full h-full"
        ref={(canvas) => {
          if (!canvas) return;
          
          const ctx = canvas.getContext('2d');
          canvas.width = canvas.offsetWidth;
          canvas.height = canvas.offsetHeight;
          
          const particles = [];
          let mouseX = 0, mouseY = 0;
          let glitchTime = 0;
          
          class GlitchParticle {
            constructor(x, y) {
              this.x = x;
              this.y = y;
              this.vx = (Math.random() - 0.5) * 10;
              this.vy = (Math.random() - 0.5) * 10;
              this.life = 1;
              this.decay = 0.05;
              this.size = Math.random() * 8 + 2;
              this.color = Math.random() < 0.5 ? '#ff0080' : '#00ff80';
            }
            
            update() {
              this.x += this.vx + (Math.random() - 0.5) * 2; // Add jitter
              this.y += this.vy + (Math.random() - 0.5) * 2;
              this.life -= this.decay;
              this.vx *= 0.95;
              this.vy *= 0.95;
            }
            
            draw() {
              ctx.save();
              ctx.globalAlpha = this.life;
              ctx.fillStyle = this.color;
              
              // Glitch effect - random rectangles
              if (Math.random() < 0.3) {
                ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
              } else {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
              }
              
              ctx.restore();
            }
          }
          
          const animate = () => {
            // Glitch clear effect
            if (Math.random() < 0.1) {
              ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
            } else {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            
            // Add particles
            if (Math.random() < 0.3) {
              for (let i = 0; i < 3; i++) {
                particles.push(new GlitchParticle(
                  mouseX + (Math.random() - 0.5) * 50,
                  mouseY + (Math.random() - 0.5) * 50
                ));
              }
            }
            
            // Random screen glitch lines
            if (Math.random() < 0.05) {
              ctx.fillStyle = Math.random() < 0.5 ? '#ff0080' : '#00ff80';
              ctx.fillRect(0, Math.random() * canvas.height, canvas.width, 2);
            }
            
            for (let i = particles.length - 1; i >= 0; i--) {
              const particle = particles[i];
              particle.update();
              particle.draw();
              
              if (particle.life <= 0) {
                particles.splice(i, 1);
              }
            }
            
            requestAnimationFrame(animate);
          };
          
          const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
          };
          
          window.addEventListener('mousemove', handleMouseMove);
          animate();
          
          return () => {
            window.removeEventListener('mousemove', handleMouseMove);
          };
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-mono font-bold text-red-500/20">Glitch Hacker</h1>
      </div>
    </div>
  );
}

// Effect 7: Cyberpunk Neon - Neon light trails
function CyberpunkNeonEffect() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900">
      <canvas
        className="absolute inset-0 w-full h-full"
        ref={(canvas) => {
          if (!canvas) return;
          
          const ctx = canvas.getContext('2d');
          canvas.width = canvas.offsetWidth;
          canvas.height = canvas.offsetHeight;
          
          const trail = [];
          let mouseX = 0, mouseY = 0;
          
          const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Add current mouse position to trail
            trail.push({ x: mouseX, y: mouseY, life: 1 });
            
            // Limit trail length
            if (trail.length > 50) {
              trail.shift();
            }
            
            // Draw neon trail
            for (let i = 0; i < trail.length; i++) {
              const point = trail[i];
              const life = i / trail.length;
              
              ctx.save();
              ctx.globalAlpha = life * 0.8;
              ctx.shadowColor = '#ff00ff';
              ctx.shadowBlur = 20;
              
              const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 15);
              gradient.addColorStop(0, '#ff00ff');
              gradient.addColorStop(0.5, '#00ffff');
              gradient.addColorStop(1, 'transparent');
              
              ctx.fillStyle = gradient;
              ctx.beginPath();
              ctx.arc(point.x, point.y, 8 * life, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }
            
            requestAnimationFrame(animate);
          };
          
          const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
          };
          
          window.addEventListener('mousemove', handleMouseMove);
          animate();
          
          return () => {
            window.removeEventListener('mousemove', handleMouseMove);
          };
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-mono font-bold text-pink-500/20">Cyberpunk Neon</h1>
      </div>
    </div>
  );
}

// Effect 8: Terminal Grid - ASCII grid system
function TerminalGridEffect() {
  return (
    <div className="absolute inset-0 bg-black">
      <canvas
        className="absolute inset-0 w-full h-full"
        ref={(canvas) => {
          if (!canvas) return;
          
          const ctx = canvas.getContext('2d');
          canvas.width = canvas.offsetWidth;
          canvas.height = canvas.offsetHeight;
          
          const gridSize = 20;
          const cells = [];
          let mouseX = 0, mouseY = 0;
          
          // Initialize grid
          for (let x = 0; x < canvas.width; x += gridSize) {
            for (let y = 0; y < canvas.height; y += gridSize) {
              cells.push({ x, y, active: false, fade: 0 });
            }
          }
          
          const animate = () => {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Update cells based on mouse position
            cells.forEach(cell => {
              const distance = Math.sqrt((cell.x - mouseX) ** 2 + (cell.y - mouseY) ** 2);
              
              if (distance < 80) {
                cell.active = true;
                cell.fade = 1;
              } else {
                cell.active = false;
                cell.fade *= 0.95;
              }
              
              if (cell.fade > 0.1) {
                ctx.save();
                ctx.globalAlpha = cell.fade;
                ctx.strokeStyle = '#00ff00';
                ctx.lineWidth = 1;
                ctx.strokeRect(cell.x, cell.y, gridSize, gridSize);
                
                // Add terminal character
                ctx.fillStyle = '#00ff00';
                ctx.font = '12px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('█', cell.x + gridSize/2, cell.y + gridSize/2 + 4);
                ctx.restore();
              }
            });
            
            requestAnimationFrame(animate);
          };
          
          const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
          };
          
          window.addEventListener('mousemove', handleMouseMove);
          animate();
          
          return () => {
            window.removeEventListener('mousemove', handleMouseMove);
          };
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-mono font-bold text-green-500/20">Terminal Grid</h1>
      </div>
    </div>
  );
}