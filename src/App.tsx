import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'

// Import pages directly (no lazy loading to avoid loading screen)
import MainLayout from './layouts/MainLayout'
import PlantesPage from './pages/PlantesPage'
import PotsPage from './pages/PotsPage'
import SoinsPage from './pages/SoinsPage'
import OiseauxPage from './pages/OiseauxPage'
import BouquetsPage from './pages/BouquetsPage'
import JardinagePage from './pages/JardinagePage'
import MonsteraPage from './pages/MonsteraPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import AproposPage from './pages/AproposPage'
import ServicesPage from './pages/ServicesPage'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/plantes" element={<PlantesPage />} />
          <Route path="/plantes/monstera-deliciosa" element={<MonsteraPage />} />
          <Route path="/plantes/:productSlug" element={<ProductPage />} />
          <Route path="/pots" element={<PotsPage />} />
          <Route path="/pots/:productSlug" element={<ProductPage />} />
          <Route path="/soins" element={<SoinsPage />} />
          <Route path="/soins/:productSlug" element={<ProductPage />} />
          <Route path="/oiseaux" element={<OiseauxPage />} />
          <Route path="/oiseaux/:productSlug" element={<ProductPage />} />
          <Route path="/bouquets" element={<BouquetsPage />} />
          <Route path="/bouquets/:productSlug" element={<ProductPage />} />
          <Route path="/jardinage" element={<JardinagePage />} />
          <Route path="/apropos" element={<AproposPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/panier" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
