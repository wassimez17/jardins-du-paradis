import { CONTACT_CONFIG } from '../config/contact'
import Navbar from '../components/Navbar'
import ContactFooter from '../components/ContactFooter'
import { useCart } from '../context/CartContext'
import { useEffect } from 'react'

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice } = useCart()

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  const handleWhatsAppOrder = () => {
    let message = 'Bonjour, je souhaite commander :\n\n'
    
    cart.forEach(item => {
      const priceNum = parseInt(item.price.replace(/\D/g, '')) || 0
      const subtotal = priceNum * item.quantity
      message += `${item.quantity} × ${item.title} — ${subtotal} DH\n`
    })
    
    const total = getTotalPrice()
    message += `\nTotal estimé : ${total}`
    
    window.open(`https://wa.me/${CONTACT_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const getItemSubtotal = (price: string, quantity: number) => {
    const priceNum = parseInt(price.replace(/\D/g, '')) || 0
    return (priceNum * quantity).toString() + ' DH'
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-cream/50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-20">
          <div className="text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-green-mist rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 md:w-12 md:h-12 text-main-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif text-main-green mb-4 font-light">Votre panier est vide</h1>
            <p className="text-sm md:text-base text-text-mid mb-8 leading-relaxed">
              Découvrez notre sélection complète pour créer votre espace vert idéal.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-3xl mx-auto">
              <button
                onClick={() => window.location.href = '/plantes'}
                className="inline-block bg-main-green text-white px-4 py-3 rounded-full text-xs md:text-sm font-medium tracking-[1.5px] uppercase hover:bg-gold-accent hover:text-main-green transition-all duration-300"
              >
                Plantes
              </button>
              <button
                onClick={() => window.location.href = '/pots'}
                className="inline-block bg-main-green text-white px-4 py-3 rounded-full text-xs md:text-sm font-medium tracking-[1.5px] uppercase hover:bg-gold-accent hover:text-main-green transition-all duration-300"
              >
                Pots
              </button>
              <button
                onClick={() => window.location.href = '/soins'}
                className="inline-block bg-main-green text-white px-4 py-3 rounded-full text-xs md:text-sm font-medium tracking-[1.5px] uppercase hover:bg-gold-accent hover:text-main-green transition-all duration-300"
              >
                Soins
              </button>
              <button
                onClick={() => window.location.href = '/oiseaux'}
                className="inline-block bg-main-green text-white px-4 py-3 rounded-full text-xs md:text-sm font-medium tracking-[1.5px] uppercase hover:bg-gold-accent hover:text-main-green transition-all duration-300"
              >
                Oiseaux
              </button>
              <button
                onClick={() => window.location.href = '/bouquets'}
                className="inline-block bg-main-green text-white px-4 py-3 rounded-full text-xs md:text-sm font-medium tracking-[1.5px] uppercase hover:bg-gold-accent hover:text-main-green transition-all duration-300"
              >
                Bouquets
              </button>
            </div>
          </div>
        </div>
        <ContactFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream/50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <h1 className="text-2xl md:text-3xl font-semibold text-main-green mb-8 md:mb-12">Mon Panier</h1>

        {/* Cart Items */}
        <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
          {cart.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-border/30"
            >
              <div className="flex gap-4 md:gap-6">
                {/* Product Image */}
                <div className="w-20 h-20 md:w-28 md:h-28 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain rounded-lg"
                    loading="lazy"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-semibold text-main-green truncate">{item.title}</h3>
                  <p className="text-sm text-green-mid mt-1">{item.price}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-3 md:mt-4">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-green-mid text-green-mid text-lg md:text-xl font-bold hover:bg-green-mist transition-colors"
                    >
                      −
                    </button>
                    <span className="text-base md:text-lg font-semibold text-main-green w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-green-mid text-green-mid text-lg md:text-xl font-bold hover:bg-green-mist transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal & Remove */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-500 transition-colors text-xs md:text-sm"
                  >
                    Supprimer
                  </button>
                  <p className="text-base md:text-lg font-semibold text-main-green">
                    {getItemSubtotal(item.price, item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total & CTA */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-border/30">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg md:text-xl font-semibold text-main-green">Total estimé</span>
            <span className="text-xl md:text-2xl font-bold text-main-green">{getTotalPrice()}</span>
          </div>

          <button
            onClick={handleWhatsAppOrder}
            className="w-full bg-main-green text-white px-6 py-4 rounded-full text-sm md:text-base font-medium tracking-[1.5px] uppercase hover:bg-gold-accent hover:text-main-green hover:shadow-xl transition-all duration-300 shadow-lg"
          >
            Envoyer ma demande sur WhatsApp
          </button>
        </div>
      </div>
      <ContactFooter />
    </div>
  )
}