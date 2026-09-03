import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLanguage } from '../context/LanguageContext'

export default function Apropos() {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>()
  const { t } = useLanguage()

  const scrollToServices = () => {
    const element = document.getElementById('jardinage')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="apropos" className="py-12 md:py-16 lg:py-20 px-[6vw]">
      <div
        ref={ref}
        className={`max-w-6xl lg:max-w-7xl mx-auto ${
          isVisible ? 'reveal visible' : 'reveal'
        }`}
      >
        {/* Title Section */}
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <h2 className="font-serif text-xl md:text-2xl lg:text-3xl font-semibold text-main-green mb-4 md:mb-6 leading-normal">
            {t.apropos.title}
          </h2>
          <div className="w-12 md:w-16 h-0.5 bg-gold-accent mx-auto" />
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Image Column */}
          <div className="order-1 md:order-1">
            <div className="relative overflow-hidden shadow-md">
              <img
                src="/images/jardin1.jpg"
                alt="Jardins du Paradis"
                className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
              />
            </div>
          </div>

          {/* Text Column */}
          <div className="order-2 md:order-2">
            <p 
              className="text-sm md:text-base lg:text-lg text-text-mid leading-6 md:leading-7 mb-6 md:mb-8 text-justify"
              dangerouslySetInnerHTML={{ __html: t.apropos.description }}
            />

            {/* CTA Button */}
            <button
              onClick={scrollToServices}
              className="inline-flex items-center gap-2 border-2 border-main-green text-main-green bg-white px-6 md:px-8 py-2.5 md:py-3 text-xs md:text-sm font-medium tracking-wider uppercase hover:bg-main-green hover:text-white transition-all duration-300"
            >
              {t.apropos.cta}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
