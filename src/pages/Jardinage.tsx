import { useScrollReveal } from '../hooks/useScrollReveal'
import { jardinImages } from '../constants/products'

export default function Jardinage() {
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>()
  const [masonryRef, masonryVisible] = useScrollReveal<HTMLDivElement>()
  const [ctaRef, ctaVisible] = useScrollReveal<HTMLDivElement>()

  return (
    <section id="jardinage" className="bg-main-green py-24 px-[6vw]">
      <div
        ref={headerRef}
        className={`text-center mb-16 ${headerVisible ? 'reveal visible' : 'reveal'}`}
      >
        <div className="text-[11px] tracking-[3px] uppercase text-green-mid mb-6 font-normal">
          Galerie de réalisations
        </div>
        <h2 className="font-serif text-[clamp(28px,3vw,44px)] font-normal leading-tight text-white mb-4">
          Jardinage &amp; Aménagement
        </h2>
        <div className="w-[60px] h-0.5 bg-green-pale mx-auto mt-4 rounded-sm" />
        <p className="text-sm text-[rgba(200,230,202,0.8)] max-w-[520px] mx-auto leading-relaxed mt-4">
          Découvrez nos projets d'aménagement paysager réalisés pour particuliers et
          professionnels à travers tout le Maroc.
        </p>
      </div>

      <div
        ref={masonryRef}
        className={`columns-1 md:columns-2 lg:columns-4 gap-4 mb-12 ${
          masonryVisible ? 'reveal visible' : 'reveal'
        }`}
      >
        {jardinImages.map((image, index) => (
          <div
            key={index}
            className="break-inside-avoid mb-4 rounded-xl overflow-hidden relative"
          >
            <div className="bg-[rgba(45,106,53,0.6)] border border-[rgba(200,230,202,0.2)] rounded-xl overflow-hidden transition-all duration-300 hover:bg-[rgba(74,155,82,0.5)] hover:scale-[1.02]">
              <img
                src={image}
                alt={`Jardin ${index + 1}`}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      <div
        ref={ctaRef}
        className={`text-center ${ctaVisible ? 'reveal visible' : 'reveal'}`}
      >
        <a
          href="#contact"
          className="inline-flex items-center gap-2.5 bg-green-light text-white px-8 py-3.5 rounded-full text-xs tracking-[1.5px] uppercase no-underline transition-all border-none cursor-pointer hover:bg-white hover:text-main-green"
        >
          Contactez-nous <span>?</span>
        </a>
      </div>
    </section>
  )
}
