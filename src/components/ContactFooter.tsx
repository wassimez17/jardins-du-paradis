import { useNavigate, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { CONTACT_CONFIG } from '../config/contact'

export default function ContactFooter() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useLanguage()

  const navigateToSection = (sectionId: string) => {
    if (location.pathname === '/') {
      // Already on homepage, scroll to section
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // Navigate to homepage with hash
      navigate(`/#${sectionId}`)
    }
  }

  return (
    <footer id="contact" className="bg-main-green text-white">
      <div className="py-12 md:py-20 px-[4vw] md:px-[6vw]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand & Description */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-xl md:text-2xl text-white mb-4">Jardins du Paradis</h3>
            <p className="text-sm text-white/80 leading-relaxed mb-6">
              Votre jardinerie de confiance depuis 2007. Aménagements et entretien des espaces verts, plantes, pots, bouquets et décoration à Tanger, Maroc.
            </p>
            <div className="flex gap-3">
              <a href={CONTACT_CONFIG.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold-accent hover:text-main-green transition-all duration-300 active:scale-95">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href={CONTACT_CONFIG.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold-accent hover:text-main-green transition-all duration-300 active:scale-95">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href={`mailto:${CONTACT_CONFIG.email}`} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold-accent hover:text-main-green transition-all duration-300 active:scale-95">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
              <a href={`https://wa.me/${CONTACT_CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold-accent hover:text-main-green transition-all duration-300 active:scale-95">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a href={`https://wa.me/${CONTACT_CONFIG.whatsapp2}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold-accent hover:text-main-green transition-all duration-300 active:scale-95">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.P157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-1">
            <h4 className="font-sans text-sm font-semibold tracking-wide uppercase text-gold-accent mb-4">{t.footer.contact}</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gold-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="text-sm text-white/80">
                  Hay Mandar El Jamil, Drissia<br />
                  Tanger, Maroc
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gold-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-white/80">
                  Lundi au Dimanche : 9:00 - 21:00
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gold-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div className="text-sm text-white/80">
                  {CONTACT_CONFIG.email}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="font-sans text-sm font-semibold tracking-wide uppercase text-gold-accent mb-4">{t.footer.navigation}</h4>
            <ul className="grid grid-cols-3 gap-2">
              <li>
                <a href="/apropos" className="text-sm text-white/80 hover:text-gold-accent transition-colors duration-300 cursor-pointer active:scale-95 inline-block">
                  {t.nav.apropos}
                </a>
              </li>
              <li>
                <a href="/services" className="text-sm text-white/80 hover:text-gold-accent transition-colors duration-300 cursor-pointer active:scale-95 inline-block">
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a onClick={() => navigateToSection('plantes')} className="text-sm text-white/80 hover:text-gold-accent transition-colors duration-300 cursor-pointer active:scale-95 inline-block">
                  {t.nav.plantes}
                </a>
              </li>
              <li>
                <a onClick={() => navigateToSection('pots')} className="text-sm text-white/80 hover:text-gold-accent transition-colors duration-300 cursor-pointer active:scale-95 inline-block">
                  {t.nav.pots}
                </a>
              </li>
              <li>
                <a onClick={() => navigateToSection('jardinage')} className="text-sm text-white/80 hover:text-gold-accent transition-colors duration-300 cursor-pointer active:scale-95 inline-block">
                  {t.nav.jardinage}
                </a>
              </li>
              <li>
                <a onClick={() => navigateToSection('soins')} className="text-sm text-white/80 hover:text-gold-accent transition-colors duration-300 cursor-pointer active:scale-95 inline-block">
                  {t.nav.soins}
                </a>
              </li>
              <li>
                <a onClick={() => navigateToSection('oiseaux')} className="text-sm text-white/80 hover:text-gold-accent transition-colors duration-300 cursor-pointer active:scale-95 inline-block">
                  {t.nav.oiseaux}
                </a>
              </li>
              <li>
                <a onClick={() => navigateToSection('bouquets')} className="text-sm text-white/80 hover:text-gold-accent transition-colors duration-300 cursor-pointer active:scale-95 inline-block">
                  {t.nav.bouquets}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact CTA */}
          <div className="md:col-span-1">
            <h4 className="font-sans text-sm font-semibold tracking-wide uppercase text-gold-accent mb-4">{t.footer.contactUs}</h4>
            <div className="space-y-3">
              <a
                href={`tel:${CONTACT_CONFIG.phone1.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 bg-gold-accent text-main-green px-5 py-3 rounded-full text-sm font-medium hover:bg-white hover:shadow-xl transition-all duration-300 shadow-lg active:scale-95 w-full justify-center"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {CONTACT_CONFIG.phone1}
              </a>
              <a
                href={`tel:${CONTACT_CONFIG.phone2.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 bg-gold-accent text-main-green px-5 py-3 rounded-full text-sm font-medium hover:bg-white hover:shadow-xl transition-all duration-300 shadow-lg active:scale-95 w-full justify-center"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {CONTACT_CONFIG.phone2}
              </a>
            </div>
            <div className="mt-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.778322109799!2d-5.8002686!3d35.756253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b814c5f712b97%3A0x8347dcf6869860f2!2sJardins%20du%20Paradis!5e0!3m2!1sfr!2sma!4v1790986990938!5m2!1sfr!2sma"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Divider & Copyright */}
      <div className="border-t border-white/10">
        <div className="py-6 px-[4vw] md:px-[6vw]">
          <div className="max-w-6xl mx-auto text-center text-xs text-white/60">
            © 2026 Jardins du Paradis · Tous droits réservés
          </div>
        </div>
      </div>
    </footer>
  )
}
