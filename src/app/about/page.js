'use client';

import RaikiLogo from '../components/RaikiLogo';
import MatrixText from '../components/MatrixText';
import LanguageToggle, { useLanguage } from '../components/LanguageToggle';
import Footer from '../components/Footer';

const content = {
  de: {
    title: 'about',
    experience: 'erfahrung',
    education: 'ausbildung',
    expertise: 'expertise',
    exp1: '15+ Jahre in Systemarchitektur',
    exp2: '15+ Jahre in Security Engineering',
    exp3: '10+ Jahre in digitalen Assets',
    exp4: '5+ Jahre in dezentraler Finanzwelt',
    edu1: 'BSc. in Informationstechnologie',
    edu2: 'Cybersecurity Spezialisierung',
    edu3: 'Core System Engineering',
    edu4: 'Dezentrale Systeme',
    ext1: 'Traditionelle Sicherheitspraktiken',
    ext2: 'Web3 Protokoll Stresstests',
    ext3: 'DeFi Strategiebewertungen',
    ext4: 'Tiefes technisches Web3 Wissen'
  },
  en: {
    title: 'about',
    experience: 'experience',
    education: 'education',
    expertise: 'expertise',
    exp1: '15+ years in systems architecture',
    exp2: '15+ years in security engineering',
    exp3: '10+ years in digital assets',
    exp4: '5+ years in decentralized finance',
    edu1: 'bsc. in information technology',
    edu2: 'cybersecurity specialization',
    edu3: 'core system engineering',
    edu4: 'decentralized systems',
    ext1: 'traditional security practices',
    ext2: 'web3 protocol stress testing',
    ext3: 'defi strategy assessments',
    ext4: 'deep technical web3 knowledge'
  }
};

