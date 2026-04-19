'use client';

import NextImage from 'next/image';
import { useLanguage } from '@/app/providers';
import { translations } from '@/lib/translations';

export default function FeedbacksClient() {
  const { language } = useLanguage();
  const t = translations[language];
  const isArabic = language === 'ar';

  const screenshotImages = [
    '/image_366x800_1.jpg',
    '/image_366x800_2.jpg',
    '/image_366x800_4.jpg',
    '/image_369x800_3.jpg',
    '/image_369x800_5.jpg',
    '/image_369x800_6.jpg',
    '/image_369x800_7.jpg',
    '/image_375x800_8.jpg',
    '/image_389x800_9.jpg',
    '/image_460x800_1.jpg',
    '/image_462x800_1.jpg',
    '/image_471x800_1.jpg',
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:px-8" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-600 mx-auto">
            {t?.feedbacks?.label || 'FEEDBACKS'}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight max-w-4xl mx-auto">
            {t?.feedbacks?.title || 'Past Deals Feedback'}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t?.feedbacks?.desc || 'Real screenshots from completed FlowPay transactions'}
          </p>
        </div>

        {/* Gallery Grid: 1 col mobile, 3 cols desktop - FIXED FOR MOBILE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {screenshotImages.map((src, index) => (
            <div key={index} className="group">
              {/* ✅ Fixed: Use responsive aspect ratio and object-cover for mobile */}
              <div className="relative w-full aspect-[3/4] md:aspect-[0.46] rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-gray-50 to-gray-100">
                <NextImage
                  src={src}
                  alt={`Feedback screenshot ${index + 1}`}
                  fill
                  className="object-cover md:object-contain" // ✅ Cover on mobile, contain on desktop
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={index < 3} // ✅ Load first 3 images immediately
                />
              </div>
              {/* Optional: Caption below image */}
              
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-4 pt-12 border-t border-gray-200">
          <p className="text-lg text-slate-600 max-w-md mx-auto">
            Check all feedbacks and live updates
          </p>
          <a
            href="https://t.me/JG_Accounts" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg"
          >
            Join Telegram Channel
            <span className="text-sm">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}