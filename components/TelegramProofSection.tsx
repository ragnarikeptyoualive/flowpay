'use client';

import { useLanguage } from '@/app/providers';
import { translations } from '@/lib/translations';
import { MessageCircle, Phone, Send } from 'lucide-react';

export default function TelegramProofSection() {
  const { language } = useLanguage();
  const t = translations[language];

  const proofs = t.telegramProofs || [];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <MessageCircle className="mx-auto h-12 w-12 text-blue-600 mb-4" />
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Real Telegram Vouches</h3>
          <p className="text-lg text-gray-600">Direct client feedback from Telegram</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {proofs.map((proof, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{proof.author}</p>
                  <p className="text-sm text-blue-600">Telegram</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{proof.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
