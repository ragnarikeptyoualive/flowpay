// app/privacy/page.tsx
import Header from '@/components/Header';
import ScrollAnimationWrapper from '@/components/ScrollAnimationWrapper';
import PrivacyClient from './PrivacyClient';

export const metadata = {
  title: 'FlowPay Privacy',
  description: 'FlowPay privacy information for users of our ready-to-use accounts, support, and refund services.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Header />
      <ScrollAnimationWrapper>
        <PrivacyClient />
      </ScrollAnimationWrapper>
    </main>
  );
}