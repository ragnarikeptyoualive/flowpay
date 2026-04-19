'use client';

import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  const questions = [
    {
      question: 'How fast can I launch in the US?',
      answer: 'You can launch verified US operations in under 48 hours with our pre-configured Shopify and Stripe merchant accounts. We handle all verification and compliance setup.'
    },
    {
      question: 'Show me a verified Shopify + Stripe package',
      answer: 'Our premium package includes: verified Shopify store ($2,500+ value), Stripe merchant account with 3D Secure, escrow-protected payments, and 3 months support. Total setup time: 24-48 hours.'
    },
    {
      question: 'Explain escrow protections step by step',
      answer: '1) Buyer funds are held in escrow. 2) Seller delivers the service/product. 3) Buyer confirms delivery. 4) Funds are released to seller. 5) Any disputes are handled by our support team within 24 hours.'
    },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-80 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">AI Concierge</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">Ask our setup assistant</h3>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100"
              aria-label="Close AI assistant"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Get instant guidance on merchant setup, escrow flow, and verified account launch.
          </p>
          <div className="mt-4 space-y-3">
            {questions.map((item) => (
              <div key={item.question}>
                <button
                  onClick={() => setSelectedQuestion(selectedQuestion === item.question ? null : item.question)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-left text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  {item.question}
                </button>
                {selectedQuestion === item.question && (
                  <div className="mt-2 rounded-xl bg-blue-50 p-3 text-sm text-slate-700">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
          <a
            href="https://t.me/ADjamesGrugeon"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Connect on Telegram
          </a>
        </div>
      )}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-2xl hover:bg-blue-700 transition"
      >
        <MessageSquare className="h-5 w-5" />
        AI Concierge
      </button>
    </div>
  );
}
