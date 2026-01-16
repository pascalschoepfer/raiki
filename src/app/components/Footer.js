'use client';

export default function Footer({ lang = 'de' }) {
  return (
    <footer className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-4 font-mono text-xs">
      <a href="/impressum" className="text-[#6b6055] hover:text-[#a09080] transition-colors">
        {lang === 'de' ? 'impressum' : 'imprint'}
      </a>
      <span className="text-[#4a4035]">|</span>
      <a href="/datenschutz" className="text-[#6b6055] hover:text-[#a09080] transition-colors">
        {lang === 'de' ? 'datenschutz' : 'privacy'}
      </a>
    </footer>
  );
}
