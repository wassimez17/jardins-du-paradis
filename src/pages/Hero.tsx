import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Hero() {
  const [heroRef, isVisible] = useScrollReveal<HTMLDivElement>()

  return (
    <section id="accueil" className="min-h-screen grid md:grid-cols-2 pt-[72px]">
      <div className="bg-hero-gradient relative overflow-hidden min-h-[600px]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(74,155,82,0.3)_0%,transparent_60%),radial-gradient(ellipse_at_70%_20%,rgba(200,230,202,0.1)_0%,transparent_50%)]" />
        <div className="absolute text-[180px] opacity-7 leading-none top-[10%] left-[-5%] -rotate-20">
          🍃
        </div>
        <div className="absolute text-[250px] opacity-7 leading-none bottom-[5%] right-[-5%] rotate-[30deg]">
          🌿
        </div>
        <div className="absolute text-[120px] opacity-5 leading-none top-[40%] right-[10%] rotate-[15deg]">
          🌱
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
          <div className="text-[11px] tracking-[3px] uppercase text-green-pale mb-4 opacity-80">
            Fondée en 2007 · Tanger, Maroc
          </div>
          <h1 className="font-serif text-[clamp(42px,6vw,72px)] font-light text-white leading-tight mb-6">
            La nature,<br />
            à votre <em className="italic text-green-pale">portée</em>
          </h1>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-[rgba(200,230,202,0.3)] text-green-pale px-6 py-2.5 rounded-full text-xs tracking-wider">
            <span>🌱</span>
            <span>
              Aménagements et entretien des espaces verts, plantes, pots, bouquets et
              décoration
            </span>
          </div>
        </div>
      </div>
      <div
        ref={heroRef}
        className={`p-[clamp(3rem,6vw,6rem)] flex flex-col justify-center bg-soft-white ${
          isVisible ? 'reveal visible' : 'reveal'
        }`}
      >
        <div className="text-[11px] tracking-[3px] uppercase text-green-mid mb-6 font-normal">
          Bienvenue chez Jardins du Paradis
        </div>
        <h2 className="font-serif text-[clamp(32px,3.5vw,52px)] font-normal leading-tight text-main-green mb-6">
          Votre jardinerie de confiance depuis 2007
        </h2>
        <p className="text-sm text-text-mid leading-relaxed mb-8">
          Fondée à Tanger en 2007, Jardins du Paradis est spécialisée dans les
          aménagements et entretien des espaces verts, plantes d'intérieur et
          d'extérieur, les pots pour les plantes, bouquets de fleurs et décoration de
          voitures. Nous accompagnons particuliers et professionnels dans la création
          d'espaces verts uniques, avec passion et expertise.
        </p>
        <p className="text-sm text-text-mid leading-relaxed mb-8 -mt-8">
          Notre équipe de passionnés vous conseille sur le choix des plantes, les
          soins adaptés, l'aménagement paysager et la décoration florale. De la graine
          à la plante adulte, nous sommes là à chaque étape de votre jardinage.
        </p>
        <div className="flex gap-8 mt-8 flex-wrap">
          <div className="text-center">
            <div className="font-serif text-[36px] font-semibold text-main-green leading-none">
              18+
            </div>
            <div className="text-[11px] tracking-wider text-text-light mt-1">
              Années d'expérience
            </div>
          </div>
          <div className="w-px bg-border mx-4" />
          <div className="text-center">
            <div className="font-serif text-[36px] font-semibold text-main-green leading-none">
              500+
            </div>
            <div className="text-[11px] tracking-wider text-text-light mt-1">
              Espèces disponibles
            </div>
          </div>
          <div className="w-px bg-border mx-4" />
          <div className="text-center">
            <div className="font-serif text-[36px] font-semibold text-main-green leading-none">
              10k+
            </div>
            <div className="text-[11px] tracking-wider text-text-light mt-1">
              Clients satisfaits
            </div>
          </div>
        </div>
        <a
          href="#plantes"
          className="inline-flex items-center gap-2.5 bg-main-green text-white px-8 py-3.5 rounded-full text-xs tracking-[1.5px] uppercase no-underline transition-all mt-8 self-start border-none cursor-pointer hover:bg-gold-accent hover:-translate-y-0.5 hover:shadow-lg"
        >
          Découvrir nos produits <span>→</span>
        </a>
      </div>
    </section>
  )
}
