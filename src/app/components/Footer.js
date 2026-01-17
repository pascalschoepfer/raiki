'use client';

export default function Footer({ lang = 'de', showBorder = false }) {
  const baseClasses = "text-[#706860] hover:text-[#a0ff90] transition-all duration-200";
  const borderClasses = showBorder
    ? "before:content-['['] after:content-[']'] before:text-[#505048] after:text-[#505048] hover:before:text-[#70c060] hover:after:text-[#70c060]"
    : "";

  return (
    <footer className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-4 font-mono text-[10px]">
      <a href="/impressum" className={`${baseClasses} ${borderClasses}`}>
        {lang === 'de' ? 'impressum' : 'imprint'}
      </a>
      <a href="/datenschutz" className={`${baseClasses} ${borderClasses}`}>
        {lang === 'de' ? 'datenschutz' : 'privacy'}
      </a>
    </footer>
  );
}
