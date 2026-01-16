'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

// Variant 1: Very Subtle Matrix Rain (barely visible)
function MatrixSubtle({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = 'アイウエオカキクケコ01';
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0).map(() => Math.random() * -100);

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(112, 192, 96, 0.15)';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        if (Math.random() > 0.98) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        }

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.99) {
          drops[i] = 0;
        }
        drops[i] += 0.3;
      }
    };

    const interval = setInterval(draw, 80);
    return () => clearInterval(interval);
  }, [canvasRef]);

  return null;
}

// Variant 2: Sparse Floating Characters
function MatrixSparse({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = 'アイウエオ01<>/{}';
    const particles = [];

    const spawnParticle = () => {
      if (particles.length < 15 && Math.random() > 0.95) {
        particles.push({
          x: Math.random() * canvas.width,
          y: -20,
          char: chars[Math.floor(Math.random() * chars.length)],
          speed: 0.3 + Math.random() * 0.5,
          opacity: 0.1 + Math.random() * 0.15
        });
      }
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '14px monospace';

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        ctx.fillStyle = `rgba(112, 192, 96, ${p.opacity})`;
        ctx.fillText(p.char, p.x, p.y);
        p.y += p.speed;

        if (p.y > canvas.height + 20) {
          particles.splice(i, 1);
        }
      }

      spawnParticle();
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, [canvasRef]);

  return null;
}

// Variant 3: Static Grid with Occasional Flicker
function MatrixGrid({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = '01アイウエオ';
    const gridSize = 30;
    const cols = Math.ceil(canvas.width / gridSize);
    const rows = Math.ceil(canvas.height / gridSize);

    const grid = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (Math.random() > 0.85) {
          grid.push({
            x: x * gridSize + gridSize / 2,
            y: y * gridSize + gridSize / 2,
            char: chars[Math.floor(Math.random() * chars.length)],
            opacity: 0
          });
        }
      }
    }

    const draw = () => {
      ctx.fillStyle = '#0c0a08';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '10px monospace';
      ctx.textAlign = 'center';

      grid.forEach(cell => {
        // Random flicker
        if (Math.random() > 0.995) {
          cell.opacity = 0.2 + Math.random() * 0.1;
          cell.char = chars[Math.floor(Math.random() * chars.length)];
        }
        cell.opacity *= 0.98;

        if (cell.opacity > 0.02) {
          ctx.fillStyle = `rgba(112, 192, 96, ${cell.opacity})`;
          ctx.fillText(cell.char, cell.x, cell.y);
        }
      });
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, [canvasRef]);

  return null;
}

// Variant 4: Gentle Pulse/Breathe Effect
function MatrixPulse({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = '01';
    const fontSize = 10;
    const cols = Math.floor(canvas.width / fontSize);
    const rows = Math.floor(canvas.height / fontSize);

    let time = 0;

    const draw = () => {
      ctx.fillStyle = '#0c0a08';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;
      time += 0.02;

      for (let y = 0; y < rows; y += 3) {
        for (let x = 0; x < cols; x += 3) {
          const wave = Math.sin(time + x * 0.1 + y * 0.1) * 0.5 + 0.5;
          const opacity = wave * 0.08;

          if (opacity > 0.02) {
            ctx.fillStyle = `rgba(112, 192, 96, ${opacity})`;
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, x * fontSize, y * fontSize);
          }
        }
      }
    };

    const interval = setInterval(draw, 100);
    return () => clearInterval(interval);
  }, [canvasRef]);

  return null;
}

// Variant 5: Horizontal Scan Lines with Characters
function MatrixScan({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = '01アイウエオカキク';
    let scanY = 0;

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '10px monospace';

      // Draw scan line with characters
      const lineY = scanY % canvas.height;
      for (let x = 0; x < canvas.width; x += 15) {
        if (Math.random() > 0.7) {
          ctx.fillStyle = `rgba(112, 192, 96, ${0.1 + Math.random() * 0.15})`;
          const char = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(char, x, lineY);
        }
      }

      scanY += 2;
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, [canvasRef]);

  return null;
}

// Variant 6: Minimal Corner Accents
function MatrixCorners({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = '01アイ<>/';
    const corners = [
      { x: 20, y: 30, chars: [] },
      { x: canvas.width - 60, y: 30, chars: [] },
      { x: 20, y: canvas.height - 20, chars: [] },
      { x: canvas.width - 60, y: canvas.height - 20, chars: [] }
    ];

    corners.forEach(c => {
      for (let i = 0; i < 5; i++) {
        c.chars.push({
          char: chars[Math.floor(Math.random() * chars.length)],
          offsetX: i * 12,
          opacity: 0
        });
      }
    });

    const draw = () => {
      ctx.fillStyle = '#0c0a08';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '10px monospace';

      corners.forEach(corner => {
        corner.chars.forEach(c => {
          if (Math.random() > 0.98) {
            c.opacity = 0.15 + Math.random() * 0.1;
            c.char = chars[Math.floor(Math.random() * chars.length)];
          }
          c.opacity *= 0.97;

          if (c.opacity > 0.02) {
            ctx.fillStyle = `rgba(112, 192, 96, ${c.opacity})`;
            ctx.fillText(c.char, corner.x + c.offsetX, corner.y);
          }
        });
      });
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, [canvasRef]);

  return null;
}

// Demo Section Component
function EffectDemo({ title, description, Effect }) {
  const canvasRef = useRef(null);

  return (
    <div className="relative h-[300px] border border-[#3d3530] rounded-lg overflow-hidden bg-[#0c0a08]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <Effect canvasRef={canvasRef} />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-[#c0b8a8] font-mono text-lg opacity-50">content here</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0c0a08] to-transparent p-4">
        <span className="text-[#70c060] font-mono text-sm font-bold">{title}</span>
        <p className="text-[#6b6055] font-mono text-xs mt-1">{description}</p>
      </div>
    </div>
  );
}

export default function EffectsDemo() {
  return (
    <div className="min-h-screen bg-[#0c0a08] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-mono text-[#d0c8b8]">Matrix Background Variants</h1>
          <Link href="/" className="text-[#70c060] hover:text-[#90e080] font-mono text-sm">
            &larr; back
          </Link>
        </div>

        <p className="text-[#a09080] font-mono text-sm mb-8">
          Verschiedene dezente Matrix-Hintergrund Effekte:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EffectDemo
            title="1. Subtle Rain"
            description="Sehr dezent, kaum sichtbar, langsam fallend"
            Effect={MatrixSubtle}
          />
          <EffectDemo
            title="2. Sparse Float"
            description="Vereinzelte Zeichen die langsam fallen"
            Effect={MatrixSparse}
          />
          <EffectDemo
            title="3. Grid Flicker"
            description="Statisches Grid mit gelegentlichem Flackern"
            Effect={MatrixGrid}
          />
          <EffectDemo
            title="4. Pulse Wave"
            description="Sanfte Wellen-Animation durch das Grid"
            Effect={MatrixPulse}
          />
          <EffectDemo
            title="5. Scan Line"
            description="Horizontale Scan-Linie mit Zeichen"
            Effect={MatrixScan}
          />
          <EffectDemo
            title="6. Corner Accents"
            description="Nur in den Ecken, sehr minimal"
            Effect={MatrixCorners}
          />
        </div>

        <p className="text-[#6b6055] font-mono text-xs mt-8 text-center">
          Welche Variante gefällt dir? Kann auch kombiniert oder angepasst werden.
        </p>
      </div>
    </div>
  );
}
