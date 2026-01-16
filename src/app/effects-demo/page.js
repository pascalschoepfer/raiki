'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

// Variant A: Subtle Rain with Fading Trail
function MatrixRainFade({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = 'アイウエオカキクケコ01';
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);

    // Each drop has position and trail
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops.push({
        y: Math.random() * -50,
        speed: 0.2 + Math.random() * 0.3,
        trail: [] // {y, char, opacity}
      });
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        const x = i * fontSize;

        // Spawn new character occasionally
        if (Math.random() > 0.97 && drop.y * fontSize < canvas.height) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          drop.trail.push({
            y: drop.y,
            char: char,
            opacity: 0.25
          });
        }

        // Draw and fade trail
        for (let j = drop.trail.length - 1; j >= 0; j--) {
          const t = drop.trail[j];
          ctx.fillStyle = `rgba(112, 192, 96, ${t.opacity})`;
          ctx.fillText(t.char, x, t.y * fontSize);
          t.opacity *= 0.97;

          if (t.opacity < 0.02) {
            drop.trail.splice(j, 1);
          }
        }

        drop.y += drop.speed;

        // Reset when off screen
        if (drop.y * fontSize > canvas.height + 50 && drop.trail.length === 0) {
          drop.y = Math.random() * -30;
          drop.speed = 0.2 + Math.random() * 0.3;
        }
      }
    };

    const interval = setInterval(draw, 60);
    return () => clearInterval(interval);
  }, [canvasRef]);

  return null;
}

// Variant B: Sparse Float with Trail Lines
function MatrixSparseTrail({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = 'アイウエオ01<>/{}_';
    const particles = [];

    const spawnParticle = () => {
      if (particles.length < 12 && Math.random() > 0.96) {
        particles.push({
          x: Math.random() * canvas.width,
          y: -20,
          char: chars[Math.floor(Math.random() * chars.length)],
          speed: 0.4 + Math.random() * 0.4,
          opacity: 0.2 + Math.random() * 0.1,
          trail: [],
          reachedBottom: false
        });
      }
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '14px monospace';

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Add trail point only if not reached bottom
        if (!p.reachedBottom && Math.random() > 0.6) {
          p.trail.push({ y: p.y, opacity: p.opacity * 0.8 });
        }

        // Determine fade rate based on whether particle reached bottom
        const trailFadeRate = p.reachedBottom ? 0.85 : 0.94;

        // Draw trail line
        for (let j = p.trail.length - 1; j >= 0; j--) {
          const t = p.trail[j];
          ctx.fillStyle = `rgba(112, 192, 96, ${t.opacity * 0.3})`;
          ctx.fillRect(p.x + 3, t.y, 1, 8);
          t.opacity *= trailFadeRate;
          if (t.opacity < 0.02) p.trail.splice(j, 1);
        }

        // Draw main character only if still visible
        if (p.opacity > 0.02) {
          ctx.fillStyle = `rgba(112, 192, 96, ${p.opacity})`;
          ctx.fillText(p.char, p.x, p.y);
        }
        p.y += p.speed;

        // Fade when near bottom
        if (p.y > canvas.height - 100) {
          p.opacity *= 0.94;
          p.reachedBottom = true;
        }

        // Remove when both particle and trail are gone
        if (p.opacity < 0.02 && p.trail.length === 0) {
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

// Variant C: Rain + Scan Combo
function MatrixRainScan({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = 'アイウエオカキク01';
    const fontSize = 11;
    const columns = Math.floor(canvas.width / fontSize);

    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops.push({
        y: Math.random() * -100,
        speed: 0.15 + Math.random() * 0.2,
        active: Math.random() > 0.7,
        trail: []
      });
    }

    let scanY = 0;

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      // Draw rain
      for (let i = 0; i < drops.length; i++) {
        if (!drops[i].active) continue;

        const drop = drops[i];
        const x = i * fontSize;

        if (Math.random() > 0.96) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          drop.trail.push({ y: drop.y, char, opacity: 0.2 });
        }

        for (let j = drop.trail.length - 1; j >= 0; j--) {
          const t = drop.trail[j];
          ctx.fillStyle = `rgba(112, 192, 96, ${t.opacity})`;
          ctx.fillText(t.char, x, t.y * fontSize);
          t.opacity *= 0.96;
          if (t.opacity < 0.02) drop.trail.splice(j, 1);
        }

        drop.y += drop.speed;

        if (drop.y * fontSize > canvas.height && drop.trail.length === 0) {
          drop.y = Math.random() * -20;
          drop.active = Math.random() > 0.6;
        }
      }

      // Draw scan line
      const lineY = scanY % canvas.height;
      for (let x = 0; x < canvas.width; x += 20) {
        if (Math.random() > 0.8) {
          ctx.fillStyle = `rgba(112, 192, 96, ${0.08 + Math.random() * 0.08})`;
          const char = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(char, x, lineY);
        }
      }
      scanY += 1.5;
    };

    const interval = setInterval(draw, 60);
    return () => clearInterval(interval);
  }, [canvasRef]);

  return null;
}

