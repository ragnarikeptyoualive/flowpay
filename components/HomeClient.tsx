'use client';

import { useState, useEffect, useRef } from 'react';
import NextImage from 'next/image';
import { useLanguage } from '@/app/providers';
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
import GalleryAutoSlider from '@/components/GalleryAutoSlider';
import { Check, Bolt, ShieldCheck, Globe2, Headset } from 'lucide-react';

declare const fbq: (...args: any[]) => void;

// ─────────────────────────────────────────────────────────────
// INLINE TRANSLATIONS (9 languages) - Embedded in this file
// ─────────────────────────────────────────────────────────────

type Language = 'en' | 'fr' | 'ar' | 'es' | 'pt' | 'vi' | 'it' | 'zh' | 'de';

interface HomeTranslations {
  hero: {
    badge: string;
    title: string;
    description: string;
    cta1: string;
    cta2: string;
  };
  terms: {
    title: string;
    setup: string;
    escrow: string;
    protection: string;
    coverage: string;
    jurisdictions: string;
    processed: string;
  };
  featureCards: Array<{ title: string; description: string }>;
  solutions: {
    title: string;
    subtitle: string;
    merchant: { title: string; desc: string; p1: string; p2: string; p3: string };
    banking: { title: string; desc: string; p1: string; p2: string; p3: string };
    escrow: { title: string; desc: string; p1: string; p2: string; p3: string };
  };
  continuity: {
    title: string;
    subtitle: string;
    uptime: { title: string; desc: string };
    compliance: { title: string; desc: string };
    support: { title: string; desc: string };
    rapid: { title: string; desc: string };
  };
  proof: {
    title: string;
    subtitle: string;
    p1: string; p2: string; p3: string; p4: string; p5: string; p6: string;
    cards: Array<{ title: string; alt: string }>;
  };
  how: {
    title: string;
    subtitle: string;
    step1: { num: string; title: string; desc: string };
    step2: { num: string; title: string; desc: string };
    step3: { num: string; title: string; desc: string };
    readBeforeTitle: string;
    footer: string;
    buying: { label: string; items: string[] };
    selling: { label: string; items: string[] };
    frozen: { label: string; desc: string };
    trust: { label: string; items: string[] };
    rules: { label: string; items: string[] };
  };
  faq: {
    title: string;
    subtitle: string;
    q1: string; a1: string;
    q2: string; a2: string;
    q3: string; a3: string;
    q4: string; a4: string;
    q5: string; a5: string;
    q6: string; a6: string;
  };
  cta: {
    title: string;
    desc: string;
    telegram: string;
    whatsapp: string;
  };
}

