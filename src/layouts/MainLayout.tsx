import { useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import Navbar from '../components/Navbar'
import ContactFooter from '../components/ContactFooter'
import Hero from '../pages/Hero'
import Apropos from '../pages/Apropos'
import Categories from '../pages/Categories'
import ProductsSection from '../pages/ProductsSection'
import Jardinage from '../pages/Jardinage'
import Brochure from '../pages/Brochure'
import { plantes, pots, soins, oiseaux, bouquets } from '../constants/products'

export default function MainLayout() {
  const { t } = useLanguage()
  
  useEffect(() => {
    // Handle hash scrolling on page load
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 300)
    } else {
      // Scroll to top if no hash
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Categories />
      <Apropos />
      <ProductsSection
        id="plantes"
        eyebrow={t.sections.plants.eyebrow}
        title={t.sections.plants.title}
        description={t.sections.plants.description}
        products={plantes}
        initialShow={4}
        showAllLink="/plantes"
        showAllText={`${t.sections.plants.seeAll} →`}
      />
      <ProductsSection
        id="pots"
        eyebrow={t.sections.pots.eyebrow}
        title={t.sections.pots.title}
        description={t.sections.pots.description}
        products={pots}
        initialShow={4}
        showAllLink="/pots"
        showAllText={`${t.sections.pots.seeAll} →`}
      />
      <Jardinage showAllLink="/jardinage" />
      <ProductsSection
        id="soins"
        eyebrow={t.sections.soins.eyebrow}
        title={t.sections.soins.title}
        description={t.sections.soins.description}
        products={soins}
        initialShow={4}
        showAllLink="/soins"
        showAllText={`${t.sections.soins.seeAll} →`}
      />
      <ProductsSection
        id="oiseaux"
        eyebrow={t.sections.oiseaux.eyebrow}
        title={t.sections.oiseaux.title}
        description={t.sections.oiseaux.description}
        products={oiseaux}
        initialShow={4}
        showAllLink="/oiseaux"
        showAllText={`${t.sections.oiseaux.seeAll} →`}
      />
      <ProductsSection
        id="bouquets"
        eyebrow={t.sections.bouquets.eyebrow}
        title={t.sections.bouquets.title}
        description={t.sections.bouquets.description}
        products={bouquets}
        initialShow={4}
        showAllLink="/bouquets"
        showAllText={`${t.sections.bouquets.seeAll} →`}
      />
      <Brochure />
      <ContactFooter />
    </div>
  )
}
