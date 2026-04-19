'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionSectionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenId?: string;
}

export default function AccordionSection({
  items,
  allowMultiple = false,
  defaultOpenId,
}: AccordionSectionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(
    defaultOpenId ? new Set([defaultOpenId]) : new Set()
  );

  const toggleItem = (id: string) => {
    console.log('FAQ/Accordion toggled:', id);
    const newOpenItems = new Set(openItems);

    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      if (!allowMultiple) {
        newOpenItems.clear();
      }
      newOpenItems.add(id);
    }

    setOpenItems(newOpenItems);
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="border border-gray-200 rounded-3xl bg-white overflow-hidden shadow-sm"
        >
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition font-semibold text-slate-950 text-left"
          >
            {item.title}
            <ChevronDown
              className={`w-5 h-5 pointer-events-none transition-transform ${
                openItems.has(item.id) ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openItems.has(item.id) && (
            <div className="px-6 py-4 bg-white border-t border-gray-200 text-slate-950 animate-in fade-in-0 slide-in-from-top-2">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

