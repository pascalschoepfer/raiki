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
          20 cyberpunk background variations:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
        </div>
      </div>
    </div>
  );
}
