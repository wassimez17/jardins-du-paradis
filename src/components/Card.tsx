import { Product } from '../types'

interface CardProps {
  product: Product
  onOpenModal: (product: Product) => void
}

export default function Card({ product, onOpenModal }: CardProps) {
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const message = `Bonjour, je suis intéressé(e) par: ${product.title} - Prix: ${product.price}`
    window.open(`https://wa.me/212600000000?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div
      className="bg-white border border-border overflow-hidden transition-all duration-500 cursor-pointer group rounded-lg shadow-sm hover:-translate-y-1 hover:shadow-md md:rounded-2xl md:shadow-md md:hover:-translate-y-3 md:hover:shadow-2xl"
      onClick={() => onOpenModal(product)}
    >
      <div className="h-[88px] md:h-[220px] overflow-hidden relative cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="p-2 md:p-[22px]">
        {product.tag && (
          <div className="text-[7px] md:text-[10px] tracking-[2px] uppercase text-green-mid mb-0.5 md:mb-1.5 leading-none font-normal">
            {product.tag}
          </div>
        )}
        <h3 className="font-serif text-xs md:text-xl font-semibold text-main-green mb-0.5 md:mb-1.5 leading-tight group-hover:text-green-light transition-colors duration-300">
          {product.title}
        </h3>
        <div className="text-xs md:text-lg font-medium text-gold-accent">
          {product.price}
        </div>
        <button
          onClick={handleWhatsAppClick}
          className="mt-1.5 md:mt-3 w-full bg-main-green text-white px-1.5 md:px-4 py-1 md:py-2 rounded-full text-[7px] md:text-xs tracking-[0.5px] md:tracking-[1.5px] uppercase font-medium hover:bg-gold-accent hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <span className="md:hidden">WhatsApp</span>
          <span className="hidden md:inline">Commander via WhatsApp</span>
        </button>
      </div>
    </div>
  )
}
