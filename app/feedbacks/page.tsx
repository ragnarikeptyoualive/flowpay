import Header from '@/components/Header';
import ScrollAnimationWrapper from '@/components/ScrollAnimationWrapper';
import FeedbacksClient from './FeedbacksClient';

export const metadata = {
  title: 'Feedbacks | FlowPay',
  description: 'Real screenshots from completed FlowPay deals. See Stripe dashboards, Shopify stores, escrow payouts, and successful operator setups.',
};

export default function FeedbacksPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Header />
      <ScrollAnimationWrapper>
        <FeedbacksClient />
      </ScrollAnimationWrapper>
    </main>
  );
}
