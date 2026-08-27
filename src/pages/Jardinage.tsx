import { useScrollReveal } from '../hooks/useScrollReveal'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { jardinImages } from '../constants/products'

interface JardinageProps {
  showAllLink?: string
}

export default function Jardinage({ showAllLink }: JardinageProps) {
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>()
  const [galleryRef, galleryVisible] = useScrollReveal<HTMLDivElement>()
  const [ctaRef, ctaVisible] = useScrollReveal<HTMLDivElement>()
  const { t } = useLanguage()

  const row1Images = jardinImages.slice(0, 4)
  const row2Images = jardinImages.slice(4, 8)

  return (
    <section id="jardinage" className="bg-main-green py-16 md:py-24 px-3 sm:px-[6vw]">
      <div
        ref={headerRef}
        className={`text-center mb-12 md:mb-16 ${headerVisible ? 'reveal visible' : 'reveal'}`}
      >
        <div className="text-[10px] md:text-[11px] tracking-[3px] uppercase text-gold-accent mb-4 md:mb-6 font-normal">
          Services
        </div>
        <h2 className="font-serif text-[clamp(24px,4vw,44px)] font-normal leading-tight text-white mb-3 md:mb-4">
          {t.jardinage.title}
        </h2>
        <div className="w-[60px] h-0.5 bg-gold-accent mx-auto mt-3 md:mt-4 rounded-sm" />
        <p className="text-sm md:text-sm text-white/90 max-w-[520px] mx-auto leading-relaxed mt-3 md:mt-4 px-4">
          {t.jardinage.description}
        </p>
      </div>

      <div
        ref={galleryRef}
        className={`mb-8 md:mb-12 ${galleryVisible ? 'reveal visible' : 'reveal'}`}
      >
        <div className="columns-2 sm:columns-4 gap-3 md:gap-4">
          {[...row1Images, ...row2Images].map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg md:rounded-xl break-inside-avoid mb-3 md:mb-4"
            >
              <div className="bg-[rgba(26,60,52,0.5)] border border-[rgba(197,160,89,0.3)] rounded-lg md:rounded-xl overflow-hidden transition-all duration-300 hover:bg-[rgba(197,160,89,0.2)] hover:scale-[1.02]">
                <img
                  src={image}
                  alt={`Jardin ${index + 1}`}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={ctaRef}
        className={`text-center ${ctaVisible ? 'reveal visible' : 'reveal'}`}
      >
        {showAllLink ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to={showAllLink}
              className="inline-flex items-center gap-2.5 bg-white/10 border-2 border-white/30 text-white px-6 md:px-8 py-2.5 md:py-3.5 rounded-full text-xs tracking-[1.5px] uppercase no-underline transition-all cursor-pointer hover:bg-white/20 hover:border-white/50"
            >
              Voir toutes nos réalisations →
            </Link>
            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-gold-accent text-main-green px-6 md:px-8 py-2.5 md:py-3.5 rounded-full text-xs tracking-[1.5px] uppercase no-underline transition-all border-none cursor-pointer hover:bg-white hover:shadow-xl shadow-lg"
            >
              {t.jardinage.cta}
            </a>
          </div>
        ) : (
          <a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-gold-accent text-main-green px-6 md:px-8 py-2.5 md:py-3.5 rounded-full text-xs tracking-[1.5px] uppercase no-underline transition-all border-none cursor-pointer hover:bg-white hover:shadow-xl shadow-lg"
          >
            {t.jardinage.cta}
          </a>
        )}
      </div>
    </section>
  )
}
