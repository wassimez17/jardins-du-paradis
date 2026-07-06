import { createContext, useContext, useState, ReactNode } from 'react'
import { fr } from '../translations/fr'
import { en } from '../translations/en'
import { es } from '../translations/es'

type Language = 'fr' | 'en' | 'es'

interface Translations {
  nav: {
    accueil: string
    plantes: string
    pots: string
    jardinage: string
    soins: string
    oiseaux: string
    bouquets: string
    contact: string
  }
  hero: {
    founded: string
    title: string
    subtitle: string
    welcome: string
    description: string
    description2: string
    stats: {
      experience: string
      species: string
      clients: string
    }
    cta: string
  }
  sections: {
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
  footer: {
    description: string
    contact: string
    followUs: string
    followUsText: string
    copyright: string
  }
  common: {
    orderWhatsApp: string
    seeMore: string
    reduce: string
    custom: string
  }
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const translations: Record<Language, Translations> = {
  fr,
  en,
  es,
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

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