export default function About() {
  const { lang, toggleLang } = useLanguage();
  const t = content[lang];

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#100c08] via-[#1a1510] to-[#251c15]">
        <div className="relative overflow-hidden h-full">

        {/* Header with Navigation */}
        <header className="absolute top-0 left-0 right-0 z-20 px-6 py-3 bg-transparent">
          <nav className="max-w-7xl mx-auto flex items-center justify-between">
            <a href="/"><RaikiLogo showText={false} /></a>

            {/* Navigation Buttons */}
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

        {/* Page Title - reduced top margin on mobile */}
        <div className="absolute left-0 right-0 z-10 px-6 top-[10.8vh] sm:top-[13.5vh] flex items-center justify-center">
          <div className="flex justify-center">
            <MatrixText
              text={t.title}
              className="text-[2.5rem] sm:text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-[#c0b8a8] tracking-wider whitespace-nowrap"
            />
          </div>
        </div>

        {/* About Content - starts right after title on mobile */}
        <div className="absolute z-10 px-4 sm:px-6 top-[22vh] min-[400px]:top-[13vh] bottom-[15vh] left-0 right-0 sm:inset-0 flex items-center justify-center sm:pt-16 md:pt-8">
          <div className="max-w-4xl sm:max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-2 min-[400px]:gap-3 sm:gap-6 md:gap-8 w-[80%] sm:w-full max-h-none sm:max-h-none overflow-y-auto sm:overflow-visible">

            {/* Experience */}
            <div className="bg-[#151210]/60 backdrop-blur-sm border border-[#3d3530] hover:border-gray-500 rounded-lg py-3 px-3 pr-1 min-[400px]:pr-2 sm:py-6 sm:px-5 hover:bg-[#1a1815]/60 transition-all duration-300 hover:scale-105">
              <h3 className="text-base min-[400px]:text-xl sm:text-lg md:text-xl font-bold text-[#e8e0d5] mb-2 sm:mb-3 font-mono whitespace-nowrap overflow-hidden text-ellipsis">{t.experience}</h3>
              <div className="text-[#c0b8a8] space-y-1 min-[400px]:space-y-1.5 sm:space-y-2 text-sm min-[400px]:text-base sm:text-sm font-normal">
                <div className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <svg className="w-3.5 h-3.5 fill-gray-400" viewBox="0 0 16 16">
                      <circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <rect x="7" y="2" width="2" height="3" fill="currentColor"/>
                      <rect x="7" y="11" width="2" height="3" fill="currentColor"/>
                      <rect x="2" y="7" width="3" height="2" fill="currentColor"/>
                      <rect x="11" y="7" width="3" height="2" fill="currentColor"/>
                      <rect x="3.5" y="3.5" width="2" height="2" fill="currentColor" transform="rotate(45 4.5 4.5)"/>
                      <rect x="10.5" y="3.5" width="2" height="2" fill="currentColor" transform="rotate(45 11.5 4.5)"/>
                      <rect x="3.5" y="10.5" width="2" height="2" fill="currentColor" transform="rotate(45 4.5 11.5)"/>
                      <rect x="10.5" y="10.5" width="2" height="2" fill="currentColor" transform="rotate(45 11.5 11.5)"/>
                    </svg>
                  </div>
                  <span>{t.exp1}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <svg className="w-3.5 h-3.5 fill-gray-400" viewBox="0 0 16 16">
                      <rect x="3" y="5" width="10" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <path d="M5,5 V3 a3,3 0 0,1 6,0 V5" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="8" cy="9" r="1.5" fill="currentColor"/>
                    </svg>
                  </div>
                  <span>{t.exp2}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <span className="text-[#c0b8a8] text-sm font-bold">₿</span>
                  </div>
                  <span>{t.exp3}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <span className="text-[#c0b8a8] text-sm font-bold">Ξ</span>
                  </div>
                  <span>{t.exp4}</span>
                </div>
              </div>
            </div>

            {/* Education & Specialization */}
            <div className="bg-[#151210]/60 backdrop-blur-sm border border-[#3d3530] hover:border-gray-500 rounded-lg py-3 px-3 pr-1 min-[400px]:pr-2 sm:py-6 sm:px-5 hover:bg-[#1a1815]/60 transition-all duration-300 hover:scale-105">
              <h3 className="text-base min-[400px]:text-xl sm:text-lg md:text-xl font-bold text-[#e8e0d5] mb-2 sm:mb-3 font-mono whitespace-nowrap overflow-hidden text-ellipsis">{t.education}</h3>
              <div className="text-[#c0b8a8] space-y-1 min-[400px]:space-y-1.5 sm:space-y-2 text-sm min-[400px]:text-base sm:text-sm font-normal">
                <div className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <svg className="w-3.5 h-3.5 fill-gray-400" viewBox="0 0 16 16">
                      <path d="M2,4 L8,3 L14,4 L14,13 L8,12 L2,13 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <line x1="8" y1="3" x2="8" y2="12" stroke="currentColor" strokeWidth="1.5"/>
                      <line x1="4" y1="6" x2="6" y2="6" stroke="currentColor" strokeWidth="1"/>
                      <line x1="4" y1="8" x2="6" y2="8" stroke="currentColor" strokeWidth="1"/>
                      <line x1="10" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1"/>
                      <line x1="10" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="1"/>
                    </svg>
                  </div>
                  <span>{t.edu1}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <svg className="w-3.5 h-3.5 fill-gray-400" viewBox="0 0 20 20">
                      <path d="M5,6 A4,4 0 1,1 5,14 A4,4 0 1,1 5,6 M5,8.5 A1.5,1.5 0 1,0 5,11.5 A1.5,1.5 0 1,0 5,8.5" fillRule="evenodd"/>
                      <rect x="9" y="9" width="8" height="2" fill="currentColor"/>
                      <rect x="15" y="11" width="2" height="3" fill="currentColor"/>
                      <rect x="12" y="11" width="2" height="2" fill="currentColor"/>
                    </svg>
                  </div>
                  <span>{t.edu2}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <svg className="w-3.5 h-3.5 fill-gray-400" viewBox="0 0 20 20">
                      <rect x="5" y="5" width="10" height="10" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                      <line x1="7" y1="1.5" x2="7" y2="5" stroke="currentColor" strokeWidth="1.75"/>
                      <line x1="10" y1="1.5" x2="10" y2="5" stroke="currentColor" strokeWidth="1.75"/>
                      <line x1="13" y1="1.5" x2="13" y2="5" stroke="currentColor" strokeWidth="1.75"/>
                      <line x1="7" y1="15" x2="7" y2="18.5" stroke="currentColor" strokeWidth="1.75"/>
                      <line x1="10" y1="15" x2="10" y2="18.5" stroke="currentColor" strokeWidth="1.75"/>
                      <line x1="13" y1="15" x2="13" y2="18.5" stroke="currentColor" strokeWidth="1.75"/>
                      <line x1="1.5" y1="7" x2="5" y2="7" stroke="currentColor" strokeWidth="1.75"/>
                      <line x1="1.5" y1="10" x2="5" y2="10" stroke="currentColor" strokeWidth="1.75"/>
                      <line x1="1.5" y1="13" x2="5" y2="13" stroke="currentColor" strokeWidth="1.75"/>
                      <line x1="15" y1="7" x2="18.5" y2="7" stroke="currentColor" strokeWidth="1.75"/>
                      <line x1="15" y1="10" x2="18.5" y2="10" stroke="currentColor" strokeWidth="1.75"/>
                      <line x1="15" y1="13" x2="18.5" y2="13" stroke="currentColor" strokeWidth="1.75"/>
                    </svg>
                  </div>
                  <span>{t.edu3}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <svg className="w-3.5 h-3.5 fill-gray-400" viewBox="0 0 16 16">
                      <rect x="2" y="6" width="3" height="4" rx="0.5" fill="none" stroke="currentColor" strokeWidth="1"/>
                      <rect x="6.5" y="6" width="3" height="4" rx="0.5" fill="none" stroke="currentColor" strokeWidth="1"/>
                      <rect x="11" y="6" width="3" height="4" rx="0.5" fill="none" stroke="currentColor" strokeWidth="1"/>
                      <line x1="5" y1="8" x2="6.5" y2="8" stroke="currentColor" strokeWidth="1"/>
                      <line x1="9.5" y1="8" x2="11" y2="8" stroke="currentColor" strokeWidth="1"/>
                    </svg>
                  </div>
                  <span>{t.edu4}</span>
                </div>
              </div>
            </div>

            {/* Expertise */}
            <div className="bg-[#151210]/60 backdrop-blur-sm border border-[#3d3530] hover:border-gray-500 rounded-lg py-3 px-3 pr-1 min-[400px]:pr-2 sm:py-6 sm:px-5 hover:bg-[#1a1815]/60 transition-all duration-300 hover:scale-105">
              <h3 className="text-base min-[400px]:text-xl sm:text-lg md:text-xl font-bold text-[#e8e0d5] mb-2 sm:mb-3 font-mono whitespace-nowrap overflow-hidden text-ellipsis">{t.expertise}</h3>
              <div className="text-[#c0b8a8] space-y-1 min-[400px]:space-y-1.5 sm:space-y-2 text-sm min-[400px]:text-base sm:text-sm font-normal">
                <div className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <svg className="w-3.5 h-3.5 fill-gray-400" viewBox="0 0 20 20">
                      <path d="M10 2 L18 5 L18 11 C18 14.5 15 17.5 10 19 C5 17.5 2 14.5 2 11 L2 5 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <path d="M6 10 L9 13 L14 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>{t.ext1}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <svg className="w-3.5 h-3.5 fill-gray-400" viewBox="0 0 16 16">
                      <path d="M8,2 L10,4 L12,3 L11,6 L14,7 L10,8 L12,11 L8,10 L6,13 L6,9 L3,10 L5,7 L2,6 L6,5 L4,2 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="8" cy="7" r="1" fill="currentColor"/>
                    </svg>
                  </div>
                  <span>{t.ext2}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <svg className="w-3.5 h-3.5 fill-gray-400" viewBox="0 0 16 16">
                      <circle cx="6" cy="6" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <line x1="9" y1="9" x2="14" y2="14" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <span>{t.ext3}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <svg className="w-3.5 h-3.5 fill-gray-400" viewBox="0 0 16 16">
                      <circle cx="8" cy="5.5" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M5.5 9 L10.5 9" stroke="currentColor" strokeWidth="1"/>
                      <rect x="7" y="10" width="2" height="2" fill="none" stroke="currentColor" strokeWidth="1"/>
                      <path d="M6 12 L10 12" stroke="currentColor" strokeWidth="1"/>
                      <path d="M7.5 14 L8.5 14" stroke="currentColor" strokeWidth="1"/>
                      <line x1="1.5" y1="2" x2="2.8" y2="3.3" stroke="currentColor" strokeWidth="1.5"/>
                      <line x1="14.5" y1="2" x2="13.2" y2="3.3" stroke="currentColor" strokeWidth="1.5"/>
                      <line x1="1.5" y1="9" x2="2.8" y2="7.7" stroke="currentColor" strokeWidth="1.5"/>
                      <line x1="14.5" y1="9" x2="13.2" y2="7.7" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </div>
                  <span>{t.ext4}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <Footer lang={lang} />

        </div>
    </div>
  );
}
