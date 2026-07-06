import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Hero() {
  const [heroRef, isVisible] = useScrollReveal<HTMLDivElement>()

  return (
    <section id="accueil" className="min-h-screen grid md:grid-cols-2 pt-[60px] md:pt-[72px]">
      <div className="bg-hero-gradient relative overflow-hidden min-h-[400px] md:min-h-[600px] order-1 md:order-1">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(74,155,82,0.4)_0%,transparent_60%),radial-gradient(ellipse_at_70%_20%,rgba(200,230,202,0.15)_0%,transparent_50%)] animate-pulse-slow" />
        <div className="absolute text-[120px] md:text-[180px] opacity-10 leading-none top-[10%] left-[-5%] -rotate-20 animate-float">
          🍃
        </div>
        <div className="absolute text-[180px] md:text-[250px] opacity-10 leading-none bottom-[5%] right-[-5%] rotate-[30deg] animate-float-delay">
          🌿
        </div>
        <div className="absolute text-[80px] md:text-[120px] opacity-8 leading-none top-[40%] right-[10%] rotate-[15deg] animate-float-slow">
          🌱
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 md:p-12">
          <div className="text-[9px] md:text-[11px] tracking-[3px] uppercase text-green-pale mb-4 opacity-90 animate-fade-in">
            Fondée en 2007 · Tanger, Maroc
          </div>
          <h1 className="font-serif text-[clamp(32px,8vw,72px)] font-light text-white leading-tight mb-6 animate-slide-up">
            La nature,<br />
            à votre <em className="italic text-green-pale">portée</em>
          </h1>
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-[rgba(200,230,202,0.4)] text-green-pale px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs tracking-wider shadow-lg animate-fade-in-delay">
            <span>🌱</span>
            <span className="hidden md:inline">
              Aménagements et entretien des espaces verts, plantes, pots, bouquets et
              décoration
            </span>
            <span className="md:hidden">
              Espaces verts, plantes, pots, bouquets
            </span>
          </div>
        </div>
      </div>
      <div
        ref={heroRef}
        className={`p-6 md:p-[clamp(3rem,6vw,6rem)] flex flex-col justify-center bg-gradient-to-br from-soft-white to-green-mist order-2 md:order-2 ${
          isVisible ? 'reveal visible' : 'reveal'
        }`}
      >
        <div className="text-[10px] md:text-[11px] tracking-[3px] uppercase text-green-mid mb-4 md:mb-6 font-normal">
          Bienvenue chez Jardins du Paradis
        </div>
        <h2 className="font-serif text-[clamp(28px,4vw,52px)] font-normal leading-tight text-main-green mb-4 md:mb-6">
          Votre jardinerie de confiance depuis 2007
        </h2>
        <p className="text-sm md:text-sm text-text-mid leading-relaxed mb-6 md:mb-8">
          Fondée à Tanger en 2007, Jardins du Paradis est spécialisée dans les
          aménagements et entretien des espaces verts, plantes d'intérieur et
          d'extérieur, les pots pour les plantes, bouquets de fleurs et décoration de
          voitures. Nous accompagnons particuliers et professionnels dans la création
          d'espaces verts uniques, avec passion et expertise.
        </p>
        <p className="text-sm md:text-sm text-text-mid leading-relaxed mb-6 md:mb-8 -mt-4 md:-mt-8">
          Notre équipe de passionnés vous conseille sur le choix des plantes, les
          soins adaptés, l'aménagement paysager et la décoration florale. De la graine
          à la plante adulte, nous sommes là à chaque étape de votre jardinage.
        </p>
        <div className="flex gap-4 md:gap-8 mt-6 md:mt-8 flex-wrap justify-center md:justify-start">
          <div className="text-center group">
            <div className="font-serif text-[28px] md:text-[36px] font-semibold text-main-green leading-none group-hover:scale-110 transition-transform duration-300">
              18+
            </div>
            <div className="text-[10px] md:text-[11px] tracking-wider text-text-light mt-1">
              Années d'expérience
            </div>
          </div>
          <div className="w-px bg-border mx-2 md:mx-4" />
          <div className="text-center group">
            <div className="font-serif text-[28px] md:text-[36px] font-semibold text-main-green leading-none group-hover:scale-110 transition-transform duration-300">
              500+
            </div>
            <div className="text-[10px] md:text-[11px] tracking-wider text-text-light mt-1">
              Espèces disponibles
            </div>
          </div>
          <div className="w-px bg-border mx-2 md:mx-4" />
          <div className="text-center group">
            <div className="font-serif text-[28px] md:text-[36px] font-semibold text-main-green leading-none group-hover:scale-110 transition-transform duration-300">
              10k+
            </div>
            <div className="text-[10px] md:text-[11px] tracking-wider text-text-light mt-1">
              Clients satisfaits
            </div>
          </div>
        </div>
        <a
          href="#plantes"
          className="inline-flex items-center gap-2.5 bg-main-green text-white px-6 md:px-8 py-3 md:py-3.5 rounded-full text-xs tracking-[1.5px] uppercase no-underline transition-all mt-6 md:mt-8 self-center md:self-start border-none cursor-pointer hover:bg-gold-accent hover:-translate-y-1 hover:shadow-xl shadow-lg"
        >
          Découvrir nos produits <span>→</span>
        </a>
      </div>
    </section>
  )
}
