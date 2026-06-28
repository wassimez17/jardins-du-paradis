import { useEffect } from 'react'
import { Product } from '../types'

interface ProductModalProps {
  isOpen: boolean
  product: Product | null
  onClose: () => void
}

export default function ProductModal({ isOpen, product, onClose }: ProductModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  if (!isOpen || !product) return null

  const formatDescription = (desc: string) => {
    const items = desc.split(' | ')
    return items.map((item, index) => {
      const [key, value] = item.split(': ')
      let icon = '🌿'

      if (key.includes('Type')) icon = '🌿'
      else if (key.includes('Origine')) icon = '🌎'
      else if (key.includes('Exposition')) icon = '☀️'
      else if (key.includes('Arrosage')) icon = '💧'
      else if (key.includes('Conseils')) icon = '💡'
      else if (key.includes('Dimensions')) icon = '📏'
      else if (key.includes('Matériau')) icon = '🏺'
      else if (key.includes('Style')) icon = '🎨'
      else if (key.includes('Usage')) icon = '🌿'
      else if (key.includes('Durée')) icon = '⏰'
      else if (key.includes('Mode')) icon = '🔄'
      else if (key.includes('Moment')) icon = '🌱'
      else if (key.includes('Composition')) icon = '🧪'
      else if (key.includes('Aliment')) icon = '🌾'
      else if (key.includes('Ingrédients')) icon = '🌱'
      else if (key.includes('Espèces')) icon = '🦜'
      else if (key.includes('Fleurs')) icon = '🌹'
      else if (key.includes('Couleurs')) icon = '🎨'
      else if (key.includes('Nombre')) icon = '🔢'
      else if (key.includes('Occasion')) icon = '🎂'

      return (
        <div key={index} className="flex items-center mb-3 text-sm text-main-green">
          <span className="mr-2 text-gold-accent min-w-[20px] text-center">{icon}</span>
          <span>
            <strong>{key}:</strong> {value}
          </span>
        </div>
      )
    })
  }

  const whatsappMessage = `Bonjour, je suis intéressé(e) par: ${product.title}\n${product.description}\nPrix: ${product.price}\nMerci!`
  const whatsappUrl = `https://wa.me/212600000000?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div
      className="fixed inset-0 bg-black/80 z-[1000] overflow-y-auto flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-[650px] w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 bg-green-mist border-none rounded-full cursor-pointer text-2xl text-green-deep hover:bg-green-light transition-all duration-300 hover:rotate-90"
        >
          ×
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="relative inline-block w-full">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[300px] object-cover rounded-xl shadow-lg cursor-pointer transition-transform duration-300 hover:scale-102 hover:shadow-xl"
              onClick={(e) => {
                e.stopPropagation()
                window.open(product.image, '_blank')
              }}
            />
            <div className="absolute top-2.5 right-2.5 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Cliquez pour voir
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="text-xs tracking-[2px] uppercase text-main-green font-medium bg-green-mist px-3 py-1 rounded-full inline-block">
              {product.tag}
            </div>
            <h3 className="font-serif text-[32px] font-semibold text-green-deep leading-tight mb-0.5">
              {product.title}
            </h3>
            <div className="text-sm text-main-green leading-relaxed">
              {formatDescription(product.description)}
            </div>
            <div className="text-[28px] font-bold text-gold-accent py-3 border-y-2 border-green-mist text-center tracking-wide">
              {product.price}
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#25D366] text-white px-8 py-4 rounded-full font-semibold text-base shadow-lg hover:bg-[#128C7E] hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 w-full before:content-['💬'] before:mr-2 before:text-lg"
            >
              Commander via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
