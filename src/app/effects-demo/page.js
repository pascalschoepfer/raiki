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
          10 matrix-style background variations:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        </div>
      </div>
    </div>
  );
}
