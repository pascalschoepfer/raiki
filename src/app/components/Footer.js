'use client';

export default function Footer({ lang = 'de', showBorder = false }) {
  const baseClasses = "text-[#a09080] hover:text-[#e8e0d5] transition-colors";
  const borderClasses = showBorder
    ? "px-3 py-1.5 bg-[#1a1510] border border-[#3a3530] hover:border-[#5a5550]"
    : "";

  return (
    <footer className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-3 font-mono text-[10px]">
      <a href="/impressum" className={`${baseClasses} ${borderClasses}`}>
        {lang === 'de' ? 'impressum' : 'imprint'}
      </a>
      <a href="/datenschutz" className={`${baseClasses} ${borderClasses}`}>
        {lang === 'de' ? 'datenschutz' : 'privacy'}
      </a>
    </footer>
  );
}
