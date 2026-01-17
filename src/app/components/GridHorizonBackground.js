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
    let phase = 0; // 0 = normal grid, 1 = falling/cliff transition
    let transitionProgress = 0;
    const normalDuration = 800; // frames before cliff
    const fallDuration = 200; // frames for fall animation
    let frameCount = 0;

    const draw = () => {
      const horizon = canvas.height * 0.5;
      const vanishX = canvas.width / 2;

      // Clear canvas
      ctx.fillStyle = 'rgba(16, 12, 8, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Phase management
      frameCount++;
      if (phase === 0 && frameCount > normalDuration) {
        phase = 1;
        transitionProgress = 0;
      } else if (phase === 1) {
        transitionProgress += 1 / fallDuration;
        if (transitionProgress >= 1) {
          phase = 0;
          frameCount = 0;
          transitionProgress = 0;
        }
      }

      // Calculate cliff effect - horizon drops down during fall
      const cliffDrop = phase === 1 ? Math.pow(transitionProgress, 2) * canvas.height * 0.8 : 0;
      const currentHorizon = horizon + cliffDrop;

      // Vertical lines converging to horizon
      const verticalOpacity = phase === 1 ? 0.12 * (1 - transitionProgress * 0.7) : 0.12;
      ctx.strokeStyle = `rgba(112, 192, 96, ${verticalOpacity})`;
      ctx.lineWidth = 1;

      for (let x = -canvas.width * 2; x < canvas.width * 3; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, canvas.height);
        ctx.lineTo(vanishX, currentHorizon);
        ctx.stroke();
      }

      // Horizontal lines with perspective - moving, wider spread
      for (let i = 0; i < 20; i++) {
        const t = (i + offset) / 20;
        let y = currentHorizon + (canvas.height - currentHorizon) * Math.pow(t, 1.5);

        // During fall, lines accelerate downward
        if (phase === 1) {
          const fallAccel = Math.pow(transitionProgress, 1.5) * (1 - t) * 200;
          y += fallAccel;
        }

        const spread = t * canvas.width * 1.5;

        // Fade out lines during fall
        const lineOpacity = phase === 1
          ? (0.04 + t * 0.12) * (1 - transitionProgress * 0.8)
          : 0.04 + t * 0.12;

        if (y < canvas.height + 50) {
          ctx.beginPath();
          ctx.moveTo(vanishX - spread, y);
          ctx.lineTo(vanishX + spread, y);
          ctx.strokeStyle = `rgba(112, 192, 96, ${lineOpacity})`;
          ctx.stroke();
        }
      }

      // Halo at vanishing point - follows horizon down
      const haloOpacity = phase === 1 ? 0.12 * (1 - transitionProgress) : 0.12;
      const gradient = ctx.createRadialGradient(vanishX, currentHorizon, 0, vanishX, currentHorizon, 120);
      gradient.addColorStop(0, `rgba(112, 192, 96, ${haloOpacity})`);
      gradient.addColorStop(1, 'rgba(112, 192, 96, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Edge glow during fall - like water going over edge
      if (phase === 1 && transitionProgress > 0.1) {
        const edgeGlow = ctx.createLinearGradient(0, horizon - 20, 0, horizon + 40);
        edgeGlow.addColorStop(0, 'rgba(112, 192, 96, 0)');
        edgeGlow.addColorStop(0.5, `rgba(112, 192, 96, ${0.08 * transitionProgress})`);
        edgeGlow.addColorStop(1, 'rgba(112, 192, 96, 0)');
        ctx.fillStyle = edgeGlow;
        ctx.fillRect(0, horizon - 20, canvas.width, 60);
      }

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
      style={{ opacity: 0.5 }}
    />
  );
}
