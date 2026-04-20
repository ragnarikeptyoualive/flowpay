'use client';

import { useLanguage } from '@/app/providers';

type Language = 'en' | 'fr' | 'ar' | 'es' | 'pt' | 'vi' | 'it' | 'zh' | 'de';

interface Review {
  rating: number;
  text: string;
  author: string;
  country: string;
}

const reviewsData: Record<Language, { title: string; items: Review[] }> = {
  en: {
    title: 'What Our Clients Say',
    items: [
      { rating: 5, text: "We were struggling to maintain our infrastructure during peak sales season. FlowPay stepped in and provided a fully integrated merchant setup in under 48 hours. The operational continuity they offer is a game-changer for high-volume sellers.", author: 'David K.', country: 'United Kingdom' },
      { rating: 5, text: "Finding a reliable partner for international banking and escrow is difficult in this industry. I was referred to FlowPay by a colleague, and the experience has been seamless. Professional, secure, and highly responsive team.", author: 'Omar S.', country: 'Morocco' },
      { rating: 5, text: "What I appreciate most is the lack of friction. I needed a verified Shopify environment to test a new product line, and the delivery was instant. No verification stress, just results. Truly the best service in the market.", author: 'Mateo R.', country: 'Spain' },
      { rating: 5, text: "The escrow service provided by FlowPay is exactly what the community needed. It removes the risk from high-value transactions. I've completed multiple deals now, and the transparency is unmatched. A trusted partner.", author: 'Blessing A.', country: 'Nigeria' },
      { rating: 5, text: "Their team doesn't just sell accounts; they provide business solutions. The technical support regarding Stripe and banking setups saved us weeks of troubleshooting. Their knowledge of global compliance is impressive.", author: 'Jean-Pierre L.', country: 'France' },
      { rating: 5, text: "In this business, time is money. FlowPay understands that. They got our US-based infrastructure ready faster and at a better price point than any other consultancy I've worked with. Highly recommended.", author: 'Zahid M.', country: 'Pakistan' },
    ],
  },
  fr: {
    title: 'Ce que disent nos clients',
    items: [
      { rating: 5, text: "Nous avions du mal à maintenir notre infrastructure pendant la saison des ventes. FlowPay est intervenu et a fourni une configuration commerçant entièrement intégrée en moins de 48h. La continuité opérationnelle qu'ils offrent change la donne pour les vendeurs haut volume.", author: 'David K.', country: 'Royaume-Uni' },
      { rating: 5, text: "Trouver un partenaire fiable pour la banque internationale et le séquestre est difficile dans ce secteur. Un collègue m'a recommandé FlowPay, et l'expérience a été fluide. Équipe professionnelle, sécurisée et très réactive.", author: 'Omar S.', country: 'Maroc' },
      { rating: 5, text: "Ce que j'apprécie le plus, c'est l'absence de friction. J'avais besoin d'un environnement Shopify vérifié pour tester une nouvelle gamme, et la livraison a été instantanée. Pas de stress de vérification, juste des résultats. Vraiment le meilleur service du marché.", author: 'Mateo R.', country: 'Espagne' },
      { rating: 5, text: "Le service de séquestre fourni par FlowPay est exactement ce dont la communauté avait besoin. Il supprime le risque des transactions à haute valeur. J'ai réalisé plusieurs deals maintenant, et la transparence est inégalée. Un partenaire de confiance.", author: 'Blessing A.', country: 'Nigéria' },
      { rating: 5, text: "Leur équipe ne vend pas seulement des comptes ; elle fournit des solutions business. Le support technique concernant Stripe et les configurations bancaires nous a fait gagner des semaines de dépannage. Leur connaissance de la conformité mondiale est impressionnante.", author: 'Jean-Pierre L.', country: 'France' },
      { rating: 5, text: "Dans ce business, le temps c'est de l'argent. FlowPay le comprend. Ils ont préparé notre infrastructure basée aux US plus rapidement et à un meilleur prix que tout autre consultant avec qui j'ai travaillé. Hautement recommandé.", author: 'Zahid M.', country: 'Pakistan' },
    ],
  },
  ar: {
    title: 'ماذا يقول عملاؤنا',
    items: [
      { rating: 5, text: 'كنا نكافح للحفاظ على بنيتنا التحتية خلال موسم الذروة. تدخل FlowPay وقدم إعداد تاجر متكامل بالكامل في أقل من 48 ساعة. الاستمرارية التشغيلية التي يقدمونها تغير قواعد اللعبة للبائعين عالي الحجم.', author: 'ديفيد ك.', country: 'المملكة المتحدة' },
      { rating: 5, text: 'إيجاد شريك موثوق للخدمات المصرفية الدولية والضمان صعب في هذه الصناعة. أحالني زميل إلى FlowPay، وكانت التجربة سلسة. فريق محترف، آمن، ومستجيب للغاية.', author: 'عمر س.', country: 'المغرب' },
      { rating: 5, text: 'ما أقدره أكثر هو عدم وجود احتكاك. كنت بحاجة إلى بيئة Shopify موثقة لاختبار خط إنتاج جديد، وكان التسليم فوريًا. لا ضغط تحقق، فقط نتائج. حقًا أفضل خدمة في السوق.', author: 'ماتيو ر.', country: 'إسبانيا' },
      { rating: 5, text: 'خدمة الضمان التي يقدمها FlowPay هي بالضبط ما احتاجته المجتمعات. تزيل المخاطر من المعاملات عالية القيمة. أكملت عدة صفقات الآن، والشفافية لا مثيل لها. شريك موثوق.', author: 'بلسينغ أ.', country: 'نيجيريا' },
      { rating: 5, text: 'فريقهم لا يبيع الحسابات فقط؛ بل يقدم حلول أعمال. الدعم الفني بشأن إعدادات Stripe والخدمات المصرفية وفر علينا أسابيع من استكشاف الأخطاء. معرفتهم بالامتثال العالمي مثيرة للإعجاب.', author: 'جان بيير ل.', country: 'فرنسا' },
      { rating: 5, text: 'في هذا العمل، الوقت هو المال. يفهم FlowPay ذلك. جهزوا بنيتنا التحتية الأمريكية بشكل أسرع وبنقطة سعر أفضل من أي استشاري آخر عملت معه. موصى به بشدة.', author: 'زاهد م.', country: 'باكستان' },
    ],
  },
  es: {
    title: 'Lo que dicen nuestros clientes',
    items: [
      { rating: 5, text: "Luchábamos por mantener nuestra infraestructura durante la temporada alta de ventas. FlowPay intervino y proporcionó una configuración de comerciante totalmente integrada en menos de 48 horas. La continuidad operativa que ofrecen es un cambio radical para vendedores de alto volumen.", author: 'David K.', country: 'Reino Unido' },
      { rating: 5, text: "Encontrar un socio confiable para banca internacional y depósito en garantía es difícil en esta industria. Un colega me recomendó FlowPay, y la experiencia ha sido impecable. Equipo profesional, seguro y muy receptivo.", author: 'Omar S.', country: 'Marruecos' },
      { rating: 5, text: "Lo que más aprecio es la falta de fricción. Necesitaba un entorno Shopify verificado para probar una nueva línea de productos, y la entrega fue instantánea. Sin estrés de verificación, solo resultados. Verdaderamente el mejor servicio del mercado.", author: 'Mateo R.', country: 'España' },
      { rating: 5, text: "El servicio de depósito en garantía que ofrece FlowPay es exactamente lo que necesitaba la comunidad. Elimina el riesgo de transacciones de alto valor. He completado múltiples acuerdos ahora, y la transparencia es inigualable. Un socio de confianza.", author: 'Blessing A.', country: 'Nigeria' },
      { rating: 5, text: "Su equipo no solo vende cuentas; proporciona soluciones empresariales. El soporte técnico sobre configuraciones de Stripe y banca nos ahorró semanas de solución de problemas. Su conocimiento de cumplimiento global es impresionante.", author: 'Jean-Pierre L.', country: 'Francia' },
      { rating: 5, text: "En este negocio, el tiempo es dinero. FlowPay lo entiende. Prepararon nuestra infraestructura basada en EE.UU. más rápido y a mejor precio que cualquier otra consultora con la que he trabajado. Muy recomendado.", author: 'Zahid M.', country: 'Pakistán' },
    ],
  },
  pt: {
    title: 'O que nossos clientes dizem',
    items: [
      { rating: 5, text: "Estávamos lutando para manter nossa infraestrutura durante a temporada de pico de vendas. A FlowPay interveio e forneceu uma configuração de comerciante totalmente integrada em menos de 48 horas. A continuidade operacional que eles oferecem é um divisor de águas para vendedores de alto volume.", author: 'David K.', country: 'Reino Unido' },
      { rating: 5, text: "Encontrar um parceiro confiável para banking internacional e custódia é difícil nesta indústria. Fui indicado à FlowPay por um colega, e a experiência foi perfeita. Equipe profissional, segura e altamente responsiva.", author: 'Omar S.', country: 'Marrocos' },
      { rating: 5, text: "O que mais aprecio é a falta de atrito. Eu precisava de um ambiente Shopify verificado para testar uma nova linha de produtos, e a entrega foi instantânea. Sem estresse de verificação, apenas resultados. Verdadeiramente o melhor serviço do mercado.", author: 'Mateo R.', country: 'Espanha' },
      { rating: 5, text: "O serviço de custódia fornecido pela FlowPay é exatamente o que a comunidade precisava. Remove o risco de transações de alto valor. Já completei múltiplos negócios agora, e a transparência é incomparável. Um parceiro de confiança.", author: 'Blessing A.', country: 'Nigéria' },
      { rating: 5, text: "A equipe deles não apenas vende contas; eles fornecem soluções de negócios. O suporte técnico sobre configurações de Stripe e banking nos poupou semanas de troubleshooting. Seu conhecimento de conformidade global é impressionante.", author: 'Jean-Pierre L.', country: 'França' },
      { rating: 5, text: "Neste negócio, tempo é dinheiro. A FlowPay entende isso. Eles prepararam nossa infraestrutura baseada nos EUA mais rápido e com melhor custo-benefício do que qualquer outra consultoria com que trabalhei. Altamente recomendado.", author: 'Zahid M.', country: 'Paquistão' },
    ],
  },
  vi: {
    title: 'Khách hàng nói gì về chúng tôi',
    items: [
      { rating: 5, text: "Chúng tôi đang gặp khó khăn trong việc duy trì cơ sở hạ tầng trong mùa cao điểm bán hàng. FlowPay đã can thiệp và cung cấp thiết lập merchant tích hợp đầy đủ trong vòng chưa đầy 48 giờ. Tính liên tục hoạt động mà họ cung cấp là yếu tố thay đổi cuộc chơi cho người bán khối lượng lớn.", author: 'David K.', country: 'Vương quốc Anh' },
      { rating: 5, text: "Tìm đối tác đáng tin cậy cho ngân hàng quốc tế và ký quỹ là khó trong ngành này. Tôi được đồng nghiệp giới thiệu FlowPay, và trải nghiệm thật suôn sẻ. Đội ngũ chuyên nghiệp, bảo mật và phản hồi rất nhanh.", author: 'Omar S.', country: 'Maroc' },
      { rating: 5, text: "Điều tôi đánh giá cao nhất là không có ma sát. Tôi cần môi trường Shopify đã xác minh để kiểm tra dòng sản phẩm mới, và việc giao hàng diễn ra tức thì. Không căng thẳng xác minh, chỉ có kết quả. Thực sự là dịch vụ tốt nhất trên thị trường.", author: 'Mateo R.', country: 'Tây Ban Nha' },
      { rating: 5, text: "Dịch vụ ký quỹ do FlowPay cung cấp chính xác là những gì cộng đồng cần. Nó loại bỏ rủi ro từ các giao dịch giá trị cao. Tôi đã hoàn thành nhiều giao dịch rồi, và sự minh bạch là vô song. Một đối tác đáng tin cậy.", author: 'Blessing A.', country: 'Nigeria' },
      { rating: 5, text: "Đội ngũ của họ không chỉ bán tài khoản; họ cung cấp giải pháp kinh doanh. Hỗ trợ kỹ thuật về thiết lập Stripe và ngân hàng đã tiết kiệm cho chúng tôi hàng tuần xử lý sự cố. Kiến thức của họ về tuân thủ toàn cầu thật ấn tượng.", author: 'Jean-Pierre L.', country: 'Pháp' },
      { rating: 5, text: "Trong ngành này, thời gian là tiền bạc. FlowPay hiểu điều đó. Họ đã chuẩn bị cơ sở hạ tầng dựa trên Mỹ của chúng tôi nhanh hơn và với mức giá tốt hơn bất kỳ công ty tư vấn nào khác tôi từng làm việc. Rất đáng giới thiệu.", author: 'Zahid M.', country: 'Pakistan' },
    ],
  },
  it: {
    title: 'Cosa dicono i nostri clienti',
    items: [
      { rating: 5, text: "Faticavamo a mantenere la nostra infrastruttura durante la stagione di picco delle vendite. FlowPay è intervenuta e ha fornito una configurazione merchant completamente integrata in meno di 48 ore. La continuità operativa che offrono è un game-changer per i venditori ad alto volume.", author: 'David K.', country: 'Regno Unito' },
      { rating: 5, text: "Trovare un partner affidabile per banking internazionale e deposito fiduciario è difficile in questo settore. Un collega mi ha consigliato FlowPay, e l'esperienza è stata impeccabile. Team professionale, sicuro e altamente reattivo.", author: 'Omar S.', country: 'Marocco' },
      { rating: 5, text: "Ciò che apprezzo di più è l'assenza di attrito. Avevo bisogno di un ambiente Shopify verificato per testare una nuova linea di prodotti, e la consegna è stata istantanea. Nessuno stress di verifica, solo risultati. Veramente il miglior servizio sul mercato.", author: 'Mateo R.', country: 'Spagna' },
      { rating: 5, text: "Il servizio di deposito fiduciario fornito da FlowPay è esattamente ciò di cui la comunità aveva bisogno. Rimuove il rischio dalle transazioni ad alto valore. Ho completato più accordi ora, e la trasparenza è ineguagliabile. Un partner fidato.", author: 'Blessing A.', country: 'Nigeria' },
      { rating: 5, text: "Il loro team non vende solo account; fornisce soluzioni aziendali. Il supporto tecnico su configurazioni Stripe e banking ci ha risparmiato settimane di troubleshooting. La loro conoscenza della compliance globale è impressionante.", author: 'Jean-Pierre L.', country: 'Francia' },
      { rating: 5, text: "In questo business, il tempo è denaro. FlowPay lo capisce. Hanno preparato la nostra infrastruttura basata sugli USA più velocemente e a un prezzo migliore di qualsiasi altra consulenza con cui ho lavorato. Altamente raccomandato.", author: 'Zahid M.', country: 'Pakistan' },
    ],
  },
  zh: {
    title: '客户评价',
    items: [
      { rating: 5, text: '在销售旺季期间，我们难以维持基础设施。FlowPay 介入并在 48 小时内提供了完全集成的商家设置。他们提供的运营连续性对高容量卖家来说是颠覆性的。', author: '大卫 K.', country: '英国' },
      { rating: 5, text: '在这个行业找到可靠的国际银行和托管合作伙伴很困难。同事推荐了 FlowPay，体验非常顺畅。团队专业、安全且响应迅速。', author: '奥马尔 S.', country: '摩洛哥' },
      { rating: 5, text: '我最欣赏的是毫无摩擦。我需要一个已验证的 Shopify 环境来测试新产品线，交付是即时的。没有验证压力，只有结果。确实是市场上最好的服务。', author: '马特奥 R.', country: '西班牙' },
      { rating: 5, text: 'FlowPay 提供的托管服务正是社区所需要的。它消除了高价值交易的风险。我已经完成了多笔交易，透明度无与伦比。值得信赖的合作伙伴。', author: '布莱辛 A.', country: '尼日利亚' },
      { rating: 5, text: '他们的团队不只是销售账户；他们提供商业解决方案。关于 Stripe 和银行设置的技术支持为我们节省了数周的故障排除时间。他们对全球合规性的知识令人印象深刻。', author: '让 - 皮埃尔 L.', country: '法国' },
      { rating: 5, text: '在这个行业，时间就是金钱。FlowPay 明白这一点。他们比我们合作过的任何其他咨询公司更快、以更优的价格准备好了我们的美国基础设施。强烈推荐。', author: '扎希德 M.', country: '巴基斯坦' },
    ],
  },
  de: {
    title: 'Was unsere Kunden sagen',
    items: [
      { rating: 5, text: "Wir hatten Schwierigkeiten, unsere Infrastruktur während der Hochsaison aufrechtzuerhalten. FlowPay griff ein und lieferte in unter 48 Stunden ein vollständig integriertes Merchant-Setup. Die operative Kontinuität, die sie bieten, ist ein Game-Changer für High-Volume-Verkäufer.", author: 'David K.', country: 'Vereinigtes Königreich' },
      { rating: 5, text: "Einen zuverlässigen Partner für internationales Banking und Treuhand zu finden, ist in dieser Branche schwierig. Ein Kollege empfahl mir FlowPay, und die Erfahrung war nahtlos. Professionelles, sicheres und hochreaktives Team.", author: 'Omar S.', country: 'Marokko' },
      { rating: 5, text: "Was ich am meisten schätze, ist das Fehlen von Reibung. Ich brauchte eine verifizierte Shopify-Umgebung, um eine neue Produktlinie zu testen, und die Lieferung war sofort. Kein Verifizierungsstress, nur Ergebnisse. Wirklich der beste Service auf dem Markt.", author: 'Mateo R.', country: 'Spanien' },
      { rating: 5, text: "Der Treuhanddienst von FlowPay ist genau das, was die Community brauchte. Er entfernt das Risiko von Hochwert-Transaktionen. Ich habe jetzt mehrere Deals abgeschlossen, und die Transparenz ist unübertroffen. Ein vertrauenswürdiger Partner.", author: 'Blessing A.', country: 'Nigeria' },
      { rating: 5, text: "Ihr Team verkauft nicht nur Konten; sie liefern Business-Lösungen. Der technische Support zu Stripe- und Banking-Setups sparte uns Wochen an Troubleshooting. Ihr Wissen über globale Compliance ist beeindruckend.", author: 'Jean-Pierre L.', country: 'Frankreich' },
      { rating: 5, text: "In diesem Business ist Zeit Geld. FlowPay versteht das. Sie haben unsere US-basierte Infrastruktur schneller und zu einem besseren Preispunkt vorbereitet als jede andere Beratung, mit der ich gearbeitet habe. Sehr empfehlenswert.", author: 'Zahid M.', country: 'Pakistan' },
    ],
  },
};

export default function ReviewsCarousel() {
  const { language } = useLanguage();
  const data = reviewsData[language];
  const loopedReviews = [...data.items, ...data.items];

  return (
    <>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 45s linear infinite;
          will-change: transform;
        }
        .animate-scroll:hover { animation-play-state: paused; }
        @media (max-width: 768px) {
          .animate-scroll { animation-duration: 30s; }
        }
      `}</style>

      <section id="clients-say" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-purple-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            {data.title}
          </h2>

          <div className="relative w-full overflow-hidden">
            <div className="flex gap-6 animate-scroll" style={{ width: 'fit-content' }}>
              {loopedReviews.map((review, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-80 md:w-96 bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex gap-1 mb-4" aria-label={`${review.rating} out of 5 stars`}>
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg" aria-hidden="true">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 md:mb-6 text-sm leading-relaxed">
                    {review.text}
                  </p>
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

          <div className="absolute left-0 top-0 w-16 sm:w-24 h-full bg-gradient-to-r from-blue-50 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 w-16 sm:w-24 h-full bg-gradient-to-l from-purple-50 to-transparent pointer-events-none" />
        </div>
      </section>
    </>
  );
}