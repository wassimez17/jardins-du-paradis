import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLanguage } from '../context/LanguageContext'
import { CONTACT_CONFIG } from '../config/contact'

export default function Reviews() {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>()
  const { t } = useLanguage()

  return (
    <section id="reviews" className="py-12 md:py-16 px-[4vw] md:px-[6vw] bg-green-mist">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto ${isVisible ? 'reveal visible' : 'reveal'}`}
      >
        <div className="text-center mb-8 md:mb-12">
          <div className="text-[10px] md:text-[11px] tracking-[1.5px] md:tracking-[2px] uppercase text-gold-accent mb-3 md:mb-4">
            {t.servicesPage.heroEyebrow}
          </div>
          <h2 className="font-serif text-2xl md:text-4xl text-main-green mb-4 md:mb-6 font-light">
            {t.servicesPage.reviews.title}
          </h2>
          <p className="text-sm md:text-base text-text-mid max-w-2xl mx-auto leading-relaxed">
            {t.servicesPage.reviews.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          {(t.servicesPage.reviews.items as any[]).map((review, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-gold-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm md:text-base text-text-mid leading-relaxed mb-6 italic">
                "{review.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-main-green rounded-full flex items-center justify-center">
                  <span className="text-white font-serif text-lg md:text-xl">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <span className="text-sm md:text-base font-medium text-main-green">
                  {review.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={`https://wa.me/${CONTACT_CONFIG.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-main-green text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-base font-medium tracking-[1.5px] uppercase hover:bg-gold-accent hover:text-main-green hover:shadow-xl transition-all duration-300 shadow-lg"
          >
            Rejoignez nos clients satisfaits
          </a>
        </div>
      </div>
    </section>
  )
}
