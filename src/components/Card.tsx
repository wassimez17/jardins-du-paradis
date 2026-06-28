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
      className="bg-white rounded-2xl border border-border overflow-hidden transition-all duration-300 shadow-sm hover:-translate-y-1.5 hover:shadow-xl cursor-pointer"
      onClick={() => onOpenModal(product)}
    >
      <div className="h-[220px] overflow-hidden relative cursor-pointer">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-5.5">
        {product.tag && (
          <div className="text-[10px] tracking-[2px] uppercase text-green-mid mb-1.5 font-normal">
            {product.tag}
          </div>
        )}
        <h3 className="font-serif text-xl font-semibold text-main-green mb-1.5">
          {product.title}
        </h3>
        <div className="text-lg font-medium text-gold-accent">
          {product.price}
        </div>
        <button
          onClick={handleWhatsAppClick}
          className="mt-3 w-full bg-main-green text-white px-4 py-2 rounded-full text-xs tracking-[1.5px] uppercase font-medium hover:bg-gold-accent transition-colors duration-300"
        >
          Commander via WhatsApp
        </button>
      </div>
    </div>
  )
}
