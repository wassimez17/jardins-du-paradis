import { Helmet } from 'react-helmet-async'
import MainLayout from './layouts/MainLayout'

function App() {
  return (
    <>
      <Helmet>
        <title>Jardins Du Paradis - Nature &amp; Élégance</title>
        <meta
          name="description"
          content="Jardins du Paradis - Votre jardinerie de confiance depuis 2007. Aménagements et entretien des espaces verts, plantes, pots, bouquets et décoration à Tanger, Maroc."
        />
      </Helmet>
      <MainLayout />
    </>
  )
}

export default App
