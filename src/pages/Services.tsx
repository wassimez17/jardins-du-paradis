import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLanguage } from '../context/LanguageContext'

export default function Services() {
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>()
  const [gridRef, gridVisible] = useScrollReveal<HTMLDivElement>()
  const { t } = useLanguage()

  const services = [
    {
      id: 1,
      icon: '🌳',
      title: t.sections.services.aménagement,
      description: t.sections.services.aménagementDesc,
    },
    {
      id: 2,
      icon: '🔧',
      title: t.sections.services.entretien,
      description: t.sections.services.entretienDesc,
    },
    {
      id: 3,
      icon: '🌱',
      title: t.sections.services.plantation,
      description: t.sections.services.plantationDesc,
    },
    {
      id: 4,
      icon: '💐',
      title: t.sections.services.décoration,
      description: t.sections.services.décorationDesc,
    },
  ]

  return (
    <section id="services" className="py-16 md:py-24 px-[6vw] bg-soft-white">
      <div
        ref={headerRef}
        className={`text-center mb-12 md:mb-16 ${headerVisible ? 'reveal visible' : 'reveal'}`}
      >
        <div className="text-[10px] md:text-[11px] tracking-[3px] uppercase text-green-mid mb-4 md:mb-6 font-normal">
          {t.sections.services.eyebrow}
        </div>
        <h2 className="font-serif text-[clamp(24px,4vw,44px)] font-normal leading-tight text-main-green mb-3 md:mb-4">
          {t.sections.services.title}
        </h2>
        <div className="w-[60px] h-0.5 bg-gold-accent mx-auto mt-3 md:mt-4 rounded-sm" />
        <p className="text-sm md:text-sm text-text-light max-w-[520px] mx-auto leading-relaxed mt-3 md:mt-4 px-4">
          {t.sections.services.description}
        </p>
      </div>

      <div
        ref={gridRef}
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 ${gridVisible ? 'reveal visible' : 'reveal'}`}
      >
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl p-6 md:p-8 border border-border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="text-4xl md:text-5xl mb-4">{service.icon}</div>
            <h3 className="font-serif text-lg md:text-xl font-semibold text-main-green mb-3">
              {service.title}
            </h3>
            <p className="text-sm text-text-light leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
