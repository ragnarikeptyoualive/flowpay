'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import Link from 'next/link';

import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/app/providers';
import { translations } from '@/lib/translations';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Header() {
  const { language } = useLanguage();
  const t = translations[language];
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

  // Nav links with fallbacks - Proof changed to Feedbacks linking to /feedbacks page
  const navLinks = [
    { href: '#solutions', label: t?.nav?.solutions || 'Solutions', isExternal: false },
    { href: '#continuity', label: t?.nav?.continuity || 'Continuity', isExternal: false },
    { href: '/feedbacks', label: t?.nav?.feedbacks || 'Feedbacks', isExternal: true }, // ✅ Changed: Proof → Feedbacks page
    { href: '#how', label: t?.nav?.how || 'How It Works', isExternal: false },
    { href: '#faq', label: t?.nav?.faq || 'FAQ', isExternal: false },
  ];

  // Helper to handle navigation
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isExternal: boolean) => {
    if (isExternal) {
      // Let Next.js handle page navigation
      return;
    }
    // Handle anchor scroll for same-page links
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Update URL without reload
      window.history.pushState(null, '', href);
    }
  };

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
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href, link.isExternal || false)}
              className="text-gray-700 hover:text-black transition cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Side Controls */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="https://t.me/ADjamesGrugeon?text=Inquiry_NewAccount"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-xl shadow-sky-500/30 transition hover:bg-sky-400"
          >
            {t?.nav?.cta || 'Talk to James'}
          </a>
          <LanguageSelector />
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-4 lg:hidden">
          <LanguageSelector />
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <button 
                onClick={() => console.log('Burger menu clicked')} 
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
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      if (!link.isExternal) {
                        e.preventDefault();
                        const targetId = link.href.replace('#', '');
                        const element = document.getElementById(targetId);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                          window.history.pushState(null, '', link.href);
                        }
                      }
                      // Close sheet after click
                      const closeBtn = document.querySelector('[data-radix-sheet-close]') as HTMLElement;
                      closeBtn?.click();
                    }}
                    className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}