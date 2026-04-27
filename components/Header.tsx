'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/app/providers';
import { translations } from '@/lib/translations';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

declare const fbq: (...args: any[]) => void;

export default function Header() {
  const { language } = useLanguage();
  const t = translations[language];
  const router = useRouter();
  const pathname = usePathname();
  
  const [isAtTop, setIsAtTop] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const isHomePage = pathname === '/';

  // 🔍 Dev-only warning
  if (process.env.NODE_ENV === 'development' && !t?.nav) {
    console.warn(`[i18n] Missing "nav" section for language: ${language}`);
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Detect top
      setIsAtTop(scrollY < 20);

      // Show/hide logic
      if (scrollY < 80) {
        setShowHeader(true);
      } else {
        setShowHeader(scrollY < lastScrollY.current);
      }

      lastScrollY.current = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectionLinks = [
    { id: 'solutions', label: t?.nav?.solutions || 'Solutions' },
    { id: 'continuity', label: t?.nav?.continuity || 'Continuity' },
    { id: 'how', label: t?.nav?.how || 'How It Works' },
    { id: 'faq', label: t?.nav?.faq || 'FAQ' },
  ];

  const navigateToSection = (sectionId: string) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      sessionStorage.setItem('scrollToSection', sectionId);
      router.push(`/#${sectionId}`);
    }
  };

  useEffect(() => {
    const targetSection = sessionStorage.getItem('scrollToSection');
    if (targetSection && pathname === '/') {
      const timer = setTimeout(() => {
        const element = document.getElementById(targetSection);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        sessionStorage.removeItem('scrollToSection');
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <header
      className={`fixed top-[3.5rem] sm:top-12 left-0 w-full z-40 transform transition-all duration-200 ease-in-out ${
        showHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } ${
        isAtTop && isHomePage
          ? 'bg-transparent'
          : showHeader
          ? 'bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
        
        <Link
          href="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 overflow-visible"
        >
          <img
            src="/logo.png"
            alt="FlowPay Logo"
            className="h-20 w-auto scale-110 sm:h-24 sm:scale-125 transition-transform duration-300"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className={`hidden lg:flex gap-8 text-sm transition-colors duration-300 ${
            isAtTop && isHomePage ? 'text-white drop-shadow-md' : 'text-gray-700'
          }`}
        >
          {sectionLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => navigateToSection(link.id)}
              className={`transition cursor-pointer bg-transparent border-none p-0 font-inherit ${
                isAtTop && isHomePage ? 'hover:text-white/80' : 'hover:text-black'
              }`}
            >
              {link.label}
            </button>
          ))}

          <Link
            href="/feedbacks"
            className={`transition ${
              isAtTop && isHomePage ? 'hover:text-white/80' : 'hover:text-black'
            }`}
          >
            {t?.nav?.feedbacks || 'Feedbacks'}
          </Link>
        </nav>

        {/* Right Side */}
        <div className="hidden items-center gap-4 lg:flex">
          <button
            type="button"
            onClick={() => {
              if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', { content_name: 'Floating Button' });
              }
              window.open('https://t.me/ADjamesGrugeon', '_blank');
            }}
            className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-xl shadow-sky-500/30 hover:bg-sky-400 transition-all duration-300"
          >
            {t?.nav?.cta || 'Talk to James'}
          </button>

          <LanguageSelector />
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-4 lg:hidden">
          <LanguageSelector />

          <Sheet>
            <SheetTrigger asChild>
              <button
                className={`p-2 rounded-lg transition ${
                  isAtTop && isHomePage
                    ? 'hover:bg-white/10 text-white drop-shadow-md'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
                aria-label={t?.nav?.mobileMenuLabel || 'Open menu'}
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72 bg-white border-l border-gray-200">
              <div className="mt-8 space-y-1">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-6">
                  {t?.nav?.mobileTitle || 'Navigation'}
                </h3>

                {sectionLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      navigateToSection(link.id);
                      document.querySelector('[data-radix-sheet-close]')?.dispatchEvent(new Event('click'));
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition"
                  >
                    {link.label}
                  </button>
                ))}

                <button
                  onClick={() => {
                    if (typeof fbq !== 'undefined') {
                      fbq('track', 'Lead', { content_name: 'Pop-up Connect' });
                    }
                    window.open('https://t.me/ADjamesGrugeon?text=Inquiry_NewAccount', '_blank');
                    document.querySelector('[data-radix-sheet-close]')?.dispatchEvent(new Event('click'));
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition"
                >
                  {t?.nav?.feedbacks || 'Feedbacks'}
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
