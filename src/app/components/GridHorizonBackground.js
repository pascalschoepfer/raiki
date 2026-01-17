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
    const cliffPosition = 0.65; // Cliff closer to viewer

    const draw = () => {
      const horizon = canvas.height * 0.5;
      const vanishX = canvas.width / 2;
      const cliffY = horizon + (canvas.height - horizon) * cliffPosition;
      const cliffSpread = canvas.width * 2; // Full width coverage

      // Clear canvas
      ctx.fillStyle = 'rgba(16, 12, 8, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 1;

      // Vertical lines - converge to horizon, then fall straight down after cliff
      const numLines = 60;
      for (let i = 0; i < numLines; i++) {
        const ratio = (i - numLines / 2) / (numLines / 2); // -1 to 1
        const xAtCliff = vanishX + ratio * cliffSpread;

        ctx.strokeStyle = 'rgba(112, 192, 96, 0.12)';

        // Part 1: From horizon to cliff edge (converging)
        ctx.beginPath();
        ctx.moveTo(vanishX, horizon);
        ctx.lineTo(xAtCliff, cliffY);
        ctx.stroke();

        // Part 2: From cliff edge falling straight down
        ctx.beginPath();
        ctx.moveTo(xAtCliff, cliffY);
        ctx.lineTo(xAtCliff, canvas.height + 50);
        ctx.stroke();
      }

      // Horizontal lines with perspective - flowing towards viewer then falling
      const numHorizontalLines = 40;
      for (let i = 0; i < numHorizontalLines; i++) {
        const t = (i + offset) / numHorizontalLines;
        const lineOpacity = 0.04 + t * 0.12;

        if (t < cliffPosition) {
          // Normal horizontal lines above cliff - use perspective
          const y = horizon + (cliffY - horizon) * (t / cliffPosition);
          const spread = (t / cliffPosition) * cliffSpread;

          ctx.beginPath();
          ctx.moveTo(vanishX - spread, y);
          ctx.lineTo(vanishX + spread, y);
          ctx.strokeStyle = `rgba(112, 192, 96, ${lineOpacity})`;
          ctx.stroke();
        } else {
          // Lines that have passed the cliff - fall downward
          const fallProgress = (t - cliffPosition) / (1 - cliffPosition);
          const fallDistance = fallProgress * (canvas.height - cliffY + 50);
          const fallingY = cliffY + fallDistance;

          // Lines fall and fade out
          const fadeOpacity = lineOpacity * (1 - fallProgress * 0.7);

          if (fallingY < canvas.height + 50) {
            ctx.beginPath();
            ctx.moveTo(vanishX - cliffSpread, fallingY);
            ctx.lineTo(vanishX + cliffSpread, fallingY);
            ctx.strokeStyle = `rgba(112, 192, 96, ${fadeOpacity})`;
            ctx.stroke();
          }
        }
      }

      // Halo at vanishing point - clipped to triangular area matching grid angle
      ctx.save();
      ctx.beginPath();
      // Triangle from top corners down to vanishing point at horizon
      ctx.moveTo(0, 0);
      ctx.lineTo(canvas.width, 0);
      ctx.lineTo(vanishX, horizon);
      ctx.closePath();
      ctx.clip();
      const gradient = ctx.createRadialGradient(vanishX, horizon, 0, vanishX, horizon, 200);
      gradient.addColorStop(0, 'rgba(112, 192, 96, 0.2)');
      gradient.addColorStop(0.5, 'rgba(112, 192, 96, 0.08)');
      gradient.addColorStop(1, 'rgba(112, 192, 96, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, horizon);
      ctx.restore();

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
