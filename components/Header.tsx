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

  const navLinks = [
    { href: '#solutions', label: t.nav.solutions },
    { href: '#continuity', label: t.nav.continuity },
    { href: '#proof', label: t.nav.proof },
    { href: '#how', label: t.nav.how },
    { href: '#faq', label: t.nav.faq },
  ];

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
              className="text-gray-700 hover:text-black transition"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Side Controls */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="https://t.me/ADjamesGrugeon"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-xl shadow-sky-500/30 transition hover:bg-sky-400"
          >
            James Now
          </a>
          <LanguageSelector />
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-4 lg:hidden">
          <LanguageSelector />
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
<button onClick={() => console.log('Burger menu clicked')} className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition [&>svg]:pointer-events-none">
<Menu className="w-6 h-6 pointer-events-none" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-white border-l border-gray-200">
              <div className="mt-8 space-y-1">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-6">Navigation</h3>
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
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