const homeTranslations: Record<Language, HomeTranslations> = {
  // ── ENGLISH ─────────────────────────────────────────────
  en: {
    hero: {
      badge: 'Premium infrastructure for elite operators',
      title: 'Elite Account Infrastructure',
      description: 'Verified, scalable, and secure accounts for high-volume operators worldwide.',
      cta1: 'Get Started',
      
    },
    terms: {
      title: 'Setup Time',
      setup: '< 24 hours',
      escrow: 'Escrow',
      protection: 'Included',
      coverage: 'Coverage',
      jurisdictions: 'Global',
      processed: 'Processed',
    },
    featureCards: [
      { title: 'Instant Setup', description: 'Get started in minutes, not days.' },
      { title: 'Verified Accounts', description: 'Pre-vetted, ready-to-use accounts.' },
      { title: 'Global Coverage', description: 'Access accounts across multiple regions.' },
      { title: '24/7 Support', description: 'Dedicated help whenever you need it.' },
    ],
    solutions: {
      title: 'Solutions',
      subtitle: 'Tailored infrastructure for every use case',
      merchant: {
        title: 'Merchant Solutions',
        desc: 'Seamless payment processing for high-risk merchants.',
        p1: 'Instant onboarding',
        p2: 'Multi-currency support',
        p3: 'Chargeback protection',
      },
      banking: {
        title: 'Banking Solutions',
        desc: 'Verified accounts for global financial operations.',
        p1: 'KYC-ready accounts',
        p2: 'Fast payout speeds',
        p3: 'Multi-region coverage',
      },
      escrow: {
        title: 'Escrow Services',
        desc: 'Secure, neutral third-party transaction protection.',
        p1: '100% fund protection',
        p2: 'Instant release on confirmation',
        p3: 'Dispute resolution included',
      },
    },
    continuity: {
      title: 'Operational Continuity',
      subtitle: 'Built for resilience, designed for scale',
      uptime: { title: '99.9% Uptime', desc: 'Infrastructure built for zero downtime.' },
      compliance: { title: 'Compliance Ready', desc: 'Pre-vetted for regulatory requirements.' },
      support: { title: '24/7 Support', desc: 'Multilingual help whenever you need it.' },
      rapid: { title: 'Rapid Deployment', desc: 'Go live in hours, not weeks.' },
    },
    proof: {
      title: 'Enterprise Proof',
      subtitle: 'Real results from real operators',
      p1: 'Verified revenue screenshots',
      p2: 'Real payout confirmations',
      p3: 'Active account dashboards',
      p4: 'Client testimonials',
      p5: 'Escrow transaction logs',
      p6: 'Telegram proof channel',
      cards: [
        { title: 'Real-time Analytics', alt: 'Account Result 1' },
        { title: 'Payment Tracking', alt: 'Account Result 2' },
        { title: 'Live Dashboard', alt: 'Account Result 3' },
        { title: 'Payout Success', alt: 'Account Result 4' },
        { title: 'Store Active', alt: 'Account Result 5' },
        { title: 'Full Setup', alt: 'Account Result 6' },
      ],
    },
    how: {
      title: 'How It Works',
      subtitle: 'Simple, secure, and fast',
      step1: { num: '01', title: 'Connect & Confirm', desc: 'Reach out via Telegram or WhatsApp. Share your requirements. We match you with a verified account.' },
      step2: { num: '02', title: 'Verify & Secure', desc: 'Review account details, use our escrow service, and complete the transfer with full protection.' },
      step3: { num: '03', title: 'Deploy & Scale', desc: 'Get full credentials, 2FA reset, and start operating immediately with confidence.' },
      readBeforeTitle: '📌 Read Before Buying / Selling',
      footer: 'Always verify details before finalizing. When in doubt, ask.',
      buying: {
        label: '🔵 Buying',
        items: ['Browse verified accounts', 'Secure payment via escrow', 'Instant handover & support'],
      },
      selling: {
        label: '🔴 Selling',
        items: ['List your account securely', 'Get paid via protected escrow', 'Zero chargeback risk'],
      },
      frozen: {
        label: '🔓 Frozen Account?',
        desc: 'We help recover or replace frozen accounts with verified alternatives.',
      },
      trust: {
        label: '✅ Why Trust Us?',
        items: [
          '5,000+ successful transactions',
          'Escrow protection on every deal',
          '24/7 multilingual support',
          'Verified accounts only',
          'Transparent pricing',
          'Post-sale support included',
        ],
      },
      rules: {
        label: '⚠️ Rules & Restrictions',
        items: [
          'No chargebacks or disputes',
          'No illegal use of accounts',
          'Respect platform ToS',
          'One account per buyer unless approved',
          'Escrow fees are non-refundable',
        ],
      },
    },
    faq: {
      title: 'FAQ',
      subtitle: 'Quick answers to common questions',
      q1: 'How fast is delivery?',
      a1: 'Most accounts are delivered within 1-24 hours after payment confirmation.',
      q2: 'Is escrow mandatory?',
      a2: 'Yes, all transactions use our secure escrow service for buyer and seller protection.',
      q3: 'What if my account gets banned?',
      a3: 'We offer replacement guarantees on eligible accounts within the warranty period.',
      q4: 'Do you support my country?',
      a4: 'We operate globally. Contact us to confirm availability for your region.',
      q5: 'How do I contact support?',
      a5: 'Reach us 24/7 via Telegram @ADjamesGrugeon or WhatsApp +1 (254) 275-5458.',
      q6: 'What documents do I get?',
      a6: 'Full KYC pack, recovery email, and browser cookies/proxy for a safe login, and 2FA Handover',
    },
    cta: {
      title: 'Ready to Scale?',
      desc: 'Join thousands of operators who trust our infrastructure.',
      telegram: 'Message on Telegram',
      whatsapp: 'Chat on WhatsApp',
    },
  },

  // ── FRENCH ─────────────────────────────────────────────
  fr: {
    hero: {
      badge: 'Infrastructure premium pour opérateurs élite',
      title: 'Infrastructure de Comptes Élite',
      description: 'Comptes vérifiés, évolutifs et sécurisés pour les opérateurs haut volume dans le monde entier.',
      cta1: 'Commencer',
      cta2: 'En savoir plus',
    },
    terms: {
      title: 'Temps de configuration',
      setup: '< 24 heures',
      escrow: 'Séquestre',
      protection: 'Inclus',
      coverage: 'Couverture',
      jurisdictions: 'Mondiale',
      processed: 'Traité',
    },
    featureCards: [
      { title: 'Configuration instantanée', description: 'Commencez en minutes, pas en jours.' },
      { title: 'Comptes vérifiés', description: 'Comptes pré-vérifiés, prêts à l\'emploi.' },
      { title: 'Couverture mondiale', description: 'Accédez aux comptes dans plusieurs régions.' },
      { title: 'Support 24/7', description: 'Aide dédiée quand vous en avez besoin.' },
    ],
    solutions: {
      title: 'Solutions',
      subtitle: 'Infrastructure sur mesure pour chaque cas d\'usage',
      merchant: {
        title: 'Solutions Commerçants',
        desc: 'Traitement de paiement fluide pour commerçants à haut risque.',
        p1: 'Onboarding instantané',
        p2: 'Support multi-devises',
        p3: 'Protection contre les chargebacks',
      },
      banking: {
        title: 'Solutions Bancaires',
        desc: 'Comptes vérifiés pour opérations financières globales.',
        p1: 'Comptes prêts KYC',
        p2: 'Vitesses de payout rapides',
        p3: 'Couverture multi-régions',
      },
      escrow: {
        title: 'Services de Séquestre',
        desc: 'Protection de transaction sécurisée par tiers neutre.',
        p1: 'Protection des fonds à 100%',
        p2: 'Libération instantanée sur confirmation',
        p3: 'Résolution de litiges incluse',
      },
    },
    continuity: {
      title: 'Continuité Opérationnelle',
      subtitle: 'Conçu pour la résilience, pensé pour l\'échelle',
      uptime: { title: '99,9% de disponibilité', desc: 'Infrastructure conçue pour zéro temps d\'arrêt.' },
      compliance: { title: 'Prêt pour la conformité', desc: 'Pré-vérifié pour les exigences réglementaires.' },
      support: { title: 'Support 24/7', desc: 'Aide multilingue quand vous en avez besoin.' },
      rapid: { title: 'Déploiement rapide', desc: 'En ligne en heures, pas en semaines.' },
    },
    proof: {
      title: 'Preuves Entreprise',
      subtitle: 'Résultats réels d\'opérateurs réels',
      p1: 'Captures de revenus vérifiées',
      p2: 'Confirmations de payout réelles',
      p3: 'Tableaux de bord de comptes actifs',
      p4: 'Témoignages clients',
      p5: 'Logs de transactions séquestre',
      p6: 'Canal de preuves Telegram',
      cards: [
        { title: 'Analytics en temps réel', alt: 'Résultat compte 1' },
        { title: 'Suivi des paiements', alt: 'Résultat compte 2' },
        { title: 'Tableau de bord live', alt: 'Résultat compte 3' },
        { title: 'Succès de payout', alt: 'Résultat compte 4' },
        { title: 'Boutique active', alt: 'Résultat compte 5' },
        { title: 'Configuration complète', alt: 'Résultat compte 6' },
      ],
    },
    how: {
      title: 'Comment ça marche',
      subtitle: 'Simple, sécurisé et rapide',
      step1: { num: '01', title: 'Connectez & Confirmez', desc: 'Contactez-nous via Telegram ou WhatsApp. Partagez vos besoins. Nous vous associons à un compte vérifié.' },
      step2: { num: '02', title: 'Vérifiez & Sécurisez', desc: 'Examinez les détails du compte, utilisez notre service de séquestre et finalisez le transfert avec une protection totale.' },
      step3: { num: '03', title: 'Déployez & Scalez', desc: 'Obtenez les identifiants complets, réinitialisation 2FA, et commencez à opérer immédiatement en toute confiance.' },
      readBeforeTitle: '📌 Lire avant d\'acheter / vendre',
      footer: 'Vérifiez toujours les détails avant de finaliser. En cas de doute, demandez.',
      buying: {
        label: '🔵 Acheter',
        items: ['Parcourir les comptes vérifiés', 'Paiement sécurisé via séquestre', 'Transfert instantané & support'],
      },
      selling: {
        label: '🔴 Vendre',
        items: ['Listez votre compte en sécurité', 'Soyez payé via séquestre protégé', 'Zéro risque de chargeback'],
      },
      frozen: {
        label: '🔓 Compte gelé ?',
        desc: 'Nous aidons à récupérer ou remplacer les comptes gelés par des alternatives vérifiées.',
      },
      trust: {
        label: '✅ Pourquoi nous faire confiance ?',
        items: [
          '5 000+ transactions réussies',
          'Protection par séquestre sur chaque deal',
          'Support multilingue 24/7',
          'Comptes vérifiés uniquement',
          'Tarification transparente',
          'Support après-vente inclus',
        ],
      },
      rules: {
        label: '⚠️ Règles & Restrictions',
        items: [
          'Pas de chargebacks ou litiges',
          'Pas d\'utilisation illégale des comptes',
          'Respectez les CGU des plateformes',
          'Un compte par acheteur sauf approbation',
          'Frais de séquestre non remboursables',
        ],
      },
    },
    faq: {
      title: 'FAQ',
      subtitle: 'Réponses rapides aux questions courantes',
      q1: 'Quelle est la rapidité de livraison ?',
      a1: 'La plupart des comptes sont livrés dans les 1-24 heures après confirmation du paiement.',
      q2: 'Le séquestre est-il obligatoire ?',
      a2: 'Oui, toutes les transactions utilisent notre service de séquestre sécurisé pour la protection de l\'acheteur et du vendeur.',
      q3: 'Que se passe-t-il si mon compte est banni ?',
      a3: 'Nous offrons des garanties de remplacement sur les comptes éligibles pendant la période de garantie.',
      q4: 'Supportez-vous mon pays ?',
      a4: 'Nous opérons mondialement. Contactez-nous pour confirmer la disponibilité dans votre région.',
      q5: 'Comment contacter le support ?',
      a5: 'Contactez-nous 24/7 via Telegram @ADjamesGrugeon ou WhatsApp +1 (254) 275-5458.',
      q6: 'Quels documents est-ce que je reçois ?',
      a6: 'Pack KYC complet, email de récupération, et cookies/proxy du navigateur pour une connexion sécurisée, ainsi que la remise 2FA',
    },
    cta: {
      title: 'Prêt à scaler ?',
      desc: 'Rejoignez des milliers d\'opérateurs qui font confiance à notre infrastructure.',
      telegram: 'Message sur Telegram',
      whatsapp: 'Chat sur WhatsApp',
    },
  },

  // ── ARABIC ─────────────────────────────────────────────
  ar: {
    hero: {
      badge: 'بنية تحتية مميزة للمشغلين النخبة',
      title: 'بنية تحتية لحسابات النخبة',
      description: 'حسابات موثقة وقابلة للتوسع وآمنة للمشغلين عالي الحجم في جميع أنحاء العالم.',
      cta1: 'ابدأ الآن',
      cta2: 'اعرف المزيد',
    },
    terms: {
      title: 'وقت الإعداد',
      setup: '< 24 ساعة',
      escrow: 'ضمان',
      protection: 'مشمول',
      coverage: 'التغطية',
      jurisdictions: 'عالمية',
      processed: 'معالجته',
    },
    featureCards: [
      { title: 'إعداد فوري', description: 'ابدأ في دقائق، ليس أيام.' },
      { title: 'حسابات موثقة', description: 'حسابات مُفحوصة مسبقاً، جاهزة للاستخدام.' },
      { title: 'تغطية عالمية', description: 'الوصول للحسابات عبر مناطق متعددة.' },
      { title: 'دعم 24/7', description: 'مساعدة مخصصة وقتما تحتاجها.' },
    ],
    solutions: {
      title: 'الحلول',
      subtitle: 'بنية تحتية مخصصة لكل حالة استخدام',
      merchant: {
        title: 'حلول التجار',
        desc: 'معالجة دفع سلسة للتجار عالي المخاطر.',
        p1: 'تسجيل فوري',
        p2: 'دعم متعدد العملات',
        p3: 'حماية من الاسترجاعات',
      },
      banking: {
        title: 'حلول مصرفية',
        desc: 'حسابات موثقة للعمليات المالية العالمية.',
        p1: 'حسابات جاهزة لـ KYC',
        p2: 'سرعات صرف سريعة',
        p3: 'تغطية متعددة المناطق',
      },
      escrow: {
        title: 'خدمات الضمان',
        desc: 'حماية معاملات آمنة عبر طرف ثالث محايد.',
        p1: 'حماية الأموال بنسبة 100%',
        p2: 'إفراج فوري عند التأكيد',
        p3: 'حل النزاعات مشمول',
      },
    },
    continuity: {
      title: 'الاستمرارية التشغيلية',
      subtitle: 'مصممة للمرونة، مبنية للتوسع',
      uptime: { title: '99.9% وقت تشغيل', desc: 'بنية تحتية مبنية لصفر توقف.' },
      compliance: { title: 'جاهز للامتثال', desc: 'مفحوص مسبقاً للمتطلبات التنظيمية.' },
      support: { title: 'دعم 24/7', desc: 'مساعدة متعددة اللغات وقتما تحتاجها.' },
      rapid: { title: 'نشر سريع', desc: 'انطلق في ساعات، ليس أسابيع.' },
    },
    proof: {
      title: 'إثباتات الشركة',
      subtitle: 'نتائج حقيقية من مشغلين حقيقيين',
      p1: 'لقطات إيرادات موثقة',
      p2: 'تأكيدات صرف حقيقية',
      p3: 'لوحات تحكم حسابات نشطة',
      p4: 'شهادات عملاء',
      p5: 'سجلات معاملات الضمان',
      p6: 'قناة إثباتات تليجرام',
      cards: [
        { title: 'تحليلات فورية', alt: 'نتيجة حساب 1' },
        { title: 'تتبع المدفوعات', alt: 'نتيجة حساب 2' },
        { title: 'لوحة تحكم مباشرة', alt: 'نتيجة حساب 3' },
        { title: 'نجاح الصرف', alt: 'نتيجة حساب 4' },
        { title: 'متجر نشط', alt: 'نتيجة حساب 5' },
        { title: 'إعداد كامل', alt: 'نتيجة حساب 6' },
      ],
    },
    how: {
      title: 'كيف يعمل',
      subtitle: 'بسيط، آمن، وسريع',
      step1: { num: '01', title: 'اتصل & أكد', desc: 'تواصل عبر تليجرام أو واتساب. شارك متطلباتك. نطابقك مع حساب موثق.' },
      step2: { num: '02', title: 'تحقق & آمن', desc: 'راجع تفاصيل الحساب، استخدم خدمة الضمان الخاصة بنا، وأكمل التحويل بحماية كاملة.' },
      step3: { num: '03', title: 'انشر & وسع', desc: 'احصل على بيانات الاعتماد الكاملة، إعادة تعيين 2FA، وابدأ التشغيل فوراً بثقة.' },
      readBeforeTitle: '📌 اقرأ قبل الشراء / البيع',
      footer: 'تحقق دائماً من التفاصيل قبل الإنهاء. عند الشك، اسأل.',
      buying: {
        label: '🔵 الشراء',
        items: ['تصفح الحسابات الموثقة', 'دفع آمن عبر الضمان', 'تسليم فوري ودعم'],
      },
      selling: {
        label: '🔴 البيع',
        items: ['ادرج حسابك بأمان', 'احصل على أموالك عبر ضمان محمي', 'صفر مخاطر استرداد'],
      },
      frozen: {
        label: '🔓 حساب مجمد؟',
        desc: 'نساعد في استعادة أو استبدال الحسابات المجمدة ببدائل موثقة.',
      },
      trust: {
        label: '✅ لماذا تثق بنا؟',
        items: [
          '5,000+ معاملة ناجحة',
          'حماية ضمان على كل صفقة',
          'دعم متعدد اللغات 24/7',
          'حسابات موثقة فقط',
          'تسعير شفاف',
          'دعم ما بعد البيع شامل',
        ],
      },
      rules: {
        label: '⚠️ القواعد والقيود',
        items: [
          'لا استرجاعات أو نزاعات',
          'لا استخدام غير قانوني للحسابات',
          'احترم شروط منصات الاستخدام',
          'حساب واحد لكل مشتري إلا إذا تمت الموافقة',
          'رسوم الضمان غير قابلة للاسترداد',
        ],
      },
    },
    faq: {
      title: 'الأسئلة الشائعة',
      subtitle: 'إجابات سريعة على الأسئلة الشائعة',
      q1: 'ما سرعة التسليم؟',
      a1: 'يتم تسليم معظم الحسابات خلال 1-24 ساعة بعد تأكيد الدفع.',
      q2: 'هل الضمان إلزامي؟',
      a2: 'نعم، جميع المعاملات تستخدم خدمة الضمان الآمنة الخاصة بنا لحماية المشتري والبائع.',
      q3: 'ماذا لو تم حظر حسابي؟',
      a3: 'نقدم ضمانات استبدال على الحسابات المؤهلة خلال فترة الضمان.',
      q4: 'هل تدعمون بلدي؟',
      a4: 'نعمل عالمياً. تواصل معنا لتأكيد التوفر في منطقتك.',
      q5: 'كيف أتواصل مع الدعم؟',
      a5: 'تواصل معنا 24/7 عبر تليجرام @ADjamesGrugeon أو واتساب +1 (254) 275-5458.',
      q6: 'ما هي المستندات التي أحصل عليها؟',
      a6: 'حزمة KYC كاملة، بريد إلكتروني للاسترداد، وملفات تعريف الارتباط/وكيل المتصفح لتسجيل دخول آمن، وتسليم 2FA',
    },
    cta: {
      title: 'جاهز للتوسع؟',
      desc: 'انضم لآلاف المشغلين الذين يثقون ببنيتنا التحتية.',
      telegram: 'راسل على تليجرام',
      whatsapp: 'دردش على واتساب',
    },
  },

  // ── SPANISH ─────────────────────────────────────────────
  es: {
    hero: {
      badge: 'Infraestructura premium para operadores élite',
      title: 'Infraestructura de Cuentas Élite',
      description: 'Cuentas verificadas, escalables y seguras para operadores de alto volumen en todo el mundo.',
      cta1: 'Comenzar',
      cta2: 'Saber más',
    },
    terms: {
      title: 'Tiempo de configuración',
      setup: '< 24 horas',
      escrow: 'Depósito en garantía',
      protection: 'Incluido',
      coverage: 'Cobertura',
      jurisdictions: 'Global',
      processed: 'Procesado',
    },
    featureCards: [
      { title: 'Configuración instantánea', description: 'Comienza en minutos, no en días.' },
      { title: 'Cuentas verificadas', description: 'Cuentas pre-verificadas, listas para usar.' },
      { title: 'Cobertura global', description: 'Accede a cuentas en múltiples regiones.' },
      { title: 'Soporte 24/7', description: 'Ayuda dedicada cuando la necesites.' },
    ],
    solutions: {
      title: 'Soluciones',
      subtitle: 'Infraestructura a medida para cada caso de uso',
      merchant: {
        title: 'Soluciones para Comerciantes',
        desc: 'Procesamiento de pagos fluido para comerciantes de alto riesgo.',
        p1: 'Onboarding instantáneo',
        p2: 'Soporte multi-divisa',
        p3: 'Protección contra contracargos',
      },
      banking: {
        title: 'Soluciones Bancarias',
        desc: 'Cuentas verificadas para operaciones financieras globales.',
        p1: 'Cuentas listas para KYC',
        p2: 'Velocidades de payout rápidas',
        p3: 'Cobertura multi-región',
      },
      escrow: {
        title: 'Servicios de Depósito en Garantía',
        desc: 'Protección de transacciones segura mediante tercero neutral.',
        p1: '100% protección de fondos',
        p2: 'Liberación instantánea al confirmar',
        p3: 'Resolución de disputas incluida',
      },
    },
    continuity: {
      title: 'Continuidad Operacional',
      subtitle: 'Construido para resiliencia, diseñado para escalar',
      uptime: { title: '99.9% de disponibilidad', desc: 'Infraestructura construida para cero tiempo de inactividad.' },
      compliance: { title: 'Listo para cumplimiento', desc: 'Pre-verificado para requisitos regulatorios.' },
      support: { title: 'Soporte 24/7', desc: 'Ayuda multilingüe cuando la necesites.' },
      rapid: { title: 'Despliegue rápido', desc: 'En línea en horas, no en semanas.' },
    },
    proof: {
      title: 'Pruebas Empresariales',
      subtitle: 'Resultados reales de operadores reales',
      p1: 'Capturas de ingresos verificadas',
      p2: 'Confirmaciones de payout reales',
      p3: 'Dashboards de cuentas activas',
      p4: 'Testimonios de clientes',
      p5: 'Logs de transacciones de depósito en garantía',
      p6: 'Canal de pruebas de Telegram',
      cards: [
        { title: 'Analytics en tiempo real', alt: 'Resultado cuenta 1' },
        { title: 'Seguimiento de pagos', alt: 'Resultado cuenta 2' },
        { title: 'Dashboard en vivo', alt: 'Resultado cuenta 3' },
        { title: 'Éxito de payout', alt: 'Resultado cuenta 4' },
        { title: 'Tienda activa', alt: 'Resultado cuenta 5' },
        { title: 'Configuración completa', alt: 'Resultado cuenta 6' },
      ],
    },
    how: {
      title: 'Cómo Funciona',
      subtitle: 'Simple, seguro y rápido',
      step1: { num: '01', title: 'Conecta y Confirma', desc: 'Contáctanos vía Telegram o WhatsApp. Comparte tus requisitos. Te emparejamos con una cuenta verificada.' },
      step2: { num: '02', title: 'Verifica y Asegura', desc: 'Revisa detalles de la cuenta, usa nuestro servicio de depósito en garantía y completa la transferencia con protección total.' },
      step3: { num: '03', title: 'Despliega y Escala', desc: 'Obtén credenciales completas, reinicio de 2FA, y empieza a operar inmediatamente con confianza.' },
      readBeforeTitle: '📌 Leer Antes de Comprar / Vender',
      footer: 'Siempre verifica detalles antes de finalizar. En caso de duda, pregunta.',
      buying: {
        label: '🔵 Comprar',
        items: ['Explora cuentas verificadas', 'Pago seguro vía depósito en garantía', 'Entrega instantánea y soporte'],
      },
      selling: {
        label: '🔴 Vender',
        items: ['Lista tu cuenta de forma segura', 'Cobra vía depósito en garantía protegido', 'Cero riesgo de contracargo'],
      },
      frozen: {
        label: '🔓 ¿Cuenta Congelada?',
        desc: 'Ayudamos a recuperar o reemplazar cuentas congeladas con alternativas verificadas.',
      },
      trust: {
        label: '✅ ¿Por Qué Confiar en Nosotros?',
        items: [
          '5,000+ transacciones exitosas',
          'Protección de depósito en garantía en cada trato',
          'Soporte multilingüe 24/7',
          'Solo cuentas verificadas',
          'Precios transparentes',
          'Soporte post-venta incluido',
        ],
      },
      rules: {
        label: '⚠️ Reglas y Restricciones',
        items: [
          'Sin contracargos o disputas',
          'Sin uso ilegal de cuentas',
          'Respeta los Términos de Servicio de la plataforma',
          'Una cuenta por comprador a menos que se apruebe',
          'Las tarifas de depósito en garantía no son reembolsables',
        ],
      },
    },
    faq: {
      title: 'Preguntas Frecuentes',
      subtitle: 'Respuestas rápidas a preguntas comunes',
      q1: '¿Qué tan rápido es el envío?',
      a1: 'La mayoría de cuentas se entregan dentro de 1-24 horas después de la confirmación del pago.',
      q2: '¿Es obligatorio el depósito en garantía?',
      a2: 'Sí, todas las transacciones usan nuestro servicio seguro de depósito en garantía para protección del comprador y vendedor.',
      q3: '¿Qué pasa si mi cuenta es baneada?',
      a3: 'Ofrecemos garantías de reemplazo en cuentas elegibles dentro del período de garantía.',
      q4: '¿Soportan mi país?',
      a4: 'Operamos globalmente. Contáctanos para confirmar disponibilidad en tu región.',
      q5: '¿Cómo contacto al soporte?',
      a5: 'Contáctanos 24/7 vía Telegram @ADjamesGrugeon o WhatsApp +1 (254) 275-5458.',
      q6: '¿Qué documentos recibo?',
      a6: 'Pack KYC completo, email de recuperación, y cookies/proxy del navegador para un inicio de sesión seguro, y entrega de 2FA',
    },
    cta: {
      title: '¿Listo para Escalar?',
      desc: 'Únete a miles de operadores que confían en nuestra infraestructura.',
      telegram: 'Mensaje en Telegram',
      whatsapp: 'Chat en WhatsApp',
    },
  },

  // ── PORTUGUESE ──────────────────────────────────────────
  pt: {
    hero: {
      badge: 'Infraestrutura premium para operadores elite',
      title: 'Infraestrutura de Contas Elite',
      description: 'Contas verificadas, escaláveis e seguras para operadores de alto volume em todo o mundo.',
      cta1: 'Começar',
      cta2: 'Saiba mais',
    },
    terms: {
      title: 'Tempo de configuração',
      setup: '< 24 horas',
      escrow: 'Custódia',
      protection: 'Incluído',
      coverage: 'Cobertura',
      jurisdictions: 'Global',
      processed: 'Processado',
    },
    featureCards: [
      { title: 'Configuração instantânea', description: 'Comece em minutos, não em dias.' },
      { title: 'Contas verificadas', description: 'Contas pré-verificadas, prontas para uso.' },
      { title: 'Cobertura global', description: 'Acesse contas em múltiplas regiões.' },
      { title: 'Suporte 24/7', description: 'Ajuda dedicada quando precisar.' },
    ],
    solutions: {
      title: 'Soluções',
      subtitle: 'Infraestrutura sob medida para cada caso de uso',
      merchant: {
        title: 'Soluções para Comerciantes',
        desc: 'Processamento de pagamentos fluido para comerciantes de alto risco.',
        p1: 'Onboarding instantâneo',
        p2: 'Suporte multi-moeda',
        p3: 'Proteção contra chargebacks',
      },
      banking: {
        title: 'Soluções Bancárias',
        desc: 'Contas verificadas para operações financeiras globais.',
        p1: 'Contas prontas para KYC',
        p2: 'Velocidades de payout rápidas',
        p3: 'Cobertura multi-região',
      },
      escrow: {
        title: 'Serviços de Custódia',
        desc: 'Proteção de transações segura via terceiro neutro.',
        p1: '100% proteção de fundos',
        p2: 'Liberação instantânea na confirmação',
        p3: 'Resolução de disputas incluída',
      },
    },
    continuity: {
      title: 'Continuidade Operacional',
      subtitle: 'Construído para resiliência, projetado para escalar',
      uptime: { title: '99.9% de disponibilidade', desc: 'Infraestrutura construída para zero downtime.' },
      compliance: { title: 'Pronto para conformidade', desc: 'Pré-verificado para requisitos regulatórios.' },
      support: { title: 'Suporte 24/7', desc: 'Ajuda multilíngue quando precisar.' },
      rapid: { title: 'Implantação rápida', desc: 'Online em horas, não em semanas.' },
    },
    proof: {
      title: 'Provas Empresariais',
      subtitle: 'Resultados reais de operadores reais',
      p1: 'Capturas de receita verificadas',
      p2: 'Confirmações de payout reais',
      p3: 'Dashboards de contas ativas',
      p4: 'Depoimentos de clientes',
      p5: 'Logs de transações de custódia',
      p6: 'Canal de provas do Telegram',
      cards: [
        { title: 'Analytics em tempo real', alt: 'Resultado conta 1' },
        { title: 'Rastreamento de pagamentos', alt: 'Resultado conta 2' },
        { title: 'Dashboard ao vivo', alt: 'Resultado conta 3' },
        { title: 'Sucesso de payout', alt: 'Resultado conta 4' },
        { title: 'Loja ativa', alt: 'Resultado conta 5' },
        { title: 'Configuração completa', alt: 'Resultado conta 6' },
      ],
    },
    how: {
      title: 'Como Funciona',
      subtitle: 'Simples, seguro e rápido',
      step1: { num: '01', title: 'Conecte e Confirme', desc: 'Entre em contato via Telegram ou WhatsApp. Compartilhe seus requisitos. Combinamos você com uma conta verificada.' },
      step2: { num: '02', title: 'Verifique e Proteja', desc: 'Revise detalhes da conta, use nosso serviço de custódia e conclua a transferência com proteção total.' },
      step3: { num: '03', title: 'Implante e Escale', desc: 'Obtenha credenciais completas, redefinição de 2FA, e comece a operar imediatamente com confiança.' },
      readBeforeTitle: '📌 Leia Antes de Comprar / Vender',
      footer: 'Sempre verifique detalhes antes de finalizar. Em caso de dúvida, pergunte.',
      buying: {
        label: '🔵 Comprar',
        items: ['Navegue contas verificadas', 'Pagamento seguro via custódia', 'Entrega instantânea e suporte'],
      },
      selling: {
        label: '🔴 Vender',
        items: ['Liste sua conta com segurança', 'Receba via custódia protegida', 'Zero risco de chargeback'],
      },
      frozen: {
        label: '🔓 Conta Congelada?',
        desc: 'Ajudamos a recuperar ou substituir contas congeladas com alternativas verificadas.',
      },
      trust: {
        label: '✅ Por Que Confiar em Nós?',
        items: [
          '5.000+ transações bem-sucedidas',
          'Proteção de custódia em cada negócio',
          'Suporte multilíngue 24/7',
          'Apenas contas verificadas',
          'Preços transparentes',
          'Suporte pós-venda incluído',
        ],
      },
      rules: {
        label: '⚠️ Regras e Restrições',
        items: [
          'Sem estornos ou disputas',
          'Sem uso ilegal de contas',
          'Respeite os Termos de Serviço da plataforma',
          'Uma conta por comprador a menos que aprovado',
          'Taxas de custódia não são reembolsáveis',
        ],
      },
    },
    faq: {
      title: 'Perguntas Frequentes',
      subtitle: 'Respostas rápidas para perguntas comuns',
      q1: 'Quão rápido é a entrega?',
      a1: 'A maioria das contas é entregue dentro de 1-24 horas após confirmação do pagamento.',
      q2: 'A custódia é obrigatória?',
      a2: 'Sim, todas as transações usam nosso serviço seguro de custódia para proteção do comprador e vendedor.',
      q3: 'E se minha conta for banida?',
      a3: 'Oferecemos garantias de substituição em contas elegíveis dentro do período de garantia.',
      q4: 'Vocês suportam meu país?',
      a4: 'Operamos globalmente. Entre em contato para confirmar disponibilidade na sua região.',
      q5: 'Como entro em contato com o suporte?',
      a5: 'Entre em contato 24/7 via Telegram @ADjamesGrugeon ou WhatsApp +1 (254) 275-5458.',
      q6: 'Quais documentos eu recebo?',
      a6: 'Pacote KYC completo, email de recuperação, e cookies/proxy do navegador para login seguro, e entrega do 2FA',
    },
    cta: {
      title: 'Pronto para Escalar?',
      desc: 'Junte-se a milhares de operadores que confiam em nossa infraestrutura.',
      telegram: 'Mensagem no Telegram',
      whatsapp: 'Chat no WhatsApp',
    },
  },

  // ── VIETNAMESE ──────────────────────────────────────────
  vi: {
    hero: {
      badge: 'Cơ sở hạ tầng cao cấp cho nhà điều hành tinh hoa',
      title: 'Cơ sở hạ tầng Tài khoản Tinh hoa',
      description: 'Tài khoản đã xác minh, có thể mở rộng và an toàn cho các nhà điều hành khối lượng lớn trên toàn thế giới.',
      cta1: 'Bắt đầu',
      cta2: 'Tìm hiểu thêm',
    },
    terms: {
      title: 'Thời gian thiết lập',
      setup: '< 24 giờ',
      escrow: 'Ký quỹ',
      protection: 'Đã bao gồm',
      coverage: 'Phạm vi',
      jurisdictions: 'Toàn cầu',
      processed: 'Đã xử lý',
    },
    featureCards: [
      { title: 'Thiết lập tức thì', description: 'Bắt đầu trong vài phút, không phải vài ngày.' },
      { title: 'Tài khoản đã xác minh', description: 'Tài khoản đã kiểm tra trước, sẵn sàng sử dụng.' },
      { title: 'Phạm vi toàn cầu', description: 'Truy cập tài khoản trên nhiều khu vực.' },
      { title: 'Hỗ trợ 24/7', description: 'Trợ giúp chuyên dụng khi bạn cần.' },
    ],
    solutions: {
      title: 'Giải pháp',
      subtitle: 'Cơ sở hạ tầng tùy chỉnh cho mọi trường hợp sử dụng',
      merchant: {
        title: 'Giải pháp Thương nhân',
        desc: 'Xử lý thanh toán liền mạch cho thương nhân rủi ro cao.',
        p1: 'Onboarding tức thì',
        p2: 'Hỗ trợ đa tiền tệ',
        p3: 'Bảo vệ chống hoàn tiền',
      },
      banking: {
        title: 'Giải pháp Ngân hàng',
        desc: 'Tài khoản đã xác minh cho hoạt động tài chính toàn cầu.',
        p1: 'Tài khoản sẵn sàng KYC',
        p2: 'Tốc độ payout nhanh',
        p3: 'Phạm vi đa khu vực',
      },
      escrow: {
        title: 'Dịch vụ Ký quỹ',
        desc: 'Bảo vệ giao dịch an toàn qua bên thứ ba trung lập.',
        p1: 'Bảo vệ vốn 100%',
        p2: 'Giải phóng tức thì khi xác nhận',
        p3: 'Giải quyết tranh chấp bao gồm',
      },
    },
    continuity: {
      title: 'Tính liên tục hoạt động',
      subtitle: 'Được xây dựng cho khả năng phục hồi, thiết kế để mở rộng',
      uptime: { title: '99.9% thời gian hoạt động', desc: 'Cơ sở hạ tầng được xây dựng cho zero downtime.' },
      compliance: { title: 'Sẵn sàng tuân thủ', desc: 'Được kiểm tra trước cho các yêu cầu quy định.' },
      support: { title: 'Hỗ trợ 24/7', desc: 'Trợ giúp đa ngôn ngữ khi bạn cần.' },
      rapid: { title: 'Triển khai nhanh', desc: 'Hoạt động trong vài giờ, không phải vài tuần.' },
    },
    proof: {
      title: 'Bằng chứng doanh nghiệp',
      subtitle: 'Kết quả thực từ nhà điều hành thực',
      p1: 'Ảnh chụp doanh thu đã xác minh',
      p2: 'Xác nhận payout thực',
      p3: 'Bảng điều khiển tài khoản hoạt động',
      p4: 'Lời chứng thực của khách hàng',
      p5: 'Nhật ký giao dịch ký quỹ',
      p6: 'Kênh bằng chứng Telegram',
      cards: [
        { title: 'Phân tích thời gian thực', alt: 'Kết quả tài khoản 1' },
        { title: 'Theo dõi thanh toán', alt: 'Kết quả tài khoản 2' },
        { title: 'Bảng điều khiển trực tiếp', alt: 'Kết quả tài khoản 3' },
        { title: 'Payout thành công', alt: 'Kết quả tài khoản 4' },
        { title: 'Cửa hàng hoạt động', alt: 'Kết quả tài khoản 5' },
        { title: 'Thiết lập đầy đủ', alt: 'Kết quả tài khoản 6' },
      ],
    },
    how: {
      title: 'Cách hoạt động',
      subtitle: 'Đơn giản, an toàn và nhanh',
      step1: { num: '01', title: 'Kết nối & Xác nhận', desc: 'Liên hệ qua Telegram hoặc WhatsApp. Chia sẻ yêu cầu của bạn. Chúng tôi kết nối bạn với tài khoản đã xác minh.' },
      step2: { num: '02', title: 'Xác minh & Bảo mật', desc: 'Xem xét chi tiết tài khoản, sử dụng dịch vụ ký quỹ của chúng tôi và hoàn tất chuyển khoản với bảo vệ đầy đủ.' },
      step3: { num: '03', title: 'Triển khai & Mở rộng', desc: 'Nhận thông tin đăng nhập đầy đủ, đặt lại 2FA, và bắt đầu hoạt động ngay lập tức với sự tự tin.' },
      readBeforeTitle: '📌 Đọc trước khi mua / bán',
      footer: 'Luôn xác minh chi tiết trước khi hoàn tất. Khi nghi ngờ, hãy hỏi.',
      buying: {
        label: '🔵 Mua',
        items: ['Duyệt tài khoản đã xác minh', 'Thanh toán an toàn qua ký quỹ', 'Bàn giao & hỗ trợ tức thì'],
      },
      selling: {
        label: '🔴 Bán',
        items: ['Liệt kê tài khoản của bạn an toàn', 'Nhận thanh toán qua ký quỹ được bảo vệ', 'Không rủi ro hoàn tiền'],
      },
      frozen: {
        label: '🔓 Tài khoản bị đóng băng?',
        desc: 'Chúng tôi giúp khôi phục hoặc thay thế tài khoản bị đóng băng bằng các lựa chọn thay thế đã xác minh.',
      },
      trust: {
        label: '✅ Tại sao tin tưởng chúng tôi?',
        items: [
          '5.000+ giao dịch thành công',
          'Bảo vệ ký quỹ trên mỗi giao dịch',
          'Hỗ trợ đa ngôn ngữ 24/7',
          'Chỉ tài khoản đã xác minh',
          'Giá cả minh bạch',
          'Hỗ trợ sau bán hàng bao gồm',
        ],
      },
      rules: {
        label: '⚠️ Quy tắc & Hạn chế',
        items: [
          'Không hoàn tiền hoặc tranh chấp',
          'Không sử dụng tài khoản bất hợp pháp',
          'Tôn trọng Điều khoản dịch vụ nền tảng',
          'Một tài khoản mỗi người mua trừ khi được phê duyệt',
          'Phí ký quỹ không hoàn lại',
        ],
      },
    },
    faq: {
      title: 'Câu hỏi thường gặp',
      subtitle: 'Câu trả lời nhanh cho câu hỏi phổ biến',
      q1: 'Giao hàng nhanh thế nào?',
      a1: 'Hầu hết tài khoản được giao trong vòng 1-24 giờ sau khi xác nhận thanh toán.',
      q2: 'Ký quỹ có bắt buộc không?',
      a2: 'Có, tất cả giao dịch sử dụng dịch vụ ký quỹ an toàn của chúng tôi để bảo vệ người mua và người bán.',
      q3: 'Điều gì xảy ra nếu tài khoản của tôi bị cấm?',
      a3: 'Chúng tôi cung cấp bảo đảm thay thế cho tài khoản đủ điều kiện trong thời gian bảo hành.',
      q4: 'Các bạn có hỗ trợ quốc gia của tôi không?',
      a4: 'Chúng tôi hoạt động toàn cầu. Liên hệ để xác nhận khả dụng trong khu vực của bạn.',
      q5: 'Làm sao để liên hệ hỗ trợ?',
      a5: 'Liên hệ 24/7 qua Telegram @ADjamesGrugeon hoặc WhatsApp +1 (254) 275-5458.',
      q6: 'Tôi nhận được những tài liệu gì?',
      a6: 'Gói KYC đầy đủ, email khôi phục, và cookie/proxy trình duyệt để đăng nhập an toàn, cùng bàn giao 2FA',
    },
    cta: {
      title: 'Sẵn sàng mở rộng?',
      desc: 'Tham gia hàng ngàn nhà điều hành tin tưởng cơ sở hạ tầng của chúng tôi.',
      telegram: 'Nhắn tin trên Telegram',
      whatsapp: 'Chat trên WhatsApp',
    },
  },

  // ── ITALIAN ─────────────────────────────────────────────
  it: {
    hero: {
      badge: 'Infrastruttura premium per operatori élite',
      title: 'Infrastruttura di Account Élite',
      description: 'Account verificati, scalabili e sicuri per operatori ad alto volume in tutto il mondo.',
      cta1: 'Inizia',
      cta2: 'Scopri di più',
    },
    terms: {
      title: 'Tempo di configurazione',
      setup: '< 24 ore',
      escrow: 'Deposito fiduciario',
      protection: 'Incluso',
      coverage: 'Copertura',
      jurisdictions: 'Globale',
      processed: 'Elaborato',
    },
    featureCards: [
      { title: 'Configurazione istantanea', description: 'Inizia in minuti, non in giorni.' },
      { title: 'Account verificati', description: 'Account pre-verificati, pronti all\'uso.' },
      { title: 'Copertura globale', description: 'Accedi ad account in più regioni.' },
      { title: 'Supporto 24/7', description: 'Aiuto dedicato quando ne hai bisogno.' },
    ],
    solutions: {
      title: 'Soluzioni',
      subtitle: 'Infrastruttura su misura per ogni caso d\'uso',
      merchant: {
        title: 'Soluzioni per Commercianti',
        desc: 'Elaborazione pagamenti fluida per commercianti ad alto rischio.',
        p1: 'Onboarding istantaneo',
        p2: 'Supporto multi-valuta',
        p3: 'Protezione chargeback',
      },
      banking: {
        title: 'Soluzioni Bancarie',
        desc: 'Account verificati per operazioni finanziarie globali.',
        p1: 'Account pronti KYC',
        p2: 'Velocità di payout rapide',
        p3: 'Copertura multi-regione',
      },
      escrow: {
        title: 'Servizi di Deposito Fiduciario',
        desc: 'Protezione transazioni sicura tramite terzo neutrale.',
        p1: '100% protezione fondi',
        p2: 'Rilascio istantaneo alla conferma',
        p3: 'Risoluzione dispute inclusa',
      },
    },
    continuity: {
      title: 'Continuità Operativa',
      subtitle: 'Costruito per resilienza, progettato per scalare',
      uptime: { title: '99.9% di uptime', desc: 'Infrastruttura costruita per zero downtime.' },
      compliance: { title: 'Pronto per conformità', desc: 'Pre-verificato per requisiti normativi.' },
      support: { title: 'Supporto 24/7', desc: 'Aiuto multilingua quando ne hai bisogno.' },
      rapid: { title: 'Deployment rapido', desc: 'Online in ore, non in settimane.' },
    },
    proof: {
      title: 'Prove Aziendali',
      subtitle: 'Risultati reali da operatori reali',
      p1: 'Screenshot di revenue verificati',
      p2: 'Conferme di payout reali',
      p3: 'Dashboard di account attivi',
      p4: 'Testimonianze clienti',
      p5: 'Log transazioni deposito fiduciario',
      p6: 'Canale prove Telegram',
      cards: [
        { title: 'Analytics in tempo reale', alt: 'Risultato account 1' },
        { title: 'Tracciamento pagamenti', alt: 'Risultato account 2' },
        { title: 'Dashboard live', alt: 'Risultato account 3' },
        { title: 'Successo payout', alt: 'Risultato account 4' },
        { title: 'Negozio attivo', alt: 'Risultato account 5' },
        { title: 'Configurazione completa', alt: 'Risultato account 6' },
      ],
    },
    how: {
      title: 'Come Funziona',
      subtitle: 'Semplice, sicuro e veloce',
      step1: { num: '01', title: 'Connetti & Conferma', desc: 'Contattaci via Telegram o WhatsApp. Condividi i tuoi requisiti. Ti abbiniamo a un account verificato.' },
      step2: { num: '02', title: 'Verifica & Proteggi', desc: 'Rivedi dettagli account, usa il nostro servizio di deposito fiduciario e completa il trasferimento con protezione totale.' },
      step3: { num: '03', title: 'Deploy & Scala', desc: 'Ottieni credenziali complete, reset 2FA, e inizia a operare immediatamente con fiducia.' },
      readBeforeTitle: '📌 Leggi Prima di Acquistare / Vendere',
      footer: 'Verifica sempre i dettagli prima di finalizzare. In caso di dubbio, chiedi.',
      buying: {
        label: '🔵 Acquistare',
        items: ['Sfoglia account verificati', 'Pagamento sicuro tramite deposito fiduciario', 'Consegna istantanea e supporto'],
      },
      selling: {
        label: '🔴 Vendere',
        items: ['Elenca il tuo account in sicurezza', 'Ricevi pagamento tramite deposito fiduciario protetto', 'Zero rischio chargeback'],
      },
      frozen: {
        label: '🔓 Account Bloccato?',
        desc: 'Aiutiamo a recuperare o sostituire account bloccati con alternative verificate.',
      },
      trust: {
        label: '✅ Perché Fidarsi di Noi?',
        items: [
          '5.000+ transazioni riuscite',
          'Protezione deposito fiduciario su ogni deal',
          'Supporto multilingua 24/7',
          'Solo account verificati',
          'Prezzi trasparenti',
          'Supporto post-vendita incluso',
        ],
      },
      rules: {
        label: '⚠️ Regole & Restrizioni',
        items: [
          'Nessun chargeback o disputa',
          'Nessun uso illegale di account',
          'Rispetta i Termini di Servizio della piattaforma',
          'Un account per acquirente salvo approvazione',
          'Commissioni deposito fiduciario non rimborsabili',
        ],
      },
    },
    faq: {
      title: 'FAQ',
      subtitle: 'Risposte rapide a domande comuni',
      q1: 'Quanto è veloce la consegna?',
      a1: 'La maggior parte degli account viene consegnata entro 1-24 ore dopo conferma pagamento.',
      q2: 'Il deposito fiduciario è obbligatorio?',
      a2: 'Sì, tutte le transazioni usano il nostro servizio sicuro di deposito fiduciario per protezione acquirente e venditore.',
      q3: 'Cosa succede se il mio account viene bannato?',
      a3: 'Offriamo garanzie di sostituzione su account eleggibili entro il periodo di garanzia.',
      q4: 'Supportate il mio paese?',
      a4: 'Operiamo globalmente. Contattaci per confermare disponibilità nella tua regione.',
      q5: 'Come contatto il supporto?',
      a5: 'Contattaci 24/7 via Telegram @ADjamesGrugeon o WhatsApp +1 (254) 275-5458.',
      q6: 'Quali documenti ricevo?',
      a6: 'Pacchetto KYC completo, email di recupero, e cookie/proxy del browser per un accesso sicuro, e consegna 2FA',
    },
    cta: {
      title: 'Pronto a Scalare?',
      desc: 'Unisciti a migliaia di operatori che si fidano della nostra infrastruttura.',
      telegram: 'Messaggio su Telegram',
      whatsapp: 'Chat su WhatsApp',
    },
  },

  // ── CHINESE ─────────────────────────────────────────────
  zh: {
    hero: {
      badge: '精英运营商的高级基础设施',
      title: '精英账户基础设施',
      description: '为全球高容量运营商提供已验证、可扩展且安全的账户。',
      cta1: '开始使用',
      cta2: '了解更多',
    },
    terms: {
      title: '设置时间',
      setup: '< 24 小时',
      escrow: '托管',
      protection: '已包含',
      coverage: '覆盖范围',
      jurisdictions: '全球',
      processed: '已处理',
    },
    featureCards: [
      { title: '即时设置', description: '几分钟内开始，而非几天。' },
      { title: '已验证账户', description: '预筛选、即用账户。' },
      { title: '全球覆盖', description: '访问多个区域的账户。' },
      { title: '24/7 支持', description: '需要时提供专用帮助。' },
    ],
    solutions: {
      title: '解决方案',
      subtitle: '为每种用例定制的基础设施',
      merchant: {
        title: '商家解决方案',
        desc: '为高风险商家提供无缝支付处理。',
        p1: '即时入驻',
        p2: '多币种支持',
        p3: '拒付保护',
      },
      banking: {
        title: '银行解决方案',
        desc: '为全球金融业务提供已验证账户。',
        p1: 'KYC 就绪账户',
        p2: '快速打款速度',
        p3: '多区域覆盖',
      },
      escrow: {
        title: '托管服务',
        desc: '通过中立第三方提供安全的交易保护。',
        p1: '100% 资金保护',
        p2: '确认后即时释放',
        p3: '包含争议解决',
      },
    },
    continuity: {
      title: '运营连续性',
      subtitle: '为韧性构建，为扩展设计',
      uptime: { title: '99.9% 正常运行时间', desc: '为零停机时间构建的基础设施。' },
      compliance: { title: '合规就绪', desc: '为监管要求预先验证。' },
      support: { title: '24/7 支持', desc: '需要时提供多语言帮助。' },
      rapid: { title: '快速部署', desc: '几小时内上线，而非几周。' },
    },
    proof: {
      title: '企业证明',
      subtitle: '真实运营商的真实成果',
      p1: '已验证的收入截图',
      p2: '真实的打款确认',
      p3: '活跃账户仪表板',
      p4: '客户推荐',
      p5: '托管交易日志',
      p6: 'Telegram 证明频道',
      cards: [
        { title: '实时分析', alt: '账户结果 1' },
        { title: '付款跟踪', alt: '账户结果 2' },
        { title: '实时仪表板', alt: '账户结果 3' },
        { title: '打款成功', alt: '账户结果 4' },
        { title: '商店活跃', alt: '账户结果 5' },
        { title: '完整设置', alt: '账户结果 6' },
      ],
    },
    how: {
      title: '工作原理',
      subtitle: '简单、安全、快速',
      step1: { num: '01', title: '连接并确认', desc: '通过 Telegram 或 WhatsApp 联系我们。分享您的需求。我们为您匹配已验证账户。' },
      step2: { num: '02', title: '验证并保护', desc: '查看账户详情，使用我们的托管服务，并在完全保护下完成转账。' },
      step3: { num: '03', title: '部署并扩展', desc: '获取完整凭证、重置 2FA，并立即自信地开始运营。' },
      readBeforeTitle: '📌 购买/出售前阅读',
      footer: '完成前始终验证详情。如有疑问，请咨询。',
      buying: {
        label: '🔵 购买',
        items: ['浏览已验证账户', '通过托管安全支付', '即时交接与支持'],
      },
      selling: {
        label: '🔴 出售',
        items: ['安全列出您的账户', '通过受保护托管收款', '零拒付风险'],
      },
      frozen: {
        label: '🔓 账户冻结？',
        desc: '我们帮助恢复或用已验证替代方案替换冻结账户。',
      },
      trust: {
        label: '✅ 为什么信任我们？',
        items: [
          '5,000+ 成功交易',
          '每笔交易托管保护',
          '24/7 多语言支持',
          '仅已验证账户',
          '透明定价',
          '包含售后支持',
        ],
      },
      rules: {
        label: '⚠️ 规则与限制',
        items: [
          '无拒付或争议',
          '无非法使用账户',
          '遵守平台服务条款',
          '每位买家一个账户，除非批准',
          '托管费用不可退还',
        ],
      },
    },
    faq: {
      title: '常见问题',
      subtitle: '常见问题的快速解答',
      q1: '交付速度如何？',
      a1: '大多数账户在付款确认后 1-24 小时内交付。',
      q2: '托管是强制性的吗？',
      a2: '是的，所有交易都使用我们的安全托管服务保护买卖双方。',
      q3: '如果我的账户被封禁怎么办？',
      a3: '我们在保修期内为符合条件的账户提供更换保证。',
      q4: '你们支持我的国家吗？',
      a4: '我们在全球运营。联系我们确认您地区的可用性。',
      q5: '如何联系支持？',
      a5: '通过 Telegram @ADjamesGrugeon 或 WhatsApp +1 (254) 275-5458 24/7 联系我们。',
      q6: '我会收到哪些文件？',
      a6: '完整 KYC 包、恢复邮箱、浏览器 Cookie/代理以确保安全登录，以及 2FA 移交',
    },
    cta: {
      title: '准备好扩展了吗？',
      desc: '加入成千上万信任我们基础设施的运营商。',
      telegram: 'Telegram 消息',
      whatsapp: 'WhatsApp 聊天',
    },
  },

  // ── GERMAN ──────────────────────────────────────────────
  de: {
    hero: {
      badge: 'Premium-Infrastruktur für Elite-Betreiber',
      title: 'Elite-Konto-Infrastruktur',
      description: 'Verifizierte, skalierbare und sichere Konten für Hochvolumen-Betreiber weltweit.',
      cta1: 'Loslegen',
      cta2: 'Mehr erfahren',
    },
    terms: {
      title: 'Einrichtungszeit',
      setup: '< 24 Stunden',
      escrow: 'Treuhand',
      protection: 'Inklusive',
      coverage: 'Abdeckung',
      jurisdictions: 'Global',
      processed: 'Verarbeitet',
    },
    featureCards: [
      { title: 'Sofortige Einrichtung', description: 'Starten Sie in Minuten, nicht Tagen.' },
      { title: 'Verifizierte Konten', description: 'Vorab geprüfte, einsatzbereite Konten.' },
      { title: 'Globale Abdeckung', description: 'Zugriff auf Konten in mehreren Regionen.' },
      { title: '24/7 Support', description: 'Dedizierte Hilfe, wann immer Sie sie benötigen.' },
    ],
    solutions: {
      title: 'Lösungen',
      subtitle: 'Maßgeschneiderte Infrastruktur für jeden Anwendungsfall',
      merchant: {
        title: 'Händler-Lösungen',
        desc: 'Nahtlose Zahlungsabwicklung für Hochrisiko-Händler.',
        p1: 'Sofortiges Onboarding',
        p2: 'Multi-Währungs-Unterstützung',
        p3: 'Chargeback-Schutz',
      },
      banking: {
        title: 'Banking-Lösungen',
        desc: 'Verifizierte Konten für globale Finanzoperationen.',
        p1: 'KYC-bereite Konten',
        p2: 'Schnelle Auszahlungsgeschwindigkeiten',
        p3: 'Multi-Region-Abdeckung',
      },
      escrow: {
        title: 'Treuhanddienste',
        desc: 'Sichere Transaktionsschutz durch neutralen Dritten.',
        p1: '100% Fondsschutz',
        p2: 'Sofortige Freigabe bei Bestätigung',
        p3: 'Streitbeilegung inklusive',
      },
    },
    continuity: {
      title: 'Operative Kontinuität',
      subtitle: 'Für Resilienz gebaut, für Skalierung designed',
      uptime: { title: '99.9% Uptime', desc: 'Infrastruktur für zero Downtime gebaut.' },
      compliance: { title: 'Compliance-bereit', desc: 'Vorab geprüft für regulatorische Anforderungen.' },
      support: { title: '24/7 Support', desc: 'Mehrsprachige Hilfe, wann immer Sie sie benötigen.' },
      rapid: { title: 'Schnelles Deployment', desc: 'In Stunden live, nicht in Wochen.' },
    },
    proof: {
      title: 'Unternehmensnachweise',
      subtitle: 'Echte Ergebnisse von echten Betreibern',
      p1: 'Verifizierte Revenue-Screenshots',
      p2: 'Echte Auszahlungsbestätigungen',
      p3: 'Dashboards aktiver Konten',
      p4: 'Kundenstimmen',
      p5: 'Treuhand-Transaktionslogs',
      p6: 'Telegram-Beweiskanal',
      cards: [
        { title: 'Echtzeit-Analytics', alt: 'Konto-Ergebnis 1' },
        { title: 'Zahlungsverfolgung', alt: 'Konto-Ergebnis 2' },
        { title: 'Live-Dashboard', alt: 'Konto-Ergebnis 3' },
        { title: 'Auszahlungserfolg', alt: 'Konto-Ergebnis 4' },
        { title: 'Shop aktiv', alt: 'Konto-Ergebnis 5' },
        { title: 'Komplettes Setup', alt: 'Konto-Ergebnis 6' },
      ],
    },
    how: {
      title: "So funktioniert's",
      subtitle: 'Einfach, sicher und schnell',
      step1: { num: '01', title: 'Verbinden & Bestätigen', desc: 'Kontaktieren Sie uns über Telegram oder WhatsApp. Teilen Sie Ihre Anforderungen mit. Wir matchen Sie mit einem verifizierten Konto.' },
      step2: { num: '02', title: 'Prüfen & Sichern', desc: 'Überprüfen Sie Kontodetails, nutzen Sie unseren Treuhanddienst und schließen Sie den Transfer mit vollem Schutz ab.' },
      step3: { num: '03', title: 'Bereitstellen & Skalieren', desc: 'Erhalten Sie vollständige Anmeldedaten, 2FA-Reset, und starten Sie sofort mit Vertrauen.' },
      readBeforeTitle: '📌 Vor Kauf/Verkauf lesen',
      footer: 'Immer Details vor Abschluss prüfen. Bei Zweifel fragen.',
      buying: {
        label: '🔵 Kaufen',
        items: ['Durchsuche verifizierte Konten', 'Sichere Zahlung via Treuhand', 'Sofortige Übergabe & Support'],
      },
      selling: {
        label: '🔴 Verkaufen',
        items: ['Liste dein Konto sicher', 'Erhalte Zahlung über geschützten Treuhand', 'Null Chargeback-Risiko'],
      },
      frozen: {
        label: '🔓 Konto eingefroren?',
        desc: 'Wir helfen, eingefrorene Konten mit verifizierten Alternativen wiederherzustellen oder zu ersetzen.',
      },
      trust: {
        label: '✅ Warum uns vertrauen?',
        items: [
          '5.000+ erfolgreiche Transaktionen',
          'Treuhand-Schutz bei jedem Deal',
          '24/7 mehrsprachiger Support',
          'Nur verifizierte Konten',
          'Transparente Preisgestaltung',
          'After-Sales-Support inklusive',
        ],
      },
      rules: {
        label: '⚠️ Regeln & Einschränkungen',
        items: [
          'Keine Chargebacks oder Streitigkeiten',
          'Keine illegale Nutzung von Konten',
          'Respektieren Sie die Plattform-AGB',
          'Ein Konto pro Käufer, außer genehmigt',
          'Treuhandgebühren sind nicht erstattungsfähig',
        ],
      },
    },
    faq: {
      title: 'FAQ',
      subtitle: 'Schnelle Antworten auf häufige Fragen',
      q1: 'Wie schnell ist die Lieferung?',
      a1: 'Die meisten Konten werden innerhalb von 1-24 Stunden nach Zahlungsbestätigung geliefert.',
      q2: 'Ist Treuhand obligatorisch?',
      a2: 'Ja, alle Transaktionen nutzen unseren sicheren Treuhanddienst zum Schutz von Käufer und Verkäufer.',
      q3: 'Was passiert, wenn mein Konto gesperrt wird?',
      a3: 'Wir bieten Ersatzgarantien für berechtigte Konten innerhalb der Garantiezeit.',
      q4: 'Unterstützen Sie mein Land?',
      a4: 'Wir operieren global. Kontaktieren Sie uns, um Verfügbarkeit in Ihrer Region zu bestätigen.',
      q5: 'Wie kontaktiere ich den Support?',
      a5: 'Erreichen Sie uns 24/7 über Telegram @ADjamesGrugeon oder WhatsApp +1 (254) 275-5458.',
      q6: 'Welche Dokumente erhalte ich?',
      a6: 'Vollständiges KYC-Paket, Wiederherstellungs-E-Mail, und Browser-Cookies/Proxy für eine sichere Anmeldung, sowie 2FA-Übergabe',
    },
    cta: {
      title: 'Bereit zu skalieren?',
      desc: 'Schließen Sie sich Tausenden von Betreibern an, die unserer Infrastruktur vertrauen.',
      telegram: 'Nachricht auf Telegram',
      whatsapp: 'Chat auf WhatsApp',
    },
  },
};

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function HomeClient() {
  const { language } = useLanguage();
  const t = homeTranslations[language];
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

  // Solution cards using inline translations
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

  // Continuity items using inline translations
  const continuityItems = [
    { title: t.continuity.uptime.title, desc: t.continuity.uptime.desc },
    { title: t.continuity.compliance.title, desc: t.continuity.compliance.desc },
    { title: t.continuity.support.title, desc: t.continuity.support.desc },
    { title: t.continuity.rapid.title, desc: t.continuity.rapid.desc },
  ];

  // Proof items using inline translations
  const proofs = [t.proof.p1, t.proof.p2, t.proof.p3, t.proof.p4, t.proof.p5, t.proof.p6];

  // Value rows using inline translations - ONLY 3: Setup Time, Processed ($500k+ counter), Coverage
  const valueRows = [
    { 
      label: t.terms.title, 
      value: language === 'en' ? '10 minutes' : (language === 'fr' ? '10 minutes' : (language === 'ar' ? '10 دقائق' : (language === 'es' ? '10 minutos' : (language === 'pt' ? '10 minutos' : (language === 'vi' ? '10 phút' : (language === 'it' ? '10 minuti' : (language === 'zh' ? '10分钟' : (language === 'de' ? '10 Minuten' : t.terms.setup)))))))) 
    },
    { 
      label: t.terms.processed,
      value: '$500k+',
      isCounter: true,
      counterEnd: 500,
      counterPrefix: '$',
      counterSuffix: 'k+',
      counterSpeed: 'medium-fast'
    },
    { 
      label: t.terms.coverage, 
      value: t.terms.jurisdictions 
    },
  ];

  // Feature cards with inline translations
  const featureCards = t.featureCards.map((fc, idx) => ({
    title: fc.title,
    description: fc.description,
    icon: [
      <Bolt key={0} className="h-8 w-8 text-sky-500" />,
      <ShieldCheck key={1} className="h-8 w-8 text-slate-900" />,
      <Globe2 key={2} className="h-8 w-8 text-cyan-500" />,
      <Headset key={3} className="h-8 w-8 text-violet-500" />,
    ][idx],
  }));

  // How steps with inline translations
  const howSteps = [
    { num: t.how.step1.num, title: t.how.step1.title, desc: t.how.step1.desc, icon: '💬', accent: 'from-blue-500 to-sky-500' },
    { num: t.how.step2.num, title: t.how.step2.title, desc: t.how.step2.desc, icon: '🔍', accent: 'from-indigo-500 to-violet-500' },
    { num: t.how.step3.num, title: t.how.step3.title, desc: t.how.step3.desc, icon: '🔒', accent: 'from-teal-500 to-cyan-500' },
  ];

  // Accordion items with inline translations for Buying/Selling/Frozen/Trust/Rules
  const buyingSellingAccordionItems = [
    {
      id: 'buying',
      title: `🔵 ${t.how.buying.label}`,
      content: (
        <div className="border-l-4 border-blue-600 pl-6">
          <ul className="space-y-2 text-gray-700">
            {t.how.buying.items.map((item, i) => (
              <li key={i}>✓ {item}</li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: 'selling',
      title: `🔴 ${t.how.selling.label}`,
      content: (
        <div className="border-l-4 border-red-600 pl-6">
          <ul className="space-y-2 text-gray-700">
            {t.how.selling.items.map((item, i) => (
              <li key={i}>✓ {item}</li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: 'frozen',
      title: `🔓 ${t.how.frozen.label}`,
      content: (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 -m-4">
          <p className="text-gray-700">{t.how.frozen.desc}</p>
        </div>
      ),
    },
    {
      id: 'trust',
      title: `✅ ${t.how.trust.label}`,
      content: (
        <div className="bg-green-50 border-l-4 border-green-600 p-4 -m-4">
          <ul className="space-y-2 text-gray-700">
            {t.how.trust.items.map((item, i) => (
              <li key={i}>✓ {item}</li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: 'rules',
      title: `⚠️ ${t.how.rules.label}`,
      content: (
        <div className="bg-red-50 border-l-4 border-red-600 p-4 -m-4">
          <ul className="space-y-2 text-gray-700">
            {t.how.rules.items.map((item, i) => (
              <li key={i}>— {item}</li>
            ))}
          </ul>
        </div>
      ),
    },
  ];

  // FAQ items with inline translations - NOW WITH 6 ITEMS
  const faqItems = [
    { id: 'faq1', title: t.faq.q1, content: t.faq.a1 },
    { id: 'faq2', title: t.faq.q2, content: t.faq.a2 },
    { id: 'faq3', title: t.faq.q3, content: t.faq.a3 },
    { id: 'faq4', title: t.faq.q4, content: t.faq.a4 },
    { id: 'faq5', title: t.faq.q5, content: t.faq.a5 },
    { id: 'faq6', title: t.faq.q6, content: t.faq.a6 },
  ];

  // Proof cards with images 1-6 from public folder
  const imageProofs = [
    { title: t.proof.cards[0].title, src: '/1.1.jpeg', alt: t.proof.cards[0].alt },
    { title: t.proof.cards[0].title, src: '/1.2.jpeg', alt: t.proof.cards[0].alt },
    { title: t.proof.cards[0].title, src: '/1.3.jpeg', alt: t.proof.cards[0].alt },
    { title: t.proof.cards[0].title, src: '/1.4.jpeg', alt: t.proof.cards[0].alt },
    { title: t.proof.cards[1].title, src: '/2.jpeg', alt: t.proof.cards[1].alt },
    { title: t.proof.cards[2].title, src: '/3.jpg', alt: t.proof.cards[2].alt },
    { title: t.proof.cards[3].title, src: '/4.jpg', alt: t.proof.cards[3].alt },
    { title: t.proof.cards[4].title, src: '/5.jpeg', alt: t.proof.cards[4].alt },
    { title: t.proof.cards[0].title, src: '/6.jpeg', alt: t.proof.cards[0].alt },
    { title: t.proof.cards[1].title, src: '/7.jpg', alt: t.proof.cards[1].alt },
    { title: t.proof.cards[2].title, src: '/8.jpg', alt: t.proof.cards[2].alt },
    { title: t.proof.cards[3].title, src: '/9.jpeg', alt: t.proof.cards[3].alt },
    { title: t.proof.cards[4].title, src: '/10.jpg', alt: t.proof.cards[4].alt },
    { title: t.proof.cards[5].title, src: '/11.jpg', alt: t.proof.cards[5].alt },
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
                {t.hero.badge}
              </p>
              {/* NEW HEADLINE split into two lines for English and similar for other languages */}
              <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-[-0.04em] text-black sm:text-6xl lg:text-7xl">
                {language === 'en' && (
                  <>
                    Stop Getting Your Payments Blocked<br />
                    <span className="text-sky-600">Get Verified Accounts in Minutes!</span>
                  </>
                )}
                {language === 'fr' && (
                  <>
                    Stop aux paiements bloqués<br />
                    <span className="text-sky-600">Comptes vérifiés en quelques minutes !</span>
                  </>
                )}
                {language === 'ar' && (
                  <>
                    توقف عن حظر مدفوعاتك<br />
                    <span className="text-sky-600">احصل على حسابات موثقة خلال دقائق!</span>
                  </>
                )}
                {language === 'es' && (
                  <>
                    Deja de bloquear tus pagos<br />
                    <span className="text-sky-600">Consigue cuentas verificadas en minutos!</span>
                  </>
                )}
                {language === 'pt' && (
                  <>
                    Pare de bloquear seus pagamentos<br />
                    <span className="text-sky-600">Contas verificadas em minutos!</span>
                  </>
                )}
                {language === 'vi' && (
                  <>
                    Ngừng bị chặn thanh toán<br />
                    <span className="text-sky-600">Nhận tài khoản xác minh trong vài phút!</span>
                  </>
                )}
                {language === 'it' && (
                  <>
                    Basta blocchi ai pagamenti<br />
                    <span className="text-sky-600">Account verificati in pochi minuti!</span>
                  </>
                )}
                {language === 'zh' && (
                  <>
                    停止支付被封<br />
                    <span className="text-sky-600">几分钟内获取已验证账户！</span>
                  </>
                )}
                {language === 'de' && (
                  <>
                    Keine Zahlungsblockaden mehr<br />
                    <span className="text-sky-600">Verifizierte Konten in Minuten!</span>
                  </>
                )}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-900 sm:text-xl font-semibold">
                {/* Multi-language subheadline */}
                {language === 'en' && 'For dropshippers & high-risk businesses'}
                {language === 'fr' && 'Pour dropshippers & entreprises à risque'}
                {language === 'ar' && 'للدروبشيبرز والأعمال عالية المخاطر'}
                {language === 'es' && 'Para dropshippers y negocios de alto riesgo'}
                {language === 'pt' && 'Para dropshippers e negócios de alto risco'}
                {language === 'vi' && 'Cho dropshipper & doanh nghiệp rủi ro cao'}
                {language === 'it' && 'Per dropshipper e aziende ad alto rischio'}
                {language === 'zh' && '适用于高风险电商和企业'}
                {language === 'de' && 'Für Dropshipper & Hochrisiko-Unternehmen'}
              </p>
            </div>

            {/* CTA with Facebook Pixel and urgency text */}
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="https://t.me/ADjamesGrugeon"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => fbq('track', 'Lead', {content_name: 'Hero Button'})}
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-8 py-4 text-base font-semibold text-slate-950 shadow-xl shadow-sky-500/30 transition hover:bg-sky-400"
              >
                {/* Multi-language CTA */}
                {language === 'en' && 'Message James Now'}
                {language === 'fr' && 'Message James maintenant'}
                {language === 'ar' && 'راسل جيمس الآن'}
                {language === 'es' && 'Mensajea a James ahora'}
                {language === 'pt' && 'Mensagem para James agora'}
                {language === 'vi' && 'Nhắn James ngay'}
                {language === 'it' && 'Messaggia James ora'}
                {language === 'zh' && '立即联系 James'}
                {language === 'de' && 'Jetzt James kontaktieren'}
              </a>
            </div>

            {/* Value rows (setup, processed with counter, coverage) - ONLY 3 items */}
            <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-3">
              {valueRows.map((row, idx) => (
                <div key={row.label} className="rounded-3xl border border-black/10 bg-white/90 px-6 py-5 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-700">{row.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-black">
                    {row.isCounter ? (
                      <StatsCounter 
                        end={row.counterEnd} 
                        prefix={row.counterPrefix} 
                        suffix={row.counterSuffix}
                        speed={row.counterSpeed}
                      />
                    ) : (
                      row.value
                    )}
                  </p>
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

      {/* Enterprise Proof */}
      <ScrollAnimationWrapper delay={400}>
        <section id="proof" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.proof.title}</h2>
              <p className="text-xl text-gray-600">{t.proof.subtitle}</p>
            </div>
            <div className="relative">
              <GalleryAutoSlider images={imageProofs} />
            </div>
            <a
              href="https://t.me/ADjamesGrugeon?text=Proof_Inquiry"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => fbq('track', 'Lead', {content_name: 'Mid-Page Message'})}
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
              <h3 className="text-lg font-bold mb-4">{t.how.readBeforeTitle}</h3>
              <AccordionSection items={buyingSellingAccordionItems} allowMultiple={true} />
              <p className="text-center text-gray-600 mt-8">{t.how.footer}</p>
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

      <TelegramChannelSection />

      {/* CTA Section */}
      <ReplacementPolicySection />
      <ScrollAnimationWrapper delay={900}>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 text-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.cta.title}</h2>
            <p className="text-xl text-gray-700 mb-8">{t.cta.desc}</p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isArabic ? 'flex-row-reverse' : ''}`}>
              <a
                href="https://t.me/ADjamesGrugeon?text=Inquiry_NewAccount"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => fbq('track', 'Lead', {content_name: 'Pop-up Connect'})}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                {t.cta.telegram}
              </a>
              <a
                href="https://wa.me/12542755458"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => fbq('track', 'Lead', {content_name: 'WhatsApp Lead'})}
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