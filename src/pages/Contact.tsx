import { useScrollReveal } from '../hooks/useScrollReveal'
import ContactForm from '../components/ContactForm'

export default function Contact() {
  const [leftRef, leftVisible] = useScrollReveal<HTMLDivElement>()
  const [formRef, formVisible] = useScrollReveal<HTMLDivElement>()

  return (
    <section id="contact" className="bg-main-green text-white py-16 md:py-20 px-[6vw]">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
        <div
          ref={leftRef}
          className={`${leftVisible ? 'reveal visible' : 'reveal'}`}
        >
          <div className="text-[10px] md:text-[11px] tracking-[3px] uppercase text-green-pale mb-4 md:mb-6 font-normal">
            Restons en contact
          </div>
          <h2 className="font-serif text-[clamp(24px,4vw,44px)] font-normal leading-tight text-white mb-3 md:mb-4 text-left">
            Venez nous<br />
            rendre visite
          </h2>
          <div className="w-[60px] h-0.5 bg-gold-accent mt-3 md:mt-4 mb-0" />
          <p className="text-sm md:text-sm text-[rgba(200,230,202,0.8)] text-left mt-4 md:mt-6 leading-relaxed">
            Nous sommes à votre disposition pour tous vos projets de jardinage,
            conseils personnalisés ou commandes spéciales.
          </p>

          <div className="mt-8 md:mt-12 flex flex-col gap-4 md:gap-6">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-11 md:h-11 flex-shrink-0 bg-[rgba(200,230,202,0.15)] rounded-xl flex items-center justify-center text-lg md:text-xl">
                📍
              </div>
              <div>
                <div className="text-[10px] tracking-[2px] uppercase text-green-pale opacity-70 mb-1">
                  Adresse
                </div>
                <div className="text-sm leading-relaxed">
                  Hay Mandar El Jamil, Drissia<br />
                  Tanger, Maroc
                </div>
                <div className="mt-2 md:mt-2.5">
                  <a
                    href="https://maps.app.goo.gl/HWDAigkuxUvMThDt5?g_st=ic"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/images/map-preview.jpg"
                      alt="Map Preview"
                      className="w-full max-w-[180px] md:max-w-[200px] h-auto rounded-lg border border-[rgba(200,230,202,0.3)] cursor-pointer transition-transform duration-300 hover:scale-105"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-11 md:h-11 flex-shrink-0 bg-[rgba(200,230,202,0.15)] rounded-xl flex items-center justify-center text-lg md:text-xl">
                📞
              </div>
              <div>
                <div className="text-[10px] tracking-[2px] uppercase text-green-pale opacity-70 mb-1">
                  Téléphone
                </div>
                <div className="text-sm leading-relaxed">
                  0661722457 (M. Mustapha)<br />
                  0661064117 (M. Aziz)
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-11 md:h-11 flex-shrink-0 bg-[rgba(200,230,202,0.15)] rounded-xl flex items-center justify-center text-lg md:text-xl">
                🕐
              </div>
              <div>
                <div className="text-[10px] tracking-[2px] uppercase text-green-pale opacity-70 mb-1">
                  Horaires
                </div>
                <div className="text-sm leading-relaxed">
                  Lundi au Dimanche : 9:00 - 21:00
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-11 md:h-11 flex-shrink-0 bg-[rgba(200,230,202,0.15)] rounded-xl flex items-center justify-center text-lg md:text-xl">
                📧
              </div>
              <div>
                <div className="text-[10px] tracking-[2px] uppercase text-green-pale opacity-70 mb-1">
                  Email
                </div>
                <div className="text-sm leading-relaxed">
                  jardinsduparadis10@gmail.com
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={formRef} className={`${formVisible ? 'reveal visible' : 'reveal'}`}>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
