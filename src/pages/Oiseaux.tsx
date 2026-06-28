import { useScrollReveal } from '../hooks/useScrollReveal'
import { useModal } from '../hooks/useModal'
import { oiseaux } from '../constants/products'
import ProductModal from '../components/ProductModal'

export default function Oiseaux() {
  const { isOpen, selectedProduct, openModal, closeModal } = useModal()
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>()
  const [gridRef, gridVisible] = useScrollReveal<HTMLDivElement>()

  const handleWhatsAppClick = (e: React.MouseEvent, product: any) => {
    e.stopPropagation()
    const message = `Bonjour, je suis intéressé(e) par: ${product.title} - Prix: ${product.price}`
    window.open(`https://wa.me/212600000000?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <section id="oiseaux" className="py-24 px-[6vw] bg-warm-white">
      <div
        ref={headerRef}
        className={`text-center mb-16 ${headerVisible ? 'reveal visible' : 'reveal'}`}
      >
        <div className="text-[11px] tracking-[3px] uppercase text-green-mid mb-6 font-normal">
          Nos compagnons ailés
        </div>
        <h2 className="font-serif text-[clamp(28px,3vw,44px)] font-normal leading-tight text-main-green mb-4">
          Oiseaux
        </h2>
        <div className="w-[60px] h-0.5 bg-gold-accent mx-auto mt-4 rounded-sm" />
        <p className="text-sm text-text-light max-w-[520px] mx-auto leading-relaxed mt-4">
          Adoptez un compagnon ailé pour animer votre maison ou jardin avec leurs chants
          mélodieux.
        </p>
      </div>

      <div
        ref={gridRef}
        className={`grid md:grid-cols-2 gap-8 max-w-[700px] mx-auto ${
          gridVisible ? 'reveal visible' : 'reveal'
        }`}
      >
        {oiseaux.map((product) => (
          <div
            key={product.id}
            onClick={() => openModal(product)}
            className="bg-white rounded-2xl overflow-hidden border border-border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer"
          >
            <div className="h-[260px] overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="font-serif text-2xl font-semibold text-main-green mb-1.5">
                {product.title}
              </h3>
              <div className="text-xl font-medium text-gold-accent mb-4">
                {product.price}
              </div>
              <button
                onClick={(e) => handleWhatsAppClick(e, product)}
                className="w-full bg-main-green text-white px-4 py-2 rounded-full text-xs tracking-[1.5px] uppercase font-medium hover:bg-gold-accent transition-colors duration-300"
              >
                Commander via WhatsApp
              </button>
            </div>
          </div>
        ))}
      </div>

      <ProductModal isOpen={isOpen} product={selectedProduct} onClose={closeModal} />
    </section>
  )
}
