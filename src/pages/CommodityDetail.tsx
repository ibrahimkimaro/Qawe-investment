import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Check, MessageCircle } from 'lucide-react';
import { commodities } from '@/data/commodities';
import { OFFICIAL_EMAIL, PRIMARY_WHATSAPP, OFFICE_ADDRESS, sitePath, whatsappLink } from '@/data/company';
import { trackEvent } from '@/lib/analytics';
import NotFound from '@/pages/not-found';

interface CommodityDetailPageProps {
  params: { slug: string };
}

export default function CommodityDetailPage({ params }: CommodityDetailPageProps) {
  const commodity = commodities.find((item) => item.slug === params.slug);

  useEffect(() => {
    if (!commodity) return;
    document.title = `${commodity.name} Specification & Supply | Qawe Investment Company Limited`;
    const description = document.querySelector('meta[name="description"]') ?? document.createElement('meta');
    description.setAttribute('name', 'description');
    description.setAttribute('content', `${commodity.name} sourcing, technical specifications, independent verification and export supply from Qawe Investment Company Limited.`);
    document.head.appendChild(description);

    return () => {
      document.title = 'Qawe Investment Company Limited — Material. Moved with clarity.';
    };
  }, [commodity]);

  if (!commodity) return <NotFound />;

  const waHref = whatsappLink(PRIMARY_WHATSAPP, `Hello Qawe Investment Company Limited, I would like to discuss ${commodity.name}.`);

  return (
    <div className="min-h-[100dvh] bg-[#211f1b] text-[#f1ede5]">
      {/* Top Header */}
      <header className="border-b border-[#4a443b] bg-[#181715]">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-5 py-5 lg:px-8">
          <a href={sitePath()} className="flex items-center gap-3" data-testid="link-detail-logo">
            <div
              className="hover:opacity-90 relative p-[2px] overflow-hidden rounded-2xl flex items-center justify-center h-14 w-auto hover:scale-105 transition-all duration-300"
            >
              {/* Keyframe ya animation iliyowekwa inline */}
              <style>{`
    @keyframes spinBorder {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `}</style>

              {/* Tabaka la Mpaka Unaotembea Nyeupe */}
              <span
                className="absolute -z-10"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 20%, #ffffff 50%, transparent 80%)',
                  animation: 'spinBorder 3s linear infinite',
                  width: '250%',
                  height: '250%',
                }}
              />

              {/* Picha ya Nembo Pamoja na Logic ya Error handling */}
              <img
                src="/media/qawe-brand-logo.jpeg"
                alt="Qawe crest"
                className="h-12 w-auto object-cover rounded-2xl"
                style={{ background: '#000000' }} /* Badilisha #000000 kulingana na rangi ya background ya tovuti yako */
                onError={(e) => {
                  // Fallback to stylized Q if image loads slowly
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <span className="font-display text-[13px] font-bold uppercase tracking-[.16em]">
              Qawe Investment
            </span>
          </a>
          <a
            href={sitePath()}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#d09b30] transition-colors hover:text-[#f3f0e9]"
            data-testid="link-detail-back"
          >
            <ArrowLeft size={14} /> Back to company overview
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-[1100px] px-5 py-16 lg:px-8 lg:py-24">
        <div className="max-w-[780px]">
          <span className="eyebrow text-[#d09b30] block">
            {commodity.category} / {commodity.code}
          </span>
          <h1 className="mt-5 font-display text-[clamp(3.2rem,8vw,7rem)] font-semibold leading-[.88] tracking-[-.08em]">
            {commodity.name}
          </h1>
          <p className="mt-8 max-w-[680px] text-[17px] leading-8 text-[#c1b9ae]">
            {commodity.description}
          </p>
        </div>

        {/* Specs and Parameters */}
        {commodity.specs && commodity.specs.length > 0 && (
          <div className="mt-12 border border-[#4a4338] bg-[#181715] p-7">
            <span className="eyebrow text-[#d09b30] block mb-4">
              Physical & Chemical Specifications
            </span>
            <div className="grid gap-3 sm:grid-cols-2">
              {commodity.specs.map((spec) => (
                <div key={spec} className="flex items-center gap-3 text-sm text-[#ddd6cc]">
                  <Check size={16} className="text-[#c89532] shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2-Card Layout */}
        <div className="mt-8 grid gap-px bg-[#5a5145]/60 sm:grid-cols-2">
          <div className="bg-[#181715] p-7 sm:p-9">
            <span className="eyebrow text-[#8f877c]">Typical use</span>
            <p className="mt-4 max-w-[360px] font-display text-2xl leading-tight tracking-[-.04em] text-[#f1ede5]">
              {commodity.uses}
            </p>
          </div>
          <div className="bg-[#181715] p-7 sm:p-9">
            <span className="eyebrow text-[#8f877c]">Conversation format</span>
            <p className="mt-4 max-w-[360px] font-display text-2xl leading-tight tracking-[-.04em] text-[#f1ede5]">
              {commodity.forms}
            </p>
          </div>
        </div>

        {/* Commercial Callout */}
        <div className="mt-14 border-t border-[#4a443b] pt-8">
          <p className="max-w-[700px] text-sm leading-7 text-[#9e968b]">
            Material availability, independent assaying, SGS/Bureau Veritas certification, export permits, and freight timeline are confirmed requirement by requirement. Share your brief with our Dar es Salaam desk to begin.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={`mailto:${OFFICIAL_EMAIL}?subject=${encodeURIComponent(`${commodity.name} supply enquiry`)}`}
              onClick={() => trackEvent('rfq_started', { source: 'commodity_detail', material: commodity.name })}
              className="line-button flex items-center gap-3 bg-[#c89532] px-6 py-3.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#211f1b] transition-all hover:bg-[#e2b04c]"
              data-testid="link-detail-email"
            >
              Email an RFQ <ArrowUpRight size={15} />
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('contact_clicked', { channel: 'whatsapp', material: commodity.name })}
              className="line-button flex items-center gap-3 border border-[#786f61] px-6 py-3.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#d7d1c8] transition-colors hover:border-[#d09b30] hover:text-[#d09b30]"
              data-testid="link-detail-whatsapp"
            >
              WhatsApp the team <MessageCircle size={15} />
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#37332d] px-5 py-6 text-xs text-[#827a6f] lg:px-8">
        <div className="mx-auto flex max-w-[1100px] justify-between">
          <span>© Qawe Investment Company Limited</span>
          <span>{OFFICE_ADDRESS}</span>
        </div>
      </footer>
    </div>
  );
}
