import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import Navbar from '../components/Navbar'
import ContactFooter from '../components/ContactFooter'
import { jardinImages } from '../constants/products'
import { CONTACT_CONFIG } from '../config/contact'

export default function JardinagePage() {
  const { t } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-[72px] pb-16 px-[6vw] bg-green-mist">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif text-[clamp(28px,4vw,44px)] font-normal text-main-green mb-4">
            {t.sections.jardinage.title}
          </h1>
          <div className="w-[60px] h-0.5 bg-gold-accent mx-auto mb-4 rounded-sm" />
          <p className="text-sm text-text-mid max-w-2xl mx-auto mb-12">
            {t.sections.jardinage.description}
          </p>
          <div className="columns-2 lg:columns-4 gap-3 md:gap-4 mb-12">
            {jardinImages.map((image, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg md:rounded-xl break-inside-avoid mb-3 md:mb-4">
                <img
                  src={image}
                  alt={`${t.sections.realisations.project} ${index + 1}`}
                  className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href={`https://wa.me/${CONTACT_CONFIG.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-gold-accent text-main-green px-8 py-4 rounded-full font-semibold text-base shadow-lg hover:bg-white hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
            >
              {t.jardinage.cta}
            </a>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-main-green hover:text-gold-accent transition-colors duration-300 mt-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm font-medium">{t.common.seeMore}</span>
          </Link>
        </div>
      </section>
      <ContactFooter />
    </div>
  )
}
