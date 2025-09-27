import React, { useState } from 'react';

/**
 * MatrixText Component
 * 
 * Creates a simple matrix effect where characters scramble and then reveal the final text.
 * After completion, shows the final text with occasional single character glitches.
 */
export default function MatrixText({ text, className }) {
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  
  const [isMounted, setIsMounted] = useState(false);
  const [displayText, setDisplayText] = React.useState('');
  const [isComplete, setIsComplete] = React.useState(false);
  const intervalRef = React.useRef(null);

  // Start with Japanese characters instead of actual text to prevent flash
  const getInitialText = () => {
    const japaneseChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    let initialText = '';
    for (let i = 0; i < text.length; i++) {
      initialText += japaneseChars[Math.floor(Math.random() * japaneseChars.length)];
    }
    return initialText;
  };

  React.useEffect(() => {
    setIsMounted(true);
    setDisplayText(getInitialText());
  }, []);
  
  React.useEffect(() => {
    if (!isMounted) return;
    
    let revealIndex = 0;
    let scrambleCount = 0;
    const maxScrambles = 15;
    
    const animate = () => {
      if (scrambleCount < maxScrambles) {
        // Initial scrambling phase
        let scrambledText = '';
        for (let i = 0; i < text.length; i++) {
          scrambledText += chars[Math.floor(Math.random() * chars.length)];
        }
        setDisplayText(scrambledText);
        scrambleCount++;
      } else if (revealIndex < text.length) {
        // Reveal phase
        if (Math.random() < 0.3) {
          revealIndex++;
        }
        
        let revealText = '';
        for (let i = 0; i < text.length; i++) {
          if (i < revealIndex) {
            revealText += text[i];
          } else {
            revealText += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        setDisplayText(revealText);
      } else {
        // Finished - show final text
        setDisplayText(text);
        setIsComplete(true);
      }
    };
    
    if (!isComplete) {
      intervalRef.current = setInterval(animate, 100);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, isComplete, isMounted]);

  // Simple occasional glitch effect
  React.useEffect(() => {
    if (!isComplete) return;
    
    const glitch = () => {
      // Glitch one character briefly
      const randomIndex = Math.floor(Math.random() * text.length);
      const randomChar = chars[Math.floor(Math.random() * chars.length)];
      const glitchedText = text.substring(0, randomIndex) + randomChar + text.substring(randomIndex + 1);
      
      setDisplayText(glitchedText);
      
      // Reset to original after brief moment
      setTimeout(() => setDisplayText(text), 100);
    };
    
    const glitchInterval = setInterval(glitch, 5000 + Math.random() * 3000);
    
    return () => clearInterval(glitchInterval);
  }, [text, isComplete]);

  if (!isMounted) return null;

  return (
    <span className={`${className} inline-block`}>
      {displayText}
    </span>
  );
}