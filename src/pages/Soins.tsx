import { useScrollReveal } from '../hooks/useScrollReveal'
import { useModal } from '../hooks/useModal'
import { soins } from '../constants/products'
import ProductModal from '../components/ProductModal'

export default function Soins() {
  const { isOpen, selectedProduct, openModal, closeModal } = useModal()
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>()
  const [gridRef, gridVisible] = useScrollReveal<HTMLDivElement>()

  const handleWhatsAppClick = (e: React.MouseEvent, product: any) => {
    e.stopPropagation()
    const message = `Bonjour, je suis intéressé(e) par: ${product.title} - Prix: ${product.price}`
    window.open(`https://wa.me/212600000000?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <section id="soins" className="py-24 px-[6vw]">
      <div
        ref={headerRef}
        className={`text-center mb-16 ${headerVisible ? 'reveal visible' : 'reveal'}`}
      >
        <div className="text-[11px] tracking-[3px] uppercase text-green-mid mb-6 font-normal">
          Entretien &amp; Produits
        </div>
        <h2 className="font-serif text-[clamp(28px,3vw,44px)] font-normal leading-tight text-main-green mb-4">
          Soins des Plantes
        </h2>
        <div className="w-[60px] h-0.5 bg-gold-accent mx-auto mt-4 rounded-sm" />
        <p className="text-sm text-text-light max-w-[520px] mx-auto leading-relaxed mt-4">
          Tout ce qu'il faut pour garder vos plantes en bonne santé, des engrais naturels
          aux traitements spécialisés.
        </p>
      </div>

      <div
        ref={gridRef}
        className={`grid md:grid-cols-3 gap-7 ${gridVisible ? 'reveal visible' : 'reveal'}`}
      >
        {soins.map((product) => (
          <div
            key={product.id}
            onClick={() => openModal(product)}
            className="bg-green-mist rounded-2xl p-8 border border-border text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl cursor-pointer"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-20 h-20 object-cover rounded-lg mx-auto mb-6"
            />
            <h3 className="font-serif text-xl font-semibold text-main-green mb-3">
              {product.title}
            </h3>
            <div className="text-base font-medium text-gold-accent mb-6">
              {product.price}
            </div>
            <button
              onClick={(e) => handleWhatsAppClick(e, product)}
              className="w-full bg-main-green text-white px-4 py-2 rounded-full text-xs tracking-[1.5px] uppercase font-medium hover:bg-gold-accent transition-colors duration-300"
            >
              Commander via WhatsApp
            </button>
          </div>
        ))}
      </div>

      <ProductModal isOpen={isOpen} product={selectedProduct} onClose={closeModal} />
    </section>
  )
}
