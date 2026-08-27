import { createContext, useState, useContext, ReactNode } from 'react'
import { fr } from '../translations/fr'
import { en } from '../translations/en'
import { es } from '../translations/es'

type Language = 'fr' | 'en' | 'es'

interface Translations {
  nav: {
    accueil: string
    catalogue: string
    services: string
    realisations: string
    contact: string
    plantes: string
    pots: string
    jardinage: string
    soins: string
    oiseaux: string
    bouquets: string
  }
  hero: {
    eyebrow: string
    title: string
    description: string
    ctaCatalog: string
    ctaContact: string
  }
  brochure: {
    title: string
    description: string
    viewPdf: string
    downloadPdf: string
  }
  jardinage: {
    title: string
    description: string
    cta: string
  }
  footer: {
    contact: string
    navigation: string
    contactUs: string
    whatsapp: string
  }
  sections: {
    categories: {
      title: string
    }
    services: {
      eyebrow: string
      title: string
      description: string
      aménagement: string
      aménagementDesc: string
      entretien: string
      entretienDesc: string
      plantation: string
      plantationDesc: string
      décoration: string
      décorationDesc: string
    }
    realisations: {
      eyebrow: string
      title: string
      description: string
      project: string
    }
    plants: {
      eyebrow: string
      title: string
      description: string
      seeAll: string
    }
    pots: {
      eyebrow: string
      title: string
      description: string
      seeAll: string
    }
    jardinage: {
      eyebrow: string
      title: string
      description: string
      cta: string
    }
    soins: {
      eyebrow: string
      title: string
      description: string
    }
    oiseaux: {
      eyebrow: string
      title: string
      description: string
    }
    bouquets: {
      eyebrow: string
      title: string
      description: string
      seeAll: string
    }
    contact: {
      eyebrow: string
      title: string
      description: string
      address: string
      phone: string
      hours: string
      email: string
      sendMessage: string
      firstName: string
      lastName: string
      emailField: string
      phoneField: string
      message: string
      submit: string
    }
  }
  common: {
    orderWhatsApp: string
    seeMore: string
    reduce: string
    custom: string
    seeAllCount: string
  }
}

export interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const translations: Record<Language, Translations> = {
  fr,
  en,
  es,
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr')

  const value = {
    language,
    setLanguage,
    t: translations[language],
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
