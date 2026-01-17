'use client';

export default function Footer({ lang = 'de' }) {
  return (
    <footer className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-3 font-mono text-xs">
      <a href="/impressum" className="px-3 py-1.5 bg-[#1a1510] border border-[#3a3530] text-[#a09080] hover:text-[#e8e0d5] hover:border-[#5a5550] transition-colors">
        {lang === 'de' ? 'impressum' : 'imprint'}
      </a>
      <a href="/datenschutz" className="px-3 py-1.5 bg-[#1a1510] border border-[#3a3530] text-[#a09080] hover:text-[#e8e0d5] hover:border-[#5a5550] transition-colors">
        {lang === 'de' ? 'datenschutz' : 'privacy'}
      </a>
    </footer>
  );
}
