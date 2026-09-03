import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLanguage } from '../context/LanguageContext'

export default function Categories() {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>()
  const { t } = useLanguage()

  const categories = [
    { id: 'plantes', label: t.nav.plantes, image: '/images/plant1.jpg' },
    { id: 'pots', label: t.nav.pots, image: '/images/pot1.jpg' },
    { id: 'jardinage', label: t.nav.jardinage, image: '/images/jardin1.jpg' },
    { id: 'soins', label: t.nav.soins, image: '/images/med1.jpg' },
    { id: 'oiseaux', label: t.nav.oiseaux, image: '/images/bird1.jpg' },
    { id: 'bouquets', label: t.nav.bouquets, image: '/images/fleur1.jpg' },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="py-6 md:py-8 px-[6vw] bg-green-mist">
      <div
        ref={ref}
        className={`grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-8 justify-items-center ${
          isVisible ? 'reveal visible' : 'reveal'
        }`}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => scrollToSection(category.id)}
            className="group flex flex-col items-center gap-3 cursor-pointer"
          >
            <div className="relative w-[90px] h-[90px] md:w-[120px] md:h-[120px] rounded-full overflow-hidden border-2 border-green-pale transition-all duration-300 group-hover:border-gold-accent group-hover:shadow-lg">
              <img
                src={category.image}
                alt={category.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <span className="text-xs md:text-sm font-medium text-main-green group-hover:text-gold-accent transition-colors duration-300 uppercase tracking-wider">
              {category.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
