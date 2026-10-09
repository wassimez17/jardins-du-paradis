import { CONTACT_CONFIG } from '../config/contact'
import { plantes } from '../constants/products'
import Navbar from '../components/Navbar'
import ContactFooter from '../components/ContactFooter'
import { useCart } from '../context/CartContext'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function MonsteraPage() {
  const monstera = plantes.find(p => p.id === 'plant1')
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showZoom, setShowZoom] = useState(false)
  const [relatedProducts, setRelatedProducts] = useState<typeof plantes>([])

  // Get viewed products from localStorage and mark current as viewed
  useEffect(() => {
    // Get viewed products
    const viewed = JSON.parse(localStorage.getItem('viewedProducts') || '[]')
    
    // Add Monstera to viewed if not already there
    if (!viewed.includes('plant1')) {
      viewed.push('plant1')
      localStorage.setItem('viewedProducts', JSON.stringify(viewed))
    }

    // Get random products excluding Monstera and viewed
    const available = plantes.filter(p => p.id !== 'plant1' && !viewed.includes(p.id))
    
    // If not enough available, use all except Monstera
    const pool = available.length >= 4 ? available : plantes.filter(p => p.id !== 'plant1')
    
    // Shuffle and take 4
    const shuffled = [...pool].sort(() => Math.random() - 0.5)
    setRelatedProducts(shuffled.slice(0, 4))
  }, [])

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  if (!monstera) return null

  // Parse description to extract attributes
  const parseDescription = (desc: string) => {
    const parts = desc.split(' | ')
    const attributes: Record<string, string> = {}
    parts.forEach(part => {
      const [key, value] = part.split(': ')
      if (key && value) {
        attributes[key] = value
      }
    })
    return attributes
  }

  const attributes = parseDescription(monstera.description)

  const handleWhatsAppClick = () => {
    const message = 'Bonjour, je souhaite avoir plus d\'informations sur Monstera Deliciosa.'
    window.open(`https://wa.me/${CONTACT_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleRelatedProductClick = (product: typeof plantes[0]) => {
    const slug = product.slug || product.id
    navigate(`/plantes/${slug}`)
  }

  const handleRelatedProductWhatsApp = (e: React.MouseEvent, product: typeof plantes[0]) => {
    e.stopPropagation()
    const message = `Bonjour, je suis intéressé(e) par: ${product.title} - Prix: ${product.price}`
    window.open(`https://wa.me/${CONTACT_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleAddToCart = () => {
    addToCart({
      id: monstera.id,
      title: monstera.title,
      price: monstera.price,
      image: monstera.image
    })
    setShowConfirmation(true)
    setTimeout(() => setShowConfirmation(false), 2000)
  }

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-[72px] md:pt-[72px]">
        {/* Breadcrumb */}
        <div className="px-[4vw] md:px-[6vw] py-4 border-b border-border">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-green-mid">
            <button onClick={() => navigate('/')} className="hover:text-main-green transition-colors">Accueil</button>
            <span className="text-border">/</span>
            <button onClick={() => navigate('/plantes')} className="hover:text-main-green transition-colors">Plantes</button>
            <span className="text-border">/</span>
            <span className="text-main-green font-medium">Monstera Deliciosa</span>
          </nav>
        </div>

        {/* Main Product Area */}
        <div className="px-[4vw] md:px-[6vw] py-6 md:py-12">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 md:gap-12">
            {/* Image */}
            <div className="bg-white border border-border rounded-xl p-3 md:p-6 relative">
              <img
                src={monstera.image}
                alt={monstera.title}
                loading="eager"
                className="w-full h-auto object-contain max-h-[250px] md:max-h-[500px]"
              />
              <button
                onClick={() => setShowZoom(true)}
                className="absolute bottom-5 right-5 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6 text-main-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </button>
            </div>

            {/* Information */}
            <div className="flex flex-col">
              {monstera.tag && (
                <div className="text-[10px] md:text-[11px] tracking-[2px] uppercase text-green-mid mb-2">
                  {monstera.tag}
                </div>
              )}
              <h1 className="font-serif text-xl md:text-3xl font-semibold text-main-green mb-2 md:mb-3">
                {monstera.title}
              </h1>
              <div className="text-base md:text-xl font-medium text-gold-accent mb-3 md:mb-4">
                {monstera.price}
              </div>
              
              {/* Short description without attributes */}
              <p className="text-xs md:text-base text-text-mid leading-relaxed mb-4 md:mb-6">
                Plante tropicale d'intérieur idéale pour décorer votre espace de vie.
              </p>

              {/* Attributes */}
              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                {attributes.Type && (
                  <div className="flex items-center gap-2 md:gap-3">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <span className="text-xs md:text-sm text-text-mid"><span className="font-medium text-main-green">Type:</span> {attributes.Type}</span>
                  </div>
                )}
                {attributes.Origine && (
                  <div className="flex items-center gap-2 md:gap-3">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-xs md:text-sm text-text-mid"><span className="font-medium text-main-green">Origine:</span> {attributes.Origine}</span>
                  </div>
                )}
                {attributes.Exposition && (
                  <div className="flex items-center gap-2 md:gap-3">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="text-xs md:text-sm text-text-mid"><span className="font-medium text-main-green">Exposition:</span> {attributes.Exposition}</span>
                  </div>
                )}
                {attributes.Arrosage && (
                  <div className="flex items-center gap-2 md:gap-3">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    <span className="text-xs md:text-sm text-text-mid"><span className="font-medium text-main-green">Arrosage:</span> {attributes.Arrosage}</span>
                  </div>
                )}
                {attributes.Taille && (
                  <div className="flex items-center gap-2 md:gap-3">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    <span className="text-xs md:text-sm text-text-mid"><span className="font-medium text-main-green">Taille:</span> {attributes.Taille}</span>
                  </div>
                )}
                {attributes.Conseils && (
                  <div className="flex items-center gap-2 md:gap-3">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span className="text-xs md:text-sm text-text-mid"><span className="font-medium text-main-green">Entretien:</span> {attributes.Conseils}</span>
                  </div>
                )}
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-4 mb-4 md:mb-6">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-green-mid text-green-mid text-xl md:text-2xl font-bold hover:bg-green-mist transition-colors"
                >
                  −
                </button>
                <span className="text-lg md:text-xl font-semibold text-main-green w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-green-mid text-green-mid text-xl md:text-2xl font-bold hover:bg-green-mist transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="bg-main-green text-white px-4 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm tracking-[1.5px] uppercase font-medium hover:bg-gold-accent hover:text-main-green hover:shadow-xl transition-all duration-300 shadow-lg w-full md:w-auto"
              >
                Ajouter au panier
              </button>

              {/* Confirmation */}
              {showConfirmation && (
                <div className="mt-3 text-center text-sm text-green-mid animate-fade-in">
                  Ajouté au panier ✓
                </div>
              )}

              {/* WhatsApp CTA */}
              <button
                onClick={handleWhatsAppClick}
                className="mt-4 bg-white/10 border-2 border-main-green text-main-green px-4 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm tracking-[1.5px] uppercase font-medium hover:bg-main-green hover:text-white transition-all duration-300 w-full md:w-auto"
              >
                Demander sur WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="px-[4vw] md:px-[6vw] py-6 md:py-12 bg-green-mist">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-lg md:text-2xl font-semibold text-main-green mb-3 md:mb-4">
              À propos de cette plante
            </h2>
            <p className="text-xs md:text-base text-text-mid leading-relaxed">
              Le Monstera Deliciosa, surnommé "plante fromage" en raison de ses fruits comestibles, est une plante tropicale d'intérieur originaire d'Amérique Centrale. Appréciée pour ses grandes feuilles perforées en forme de cœur, elle apporte une touche exotique et élégante à tout espace de vie. Cette plante grimpante peut atteindre une hauteur de 60 à 150 cm et prospère dans une lumière indirecte. Facile d'entretien, elle nécessite un arrosage hebdomadaire modéré et apprécie que l'on vaporise régulièrement ses feuilles pour maintenir une humidité optimale.
            </p>
          </div>
        </div>

        {/* Care Tips */}
        <div className="px-[4vw] md:px-[6vw] py-6 md:py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-lg md:text-2xl font-semibold text-main-green mb-4 md:mb-6">
              Conseils d'entretien
            </h2>
            <div className="bg-green-mist border border-green-pale rounded-xl p-4 md:p-8">
              <p className="text-xs md:text-base text-text-mid leading-relaxed">
                Pour garder votre Monstera en bonne santé, vaporisez régulièrement ses feuilles pour maintenir une humidité optimale, surtout en intérieur sec. Nettoyez les feuilles avec un chiffon humide pour enlever la poussière et permettre à la plante de mieux respirer. Arrosez modérément une fois par semaine, en laissant le substrat sécher légèrement entre deux arrosages. Évitez l'eau stagnante dans le soucoupe et fertilisez légèrement au printemps et en été pour encourager une croissance vigoureuse.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="px-[4vw] md:px-[6vw] py-6 md:py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-lg md:text-2xl font-semibold text-main-green mb-4 md:mb-6">
              Vous aimerez aussi
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5">
              {relatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-border overflow-hidden transition-all duration-500 cursor-pointer group rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-md md:rounded-2xl md:shadow-md md:hover:-translate-y-3 md:hover:shadow-2xl active:scale-95"
                  onClick={() => handleRelatedProductClick(product)}
                >
                  <div className="h-[120px] md:h-[220px] overflow-hidden relative cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-2 md:p-[22px]">
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
                      onClick={(e) => handleRelatedProductWhatsApp(e, product)}
                      className="w-full bg-main-green text-white px-2 md:px-4 py-2 md:py-2 rounded-full text-[10px] md:text-xs tracking-[1px] md:tracking-[1.5px] uppercase font-medium hover:bg-gold-accent hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                      <span className="md:hidden">Voir détails</span>
                      <span className="hidden md:inline">Voir les détails</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {showZoom && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={() => setShowZoom(false)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full">
            <button
              onClick={() => setShowZoom(false)}
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors z-10"
            >
              <svg className="w-6 h-6 md:w-7 md:h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={monstera.image}
              alt={monstera.title}
              loading="lazy"
              className="w-full h-full object-contain max-h-[85vh] rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <ContactFooter />
    </div>
  )
}