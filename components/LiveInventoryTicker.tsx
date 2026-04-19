'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/app/providers';
import { translations } from '@/lib/translations';
import { CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

// Country metadata for better UX (flag + name + region)
const COUNTRY_META: Record<string, { name: string; region: string }> = {
  '🇲🇦': { name: 'Morocco', region: 'MENA' },
  '🇩🇿': { name: 'Algeria', region: 'MENA' },
  '🇪🇬': { name: 'Egypt', region: 'MENA' },
  '🇱🇧': { name: 'Lebanon', region: 'MENA' },
  '🇪🇸': { name: 'Spain', region: 'EU' },
  '🇫🇷': { name: 'France', region: 'EU' },
  '🇬🇧': { name: 'United Kingdom', region: 'EU' },
  '🇺🇸': { name: 'United States', region: 'NA' },
  '🇦🇪': { name: 'UAE', region: 'MENA' },
  '🇻🇳': { name: 'Vietnam', region: 'APAC' },
  '🇵🇭': { name: 'Philippines', region: 'APAC' },
};

// Trust badges to rotate alongside inventory
const TRUST_BADGES = [
  { icon: ShieldCheck, text: 'Escrow-Verified', color: 'text-blue-600' },
  { icon: CheckCircle2, text: 'Delivery Confirmed', color: 'text-emerald-600' },
  { icon: Clock, text: 'Real-Time Updates', color: 'text-indigo-600' },
];

export default function LiveInventoryTicker() {
  const { language } = useLanguage();
  const t = translations[language];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [badgeIndex, setBadgeIndex] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isHovered, setIsHovered] = useState(false);

  // Safe access to liveInventory with fallback
  const inventory = t?.liveInventory || [
    '✅ 1x US Stripe + Shopify Store just delivered to an operator in Morocco 🇲🇦',
    '✅ 1x UK Aged Stripe Account delivered to Algeria 🇩🇿',
    '✅ 1x High-Limit Shopify delivered to Egypt 🇪🇬',
  ];

  // Parse delivery message to extract flag and details
  const parseDelivery = (message: string) => {
    const flagMatch = message.match(/(🇦🇪|🇦🇷|🇩🇿|🇪🇬|🇪🇸|🇫🇷|🇬🇧|🇱🇧|🇲🇦|🇵🇭|🇺🇸|🇻🇳)/);
    const flag = flagMatch?.[0] || '🌍';
    const country = COUNTRY_META[flag] || { name: 'Global', region: 'INTL' };
    
    // Extract account type (Stripe, Shopify, etc.)
    const accountType = message.match(/(Stripe|Shopify|Banking|Account)/i)?.[0] || 'Account';
    
    return { flag, country, accountType, fullMessage: message };
  };

  const currentDelivery = parseDelivery(inventory[currentIndex]);
  const currentBadge = TRUST_BADGES[badgeIndex];

  // Rotate inventory items
  useEffect(() => {
    if (isHovered) return; // Pause animation on hover for readability
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % inventory.length);
      setLastUpdated(new Date());
    }, 8000);

    return () => clearInterval(interval);
  }, [inventory.length, isHovered]);

  // Rotate trust badges independently
  useEffect(() => {
    const badgeInterval = setInterval(() => {
      setBadgeIndex((prev) => (prev + 1) % TRUST_BADGES.length);
    }, 4000);
    return () => clearInterval(badgeInterval);
  }, []);

  // Format time ago for "last updated"
  const formatTimeAgo = useCallback((date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  }, []);

  return (
    <div 
      className="bg-gradient-to-r from-slate-50 via-blue-50/30 to-slate-50 border-y border-slate-200/80 py-3 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Live Indicator + Trust Badge */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="relative">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
            </div>
            <span className="hidden sm:inline text-xs font-medium text-slate-600">
              LIVE
            </span>
            <div className="h-4 w-px bg-slate-300 hidden sm:block" />
            <div className={`flex items-center gap-1.5 text-xs font-medium ${currentBadge.color}`}>
              <currentBadge.icon className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden md:inline">{currentBadge.text}</span>
            </div>
          </div>

          {/* Delivery Message with Fade Transition */}
          <div className="flex-1 min-w-0 relative">
            <div 
              key={currentIndex}
              className="animate-fade-in flex items-center gap-2 sm:gap-3"
            >
              {/* Country Flag + Region Badge */}
              <div className="flex-shrink-0 flex items-center gap-1.5">
                <span className="text-lg sm:text-xl" aria-hidden="true">
                  {currentDelivery.flag}
                </span>
                <span className="hidden xs:inline text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                  {currentDelivery.country.region}
                </span>
              </div>

              {/* Message Text */}
              <p className="text-sm sm:text-base font-medium text-slate-800 truncate">
                <span className="text-emerald-600 mr-1">✓</span>
                {currentDelivery.accountType} delivered to{' '}
                <span className="font-semibold text-slate-900">
                  {currentDelivery.country.name}
                </span>
              </p>
            </div>
          </div>

          {/* Right Side: Timestamp Only */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">{formatTimeAgo(lastUpdated)}</span>
              <span className="sm:hidden">{formatTimeAgo(lastUpdated).replace(' ago', '')}</span>
            </div>
          </div>

        </div>

        {/* Mobile-Only: Simplified Trust Row */}
        <div className="sm:hidden mt-2 flex items-center justify-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
            Escrow-Protected
          </span>
        </div>
      </div>

      {/* Subtle Bottom Border Accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent" />
    </div>
  );
}