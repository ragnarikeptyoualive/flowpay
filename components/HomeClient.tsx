'use client';

import { useLanguage } from '@/app/providers';
import { translations } from '@/lib/translations';
import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';
import LogoCarousel from '@/components/LogoCarousel';
import AccordionSection from '@/components/AccordionSection';
import StatsCounter from '@/components/StatsCounter';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import NewsletterSection from '@/components/NewsletterSection';
import AIChatWidget from '@/components/AIChatWidget';
import ScrollAnimationWrapper from '@/components/ScrollAnimationWrapper';
import { Check, Bolt, ShieldCheck, Globe2, Headset } from 'lucide-react';

export default function HomeClient() {
  const { language } = useLanguage();
  const t = translations[language];
  const isArabic = language === 'ar';

  // Solution cards using translations
  const solutionCards = [
    {
      icon: <ShieldCheck className="h-12 w-12 text-sky-600" />,
      title: t.solutions.merchant.title,
      description: t.solutions.merchant.desc,
      points: [t.solutions.merchant.p1, t.solutions.merchant.p2, t.solutions.merchant.p3],
    },
    {
      icon: <Globe2 className="h-12 w-12 text-cyan-600" />,
      title: t.solutions.banking.title,
      description: t.solutions.banking.desc,
      points: [t.solutions.banking.p1, t.solutions.banking.p2, t.solutions.banking.p3],
    },
    {
      icon: <Bolt className="h-12 w-12 text-violet-600" />,
      title: t.solutions.escrow.title,
      description: t.solutions.escrow.desc,
      points: [t.solutions.escrow.p1, t.solutions.escrow.p2, t.solutions.escrow.p3],
    },
  ];

  // Continuity items using translations
  const continuityItems = [
    { title: t.continuity.uptime.title, desc: t.continuity.uptime.desc },
    { title: t.continuity.compliance.title, desc: t.continuity.compliance.desc },
    { title: t.continuity.support.title, desc: t.continuity.support.desc },
    { title: t.continuity.rapid.title, desc: t.continuity.rapid.desc },
  ];

  // Proof items using translations
  const proofs = [t.proof.p1, t.proof.p2, t.proof.p3, t.proof.p4, t.proof.p5, t.proof.p6];

  // Value rows using translations
  const valueRows = [
    { label: t.terms.title, value: t.terms.setup },
    { label: t.terms.escrow, value: t.terms.protection },
    { label: t.terms.coverage, value: t.terms.jurisdictions },
  ];

  // Feature cards - NOW USING TRANSLATIONS
  // Add to translations.ts: featureCards array with {title, description} for each language
  const featureCards = [
    { 
      title: t.featureCards[0].title, 
      description: t.featureCards[0].description, 
      icon: <Bolt className="h-8 w-8 text-sky-500" /> 
    },
    { 
      title: t.featureCards[1].title, 
      description: t.featureCards[1].description, 
      icon: <ShieldCheck className="h-8 w-8 text-slate-900" /> 
    },
    { 
      title: t.featureCards[2].title, 
      description: t.featureCards[2].description, 
      icon: <Globe2 className="h-8 w-8 text-cyan-500" /> 
    },
    { 
      title: t.featureCards[3].title, 
      description: t.featureCards[3].description, 
      icon: <Headset className="h-8 w-8 text-violet-500" /> 
    },
  ];

  // How steps using translations - FIXED: Added missing num for step2
  const howSteps = [
    {
      num: t.how.step1.num,
      title: t.how.step1.title,
      desc: t.how.step1.desc,
      icon: '💬',
      accent: 'from-blue-500 to-sky-500',
    },
    {
      num: t.how.step2.num, // ✅ Fixed: was missing
      title: t.how.step2.title,
      desc: t.how.step2.desc,
      icon: '🔍',
      accent: 'from-indigo-500 to-violet-500',
    },
    {
      num: t.how.step3.num,
      title: t.how.step3.title,
      desc: t.how.step3.desc,
      icon: '🔒',
      accent: 'from-teal-500 to-cyan-500',
    },
  ];

  // Accordion items using translations
  const buyingSellingAccordionItems = [
    {
      id: 'buying',
      title: `🔵 ${t.how.buying}`,
      content: (
        <div className="border-l-4 border-blue-600 pl-6">
          <ul className="space-y-2 text-gray-700">
            <li>✓ {t.how.bp1}</li>
            <li>✓ {t.how.bp2}</li>
            <li>✓ {t.how.bp3}</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'selling',
      title: `🔴 ${t.how.selling}`,
      content: (
        <div className="border-l-4 border-red-600 pl-6">
          <ul className="space-y-2 text-gray-700">
            <li>✓ {t.how.sp1}</li>
            <li>✓ {t.how.sp2}</li>
            <li>✓ {t.how.sp3}</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'frozen',
      title: `🔓 ${t.how.frozen}`,
      content: (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 -m-4">
          <p className="text-gray-700">{t.how.frozenDesc}</p>
        </div>
      ),
    },
    {
      id: 'trust',
      title: `✅ ${t.how.trust}`,
      content: (
        <div className="bg-green-50 border-l-4 border-green-600 p-4 -m-4">
          <ul className="space-y-2 text-gray-700">
            <li>✓ {t.how.t1}</li>
            <li>✓ {t.how.t2}</li>
            <li>✓ {t.how.t3}</li>
            <li>✓ {t.how.t4}</li>
            <li>✓ {t.how.t5}</li>
            <li>✓ {t.how.t6}</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'rules',
      title: `⚠️ ${t.how.rules}`,
      content: (
        <div className="bg-red-50 border-l-4 border-red-600 p-4 -m-4">
          <ul className="space-y-2 text-gray-700">
            <li>— {t.how.r1}</li>
            <li>— {t.how.r2}</li>
            <li>— {t.how.r3}</li>
            <li>— {t.how.r4}</li>
            <li>— {t.how.r5}</li>
          </ul>
        </div>
      ),
    },
  ];

  // FAQ items using translations
  const faqItems = [
    { id: 'faq1', title: t.faq.q1, content: t.faq.a1 },
    { id: 'faq2', title: t.faq.q2, content: t.faq.a2 },
    { id: 'faq3', title: t.faq.q3, content: t.faq.a3 },
    { id: 'faq4', title: t.faq.q4, content: t.faq.a4 },
    { id: 'faq5', title: t.faq.q5, content: t.faq.a5 },
  ];

  // Proof cards - NOW USING TRANSLATIONS
  // Add to translations.ts: proof.cards array with {title, alt} for each language
  const proofCards = [
    {
      title: t.proof.cards?.[0]?.title || 'Real-time Analytics',
      src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kvYleZHi3x59G5JXzdWczcVYQgqiYY.png',
      alt: t.proof.cards?.[0]?.alt || 'Shopify Analytics Dashboard'
    },
    {
      title: t.proof.cards?.[1]?.title || 'Payment Tracking',
      src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9Vb27RVIuLssaStLkK3gPB8BqeAo76.png',
      alt: t.proof.cards?.[1]?.alt || 'Payment Overview Dashboard'
    },
    {
      title: t.proof.cards?.[2]?.title || 'Messaging Integration',
      src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TPCPoo6qV9DzPRIK55fJp121dCRE0q.png',
      alt: t.proof.cards?.[2]?.alt || 'WhatsApp Integration'
    },
    {
      title: t.proof.cards?.[3]?.title || 'Secure Communications',
      src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HVJ5b3cb1GuaKHSqKR9Vu5xVv5tWBC.png',
      alt: t.proof.cards?.[3]?.alt || 'Secure Messaging'
    },
    {
      title: t.proof.cards?.[4]?.title || 'Team Management',
      src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0KzxsyMdoEPAJzuPCeKVHzWvYYxm77.png',
      alt: t.proof.cards?.[4]?.alt || 'Team Parameters'
    },
    {
      title: t.proof.cards?.[5]?.title || 'Financial Overview',
      src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MywIcDLKbyyirfflaBsyU1dU8UY5WS.png',
      alt: t.proof.cards?.[5]?.alt || 'Financial Dashboard'
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
              {/* ✅ NOW TRANSLATED: Added t.hero.badge */}
              <p className="mb-6 inline-flex rounded-full border border-black/10 bg-white/90 px-4 py-2 text-xs uppercase tracking-[0.4em] text-slate-900 shadow-lg shadow-slate-950/10">
                {t.hero.badge || 'Premium infrastructure for elite operators'}
              </p>
              <h1 className="mt-6 text-5xl font-semibold leading-tight tracking-[-0.04em] text-black sm:text-6xl lg:text-7xl">
                {t.hero.title}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-900 sm:text-xl">
                {t.hero.description}
              </p>
            </div>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="https://t.me/ADjamesGrugeon"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-8 py-4 text-base font-semibold text-slate-950 shadow-xl shadow-sky-500/30 transition hover:bg-sky-400"
              >
                {t.hero.cta1}
              </a>
              <button
                onClick={() => {
                  const howSection = document.getElementById('how');
                  howSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center rounded-full border border-slate-200/20 bg-white px-8 py-4 text-base font-semibold text-slate-950 transition hover:border-slate-300 hover:bg-slate-100"
              >
                {t.hero.cta2}
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

      {/* Feature Cards Section - NOW FULLY TRANSLATED */}
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.solutions.title}</h2>
              <p className="text-xl text-gray-600">{t.solutions.subtitle}</p>
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.continuity.title}</h2>
              <p className="text-xl text-gray-600">{t.continuity.subtitle}</p>
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

      {/* Enterprise Proof - NOW FULLY TRANSLATED */}
      <ScrollAnimationWrapper delay={400}>
        <section id="proof" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.proof.title}</h2>
              <p className="text-xl text-gray-600">{t.proof.subtitle}</p>
              <p className="text-gray-600 mt-2">{t.proof.desc}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {proofCards.map((proof, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow hover:-translate-y-1"
                >
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 h-48 overflow-hidden">
                    <img
                      src={proof.src}
                      alt={proof.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <span className="text-blue-600">✓</span>
                      {proof.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">{proofs[idx]}</p>
                  </div>
                </div>
              ))}
            </div>
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.how.title}</h2>
              <p className="text-xl text-gray-600">{t.how.subtitle}</p>
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
              {/* ✅ NOW TRANSLATED: Added t.how.readBeforeTitle */}
              <h3 className="text-lg font-bold mb-4">
                {t.how.readBeforeTitle || '📌 Read Before Buying / Selling'}
              </h3>
              <AccordionSection items={buyingSellingAccordionItems} allowMultiple={true} />
              <p className="text-center text-gray-600 mt-8">
                {t.how.footer}
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.faq.title}</h2>
              <p className="text-xl text-gray-600">{t.faq.subtitle}</p>
            </div>
            <AccordionSection items={faqItems} />
          </div>
        </section>
      </ScrollAnimationWrapper>

      {/* Newsletter */}
      <ScrollAnimationWrapper delay={800}>
        <NewsletterSection />
      </ScrollAnimationWrapper>

      {/* CTA Section */}
      <ScrollAnimationWrapper delay={900}>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 text-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.cta.title}</h2>
            <p className="text-xl text-gray-700 mb-8">{t.cta.desc}</p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isArabic ? 'flex-row-reverse' : ''}`}>
              <a
                href="https://t.me/ADjamesGrugeon"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                {t.cta.telegram}
              </a>
              <a
                href="https://wa.me/12542755458"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors"
              >
                {t.cta.whatsapp}
              </a>
            </div>
          </div>
        </section>
      </ScrollAnimationWrapper>

      <AIChatWidget />
    </main>
  );
}