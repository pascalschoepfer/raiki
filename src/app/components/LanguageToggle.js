'use client';

import { useEffect, useState } from 'react';

export function useLanguage() {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const stored = localStorage.getItem('raiki-lang');
    if (stored === 'en' || stored === 'de') {
      setLang(stored);
    }
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'de' ? 'en' : 'de';
    setLang(newLang);
    localStorage.setItem('raiki-lang', newLang);
  };

  return { lang, toggleLang };
}

export default function LanguageToggle({ lang, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="px-2 py-1 border border-[#4a4035] hover:border-[#70c060] text-[#a09080] hover:text-[#70c060] font-mono text-xs transition-colors"
    >
      {lang === 'de' ? 'EN' : 'DE'}
    </button>
  );
}
