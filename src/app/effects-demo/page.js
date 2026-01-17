'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

// 1. Classic Matrix - the OG effect
function MatrixClassic({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0).map(() => Math.random() * -100);

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        if (Math.random() > 0.98) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          // Bright head
          ctx.fillStyle = 'rgba(180, 255, 180, 0.9)';
          ctx.fillText(char, x, y);

          // Trail
          for (let t = 1; t < 20; t++) {
            const trailY = y - t * fontSize;
            if (trailY > 0) {
              const trailChar = chars[Math.floor(Math.random() * chars.length)];
              ctx.fillStyle = `rgba(112, 192, 96, ${0.4 - t * 0.02})`;
              ctx.fillText(trailChar, x, trailY);
            }
          }
        }

        drops[i] += 0.3;
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
      }
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 2. Sparse Rain - minimal, few columns
function MatrixSparse({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = 'アイウエオ01';
    const streams = [];
    const maxStreams = 5;

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '14px monospace';

      if (streams.length < maxStreams && Math.random() > 0.98) {
        streams.push({
          x: Math.random() * canvas.width,
          y: -20,
          speed: 1 + Math.random() * 0.5,
          trail: []
        });
      }

      for (let i = streams.length - 1; i >= 0; i--) {
        const s = streams[i];

        // Add new char to trail
        if (Math.random() > 0.7) {
          s.trail.push({ y: s.y, char: chars[Math.floor(Math.random() * chars.length)], opacity: 0.8 });
        }

        // Draw trail
        for (let j = s.trail.length - 1; j >= 0; j--) {
          const t = s.trail[j];
          ctx.fillStyle = `rgba(112, 192, 96, ${t.opacity})`;
          ctx.fillText(t.char, s.x, t.y);
          t.opacity *= 0.96;
          if (t.opacity < 0.02) s.trail.splice(j, 1);
        }

        s.y += s.speed;
        if (s.y > canvas.height + 50 && s.trail.length === 0) {
          streams.splice(i, 1);
        }
      }
    };

    const interval = setInterval(draw, 40);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 3. Matrix Glow - with bloom effect
function MatrixGlow({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = 'ラリルレロ01アイウ';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0).map(() => Math.random() * -50);
    const active = Array(columns).fill(false).map(() => Math.random() > 0.7);

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        if (!active[i]) continue;

        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Glow effect
        ctx.shadowColor = '#70c060';
        ctx.shadowBlur = 15;
        ctx.fillStyle = 'rgba(150, 255, 150, 0.9)';
        ctx.fillText(char, x, y);
        ctx.shadowBlur = 0;

        drops[i] += 0.4;
        if (drops[i] * fontSize > canvas.height) {
          drops[i] = 0;
          active[i] = Math.random() > 0.6;
        }
      }
    };

    const interval = setInterval(draw, 60);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 4. Matrix Cascade - wave pattern
