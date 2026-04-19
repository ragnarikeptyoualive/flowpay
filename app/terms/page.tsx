// app/terms/page.tsx
import Header from '@/components/Header';
import ScrollAnimationWrapper from '@/components/ScrollAnimationWrapper';
import TermsClient from './TermsClient';

export const metadata = {
  title: 'FlowPay Terms',
  description: 'Terms of service for FlowPay, including delivery, refund and support policies for ready-to-use merchant accounts.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Header />
      <ScrollAnimationWrapper>
        <TermsClient />
      </ScrollAnimationWrapper>
    </main>
  );
}