'use client';


import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '@/lib/translations';

const languages: Language[] = ['en', 'fr', 'ar', 'es', 'pt', 'vi', 'it', 'zh', 'de'];

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: 'en' as Language,
      setLanguage: () => {},
    };
  }
  return context;
}

export function Providers({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage first
    const saved = localStorage.getItem('language') as Language | null;
    if (saved && languages.includes(saved)) {
      setLanguage(saved);
      document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
      return;
    }
    
    // Browser language detection
    const browserLang = navigator.language.split('-')[0] as Language;
    if (languages.includes(browserLang)) {
      setLanguage(browserLang);
      document.documentElement.dir = browserLang === 'ar' ? 'rtl' : 'ltr';
      localStorage.setItem('language', browserLang);
      return;
    }
    
    // Default to English
    setLanguage('en');
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
        {children}
    </LanguageContext.Provider>
  );
}

export { LanguageContext };
