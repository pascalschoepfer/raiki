'use client';

import RaikiLogo from '../components/RaikiLogo';
import MatrixText from '../components/MatrixText';

export default function Services() {
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#100c08] via-[#1a1510] to-[#251c15]">
        {/* Services Section */}
        <div className="relative overflow-hidden h-full">

        {/* Header with Navigation */}
        <header className="absolute top-0 left-0 right-0 z-20 px-6 py-3 bg-transparent">
          <nav className="max-w-7xl mx-auto flex items-center justify-between">
            <a href="/"><RaikiLogo showText={false} /></a>

            {/* Navigation Buttons */}
            <div className="flex gap-2 font-mono">
              <a href="/" className="text-[#a09080] hover:text-[#e8e0d5] text-xs sm:text-sm tracking-wider transition-colors">home</a>
              <span className="text-[#4a4035]">|</span>
              <a href="/about" className="text-[#a09080] hover:text-[#e8e0d5] text-xs sm:text-sm tracking-wider transition-colors">about</a>
              <span className="text-[#4a4035]">|</span>
              <a href="/contact" className="text-[#a09080] hover:text-[#e8e0d5] text-xs sm:text-sm tracking-wider transition-colors">contact</a>
            </div>
          </nav>
        </header>

        {/* Page Title - reduced top margin on mobile */}
        <div className="absolute left-0 right-0 z-10 px-6 top-[12vh] sm:top-[15vh] flex items-center justify-center">
          <div className="flex justify-center">
            <MatrixText
              text="services"
              className="text-[2.5rem] sm:text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-[#c0b8a8] tracking-wider whitespace-nowrap"
            />
          </div>
        </div>

        {/* Services Content - starts right after title on mobile */}
        <div className="absolute z-10 px-4 sm:px-6 top-[22vh] min-[400px]:top-[13vh] bottom-[15vh] left-0 right-0 sm:inset-0 flex items-center justify-center sm:pt-16 md:pt-8">
          <div className="max-w-4xl sm:max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-2 min-[400px]:gap-3 sm:gap-6 md:gap-8 w-[80%] sm:w-full max-h-none sm:max-h-none overflow-y-auto sm:overflow-visible">
            
            {/* System Engineering - Available but Passive */}
            <div className="bg-[#151210]/60 backdrop-blur-sm border border-[#3d3530] hover:border-gray-500 rounded-lg py-3 px-3 pr-1 min-[400px]:pr-2 sm:py-6 sm:px-5 hover:bg-[#1a1815]/60 transition-all duration-300 hover:scale-105">
              <h3 className="text-base min-[400px]:text-xl sm:text-lg md:text-xl font-bold text-[#e8e0d5] mb-2 sm:mb-3 font-mono whitespace-nowrap overflow-hidden text-ellipsis">systems</h3>
              <ul className="text-[#c0b8a8] space-y-1 min-[400px]:space-y-1.5 sm:space-y-2 text-sm min-[400px]:text-base sm:text-sm">
                <li>• architecture and engineering</li>
                <li>• security assessments</li>
                <li>• cloud guidance</li>
                <li>• infrastructure consulting</li>
              </ul>
            </div>

            {/* Digital Experiences - Main Focus */}
            <div className="bg-[#151210]/60 backdrop-blur-sm border border-[#3d3530] hover:border-gray-500 rounded-lg py-3 px-3 pr-1 min-[400px]:pr-2 sm:py-6 sm:px-5 hover:bg-[#1a1815]/60 transition-all duration-300 hover:scale-105">
              <h3 className="text-base min-[400px]:text-xl sm:text-lg md:text-xl font-bold text-[#e8e0d5] mb-2 sm:mb-3 font-mono whitespace-nowrap overflow-hidden text-ellipsis">digital experiences</h3>
              <ul className="text-[#c0b8a8] space-y-1 min-[400px]:space-y-1.5 sm:space-y-2 text-sm min-[400px]:text-base sm:text-sm">
                <li>• cutting edge web apps</li>
                <li>• site modernization</li>
                <li>• dashboard solutions</li>
                <li>• data visualization</li>
              </ul>
            </div>

            {/* Web3 - Main Focus */}
            <div className="bg-[#151210]/60 backdrop-blur-sm border border-[#3d3530] hover:border-gray-500 rounded-lg py-3 px-3 pr-1 min-[400px]:pr-2 sm:py-6 sm:px-5 hover:bg-[#1a1815]/60 transition-all duration-300 hover:scale-105">
              <h3 className="text-base min-[400px]:text-xl sm:text-lg md:text-xl font-bold text-[#e8e0d5] mb-2 sm:mb-3 font-mono whitespace-nowrap overflow-hidden text-ellipsis">web3</h3>
              <ul className="text-[#c0b8a8] space-y-1 min-[400px]:space-y-1.5 sm:space-y-2 text-sm min-[400px]:text-base sm:text-sm">
                <li>• DeFi onboarding and guidance</li>
                <li>• yield optimization strategies</li>
                <li>• security and risk education</li>
                <li>• basic to advanced technical advisory</li>
              </ul>
            </div>

          </div>
        </div>

        </div>
    </div>
  );
}