'use client';

import { useLanguage } from '@/app/providers';
import { translations } from '@/lib/translations';

export default function AboutClient() {
  const { language } = useLanguage();
  const t = translations[language];
  const isArabic = language === 'ar';

  return (
    <section className="mx-auto max-w-5xl px-4 pt-28 pb-20 sm:px-6 lg:px-8" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="space-y-8">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-600">
            {t.about.label}
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t.about.title}
          </h1>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-slate-50 p-10 shadow-sm">
          <p className="text-lg leading-8 text-slate-700">
            {t.about.intro}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">
              {t.about.safety.title}
            </h2>
            <p className="mt-4 text-slate-700 leading-7">
              {t.about.safety.desc}
            </p>
          </div>
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">
              {t.about.refund.title}
            </h2>
            <p className="mt-4 text-slate-700 leading-7">
              {t.about.refund.desc}
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">
            {t.about.support.title}
          </h2>
          <p className="mt-4 text-slate-700 leading-7">
            {t.about.support.desc}
          </p>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-slate-50 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">
            {t.about.whatYouGet.title}
          </h2>
          <ul className="mt-6 space-y-4 text-slate-700">
            {t.about.whatYouGet.list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}