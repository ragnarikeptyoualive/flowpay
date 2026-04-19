'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
    window.setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <section id="newsletter" className="bg-white text-slate-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-slate-50 p-10 shadow-lg">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Stay ahead</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Market updates for operators and founders.</h2>
            <p className="mt-4 max-w-2xl text-slate-900 leading-7">
              Join our newsletter for urgent alerts, launch notes, and compliance insights designed for high-volume payment operators.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <label htmlFor="newsletter-email" className="sr-only">Email</label>
            <div className="relative w-full sm:max-w-sm">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@company.com"
                className="w-full rounded-full border border-white/10 bg-slate-950/80 py-4 pl-12 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-300/20"
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-14 items-center justify-center rounded-full bg-sky-500 px-6 text-sm font-semibold text-white transition hover:bg-sky-400"
            >
              Subscribe
            </button>
          </form>
        </div>
        {submitted && (
          <p className="mt-6 text-sm text-sky-200">Thanks! You’ll receive updates when new opportunities go live.</p>
        )}
      </div>
    </section>
  );
}
