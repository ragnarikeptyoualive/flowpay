'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/app/providers';
import { translations } from '@/lib/translations';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Header() {
  const { language } = useLanguage();
  const t = translations[language];
  const router = useRouter();
  const pathname = usePathname();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  // 🔍 Dev-only warning for missing nav translations
  if (process.env.NODE_ENV === 'development' && !t?.nav) {
    console.warn(`[i18n] Missing "nav" section for language: ${language}`);
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
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

  // Nav links configuration - sections that exist on home page
  const sectionLinks = [
    { id: 'solutions', label: t?.nav?.solutions || 'Solutions' },
    { id: 'continuity', label: t?.nav?.continuity || 'Continuity' },
    { id: 'how', label: t?.nav?.how || 'How It Works' },
    { id: 'faq', label: t?.nav?.faq || 'FAQ' },
  ];

  // Helper: Navigate to home page and scroll to section
  const navigateToSection = (sectionId: string) => {
    const isHomePage = pathname === '/';
    
    if (isHomePage) {
      // Already on home page - just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${sectionId}`);
      }
    } else {
      // On different page - navigate to home with hash, then scroll after load
      // Store target section in sessionStorage for the home page to read
      sessionStorage.setItem('scrollToSection', sectionId);
      router.push(`/#${sectionId}`);
    }
  };

  // Effect: Handle scroll-to-section after navigation from another page
  useEffect(() => {
    const targetSection = sessionStorage.getItem('scrollToSection');
    if (targetSection && pathname === '/') {
      // Small delay to ensure content is rendered
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
      className={`fixed top-0 left-0 w-full z-50 transform transition-transform duration-300 ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
        <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 overflow-visible">
          <img
            src="/logo.png"
            alt="FlowPay Logo"
            className="h-20 w-auto scale-110 sm:h-24 sm:scale-125"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-8 text-sm">
          {sectionLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => navigateToSection(link.id)}
              className="text-gray-700 hover:text-black transition cursor-pointer bg-transparent border-none p-0 font-inherit"
            >
              {link.label}
            </button>
          ))}
          {/* Feedbacks link - goes to separate page */}
          <Link
            href="/feedbacks"
            className="text-gray-700 hover:text-black transition"
          >
            {t?.nav?.feedbacks || 'Feedbacks'}
          </Link>
        </nav>

        {/* Right Side Controls */}
        <div className="hidden items-center gap-4 lg:flex">
          <button
            type="button"
            onClick={() => {
              fbq('track', 'Lead', {content_name: 'Floating Button'});
              window.open('https://t.me/ADjamesGrugeon', '_blank');
            }}
            className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-xl shadow-sky-500/30 hover:bg-sky-400 transition-all duration-300"
          >
            {t?.nav?.cta || 'Talk to James'}
          </button>
          <LanguageSelector />
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-4 lg:hidden">
          <LanguageSelector />
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <button 
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition [&>svg]:pointer-events-none"
                aria-label={t?.nav?.mobileMenuLabel || 'Open menu'}
              >
                <Menu className="w-6 h-6 pointer-events-none" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-white border-l border-gray-200">
              <div className="mt-8 space-y-1">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-6">
                  {t?.nav?.mobileTitle || 'Navigation'}
                </h3>
                {/* Section links - navigate to home + scroll */}
                {sectionLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      navigateToSection(link.id);
                      // Close sheet
                      const closeBtn = document.querySelector('[data-radix-sheet-close]') as HTMLElement;
                      closeBtn?.click();
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition bg-transparent border-none cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
                {/* Feedbacks - separate page */}
                <button
                  type="button"
                  onClick={(e) => {
                    fbq('track', 'Lead', {content_name: 'Pop-up Connect'}); 
                    window.open('https://t.me/ADjamesGrugeon?text=Inquiry_NewAccount', '_blank');
                    const closeBtn = document.querySelector('[data-radix-sheet-close]') as HTMLElement;
                    closeBtn?.click();
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition bg-transparent border-none cursor-pointer"
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
