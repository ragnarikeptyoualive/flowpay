'use client';

import { useLanguage } from '@/app/providers';
import { translations } from '@/lib/translations';

export default function ReviewsCarousel() {
  const { language } = useLanguage();
  const t = translations[language];

  // Use translated reviews if available, fallback to English
  const reviewTexts = [
    {
      rating: 5,
      text: t.reviews?.[0] || "We were struggling to maintain our infrastructure during peak sales season. FlowPay stepped in and provided a fully integrated merchant setup in under 48 hours. The operational continuity they offer is a game-changer for high-volume sellers.",
      author: t.reviewAuthors?.[0] || 'David K.',
      country: t.reviewCountries?.[0] || 'United Kingdom',
    },
    {
      rating: 5,
      text: t.reviews?.[1] || "Finding a reliable partner for international banking and escrow is difficult in this industry. I was referred to FlowPay by a colleague, and the experience has been seamless. Professional, secure, and highly responsive team.",
      author: t.reviewAuthors?.[1] || 'Omar S.',
      country: t.reviewCountries?.[1] || 'Morocco',
    },
    {
      rating: 5,
      text: t.reviews?.[2] || "What I appreciate most is the lack of friction. I needed a verified Shopify environment to test a new product line, and the delivery was instant. No verification stress, just results. Truly the best service in the market.",
      author: t.reviewAuthors?.[2] || 'Mateo R.',
      country: t.reviewCountries?.[2] || 'Spain',
    },
    {
      rating: 5,
      text: t.reviews?.[3] || "The escrow service provided by FlowPay is exactly what the community needed. It removes the risk from high-value transactions. I've completed multiple deals now, and the transparency is unmatched. A trusted partner.",
      author: t.reviewAuthors?.[3] || 'Blessing A.',
      country: t.reviewCountries?.[3] || 'Nigeria',
    },
    {
      rating: 5,
      text: t.reviews?.[4] || "Their team doesn't just sell accounts; they provide business solutions. The technical support regarding Stripe and banking setups saved us weeks of troubleshooting. Their knowledge of global compliance is impressive.",
      author: t.reviewAuthors?.[4] || 'Jean-Pierre L.',
      country: t.reviewCountries?.[4] || 'France',
    },
    {
      rating: 5,
      text: t.reviews?.[5] || "In this business, time is money. FlowPay understands that. They got our US-based infrastructure ready faster and at a better price point than any other consultancy I've worked with. Highly recommended.",
      author: t.reviewAuthors?.[5] || 'Zahid M.',
      country: t.reviewCountries?.[5] || 'Pakistan',
    },
  ];

  // Duplicate for seamless infinite loop
  const loopedReviews = [...reviewTexts, ...reviewTexts];

  return (
    <>
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 45s linear infinite;
          will-change: transform;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        @media (max-width: 768px) {
          .animate-scroll {
            animation-duration: 30s;
          }
        }
      `}</style>

      <section id="clients-say" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-purple-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            {t.reviewsSection?.title || 'What Our Clients Say'}
          </h2>

          <div className="relative w-full overflow-hidden">
            {/* Carousel Track */}
            <div className="flex gap-6 animate-scroll" style={{ width: 'fit-content' }}>
              {loopedReviews.map((review, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-80 md:w-96 bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow"
                >
                  {/* Star Rating */}
                  <div className="flex gap-1 mb-4" aria-label={`${review.rating} out of 5 stars`}>
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg" aria-hidden="true">★</span>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 mb-4 md:mb-6 text-sm leading-relaxed">
                    {review.text}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{review.author}</p>
                      <p className="text-xs text-gray-500">{review.country}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fade overlays for visual polish */}
          <div className="absolute left-0 top-0 w-16 sm:w-24 h-full bg-gradient-to-r from-blue-50 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 w-16 sm:w-24 h-full bg-gradient-to-l from-purple-50 to-transparent pointer-events-none" />
        </div>
      </section>
    </>
  );
}