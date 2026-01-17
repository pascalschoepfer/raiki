'use client';

export default function Footer({ lang = 'de', showBorder = false }) {
  const baseClasses = "text-[#a09080] hover:text-[#e8e0d5] transition-colors";
  const borderClasses = showBorder
    ? "px-2 py-1 border-b border-dashed border-[#4a4540]/40 hover:border-[#6a6560]/60"
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
