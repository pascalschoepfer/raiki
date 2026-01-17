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
    const cliffPosition = 0.75; // Cliff at 3/4 of the way

    const draw = () => {
      const horizon = canvas.height * 0.5;
      const vanishX = canvas.width / 2;
      const cliffY = horizon + (canvas.height - horizon) * cliffPosition;

      // Clear canvas
      ctx.fillStyle = 'rgba(16, 12, 8, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Vertical lines converging to horizon (only above cliff)
      ctx.strokeStyle = 'rgba(112, 192, 96, 0.12)';
      ctx.lineWidth = 1;

      for (let x = -canvas.width * 2; x < canvas.width * 3; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, cliffY);
        // Calculate where line intersects with cliff edge
        const t = (cliffY - horizon) / (canvas.height - horizon);
        const spreadAtCliff = t * canvas.width * 1.5;
        const ratio = (x - vanishX) / (canvas.width * 1.5);
        const cliffX = vanishX + ratio * spreadAtCliff * 2;
        ctx.lineTo(vanishX, horizon);
        ctx.stroke();
      }

      // Horizontal lines with perspective - flowing towards viewer then falling
      for (let i = 0; i < 25; i++) {
        const t = (i + offset) / 25;
        const y = horizon + (canvas.height - horizon) * Math.pow(t, 1.5);
        const spread = t * canvas.width * 1.5;
        const lineOpacity = 0.04 + t * 0.12;

        if (t < cliffPosition) {
          // Normal horizontal lines above cliff
          ctx.beginPath();
          ctx.moveTo(vanishX - spread, y);
          ctx.lineTo(vanishX + spread, y);
          ctx.strokeStyle = `rgba(112, 192, 96, ${lineOpacity})`;
          ctx.stroke();
        } else {
          // Lines that have passed the cliff - fall downward
          const fallProgress = (t - cliffPosition) / (1 - cliffPosition);
          const fallDistance = Math.pow(fallProgress, 1.5) * 150;
          const cliffSpread = cliffPosition * canvas.width * 1.5;
          const fallingY = cliffY + fallDistance;

          // Lines fall and fade out
          const fadeOpacity = lineOpacity * (1 - fallProgress * 0.8);

          if (fallingY < canvas.height + 50) {
            ctx.beginPath();
            ctx.moveTo(vanishX - cliffSpread, fallingY);
            ctx.lineTo(vanishX + cliffSpread, fallingY);
            ctx.strokeStyle = `rgba(112, 192, 96, ${fadeOpacity})`;
            ctx.stroke();
          }
        }
      }

      // Cliff edge glow - permanent waterfall edge effect
      const edgeGlow = ctx.createLinearGradient(0, cliffY - 15, 0, cliffY + 30);
      edgeGlow.addColorStop(0, 'rgba(112, 192, 96, 0)');
      edgeGlow.addColorStop(0.4, 'rgba(112, 192, 96, 0.06)');
      edgeGlow.addColorStop(0.6, 'rgba(112, 192, 96, 0.08)');
      edgeGlow.addColorStop(1, 'rgba(112, 192, 96, 0)');
      ctx.fillStyle = edgeGlow;
      ctx.fillRect(0, cliffY - 15, canvas.width, 45);

      // Halo at vanishing point
      const gradient = ctx.createRadialGradient(vanishX, horizon, 0, vanishX, horizon, 120);
      gradient.addColorStop(0, 'rgba(112, 192, 96, 0.12)');
      gradient.addColorStop(1, 'rgba(112, 192, 96, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      offset += 0.012;
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
      style={{ opacity: 0.5 }}
    />
  );
}
