import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Realisations() {
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>()
  const [gridRef, gridVisible] = useScrollReveal<HTMLDivElement>()

  // Placeholder images - will be replaced with real project photos
  const placeholderImages = [
    '/images/jardin1.jpg',
    '/images/jardin2.jpg',
    '/images/jardin3.jpg',
    '/images/jardin4.jpg',
    '/images/jardin5.jpg',
    '/images/jardin6.jpg',
  ]

  return (
    <section id="realisations" className="py-16 md:py-24 px-[6vw] bg-warm-white">
      <div
        ref={headerRef}
        className={`text-center mb-12 md:mb-16 ${headerVisible ? 'reveal visible' : 'reveal'}`}
      >
        <div className="text-[10px] md:text-[11px] tracking-[3px] uppercase text-green-mid mb-4 md:mb-6 font-normal">
          Portfolio
        </div>
        <h2 className="font-serif text-[clamp(24px,4vw,44px)] font-normal leading-tight text-main-green mb-3 md:mb-4">
          Nos Réalisations
        </h2>
        <div className="w-[60px] h-0.5 bg-gold-accent mx-auto mt-3 md:mt-4 rounded-sm" />
        <p className="text-sm md:text-sm text-text-light max-w-[520px] mx-auto leading-relaxed mt-3 md:mt-4 px-4">
          Découvrez nos projets d'aménagement paysager réalisés pour particuliers et professionnels.
        </p>
      </div>

      <div
        ref={gridRef}
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 ${gridVisible ? 'reveal visible' : 'reveal'}`}
      >
        {placeholderImages.map((image, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-xl cursor-pointer"
          >
            <div className="aspect-[4/3] overflow-hidden bg-gray-200">
              <img
                src={image}
                alt={`Réalisation ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-white text-sm font-medium">Projet {index + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
