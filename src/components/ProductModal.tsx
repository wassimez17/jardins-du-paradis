import { useEffect } from 'react'
import { Product } from '../types'

interface ProductModalProps {
  isOpen: boolean
  product: Product | null
  onClose: () => void
}

const icons = {
  type: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  origine: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  exposition: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  arrosage: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  entretien: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  conseils: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
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
      let icon = icons.type
      const isConseils = key.toLowerCase().includes('conseils')

      if (key.toLowerCase().includes('origine')) icon = icons.origine
      else if (key.toLowerCase().includes('exposition')) icon = icons.exposition
      else if (key.toLowerCase().includes('arrosage')) icon = icons.arrosage
      else if (key.toLowerCase().includes('entretien')) icon = icons.entretien
      else if (isConseils) icon = icons.conseils

      return (
        <div key={index} className={`flex items-start gap-3 ${isConseils ? 'bg-green-mist/50 p-3 rounded-lg mt-4' : 'mb-3'}`}>
          <span className="text-gold-accent mt-0.5 flex-shrink-0">{icon}</span>
          <div className="flex-1">
            <span className="text-xs uppercase tracking-wider text-green-mid font-medium block mb-1">{key}</span>
            <span className="text-sm text-main-green leading-relaxed">{value}</span>
          </div>
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
        className="bg-white rounded-2xl max-w-[700px] w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-green-mist border-none rounded-full cursor-pointer text-2xl text-green-deep hover:bg-green-light transition-all duration-300 hover:rotate-90 z-10"
        >
          ×
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative bg-green-mist/30 flex items-center justify-center p-6 md:p-8">
            <img
              src={product.image}
              alt={product.title}
              className="max-w-full max-h-[350px] md:max-h-[400px] object-contain"
            />
          </div>

          <div className="p-6 md:p-8 flex flex-col">
            <div className="text-xs tracking-[2px] uppercase text-main-green font-medium bg-green-mist px-3 py-1.5 rounded-full inline-block w-fit mb-4">
              {product.tag}
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-green-deep leading-tight mb-2">
              {product.title}
            </h3>
            <div className="text-sm text-main-green leading-relaxed mb-6">
              {formatDescription(product.description)}
            </div>
            <div className="mt-auto">
              <div className="text-2xl md:text-3xl font-bold text-gold-accent py-4 border-t-2 border-green-mist text-center tracking-wide mb-6">
                {product.price}
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#25D366] text-white px-8 py-4 rounded-full font-semibold text-base shadow-lg hover:bg-[#128C7E] hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 w-full"
              >
                Commander via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
