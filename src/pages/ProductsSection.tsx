import { useState } from 'react'
import { Link } from 'react-router-dom'
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
  showAllLink?: string
  showAllText?: string
}

export default function ProductsSection({
  id,
  eyebrow,
  title,
  description,
  products,
  initialShow = 3,
  showAllLink,
  showAllText,
}: ProductsSectionProps) {
  const [showAll, setShowAll] = useState(false)
  const { isOpen, selectedProduct, openModal, closeModal } = useModal()
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>()
  const [gridRef, gridVisible] = useScrollReveal<HTMLDivElement>()
  const [extraRef, extraVisible] = useScrollReveal<HTMLDivElement>()

  const visibleProducts = showAll ? products : products.slice(0, initialShow)
  const extraProducts = products.slice(initialShow)

  return (
    <section id={id} className="py-10 md:py-16 px-3 sm:px-[6vw]">
      <div
        ref={headerRef}
        className={`text-center mb-8 md:mb-10 ${headerVisible ? 'reveal visible' : 'reveal'}`}
      >
        <div className="text-[10px] md:text-[11px] tracking-[3px] uppercase text-green-mid mb-4 md:mb-6 font-normal">
          {eyebrow}
        </div>
        <h2 className="font-serif text-[clamp(24px,4vw,44px)] font-normal leading-tight text-main-green mb-3 md:mb-4">
          {title}
        </h2>
        <div className="w-[60px] h-0.5 bg-gold-accent mx-auto mt-3 md:mt-4 rounded-sm" />
        <p className="text-sm md:text-sm text-text-mid max-w-[520px] mx-auto leading-relaxed mt-3 md:mt-4 px-4">
          {description}
        </p>
      </div>

      <div
        ref={gridRef}
        className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-5 mb-6 md:mb-8 ${gridVisible ? 'reveal visible' : 'reveal'}`}
      >
        {visibleProducts.map((product) => (
          <Card key={product.id} product={product} onOpenModal={openModal} />
        ))}
      </div>

      {extraProducts.length > 0 && (
        <div
          ref={extraRef}
          className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-5 mb-6 md:mb-8 mt-5 md:mt-7 ${
            showAll ? 'grid' : 'hidden'
          } ${extraVisible ? 'reveal visible' : 'reveal'}`}
        >
          {extraProducts.map((product) => (
            <Card key={product.id} product={product} onOpenModal={openModal} />
          ))}
        </div>
      )}

      {(extraProducts.length > 0 || showAllLink) && (
        <div className="text-center">
          {showAllLink ? (
            <Link
              to={showAllLink}
              className="inline-flex items-center gap-2.5 border-[1.5px] border-green-mid text-green-mid bg-transparent px-7 md:px-9 py-2.5 md:py-3 rounded-full text-xs tracking-[1.5px] uppercase cursor-pointer transition-all font-sans font-normal hover:bg-main-green hover:text-white hover:border-main-green"
            >
              {showAllText || 'Voir tout →'}
            </Link>
          ) : (
            <button
              onClick={() => setShowAll(!showAll)}
              className={`inline-flex items-center gap-2.5 border-[1.5px] border-green-mid text-green-mid bg-transparent px-7 md:px-9 py-2.5 md:py-3 rounded-full text-xs tracking-[1.5px] uppercase cursor-pointer transition-all font-sans font-normal hover:bg-main-green hover:text-white hover:border-main-green ${
                showAll ? 'bg-main-green text-white border-main-green' : ''
              }`}
            >
              {showAll ? 'Réduire' : `Voir tout (${products.length})`}
            </button>
          )}
        </div>
      )}

      <ProductModal isOpen={isOpen} product={selectedProduct} onClose={closeModal} />
    </section>
  )
}
