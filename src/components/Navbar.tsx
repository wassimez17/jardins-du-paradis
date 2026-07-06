import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  const languages = [
    { code: 'fr', label: 'FR', flag: '/images/flags/frflag.png' },
    { code: 'en', label: 'EN', flag: '/images/flags/engflag.png' },
    { code: 'es', label: 'ES', flag: '/images/flags/espflag.png' },
  ]

  const navSections = [
    { id: 'accueil', label: t.nav.accueil },
    { id: 'plantes', label: t.nav.plantes },
    { id: 'pots', label: t.nav.pots },
    { id: 'jardinage', label: t.nav.jardinage },
    { id: 'soins', label: t.nav.soins },
    { id: 'oiseaux', label: t.nav.oiseaux },
    { id: 'bouquets', label: t.nav.bouquets },
    { id: 'contact', label: t.nav.contact },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(250,248,243,0.98)] backdrop-blur-md border-b border-border shadow-sm flex items-center justify-between px-[4vw] h-[60px] md:h-[72px]">
      <div
        className="flex items-center gap-2 md:gap-3 cursor-pointer group"
        onClick={() => scrollToSection('accueil')}
      >
        <img
          src="/logo.png"
          alt="Logo"
          className="w-[90px] h-[45px] md:w-[120px] md:h-[60px] object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <div className="flex flex-col">
          <div className="font-serif text-[18px] md:text-[24px] font-semibold text-main-green leading-tight group-hover:text-green-light transition-colors duration-300">
            Jardins du Paradis
          </div>
          <div className="text-[9px] md:text-[10px] tracking-[2px] text-gold-accent uppercase font-medium mt-0.5">
            Nature &amp; Élégance
          </div>
        </div>
      </div>

      <ul
        className={`flex gap-0.5 list-none ${
          isMenuOpen
            ? 'absolute top-[60px] md:top-[72px] left-0 right-0 bg-bg-light flex-col py-6 px-6 pb-8 border-b border-border shadow-xl animate-fade-in'
            : 'hidden md:flex'
        }`}
      >
        {navSections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => scrollToSection(section.id)}
              className="text-xs md:text-xs font-normal tracking-[1.5px] uppercase px-4 py-3 md:px-4 md:py-2 rounded-full transition-all duration-300 text-green-mid hover:bg-green-mist hover:text-main-green hover:shadow-md hover:-translate-y-0.5 active:scale-95 w-full md:w-auto text-left md:text-center"
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <div className="relative group hidden md:block">
          <button className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-green-mid hover:text-main-green transition-colors duration-300">
            <img src={languages.find(l => l.code === language)?.flag} alt={language} className="w-5 h-5 object-contain" />
            <span>{language.toUpperCase()}</span>
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="absolute right-0 top-full mt-2 bg-white border border-border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[120px]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code as 'fr' | 'en' | 'es')}
                className={`w-full flex items-center gap-2 px-4 py-2 text-xs hover:bg-green-mist transition-colors duration-200 ${
                  language === lang.code ? 'bg-green-mist text-main-green' : 'text-green-mid'
                }`}
              >
                <img src={lang.flag} alt={lang.label} className="w-5 h-5 object-contain" />
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2 group z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className={`w-[22px] h-[1.5px] bg-text-dark transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-[22px] h-[1.5px] bg-text-dark transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-[22px] h-[1.5px] bg-text-dark transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>
    </nav>
  )
}
