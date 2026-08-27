import Navbar from '../components/Navbar'
import ContactFooter from '../components/ContactFooter'
import Hero from '../pages/Hero'
import Categories from '../pages/Categories'
import ProductsSection from '../pages/ProductsSection'
import Jardinage from '../pages/Jardinage'
import Brochure from '../pages/Brochure'
import { plantes, pots, soins, oiseaux, bouquets } from '../constants/products'

export default function MainLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Categories />
      <ProductsSection
        id="plantes"
        eyebrow="Notre sélection"
        title="Plantes"
        description="Des plantes d'intérieur et d'extérieur soigneusement sélectionnées pour embellir votre espace."
        products={plantes}
        initialShow={3}
        showAllLink="/plantes"
        showAllText="Voir toutes les plantes →"
      />
      <ProductsSection
        id="pots"
        eyebrow="Accessoires"
        title="Les Pots"
        description="Une collection de pots et jardinières pour sublimer vos plantes, du plus simple au plus raffiné."
        products={pots}
        initialShow={3}
        showAllLink="/pots"
        showAllText="Voir tous les pots →"
      />
      <Jardinage showAllLink="/jardinage" />
      <ProductsSection
        id="soins"
        eyebrow="Entretien"
        title="Soins des Plantes"
        description="Des produits d'entretien et de soins pour garder vos plantes en parfaite santé."
        products={soins}
        initialShow={3}
        showAllLink="/soins"
        showAllText="Voir tous les soins →"
      />
      <ProductsSection
        id="oiseaux"
        eyebrow="Animaux"
        title="Oiseaux"
        description="Découvrez nos oiseaux exotiques et tout ce qu'il faut pour leur bien-être."
        products={oiseaux}
        initialShow={3}
        showAllLink="/oiseaux"
        showAllText="Voir tous les oiseaux →"
      />
      <ProductsSection
        id="bouquets"
        eyebrow="Art floral"
        title="Bouquets &amp; Compositions"
        description="Des compositions florales sur mesure pour toutes les occasions : mariages, cérémonies, cadeaux et décoration."
        products={bouquets}
        initialShow={3}
        showAllLink="/bouquets"
        showAllText="Voir tous les bouquets →"
      />
      <Brochure />
      <ContactFooter />
    </div>
  )
}
