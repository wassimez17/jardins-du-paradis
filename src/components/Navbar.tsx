import { useState } from 'react'
import { navigationSections } from '../constants/navigation'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(250,248,243,0.96)] backdrop-blur-sm border-b border-border flex items-center justify-between px-[4vw] h-[72px]">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => scrollToSection('accueil')}
      >
        <img
          src="/logo.png"
          alt="Logo"
          className="w-[120px] h-[60px] object-contain rounded-lg shadow-sm transition-transform duration-300 hover:scale-105"
        />
        <div className="flex flex-col">
          <div className="font-serif text-[24px] font-semibold text-main-green leading-tight shadow-sm">
            Jardins du Paradis
          </div>
          <div className="text-[10px] tracking-[2px] text-gold-accent uppercase font-medium mt-0.5">
            Nature &amp; Élégance
          </div>
        </div>
      </div>

      <ul
        className={`flex gap-0.5 list-none ${
          isMenuOpen
            ? 'absolute top-[72px] left-0 right-0 bg-bg-light flex-col py-4 px-8 pb-8 border-b border-border shadow-lg'
            : 'hidden md:flex'
        }`}
      >
        {navigationSections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => scrollToSection(section.id)}
              className="text-xs font-normal tracking-[1.5px] uppercase px-3.5 py-2 rounded transition-all duration-200 text-green-mid hover:bg-green-mist"
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>

      <button
        className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className="w-[22px] h-[1.5px] bg-text-dark transition-transform duration-300"></span>
        <span className="w-[22px] h-[1.5px] bg-text-dark transition-transform duration-300"></span>
        <span className="w-[22px] h-[1.5px] bg-text-dark transition-transform duration-300"></span>
      </button>
    </nav>
  )
}
