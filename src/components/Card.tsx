import { Product } from '../types'
import { useLanguage } from '../context/LanguageContext'
import { CONTACT_CONFIG } from '../config/contact'

interface CardProps {
  product: Product
  onOpenModal: (product: Product) => void
  fullImage?: boolean
}

export default function Card({ product, onOpenModal, fullImage = false }: CardProps) {
  const { t } = useLanguage()
  
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const message = `Bonjour, je suis intéressé(e) par: ${product.title} - Prix: ${product.price}`
    window.open(`https://wa.me/${CONTACT_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div
      className="bg-white border border-border overflow-hidden transition-all duration-500 cursor-pointer group rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-md md:rounded-2xl md:shadow-md md:hover:-translate-y-3 md:hover:shadow-2xl"
      onClick={() => onOpenModal(product)}
    >
      <div className={`${fullImage ? 'h-[200px] md:h-[250px]' : 'h-[160px] md:h-[220px]'} overflow-hidden relative cursor-pointer`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="p-3 md:p-[22px]">
        {product.tag && (
          <div className="text-[9px] md:text-[10px] tracking-[2px] uppercase text-green-mid mb-1 md:mb-1.5 leading-none font-normal">
            {product.tag}
          </div>
        )}
        <h3 className="font-serif text-sm md:text-xl font-semibold text-main-green mb-1 md:mb-1.5 leading-tight group-hover:text-green-light transition-colors duration-300">
          {product.title}
        </h3>
        <div className="text-sm md:text-lg font-medium text-gold-accent mb-2 md:mb-3">
          {product.price}
        </div>
        <button
          onClick={handleWhatsAppClick}
          className="w-full bg-main-green text-white px-3 md:px-4 py-2 md:py-2 rounded-full text-[10px] md:text-xs tracking-[1px] md:tracking-[1.5px] uppercase font-medium hover:bg-gold-accent hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <span className="md:hidden">WhatsApp</span>
          <span className="hidden md:inline">{t.common.orderWhatsApp}</span>
        </button>
      </div>
    </div>
  )
}
