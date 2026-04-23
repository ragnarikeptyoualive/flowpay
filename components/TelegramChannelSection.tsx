'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/providers';
import { translations } from '@/lib/translations';
import { Send, Users } from 'lucide-react';

export default function TelegramChannelSection() {
  const { language } = useLanguage();
  const t = translations[language];
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    window.open('http://t.me/Jg_accounts', '_blank');
    fbq('track', 'Lead', {content_name: 'Channel Join'});
    setJoined(true);
    setTimeout(() => setJoined(false), 3000);
  };

  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <Users className="mx-auto h-16 w-16 mb-6 opacity-90" />
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.telegramChannel.title}</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-90">{t.telegramChannel.desc}</p>
        <button
          onClick={handleJoin}
          className="inline-flex items-center gap-3 bg-white text-indigo-700 px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 group"
        >
          <Send className="group-hover:-translate-x-1 transition-transform" />
          {joined ? t.telegramChannel.success : t.telegramChannel.cta}
        </button>
      </div>
    </section>
  );
}
