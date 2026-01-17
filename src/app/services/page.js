'use client';

import RaikiLogo from '../components/RaikiLogo';
import MatrixText from '../components/MatrixText';
import LanguageToggle, { useLanguage } from '../components/LanguageToggle';
import Footer from '../components/Footer';

const content = {
  de: {
    title: 'services',
    systems: 'systems',
    digital: 'digital experiences',
    web3: 'web3',
    sys1: 'architektur und engineering',
    sys2: 'sicherheitsbewertungen',
    sys3: 'cloud beratung',
    sys4: 'infrastruktur consulting',
    dig1: 'modernste web apps',
    dig2: 'website modernisierung',
    dig3: 'dashboard lösungen',
    dig4: 'datenvisualisierung',
    web1: 'defi onboarding und beratung',
    web2: 'yield optimierungsstrategien',
    web3item: 'sicherheits- und risikoaufklärung',
    web4: 'technische beratung (basic bis advanced)'
  },
  en: {
    title: 'services',
    systems: 'systems',
    digital: 'digital experiences',
    web3: 'web3',
    sys1: 'architecture and engineering',
    sys2: 'security assessments',
    sys3: 'cloud guidance',
    sys4: 'infrastructure consulting',
    dig1: 'cutting edge web apps',
    dig2: 'site modernization',
    dig3: 'dashboard solutions',
    dig4: 'data visualization',
    web1: 'DeFi onboarding and guidance',
    web2: 'yield optimization strategies',
    web3item: 'security and risk education',
    web4: 'basic to advanced technical advisory'
  }
};

export default function Services() {
  const { lang, toggleLang } = useLanguage();
  const t = content[lang];

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#100c08] via-[#1a1510] to-[#251c15]">
        {/* Services Section */}
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
                <a href="/about" className="text-[#a09080] hover:text-[#e8e0d5] text-xs sm:text-sm tracking-wider transition-colors">about</a>
                <span className="text-[#4a4035]">|</span>
                <a href="/contact" className="text-[#a09080] hover:text-[#e8e0d5] text-xs sm:text-sm tracking-wider transition-colors">contact</a>
              </div>
              <LanguageToggle lang={lang} onToggle={toggleLang} />
            </div>
          </nav>
        </header>

        {/* Page Title - reduced top margin on mobile */}
        <div className="absolute left-0 right-0 z-10 px-6 top-[7vh] sm:top-[13.5vh] flex items-center justify-center">
          <div className="flex justify-center">
            <MatrixText
              text={t.title}
              className="text-[2.5rem] sm:text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-[#c0b8a8] tracking-wider whitespace-nowrap"
            />
          </div>
        </div>

        {/* Services Content - starts right after title on mobile */}
        <div className="absolute z-10 px-4 sm:px-6 top-[15vh] min-[400px]:top-[13vh] bottom-[15vh] left-0 right-0 sm:inset-0 flex items-center justify-center sm:pt-16 md:pt-8">
          <div className="max-w-4xl sm:max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-2 min-[400px]:gap-3 sm:gap-6 md:gap-8 w-[80%] sm:w-full max-h-none sm:max-h-none overflow-y-auto sm:overflow-visible">

            {/* System Engineering - Available but Passive */}
            <div className="bg-[#151210]/60 backdrop-blur-sm border border-[#3d3530] hover:border-gray-500 rounded-lg py-3 px-3 pr-1 min-[400px]:pr-2 sm:py-6 sm:px-5 hover:bg-[#1a1815]/60 transition-all duration-300 hover:scale-105">
              <h3 className="text-base min-[400px]:text-xl sm:text-lg md:text-xl font-bold text-[#e8e0d5] mb-2 sm:mb-3 font-mono whitespace-nowrap overflow-hidden text-ellipsis">{t.systems}</h3>
              <ul className="text-[#c0b8a8] space-y-1 min-[400px]:space-y-1.5 sm:space-y-2 text-sm min-[400px]:text-base sm:text-sm">
                <li>• {t.sys1}</li>
                <li>• {t.sys2}</li>
                <li>• {t.sys3}</li>
                <li>• {t.sys4}</li>
              </ul>
            </div>

            {/* Digital Experiences - Main Focus */}
            <div className="bg-[#151210]/60 backdrop-blur-sm border border-[#3d3530] hover:border-gray-500 rounded-lg py-3 px-3 pr-1 min-[400px]:pr-2 sm:py-6 sm:px-5 hover:bg-[#1a1815]/60 transition-all duration-300 hover:scale-105">
              <h3 className="text-base min-[400px]:text-xl sm:text-lg md:text-xl font-bold text-[#e8e0d5] mb-2 sm:mb-3 font-mono whitespace-nowrap overflow-hidden text-ellipsis">{t.digital}</h3>
              <ul className="text-[#c0b8a8] space-y-1 min-[400px]:space-y-1.5 sm:space-y-2 text-sm min-[400px]:text-base sm:text-sm">
                <li>• {t.dig1}</li>
                <li>• {t.dig2}</li>
                <li>• {t.dig3}</li>
                <li>• {t.dig4}</li>
              </ul>
            </div>

            {/* Web3 - Main Focus */}
            <div className="bg-[#151210]/60 backdrop-blur-sm border border-[#3d3530] hover:border-gray-500 rounded-lg py-3 px-3 pr-1 min-[400px]:pr-2 sm:py-6 sm:px-5 hover:bg-[#1a1815]/60 transition-all duration-300 hover:scale-105">
              <h3 className="text-base min-[400px]:text-xl sm:text-lg md:text-xl font-bold text-[#e8e0d5] mb-2 sm:mb-3 font-mono whitespace-nowrap overflow-hidden text-ellipsis">{t.web3}</h3>
              <ul className="text-[#c0b8a8] space-y-1 min-[400px]:space-y-1.5 sm:space-y-2 text-sm min-[400px]:text-base sm:text-sm">
                <li>• {t.web1}</li>
                <li>• {t.web2}</li>
                <li>• {t.web3item}</li>
                <li>• {t.web4}</li>
              </ul>
            </div>

          </div>
        </div>

        <Footer lang={lang} />

        </div>
    </div>
  );
}
