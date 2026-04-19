'use client';

import Image from 'next/image';
import styles from './LogoCarousel.module.css';
import { translations } from '@/lib/translations';
import { useLanguage } from '@/app/providers';

export default function LogoCarousel() {
  const { language } = useLanguage();
  const t = translations[language];
  const platforms = [
    { name: 'Payoneer', icon: 'https://img.icons8.com/?size=100&id=ouYlSyYhEAKU&format=png&color=000000' },
    { name: 'PayPal', icon: 'https://img.icons8.com/?size=100&id=iouv9vHfqHvP&format=png&color=000000' },
    { name: 'Shopify', icon: 'https://img.icons8.com/?size=100&id=uSHYbs6PJfMT&format=png&color=000000' },
    { name: 'Stripe', icon: 'https://img.icons8.com/?size=100&id=SyzMC3e7GlFL&format=png&color=000000' },
    { name: 'Wise', icon: 'https://img.icons8.com/?size=100&id=CUVeX1Xqt1IS&format=png&color=000000' },
    { name: 'Revolut', icon: 'https://img.icons8.com/?size=100&id=13611&format=png&color=000000' },
    { name: 'Mercury Bank', icon: 'https://cdn.brandfetch.io/idq7r2w1uM/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667844241556' },
    { name: 'Authorize.net', icon: 'https://cdn.brandfetch.io/idNgQpEjrP/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1669552253143' },
    { name: 'Binance', icon: 'https://cdn.brandfetch.io/id-pjrLx_q/w/360/h/192/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1764475497577' },
    { name: 'Skrill', icon: 'https://cdn.brandfetch.io/idsdRU0U2Z/theme/dark/idxpJSPvgI.svg?c=1bxid64Mup7aczewSAYMX&t=1690265455045' },
  ];

  // Duplicate the array enough times so the animation looks continuous
  const marqueeContent = [...platforms, ...platforms];

  return (
    <div className="w-full bg-gray-50 border-y border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-lg font-bold text-gray-600 mb-6">
          {t.carousel.subtitle}
        </p>

        <div className="relative h-24 overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]">
          {/* First marquee track */}
          <div
            className={`flex gap-12 md:gap-16 absolute top-0 left-0 animate-marquee whitespace-nowrap ${styles.marquee}`}
          >
            {marqueeContent.map((platform, idx) => {
              const isBig = ['Mercury Bank', 'Authorize.net', 'Binance', 'Skrill'].includes(platform.name);
              return (
                <div
                  key={idx}
                  className={`flex-shrink-0 flex items-center justify-center ${isBig ? 'w-28 md:w-36' : 'w-24 md:w-28'}`}
                >
                  <div className={`flex items-center justify-center ${isBig ? 'w-18 h-18 md:w-22 md:h-22' : 'w-14 h-14 md:w-16 md:h-16'}`}>
                    <img
                      src={platform.icon}
                      alt={platform.name}
                      className={`object-contain ${isBig ? 'w-14 h-14 md:w-18 md:h-18' : 'w-12 h-12 md:w-14 md:h-14'}`}
                      loading="lazy"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Second identical track (for seamless loop) */}
          <div
            className={`flex gap-12 md:gap-16 absolute top-0 left-0 animate-marquee whitespace-nowrap ${styles.marquee} [animation-delay:-12.5s]`}
          >
            {marqueeContent.map((platform, idx) => {
              const isBig = ['Mercury Bank', 'Authorize.net', 'Binance', 'Skrill'].includes(platform.name);
              return (
                <div
                  key={`dup-${idx}`}
                  className={`flex-shrink-0 flex items-center justify-center ${isBig ? 'w-28 md:w-36' : 'w-24 md:w-28'}`}
                >
                  <div className={`flex items-center justify-center ${isBig ? 'w-18 h-18 md:w-22 md:h-22' : 'w-14 h-14 md:w-16 md:h-16'}`}>
                    <img
                      src={platform.icon}
                      alt={platform.name}
                      className={`object-contain ${isBig ? 'w-14 h-14 md:w-18 md:h-18' : 'w-12 h-12 md:w-14 md:h-14'}`}
                      loading="lazy"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

