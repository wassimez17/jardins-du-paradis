import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../pages/Hero'
import ProductsSection from '../pages/ProductsSection'
import Jardinage from '../pages/Jardinage'
import Soins from '../pages/Soins'
import Oiseaux from '../pages/Oiseaux'
import Contact from '../pages/Contact'
import { plantes, pots, bouquets } from '../constants/products'

export default function MainLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ProductsSection
        id="plantes"
        eyebrow="Notre sélection"
        title="Plantes"
        description="Des plantes d'intérieur et d'extérieur soigneusement sélectionnées pour embellir votre espace."
        products={plantes}
        initialShow={3}
      />
      <ProductsSection
        id="pots"
        eyebrow="Accessoires"
        title="Les Pots"
        description="Une collection de pots et jardinières pour sublimer vos plantes, du plus simple au plus raffiné."
        products={pots}
        initialShow={3}
      />
      <Jardinage />
      <Soins />
      <Oiseaux />
      <ProductsSection
        id="bouquets"
        eyebrow="Art floral"
        title="Bouquets &amp; Compositions"
        description="Des compositions florales sur mesure pour toutes les occasions : mariages, cérémonies, cadeaux et décoration."
        products={bouquets}
        initialShow={3}
      />
      <Contact />
      <Footer />
    </div>
  )
}
