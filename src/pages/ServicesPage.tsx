import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import Navbar from '../components/Navbar'
import ContactFooter from '../components/ContactFooter'
import { CONTACT_CONFIG } from '../config/contact'

export default function ServicesPage() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    services: false,
    whyChooseUs: false,
  })

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    setIsVisible(prev => ({ ...prev, hero: true }))

    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          setIsVisible(prev => ({ ...prev, [id]: true }))
        }
      })
    }, observerOptions)

    const sections = ['features', 'services', 'whyChooseUs']
    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* HERO */}
      <section className="relative min-h-[50vh] md:min-h-[50vh] flex items-center justify-center pt-[60px] md:pt-[72px] overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient">
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(26,60,52,0.7)] via-[rgba(45,106,53,0.5)] to-[rgba(26,60,52,0.8)]" />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-[url('/images/Acceuil/hero.webp')] bg-cover bg-center opacity-15" />
        </div>

        <div 
          className={`relative z-10 max-w-4xl mx-auto px-[6vw] md:px-[6vw] text-center transition-all duration-700 ${
            isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-[10px] md:text-[11px] tracking-[1.5px] md:tracking-[3px] uppercase text-gold-accent mb-3 md:mb-8 opacity-95 drop-shadow-lg">
            {t.servicesPage.heroEyebrow}
          </div>
          <h1 className="font-serif text-[clamp(24px,8vw,48px)] md:text-[clamp(42px,5vw,72px)] font-light text-white leading-tight mb-3 md:mb-8 drop-shadow-2xl">
            {t.servicesPage.title}
          </h1>
          <p className="text-xs md:text-base text-white/90 max-w-2xl mx-auto leading-relaxed mb-4 md:mb-12 drop-shadow-lg px-2">
            {t.servicesPage.heroDescription}
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-8 md:py-12 px-[6vw] md:px-[6vw] bg-green-mist">
        <div className="max-w-7xl mx-auto">
          <div 
            className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 transition-all duration-700 delay-200 ${
              isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Expertise professionnelle */}
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-main-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p className="text-xs md:text-sm text-text-mid font-light">{t.servicesPage.features[0]}</p>
            </div>

            {/* Qualité garantie */}
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-main-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <p className="text-xs md:text-sm text-text-mid font-light">{t.servicesPage.features[1]}</p>
            </div>

            {/* Personnalisation */}
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-main-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-xs md:text-sm text-text-mid font-light">{t.servicesPage.features[2]}</p>
            </div>

            {/* Service sur mesure */}
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-main-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <p className="text-xs md:text-sm text-text-mid font-light">{t.servicesPage.features[3]}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-8 md:py-12 px-[6vw] md:px-[6vw] bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <div className="text-[10px] md:text-[11px] tracking-[1.5px] md:tracking-[2px] uppercase text-gold-accent mb-3 md:mb-4">
              {t.servicesPage.heroEyebrow}
            </div>
            <h2 className="font-serif text-2xl md:text-4xl text-main-green mb-4 md:mb-6 font-light">
              {t.servicesPage.servicesTitle}
            </h2>
            <div className="w-[40px] md:w-[60px] h-px bg-gold-accent mx-auto" />
          </div>

          <div 
            className={`grid md:grid-cols-3 gap-6 md:gap-8 transition-all duration-700 delay-200 ${
              isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {(t.servicesPage.servicesList as any[]).map((service, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6 md:p-8 bg-white relative">
                  <h3 className="font-serif text-lg md:text-xl text-main-green mb-3 font-light">
                    {service.title}
                  </h3>
                  <p className="text-xs md:text-sm text-text-mid leading-relaxed mb-4 md:mb-6 line-clamp-3">
                    {service.description}
                  </p>
                  <a
                    href={`https://wa.me/${CONTACT_CONFIG.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-main-green text-white px-5 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm tracking-[1.5px] uppercase font-medium hover:bg-gold-accent hover:text-main-green hover:shadow-xl transition-all duration-300 w-full justify-center"
                  >
                    {t.servicesPage.contactCta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="whyChooseUs" className="py-8 md:py-12 px-[6vw] md:px-[6vw] bg-green-mist">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <div className="text-[10px] md:text-[11px] tracking-[1.5px] md:tracking-[2px] uppercase text-gold-accent mb-3 md:mb-4">
              {t.servicesPage.heroEyebrow}
            </div>
            <h2 className="font-serif text-2xl md:text-4xl text-main-green mb-4 md:mb-6 font-light">
              {t.servicesPage.whyChooseUs.title}
            </h2>
            <p className="text-sm md:text-base text-text-mid max-w-2xl mx-auto leading-relaxed">
              {t.servicesPage.whyChooseUs.description}
            </p>
          </div>

          <div 
            className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 transition-all duration-700 delay-200 ${
              isVisible.whyChooseUs ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {(t.servicesPage.whyChooseUs.items as any[]).map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-green-mist rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-main-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg md:text-xl text-main-green mb-3 font-light">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-text-mid leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <div className="py-8 md:py-12 px-[6vw] md:px-[6vw] bg-white text-center">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-main-green hover:text-gold-accent transition-colors duration-300"
        >
          <svg className="w-4 md:w-5 h-4 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-xs md:text-sm font-medium">{t.common.backToHome}</span>
        </button>
      </div>

      <ContactFooter />
    </div>
  )
}
