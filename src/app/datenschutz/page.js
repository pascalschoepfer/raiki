'use client';

import RaikiLogo from '../components/RaikiLogo';
import MatrixText from '../components/MatrixText';
import LanguageToggle, { useLanguage } from '../components/LanguageToggle';
import Footer from '../components/Footer';

const content = {
  de: {
    title: 'datenschutz',
    sections: [
      {
        title: '1. Verantwortliche Stelle',
        content: 'company'
      },
      {
        title: '2. Grundsatz',
        content: 'Der Schutz Ihrer Privatsphäre ist uns wichtig. Wir erheben nur die für die Nutzung unserer Website notwendigen Daten und behandeln diese vertraulich.'
      },
      {
        title: '3. Erhobene Daten',
        content: 'data'
      },
      {
        title: '4. Verwendung der Daten',
        content: 'Die erhobenen Daten werden ausschliesslich zur Beantwortung Ihrer Anfragen und zur technischen Bereitstellung der Website verwendet. Eine Weitergabe an Dritte erfolgt nicht, ausser dies ist zur Vertragserfüllung erforderlich oder gesetzlich vorgeschrieben.'
      },
      {
        title: '5. Cookies',
        content: 'Diese Website verwendet keine Tracking-Cookies oder Analyse-Tools. Es werden nur technisch notwendige Cookies verwendet, die für den Betrieb der Website erforderlich sind.'
      },
      {
        title: '6. Sicherheit',
        content: 'Wir setzen technische und organisatorische Sicherheitsmassnahmen ein, um Ihre Daten gegen Manipulation, Verlust oder unberechtigten Zugriff zu schützen. Unsere Website verwendet SSL-Verschlüsselung.'
      },
      {
        title: '7. Ihre Rechte',
        content: 'Sie haben das Recht auf Auskunft, Berichtigung und Löschung Ihrer Daten. Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden.'
      },
      {
        title: '8. Hosting',
        content: 'Diese Website wird bei Vercel Inc. gehostet. Beim Zugriff auf unsere Website werden Daten auf den Servern von Vercel verarbeitet. Weitere Informationen finden Sie in der Datenschutzerklärung von Vercel.'
      },
      {
        title: '9. Änderungen',
        content: 'Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen, um sie an geänderte Rechtslage oder bei Änderungen unserer Dienstleistungen anzupassen.'
      }
    ],
    dataIntro: 'Beim Besuch unserer Website werden folgende Daten erhoben:',
    dataItems: [
      'Technische Zugriffsdaten (IP-Adresse, Browsertyp, Zugriffszeit)',
      'Bei Nutzung des Kontaktformulars: Name, E-Mail-Adresse und Ihre Nachricht'
    ],
    contactLink: 'Kontaktformular',
    date: 'Stand: Januar 2026',
    linkText: 'Impressum'
  },
  en: {
    title: 'privacy',
    sections: [
      {
        title: '1. Responsible Party',
        content: 'company'
      },
      {
        title: '2. Principle',
        content: 'Protecting your privacy is important to us. We only collect data necessary for the use of our website and treat it confidentially.'
      },
      {
        title: '3. Collected Data',
        content: 'data'
      },
      {
        title: '4. Use of Data',
        content: 'The collected data is used exclusively to respond to your inquiries and for the technical provision of the website. Data is not shared with third parties unless required for contract fulfillment or legally mandated.'
      },
      {
        title: '5. Cookies',
        content: 'This website does not use tracking cookies or analytics tools. Only technically necessary cookies required for website operation are used.'
      },
      {
        title: '6. Security',
        content: 'We implement technical and organizational security measures to protect your data against manipulation, loss, or unauthorized access. Our website uses SSL encryption.'
      },
      {
        title: '7. Your Rights',
        content: 'You have the right to access, rectification, and deletion of your data. For questions regarding data protection, please contact us at any time.'
      },
      {
        title: '8. Hosting',
        content: 'This website is hosted by Vercel Inc. When accessing our website, data is processed on Vercel servers. For more information, please refer to Vercel\'s privacy policy.'
      },
      {
        title: '9. Changes',
        content: 'We reserve the right to adapt this privacy policy as needed to reflect changes in legal requirements or our services.'
      }
    ],
    dataIntro: 'When visiting our website, the following data is collected:',
    dataItems: [
      'Technical access data (IP address, browser type, access time)',
      'When using the contact form: name, email address, and your message'
    ],
    contactLink: 'Contact Form',
    date: 'Last updated: January 2026',
    linkText: 'Imprint'
  }
};

export default function Datenschutz() {
  const { lang, toggleLang } = useLanguage();
  const t = content[lang];

  const renderSection = (section) => {
    if (section.content === 'company') {
      return (
        <div className="text-[#c0b8a8] space-y-1 text-sm">
          <p>Raiki GmbH</p>
          <p>Langmatten 5</p>
          <p>5707 Seengen</p>
          <p>{lang === 'de' ? 'Schweiz' : 'Switzerland'}</p>
          <p className="mt-2">
            <a href="/contact" className="text-[#70c060] hover:text-[#90e080] transition-colors">
              → {t.contactLink}
            </a>
          </p>
        </div>
      );
    }
    if (section.content === 'data') {
      return (
        <>
          <p className="text-[#c0b8a8] text-sm leading-relaxed mb-2">
            {t.dataIntro}
          </p>
          <ul className="text-[#c0b8a8] text-sm space-y-1 list-disc list-inside">
            {t.dataItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </>
      );
    }
    return <p className="text-[#c0b8a8] text-sm leading-relaxed">{section.content}</p>;
  };

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

        {/* Page Title */}
        <div className="pt-[10.8vh] sm:pt-[13.5vh] px-6 flex items-center justify-center">
          <div className="flex justify-center">
            <MatrixText
              text={t.title}
              className="text-[2rem] sm:text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-[#c0b8a8] tracking-wider whitespace-nowrap"
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 py-8 pb-24">
          <div className="max-w-2xl mx-auto w-full">

            <div className="bg-[#151210]/60 backdrop-blur-sm border border-[#3d3530] rounded-lg py-6 px-6 sm:px-8 space-y-6">

              {t.sections.map((section, index) => (
                <section key={index}>
                  <h2 className="text-lg font-bold text-[#e8e0d5] mb-3 font-mono">{section.title}</h2>
                  {renderSection(section)}
                </section>
              ))}

              <p className="text-[#6b6055] text-xs pt-4 border-t border-[#3d3530]">
                {t.date}
              </p>

            </div>

            {/* Link to Impressum */}
            <div className="mt-6 text-center">
              <a href="/impressum" className="text-[#70c060] hover:text-[#90e080] font-mono text-sm transition-colors">
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
