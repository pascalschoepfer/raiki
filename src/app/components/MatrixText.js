import React from 'react';

/**
 * MatrixText Component
 * 
 * Creates a subtle scrambling effect where only a few characters occasionally
 * change to random symbols before returning to the original text. No harsh
 * blinking or blocks - just smooth character transitions.
 */
export default function MatrixText({ text, className }) {
  const [displayText, setDisplayText] = React.useState(text);
  const [isComplete, setIsComplete] = React.useState(false);
  
  React.useEffect(() => {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const originalText = text;
    let revealIndex = 0;
    let scrambleCount = 0;
    const maxScrambles = 20;
    
    // Initialize with original text to maintain layout
    setDisplayText(originalText);
    
    const animate = () => {
      if (scrambleCount < maxScrambles) {
        // Initial scrambling phase - show random single-width characters
        let scrambledText = '';
        for (let i = 0; i < originalText.length; i++) {
          scrambledText += chars[Math.floor(Math.random() * chars.length)];
        }
        setDisplayText(scrambledText);
        scrambleCount++;
      } else if (revealIndex < originalText.length) {
        // Reveal phase - progressively show real characters
        if (Math.random() < 0.4) {
          revealIndex++;
        }
        
        let revealText = '';
        for (let i = 0; i < originalText.length; i++) {
          if (i < revealIndex) {
            revealText += originalText[i];
          } else {
            revealText += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        setDisplayText(revealText);
      } else {
        // Fully revealed - stop animation and stay on final text
        setDisplayText(originalText);
        setIsComplete(true);
      }
    };
    
    if (!isComplete) {
      const interval = setInterval(animate, 120);
      return () => clearInterval(interval);
    }
  }, [text, isComplete]);
  
  return (
    <span 
      className={`${className} inline-block overflow-hidden`} 
      style={{ 
        width: `${text.length * 1.2}em`,
        height: '1.2em',
        lineHeight: '1.2em'
      }}
    >
      {displayText}
    </span>
  );
}