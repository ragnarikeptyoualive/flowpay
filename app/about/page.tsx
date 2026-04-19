import Header from '@/components/Header';
import ScrollAnimationWrapper from '@/components/ScrollAnimationWrapper';
import AboutClient from './AboutClient';

export const metadata = {
  title: 'About FlowPay',
  description: 'Learn about FlowPay’s ready-to-use merchant accounts, escrow protections, refund policy, and support offering.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Header />
      <ScrollAnimationWrapper>
        <AboutClient />
      </ScrollAnimationWrapper>
    </main>
  );
}