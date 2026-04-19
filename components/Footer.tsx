import { Instagram, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { label: 'Solutions', href: '#solutions' },
    { label: 'Continuity', href: '#continuity' },
    { label: 'Proof', href: '#proof' },
    { label: 'How it Works', href: '#how' },
    { label: 'FAQ', href: '#faq' },
  ];

  const companyLinks = [
    { label: 'About FlowPay', href: '/about' },
    { label: 'Terms', href: '/terms' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Contact', href: 'https://t.me/ADjamesGrugeon' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-200 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <img src="/logo.png" alt="FlowPay" className="h-24 w-auto" />
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              Verified e-commerce infrastructure with escrow, banking, and fast onboarding for operators who need speed and trust.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Quick Links</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Company</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Follow</h3>
            <div className="mt-5 flex items-center gap-4 text-slate-300">
              <a href="#" className="transition hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="transition hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="transition hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:hello@flowpay.com" className="transition hover:text-white">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-6 text-sm text-slate-500">© 2026 FlowPay. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
