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

    let offset = 0;

    const draw = () => {
      // Horizon point much lower (50% instead of 30%)
      const horizon = canvas.height * 0.5;
      const vanishX = canvas.width / 2;

      // Clear canvas
      ctx.fillStyle = 'rgba(16, 12, 8, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Vertical lines converging to horizon - subtle
      ctx.strokeStyle = 'rgba(112, 192, 96, 0.12)';
      ctx.lineWidth = 1;

      for (let x = -canvas.width; x < canvas.width * 2; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, canvas.height);
        ctx.lineTo(vanishX, horizon);
        ctx.stroke();
      }

      // Horizontal lines with perspective - moving
      for (let i = 0; i < 20; i++) {
        const t = (i + offset) / 20;
        const y = horizon + (canvas.height - horizon) * Math.pow(t, 1.5);
        const spread = t * canvas.width;

        ctx.beginPath();
        ctx.moveTo(vanishX - spread, y);
        ctx.lineTo(vanishX + spread, y);
        ctx.strokeStyle = `rgba(112, 192, 96, ${0.04 + t * 0.1})`;
        ctx.stroke();
      }

      // No horizon glow - keeping it clean

      offset += 0.015;
      if (offset >= 1) offset = 0;

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
      style={{ opacity: 0.7 }}
    />
  );
}