function MatrixCascade({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = 'アイウエオ01カキク';
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    let time = 0;

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columns; i++) {
        const waveOffset = Math.sin(i * 0.2 + time * 0.05) * 50;
        const y = ((time * 2 + waveOffset) % (canvas.height + 100)) - 50;

        if (Math.random() > 0.95) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillStyle = `rgba(112, 192, 96, ${0.3 + Math.random() * 0.2})`;
          ctx.fillText(char, i * fontSize, y);
        }
      }
      time++;
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 5. Matrix Binary - only 0 and 1
function MatrixBinary({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0).map(() => ({ y: Math.random() * -100, active: Math.random() > 0.85 }));

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        if (!drops[i].active) continue;

        const char = Math.random() > 0.5 ? '1' : '0';
        const x = i * fontSize;
        const y = drops[i].y;

        ctx.fillStyle = `rgba(112, 192, 96, ${0.15 + Math.random() * 0.15})`;
        ctx.fillText(char, x, y);

        drops[i].y += 0.5 + Math.random() * 0.3;
        if (drops[i].y > canvas.height) {
          drops[i].y = Math.random() * -50;
          drops[i].active = Math.random() > 0.8;
        }
      }
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 6. Matrix Depth - multiple layers at different speeds
function MatrixDepth({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = 'アイウエオ01';
    const layers = [
      { fontSize: 8, speed: 0.3, opacity: 0.08, columns: [] },
      { fontSize: 12, speed: 0.5, opacity: 0.15, columns: [] },
      { fontSize: 16, speed: 0.8, opacity: 0.25, columns: [] }
    ];

    layers.forEach(layer => {
      const cols = Math.floor(canvas.width / layer.fontSize);
      layer.columns = Array(cols).fill(0).map(() => ({
        y: Math.random() * canvas.height,
        active: Math.random() > 0.8
      }));
    });

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const layer of layers) {
        ctx.font = `${layer.fontSize}px monospace`;

        for (let i = 0; i < layer.columns.length; i++) {
          const col = layer.columns[i];
          if (!col.active) continue;

          const char = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillStyle = `rgba(112, 192, 96, ${layer.opacity})`;
          ctx.fillText(char, i * layer.fontSize, col.y);

          col.y += layer.speed;
          if (col.y > canvas.height) {
            col.y = -20;
            col.active = Math.random() > 0.7;
          }
        }
      }
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 7. Matrix Katakana - pure Japanese
function MatrixKatakana({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴ';
    const fontSize = 14;
    const streams = [];
    const maxStreams = 8;

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      if (streams.length < maxStreams && Math.random() > 0.97) {
        const x = Math.floor(Math.random() * (canvas.width / fontSize)) * fontSize;
        streams.push({ x, y: -fontSize, length: 5 + Math.floor(Math.random() * 15) });
      }

      for (let i = streams.length - 1; i >= 0; i--) {
        const s = streams[i];

        for (let j = 0; j < s.length; j++) {
          const charY = s.y - j * fontSize;
          if (charY > 0 && charY < canvas.height) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const opacity = j === 0 ? 0.9 : 0.4 - (j / s.length) * 0.3;
            ctx.fillStyle = j === 0 ? 'rgba(200, 255, 200, 0.9)' : `rgba(112, 192, 96, ${Math.max(opacity, 0.05)})`;
            ctx.fillText(char, s.x, charY);
          }
        }

        s.y += 2;
        if (s.y - s.length * fontSize > canvas.height) {
          streams.splice(i, 1);
        }
      }
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 8. Matrix Hex - hexadecimal codes
function MatrixHex({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const streams = [];
    const maxStreams = 6;

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '10px monospace';

      if (streams.length < maxStreams && Math.random() > 0.97) {
        streams.push({
          x: Math.random() * (canvas.width - 40),
          y: -15,
          speed: 0.8 + Math.random() * 0.4,
          values: []
        });
      }

      for (let i = streams.length - 1; i >= 0; i--) {
        const s = streams[i];

        if (Math.random() > 0.8 && s.y < canvas.height) {
          const hex = Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0');
          s.values.push({ y: s.y, text: hex, opacity: 0.5 });
        }

        for (let j = s.values.length - 1; j >= 0; j--) {
          const v = s.values[j];
          ctx.fillStyle = `rgba(112, 192, 96, ${v.opacity})`;
          ctx.fillText(v.text, s.x, v.y);
          v.opacity *= 0.98;
          if (v.opacity < 0.02) s.values.splice(j, 1);
        }

        s.y += s.speed;
        if (s.y > canvas.height + 50 && s.values.length === 0) {
          streams.splice(i, 1);
        }
      }
    };

    const interval = setInterval(draw, 40);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 9. Matrix Code - programming symbols
function MatrixCode({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = '{}[]()<>;;::==!=&&||++--/*%$#@!?';
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0).map(() => ({
      y: Math.random() * -200,
      speed: 0.3 + Math.random() * 0.4,
      active: Math.random() > 0.9
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        if (!drops[i].active) {
          if (Math.random() > 0.998) drops[i].active = true;
          continue;
        }

        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = `rgba(112, 192, 96, ${0.2 + Math.random() * 0.1})`;
        ctx.fillText(char, i * fontSize, drops[i].y);

        drops[i].y += drops[i].speed;
        if (drops[i].y > canvas.height) {
          drops[i].y = Math.random() * -100;
          drops[i].active = Math.random() > 0.85;
        }
      }
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 10. Matrix Minimal - super subtle
function MatrixMinimal({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = 'アイウ01';
    const drops = [];
    const maxDrops = 3;

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '14px monospace';

      if (drops.length < maxDrops && Math.random() > 0.99) {
        drops.push({
          x: Math.random() * canvas.width,
          y: -20,
          trail: [],
          speed: 0.5 + Math.random() * 0.3
        });
      }

      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];

        if (Math.random() > 0.6) {
          d.trail.push({ y: d.y, char: chars[Math.floor(Math.random() * chars.length)], opacity: 0.15 });
        }

        for (let j = d.trail.length - 1; j >= 0; j--) {
          const t = d.trail[j];
          ctx.fillStyle = `rgba(112, 192, 96, ${t.opacity})`;
          ctx.fillText(t.char, d.x, t.y);
          t.opacity *= 0.99;
          if (t.opacity < 0.01) d.trail.splice(j, 1);
        }

        d.y += d.speed;
        if (d.y > canvas.height && d.trail.length === 0) {
          drops.splice(i, 1);
        }
      }
    };

    const interval = setInterval(draw, 60);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 11. Neural Network - connected nodes
function NeuralNetwork({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const nodes = Array(30).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: 2 + Math.random() * 2
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(112, 192, 96, ${0.3 - dist / 350})`;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(112, 192, 96, 0.6)';
        ctx.fill();

        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      }
    };

    const interval = setInterval(draw, 30);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 12. Cyber Grid - Tron style
function CyberGrid({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let offset = 0;
    const gridSize = 40;

    const draw = () => {
      ctx.fillStyle = '#0c0a08';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(112, 192, 96, 0.15)';
      ctx.lineWidth = 1;

      // Horizontal lines with perspective
      for (let y = 0; y < canvas.height; y += gridSize) {
        const perspective = 1 + (y / canvas.height) * 2;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.globalAlpha = 0.1 + (y / canvas.height) * 0.2;
        ctx.stroke();
      }

      // Vertical lines
      ctx.globalAlpha = 0.15;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Moving pulse lines
      ctx.strokeStyle = 'rgba(112, 192, 96, 0.5)';
      ctx.lineWidth = 2;
      const pulseY = (offset % canvas.height);
      ctx.beginPath();
      ctx.moveTo(0, pulseY);
      ctx.lineTo(canvas.width, pulseY);
      ctx.globalAlpha = 0.3;
      ctx.stroke();

      ctx.globalAlpha = 1;
      offset += 1;
    };

    const interval = setInterval(draw, 30);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 13. Particle Constellation
function ParticleConstellation({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = Array(50).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      pulse: Math.random() * Math.PI * 2
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.pulse += 0.05;
        const glow = 0.3 + Math.sin(p.pulse) * 0.2;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + Math.sin(p.pulse) * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(112, 192, 96, ${glow})`;
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }
    };

    const interval = setInterval(draw, 30);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 14. Circuit Board
function CircuitBoard({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const traces = [];
    const maxTraces = 8;

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (traces.length < maxTraces && Math.random() > 0.97) {
        const startX = Math.random() > 0.5 ? 0 : canvas.width;
        traces.push({
          x: startX,
          y: Math.random() * canvas.height,
          dirX: startX === 0 ? 1 : -1,
          dirY: 0,
          path: [],
          age: 0
        });
      }

      for (let i = traces.length - 1; i >= 0; i--) {
        const t = traces[i];
        t.path.push({ x: t.x, y: t.y });

        // Draw path
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(112, 192, 96, 0.4)';
        ctx.lineWidth = 1;
        for (let j = 0; j < t.path.length - 1; j++) {
          ctx.moveTo(t.path[j].x, t.path[j].y);
          ctx.lineTo(t.path[j + 1].x, t.path[j + 1].y);
        }
        ctx.stroke();

        // Draw head
        ctx.beginPath();
        ctx.arc(t.x, t.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(150, 255, 150, 0.8)';
        ctx.fill();

        // Move
        t.x += t.dirX * 3;
        t.y += t.dirY * 3;

        // Random turn
        if (Math.random() > 0.95) {
          if (t.dirX !== 0) {
            t.dirY = Math.random() > 0.5 ? 1 : -1;
            t.dirX = 0;
          } else {
            t.dirX = Math.random() > 0.5 ? 1 : -1;
            t.dirY = 0;
          }
        }

        t.age++;
        if (t.x < 0 || t.x > canvas.width || t.y < 0 || t.y > canvas.height || t.age > 200) {
          traces.splice(i, 1);
        }
      }
    };

    const interval = setInterval(draw, 30);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 15. Glitch Effect
function GlitchEffect({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Random glitch bars
      if (Math.random() > 0.9) {
        const y = Math.random() * canvas.height;
        const height = 2 + Math.random() * 10;
        ctx.fillStyle = `rgba(112, 192, 96, ${0.1 + Math.random() * 0.2})`;
        ctx.fillRect(0, y, canvas.width, height);
      }

      // Scanlines
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, y, canvas.width, 1);
      }

      // Random noise pixels
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.fillStyle = `rgba(112, 192, 96, ${Math.random() * 0.3})`;
        ctx.fillRect(x, y, 2 + Math.random() * 4, 1);
      }
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 16. Blockchain Nodes
function BlockchainNodes({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const blocks = Array(12).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 15 + Math.random() * 10,
      pulse: Math.random() * Math.PI * 2
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < blocks.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(blocks[i].x, blocks[i].y);
        ctx.lineTo(blocks[i + 1].x, blocks[i + 1].y);
        ctx.strokeStyle = 'rgba(112, 192, 96, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw blocks
      for (const b of blocks) {
        b.pulse += 0.03;
        const glow = 0.3 + Math.sin(b.pulse) * 0.15;

        ctx.strokeStyle = `rgba(112, 192, 96, ${glow})`;
        ctx.lineWidth = 2;
        ctx.strokeRect(b.x - b.size/2, b.y - b.size/2, b.size, b.size);

        ctx.fillStyle = `rgba(112, 192, 96, ${glow * 0.3})`;
        ctx.fillRect(b.x - b.size/2, b.y - b.size/2, b.size, b.size);
      }
    };

    const interval = setInterval(draw, 40);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 17. Waveform
function Waveform({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let time = 0;

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height / 2;

      ctx.beginPath();
      ctx.moveTo(0, centerY);

      for (let x = 0; x < canvas.width; x++) {
        const y = centerY +
          Math.sin(x * 0.02 + time) * 20 +
          Math.sin(x * 0.01 + time * 0.5) * 30 +
          Math.sin(x * 0.005 + time * 0.3) * 15;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = 'rgba(112, 192, 96, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Second wave
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      for (let x = 0; x < canvas.width; x++) {
        const y = centerY +
          Math.sin(x * 0.015 + time + 1) * 15 +
          Math.sin(x * 0.008 + time * 0.7) * 25;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(112, 192, 96, 0.25)';
      ctx.stroke();

      time += 0.05;
    };

    const interval = setInterval(draw, 30);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 18. Starfield Hyperspace
function Starfield({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const stars = Array(100).fill(0).map(() => ({
      x: Math.random() * canvas.width - canvas.width / 2,
      y: Math.random() * canvas.height - canvas.height / 2,
      z: Math.random() * canvas.width
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      for (const star of stars) {
        star.z -= 3;
        if (star.z <= 0) {
          star.x = Math.random() * canvas.width - cx;
          star.y = Math.random() * canvas.height - cy;
          star.z = canvas.width;
        }

        const sx = (star.x / star.z) * 200 + cx;
        const sy = (star.y / star.z) * 200 + cy;
        const size = (1 - star.z / canvas.width) * 3;
        const opacity = (1 - star.z / canvas.width) * 0.8;

        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(112, 192, 96, ${opacity})`;
        ctx.fill();
      }
    };

    const interval = setInterval(draw, 30);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 19. Hex Grid
function HexGrid({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const hexSize = 25;
    const hexes = [];

    for (let row = 0; row < canvas.height / (hexSize * 1.5) + 1; row++) {
      for (let col = 0; col < canvas.width / (hexSize * 1.73) + 1; col++) {
        hexes.push({
          x: col * hexSize * 1.73 + (row % 2) * hexSize * 0.865,
          y: row * hexSize * 1.5,
          pulse: Math.random() * Math.PI * 2,
          active: Math.random() > 0.85
        });
      }
    }

    const drawHex = (x, y, size, opacity) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const hx = x + size * Math.cos(angle);
        const hy = y + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(112, 192, 96, ${opacity})`;
      ctx.stroke();
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const hex of hexes) {
        hex.pulse += 0.02;
        if (hex.active) {
          const opacity = 0.1 + Math.sin(hex.pulse) * 0.1;
          drawHex(hex.x, hex.y, hexSize, opacity);
        } else if (Math.random() > 0.999) {
          hex.active = true;
        }
      }
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 20. Smoke/Fog
function SmokeFog({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = Array(40).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 50,
      size: 30 + Math.random() * 50,
      speedY: -0.3 - Math.random() * 0.3,
      speedX: (Math.random() - 0.5) * 0.5,
      opacity: 0.02 + Math.random() * 0.03
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, `rgba(112, 192, 96, ${p.opacity})`);
        gradient.addColorStop(1, 'rgba(112, 192, 96, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.y += p.speedY;
        p.x += p.speedX;
        p.size += 0.1;
        p.opacity *= 0.995;

        if (p.y < -p.size || p.opacity < 0.005) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
          p.size = 30 + Math.random() * 50;
          p.opacity = 0.02 + Math.random() * 0.03;
        }
      }
    };

    const interval = setInterval(draw, 30);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 21. DNA Helix
function DNAHelix({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let time = 0;
    const centerX = canvas.width / 2;

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < canvas.height; y += 8) {
        const phase = y * 0.05 + time;
        const x1 = centerX + Math.sin(phase) * 40;
        const x2 = centerX + Math.sin(phase + Math.PI) * 40;
        const z1 = Math.cos(phase);
        const z2 = Math.cos(phase + Math.PI);

        // Draw connection
        if (Math.floor(y / 8) % 4 === 0) {
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.strokeStyle = 'rgba(112, 192, 96, 0.2)';
          ctx.stroke();
        }

        // Draw helix points
        ctx.beginPath();
        ctx.arc(x1, y, 3 + z1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(112, 192, 96, ${0.3 + z1 * 0.3})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x2, y, 3 + z2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(112, 192, 96, ${0.3 + z2 * 0.3})`;
        ctx.fill();
      }

      time += 0.05;
    };

    const interval = setInterval(draw, 30);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 22. Radar Scan
function RadarScan({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let angle = 0;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.4;
    const blips = Array(8).fill(0).map(() => ({
      angle: Math.random() * Math.PI * 2,
      dist: Math.random() * radius,
      opacity: 0
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw circles
      for (let r = radius / 4; r <= radius; r += radius / 4) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(112, 192, 96, 0.15)';
        ctx.stroke();
      }

      // Draw cross
      ctx.beginPath();
      ctx.moveTo(cx - radius, cy);
      ctx.lineTo(cx + radius, cy);
      ctx.moveTo(cx, cy - radius);
      ctx.lineTo(cx, cy + radius);
      ctx.strokeStyle = 'rgba(112, 192, 96, 0.1)';
      ctx.stroke();

      // Draw sweep
      const gradient = ctx.createConicalGradient(angle, cx, cy);
      gradient.addColorStop(0, 'rgba(112, 192, 96, 0.3)');
      gradient.addColorStop(0.1, 'rgba(112, 192, 96, 0)');
      gradient.addColorStop(1, 'rgba(112, 192, 96, 0)');

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, angle - 0.5, angle);
      ctx.closePath();
      ctx.fillStyle = 'rgba(112, 192, 96, 0.2)';
      ctx.fill();

      // Draw sweep line
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
      ctx.strokeStyle = 'rgba(112, 192, 96, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.lineWidth = 1;

      // Draw blips
      for (const blip of blips) {
        if (Math.abs(angle - blip.angle) < 0.3 || Math.abs(angle - blip.angle + Math.PI * 2) < 0.3) {
          blip.opacity = 0.8;
        }
        if (blip.opacity > 0) {
          ctx.beginPath();
          ctx.arc(cx + Math.cos(blip.angle) * blip.dist, cy + Math.sin(blip.angle) * blip.dist, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(112, 192, 96, ${blip.opacity})`;
          ctx.fill();
          blip.opacity *= 0.98;
        }
      }

      angle += 0.03;
      if (angle > Math.PI * 2) angle = 0;
    };

    const interval = setInterval(draw, 30);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 23. Data Stream - horizontal packets
function DataStream({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const packets = [];
    const maxPackets = 15;

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (packets.length < maxPackets && Math.random() > 0.95) {
        const y = Math.floor(Math.random() * (canvas.height / 20)) * 20;
        packets.push({
          x: -50,
          y,
          width: 20 + Math.random() * 80,
          speed: 2 + Math.random() * 3,
          opacity: 0.3 + Math.random() * 0.3
        });
      }

      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];

        // Draw packet
        ctx.fillStyle = `rgba(112, 192, 96, ${p.opacity})`;
        ctx.fillRect(p.x, p.y, p.width, 3);

        // Trail
        const gradient = ctx.createLinearGradient(p.x - 30, p.y, p.x, p.y);
        gradient.addColorStop(0, 'rgba(112, 192, 96, 0)');
        gradient.addColorStop(1, `rgba(112, 192, 96, ${p.opacity * 0.5})`);
        ctx.fillStyle = gradient;
        ctx.fillRect(p.x - 30, p.y, 30, 3);

        p.x += p.speed;
        if (p.x > canvas.width + 50) {
          packets.splice(i, 1);
        }
      }

      // Horizontal guide lines
      ctx.strokeStyle = 'rgba(112, 192, 96, 0.05)';
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const interval = setInterval(draw, 30);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 24. Pulse Rings
function PulseRings({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const rings = [];
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add new ring
      if (Math.random() > 0.97) {
        rings.push({ radius: 5, opacity: 0.6 });
      }

      // Draw center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(112, 192, 96, 0.5)';
      ctx.fill();

      // Draw rings
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];

        ctx.beginPath();
        ctx.arc(cx, cy, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(112, 192, 96, ${ring.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        ring.radius += 1.5;
        ring.opacity *= 0.98;

        if (ring.opacity < 0.01) {
          rings.splice(i, 1);
        }
      }

      ctx.lineWidth = 1;
    };

    const interval = setInterval(draw, 30);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 25. Fractal Tree
function FractalTree({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let time = 0;

    const drawBranch = (x, y, length, angle, depth) => {
      if (depth === 0 || length < 3) return;

      const endX = x + Math.cos(angle) * length;
      const endY = y + Math.sin(angle) * length;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = `rgba(112, 192, 96, ${0.1 + depth * 0.05})`;
      ctx.lineWidth = depth * 0.5;
      ctx.stroke();

      const angleOffset = 0.4 + Math.sin(time + depth) * 0.1;
      drawBranch(endX, endY, length * 0.7, angle - angleOffset, depth - 1);
      drawBranch(endX, endY, length * 0.7, angle + angleOffset, depth - 1);
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawBranch(canvas.width / 2, canvas.height, 60, -Math.PI / 2, 8);
      time += 0.02;
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 26. Cyber Rain
function CyberRain({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const drops = Array(80).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: 10 + Math.random() * 20,
      speed: 4 + Math.random() * 4,
      opacity: 0.1 + Math.random() * 0.3
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const drop of drops) {
        const gradient = ctx.createLinearGradient(drop.x, drop.y, drop.x, drop.y + drop.length);
        gradient.addColorStop(0, `rgba(112, 192, 96, ${drop.opacity})`);
        gradient.addColorStop(1, 'rgba(112, 192, 96, 0)');

        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();

        drop.y += drop.speed;
        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      }
    };

    const interval = setInterval(draw, 30);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 27. Lightning
function Lightning({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const bolts = [];

    const createBolt = (startX, startY, endY) => {
      const points = [{ x: startX, y: startY }];
      let y = startY;
      while (y < endY) {
        y += 10 + Math.random() * 20;
        const x = points[points.length - 1].x + (Math.random() - 0.5) * 40;
        points.push({ x, y });
      }
      return { points, opacity: 0.8, age: 0 };
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Random new bolt
      if (Math.random() > 0.98) {
        bolts.push(createBolt(
          Math.random() * canvas.width,
          0,
          canvas.height * (0.5 + Math.random() * 0.5)
        ));
      }

      for (let i = bolts.length - 1; i >= 0; i--) {
        const bolt = bolts[i];

        ctx.beginPath();
        ctx.moveTo(bolt.points[0].x, bolt.points[0].y);
        for (let j = 1; j < bolt.points.length; j++) {
          ctx.lineTo(bolt.points[j].x, bolt.points[j].y);
        }
        ctx.strokeStyle = `rgba(112, 192, 96, ${bolt.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Glow
        ctx.strokeStyle = `rgba(112, 192, 96, ${bolt.opacity * 0.3})`;
        ctx.lineWidth = 6;
        ctx.stroke();

        bolt.opacity *= 0.9;
        bolt.age++;
        if (bolt.opacity < 0.01) {
          bolts.splice(i, 1);
        }
      }

      ctx.lineWidth = 1;
    };

    const interval = setInterval(draw, 30);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 28. Hologram
function Hologram({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let time = 0;

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Scanlines
      for (let y = 0; y < canvas.height; y += 3) {
        const offset = Math.sin(y * 0.1 + time) * 2;
        ctx.fillStyle = `rgba(112, 192, 96, ${0.02 + Math.sin(y * 0.05 + time) * 0.01})`;
        ctx.fillRect(offset, y, canvas.width, 1);
      }

      // Glitch blocks
      if (Math.random() > 0.95) {
        const y = Math.random() * canvas.height;
        const height = 5 + Math.random() * 15;
        const offset = (Math.random() - 0.5) * 20;
        ctx.fillStyle = `rgba(112, 192, 96, ${0.1 + Math.random() * 0.1})`;
        ctx.fillRect(offset, y, canvas.width, height);
      }

      // RGB shift effect
      if (Math.random() > 0.97) {
        ctx.fillStyle = 'rgba(255, 100, 100, 0.05)';
        ctx.fillRect(2, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(100, 100, 255, 0.05)';
        ctx.fillRect(-2, 0, canvas.width, canvas.height);
      }

      time += 0.1;
    };

    const interval = setInterval(draw, 30);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 29. Perspective Grid
function PerspectiveGrid({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let offset = 0;
    const horizon = canvas.height * 0.3;
    const vanishX = canvas.width / 2;

    const draw = () => {
      ctx.fillStyle = '#0c0a08';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(112, 192, 96, 0.3)';
      ctx.lineWidth = 1;

      // Vertical lines converging to horizon
      for (let x = -canvas.width; x < canvas.width * 2; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, canvas.height);
        ctx.lineTo(vanishX, horizon);
        ctx.stroke();
      }

      // Horizontal lines with perspective
      for (let i = 0; i < 20; i++) {
        const t = (i + offset) / 20;
        const y = horizon + (canvas.height - horizon) * Math.pow(t, 1.5);
        const spread = t * canvas.width;

        ctx.beginPath();
        ctx.moveTo(vanishX - spread, y);
        ctx.lineTo(vanishX + spread, y);
        ctx.strokeStyle = `rgba(112, 192, 96, ${0.1 + t * 0.2})`;
        ctx.stroke();
      }

      // Glow at horizon
      const gradient = ctx.createRadialGradient(vanishX, horizon, 0, vanishX, horizon, 100);
      gradient.addColorStop(0, 'rgba(112, 192, 96, 0.15)');
      gradient.addColorStop(1, 'rgba(112, 192, 96, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      offset += 0.02;
      if (offset >= 1) offset = 0;
    };

    const interval = setInterval(draw, 30);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 31. Matrix + Neural (Matrix rain with connected nodes)
function MatrixNeural({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = 'アイウエオ01';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0).map(() => Math.random() * -100);

    const nodes = Array(15).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Matrix rain
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        if (Math.random() > 0.97) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillStyle = `rgba(112, 192, 96, ${0.2 + Math.random() * 0.1})`;
          ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        }
        drops[i] += 0.3;
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
      }

      // Neural connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(112, 192, 96, ${0.15 - dist / 800})`;
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(112, 192, 96, 0.4)';
        ctx.fill();

        nodes[i].x += nodes[i].vx;
        nodes[i].y += nodes[i].vy;
        if (nodes[i].x < 0 || nodes[i].x > canvas.width) nodes[i].vx *= -1;
        if (nodes[i].y < 0 || nodes[i].y > canvas.height) nodes[i].vy *= -1;
      }
    };

    const interval = setInterval(draw, 40);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 32. Glitch Matrix (Matrix with glitch distortion)
function GlitchMatrix({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = 'アイウエオカキクケコ01';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0).map(() => Math.random() * -50);

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Glitch offset
      const glitchOffset = Math.random() > 0.95 ? (Math.random() - 0.5) * 10 : 0;

      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize + glitchOffset;
        const y = drops[i] * fontSize;

        ctx.fillStyle = 'rgba(180, 255, 180, 0.8)';
        ctx.fillText(char, x, y);

        // Trail with glitch
        for (let t = 1; t < 8; t++) {
          const trailGlitch = Math.random() > 0.9 ? (Math.random() - 0.5) * 5 : 0;
          ctx.fillStyle = `rgba(112, 192, 96, ${0.3 - t * 0.04})`;
          ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x + trailGlitch, y - t * fontSize);
        }

        drops[i] += 0.5;
        if (drops[i] * fontSize > canvas.height) drops[i] = Math.random() * -20;
      }

      // Glitch bars
      if (Math.random() > 0.92) {
        const y = Math.random() * canvas.height;
        ctx.fillStyle = `rgba(112, 192, 96, ${0.1 + Math.random() * 0.1})`;
        ctx.fillRect(0, y, canvas.width, 2 + Math.random() * 6);
      }

      // Scanlines
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        ctx.fillRect(0, y, canvas.width, 1);
      }
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 33. Grid Cascade (Wave pattern on cyber grid)
function GridCascade({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let time = 0;
    const gridSize = 30;

    const draw = () => {
      ctx.fillStyle = '#0c0a08';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid with wave distortion
      for (let x = 0; x < canvas.width + gridSize; x += gridSize) {
        for (let y = 0; y < canvas.height + gridSize; y += gridSize) {
          const waveX = Math.sin(y * 0.02 + time) * 5;
          const waveY = Math.sin(x * 0.02 + time * 0.7) * 5;
          const intensity = (Math.sin(x * 0.01 + y * 0.01 + time * 2) + 1) * 0.1;

          ctx.strokeStyle = `rgba(112, 192, 96, ${0.1 + intensity})`;
          ctx.beginPath();
          ctx.moveTo(x + waveX, y + waveY);
          ctx.lineTo(x + gridSize + waveX, y + waveY);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(x + waveX, y + waveY);
          ctx.lineTo(x + waveX, y + gridSize + waveY);
          ctx.stroke();
        }
      }

      // Moving wave highlight
      const waveY = (Math.sin(time * 0.5) + 1) * canvas.height / 2;
      ctx.strokeStyle = 'rgba(112, 192, 96, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, waveY);
      for (let x = 0; x < canvas.width; x += 5) {
        ctx.lineTo(x, waveY + Math.sin(x * 0.03 + time * 2) * 15);
      }
      ctx.stroke();
      ctx.lineWidth = 1;

      time += 0.03;
    };

    const interval = setInterval(draw, 30);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 34. Neural Glitch (Glitchy neural network)
function NeuralGlitch({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const nodes = Array(25).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      glitchTimer: 0
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Glitch effect
      if (Math.random() > 0.9) {
        const sliceY = Math.random() * canvas.height;
        const sliceH = 5 + Math.random() * 20;
        const shift = (Math.random() - 0.5) * 30;
        const imageData = ctx.getImageData(0, sliceY, canvas.width, sliceH);
        ctx.putImageData(imageData, shift, sliceY);
      }

      // Connections with glitch
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            const glitchX = Math.random() > 0.95 ? (Math.random() - 0.5) * 10 : 0;
            ctx.moveTo(nodes[i].x + glitchX, nodes[i].y);
            ctx.lineTo(nodes[j].x - glitchX, nodes[j].y);
            ctx.strokeStyle = `rgba(112, 192, 96, ${0.4 - dist / 300})`;
            ctx.lineWidth = Math.random() > 0.98 ? 3 : 1;
            ctx.stroke();
          }
        }
      }

      // Nodes with glitch
      for (const node of nodes) {
        const glitch = Math.random() > 0.97;
        const size = glitch ? 5 + Math.random() * 5 : 3;

        ctx.beginPath();
        ctx.arc(node.x + (glitch ? (Math.random() - 0.5) * 10 : 0), node.y, size, 0, Math.PI * 2);
        ctx.fillStyle = glitch ? 'rgba(200, 255, 200, 0.9)' : 'rgba(112, 192, 96, 0.6)';
        ctx.fill();

        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      }

      ctx.lineWidth = 1;
    };

    const interval = setInterval(draw, 30);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 35. Grid Matrix (Matrix rain on cyber grid)
function GridMatrix({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = 'アイウ01';
    const gridSize = 40;
    const drops = [];

    // Create drops at grid intersections
    for (let x = gridSize; x < canvas.width; x += gridSize) {
      drops.push({ x, y: Math.random() * -200, speed: 1 + Math.random() });
    }

    let pulseY = 0;

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = 'rgba(112, 192, 96, 0.08)';
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Pulse line
      ctx.strokeStyle = 'rgba(112, 192, 96, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, pulseY);
      ctx.lineTo(canvas.width, pulseY);
      ctx.stroke();
      ctx.lineWidth = 1;
      pulseY += 2;
      if (pulseY > canvas.height) pulseY = 0;

      // Matrix drops along grid lines
      ctx.font = '12px monospace';
      for (const drop of drops) {
        const char = chars[Math.floor(Math.random() * chars.length)];

        // Bright head
        ctx.fillStyle = 'rgba(180, 255, 180, 0.9)';
        ctx.fillText(char, drop.x - 6, drop.y);

        // Trail
        for (let t = 1; t < 15; t++) {
          ctx.fillStyle = `rgba(112, 192, 96, ${0.3 - t * 0.02})`;
          ctx.fillText(chars[Math.floor(Math.random() * chars.length)], drop.x - 6, drop.y - t * 12);
        }

        drop.y += drop.speed * 2;
        if (drop.y > canvas.height + 200) {
          drop.y = Math.random() * -100;
        }
      }
    };

    const interval = setInterval(draw, 40);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 36. Cascade Neural (Wavy connected nodes)
function CascadeNeural({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let time = 0;
    const nodes = Array(20).fill(0).map((_, i) => ({
      baseX: (i % 5) * (canvas.width / 4) + canvas.width / 8,
      baseY: Math.floor(i / 5) * (canvas.height / 3) + canvas.height / 6,
      phase: Math.random() * Math.PI * 2
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate wave positions
      const positions = nodes.map(n => ({
        x: n.baseX + Math.sin(time + n.phase) * 30,
        y: n.baseY + Math.sin(time * 0.7 + n.phase) * 20
      }));

      // Draw connections
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const dx = positions[i].x - positions[j].x;
          const dy = positions[i].y - positions[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(positions[i].x, positions[i].y);
            ctx.lineTo(positions[j].x, positions[j].y);
            ctx.strokeStyle = `rgba(112, 192, 96, ${0.3 - dist / 500})`;
            ctx.stroke();
          }
        }
      }

      // Draw nodes with pulse
      for (let i = 0; i < positions.length; i++) {
        const pulse = Math.sin(time * 2 + nodes[i].phase) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(positions[i].x, positions[i].y, 4 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(112, 192, 96, ${0.4 + pulse * 0.3})`;
        ctx.fill();
      }

      time += 0.03;
    };

    const interval = setInterval(draw, 30);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 37. Triple Fusion (Matrix + Grid + Glitch)
function TripleFusion({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = 'アイウエオ01';
    const gridSize = 50;
    const drops = Array(8).fill(0).map(() => ({
      x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
      y: Math.random() * -100
    }));
    let scanY = 0;

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = 'rgba(112, 192, 96, 0.06)';
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Matrix streams on grid
      ctx.font = '14px monospace';
      for (const drop of drops) {
        for (let t = 0; t < 10; t++) {
          const glitchX = Math.random() > 0.95 ? (Math.random() - 0.5) * 8 : 0;
          ctx.fillStyle = t === 0 ? 'rgba(180, 255, 180, 0.9)' : `rgba(112, 192, 96, ${0.4 - t * 0.04})`;
          ctx.fillText(chars[Math.floor(Math.random() * chars.length)], drop.x + glitchX, drop.y - t * 14);
        }
        drop.y += 3;
        if (drop.y > canvas.height + 150) {
          drop.y = -100;
          drop.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
        }
      }

      // Glitch scanline
      ctx.fillStyle = 'rgba(112, 192, 96, 0.15)';
      ctx.fillRect(0, scanY, canvas.width, 3);
      scanY += 4;
      if (scanY > canvas.height) scanY = 0;

      // Random glitch bars
      if (Math.random() > 0.93) {
        const y = Math.random() * canvas.height;
        ctx.fillStyle = `rgba(112, 192, 96, 0.08)`;
        ctx.fillRect(Math.random() * 20 - 10, y, canvas.width, 2 + Math.random() * 8);
      }

      // Scanlines
      for (let y = 0; y < canvas.height; y += 3) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, y, canvas.width, 1);
      }
    };

    const interval = setInterval(draw, 40);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 38. Classic Dense (Denser version of classic matrix)
function ClassicDense({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789';
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0).map(() => Math.random() * canvas.height / fontSize);

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Head glow
        ctx.shadowColor = '#70c060';
        ctx.shadowBlur = 10;
        ctx.fillStyle = 'rgba(200, 255, 200, 0.95)';
        ctx.fillText(char, x, y);
        ctx.shadowBlur = 0;

        // Dense trail
        for (let t = 1; t < 25; t++) {
          const trailY = y - t * fontSize;
          if (trailY > 0) {
            ctx.fillStyle = `rgba(112, 192, 96, ${0.5 - t * 0.02})`;
            ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, trailY);
          }
        }

        drops[i] += 0.4 + Math.random() * 0.2;
        if (drops[i] * fontSize > canvas.height + 300) {
          drops[i] = 0;
        }
      }
    };

    const interval = setInterval(draw, 45);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 39. Cascade Intense (Stronger wave effect)
function CascadeIntense({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = 'アイウエオカキク01';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    let time = 0;

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      // Multiple waves
      for (let wave = 0; wave < 3; wave++) {
        const waveOffset = wave * 80;
        const waveSpeed = 1 + wave * 0.3;

        for (let i = 0; i < columns; i++) {
          const waveY = Math.sin(i * 0.15 + time * 0.05 * waveSpeed) * 40 +
                        Math.sin(i * 0.08 + time * 0.03) * 30;
          const y = ((time * waveSpeed + waveOffset + waveY) % (canvas.height + 100)) - 50;

          const char = chars[Math.floor(Math.random() * chars.length)];
          const brightness = 0.2 + (1 - wave * 0.3) * 0.3;
          ctx.fillStyle = `rgba(112, 192, 96, ${brightness})`;
          ctx.fillText(char, i * fontSize, y);
        }
      }

      time++;
    };

    const interval = setInterval(draw, 40);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 40. Neural Pulse (Neural with pulsing connections)
function NeuralPulse({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let time = 0;
    const nodes = Array(20).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4
    }));

    const pulses = [];

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Occasionally send pulse
      if (Math.random() > 0.97 && pulses.length < 5) {
        const startNode = Math.floor(Math.random() * nodes.length);
        pulses.push({ from: startNode, progress: 0 });
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(112, 192, 96, ${0.15 - dist / 800})`;
            ctx.stroke();
          }
        }
      }

      // Draw and update pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        const fromNode = nodes[pulse.from];

        // Find nearby nodes and draw pulse
        for (let i = 0; i < nodes.length; i++) {
          if (i === pulse.from) continue;
          const dx = fromNode.x - nodes[i].x;
          const dy = fromNode.y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const px = fromNode.x - dx * pulse.progress;
            const py = fromNode.y - dy * pulse.progress;

            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(180, 255, 180, 0.8)';
            ctx.fill();
          }
        }

        pulse.progress += 0.05;
        if (pulse.progress > 1) pulses.splice(p, 1);
      }

      // Draw nodes
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(112, 192, 96, 0.5)';
        ctx.fill();

        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      }

      time += 0.02;
    };

    const interval = setInterval(draw, 30);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 30. Vortex
function Vortex({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let time = 0;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const particles = Array(60).fill(0).map(() => ({
      angle: Math.random() * Math.PI * 2,
      radius: 20 + Math.random() * 80,
      speed: 0.02 + Math.random() * 0.02,
      size: 1 + Math.random() * 2
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw spiral arms
      for (let arm = 0; arm < 3; arm++) {
        ctx.beginPath();
        const armOffset = (arm * Math.PI * 2) / 3 + time;
        for (let r = 10; r < 120; r += 2) {
          const angle = armOffset + r * 0.05;
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;
          if (r === 10) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(112, 192, 96, ${0.1})`;
        ctx.stroke();
      }

      // Draw particles
      for (const p of particles) {
        p.angle += p.speed;
        p.radius -= 0.1;
        if (p.radius < 5) {
          p.radius = 80 + Math.random() * 40;
          p.angle = Math.random() * Math.PI * 2;
        }

        const x = cx + Math.cos(p.angle + time) * p.radius;
        const y = cy + Math.sin(p.angle + time) * p.radius;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(112, 192, 96, ${0.2 + (1 - p.radius / 120) * 0.4})`;
        ctx.fill();
      }

      // Center glow
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
      gradient.addColorStop(0, 'rgba(112, 192, 96, 0.3)');
      gradient.addColorStop(1, 'rgba(112, 192, 96, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fill();

      time += 0.02;
    };

    const interval = setInterval(draw, 30);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 41. Starfield Slow (Gentle drifting stars)
function StarfieldSlow({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const stars = Array(80).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 0.5 + Math.random() * 1.5,
      twinkle: Math.random() * Math.PI * 2,
      speed: 0.1 + Math.random() * 0.2
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        star.twinkle += 0.03;
        const opacity = 0.3 + Math.sin(star.twinkle) * 0.25;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(140, 210, 130, ${opacity})`;
        ctx.fill();

        star.y += star.speed;
        if (star.y > canvas.height + star.size) {
          star.y = -star.size;
          star.x = Math.random() * canvas.width;
        }
      }
    };

    const interval = setInterval(draw, 40);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 42. Constellation Drift (Slowly moving connected stars)
function ConstellationDrift({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const stars = Array(25).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      size: 1 + Math.random() * 1.5,
      pulse: Math.random() * Math.PI * 2
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw faint connections
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(112, 192, 96, ${0.08 - dist / 1500})`;
            ctx.stroke();
          }
        }
      }

      // Draw stars
      for (const star of stars) {
        star.pulse += 0.02;
        const glow = 0.4 + Math.sin(star.pulse) * 0.2;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(150, 220, 140, ${glow})`;
        ctx.fill();

        star.x += star.vx;
        star.y += star.vy;
        if (star.x < 0 || star.x > canvas.width) star.vx *= -1;
        if (star.y < 0 || star.y > canvas.height) star.vy *= -1;
      }
    };

    const interval = setInterval(draw, 40);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 43. Nebula (Soft glowing clouds)
function Nebula({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const clouds = Array(8).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 40 + Math.random() * 60,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      opacity: 0.02 + Math.random() * 0.03
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const cloud of clouds) {
        const gradient = ctx.createRadialGradient(cloud.x, cloud.y, 0, cloud.x, cloud.y, cloud.size);
        gradient.addColorStop(0, `rgba(112, 192, 96, ${cloud.opacity})`);
        gradient.addColorStop(0.5, `rgba(90, 170, 80, ${cloud.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(112, 192, 96, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2);
        ctx.fill();

        cloud.x += cloud.vx;
        cloud.y += cloud.vy;
        if (cloud.x < -cloud.size) cloud.x = canvas.width + cloud.size;
        if (cloud.x > canvas.width + cloud.size) cloud.x = -cloud.size;
        if (cloud.y < -cloud.size) cloud.y = canvas.height + cloud.size;
        if (cloud.y > canvas.height + cloud.size) cloud.y = -cloud.size;
      }
    };

    const interval = setInterval(draw, 40);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 44. Aurora (Northern lights effect)
function Aurora({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let time = 0;

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * 0.3 + i * 15);

        for (let x = 0; x <= canvas.width; x += 5) {
          const y = canvas.height * 0.3 + i * 15 +
            Math.sin(x * 0.01 + time + i) * 30 +
            Math.sin(x * 0.02 + time * 0.7) * 20;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, canvas.height * 0.3, 0, canvas.height);
        gradient.addColorStop(0, `rgba(112, 192, 96, ${0.03 - i * 0.005})`);
        gradient.addColorStop(1, 'rgba(112, 192, 96, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      time += 0.02;
    };

    const interval = setInterval(draw, 40);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 45. Fireflies (Random floating lights)
function Fireflies({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const flies = Array(20).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      targetX: Math.random() * canvas.width,
      targetY: Math.random() * canvas.height,
      size: 1.5 + Math.random() * 1.5,
      glow: Math.random() * Math.PI * 2,
      glowSpeed: 0.03 + Math.random() * 0.03
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const fly of flies) {
        // Move towards target
        fly.x += (fly.targetX - fly.x) * 0.01;
        fly.y += (fly.targetY - fly.y) * 0.01;

        // New target when close
        if (Math.abs(fly.x - fly.targetX) < 10 && Math.abs(fly.y - fly.targetY) < 10) {
          fly.targetX = Math.random() * canvas.width;
          fly.targetY = Math.random() * canvas.height;
        }

        fly.glow += fly.glowSpeed;
        const opacity = 0.2 + Math.sin(fly.glow) * 0.3;
        if (opacity > 0.1) {
          // Glow
          const gradient = ctx.createRadialGradient(fly.x, fly.y, 0, fly.x, fly.y, fly.size * 4);
          gradient.addColorStop(0, `rgba(150, 230, 120, ${opacity * 0.3})`);
          gradient.addColorStop(1, 'rgba(150, 230, 120, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(fly.x, fly.y, fly.size * 4, 0, Math.PI * 2);
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(fly.x, fly.y, fly.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180, 255, 160, ${opacity})`;
          ctx.fill();
        }
      }
    };

    const interval = setInterval(draw, 35);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 46. Grid Pulse (Cyber grid with gentle pulse)
function GridPulse({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const gridSize = 35;
    let time = 0;

    const draw = () => {
      ctx.fillStyle = '#0c0a08';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const pulse = Math.sin(time) * 0.5 + 0.5;

      ctx.strokeStyle = `rgba(112, 192, 96, ${0.08 + pulse * 0.06})`;
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Highlight intersections
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const dist = Math.sqrt(Math.pow(x - canvas.width/2, 2) + Math.pow(y - canvas.height/2, 2));
          const localPulse = Math.sin(time - dist * 0.02) * 0.5 + 0.5;
          if (localPulse > 0.7) {
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(140, 220, 120, ${localPulse * 0.4})`;
            ctx.fill();
          }
        }
      }

      time += 0.05;
    };

    const interval = setInterval(draw, 35);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 47. Shooting Stars
function ShootingStars({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const stars = Array(60).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 0.5 + Math.random() * 1,
      twinkle: Math.random() * Math.PI * 2
    }));

    const shooters = [];

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Background stars
      for (const star of stars) {
        star.twinkle += 0.02;
        const opacity = 0.2 + Math.sin(star.twinkle) * 0.15;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(140, 210, 130, ${opacity})`;
        ctx.fill();
      }

      // Shooting stars
      if (Math.random() > 0.98 && shooters.length < 3) {
        shooters.push({
          x: Math.random() * canvas.width,
          y: 0,
          speed: 5 + Math.random() * 5,
          length: 30 + Math.random() * 40,
          opacity: 0.8
        });
      }

      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i];

        const gradient = ctx.createLinearGradient(
          s.x, s.y,
          s.x - s.length * 0.5, s.y - s.length
        );
        gradient.addColorStop(0, `rgba(180, 255, 160, ${s.opacity})`);
        gradient.addColorStop(1, 'rgba(112, 192, 96, 0)');

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.length * 0.5, s.y - s.length);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        s.x += s.speed * 0.5;
        s.y += s.speed;
        s.opacity *= 0.98;

        if (s.y > canvas.height || s.opacity < 0.05) {
          shooters.splice(i, 1);
        }
      }
    };

    const interval = setInterval(draw, 35);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 48. Electric Field (Subtle electric lines)
function ElectricField({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const lines = [];

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create new line
      if (Math.random() > 0.95 && lines.length < 5) {
        const isHorizontal = Math.random() > 0.5;
        lines.push({
          x: isHorizontal ? 0 : Math.random() * canvas.width,
          y: isHorizontal ? Math.random() * canvas.height : 0,
          isHorizontal,
          progress: 0,
          speed: 3 + Math.random() * 3,
          opacity: 0.4 + Math.random() * 0.3
        });
      }

      for (let i = lines.length - 1; i >= 0; i--) {
        const line = lines[i];

        ctx.beginPath();
        if (line.isHorizontal) {
          ctx.moveTo(0, line.y);
          ctx.lineTo(line.progress, line.y + (Math.random() - 0.5) * 3);
        } else {
          ctx.moveTo(line.x, 0);
          ctx.lineTo(line.x + (Math.random() - 0.5) * 3, line.progress);
        }
        ctx.strokeStyle = `rgba(112, 192, 96, ${line.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        line.progress += line.speed;
        line.opacity *= 0.995;

        const max = line.isHorizontal ? canvas.width : canvas.height;
        if (line.progress > max || line.opacity < 0.05) {
          lines.splice(i, 1);
        }
      }
    };

    const interval = setInterval(draw, 30);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 49. Plasma (Organic flowing shapes)
function Plasma({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let time = 0;

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 3; i++) {
        const cx = canvas.width / 2 + Math.sin(time * 0.5 + i * 2) * 50;
        const cy = canvas.height / 2 + Math.cos(time * 0.4 + i * 2) * 40;
        const size = 40 + Math.sin(time + i) * 20;

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, size);
        gradient.addColorStop(0, `rgba(112, 192, 96, ${0.06 - i * 0.015})`);
        gradient.addColorStop(1, 'rgba(112, 192, 96, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cx, cy, size, 0, Math.PI * 2);
        ctx.fill();
      }

      time += 0.03;
    };

    const interval = setInterval(draw, 40);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 50. Rain Light (Soft glowing rain)
function RainLight({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const drops = Array(40).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: 15 + Math.random() * 25,
      speed: 2 + Math.random() * 3,
      opacity: 0.1 + Math.random() * 0.2
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const drop of drops) {
        const gradient = ctx.createLinearGradient(drop.x, drop.y, drop.x, drop.y + drop.length);
        gradient.addColorStop(0, `rgba(140, 220, 120, ${drop.opacity})`);
        gradient.addColorStop(1, 'rgba(112, 192, 96, 0)');

        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        drop.y += drop.speed;
        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      }
    };

    const interval = setInterval(draw, 35);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// === REPLACED MIXED EFFECTS WITH CLEAN VARIANTS ===

// Old 41. Katakana Hex (Japanese + Hex codes mixed)
function KatakanaHex({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const katakana = 'アイウエオカキクケコサシスセソ';
    const streams = [];
    const maxStreams = 10;

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (streams.length < maxStreams && Math.random() > 0.96) {
        const isHex = Math.random() > 0.5;
        streams.push({
          x: Math.random() * canvas.width,
          y: -20,
          speed: 0.8 + Math.random() * 0.6,
          isHex,
          trail: []
        });
      }

      ctx.font = '12px monospace';
      for (let i = streams.length - 1; i >= 0; i--) {
        const s = streams[i];

        if (Math.random() > 0.6) {
          const text = s.isHex
            ? Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0')
            : katakana[Math.floor(Math.random() * katakana.length)];
          s.trail.push({ y: s.y, text, opacity: 0.7 });
        }

        for (let j = s.trail.length - 1; j >= 0; j--) {
          const t = s.trail[j];
          const color = s.isHex ? `rgba(96, 200, 112, ${t.opacity})` : `rgba(112, 192, 96, ${t.opacity})`;
          ctx.fillStyle = color;
          ctx.fillText(t.text, s.x, t.y);
          t.opacity *= 0.97;
          if (t.opacity < 0.02) s.trail.splice(j, 1);
        }

        s.y += s.speed;
        if (s.y > canvas.height + 50 && s.trail.length === 0) {
          streams.splice(i, 1);
        }
      }
    };

    const interval = setInterval(draw, 35);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 42. Neural Grid (Neural network on cyber grid)
function NeuralGrid({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const gridSize = 35;
    let pulse = 0;

    const nodes = Array(25).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Pulsing grid
      const gridOpacity = 0.08 + Math.sin(pulse) * 0.04;
      ctx.strokeStyle = `rgba(112, 192, 96, ${gridOpacity})`;
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Neural connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(112, 192, 96, ${0.25 - dist / 360})`;
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(140, 220, 120, 0.7)';
        ctx.fill();

        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      }

      pulse += 0.03;
    };

    const interval = setInterval(draw, 30);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 43. Cascade Glitch (Wave pattern with glitch distortion)
function CascadeGlitch({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = 'アイウエオ01カキク';
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    let time = 0;
    let glitchIntensity = 0;

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      // Random glitch intensity spikes
      if (Math.random() > 0.95) glitchIntensity = 0.3 + Math.random() * 0.5;
      glitchIntensity *= 0.95;

      for (let i = 0; i < columns; i++) {
        const waveOffset = Math.sin(i * 0.2 + time * 0.05) * 50;
        let y = ((time * 2 + waveOffset) % (canvas.height + 100)) - 50;

        // Apply glitch offset
        const glitchX = glitchIntensity > 0.1 && Math.random() > 0.8
          ? (Math.random() - 0.5) * 20 * glitchIntensity
          : 0;

        if (Math.random() > 0.92) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillStyle = `rgba(112, 192, 96, ${0.3 + Math.random() * 0.25})`;
          ctx.fillText(char, i * fontSize + glitchX, y);
        }
      }

      // Glitch bars
      if (glitchIntensity > 0.15) {
        for (let g = 0; g < 3; g++) {
          const y = Math.random() * canvas.height;
          ctx.fillStyle = `rgba(112, 192, 96, ${glitchIntensity * 0.3})`;
          ctx.fillRect(0, y, canvas.width, 2 + Math.random() * 6);
        }
      }

      // Scanlines
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        ctx.fillRect(0, y, canvas.width, 1);
      }

      time++;
    };

    const interval = setInterval(draw, 45);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 44. Hex Neural (Hexadecimal streams with neural connections)
function HexNeural({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const hexStreams = [];
    const maxStreams = 8;
    const nodes = Array(15).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Neural connections in background
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(112, 192, 96, ${0.1 - dist / 1000})`;
            ctx.stroke();
          }
        }
        nodes[i].x += nodes[i].vx;
        nodes[i].y += nodes[i].vy;
        if (nodes[i].x < 0 || nodes[i].x > canvas.width) nodes[i].vx *= -1;
        if (nodes[i].y < 0 || nodes[i].y > canvas.height) nodes[i].vy *= -1;
      }

      // Hex streams
      if (hexStreams.length < maxStreams && Math.random() > 0.97) {
        hexStreams.push({
          x: Math.random() * (canvas.width - 30),
          y: -15,
          speed: 0.6 + Math.random() * 0.4,
          values: []
        });
      }

      ctx.font = '10px monospace';
      for (let i = hexStreams.length - 1; i >= 0; i--) {
        const s = hexStreams[i];

        if (Math.random() > 0.7 && s.y < canvas.height) {
          const hex = Math.floor(Math.random() * 65536).toString(16).toUpperCase().padStart(4, '0');
          s.values.push({ y: s.y, text: hex, opacity: 0.6 });
        }

        for (let j = s.values.length - 1; j >= 0; j--) {
          const v = s.values[j];
          ctx.fillStyle = `rgba(96, 210, 96, ${v.opacity})`;
          ctx.fillText(v.text, s.x, v.y);
          v.opacity *= 0.97;
          if (v.opacity < 0.02) s.values.splice(j, 1);
        }

        s.y += s.speed;
        if (s.y > canvas.height + 50 && s.values.length === 0) {
          hexStreams.splice(i, 1);
        }
      }
    };

    const interval = setInterval(draw, 35);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 45. Grid Glitch Intense (Cyber grid with heavy glitch)
function GridGlitchIntense({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const gridSize = 30;
    let offset = 0;
    let glitchFrame = 0;

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const isGlitching = Math.random() > 0.85;
      if (isGlitching) glitchFrame = 5 + Math.floor(Math.random() * 10);

      // Distorted grid
      ctx.strokeStyle = `rgba(112, 192, 96, ${0.15 + (glitchFrame > 0 ? 0.1 : 0)})`;
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += gridSize) {
        const distort = glitchFrame > 0 ? (Math.random() - 0.5) * 15 : 0;
        ctx.beginPath();
        ctx.moveTo(x + distort, 0);
        ctx.lineTo(x + distort, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        const distort = glitchFrame > 0 ? (Math.random() - 0.5) * 10 : 0;
        ctx.beginPath();
        ctx.moveTo(0, y + distort);
        ctx.lineTo(canvas.width, y + distort);
        ctx.stroke();
      }

      // Moving pulse
      ctx.strokeStyle = 'rgba(140, 230, 120, 0.5)';
      ctx.lineWidth = 2;
      const pulseY = (offset % canvas.height);
      ctx.beginPath();
      ctx.moveTo(0, pulseY);
      ctx.lineTo(canvas.width, pulseY);
      ctx.stroke();

      // Glitch blocks
      if (glitchFrame > 0) {
        for (let g = 0; g < 5; g++) {
          const gx = Math.random() * canvas.width;
          const gy = Math.random() * canvas.height;
          const gw = 20 + Math.random() * 60;
          const gh = 5 + Math.random() * 20;
          ctx.fillStyle = `rgba(112, 192, 96, ${0.1 + Math.random() * 0.15})`;
          ctx.fillRect(gx, gy, gw, gh);
        }
        glitchFrame--;
      }

      // Scanlines
      for (let y = 0; y < canvas.height; y += 3) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, y, canvas.width, 1);
      }

      offset += 2;
    };

    const interval = setInterval(draw, 40);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 46. Katakana Cascade (Japanese chars with wave motion)
function KatakanaCascade({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴ';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    let time = 0;

    const streams = Array(columns).fill(0).map((_, i) => ({
      col: i,
      phase: Math.random() * Math.PI * 2,
      speed: 0.8 + Math.random() * 0.4,
      active: Math.random() > 0.6
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (const stream of streams) {
        if (!stream.active) {
          if (Math.random() > 0.995) stream.active = true;
          continue;
        }

        const waveY = Math.sin(stream.col * 0.15 + time * 0.04) * 60 +
                     Math.sin(stream.col * 0.08 + time * 0.02) * 30;
        const baseY = ((time * stream.speed * 2 + stream.phase * 50 + waveY) % (canvas.height + 150)) - 75;

        for (let t = 0; t < 12; t++) {
          const y = baseY - t * fontSize;
          if (y > -fontSize && y < canvas.height + fontSize) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const opacity = t === 0 ? 0.85 : 0.5 - t * 0.04;
            ctx.fillStyle = t === 0 ? 'rgba(180, 255, 180, 0.9)' : `rgba(112, 192, 96, ${Math.max(opacity, 0.05)})`;
            ctx.fillText(char, stream.col * fontSize, y);
          }
        }
      }

      time++;
    };

    const interval = setInterval(draw, 45);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 47. Neural Cascade (Nodes that flow like waves)
function NeuralCascade({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let time = 0;
    const nodes = Array(40).fill(0).map(() => ({
      baseX: Math.random() * canvas.width,
      baseY: Math.random() * canvas.height,
      phase: Math.random() * Math.PI * 2,
      amplitude: 20 + Math.random() * 30
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate current positions with wave motion
      const currentNodes = nodes.map(n => ({
        x: n.baseX + Math.sin(time * 0.03 + n.phase) * n.amplitude * 0.5,
        y: n.baseY + Math.sin(time * 0.02 + n.phase * 1.5) * n.amplitude
      }));

      // Draw connections
      for (let i = 0; i < currentNodes.length; i++) {
        for (let j = i + 1; j < currentNodes.length; j++) {
          const dx = currentNodes[i].x - currentNodes[j].x;
          const dy = currentNodes[i].y - currentNodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(currentNodes[i].x, currentNodes[i].y);
            ctx.lineTo(currentNodes[j].x, currentNodes[j].y);
            ctx.strokeStyle = `rgba(112, 192, 96, ${0.25 - dist / 320})`;
            ctx.stroke();
          }
        }
      }

      // Draw nodes with glow
      for (const node of currentNodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(150, 230, 130, 0.7)';
        ctx.fill();
      }

      time++;
    };

    const interval = setInterval(draw, 30);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 48. Classic Hex Mix (Matrix rain mixed with hex codes)
function ClassicHexMix({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const katakana = 'アイウエオカキクケコサシスセソタチツテト';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0).map(() => ({
      y: Math.random() * -100,
      isHex: Math.random() > 0.7,
      speed: 0.3 + Math.random() * 0.2
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        if (Math.random() > 0.97) {
          const x = i * fontSize;
          const y = drops[i].y * fontSize;

          ctx.font = drops[i].isHex ? '10px monospace' : `${fontSize}px monospace`;

          if (drops[i].isHex) {
            const hex = Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0');
            ctx.fillStyle = 'rgba(96, 220, 96, 0.8)';
            ctx.fillText(hex, x, y);
          } else {
            const char = katakana[Math.floor(Math.random() * katakana.length)];
            ctx.fillStyle = 'rgba(180, 255, 180, 0.9)';
            ctx.fillText(char, x, y);
          }

          // Trail
          for (let t = 1; t < 15; t++) {
            const trailY = y - t * fontSize;
            if (trailY > 0) {
              if (drops[i].isHex) {
                const hex = Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0');
                ctx.fillStyle = `rgba(96, 200, 96, ${0.35 - t * 0.02})`;
                ctx.fillText(hex, x, trailY);
              } else {
                const trailChar = katakana[Math.floor(Math.random() * katakana.length)];
                ctx.fillStyle = `rgba(112, 192, 96, ${0.4 - t * 0.025})`;
                ctx.fillText(trailChar, x, trailY);
              }
            }
          }
        }

        drops[i].y += drops[i].speed;
        if (drops[i].y * fontSize > canvas.height && Math.random() > 0.97) {
          drops[i].y = 0;
          drops[i].isHex = Math.random() > 0.7;
        }
      }
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 49. Grid Neural Glitch (Triple combo: grid + neural + glitch)
function GridNeuralGlitch({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const gridSize = 40;
    let glitchTimer = 0;
    const nodes = Array(18).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const isGlitching = glitchTimer > 0 || Math.random() > 0.92;
      if (isGlitching && glitchTimer === 0) glitchTimer = 8 + Math.floor(Math.random() * 12);

      // Glitchy grid
      const gridDistort = glitchTimer > 0 ? (Math.random() - 0.5) * 8 : 0;
      ctx.strokeStyle = `rgba(112, 192, 96, ${0.1 + (glitchTimer > 0 ? 0.05 : 0)})`;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x + gridDistort, 0);
        ctx.lineTo(x - gridDistort, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + gridDistort);
        ctx.lineTo(canvas.width, y - gridDistort);
        ctx.stroke();
      }

      // Neural connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const glitchOffset = glitchTimer > 0 ? (Math.random() - 0.5) * 5 : 0;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x + glitchOffset, nodes[i].y);
            ctx.lineTo(nodes[j].x - glitchOffset, nodes[j].y);
            ctx.strokeStyle = `rgba(112, 192, 96, ${0.2 - dist / 500})`;
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(140, 230, 120, 0.6)';
        ctx.fill();
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      }

      // Glitch effects
      if (glitchTimer > 0) {
        for (let g = 0; g < 3; g++) {
          ctx.fillStyle = `rgba(112, 192, 96, ${0.08 + Math.random() * 0.1})`;
          ctx.fillRect(Math.random() * canvas.width * 0.5, Math.random() * canvas.height,
                       30 + Math.random() * 80, 2 + Math.random() * 8);
        }
        glitchTimer--;
      }

      // Scanlines
      for (let y = 0; y < canvas.height; y += 3) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
        ctx.fillRect(0, y, canvas.width, 1);
      }
    };

    const interval = setInterval(draw, 35);
    return () => clearInterval(interval);
  }, [canvasRef]);
  return null;
}

// 50. Cyber Katakana (Japanese on Tron-style grid)
function CyberKatakana({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ';
    const gridSize = 45;
    let pulseY = 0;
    const streams = Array(Math.floor(canvas.width / gridSize)).fill(0).map((_, i) => ({
      x: i * gridSize + gridSize / 2,
      y: Math.random() * -200,
      speed: 1.5 + Math.random() * 0.8,
      length: 6 + Math.floor(Math.random() * 8)
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 10, 8, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = 'rgba(112, 192, 96, 0.12)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Pulse line
      ctx.strokeStyle = 'rgba(112, 192, 96, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, pulseY);
      ctx.lineTo(canvas.width, pulseY);
      ctx.stroke();
      pulseY = (pulseY + 1.5) % canvas.height;

      // Katakana streams on grid lines
      ctx.font = '14px monospace';
      for (const stream of streams) {
        for (let t = 0; t < stream.length; t++) {
          const y = stream.y - t * 18;
          if (y > -18 && y < canvas.height + 18) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillStyle = t === 0 ? 'rgba(200, 255, 200, 0.9)' : `rgba(112, 192, 96, ${0.5 - t * 0.06})`;
            ctx.fillText(char, stream.x - 7, y);
          }
        }
        stream.y += stream.speed;
        if (stream.y > canvas.height + stream.length * 18) {
          stream.y = -stream.length * 18;
        }
      }
    };

    const interval = setInterval(draw, 40);
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
          <h1 className="text-2xl font-mono text-[#d0c8b8]">matrix backgrounds</h1>
          <Link href="/" className="text-[#70c060] hover:text-[#90e080] font-mono text-sm">
            &larr; back
          </Link>
        </div>

        <p className="text-[#a09080] font-mono text-sm mb-8">
          50 cyberpunk background variations (favorites: 1, 4, 7, 8, 11, 12, 15 + mixes):
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          <EffectDemo title="1. classic" description="traditional matrix rain" Effect={MatrixClassic} />
          <EffectDemo title="2. sparse" description="minimal streams" Effect={MatrixSparse} />
          <EffectDemo title="3. glow" description="with bloom effect" Effect={MatrixGlow} />
          <EffectDemo title="4. cascade" description="wave pattern" Effect={MatrixCascade} />
          <EffectDemo title="5. binary" description="only 0 and 1" Effect={MatrixBinary} />
          <EffectDemo title="6. depth" description="multiple layers" Effect={MatrixDepth} />
          <EffectDemo title="7. katakana" description="pure japanese" Effect={MatrixKatakana} />
          <EffectDemo title="8. hex" description="hexadecimal codes" Effect={MatrixHex} />
          <EffectDemo title="9. code" description="programming symbols" Effect={MatrixCode} />
          <EffectDemo title="10. minimal" description="super subtle" Effect={MatrixMinimal} />
          <EffectDemo title="11. neural" description="connected nodes" Effect={NeuralNetwork} />
          <EffectDemo title="12. cyber grid" description="tron style" Effect={CyberGrid} />
          <EffectDemo title="13. constellation" description="pulsing particles" Effect={ParticleConstellation} />
          <EffectDemo title="14. circuit" description="pcb traces" Effect={CircuitBoard} />
          <EffectDemo title="15. glitch" description="scanlines & noise" Effect={GlitchEffect} />
          <EffectDemo title="16. blockchain" description="connected blocks" Effect={BlockchainNodes} />
          <EffectDemo title="17. waveform" description="audio visualizer" Effect={Waveform} />
          <EffectDemo title="18. starfield" description="hyperspace travel" Effect={Starfield} />
          <EffectDemo title="19. hex grid" description="honeycomb pattern" Effect={HexGrid} />
          <EffectDemo title="20. smoke" description="rising fog" Effect={SmokeFog} />
          <EffectDemo title="21. dna helix" description="rotating double helix" Effect={DNAHelix} />
          <EffectDemo title="22. radar" description="sweeping scan" Effect={RadarScan} />
          <EffectDemo title="23. data stream" description="horizontal packets" Effect={DataStream} />
          <EffectDemo title="24. pulse" description="expanding rings" Effect={PulseRings} />
          <EffectDemo title="25. fractal" description="animated tree" Effect={FractalTree} />
          <EffectDemo title="26. cyber rain" description="neon rain drops" Effect={CyberRain} />
          <EffectDemo title="27. lightning" description="electric bolts" Effect={Lightning} />
          <EffectDemo title="28. hologram" description="vhs distortion" Effect={Hologram} />
          <EffectDemo title="29. perspective" description="3d grid floor" Effect={PerspectiveGrid} />
          <EffectDemo title="30. vortex" description="spiral tunnel" Effect={Vortex} />
          <EffectDemo title="31. matrix+neural" description="rain with nodes" Effect={MatrixNeural} />
          <EffectDemo title="32. glitch matrix" description="distorted rain" Effect={GlitchMatrix} />
          <EffectDemo title="33. grid cascade" description="wavy grid" Effect={GridCascade} />
          <EffectDemo title="34. neural glitch" description="glitchy network" Effect={NeuralGlitch} />
          <EffectDemo title="35. grid matrix" description="rain on grid" Effect={GridMatrix} />
          <EffectDemo title="36. cascade neural" description="wavy nodes" Effect={CascadeNeural} />
          <EffectDemo title="37. triple fusion" description="matrix+grid+glitch" Effect={TripleFusion} />
          <EffectDemo title="38. classic dense" description="intense matrix" Effect={ClassicDense} />
          <EffectDemo title="39. cascade intense" description="multi-wave" Effect={CascadeIntense} />
          <EffectDemo title="40. neural pulse" description="pulsing network" Effect={NeuralPulse} />
          <EffectDemo title="41. starfield slow" description="gentle drifting stars" Effect={StarfieldSlow} />
          <EffectDemo title="42. constellation" description="connected drifting stars" Effect={ConstellationDrift} />
          <EffectDemo title="43. nebula" description="soft glowing clouds" Effect={Nebula} />
          <EffectDemo title="44. aurora" description="northern lights" Effect={Aurora} />
          <EffectDemo title="45. fireflies" description="floating lights" Effect={Fireflies} />
          <EffectDemo title="46. grid pulse" description="pulsing cyber grid" Effect={GridPulse} />
          <EffectDemo title="47. shooting stars" description="starfield with streaks" Effect={ShootingStars} />
          <EffectDemo title="48. electric field" description="subtle electric lines" Effect={ElectricField} />
          <EffectDemo title="49. plasma" description="organic flowing shapes" Effect={Plasma} />
          <EffectDemo title="50. rain light" description="soft glowing rain" Effect={RainLight} />
        </div>
      </div>
    </div>
  );
}
