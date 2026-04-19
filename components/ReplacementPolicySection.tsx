'use client';

import { useLanguage } from '@/app/providers';
import { translations } from '@/lib/translations';
import { ShieldCheck, Clock, Repeat, Award } from 'lucide-react';

export default function ReplacementPolicySection() {
  const { language } = useLanguage();
  const t = translations[language];

  const policyPoints = t.replacementPolicy.points || [];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <ShieldCheck className="mx-auto h-16 w-16 text-emerald-600 mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.replacementPolicy.title}</h2>
          <p className="text-xl text-gray-600">{t.replacementPolicy.desc}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {policyPoints.map((point, idx) => (
            <div key={idx} className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center mt-0.5">
                {idx === 0 && <Clock className="h-5 w-5 text-emerald-600" />}
                {idx === 1 && <Repeat className="h-5 w-5 text-emerald-600" />}
                {idx === 2 && <Award className="h-5 w-5 text-emerald-600" />}
                {idx === 3 && <ShieldCheck className="h-5 w-5 text-emerald-600" />}
              </div>
              <p className="text-gray-900 font-medium">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
