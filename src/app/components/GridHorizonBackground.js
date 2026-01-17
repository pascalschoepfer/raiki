'use client';

import { useEffect, useRef } from 'react';

export default function GridHorizonBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const horizon = canvas.height * 0.35;
    let offset = 0;

    const draw = () => {
      const cx = canvas.width / 2;

      // Clear with very subtle fade
      ctx.fillStyle = 'rgba(16, 12, 8, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Very subtle grid lines
      ctx.strokeStyle = 'rgba(112, 192, 96, 0.08)';
      ctx.lineWidth = 1;

      // Converging vertical lines to horizon
      for (let i = -20; i <= 20; i++) {
        const x = cx + i * 80;
        ctx.beginPath();
        ctx.moveTo(x, canvas.height);
        ctx.lineTo(cx, horizon);
        ctx.stroke();
      }

      // Horizontal lines with perspective - moving towards viewer
      for (let i = 0; i < 20; i++) {
        const t = ((i + offset) % 20) / 20;
        const y = horizon + (canvas.height - horizon) * Math.pow(t, 1.4);
        const spread = (y - horizon) / (canvas.height - horizon) * canvas.width * 1.2;

        const lineOpacity = 0.03 + t * 0.07;
        ctx.strokeStyle = `rgba(112, 192, 96, ${lineOpacity})`;
        ctx.beginPath();
        ctx.moveTo(cx - spread, y);
        ctx.lineTo(cx + spread, y);
        ctx.stroke();
      }

      // Subtle horizon glow
      const gradient = ctx.createLinearGradient(0, horizon - 40, 0, horizon + 60);
      gradient.addColorStop(0, 'rgba(112, 192, 96, 0)');
      gradient.addColorStop(0.5, 'rgba(112, 192, 96, 0.025)');
      gradient.addColorStop(1, 'rgba(112, 192, 96, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, horizon - 40, canvas.width, 100);

      offset += 0.015;
      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
