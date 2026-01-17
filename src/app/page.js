'use client';

import RaikiLogo from './components/RaikiLogo';
import MatrixText from './components/MatrixText';
import LanguageToggle, { useLanguage } from './components/LanguageToggle';
import Footer from './components/Footer';
import GridHorizonBackground from './components/GridHorizonBackground';

export default function Home() {
  const { lang, toggleLang } = useLanguage();

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#100c08] via-[#1a1510] to-[#251c15]">
        {/* Hero Section */}
        <div className="relative overflow-hidden h-full">

        {/* Grid Horizon Background */}
        <GridHorizonBackground />

        {/* Header with Navigation */}
        <header className="absolute top-0 left-0 right-0 z-20 px-6 py-3 bg-transparent">
          <nav className="max-w-7xl mx-auto flex items-center justify-between">
            <RaikiLogo showText={false} />

            {/* Navigation Buttons */}
            <div className="flex items-center gap-4">
              <div className="flex gap-2 font-mono">
                <a href="/services" className="text-[#a09080] hover:text-[#e8e0d5] text-xs sm:text-sm tracking-wider transition-colors">services</a>
                <span className="text-[#4a4035]">|</span>
                <a href="/about" className="text-[#a09080] hover:text-[#e8e0d5] text-xs sm:text-sm tracking-wider transition-colors">about</a>
                <span className="text-[#4a4035]">|</span>
                <a href="/contact" className="text-[#a09080] hover:text-[#e8e0d5] text-xs sm:text-sm tracking-wider transition-colors">contact</a>
              </div>
              <LanguageToggle lang={lang} onToggle={toggleLang} />
            </div>
          </nav>
        </header>
        {/* Top Section Container - higher positioning */}
        <div className="absolute left-0 right-0 z-10 px-6 top-[10.8vh] sm:top-[13.5vh]">
          <div className="max-w-4xl mx-auto text-center">
            {/* Small text */}
            <div className="mb-2">
              <p className="text-xs md:text-sm text-[#a09080] font-mono">
                cybersecurity • digital experiences • web3
              </p>
            </div>

            {/* Hero Title - with proper container */}
            <div className="inline-block">
              <MatrixText
                text="raiki"
                className="text-5xl md:text-6xl font-mono font-bold text-[#d0c8b8] tracking-wider"
              />
            </div>

            {/* Navigation Buttons */}
            <div className="mt-14 sm:mt-20 flex justify-center gap-4 sm:gap-6 font-mono">
              <a href="/services" className="group px-6 py-2.5 border border-[#4a4035] hover:border-[#70c060] bg-[#151210]/60 hover:bg-[#1a2518]/60 transition-all duration-300">
                <span className="text-[#a09080] group-hover:text-[#70c060] text-sm tracking-wider transition-colors duration-300">services</span>
              </a>
              <a href="/about" className="group px-6 py-2.5 border border-[#4a4035] hover:border-[#70c060] bg-[#151210]/60 hover:bg-[#1a2518]/60 transition-all duration-300">
                <span className="text-[#a09080] group-hover:text-[#70c060] text-sm tracking-wider transition-colors duration-300">about</span>
              </a>
              <a href="/contact" className="group px-6 py-2.5 border border-[#4a4035] hover:border-[#70c060] bg-[#151210]/60 hover:bg-[#1a2518]/60 transition-all duration-300">
                <span className="text-[#a09080] group-hover:text-[#70c060] text-sm tracking-wider transition-colors duration-300">contact</span>
              </a>
            </div>

            {/* Description */}
            <div className="mt-12 sm:mt-16">
              <p className="text-sm sm:text-base md:text-lg text-[#c0b8a8] leading-relaxed max-w-lg mx-auto">
                {lang === 'de'
                  ? 'Bei Raiki spezialisieren wir uns auf die Absicherung digitaler Infrastruktur, die Entwicklung moderner Webanwendungen und die Navigation durch die Tiefen von DeFi und Web3.'
                  : 'At Raiki we specialize in securing digital infrastructure, crafting modern web applications and navigating the depths of decentralized finance and web3.'
                }
              </p>
            </div>
          </div>
        </div>

        <Footer lang={lang} showBorder={true} />
        </div>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
