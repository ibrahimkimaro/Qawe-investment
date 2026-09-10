import { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Check, 
  MessageCircle, 
  Download, 
  Share2, 
  ShieldCheck, 
  Building2, 
  Truck, 
  Scale, 
  Anchor, 
  FileCheck2, 
  ChevronRight, 
  Send, 
  X,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { commodities } from '@/data/commodities';
import { OFFICIAL_EMAIL, PRIMARY_WHATSAPP, OFFICE_ADDRESS, sitePath, whatsappLink } from '@/data/company';
import { trackEvent } from '@/lib/analytics';
import NotFound from '@/pages/not-found';
import { useLocation } from 'wouter';

interface CommodityDetailPageProps {
  params: { slug: string };
}

export default function CommodityDetailPage({ params }: CommodityDetailPageProps) {
  const commodity = commodities.find((item) => item.slug === params.slug);
  const [, setLocation] = useLocation();

  // Modal and toast state
  const [isRfqOpen, setIsRfqOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // RFQ Form state
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [quantity, setQuantity] = useState('');
  const [incoterm, setIncoterm] = useState('CIF');
  const [destinationPort, setDestinationPort] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!commodity) return;
    window.scrollTo(0, 0);
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

  const waHref = whatsappLink(PRIMARY_WHATSAPP, `Hello Qawe Investment Company Limited, I would like to discuss supply terms for ${commodity.name}.`);

  const handleBack = () => {
    if (window.history.length > 1 && window.history.state !== null) {
      window.history.back();
    } else {
      setLocation('/');
      setTimeout(() => {
        const element = document.getElementById('commodities');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrintSpec = () => {
    window.print();
  };

  const submitRfqViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*FORMAL SUPPLY RFQ - QAWE INVESTMENT*\n\n*Commodity:* ${commodity.name} (Code: ${commodity.code})\n*Company:* ${companyName || 'Not specified'}\n*Contact Person:* ${contactName || 'Not specified'}\n*Contact details:* ${contactInfo || 'Not specified'}\n*Required Quantity:* ${quantity || 'To be discussed'}\n*Delivery Terms:* ${incoterm} ${destinationPort ? 'to ' + destinationPort : ''}\n*Additional Specifications/Notes:* ${notes || 'Standard Grade'}\n\n_Submitted via qaweinvestment.com Specification Portal_ communication;`;

    trackEvent('rfq_submitted', { channel: 'whatsapp_modal', material: commodity.name });
    window.open(whatsappLink(PRIMARY_WHATSAPP, message), '_blank');
    setIsRfqOpen(false);
  };

  // Other related commodities for bottom navigation
  const relatedCommodities = commodities.filter((item) => item.slug !== commodity.slug).slice(0, 3);

  return (
    <div className="min-h-[100dvh] bg-[#211f1b] text-[#f1ede5] print:bg-white print:text-black selection:bg-[#d09b30] selection:text-[#211f1b]">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-[#4a443b] bg-[#181715]/95 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-5 py-4 lg:px-8">
          <button
            type="button"
            onClick={() => setLocation('/')}
            className="flex items-center gap-3 group text-left cursor-pointer"
            data-testid="link-detail-logo"
          >
            <div className="relative p-[2px] overflow-hidden rounded-2xl flex items-center justify-center h-12 w-auto transition-transform duration-300 group-hover:scale-105">
              <style>{`
                @keyframes spinBorder {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
              `}</style>
              <span
                className="absolute -z-10"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 20%, #d09b30 50%, transparent 80%)',
                  animation: 'spinBorder 3s linear infinite',
                  width: '250%',
                  height: '250%',
                }}
              />
              <img
                src="/media/qawe-brand-logo.jpeg"
                alt="Qawe crest"
                className="h-10 w-auto object-cover rounded-2xl bg-black"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-[13px] font-bold uppercase tracking-[.16em] text-[#f3f0e9] group-hover:text-[#d09b30] transition-colors">
                Qawe Investment
              </span>
              <span className="text-[10px] tracking-wider text-[#8f877c]">
                Tanzania & Regional Minerals Desk
              </span>
            </div>
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={handleShare}
              className="hidden sm:flex items-center gap-1.5 text-xs text-[#a9a194] hover:text-[#d09b30] transition-colors px-3 py-1.5 border border-[#3e3931] rounded bg-[#211f1b]"
              title="Copy link to share"
            >
              <Share2 size={13} />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.14em] text-[#d09b30] transition-all hover:text-[#f3f0e9] hover:-translate-x-0.5"
              data-testid="link-detail-back"
            >
              <ArrowLeft size={14} /> Back to Overview
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-[1100px] px-5 py-10 lg:px-8 lg:py-16">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[#8f877c] mb-8 print:hidden">
          <button onClick={() => setLocation('/')} className="hover:text-[#d09b30] transition-colors">Home</button>
          <ChevronRight size={12} className="text-[#5a5145]" />
          <button onClick={handleBack} className="hover:text-[#d09b30] transition-colors">Commodities</button>
          <ChevronRight size={12} className="text-[#5a5145]" />
          <span className="text-[#d09b30] font-medium">{commodity.name}</span>
        </nav>

        {/* Hero Title & Availability Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#3e382f]">
          <div className="max-w-[780px]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-block px-3 py-1 bg-[#2e2a24] border border-[#524b3e] text-[11px] font-bold uppercase tracking-widest text-[#d09b30]">
                {commodity.category} • REF: {commodity.code}
              </span>

            </div>

            <h1 className="mt-5 font-display text-[clamp(2.8rem,7vw,5.5rem)] font-semibold leading-[.92] tracking-[-.06em] text-[#fbf8f3]">
              {commodity.name}
            </h1>
            <p className="mt-6 max-w-[700px] text-[17px] leading-relaxed text-[#c7bfb4]">
              {commodity.description}
            </p>
          </div>

          {/* Quick Actions Bar */}
          <div className="flex flex-row md:flex-col gap-3 shrink-0 print:hidden">
            <button
              onClick={() => setIsRfqOpen(true)}
              className="flex items-center justify-center gap-2.5 bg-[#c89532] px-6 py-3.5 text-xs font-bold uppercase tracking-[.14em] text-[#211f1b] transition-all hover:bg-[#e2b04c] hover:shadow-lg shadow-[#c89532]/10"
            >
              <Send size={14} /> Request Quote (RFQ)
            </button>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2.5 border border-[#6b6255] px-5 py-3.5 text-xs font-bold uppercase tracking-[.14em] text-[#f1ede5] transition-colors hover:border-[#d09b30] hover:text-[#d09b30] bg-[#181715]"
            >
              <MessageCircle size={15} /> WhatsApp Desk
            </a>
            <button
              onClick={handlePrintSpec}
              className="hidden sm:flex items-center justify-center gap-2 text-xs text-[#a49c90] hover:text-[#f1ede5] py-1.5 transition-colors"
            >
              <Download size={13} /> Print / Save Spec Sheet
            </button>
          </div>
        </div>

        {/* Commercial & Trade Terms Key Attributes */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-[.16em] text-[#d09b30]">
              Standard Commercial & Supply Terms
            </span>
            <span className="text-[11px] text-[#8a8275]">Subject to buyer contract</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="border border-[#3d3830] bg-[#181715] p-5 flex items-start gap-3.5">
              <ShieldCheck className="w-5 h-5 text-[#c89532] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8e8578] block">Assay & Verification</span>
                <p className="text-sm text-[#eee9e0] mt-1 font-medium">Independent Assay (SGS / Alex Stewart / BV) per dispatch lot</p>
              </div>
            </div>

            <div className="border border-[#3d3830] bg-[#181715] p-5 flex items-start gap-3.5">
              <Anchor className="w-5 h-5 text-[#c89532] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8e8578] block">Incoterms Supported</span>
                <p className="text-sm text-[#eee9e0] mt-1 font-medium">FOB Port of Dar es Salaam / CIF Destination World Ports</p>
              </div>
            </div>

            <div className="border border-[#3d3830] bg-[#181715] p-5 flex items-start gap-3.5">
              <FileCheck2 className="w-5 h-5 text-[#c89532] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8e8578] block">Regulatory Compliance</span>
                <p className="text-sm text-[#eee9e0] mt-1 font-medium">Tanzania Mining Commission Permits & Origin Clearances</p>
              </div>
            </div>

            <div className="border border-[#3d3830] bg-[#181715] p-5 flex items-start gap-3.5">
              <Truck className="w-5 h-5 text-[#c89532] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8e8578] block">Supply Corridor</span>
                <p className="text-sm text-[#eee9e0] mt-1 font-medium">Direct Concessions via Tanzania, DRC & Zambia Transit Hubs</p>
              </div>
            </div>

            <div className="border border-[#3d3830] bg-[#181715] p-5 flex items-start gap-3.5">
              <Scale className="w-5 h-5 text-[#c89532] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8e8578] block">Commercial Settlement</span>
                <p className="text-sm text-[#eee9e0] mt-1 font-medium">Confirmed Documentary L/C / Escrow / Bank-to-Bank</p>
              </div>
            </div>

            <div className="border border-[#3d3830] bg-[#181715] p-5 flex items-start gap-3.5">
              <Building2 className="w-5 h-5 text-[#c89532] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8e8578] block">Inspection Facility</span>
                <p className="text-sm text-[#eee9e0] mt-1 font-medium">Dar es Salaam Secured Bonded Warehouse & Vaults</p>
              </div>
            </div>
          </div>
        </section>

        {/* Specs and Technical Parameters */}
        {commodity.specs && commodity.specs.length > 0 && (
          <section className="mt-12 border border-[#4a4338] bg-[#181715] p-7 sm:p-9">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#d09b30]" />
              <h2 className="text-xs font-bold uppercase tracking-[.16em] text-[#d09b30]">
                Physical, Chemical & Lot Specifications
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {commodity.specs.map((spec) => (
                <div key={spec} className="flex items-start gap-3 text-sm text-[#e4ded5] bg-[#211f1b]/70 p-4 border border-[#38332c]">
                  <Check size={18} className="text-[#c89532] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{spec}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 2-Card Layout: Application & Format */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="border border-[#3d3830] bg-[#181715] p-7 sm:p-9 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8f877c]">Typical Industrial Applications</span>
              <p className="mt-4 font-display text-2xl leading-tight tracking-[-.03em] text-[#f1ede5]">
                {commodity.uses}
              </p>
            </div>
            <span className="text-[11px] text-[#6d665b] mt-6 block">Engineered for industrial smelters, refineries and manufacturing plants.</span>
          </div>

          <div className="border border-[#3d3830] bg-[#181715] p-7 sm:p-9 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8f877c]">Packaging & Delivery Format</span>
              <p className="mt-4 font-display text-2xl leading-tight tracking-[-.03em] text-[#f1ede5]">
                {commodity.forms}
              </p>
            </div>
            <span className="text-[11px] text-[#6d665b] mt-6 block">Secured in export-ready packaging per destination port regulations.</span>
          </div>
        </section>

        {/* Commercial Callout Box */}
        <section className="mt-14 border border-[#524b3e] bg-gradient-to-br from-[#1d1b18] to-[#141312] p-8 lg:p-10 relative overflow-hidden">
          <div className="max-w-[720px] relative z-10">
            <span className="text-[11px] font-bold uppercase tracking-[.18em] text-[#d09b30] block mb-2">
              Initiate Supply Allocation
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#fbf8f3] tracking-tight">
              Ready to discuss pricing, allocation and sample assay reports?
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[#a8a094]">
              Independent assaying, SGS certification, export permits, and freight timelines are aligned on a requirement-by-requirement basis. Submit your procurement brief directly to our Dar es Salaam trading desk.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 print:hidden">
              <button
                onClick={() => setIsRfqOpen(true)}
                className="flex items-center gap-3 bg-[#c89532] px-7 py-4 text-xs font-bold uppercase tracking-[.14em] text-[#211f1b] transition-all hover:bg-[#e2b04c] shadow-lg shadow-[#c89532]/20"
              >
                Submit Official RFQ <ArrowUpRight size={16} />
              </button>
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 border border-[#786f61] px-6 py-4 text-xs font-bold uppercase tracking-[.14em] text-[#d7d1c8] transition-colors hover:border-[#d09b30] hover:text-[#d09b30] bg-[#181715]"
              >
                Direct WhatsApp Contact <MessageCircle size={16} />
              </a>
              <a
                href={`mailto:${OFFICIAL_EMAIL}?subject=${encodeURIComponent(`${commodity.name} Supply Inquiry`)}`}
                className="flex items-center gap-2 text-xs text-[#a9a194] hover:text-[#d09b30] px-4 py-4 transition-colors"
              >
                <PhoneCall size={14} /> Email: {OFFICIAL_EMAIL}
              </a>
            </div>
          </div>
        </section>

        {/* Related Commodities Section */}
        {relatedCommodities.length > 0 && (
          <section className="mt-20 pt-12 border-t border-[#3e382f] print:hidden">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[.16em] text-[#d09b30] block mb-1">
                  Catalog Exploration
                </span>
                <h3 className="font-display text-2xl font-semibold text-[#f1ede5]">
                  Explore Complementary Commodities
                </h3>
              </div>
              <button
                onClick={handleBack}
                className="text-xs text-[#a9a194] hover:text-[#d09b30] transition-colors"
              >
                View full catalog →
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {relatedCommodities.map((item) => (
                <button
                  key={item.slug}
                  onClick={() => setLocation(`/commodities/${item.slug}`)}
                  className="group text-left border border-[#3e382f] bg-[#181715] p-6 hover:border-[#d09b30] transition-all hover:-translate-y-1"
                >
                  <span className="text-[10px] font-mono text-[#8f877c] block">{item.code} • {item.category}</span>
                  <h4 className="font-display text-lg font-semibold text-[#f1ede5] mt-2 group-hover:text-[#d09b30] transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#9d9589] mt-3 line-clamp-2 leading-relaxed">
                    {item.detail}
                  </p>
                  <div className="mt-5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#d09b30]">
                    <span>View Specifications</span>
                    <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* RFQ Modal */}
      {isRfqOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg border border-[#524b3e] bg-[#1a1816] p-6 sm:p-8 shadow-2xl text-[#f1ede5]">
            <button
              onClick={() => setIsRfqOpen(false)}
              className="absolute top-5 right-5 text-[#8f877c] hover:text-[#f1ede5] transition-colors p-1"
            >
              <X size={20} />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-widest text-[#d09b30] block mb-1">
              Formal Commercial Brief
            </span>
            <h3 className="font-display text-2xl font-semibold text-[#fbf8f3]">
              Request Quote: {commodity.name}
            </h3>
            <p className="text-xs text-[#9e968b] mt-1 mb-6">
              Fill in your requirement parameters to instantly route your enquiry to our mineral desk via WhatsApp or Email.
            </p>

            <form onSubmit={submitRfqViaWhatsApp} className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#8e8578] mb-1.5 font-medium">Company Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Apex Minerals Ltd"
                    className="w-full bg-[#24211d] border border-[#453f35] px-3.5 py-2.5 text-sm text-[#f1ede5] focus:outline-none focus:border-[#d09b30]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#8e8578] mb-1.5 font-medium">Contact Person</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full bg-[#24211d] border border-[#453f35] px-3.5 py-2.5 text-sm text-[#f1ede5] focus:outline-none focus:border-[#d09b30]"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#8e8578] mb-1.5 font-medium">Contact (Email or Phone)</label>
                  <input
                    type="text"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="buyer@company.com / WhatsApp"
                    className="w-full bg-[#24211d] border border-[#453f35] px-3.5 py-2.5 text-sm text-[#f1ede5] focus:outline-none focus:border-[#d09b30]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#8e8578] mb-1.5 font-medium">Target Quantity (MT / Kg)</label>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g. 500 MT / Month"
                    className="w-full bg-[#24211d] border border-[#453f35] px-3.5 py-2.5 text-sm text-[#f1ede5] focus:outline-none focus:border-[#d09b30]"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#8e8578] mb-1.5 font-medium">Preferred Incoterm</label>
                  <select
                    value={incoterm}
                    onChange={(e) => setIncoterm(e.target.value)}
                    className="w-full bg-[#24211d] border border-[#453f35] px-3.5 py-2.5 text-sm text-[#f1ede5] focus:outline-none focus:border-[#d09b30]"
                  >
                    <option value="CIF">CIF (Destination Port)</option>
                    <option value="FOB">FOB (Port of Dar es Salaam)</option>
                    <option value="EXW">EXW (Dar es Salaam Warehouse)</option>
                    <option value="CFR">CFR (Cost & Freight)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#8e8578] mb-1.5 font-medium">Destination Port / Country</label>
                  <input
                    type="text"
                    value={destinationPort}
                    onChange={(e) => setDestinationPort(e.target.value)}
                    placeholder="e.g. Rotterdam / Qingdao"
                    className="w-full bg-[#24211d] border border-[#453f35] px-3.5 py-2.5 text-sm text-[#f1ede5] focus:outline-none focus:border-[#d09b30]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#8e8578] mb-1.5 font-medium">Specific Quality / Assay Requirements</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Specify required purity, target delivery timeline, or laboratory preferences..."
                  className="w-full bg-[#24211d] border border-[#453f35] px-3.5 py-2.5 text-sm text-[#f1ede5] focus:outline-none focus:border-[#d09b30] resize-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsRfqOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#8f877c] hover:text-[#f1ede5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-[#c89532] px-6 py-2.5 text-xs font-bold uppercase tracking-[.14em] text-[#211f1b] font-semibold hover:bg-[#e2b04c] transition-colors"
                >
                  <Send size={14} /> Send via WhatsApp Desk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#37332d] px-5 py-6 text-xs text-[#827a6f] lg:px-8 print:hidden">
        <div className="mx-auto flex flex-col sm:flex-row max-w-[1100px] justify-between gap-4">
          <span>© {new Date().getFullYear()} Qawe Investment Company Limited. All rights reserved.</span>
          <span>{OFFICE_ADDRESS}</span>
        </div>
      </footer>
    </div>
  );
}