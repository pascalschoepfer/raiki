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
    const cliffPosition = 0.5; // Cliff at halfway - further back

    const draw = () => {
      const horizon = canvas.height * 0.5;
      const vanishX = canvas.width / 2;
      const cliffY = horizon + (canvas.height - horizon) * cliffPosition;
      const cliffSpread = cliffPosition * canvas.width * 1.5;

      // Clear canvas
      ctx.fillStyle = 'rgba(16, 12, 8, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 1;

      // Vertical lines - converge to horizon, then fall straight down after cliff
      for (let i = 0; i < 40; i++) {
        const ratio = (i - 20) / 20; // -1 to 1
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
      for (let i = 0; i < 30; i++) {
        const t = (i + offset) / 30;
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
          const fallDistance = Math.pow(fallProgress, 1.5) * 200;
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
