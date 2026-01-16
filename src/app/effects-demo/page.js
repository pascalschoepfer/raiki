'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// Effect 1: Matrix Rain
function MatrixRain({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテト0123456789';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#70c060';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, [canvasRef]);

  return null;
}

// Effect 2: Glitch Blocks
function GlitchBlocks({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const blocks = [];

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      for (let i = 0; i < 3; i++) {
        blocks.push({
          x: x + (Math.random() - 0.5) * 40,
          y: y + (Math.random() - 0.5) * 40,
          w: Math.random() * 20 + 5,
          h: Math.random() * 10 + 3,
          life: 1,
          color: Math.random() > 0.5 ? '#70c060' : '#50a040'
        });
      }
      if (blocks.length > 50) blocks.splice(0, 10);
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = blocks.length - 1; i >= 0; i--) {
        const b = blocks[i];
        ctx.fillStyle = b.color;
        ctx.globalAlpha = b.life;
        ctx.fillRect(b.x, b.y, b.w, b.h);
        b.life -= 0.03;
        b.x += (Math.random() - 0.5) * 4;
        if (b.life <= 0) blocks.splice(i, 1);
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [canvasRef]);

  return null;
}

// Effect 3: Binary Trail
function BinaryTrail({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const bits = [];

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      for (let i = 0; i < 2; i++) {
        bits.push({
          x, y,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          char: Math.random() > 0.5 ? '0' : '1',
          life: 1
        });
      }
      if (bits.length > 60) bits.splice(0, 5);
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '12px monospace';
      for (let i = bits.length - 1; i >= 0; i--) {
        const b = bits[i];
        ctx.fillStyle = `rgba(112, 192, 96, ${b.life})`;
        ctx.fillText(b.char, b.x, b.y);
        b.x += b.vx;
        b.y += b.vy;
        b.life -= 0.015;
        if (b.life <= 0) bits.splice(i, 1);
      }
      requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [canvasRef]);

  return null;
}

// Effect 4: Circuit Traces
function CircuitTraces({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const points = [];
    let lastPoint = null;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Snap to grid for circuit-like appearance
      const gridX = Math.round(x / 20) * 20;
      const gridY = Math.round(y / 20) * 20;

      if (!lastPoint || lastPoint.x !== gridX || lastPoint.y !== gridY) {
        points.push({ x: gridX, y: gridY, life: 1 });
        lastPoint = { x: gridX, y: gridY };
      }
      if (points.length > 30) points.splice(0, 1);
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#70c060';
      ctx.lineWidth = 2;

      for (let i = 1; i < points.length; i++) {
        const p1 = points[i - 1];
        const p2 = points[i];
        ctx.globalAlpha = p2.life * 0.8;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        // Draw L-shaped lines (circuit style)
        if (Math.random() > 0.5) {
          ctx.lineTo(p2.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        } else {
          ctx.lineTo(p1.x, p2.y);
          ctx.lineTo(p2.x, p2.y);
        }
        ctx.stroke();

        // Draw node points
        ctx.fillStyle = '#70c060';
        ctx.beginPath();
        ctx.arc(p2.x, p2.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      points.forEach(p => p.life -= 0.008);
      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [canvasRef]);

  return null;
}

// Effect 5: Scan Lines
function ScanLines({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let mouseY = 0;
    const lines = [];

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseY = e.clientY - rect.top;
      lines.push({ y: mouseY, life: 1, width: canvas.width });
      if (lines.length > 15) lines.splice(0, 1);
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      lines.forEach((line, i) => {
        ctx.strokeStyle = `rgba(112, 192, 96, ${line.life * 0.6})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, line.y);
        ctx.lineTo(line.width, line.y);
        ctx.stroke();
        line.life -= 0.02;
      });

      // Remove dead lines
      for (let i = lines.length - 1; i >= 0; i--) {
        if (lines[i].life <= 0) lines.splice(i, 1);
      }

      requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [canvasRef]);

  return null;
}

// Effect 6: Code Fragments
function CodeFragments({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const fragments = [];
    const codes = ['{...}', '</>', '0x', '[];', '()', '=>', '&&', '||', '!=', '++', '/**/', 'null', 'true', '0xff'];

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (Math.random() > 0.7) {
        fragments.push({
          x, y,
          vx: (Math.random() - 0.5) * 2,
          vy: -Math.random() * 2 - 1,
          code: codes[Math.floor(Math.random() * codes.length)],
          life: 1
        });
      }
      if (fragments.length > 30) fragments.splice(0, 3);
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '11px monospace';
      for (let i = fragments.length - 1; i >= 0; i--) {
        const f = fragments[i];
        ctx.fillStyle = `rgba(112, 192, 96, ${f.life})`;
        ctx.fillText(f.code, f.x, f.y);
        f.x += f.vx;
        f.y += f.vy;
        f.vy += 0.05; // gravity
        f.life -= 0.012;
        if (f.life <= 0) fragments.splice(i, 1);
      }
      requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [canvasRef]);

  return null;
}

// Demo Section Component
function EffectDemo({ title, Effect }) {
  const canvasRef = useRef(null);

  return (
    <div className="relative h-[250px] border border-[#3d3530] rounded-lg overflow-hidden bg-[#0c0a08]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <Effect canvasRef={canvasRef} />
      <div className="absolute bottom-3 left-3 bg-[#0c0a08]/80 px-3 py-1 rounded">
        <span className="text-[#70c060] font-mono text-sm">{title}</span>
      </div>
    </div>
  );
}

export default function EffectsDemo() {
  return (
    <div className="min-h-screen bg-[#0c0a08] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-mono text-[#d0c8b8]">Mouse Effects Demo</h1>
          <Link href="/" className="text-[#70c060] hover:text-[#90e080] font-mono text-sm">
            &lt;- back
          </Link>
        </div>

        <p className="text-[#a09080] font-mono text-sm mb-8">
          Bewege die Maus über die Bereiche um die Effekte zu sehen:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EffectDemo title="1. Matrix Rain" Effect={MatrixRain} />
          <EffectDemo title="2. Glitch Blocks" Effect={GlitchBlocks} />
          <EffectDemo title="3. Binary Trail" Effect={BinaryTrail} />
          <EffectDemo title="4. Circuit Traces" Effect={CircuitTraces} />
          <EffectDemo title="5. Scan Lines" Effect={ScanLines} />
          <EffectDemo title="6. Code Fragments" Effect={CodeFragments} />
        </div>

        <p className="text-[#6b6055] font-mono text-xs mt-8 text-center">
          Sag mir welchen du willst oder ob ich einen anpassen soll
        </p>
      </div>
    </div>
  );
}
