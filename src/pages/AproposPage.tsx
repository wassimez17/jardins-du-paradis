import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import Navbar from '../components/Navbar'
import ContactFooter from '../components/ContactFooter'
import { CONTACT_CONFIG } from '../config/contact'

export default function AproposPage() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState({
    hero: false,
    section1: false,
    section2: false,
    fullWidth: false,
    values: false,
    contact: false,
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

    const sections = ['section1', 'section2', 'fullWidth', 'values', 'contact']
    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* HERO - Large elegant hero with parallax */}
      <section className="relative min-h-[50vh] md:min-h-[50vh] flex items-center justify-center pt-[60px] md:pt-[72px] overflow-hidden">
        {/* Background Image with Overlay - Same as homepage hero */}
        <div className="absolute inset-0 bg-hero-gradient">
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(26,60,52,0.7)] via-[rgba(45,106,53,0.5)] to-[rgba(26,60,52,0.8)]" />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-[url('/images/Acceuil/hero.webp')] bg-cover bg-center opacity-15" />
        </div>

        {/* Content with fade-up animation */}
        <div 
          className={`relative z-10 max-w-4xl mx-auto px-[6vw] md:px-[6vw] text-center transition-all duration-700 ${
            isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-[10px] md:text-[11px] tracking-[1.5px] md:tracking-[3px] uppercase text-gold-accent mb-3 md:mb-8 opacity-95 drop-shadow-lg">
            {t.aboutPage.heroEyebrow}
          </div>
          <h1 className="font-serif text-[clamp(24px,8vw,48px)] md:text-[clamp(42px,5vw,72px)] font-light text-white leading-tight mb-3 md:mb-8 drop-shadow-2xl">
            {t.aboutPage.title}
          </h1>
          <p className="text-xs md:text-base text-white/90 max-w-2xl mx-auto leading-relaxed mb-4 md:mb-12 drop-shadow-lg px-2">
            {t.aboutPage.heroDescription}
          </p>
        </div>
      </section>

      {/* SECTION 1 - Text + Image */}
      <section id="section1" className="py-8 md:py-12 px-[6vw] md:px-[6vw] bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-20 items-center">
            {/* Text with fade-up */}
            <div 
              className={`transition-all duration-700 delay-200 ${
                isVisible.section1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="text-[10px] md:text-[11px] tracking-[1.5px] md:tracking-[2px] uppercase text-gold-accent mb-4 md:mb-6">
                {t.aboutPage.whoWeAre.title}
              </div>
              <h2 className="font-serif text-2xl md:text-4xl text-main-green mb-4 md:mb-8 font-light leading-tight">
                {t.aboutPage.whoWeAre.title}
              </h2>
              <div className="w-[40px] md:w-[60px] h-px bg-gold-accent mb-4 md:mb-8" />
              <p className="text-sm md:text-lg text-text-mid leading-relaxed mb-4 md:mb-6 font-light">
                {t.aboutPage.whoWeAre.description}
              </p>
              <p className="text-sm md:text-lg text-text-mid leading-relaxed font-light">
                {t.aboutPage.whoWeAre.description2}
              </p>
            </div>

            {/* Image with reveal animation */}
            <div 
              className={`relative overflow-hidden rounded-none md:rounded-2xl transition-all duration-700 ${
                isVisible.section1 ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            >
              <img
                src="/images/jardin2.jpg"
                alt="Jardins du Paradis"
                className="w-full h-[300px] md:h-[550px] object-cover transition-transform duration-700 hover:scale-103"
                style={{ transform: 'scale(1)' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 - Nos Valeurs - Image Left, Values Right */}
      <section id="section2" className="py-8 md:py-12 px-[6vw] md:px-[6vw] bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-20 items-center">
            {/* Image - LEFT */}
            <div 
              className={`relative overflow-hidden rounded-none md:rounded-2xl transition-all duration-700 ${
                isVisible.section2 ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            >
              <img
                src="/images/jardin4.jpg"
                alt="Jardins du Paradis"
                className="w-full h-[300px] md:h-[550px] object-cover"
                loading="lazy"
              />
            </div>

            {/* Values - RIGHT */}
            <div 
              className={`transition-all duration-700 delay-200 ${
                isVisible.section2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="font-serif text-2xl md:text-4xl text-main-green mb-4 md:mb-6 font-light leading-tight">
                {t.aboutPage.ourValues.title}
              </h2>
              <div className="w-[40px] md:w-[60px] h-px bg-gold-accent mb-4 md:mb-8" />
              <p className="text-sm md:text-lg text-text-mid leading-relaxed font-light mb-8 md:mb-12">
                {t.aboutPage.ourValues.description}
              </p>

              {/* Progress Bars */}
              <div className="space-y-6 md:space-y-8">
                {/* Qualité */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm md:text-lg text-main-green font-light">{t.aboutPage.ourValues.quality}</span>
                    <span className="text-sm md:text-lg text-main-green font-light">92%</span>
                  </div>
                  <div className="w-full h-1 bg-green-mist rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-main-green rounded-full transition-all duration-1000 ease-out"
                      style={{ width: isVisible.section2 ? '92%' : '0%' }}
                    />
                  </div>
                </div>

                {/* Savoir-faire */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm md:text-lg text-main-green font-light">{t.aboutPage.ourValues.expertise}</span>
                    <span className="text-sm md:text-lg text-main-green font-light">88%</span>
                  </div>
                  <div className="w-full h-1 bg-green-mist rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-main-green rounded-full transition-all duration-1000 ease-out delay-100"
                      style={{ width: isVisible.section2 ? '88%' : '0%' }}
                    />
                  </div>
                </div>

                {/* Proximité & accompagnement */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm md:text-lg text-main-green font-light">{t.aboutPage.ourValues.proximity}</span>
                    <span className="text-sm md:text-lg text-main-green font-light">95%</span>
                  </div>
                  <div className="w-full h-1 bg-green-mist rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-main-green rounded-full transition-all duration-1000 ease-out delay-200"
                      style={{ width: isVisible.section2 ? '95%' : '0%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION - Left: Contact Info, Right: Map */}
      <section id="contact" className="py-8 md:py-12 px-[6vw] md:px-[6vw] bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-0">
            {/* LEFT - Contact Information */}
            <div 
              className={`bg-green-mist p-8 md:p-16 transition-all duration-700 ${
                isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="font-serif text-2xl md:text-4xl text-main-green mb-4 md:mb-8 font-light">
                {t.aboutPage.contact.title}
              </h2>
              <div className="w-[40px] md:w-[60px] h-px bg-gold-accent mb-6 md:mb-12" />

              <div className="space-y-6 md:space-y-8 mb-8 md:mb-12">
                {/* Address */}
                <div>
                  <h3 className="text-xs md:text-sm uppercase tracking-wider text-main-green mb-2">{t.aboutPage.contact.address}</h3>
                  <p className="text-sm md:text-base text-text-mid leading-relaxed">
                    Hay Mandar El Jamil, Drissia
                    <br />
                    Tanger, Maroc
                  </p>
                </div>

                {/* Phone 1 */}
                <div>
                  <h3 className="text-xs md:text-sm uppercase tracking-wider text-main-green mb-2">{t.aboutPage.contact.phone}</h3>
                  <a 
                    href={`tel:${CONTACT_CONFIG.phone1.replace(/\s/g, '')}`}
                    className="text-sm md:text-base text-text-mid hover:text-main-green transition-colors block"
                  >
                    {CONTACT_CONFIG.phone1} ({CONTACT_CONFIG.phone1Name})
                  </a>
                  <a 
                    href={`tel:${CONTACT_CONFIG.phone2.replace(/\s/g, '')}`}
                    className="text-sm md:text-base text-text-mid hover:text-main-green transition-colors block"
                  >
                    {CONTACT_CONFIG.phone2} ({CONTACT_CONFIG.phone2Name})
                  </a>
                </div>

                {/* Email */}
                <div>
                  <h3 className="text-xs md:text-sm uppercase tracking-wider text-main-green mb-2">{t.aboutPage.contact.email}</h3>
                  <a 
                    href={`mailto:${CONTACT_CONFIG.email}`}
                    className="text-sm md:text-base text-text-mid hover:text-main-green transition-colors"
                  >
                    {CONTACT_CONFIG.email}
                  </a>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-xs md:text-sm uppercase tracking-wider text-main-green mb-2 md:mb-3">{t.aboutPage.contact.followUs}</h3>
                  <div className="flex gap-3 md:gap-4">
                    <a
                      href={CONTACT_CONFIG.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm md:text-base text-text-mid hover:text-main-green transition-colors"
                    >
                      Facebook
                    </a>
                    <a
                      href={CONTACT_CONFIG.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm md:text-base text-text-mid hover:text-main-green transition-colors"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${CONTACT_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-main-green text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-xs md:text-sm tracking-[1.5px] uppercase font-medium hover:bg-gold-accent hover:text-main-green hover:shadow-xl transition-all duration-300"
              >
                <svg className="w-4 md:w-5 h-4 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.P157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t.aboutPage.contact.whatsappCta}
              </a>
            </div>

            {/* RIGHT - Google Maps */}
            <div 
              className={`relative h-[300px] md:h-auto transition-all duration-700 delay-200 ${
                isVisible.contact ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.778322109799!2d-5.8002686!3d35.756253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b814c5f712b97%3A0x8347dcf6869860f2!2sJardins%20du%20Paradis!5e0!3m2!1sfr!2sma!4v1790986990938!5m2!1sfr!2sma"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Jardins du Paradis Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home Button */}
      <div className="py-8 md:py-12 px-[6vw] md:px-[6vw] bg-white text-center">
        <button
          onClick={() => window.location.href = '/'}
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
