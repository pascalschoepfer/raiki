'use client';

import RaikiLogo from '../components/RaikiLogo';
import MatrixText from '../components/MatrixText';
import LanguageToggle, { useLanguage } from '../components/LanguageToggle';
import Footer from '../components/Footer';

const content = {
  de: {
    title: 'impressum',
    section1Title: 'Angaben gemäss Art. 3 UWG',
    section2Title: 'Handelsregister',
    section3Title: 'Kontakt',
    contactLink: 'Kontaktformular',
    linkText: 'Datenschutzerklärung'
  },
  en: {
    title: 'imprint',
    section1Title: 'Company Information',
    section2Title: 'Commercial Register',
    section3Title: 'Contact',
    contactLink: 'Contact Form',
    linkText: 'Privacy Policy'
  }
};

export default function Impressum() {
  const { lang, toggleLang } = useLanguage();
  const t = content[lang];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#100c08] via-[#1a1510] to-[#251c15]">
        <div className="relative min-h-screen">

        {/* Header with Navigation */}
        <header className="fixed top-0 left-0 right-0 z-20 px-6 py-3 bg-[#100c08]/80 backdrop-blur-sm">
          <nav className="max-w-7xl mx-auto flex items-center justify-between">
            <a href="/"><RaikiLogo showText={false} /></a>

            {/* Navigation + Language Toggle */}
            <div className="flex items-center gap-4">
              <div className="flex gap-2 font-mono">
                <a href="/" className="text-[#a09080] hover:text-[#e8e0d5] text-xs sm:text-sm tracking-wider transition-colors">home</a>
                <span className="text-[#4a4035]">|</span>
                <a href="/services" className="text-[#a09080] hover:text-[#e8e0d5] text-xs sm:text-sm tracking-wider transition-colors">services</a>
                <span className="text-[#4a4035]">|</span>
                <a href="/contact" className="text-[#a09080] hover:text-[#e8e0d5] text-xs sm:text-sm tracking-wider transition-colors">contact</a>
              </div>
              <LanguageToggle lang={lang} onToggle={toggleLang} />
            </div>
          </nav>
        </header>

        {/* Page Title */}
        <div className="pt-[10.8vh] sm:pt-[13.5vh] px-6 flex items-center justify-center">
          <div className="flex justify-center">
            <span className="text-[2.5rem] sm:text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-[#c0b8a8] tracking-wider whitespace-nowrap">
              {t.title}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 py-8 pb-24">
          <div className="max-w-2xl mx-auto w-full">

            <div className="bg-[#151210]/60 backdrop-blur-sm border border-[#3d3530] rounded-lg py-6 px-6 sm:px-8">

              <section className="mb-6">
                <h2 className="text-lg font-bold text-[#e8e0d5] mb-3 font-mono">{t.section1Title}</h2>
                <div className="text-[#c0b8a8] space-y-1 text-sm">
                  <p className="font-semibold">Raiki GmbH</p>
                  <p>Langmatten 5</p>
                  <p>5707 Seengen</p>
                  <p>{lang === 'de' ? 'Schweiz' : 'Switzerland'}</p>
                </div>
              </section>

              <section className="mb-6">
                <h2 className="text-lg font-bold text-[#e8e0d5] mb-3 font-mono">{t.section2Title}</h2>
                <div className="text-[#c0b8a8] space-y-1 text-sm">
                  <p>UID: CHE-246.736.408</p>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-bold text-[#e8e0d5] mb-3 font-mono">{t.section3Title}</h2>
                <div className="text-[#c0b8a8] space-y-1 text-sm">
                  <a href="/contact" className="text-[#70c060] hover:text-[#90e080] transition-colors">
                    → {t.contactLink}
                  </a>
                </div>
              </section>

            </div>

            {/* Link to Datenschutz */}
            <div className="mt-6 text-center">
              <a href="/datenschutz" className="text-[#70c060] hover:text-[#90e080] font-mono text-sm transition-colors">
                → {t.linkText}
              </a>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="fixed bottom-0 left-0 right-0 py-4 bg-gradient-to-t from-[#100c08] to-transparent">
          <Footer lang={lang} />
        </div>

        </div>
    </div>
  );
}
