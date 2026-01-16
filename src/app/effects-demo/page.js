'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

// 1. Binary Rain - sparse falling 0s and 1s
function BinaryRain({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const drops = [];
    const maxDrops = 8;

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '14px monospace';

      if (drops.length < maxDrops && Math.random() > 0.97) {
        drops.push({ x: Math.random() * canvas.width, y: -20, speed: 0.5 + Math.random() * 0.5, char: Math.random() > 0.5 ? '0' : '1', opacity: 0.3 });
      }

      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        ctx.fillStyle = `rgba(112, 192, 96, ${d.opacity})`;
        ctx.fillText(d.char, d.x, d.y);
        d.y += d.speed;
        if (d.y > canvas.height - 50) d.opacity *= 0.95;
        if (d.opacity < 0.02) drops.splice(i, 1);
      }
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 2. Hex Grid - fading hex values appearing in a grid
function HexGrid({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const cells = [];
    const cellSize = 60;

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '10px monospace';

      if (cells.length < 12 && Math.random() > 0.96) {
        const col = Math.floor(Math.random() * (canvas.width / cellSize));
        const row = Math.floor(Math.random() * (canvas.height / cellSize));
        const hex = Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, '0');
        cells.push({ x: col * cellSize + 10, y: row * cellSize + 30, text: `0x${hex}`, opacity: 0.25 });
      }

      for (let i = cells.length - 1; i >= 0; i--) {
        const c = cells[i];
        ctx.fillStyle = `rgba(112, 192, 96, ${c.opacity})`;
        ctx.fillText(c.text, c.x, c.y);
        c.opacity *= 0.99;
        if (c.opacity < 0.02) cells.splice(i, 1);
      }
    };

    const interval = setInterval(draw, 60);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 3. Particle Network - connected dots
function ParticleNetwork({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = [];
    for (let i = 0; i < 15; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3
      });
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(112, 192, 96, ${0.08 * (1 - dist / 120)})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and move particles
      for (const p of particles) {
        ctx.fillStyle = 'rgba(112, 192, 96, 0.15)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 4. Glitch Blocks - random rectangles that glitch in/out
function GlitchBlocks({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const blocks = [];

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (blocks.length < 4 && Math.random() > 0.97) {
        blocks.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          w: 20 + Math.random() * 60,
          h: 2 + Math.random() * 8,
          opacity: 0.15,
          life: 20 + Math.random() * 30
        });
      }

      for (let i = blocks.length - 1; i >= 0; i--) {
        const b = blocks[i];
        ctx.fillStyle = `rgba(112, 192, 96, ${b.opacity})`;
        ctx.fillRect(b.x, b.y, b.w, b.h);
        b.life--;
        if (b.life < 10) b.opacity *= 0.85;
        if (b.life <= 0) blocks.splice(i, 1);
      }
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 5. Terminal Typing - simulated terminal commands
function TerminalTyping({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const commands = ['ssh root@', 'nmap -sV', 'curl -X', 'ping -c', 'cat /etc/', 'grep -r', 'sudo rm', 'chmod +x'];
    const lines = [];

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '11px monospace';

      if (lines.length < 3 && Math.random() > 0.98) {
        lines.push({
          x: 10 + Math.random() * (canvas.width - 150),
          y: 20 + Math.random() * (canvas.height - 40),
          text: '> ' + commands[Math.floor(Math.random() * commands.length)],
          index: 0,
          opacity: 0.25
        });
      }

      for (let i = lines.length - 1; i >= 0; i--) {
        const l = lines[i];
        const displayText = l.text.substring(0, l.index);
        ctx.fillStyle = `rgba(112, 192, 96, ${l.opacity})`;
        ctx.fillText(displayText + (l.index < l.text.length ? '_' : ''), l.x, l.y);

        if (l.index < l.text.length && Math.random() > 0.7) l.index++;
        else if (l.index >= l.text.length) l.opacity *= 0.98;

        if (l.opacity < 0.02) lines.splice(i, 1);
      }
    };

    const interval = setInterval(draw, 80);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 6. Circuit Traces - circuit board like paths
function CircuitTraces({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const traces = [];

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (traces.length < 3 && Math.random() > 0.98) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height;
        traces.push({
          points: [{ x: startX, y: startY }],
          dir: Math.floor(Math.random() * 4),
          opacity: 0.12,
          growing: true,
          maxLen: 5 + Math.floor(Math.random() * 8)
        });
      }

      for (let i = traces.length - 1; i >= 0; i--) {
        const t = traces[i];

        // Draw trace
        ctx.strokeStyle = `rgba(112, 192, 96, ${t.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(t.points[0].x, t.points[0].y);
        for (const p of t.points) ctx.lineTo(p.x, p.y);
        ctx.stroke();

        // Draw nodes
        for (const p of t.points) {
          ctx.fillStyle = `rgba(112, 192, 96, ${t.opacity * 1.5})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }

        if (t.growing && t.points.length < t.maxLen && Math.random() > 0.8) {
          const last = t.points[t.points.length - 1];
          const step = 20 + Math.random() * 20;
          if (Math.random() > 0.6) t.dir = Math.floor(Math.random() * 4);
          const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
          const newX = last.x + dirs[t.dir][0] * step;
          const newY = last.y + dirs[t.dir][1] * step;
          if (newX > 0 && newX < canvas.width && newY > 0 && newY < canvas.height) {
            t.points.push({ x: newX, y: newY });
          } else {
            t.growing = false;
          }
        } else if (!t.growing || t.points.length >= t.maxLen) {
          t.growing = false;
          t.opacity *= 0.98;
        }

        if (t.opacity < 0.01) traces.splice(i, 1);
      }
    };

    const interval = setInterval(draw, 100);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 7. Data Pulse - horizontal data streams
function DataPulse({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const pulses = [];

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (pulses.length < 5 && Math.random() > 0.97) {
        pulses.push({
          y: Math.random() * canvas.height,
          x: -50,
          speed: 2 + Math.random() * 2,
          width: 30 + Math.random() * 50,
          opacity: 0.15
        });
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const gradient = ctx.createLinearGradient(p.x, 0, p.x + p.width, 0);
        gradient.addColorStop(0, 'rgba(112, 192, 96, 0)');
        gradient.addColorStop(0.5, `rgba(112, 192, 96, ${p.opacity})`);
        gradient.addColorStop(1, 'rgba(112, 192, 96, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(p.x, p.y - 1, p.width, 2);
        p.x += p.speed;
        if (p.x > canvas.width + 50) pulses.splice(i, 1);
      }
    };

    const interval = setInterval(draw, 30);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 8. Static Noise - subtle TV static
function StaticNoise({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const opacity = Math.random() * 0.06;
        ctx.fillStyle = `rgba(112, 192, 96, ${opacity})`;
        ctx.fillRect(x, y, 1, 1);
      }
    };

    const interval = setInterval(draw, 100);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 9. Waveform - audio waveform style
function Waveform({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let offset = 0;
    const waves = [
      { y: canvas.height * 0.3, amp: 15, freq: 0.02, speed: 0.03, opacity: 0.08 },
      { y: canvas.height * 0.5, amp: 20, freq: 0.015, speed: 0.02, opacity: 0.1 },
      { y: canvas.height * 0.7, amp: 12, freq: 0.025, speed: 0.04, opacity: 0.06 }
    ];

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const wave of waves) {
        ctx.strokeStyle = `rgba(112, 192, 96, ${wave.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 3) {
          const y = wave.y + Math.sin((x * wave.freq) + offset * wave.speed) * wave.amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      offset++;
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 10. Code Rain (classic but minimal)
function CodeRain({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = '{}[]<>/\\|;:,.!?@#$%&*+-=~`';
    const streams = [];
    const maxStreams = 5;

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '12px monospace';

      if (streams.length < maxStreams && Math.random() > 0.98) {
        streams.push({
          x: Math.random() * canvas.width,
          chars: [],
          speed: 0.4 + Math.random() * 0.3,
          nextY: -10
        });
      }

      for (let i = streams.length - 1; i >= 0; i--) {
        const s = streams[i];

        if (s.nextY < canvas.height && Math.random() > 0.85) {
          s.chars.push({
            y: s.nextY,
            char: chars[Math.floor(Math.random() * chars.length)],
            opacity: 0.25
          });
          s.nextY += 14;
        }

        for (let j = s.chars.length - 1; j >= 0; j--) {
          const c = s.chars[j];
          ctx.fillStyle = `rgba(112, 192, 96, ${c.opacity})`;
          ctx.fillText(c.char, s.x, c.y);
          c.y += s.speed;
          if (c.y > canvas.height - 30) c.opacity *= 0.94;
          if (c.opacity < 0.02) s.chars.splice(j, 1);
        }

        if (s.nextY > canvas.height && s.chars.length === 0) {
          streams.splice(i, 1);
        }
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
    <div className="relative h-[250px] border border-[#3d3530] rounded-lg overflow-hidden bg-[#0c0a08]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <Effect canvasRef={canvasRef} />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-[#c0b8a8] font-mono text-lg opacity-40">content</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0c0a08] to-transparent p-3">
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
          <h1 className="text-2xl font-mono text-[#d0c8b8]">background effects v3</h1>
          <Link href="/" className="text-[#70c060] hover:text-[#90e080] font-mono text-sm">
            &larr; back
          </Link>
        </div>

        <p className="text-[#a09080] font-mono text-sm mb-8">
          10 different subtle background effects:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <EffectDemo title="1. binary rain" description="falling 0s and 1s" Effect={BinaryRain} />
          <EffectDemo title="2. hex grid" description="fading hex values" Effect={HexGrid} />
          <EffectDemo title="3. particle network" description="connected dots" Effect={ParticleNetwork} />
          <EffectDemo title="4. glitch blocks" description="random glitch rectangles" Effect={GlitchBlocks} />
          <EffectDemo title="5. terminal typing" description="simulated commands" Effect={TerminalTyping} />
          <EffectDemo title="6. circuit traces" description="circuit board paths" Effect={CircuitTraces} />
          <EffectDemo title="7. data pulse" description="horizontal streams" Effect={DataPulse} />
          <EffectDemo title="8. static noise" description="subtle tv static" Effect={StaticNoise} />
          <EffectDemo title="9. waveform" description="audio wave lines" Effect={Waveform} />
          <EffectDemo title="10. code rain" description="classic symbols" Effect={CodeRain} />
        </div>
      </div>
    </div>
  );
}
