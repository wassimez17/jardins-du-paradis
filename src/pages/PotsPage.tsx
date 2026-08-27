import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ContactFooter from '../components/ContactFooter'
import Card from '../components/Card'
import ProductModal from '../components/ProductModal'
import { pots } from '../constants/products'

export default function PotsPage() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCardClick = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-[72px] pb-16 px-[6vw] bg-green-mist">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif text-[clamp(28px,4vw,44px)] font-normal text-main-green mb-4">
            Tous nos pots
          </h1>
          <div className="w-[60px] h-0.5 bg-gold-accent mx-auto mb-4 rounded-sm" />
          <p className="text-sm text-text-mid max-w-2xl mx-auto mb-12">
            Découvrez notre collection de pots et contenants élégants pour mettre en valeur vos plantes et décorer vos espaces.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {pots.map((product) => (
              <Card
                key={product.id}
                product={product}
                onOpenModal={handleCardClick}
                fullImage={true}
              />
            ))}
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-main-green hover:text-gold-accent transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm font-medium">Retour à l'accueil</span>
          </Link>
        </div>
      </section>
      <ContactFooter />
      {isModalOpen && selectedProduct && (
        <ProductModal
          isOpen={isModalOpen}
          product={selectedProduct}
          onClose={closeModal}
        />
      )}
    </div>
  )
}
