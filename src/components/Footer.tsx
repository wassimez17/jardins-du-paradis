import { CONTACT_CONFIG } from '../config/contact'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-[#0d2410] text-[rgba(200,230,202,0.7)] py-10 md:py-16 px-[4vw] md:px-[6vw]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
        {/* Colonne 1 - À propos */}
        <div className="md:col-span-1">
          <h3 className="font-serif text-lg md:text-xl text-white mb-3 md:mb-4">Jardins du Paradis</h3>
          <p className="text-xs md:text-sm leading-relaxed mb-4 md:mb-6">
            Votre jardinerie de confiance depuis 2007. Aménagements et entretien des espaces verts, plantes, pots, bouquets et décoration à Tanger, Maroc.
          </p>
          <div className="flex gap-3">
            <a 
              href={CONTACT_CONFIG.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 md:w-10 md:h-10 bg-[rgba(200,230,202,0.1)] rounded-full flex items-center justify-center hover:bg-[rgba(200,230,202,0.2)] transition-colors duration-300 active:scale-95"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              href={CONTACT_CONFIG.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 md:w-10 md:h-10 bg-[rgba(200,230,202,0.1)] rounded-full flex items-center justify-center hover:bg-[rgba(200,230,202,0.2)] transition-colors duration-300 active:scale-95"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Colonne 2 - Navigation */}
        <div>
          <h3 className="font-serif text-base md:text-lg text-white mb-3 md:mb-4 uppercase tracking-wider text-xs md:text-sm">Navigation</h3>
          <ul className="space-y-2 md:space-y-3">
            <li>
              <a href="/" className="text-xs md:text-sm text-[rgba(200,230,202,0.7)] hover:text-white transition-colors duration-300">
                {t.nav.accueil}
              </a>
            </li>
            <li>
              <a href="/apropos" className="text-xs md:text-sm text-[rgba(200,230,202,0.7)] hover:text-white transition-colors duration-300">
                {t.nav.apropos}
              </a>
            </li>
            <li>
              <a href="/services" className="text-xs md:text-sm text-[rgba(200,230,202,0.7)] hover:text-white transition-colors duration-300">
                {t.nav.services}
              </a>
            </li>
            <li>
              <a href="/jardinage" className="text-xs md:text-sm text-[rgba(200,230,202,0.7)] hover:text-white transition-colors duration-300">
                {t.nav.jardinage}
              </a>
            </li>
          </ul>
        </div>

        {/* Colonne 3 - Catalogue */}
        <div>
          <h3 className="font-serif text-base md:text-lg text-white mb-3 md:mb-4 uppercase tracking-wider text-xs md:text-sm">Catalogue</h3>
          <ul className="space-y-2 md:space-y-3">
            <li>
              <a href="/plantes" className="text-xs md:text-sm text-[rgba(200,230,202,0.7)] hover:text-white transition-colors duration-300">
                {t.nav.plantes}
              </a>
            </li>
            <li>
              <a href="/pots" className="text-xs md:text-sm text-[rgba(200,230,202,0.7)] hover:text-white transition-colors duration-300">
                {t.nav.pots}
              </a>
            </li>
            <li>
              <a href="/soins" className="text-xs md:text-sm text-[rgba(200,230,202,0.7)] hover:text-white transition-colors duration-300">
                {t.nav.soins}
              </a>
            </li>
            <li>
              <a href="/oiseaux" className="text-xs md:text-sm text-[rgba(200,230,202,0.7)] hover:text-white transition-colors duration-300">
                {t.nav.oiseaux}
              </a>
            </li>
            <li>
              <a href="/bouquets" className="text-xs md:text-sm text-[rgba(200,230,202,0.7)] hover:text-white transition-colors duration-300">
                {t.nav.bouquets}
              </a>
            </li>
          </ul>
        </div>

        {/* Colonne 4 - Contact */}
        <div>
          <h3 className="font-serif text-base md:text-lg text-white mb-3 md:mb-4 uppercase tracking-wider text-xs md:text-sm">Contact</h3>
          <div className="space-y-2 md:space-y-3">
            <div className="text-[10px] md:text-xs text-[rgba(200,230,202,0.7)]">
              <a href={`mailto:${CONTACT_CONFIG.email}`} className="hover:text-white transition-colors duration-300">
                {CONTACT_CONFIG.email}
              </a>
            </div>
            <div className="text-[10px] md:text-xs text-[rgba(200,230,202,0.5)] mt-3 md:mt-4">
              Hay Mandar El Jamil, Drissia<br />
              Tanger, Maroc
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[rgba(200,230,202,0.1)] pt-4 md:pt-6 text-center text-[10px] md:text-xs text-[rgba(200,230,202,0.5)]">
        © 2024 Jardins du Paradis · Jardinerie à Tanger · Tous droits réservés
      </div>
    </footer>
  )
}