// Variant D: Gentle Rain with Long Fading Trails
function MatrixGentleRain({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = '01アイウ';
    const fontSize = 10;
    const columns = Math.floor(canvas.width / fontSize);

    const streams = [];
    for (let i = 0; i < columns; i++) {
      if (Math.random() > 0.85) {
        streams.push({
          x: i * fontSize,
          y: Math.random() * -200,
          speed: 0.3 + Math.random() * 0.2,
          chars: [],
          maxLen: 5 + Math.floor(Math.random() * 8),
          reachedBottom: false
        });
      }
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let s of streams) {
        // Check if head reached bottom
        if (s.y > canvas.height - 50) {
          s.reachedBottom = true;
        }

        // Add new char at head only if not reached bottom
        if (!s.reachedBottom && s.y > 0 && Math.random() > 0.7) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          s.chars.unshift({ y: s.y, char, opacity: 0.22 });
          if (s.chars.length > s.maxLen) s.chars.pop();
        }

        // Determine fade rate
        const fadeRate = s.reachedBottom ? 0.95 : 0.992;

        // Draw chars with fade
        for (let i = 0; i < s.chars.length; i++) {
          const c = s.chars[i];
          const fadeMultiplier = 1 - (i / s.chars.length) * 0.7;
          ctx.fillStyle = `rgba(112, 192, 96, ${c.opacity * fadeMultiplier})`;
          ctx.fillText(c.char, s.x, c.y);
          c.opacity *= fadeRate;
        }

        // Remove faded chars
        s.chars = s.chars.filter(c => c.opacity > 0.02);

        s.y += s.speed;

        // Reset stream when all chars are gone
        if (s.chars.length === 0 && s.reachedBottom) {
          s.y = Math.random() * -100;
          s.maxLen = 5 + Math.floor(Math.random() * 8);
          s.reachedBottom = false;
        }
      }
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, [canvasRef]);

  return null;
}

// Variant E: Sparse with Vertical Line Trail
function MatrixSparseLines({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = 'アイウエオ01';
    const particles = [];

    const spawnParticle = () => {
      if (particles.length < 8 && Math.random() > 0.97) {
        particles.push({
          x: Math.random() * canvas.width,
          y: -10,
          startY: -10,
          char: chars[Math.floor(Math.random() * chars.length)],
          speed: 0.5 + Math.random() * 0.3,
          opacity: 0.2,
          trailOpacity: 0.2,
          reachedBottom: false
        });
      }
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '12px monospace';

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Draw vertical line trail only if still visible
        if (p.trailOpacity > 0.02) {
          const lineLength = Math.min(p.y - p.startY, 80);
          if (lineLength > 0) {
            const gradient = ctx.createLinearGradient(p.x + 3, p.y - lineLength, p.x + 3, p.y);
            gradient.addColorStop(0, 'rgba(112, 192, 96, 0)');
            gradient.addColorStop(1, `rgba(112, 192, 96, ${p.trailOpacity * 0.4})`);
            ctx.fillStyle = gradient;
            ctx.fillRect(p.x + 3, p.y - lineLength, 1, lineLength);
          }
        }

        // Draw character at head only if still visible
        if (p.opacity > 0.02) {
          ctx.fillStyle = `rgba(112, 192, 96, ${p.opacity})`;
          ctx.fillText(p.char, p.x, p.y);
        }

        p.y += p.speed;

        // Start fading near bottom
        if (p.y > canvas.height - 80) {
          p.opacity *= 0.93;
          p.reachedBottom = true;
        }

        // Fade trail faster once reached bottom
        if (p.reachedBottom) {
          p.trailOpacity *= 0.9;
          p.startY += 3; // Shrink trail from top
        }

        // Remove when both are invisible
        if (p.opacity < 0.02 && p.trailOpacity < 0.02) {
          particles.splice(i, 1);
        }
      }

      spawnParticle();
    };

    const interval = setInterval(draw, 40);
    return () => clearInterval(interval);
  }, [canvasRef]);

  return null;
}

