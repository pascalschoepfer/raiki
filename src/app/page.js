'use client';

import RaikiLogo from './components/RaikiLogo';
import NeuralNetwork from './components/MouseTrail';
import MatrixText from './components/MatrixText';

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#100c08] via-[#1a1510] to-[#251c15]">
        {/* Hero Section with Neural Network */}
        <div className="relative overflow-hidden h-full">
        <NeuralNetwork />

        {/* Header - Logo only */}
        <header className="absolute top-0 left-0 right-0 z-20 px-6 py-3 bg-transparent">
          <nav className="max-w-7xl mx-auto">
            <RaikiLogo showText={false} />
          </nav>
        </header>
        {/* Top Section Container - 20vh from top on desktop, 15vh on mobile */}
        <div className="absolute left-0 right-0 z-10 px-6 top-[15vh] sm:top-[20vh]">
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

            {/* Navigation Links - Modern Style */}
            <div className="mt-8 flex justify-center gap-8 sm:gap-12 font-mono">
              <a href="/services" className="group relative text-[#8a8070] hover:text-[#e8e0d5] text-sm sm:text-base tracking-widest transition-colors duration-300">
                services
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#e8e0d5] group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="/about" className="group relative text-[#8a8070] hover:text-[#e8e0d5] text-sm sm:text-base tracking-widest transition-colors duration-300">
                about
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#e8e0d5] group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="/contact" className="group relative text-[#8a8070] hover:text-[#e8e0d5] text-sm sm:text-base tracking-widest transition-colors duration-300">
                contact
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#e8e0d5] group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>

            {/* Description */}
            <div className="mt-8">
              <p className="text-sm sm:text-base text-[#a09080] leading-relaxed max-w-md mx-auto">
                securing digital infrastructure, crafting modern web experiences, and navigating decentralized finance
              </p>
            </div>
          </div>
        </div>
        </div>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}