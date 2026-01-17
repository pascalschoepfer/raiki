'use client';

export default function Footer({ lang = 'de' }) {
  return (
    <footer className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-4 font-mono text-[10px]">
      <a href="/impressum" className="text-[#706860] hover:text-[#a09890] transition-all duration-200 before:content-['['] after:content-[']'] before:text-[#505048] after:text-[#505048] hover:before:text-[#807870] hover:after:text-[#807870]">
        {lang === 'de' ? 'impressum' : 'imprint'}
      </a>
      <a href="/datenschutz" className="text-[#706860] hover:text-[#a09890] transition-all duration-200 before:content-['['] after:content-[']'] before:text-[#505048] after:text-[#505048] hover:before:text-[#807870] hover:after:text-[#807870]">
        {lang === 'de' ? 'datenschutz' : 'privacy'}
      </a>
    </footer>
  );
}
