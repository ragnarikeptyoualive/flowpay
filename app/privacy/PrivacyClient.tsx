// app/privacy/PrivacyClient.tsx
'use client';

import { useLanguage } from '@/app/providers';
import { translations } from '@/lib/translations';

export default function PrivacyClient() {
  const { language } = useLanguage();
  const t = translations[language];
  const isArabic = language === 'ar';

  return (
    <section className="mx-auto max-w-5xl px-4 pt-28 pb-20 sm:px-6 lg:px-8" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="space-y-8">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-600">
            {t.privacy.label}
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t.privacy.title}
          </h1>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-slate-50 p-10 shadow-sm">
          <p className="text-lg leading-8 text-slate-700">
            {t.privacy.intro}
          </p>
        </div>

        <div className="space-y-6">
          <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">
              {t.privacy.infoUsed.title}
            </h2>
            <p className="mt-4 text-slate-700 leading-7">
              {t.privacy.infoUsed.desc}
            </p>
          </section>

          <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">
              {t.privacy.dataProtection.title}
            </h2>
            <p className="mt-4 text-slate-700 leading-7">
              {t.privacy.dataProtection.desc}
            </p>
          </section>

          <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">
              {t.privacy.supportComms.title}
            </h2>
            <p className="mt-4 text-slate-700 leading-7">
              {t.privacy.supportComms.desc}
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}