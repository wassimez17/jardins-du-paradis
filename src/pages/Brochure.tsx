import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLanguage } from '../context/LanguageContext'

export default function Brochure() {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>()
  const { t } = useLanguage()

  return (
    <section className="py-8 md:py-10 px-[6vw] bg-green-mist">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto text-center ${isVisible ? 'reveal visible' : 'reveal'}`}
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-main-green rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-gold-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div className="text-left md:text-center flex-1">
            <h2 className="font-sans text-lg md:text-xl font-semibold tracking-wide text-main-green mb-2 uppercase whitespace-nowrap">
              {t.brochure.title}
            </h2>
            <p className="text-xs md:text-sm text-text-mid leading-relaxed">
              {t.brochure.description}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/documents/jardins-du-paradis.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-main-green text-white px-5 py-2 rounded-full text-xs tracking-[1.5px] uppercase font-medium hover:bg-gold-accent hover:text-main-green hover:shadow-lg transition-all duration-300 whitespace-nowrap"
            >
              {t.brochure.viewPdf}
            </a>
            <a
              href="/documents/jardins-du-paradis.pdf"
              download
              className="inline-flex items-center gap-2 bg-white border-2 border-main-green text-main-green px-5 py-2 rounded-full text-xs tracking-[1.5px] uppercase font-medium hover:bg-main-green hover:text-white transition-all duration-300 whitespace-nowrap"
            >
              {t.brochure.downloadPdf}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
