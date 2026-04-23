'use client';

import { MessageSquare } from 'lucide-react';

export default function AIChatWidget() {
  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        type="button"
        onClick={() => {
          fbq('track', 'Lead', {content_name: 'Floating Talk to James'});
          window.open('https://t.me/ADjamesGrugeon', '_blank');
        }}
        className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-2xl hover:bg-blue-700 transition-all duration-300"
      >
        <MessageSquare className="h-5 w-5" />
        Talk to James
      </button>
    </div>
  );
}
