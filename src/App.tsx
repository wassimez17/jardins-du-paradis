import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import PlantesPage from './pages/PlantesPage'
import PotsPage from './pages/PotsPage'
import SoinsPage from './pages/SoinsPage'
import OiseauxPage from './pages/OiseauxPage'
import BouquetsPage from './pages/BouquetsPage'
import JardinagePage from './pages/JardinagePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/plantes" element={<PlantesPage />} />
        <Route path="/pots" element={<PotsPage />} />
        <Route path="/soins" element={<SoinsPage />} />
        <Route path="/oiseaux" element={<OiseauxPage />} />
        <Route path="/bouquets" element={<BouquetsPage />} />
        <Route path="/jardinage" element={<JardinagePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
