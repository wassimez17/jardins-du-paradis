export default function Footer() {
  return (
    <footer className="bg-[#0d2410] text-[rgba(200,230,202,0.7)] py-12 px-[6vw]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-serif text-xl text-white mb-4">Jardins du Paradis</h3>
          <p className="text-sm leading-relaxed">
            Votre jardinerie de confiance depuis 2007. Aménagements et entretien des espaces verts, plantes, pots, bouquets et décoration à Tanger, Maroc.
          </p>
        </div>
        <div>
          <h3 className="font-serif text-lg text-white mb-4">Suivez-nous</h3>
          <div className="flex gap-4 mb-4">
            <a href="#" className="w-10 h-10 bg-[rgba(200,230,202,0.1)] rounded-full flex items-center justify-center hover:bg-[rgba(200,230,202,0.2)] transition-colors duration-300">
              <span>📘</span>
            </a>
            <a href="#" className="w-10 h-10 bg-[rgba(200,230,202,0.1)] rounded-full flex items-center justify-center hover:bg-[rgba(200,230,202,0.2)] transition-colors duration-300">
              <span>📸</span>
            </a>
            <a href="#" className="w-10 h-10 bg-[rgba(200,230,202,0.1)] rounded-full flex items-center justify-center hover:bg-[rgba(200,230,202,0.2)] transition-colors duration-300">
              <span>🐦</span>
            </a>
          </div>
          <div className="text-xs text-[rgba(200,230,202,0.5)]">
            Rejoignez notre communauté pour des conseils de jardinage et des offres exclusives.
          </div>
        </div>
      </div>
      <div className="border-t border-[rgba(200,230,202,0.1)] pt-6 text-center text-xs text-[rgba(200,230,202,0.5)]">
        © 2024 Jardins du Paradis · Jardinerie à Tanger · Tous droits réservés
      </div>
    </footer>
  )
}
