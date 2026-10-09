import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { CONTACT_CONFIG } from '../config/contact'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCatalogueOpen, setIsCatalogueOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileCatalogueOpen, setIsMobileCatalogueOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { getTotalQuantity } = useCart()
  const cartQuantity = getTotalQuantity()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
      setIsCatalogueOpen(false)
      setIsMobileCatalogueOpen(false)
    }
  }

  const navigateToSection = (sectionId: string) => {
    setIsMenuOpen(false)
    setIsCatalogueOpen(false)
    setIsMobileCatalogueOpen(false)
    
    // Catalogue items navigate to category pages with full page reload
    const catalogueRoutes: Record<string, string> = {
      'plantes': '/plantes',
      'pots': '/pots',
      'soins': '/soins',
      'oiseaux': '/oiseaux',
      'bouquets': '/bouquets',
    }
    
    // Apropos navigates to dedicated page
    if (sectionId === 'apropos') {
      navigate('/apropos')
      return
    }

    // Services navigates to dedicated page
    if (sectionId === 'services') {
      navigate('/services')
      return
    }

    if (catalogueRoutes[sectionId]) {
      navigate(catalogueRoutes[sectionId])
    } else if (location.pathname === '/') {
      // Already on homepage, scroll to section
      setTimeout(() => scrollToSection(sectionId), 100)
    } else {
      // Navigate to homepage with hash
      navigate(`/#${sectionId}`)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle hash scrolling on homepage
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const sectionId = location.hash.replace('#', '')
      setTimeout(() => scrollToSection(sectionId), 100)
    }
  }, [location.pathname, location.hash])

  const languages = [
    { code: 'fr', label: 'FR', flag: '/images/flags/frflag.png' },
    { code: 'en', label: 'EN', flag: '/images/flags/engflag.png' },
    { code: 'es', label: 'ES', flag: '/images/flags/espflag.png' },
  ]

  const catalogueItems = [
    { id: 'plantes', label: t.nav.plantes },
    { id: 'pots', label: t.nav.pots },
    { id: 'soins', label: t.nav.soins },
    { id: 'oiseaux', label: t.nav.oiseaux },
    { id: 'bouquets', label: t.nav.bouquets },
  ]

  const mainNavItems = [
    { id: 'accueil', label: t.nav.accueil },
    { id: 'apropos', label: t.nav.apropos },
    { id: 'services', label: t.nav.services },
    { id: 'jardinage', label: t.nav.jardinage },
    { id: 'contact', label: t.nav.contact },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[rgba(250,248,243,0.95)] backdrop-blur-md border-b border-border shadow-md' 
        : 'bg-[rgba(250,248,243,1)] border-b border-border'
    } flex items-center justify-between px-[4vw] h-[60px] md:h-[72px]`}>
      <div
        className="flex items-center cursor-pointer group"
        onClick={() => navigate('/')}
      >
        <img
          src="/logo.png"
          alt="Logo"
          className="w-[90px] h-[45px] md:w-[120px] md:h-[60px] object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-1 list-none">
        {mainNavItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => navigateToSection(item.id)}
              className="text-xs font-normal tracking-[1.5px] uppercase px-4 py-2 rounded-full transition-all duration-300 text-green-mid hover:text-main-green hover:bg-green-mist/50"
            >
              {item.label}
            </button>
          </li>
        ))}
        
        {/* Catalogue Dropdown */}
        <li className="relative">
          <button
            onClick={() => setIsCatalogueOpen(!isCatalogueOpen)}
            className="text-xs font-normal tracking-[1.5px] uppercase px-4 py-2 rounded-full transition-all duration-300 text-green-mid hover:text-main-green hover:bg-green-mist/50 flex items-center gap-1"
          >
            {t.nav.catalogue}
            <svg className={`w-3 h-3 transition-transform duration-300 ${isCatalogueOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isCatalogueOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-green-mid/20 rounded-xl shadow-2xl min-w-[180px] py-2 animate-fade-in">
              {catalogueItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateToSection(item.id)}
                  className="w-full text-left px-4 py-2.5 text-xs text-green-mid hover:bg-green-mist hover:text-main-green transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </li>
      </ul>

      {/* Desktop Right Side */}
      <div className="hidden md:flex items-center gap-4">
        {/* Desktop Language Selector */}
        <div className="relative group">
          <button className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-green-mid hover:text-main-green transition-colors duration-300">
            <img src={languages.find(l => l.code === language)?.flag} alt={language} className="w-5 h-5 object-contain" />
            <span>{language.toUpperCase()}</span>
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="absolute right-0 top-full mt-2 bg-white border border-green-mid/20 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[120px]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code as 'fr' | 'en' | 'es')}
                className={`w-full flex items-center gap-2 px-4 py-2.5 text-xs hover:bg-green-mist transition-colors duration-200 ${
                  language === lang.code ? 'bg-green-mist text-main-green' : 'text-green-mid'
                }`}
              >
                <img src={lang.flag} alt={lang.label} className="w-5 h-5 object-contain" />
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Desktop WhatsApp CTA */}
        <a
          href={`https://wa.me/${CONTACT_CONFIG.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-main-green text-white px-5 py-2.5 rounded-full text-xs font-medium tracking-[1.5px] uppercase hover:bg-gold-accent hover:text-main-green hover:shadow-xl transition-all duration-300"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.P157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </a>

        {/* Cart Icon */}
        <button
          onClick={() => navigate('/panier')}
          className="relative flex items-center justify-center w-10 h-10 bg-green-mist rounded-full hover:bg-green-pale transition-colors duration-300"
        >
          <svg className="w-5 h-5 text-main-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {cartQuantity > 0 && (
            <span className="absolute -top-1 -right-1 bg-gold-accent text-main-green text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {cartQuantity}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Right Side */}
      <div className="md:hidden flex items-center gap-2">
        {/* Mobile Cart Icon */}
        <button
          onClick={() => navigate('/panier')}
          className="relative flex items-center justify-center w-10 h-10 bg-green-mist rounded-full hover:bg-green-pale transition-colors duration-300"
        >
          <svg className="w-5 h-5 text-main-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {cartQuantity > 0 && (
            <span className="absolute -top-1 -right-1 bg-gold-accent text-main-green text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {cartQuantity}
            </span>
          )}
        </button>

        {/* Mobile Hamburger */}
        <button
          className="flex flex-col gap-1.5 cursor-pointer p-2 group z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className={`w-[22px] h-[1.5px] bg-text-dark transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-[22px] h-[1.5px] bg-text-dark transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-[22px] h-[1.5px] bg-text-dark transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-[60px] left-0 right-0 bg-bg-light border-b border-border shadow-xl animate-fade-in md:hidden max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col py-6 px-6">
            {mainNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateToSection(item.id)}
                className="text-left py-4 text-base font-medium text-green-mid hover:text-main-green transition-colors duration-200 border-b border-border/50 last:border-0 active:scale-95"
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile Catalogue */}
            <div className="border-b border-border/50">
              <button
                onClick={() => setIsMobileCatalogueOpen(!isMobileCatalogueOpen)}
                className="w-full text-left py-4 text-base font-medium text-green-mid hover:text-main-green transition-colors duration-200 flex items-center justify-between active:scale-95"
              >
                {t.nav.catalogue}
                <svg className={`w-5 h-5 transition-transform duration-300 ${isMobileCatalogueOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isMobileCatalogueOpen && (
                <div className="pl-4 pb-4 animate-fade-in">
                  {catalogueItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => navigateToSection(item.id)}
                      className="w-full text-left py-3 text-base text-green-mid hover:text-main-green transition-colors duration-200 active:scale-95"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Language Selector */}
            <div className="py-5 border-b border-border/50">
              <div className="text-xs uppercase tracking-wider text-green-mid mb-4">Langue</div>
              <div className="flex gap-3 flex-wrap">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as 'fr' | 'en' | 'es')}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 active:scale-95 ${
                      language === lang.code 
                        ? 'bg-green-mist text-main-green' 
                        : 'text-green-mid hover:bg-green-mist'
                    }`}
                  >
                    <img src={lang.flag} alt={lang.label} className="w-6 h-6 object-contain" />
                    <span className="text-sm font-medium">{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile WhatsApp CTA */}
            <div className="pt-5">
              <a
                href={`https://wa.me/${CONTACT_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-main-green text-white px-6 py-4 rounded-full text-base font-medium hover:bg-gold-accent hover:text-main-green hover:shadow-xl transition-all duration-300 active:scale-95"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.P157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Contact via WhatsApp</span>
              </a>
            </div>

            {/* Mobile Cart */}
            <div className="pt-4">
              <button
                onClick={() => navigate('/panier')}
                className="relative flex items-center justify-center gap-2 w-full bg-green-mist text-main-green px-6 py-3 rounded-full text-sm font-medium hover:bg-green-pale transition-colors duration-300 active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Panier
                {cartQuantity > 0 && (
                  <span className="bg-gold-accent text-main-green text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    {cartQuantity}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