// Variant F: Double Scan with Sparse Chars
function MatrixDoubleScan({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = '01アイウエオ<>/';
    let scan1 = 0;
    let scan2 = canvas.height / 2;

    const floaters = [];

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '10px monospace';

      // Two scan lines at different speeds
      const y1 = scan1 % canvas.height;
      const y2 = scan2 % canvas.height;

      for (let x = 0; x < canvas.width; x += 25) {
        if (Math.random() > 0.85) {
          ctx.fillStyle = `rgba(112, 192, 96, ${0.06 + Math.random() * 0.06})`;
          const char = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(char, x, y1);
        }
        if (Math.random() > 0.9) {
          ctx.fillStyle = `rgba(112, 192, 96, ${0.05 + Math.random() * 0.05})`;
          const char = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(char, x + 12, y2);
        }
      }

      scan1 += 1.2;
      scan2 += 0.8;

      // Spawn occasional floater
      if (Math.random() > 0.99 && floaters.length < 5) {
        floaters.push({
          x: Math.random() * canvas.width,
          y: -10,
          char: chars[Math.floor(Math.random() * chars.length)],
          speed: 0.3,
          opacity: 0.15
        });
      }

      // Draw floaters
      for (let i = floaters.length - 1; i >= 0; i--) {
        const f = floaters[i];
        ctx.fillStyle = `rgba(112, 192, 96, ${f.opacity})`;
        ctx.fillText(f.char, f.x, f.y);
        f.y += f.speed;
        if (f.y > canvas.height - 50) f.opacity *= 0.95;
        if (f.opacity < 0.02) floaters.splice(i, 1);
      }
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
          <h1 className="text-2xl font-mono text-[#d0c8b8]">Matrix Background v2</h1>
          <Link href="/" className="text-[#70c060] hover:text-[#90e080] font-mono text-sm">
            &larr; back
          </Link>
        </div>

        <p className="text-[#a09080] font-mono text-sm mb-8">
          Varianten mit Fading Trails (basierend auf Subtle Rain, Sparse Float, Scan Line):
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EffectDemo
            title="A. Rain with Fade"
            description="Subtle rain mit verblassenden Zeichen"
            Effect={MatrixRainFade}
          />
          <EffectDemo
            title="B. Sparse Trail"
            description="Sparse float mit Trail-Linien"
            Effect={MatrixSparseTrail}
          />
          <EffectDemo
            title="C. Rain + Scan Combo"
            description="Kombination aus Rain und Scan Line"
            Effect={MatrixRainScan}
          />
          <EffectDemo
            title="D. Gentle Rain"
            description="Sanfter Regen mit langen fading trails"
            Effect={MatrixGentleRain}
          />
          <EffectDemo
            title="E. Sparse Lines"
            description="Sparse chars mit vertikalen Linien"
            Effect={MatrixSparseLines}
          />
          <EffectDemo
            title="F. Double Scan"
            description="Zwei Scan-Linien + gelegentliche Floater"
            Effect={MatrixDoubleScan}
          />
        </div>

        <p className="text-[#6b6055] font-mono text-xs mt-8 text-center">
          Alle Varianten mit Fading wenn unten angekommen
        </p>
      </div>
    </div>
  );
}
