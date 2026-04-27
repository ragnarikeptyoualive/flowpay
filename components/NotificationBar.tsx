'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/providers';

declare const fbq: (...args: any[]) => void;

type Language = 'en' | 'fr' | 'ar' | 'es' | 'pt' | 'vi' | 'it' | 'zh' | 'de';

const notifBarText: Record<Language, string> = {
  en: '⚠️ Only 3 Stripe Accounts Left Today — Limited stock, high demand!',
  fr: '⚠️ Plus que 3 comptes Stripe aujourd\'hui — Stock limité, forte demande !',
  ar: '⚠️ لم يتبق سوى 3 حسابات Stripe اليوم — كمية محدودة وطلب مرتفع!',
  es: '⚠️ Solo quedan 3 cuentas Stripe hoy — Stock limitado, alta demanda!',
  pt: '⚠️ Apenas 3 contas Stripe restantes hoje — Estoque limitado, alta demanda!',
  vi: '⚠️ Chỉ còn 3 tài khoản Stripe hôm nay — Hàng giới hạn, nhu cầu cao!',
  it: '⚠️ Solo 3 account Stripe rimasti oggi — Stock limitato, alta richiesta!',
  zh: '⚠️ 今日仅剩 3 个 Stripe 账户 — 库存有限，需求高！',
  de: '⚠️ Nur noch 3 Stripe-Konten heute — Begrenzter Vorrat, hohe Nachfrage!',
};

const ctaText: Record<Language, string> = {
  en: 'Message on Telegram',
  fr: 'Message sur Telegram',
  ar: 'راسل على تليجرام',
  es: 'Mensaje en Telegram',
  pt: 'Mensagem no Telegram',
  vi: 'Nhắn tin trên Telegram',
  it: 'Messaggio su Telegram',
  zh: 'Telegram 消息',
  de: 'Nachricht auf Telegram',
};

export default function NotificationBar() {
  const { language } = useLanguage();
  const [showNotif, setShowNotif] = useState(true);

  if (!showNotif) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-50 min-h-[3.5rem] sm:h-12 flex flex-col sm:flex-row items-center justify-between bg-yellow-400 text-black py-2 px-3 sm:px-4 shadow-lg animate-pulse gap-1 sm:gap-0">
      <span className="font-semibold text-xs sm:text-sm flex-1 text-center sm:text-left leading-tight">
        {notifBarText[language]}
      </span>
      <div className="flex items-center gap-2 mt-2 sm:mt-0">
        <a
          href="https://t.me/ADjamesGrugeon"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            if (typeof fbq !== 'undefined') {
              fbq('track', 'Lead', { content_name: 'Scarcity Bar' });
            }
          }}
          className="bg-black text-yellow-400 px-3 py-2 rounded-full font-bold text-xs hover:bg-gray-900 transition whitespace-nowrap"
        >
          {ctaText[language]}
        </a>
        <button
          aria-label="Close notification"
          className="text-black/60 hover:text-black text-lg px-2"
          onClick={() => setShowNotif(false)}
        >
          ×
        </button>
      </div>
    </div>
  );
}

