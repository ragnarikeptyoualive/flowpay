// app/privacy/PrivacyClient.tsx
'use client';

import { useLanguage } from '@/app/providers';
import { translations } from '@/lib/translations';

export default function PrivacyClient() {
  const { language } = useLanguage();
  const t = translations[language];
  const isArabic = language === 'ar';

  // 🔍 Dev-only warning for missing privacy translations
  if (process.env.NODE_ENV === 'development' && !t?.privacy) {
    console.warn(`[i18n] Missing "privacy" section for language: ${language}`);
  }

  return (
    <section className="mx-auto max-w-5xl px-4 pt-28 pb-20 sm:px-6 lg:px-8" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="space-y-8">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-600">
            {t?.privacy?.label || 'PRIVACY POLICY'}
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t?.privacy?.title || 'Privacy Policy'}
          </h1>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-slate-50 p-10 shadow-sm">
          <p className="text-lg leading-8 text-slate-700">
            {t?.privacy?.intro || 'We take your privacy seriously. This policy explains how we collect, use, and protect your information when you use our services.'}
          </p>
        </div>

        <div className="space-y-6">
          <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">
              {t?.privacy?.infoUsed?.title || 'Information We Collect'}
            </h2>
            <p className="mt-4 text-slate-700 leading-7">
              {t?.privacy?.infoUsed?.desc || 'We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.'}
            </p>
          </section>

          <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">
              {t?.privacy?.dataProtection?.title || 'How We Protect Your Data'}
            </h2>
            <p className="mt-4 text-slate-700 leading-7">
              {t?.privacy?.dataProtection?.desc || 'We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure.'}
            </p>
          </section>

          <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">
              {t?.privacy?.supportComms?.title || 'Communications & Support'}
            </h2>
            <p className="mt-4 text-slate-700 leading-7">
              {t?.privacy?.supportComms?.desc || 'We may contact you via Telegram, WhatsApp, or email to provide support, updates, or important service notifications.'}
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}