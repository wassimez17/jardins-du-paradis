import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLanguage } from '../context/LanguageContext'

export default function Hero() {
  const [heroRef, isVisible] = useScrollReveal<HTMLDivElement>()
  const { t } = useLanguage()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="accueil" className="relative min-h-[75vh] md:min-h-[80vh] flex items-center justify-center pt-[60px] md:pt-[72px]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-hero-gradient">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(26,60,52,0.7)] via-[rgba(45,106,53,0.5)] to-[rgba(26,60,52,0.8)]" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-[url('/images/Acceuil/hero.webp')] bg-cover bg-center opacity-15" />
      </div>

      {/* Content */}
      <div
        ref={heroRef}
        className={`relative z-10 max-w-4xl mx-auto px-[6vw] text-center ${isVisible ? 'reveal visible' : 'reveal'}`}
      >
        {/* Eyebrow */}
        <div className="text-[10px] md:text-[11px] tracking-[3px] uppercase text-gold-accent mb-6 md:mb-8 opacity-95 animate-fade-in drop-shadow-lg">
          {t.hero.eyebrow}
        </div>

        {/* H1 */}
        <h1 className="font-serif text-[clamp(36px,6vw,64px)] md:text-[clamp(42px,5vw,72px)] font-light text-white leading-tight mb-6 md:mb-8 animate-slide-up drop-shadow-2xl">
          {t.hero.title}
        </h1>

        {/* Description */}
        <p className="text-sm md:text-base text-white/90 max-w-2xl mx-auto leading-relaxed mb-8 md:mb-12 animate-fade-in-delay drop-shadow-lg">
          {t.hero.description}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay">
          <button
            onClick={() => scrollToSection('categories')}
            className="w-full sm:w-auto bg-gold-accent text-main-green px-8 md:px-10 py-3 md:py-4 rounded-full text-xs md:text-sm tracking-[1.5px] uppercase font-medium hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg"
          >
            {t.hero.ctaCatalog}
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-2 border-white/40 text-white px-8 md:px-10 py-3 md:py-4 rounded-full text-xs md:text-sm tracking-[1.5px] uppercase font-medium hover:bg-white/20 hover:border-white/60 transition-all duration-300"
          >
            {t.hero.ctaContact}
          </button>
        </div>
      </div>
    </section>
  )
}
