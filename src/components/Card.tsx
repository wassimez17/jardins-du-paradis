import { useState } from 'react'
import { Product } from '../types'
import { useLanguage } from '../context/LanguageContext'
import { useCart } from '../context/CartContext'

interface CardProps {
  product: Product
  onOpenModal?: (product: Product) => void
  fullImage?: boolean
}

export default function Card({ product, onOpenModal, fullImage = false }: CardProps) {
  const { t } = useLanguage()
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleCardClick = () => {
    if (product.slug) {
      window.location.href = `/${product.category}/${product.slug}`
    } else if (onOpenModal) {
      onOpenModal(product)
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div
      className="bg-white border border-border overflow-hidden transition-all duration-500 cursor-pointer group rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-md md:rounded-2xl md:shadow-md md:hover:-translate-y-3 md:hover:shadow-2xl active:scale-95"
      onClick={handleCardClick}
    >
      <div className={`${fullImage ? 'h-[180px] md:h-[250px]' : 'h-[140px] md:h-[220px]'} overflow-hidden relative cursor-pointer`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="p-2.5 md:p-[22px]">
        {product.tag && (
          <div className="text-[9px] md:text-[10px] tracking-[2px] uppercase text-green-mid mb-1 md:mb-1.5 leading-none font-normal">
            {product.tag}
          </div>
        )}
        <h3 className="font-serif text-xs md:text-xl font-semibold text-main-green mb-1 md:mb-1.5 leading-tight group-hover:text-green-light transition-colors duration-300 line-clamp-2">
          {product.title}
        </h3>
        <div className="text-xs md:text-lg font-medium text-gold-accent mb-2 md:mb-3">
          {product.price}
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full bg-main-green text-white px-3 md:px-4 py-2 md:py-2 rounded-full text-[10px] md:text-xs tracking-[1px] md:tracking-[1.5px] uppercase font-medium hover:bg-gold-accent hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          {added ? (
            <span className="md:hidden">{t.common.added}</span>
          ) : (
            <span className="md:hidden">{t.common.addToCart}</span>
          )}
          {added ? (
            <span className="hidden md:inline">{t.common.added}</span>
          ) : (
            <span className="hidden md:inline">{t.common.addToCart}</span>
          )}
        </button>
      </div>
    </div>
  )
}
