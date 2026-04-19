'use client';

import { useState, useEffect, useRef } from 'react';
import NextImage from 'next/image'; // ✅ MUST use alias to avoid DOM Image conflict
import { useLanguage } from '@/app/providers';
import { translations } from '@/lib/translations';
import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';
import LogoCarousel from '@/components/LogoCarousel';
import AccordionSection from '@/components/AccordionSection';
import StatsCounter from '@/components/StatsCounter';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import LiveInventoryTicker from '@/components/LiveInventoryTicker';
import TelegramChannelSection from '@/components/TelegramChannelSection';
import ReplacementPolicySection from '@/components/ReplacementPolicySection';
import TelegramProofSection from '@/components/TelegramProofSection';
import AIChatWidget from '@/components/AIChatWidget';
import ScrollAnimationWrapper from '@/components/ScrollAnimationWrapper';
import { Check, Bolt, ShieldCheck, Globe2, Headset } from 'lucide-react';
import GalleryAutoSlider from '@/components/GalleryAutoSlider';   // ← ADD THIS LINE

export default function HomeClient() {
  const { language } = useLanguage();
  const t = translations[language];
  const isArabic = language === 'ar';

  // 🔍 Dev-only warnings for missing translation sections
  if (process.env.NODE_ENV === 'development') {
    if (!t?.hero) console.warn(`[i18n] Missing "hero" for language: ${language}`);
    if (!t?.featureCards) console.warn(`[i18n] Missing "featureCards" for language: ${language}`);
    if (!t?.how) console.warn(`[i18n] Missing "how" for language: ${language}`);
    if (!t?.solutions) console.warn(`[i18n] Missing "solutions" for language: ${language}`);
    if (!t?.continuity) console.warn(`[i18n] Missing "continuity" for language: ${language}`);
    if (!t?.proof) console.warn(`[i18n] Missing "proof" for language: ${language}`);
    if (!t?.faq) console.warn(`[i18n] Missing "faq" for language: ${language}`);
    if (!t?.cta) console.warn(`[i18n] Missing "cta" for language: ${language}`);
    if (!t?.terms) console.warn(`[i18n] Missing "terms" for language: ${language}`);
  }

  // Solution cards using translations with fallbacks
  const solutionCards = [
    {
      icon: <ShieldCheck className="h-12 w-12 text-sky-600" />,
      title: t?.solutions?.merchant?.title || 'Merchant Solutions',
      description: t?.solutions?.merchant?.desc || 'Seamless payment processing for high-risk merchants.',
      points: [
        t?.solutions?.merchant?.p1 || 'Instant onboarding',
        t?.solutions?.merchant?.p2 || 'Multi-currency support',
        t?.solutions?.merchant?.p3 || 'Chargeback protection',
      ],
    },
    {
      icon: <Globe2 className="h-12 w-12 text-cyan-600" />,
      title: t?.solutions?.banking?.title || 'Banking Solutions',
      description: t?.solutions?.banking?.desc || 'Verified accounts for global financial operations.',
      points: [
        t?.solutions?.banking?.p1 || 'KYC-ready accounts',
        t?.solutions?.banking?.p2 || 'Fast payout speeds',
        t?.solutions?.banking?.p3 || 'Multi-region coverage',
      ],
    },
    {
      icon: <Bolt className="h-12 w-12 text-violet-600" />,
      title: t?.solutions?.escrow?.title || 'Escrow Services',
      description: t?.solutions?.escrow?.desc || 'Secure, neutral third-party transaction protection.',
      points: [
        t?.solutions?.escrow?.p1 || '100% fund protection',
        t?.solutions?.escrow?.p2 || 'Instant release on confirmation',
        t?.solutions?.escrow?.p3 || 'Dispute resolution included',
      ],
    },
  ];

  // Continuity items using translations with fallbacks
  const continuityItems = [
    { 
      title: t?.continuity?.uptime?.title || '99.9% Uptime', 
      desc: t?.continuity?.uptime?.desc || 'Infrastructure built for zero downtime.' 
    },
    { 
      title: t?.continuity?.compliance?.title || 'Compliance Ready', 
      desc: t?.continuity?.compliance?.desc || 'Pre-vetted for regulatory requirements.' 
    },
    { 
      title: t?.continuity?.support?.title || '24/7 Support', 
      desc: t?.continuity?.support?.desc || 'Multilingual help whenever you need it.' 
    },
    { 
      title: t?.continuity?.rapid?.title || 'Rapid Deployment', 
      desc: t?.continuity?.rapid?.desc || 'Go live in hours, not weeks.' 
    },
  ];

  // Proof items using translations with fallbacks
  const proofs = [
    t?.proof?.p1 || 'Verified revenue screenshots',
    t?.proof?.p2 || 'Real payout confirmations',
    t?.proof?.p3 || 'Active account dashboards',
    t?.proof?.p4 || 'Client testimonials',
    t?.proof?.p5 || 'Escrow transaction logs',
    t?.proof?.p6 || 'Telegram proof channel',
  ];

  // Value rows using translations with fallbacks
  const valueRows = [
    { label: t?.terms?.title || 'Setup Time', value: t?.terms?.setup || '< 24 hours' },
    { label: t?.terms?.escrow || 'Escrow', value: t?.terms?.protection || 'Included' },
    { label: t?.terms?.coverage || 'Coverage', value: t?.terms?.jurisdictions || 'Global' },
  ];

  // Feature cards with fallbacks
  const featureCards = [
    { 
      title: t?.featureCards?.[0]?.title || 'Instant Setup', 
      description: t?.featureCards?.[0]?.description || 'Get started in minutes, not days.', 
      icon: <Bolt className="h-8 w-8 text-sky-500" /> 
    },
    { 
      title: t?.featureCards?.[1]?.title || 'Verified Accounts', 
      description: t?.featureCards?.[1]?.description || 'Pre-vetted, ready-to-use accounts.', 
      icon: <ShieldCheck className="h-8 w-8 text-slate-900" /> 
    },
    { 
      title: t?.featureCards?.[2]?.title || 'Global Coverage', 
      description: t?.featureCards?.[2]?.description || 'Access accounts across multiple regions.', 
      icon: <Globe2 className="h-8 w-8 text-cyan-500" /> 
    },
    { 
      title: t?.featureCards?.[3]?.title || '24/7 Support', 
      description: t?.featureCards?.[3]?.description || 'Dedicated help whenever you need it.', 
      icon: <Headset className="h-8 w-8 text-violet-500" /> 
    },
  ];

  // How steps with fallbacks
  const howSteps = [
    {
      num: t?.how?.step1?.num || 'Step 1',
      title: t?.how?.step1?.title || 'Connect & Confirm',
      desc: t?.how?.step1?.desc || 'Reach out via Telegram or WhatsApp. Share your requirements. We match you with a verified account.',
      icon: '💬',
      accent: 'from-blue-500 to-sky-500',
    },
    {
      num: t?.how?.step2?.num || 'Step 2',
      title: t?.how?.step2?.title || 'Verify & Secure',
      desc: t?.how?.step2?.desc || 'Review account details, use our escrow service, and complete the transfer with full protection.',
      icon: '🔍',
      accent: 'from-indigo-500 to-violet-500',
    },
    {
      num: t?.how?.step3?.num || 'Step 3',
      title: t?.how?.step3?.title || 'Deploy & Scale',
      desc: t?.how?.step3?.desc || 'Get full credentials, 2FA reset, and start operating immediately with confidence.',
      icon: '🔒',
      accent: 'from-teal-500 to-cyan-500',
    },
  ];

  // Accordion items with fallbacks for all t.how accesses
  const buyingSellingAccordionItems = [
    {
      id: 'buying',
      title: `🔵 ${t?.how?.buying || 'Buying'}`,
      content: (
        <div className="border-l-4 border-blue-600 pl-6">
          <ul className="space-y-2 text-gray-700">
            <li>✓ {t?.how?.bp1 || 'Browse verified accounts'}</li>
            <li>✓ {t?.how?.bp2 || 'Secure payment via escrow'}</li>
            <li>✓ {t?.how?.bp3 || 'Instant handover & support'}</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'selling',
      title: `🔴 ${t?.how?.selling || 'Selling'}`,
      content: (
        <div className="border-l-4 border-red-600 pl-6">
          <ul className="space-y-2 text-gray-700">
            <li>✓ {t?.how?.sp1 || 'List your account securely'}</li>
            <li>✓ {t?.how?.sp2 || 'Get paid via protected escrow'}</li>
            <li>✓ {t?.how?.sp3 || 'Zero chargeback risk'}</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'frozen',
      title: `🔓 ${t?.how?.frozen || 'Frozen Account?'}`,
      content: (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 -m-4">
          <p className="text-gray-700">{t?.how?.frozenDesc || 'We help recover or replace frozen accounts with verified alternatives.'}</p>
        </div>
      ),
    },
    {
      id: 'trust',
      title: `✅ ${t?.how?.trust || 'Why Trust Us?'}`,
      content: (
        <div className="bg-green-50 border-l-4 border-green-600 p-4 -m-4">
          <ul className="space-y-2 text-gray-700">
            <li>✓ {t?.how?.t1 || '5,000+ successful transactions'}</li>
            <li>✓ {t?.how?.t2 || 'Escrow protection on every deal'}</li>
            <li>✓ {t?.how?.t3 || '24/7 multilingual support'}</li>
            <li>✓ {t?.how?.t4 || 'Verified accounts only'}</li>
            <li>✓ {t?.how?.t5 || 'Transparent pricing'}</li>
            <li>✓ {t?.how?.t6 || 'Post-sale support included'}</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'rules',
      title: `⚠️ ${t?.how?.rules || 'Rules & Restrictions'}`,
      content: (
        <div className="bg-red-50 border-l-4 border-red-600 p-4 -m-4">
          <ul className="space-y-2 text-gray-700">
            <li>— {t?.how?.r1 || 'No chargebacks or disputes'}</li>
            <li>— {t?.how?.r2 || 'No illegal use of accounts'}</li>
            <li>— {t?.how?.r3 || 'Respect platform ToS'}</li>
            <li>— {t?.how?.r4 || 'One account per buyer unless approved'}</li>
            <li>— {t?.how?.r5 || 'Escrow fees are non-refundable'}</li>
          </ul>
        </div>
      ),
    },
  ];

  // FAQ items with fallbacks
  const faqItems = [
    { id: 'faq1', title: t?.faq?.q1 || 'How fast is delivery?', content: t?.faq?.a1 || 'Most accounts are delivered within 1-24 hours after payment confirmation.' },
    { id: 'faq2', title: t?.faq?.q2 || 'Is escrow mandatory?', content: t?.faq?.a2 || 'Yes, all transactions use our secure escrow service for buyer and seller protection.' },
    { id: 'faq3', title: t?.faq?.q3 || 'What if my account gets banned?', content: t?.faq?.a3 || 'We offer replacement guarantees on eligible accounts within the warranty period.' },
    { id: 'faq4', title: t?.faq?.q4 || 'Do you support my country?', content: t?.faq?.a4 || 'We operate globally. Contact us to confirm availability for your region.' },
    { id: 'faq5', title: t?.faq?.q5 || 'How do I contact support?', content: t?.faq?.a5 || 'Reach us 24/7 via Telegram @ADjamesGrugeon or WhatsApp +1 (254) 275-5458.' },
  ];

  // Proof cards with images 1-6 from public folder
  const imageProofs = [
    {
      title: t?.proof?.cards?.[0]?.title || 'Real-time Analytics',
      src: '/1.1.jpeg',
      alt: t?.proof?.cards?.[0]?.alt || 'Account Result 1'
    },
    {
      title: t?.proof?.cards?.[0]?.title || 'Real-time Analytics',
      src: '/1.2.jpeg',
      alt: t?.proof?.cards?.[0]?.alt || 'Account Result 1'
    },
    {
      title: t?.proof?.cards?.[0]?.title || 'Real-time Analytics',
      src: '/1.3.jpeg',
      alt: t?.proof?.cards?.[0]?.alt || 'Account Result 1'
    },
    {
      title: t?.proof?.cards?.[0]?.title || 'Real-time Analytics',
      src: '/1.4.jpeg',
      alt: t?.proof?.cards?.[0]?.alt || 'Account Result 1'
    },
    
    {
      title: t?.proof?.cards?.[1]?.title || 'Payment Tracking',
      src: '/2.jpeg',
      alt: t?.proof?.cards?.[1]?.alt || 'Account Result 2'
    },
    {
      title: t?.proof?.cards?.[2]?.title || 'Live Dashboard',
      src: '/3.jpg',
      alt: t?.proof?.cards?.[2]?.alt || 'Account Result 3'
    },
    {
      title: t?.proof?.cards?.[3]?.title || 'Payout Success',
      src: '/4.jpg',
      alt: t?.proof?.cards?.[3]?.alt || 'Account Result 4'
    },
    {
      title: t?.proof?.cards?.[4]?.title || 'Store Active',
      src: '/5.jpeg',
      alt: t?.proof?.cards?.[4]?.alt || 'Account Result 5'
    },
    {
      title: t?.proof?.cards?.[0]?.title || 'Real-time Analytics',
      src: '/6.jpeg',
      alt: t?.proof?.cards?.[0]?.alt || 'Account Result 1'
    },
    {
      title: t?.proof?.cards?.[1]?.title || 'Payment Tracking',
      src: '/7.jpg',
      alt: t?.proof?.cards?.[1]?.alt || 'Account Result 2'
    },
    {
      title: t?.proof?.cards?.[2]?.title || 'Live Dashboard',
      src: '/8.jpg',
      alt: t?.proof?.cards?.[2]?.alt || 'Account Result 3'
    },
    {
      title: t?.proof?.cards?.[3]?.title || 'Payout Success',
      src: '/9.jpeg',
      alt: t?.proof?.cards?.[3]?.alt || 'Account Result 4'
    },
    {
      title: t?.proof?.cards?.[4]?.title || 'Store Active',
      src: '/10.jpg',
      alt: t?.proof?.cards?.[4]?.alt || 'Account Result 5'
    },
    {
      title: t?.proof?.cards?.[5]?.title || 'Full Setup',
      src: '/11.jpg',
      alt: t?.proof?.cards?.[5]?.alt || 'Account Result 6'
    },
    
  ];

  return (
    <main className="w-full bg-white text-gray-900" dir={isArabic ? 'rtl' : 'ltr'}>
      <Header />
      <ScrollToTop />

      {/* Hero Section */}
      <ScrollAnimationWrapper>
        <section className="relative overflow-hidden bg-slate-950 text-black">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/payment-processing-onboarding-ui-animation-the-img.mp4"
            src="/payment-processing-onboarding-ui-animation-the-img.mp4"
          />
          <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col justify-center items-center px-4 py-28 sm:px-6 lg:px-8">
            <div className="max-w-3xl text-center">
              <p className="mb-6 inline-flex rounded-full border border-black/10 bg-white/90 px-4 py-2 text-xs uppercase tracking-[0.4em] text-slate-900 shadow-lg shadow-slate-950/10">
                {t?.hero?.badge || 'Premium infrastructure for elite operators'}
              </p>
              <h1 className="mt-6 text-5xl font-semibold leading-tight tracking-[-0.04em] text-black sm:text-6xl lg:text-7xl">
                {t?.hero?.title || 'Elite Account Infrastructure'}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-900 sm:text-xl">
                {t?.hero?.description || 'Verified, scalable, and secure accounts for high-volume operators worldwide.'}
              </p>
            </div>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="https://t.me/ADjamesGrugeon"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-8 py-4 text-base font-semibold text-slate-950 shadow-xl shadow-sky-500/30 transition hover:bg-sky-400"
              >
                {t?.hero?.cta1 || 'Get Started'}
              </a>
              <button
                onClick={() => {
                  const howSection = document.getElementById('how');
                  howSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center rounded-full border border-slate-200/20 bg-white px-8 py-4 text-base font-semibold text-slate-950 transition hover:border-slate-300 hover:bg-slate-100"
              >
                {t?.hero?.cta2 || 'Learn More'}
              </button>
            </div>

            <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-3">
              {valueRows.map((row) => (
                <div key={row.label} className="rounded-3xl border border-black/10 bg-white/90 px-6 py-5 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-700">{row.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-black">{row.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimationWrapper>

      {/* Platform Logos Carousel */}
      <LogoCarousel />
      <LiveInventoryTicker />

      {/* Feature Cards Section */}
      <ScrollAnimationWrapper delay={100}>
        <section className="bg-white px-4 py-16 text-slate-950 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-2">
              {featureCards.map((feature, idx) => (
                <div key={idx} className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-100 text-slate-900">
                    {feature.icon}
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-slate-950">{feature.title}</h3>
                  <p className="mt-4 max-w-xl text-slate-700 leading-7">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimationWrapper>

      {/* Solutions Section */}
      <ScrollAnimationWrapper delay={200}>
        <section id="solutions" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{t?.solutions?.title || 'Solutions'}</h2>
              <p className="text-xl text-gray-600">{t?.solutions?.subtitle || 'Tailored infrastructure for every use case'}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {solutionCards.map((card, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow bg-white hover:border-blue-400"
                >
                  <div className="text-5xl mb-4 animate-bounce" style={{ animationDelay: `${idx * 0.1}s` }}>
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
                  <p className="text-gray-600 mb-6">{card.description}</p>
                  <ul className="space-y-3">
                    {card.points.map((point, pidx) => (
                      <li key={pidx} className="flex items-center gap-3 text-gray-700">
                        <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimationWrapper>

      {/* Operational Continuity */}
      <ScrollAnimationWrapper delay={300}>
        <section id="continuity" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{t?.continuity?.title || 'Operational Continuity'}</h2>
              <p className="text-xl text-gray-600">{t?.continuity?.subtitle || 'Built for resilience, designed for scale'}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {continuityItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimationWrapper>

      {/* Enterprise Proof - ✅ FIXED: Using NextImage alias */}
      <ScrollAnimationWrapper delay={400}>
  <section id="proof" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          {t?.proof?.title || 'Enterprise Proof'}
        </h2>
        <p className="text-xl text-gray-600">
          {t?.proof?.subtitle || 'Real results from real operators'}
        </p>
      </div>

      {/* Gallery Container */}
      <div className="relative">
        <GalleryAutoSlider images={imageProofs} />
      </div>

      <a
        href="https://t.me/ADjamesGrugeon?text=Proof_Inquiry"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto inline-flex max-w-max items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 hover:bg-sky-600 hover:shadow-xl transition-all duration-200"
      >
        Message James
        <span aria-hidden="true">→</span>
      </a>
    </div>
  </section>
</ScrollAnimationWrapper>

      {/* Reviews Carousel */}
      <ScrollAnimationWrapper delay={500}>
        <ReviewsCarousel />
      </ScrollAnimationWrapper>

      {/* How It Works */}
      <ScrollAnimationWrapper delay={600}>
        <section id="how" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{t?.how?.title || 'How It Works'}</h2>
              <p className="text-xl text-gray-600">{t?.how?.subtitle || 'Simple, secure, and fast'}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {howSteps.map((step) => (
                <div
                  key={step.num}
                  className="group relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-8 shadow-lg transition duration-500 hover:-translate-y-1 hover:shadow-2xl animate-in fade-in-0 slide-in-from-bottom-4"
                >
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${step.accent}`} />
                  <div className="relative flex items-center gap-4 mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-2xl">
                      {step.icon}
                    </div>
                    <div>
                      <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                        {step.num}
                      </div>
                      <h3 className="mt-3 text-xl font-semibold text-slate-900">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                  <div className="pointer-events-none absolute -right-10 -bottom-10 h-28 w-28 rounded-full bg-slate-100 opacity-70" />
                </div>
              ))}
            </div>

            <div className="mt-16">
              <h3 className="text-lg font-bold mb-4">
                {t?.how?.readBeforeTitle || '📌 Read Before Buying / Selling'}
              </h3>
              <AccordionSection items={buyingSellingAccordionItems} allowMultiple={true} />
              <p className="text-center text-gray-600 mt-8">
                {t?.how?.footer || 'Always verify details before finalizing. When in doubt, ask.'}
              </p>
            </div>
          </div>
        </section>
      </ScrollAnimationWrapper>

      {/* FAQ Section */}
      <ScrollAnimationWrapper delay={700}>
        <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{t?.faq?.title || 'FAQ'}</h2>
              <p className="text-xl text-gray-600">{t?.faq?.subtitle || 'Quick answers to common questions'}</p>
            </div>
            <AccordionSection items={faqItems} />
          </div>
        </section>
      </ScrollAnimationWrapper>

      <TelegramChannelSection />

      {/* CTA Section */}

      <ReplacementPolicySection />
      <ScrollAnimationWrapper delay={900}>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 text-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t?.cta?.title || 'Ready to Scale?'}</h2>
            <p className="text-xl text-gray-700 mb-8">{t?.cta?.desc || 'Join thousands of operators who trust our infrastructure.'}</p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isArabic ? 'flex-row-reverse' : ''}`}>
              <a
                href="https://t.me/ADjamesGrugeon?text=Inquiry_NewAccount"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                {t?.cta?.telegram || 'Message on Telegram'}
              </a>
              <a
                href="https://wa.me/12542755458"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors"
              >
                {t?.cta?.whatsapp || 'Chat on WhatsApp'}
              </a>
            </div>
          </div>
        </section>
      </ScrollAnimationWrapper>

      {/* Sticky Mobile CTAs */}
      <div className="lg:hidden fixed bottom-20 left-4 right-4 z-40 flex gap-2 pointer-events-none">
        <a href="https://t.me/ADjamesGrugeon?text=Inquiry_NewAccount" target="_blank" rel="noopener noreferrer" className="flex-1 bg-sky-500 text-slate-950 text-sm font-semibold py-3 px-4 rounded-xl shadow-lg hover:bg-sky-400 transition pointer-events-auto text-center">
          New Account
        </a>
        <a href="https://t.me/ADjamesGrugeon?text=Inquiry_FundsHold" target="_blank" rel="noopener noreferrer" className="flex-1 bg-emerald-500 text-white text-sm font-semibold py-3 px-4 rounded-xl shadow-lg hover:bg-emerald-600 transition pointer-events-auto text-center">
          Funds Hold
        </a>
        <a href="https://t.me/ADjamesGrugeon?text=Inquiry_KYC" target="_blank" rel="noopener noreferrer" className="flex-1 bg-purple-500 text-white text-sm font-semibold py-3 px-4 rounded-xl shadow-lg hover:bg-purple-600 transition pointer-events-auto text-center">
          KYC Help
        </a>
      </div>

      <AIChatWidget />
    </main>
  );
}