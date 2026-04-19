'use client';

import { useLanguage } from '@/app/providers';
import { Language } from '@/lib/translations';
import { Globe, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

// Language metadata with native names, flags, and RTL info
const LANGUAGE_DATA: {
  code: Language;
  label: string;
  native: string;
  flag: string;
  rtl?: boolean;
}[] = [
  { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'ar', label: 'Arabic', native: 'العربية', flag: '🇸🇦', rtl: true },
  { code: 'es', label: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Portuguese', native: 'Português', flag: '🇵🇹' },
  { code: 'vi', label: 'Vietnamese', native: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'it', label: 'Italian', native: 'Italiano', flag: '🇮🇹' },
  { code: 'zh', label: 'Chinese', native: '中文', flag: '🇨🇳' },
  { code: 'de', label: 'German', native: 'Deutsch', flag: '🇩🇪' },
];

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const currentLang = LANGUAGE_DATA.find((l) => l.code === language) || LANGUAGE_DATA[0];

  const handleLanguageChange = (newLang: Language) => {
    // Optional: Add analytics or logging here
    // console.log(`Language changed to: ${newLang}`);
    setLanguage(newLang);
    
    // Optional: Persist preference (if not already handled by provider)
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', newLang);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 p-2 rounded-lg bg-gray-100 text-gray-900 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Select language"
          aria-haspopup="menu"
          aria-expanded="false"
        >
          <Globe className="h-5 w-5 pointer-events-none" aria-hidden="true" />
          <span className="hidden sm:inline text-sm font-medium">{currentLang.native}</span>
          <span className="sm:hidden text-lg">{currentLang.flag}</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        align="end" 
        className="w-56"
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
          Select Language
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {LANGUAGE_DATA.map((lang) => {
          const isActive = language === lang.code;
          return (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`flex items-center justify-between gap-3 px-3 py-2.5 cursor-pointer transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white font-medium' 
                  : 'hover:bg-gray-100'
              }`}
              role="menuitemradio"
              aria-checked={isActive}
              dir={lang.rtl ? 'rtl' : 'ltr'}
            >
              <span className="flex items-center gap-3">
                <span className="text-lg" aria-hidden="true">{lang.flag}</span>
                <span className="text-sm">{lang.native}</span>
              </span>
              {isActive && (
                <Check className="h-4 w-4" aria-hidden="true" />
              )}
            </DropdownMenuItem>
          );
        })}
        
        <DropdownMenuSeparator />
        <div className="px-3 py-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Globe className="h-3 w-3" />
            Auto-detected: <strong className="text-gray-700">{currentLang.native}</strong>
          </span>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}