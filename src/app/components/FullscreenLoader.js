'use client';

import { useState, useEffect, useRef } from 'react';

export default function FullscreenLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);

    // Check if we just navigated (show fade out)
    if (sessionStorage.getItem('starfield-nav')) {
      sessionStorage.removeItem('starfield-nav');
      setIsFadingOut(true);
      setOpacity(1);

      // Start fade out after stars show briefly
      setTimeout(() => setOpacity(0), 1000);

      // Hide completely
      setTimeout(() => setIsFadingOut(false), 1500);
    }
  }, []);

  // Show loader when navigation links are clicked
  useEffect(() => {
    if (!isMounted) return;

    const handleLinkClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.href && target.href.includes(window.location.origin)) {
        e.preventDefault();
        setIsLoading(true);
        setOpacity(0);

        // Fade in
        setTimeout(() => setOpacity(1), 50);

        // Navigate while visible, set flag for fade out on new page
        setTimeout(() => {
          sessionStorage.setItem('starfield-nav', '1');
          window.location.href = target.href;
        }, 1200);
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, [isMounted]);

  // Starfield animation
  useEffect(() => {
    if ((!isLoading && !isFadingOut) || !isMounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array(150).fill(0).map(() => ({
      x: Math.random() * canvas.width - canvas.width / 2,
      y: Math.random() * canvas.height - canvas.height / 2,
      z: Math.random() * canvas.width
    }));

    let animationId;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      for (const star of stars) {
        star.z -= 4;
        if (star.z <= 0) {
          star.x = Math.random() * canvas.width - cx;
          star.y = Math.random() * canvas.height - cy;
          star.z = canvas.width;
        }

        const sx = (star.x / star.z) * 300 + cx;
        const sy = (star.y / star.z) * 300 + cy;
        const size = (1 - star.z / canvas.width) * 4;
        const starOpacity = (1 - star.z / canvas.width) * 0.9;

        // Draw star trail
        const prevZ = star.z + 4;
        const prevSx = (star.x / prevZ) * 300 + cx;
        const prevSy = (star.y / prevZ) * 300 + cy;

        ctx.beginPath();
        ctx.moveTo(prevSx, prevSy);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = `rgba(112, 192, 96, ${starOpacity * 0.5})`;
        ctx.lineWidth = size * 0.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(112, 192, 96, ${starOpacity})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isLoading, isFadingOut, isMounted]);

  if (!isMounted || (!isLoading && !isFadingOut)) return null;

  return (
    <div
      className="fixed inset-0 bg-black z-[99999] flex items-center justify-center"
      style={{
        opacity: opacity,
        transition: 'opacity 500ms ease-in-out'
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <div className="relative z-10 bg-black/60 px-6 py-3 border border-[#70c060]/30">
        <div className="text-[#e8e0d5] font-mono text-lg tracking-wider">
          <span className="animate-pulse">WARPING...</span>
        </div>
      </div>
    </div>
  );
}
