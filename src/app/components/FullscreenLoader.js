'use client';

import { useState, useEffect } from 'react';

export default function FullscreenLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [binaryChars, setBinaryChars] = useState([]);

  // Only mount the component, don't show loader initially
  useEffect(() => {
    setIsMounted(true);
    
    // Generate Japanese character pattern
    const japaneseChars = ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト'];
    const pattern = Array(20).fill().map((_, i) => ({
      char: japaneseChars[Math.floor(Math.random() * japaneseChars.length)],
      left: i * 5,
      delay: i * 0.1
    }));
    setBinaryChars(pattern);
  }, []);

  // Show loader when navigation links are clicked
  useEffect(() => {
    if (!isMounted) return;

    const handleLinkClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.href && target.href.includes(window.location.origin)) {
        e.preventDefault(); // Prevent immediate navigation
        setIsLoading(true);
        
        // Navigate after loader duration
        setTimeout(() => {
          window.location.href = target.href;
        }, 1000);
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, [isMounted]);

  // Animate binary characters
  useEffect(() => {
    if (!isLoading || !isMounted) return;

    const interval = setInterval(() => {
      const japaneseChars = ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト'];
      setBinaryChars(prev => prev.map(item => ({
        ...item,
        char: japaneseChars[Math.floor(Math.random() * japaneseChars.length)]
      })));
    }, 200);

    return () => clearInterval(interval);
  }, [isLoading, isMounted]);

  // Don't render anything on server side
  if (!isMounted || !isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black z-[99999] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center h-48 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          {binaryChars.map((item, i) => (
            <div key={i} 
                 className="absolute top-0 text-[#c0b8a8] font-mono text-lg animate-pulse"
                 style={{ 
                   left: `${item.left}%`,
                   animationDelay: `${item.delay}s`
                 }}>
              {item.char}
            </div>
          ))}
        </div>
        <div className="relative z-10 bg-black/60 px-6 py-3 border border-gray-500">
          <div className="text-[#e8e0d5] font-mono text-lg tracking-wider">
            <span className="animate-pulse">DECRYPTING DATA...</span>
          </div>
        </div>
      </div>
    </div>
  );
}