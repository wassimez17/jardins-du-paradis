import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useModal } from '../hooks/useModal'
import { Product } from '../types'
import Card from '../components/Card'
import ProductModal from '../components/ProductModal'

interface ProductsSectionProps {
  id: string
  eyebrow: string
  title: string
  description: string
  products: Product[]
  initialShow?: number
}

export default function ProductsSection({
  id,
  eyebrow,
  title,
  description,
  products,
  initialShow = 3,
}: ProductsSectionProps) {
  const [showAll, setShowAll] = useState(false)
  const { isOpen, selectedProduct, openModal, closeModal } = useModal()
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>()
  const [gridRef, gridVisible] = useScrollReveal<HTMLDivElement>()
  const [extraRef, extraVisible] = useScrollReveal<HTMLDivElement>()

  const visibleProducts = showAll ? products : products.slice(0, initialShow)
  const extraProducts = products.slice(initialShow)

  return (
    <section id={id} className="py-24 px-[6vw]">
      <div
        ref={headerRef}
        className={`text-center mb-16 ${headerVisible ? 'reveal visible' : 'reveal'}`}
      >
        <div className="text-[11px] tracking-[3px] uppercase text-green-mid mb-6 font-normal">
          {eyebrow}
        </div>
        <h2 className="font-serif text-[clamp(28px,3vw,44px)] font-normal leading-tight text-main-green mb-4">
          {title}
        </h2>
        <div className="w-[60px] h-0.5 bg-gold-accent mx-auto mt-4 rounded-sm" />
        <p className="text-sm text-text-light max-w-[520px] mx-auto leading-relaxed mt-4">
          {description}
        </p>
      </div>

      <div
        ref={gridRef}
        className={`grid md:grid-cols-3 gap-7 mb-12 ${gridVisible ? 'reveal visible' : 'reveal'}`}
      >
        {visibleProducts.map((product) => (
          <Card key={product.id} product={product} onOpenModal={openModal} />
        ))}
      </div>

      {extraProducts.length > 0 && (
        <div
          ref={extraRef}
          className={`grid md:grid-cols-3 gap-7 mb-8 mt-7 ${
            showAll ? 'grid' : 'hidden'
          } ${extraVisible ? 'reveal visible' : 'reveal'}`}
        >
          {extraProducts.map((product) => (
            <Card key={product.id} product={product} onOpenModal={openModal} />
          ))}
        </div>
      )}

      {extraProducts.length > 0 && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className={`inline-flex items-center gap-2.5 border-[1.5px] border-main-green text-main-green bg-transparent px-9 py-3 rounded-full text-xs tracking-[1.5px] uppercase cursor-pointer transition-all font-sans font-normal hover:bg-main-green hover:text-white ${
              showAll ? 'bg-main-green text-white' : ''
            }`}
          >
            {showAll ? 'Réduire ?' : `Voir tout ? ${products.length} ${id === 'plantes' ? 'plantes' : id === 'pots' ? 'pots' : 'bouquets'}`}
          </button>
        </div>
      )}

      <ProductModal isOpen={isOpen} product={selectedProduct} onClose={closeModal} />
    </section>
  )
}
