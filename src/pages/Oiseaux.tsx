import { useScrollReveal } from '../hooks/useScrollReveal'
import { useModal } from '../hooks/useModal'
import { oiseaux } from '../constants/products'
import Card from '../components/Card'
import ProductModal from '../components/ProductModal'

export default function Oiseaux() {
  const { isOpen, selectedProduct, openModal, closeModal } = useModal()
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>()
  const [gridRef, gridVisible] = useScrollReveal<HTMLDivElement>()

  return (
    <section id="oiseaux" className="py-16 md:py-24 px-3 sm:px-[6vw] bg-warm-white">
      <div
        ref={headerRef}
        className={`text-center mb-12 md:mb-16 ${headerVisible ? 'reveal visible' : 'reveal'}`}
      >
        <div className="text-[10px] md:text-[11px] tracking-[3px] uppercase text-green-mid mb-4 md:mb-6 font-normal">
          Nos compagnons ailés
        </div>
        <h2 className="font-serif text-[clamp(24px,4vw,44px)] font-normal leading-tight text-main-green mb-3 md:mb-4">
          Oiseaux
        </h2>
        <div className="w-[60px] h-0.5 bg-gold-accent mx-auto mt-3 md:mt-4 rounded-sm" />
        <p className="text-sm md:text-sm text-text-light max-w-[520px] mx-auto leading-relaxed mt-3 md:mt-4 px-4">
          Adoptez un compagnon ailé pour animer votre maison ou jardin avec leurs chants
          mélodieux.
        </p>
      </div>

      <div
        ref={gridRef}
        className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-2 sm:gap-3 md:gap-8 max-w-[700px] mx-auto ${
          gridVisible ? 'reveal visible' : 'reveal'
        }`}
      >
        {oiseaux.map((product) => (
          <Card key={product.id} product={product} onOpenModal={openModal} />
        ))}
      </div>

      <ProductModal isOpen={isOpen} product={selectedProduct} onClose={closeModal} />
    </section>
  )
}
