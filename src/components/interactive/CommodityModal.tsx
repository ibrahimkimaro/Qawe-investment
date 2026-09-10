import { useEffect } from 'react';
import { ArrowRight, ArrowUpRight, Check, X } from 'lucide-react';
import { Commodity } from '@/data/commodities';
import { useLocation } from 'wouter';
import { trackEvent } from '@/lib/analytics';

interface CommodityModalProps {
  commodity: Commodity | null;
  onClose: () => void;
  onOpenEnquiry: (commodityName: string) => void;
}

export function CommodityModal({ commodity, onClose, onOpenEnquiry }: CommodityModalProps) {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (commodity) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [commodity, onClose]);

  if (!commodity) return null;

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-[#0d0c0b]/85 px-4 py-6 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="commodity-dialog-title"
    >
      <div className="relative max-h-[90vh] w-full max-w-[700px] overflow-auto border border-[#5a5145] bg-[#1e1c18] p-6 text-[#f1ede5] shadow-2xl sm:p-9">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center border border-[#5a5145] text-[#bab2a7] transition-colors hover:border-[#d09b30] hover:text-[#d09b30]"
          aria-label="Close commodity details"
          data-testid="button-close-commodity"
        >
          <X size={18} />
        </button>

        <span className="eyebrow text-[#d09b30] block">
          {commodity.category} / {commodity.code}
        </span>
        <h2
          id="commodity-dialog-title"
          className="mt-4 max-w-[540px] font-display text-4xl font-semibold leading-[.93] tracking-[-.06em] text-[#f1ede5]"
        >
          {commodity.name}
        </h2>

        <p className="mt-6 max-w-[600px] text-[15px] leading-7 text-[#c1b9ae]">
          {commodity.description}
        </p>

        {/* Technical Specs List */}
        {commodity.specs && commodity.specs.length > 0 && (
          <div className="mt-6 border-t border-[#3d372e] pt-5">
            <span className="eyebrow text-[#8f877c] block mb-3">Specification Standards</span>
            <div className="grid gap-2 sm:grid-cols-2">
              {commodity.specs.map((spec) => (
                <div key={spec} className="flex items-center gap-2 text-xs text-[#d6cfc4]">
                  <Check size={14} className="text-[#c89532] shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Use & Format */}
        <div className="mt-7 grid gap-5 border-y border-[#4a443b] py-6 sm:grid-cols-2">
          <div>
            <span className="eyebrow text-[#8f877c]">Typical use</span>
            <p className="mt-2 text-sm leading-6 text-[#ddd6cc]">{commodity.uses}</p>
          </div>
          <div>
            <span className="eyebrow text-[#8f877c]">Conversation format</span>
            <p className="mt-2 text-sm leading-6 text-[#ddd6cc]">{commodity.forms}</p>
          </div>
        </div>

        <p className="mt-5 text-xs leading-5 text-[#8d857a]">
          Technical assays, independent inspection, export documentation, and freight schedules are confirmed against your individual brief.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              const name = commodity.name;
              onClose();
              onOpenEnquiry(name);
            }}
            className="line-button flex items-center gap-3 bg-[#c89532] px-6 py-3.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#211f1b] transition-all hover:bg-[#e2b04c]"
            data-testid="button-commodity-enquiry"
          >
            Request an RFQ <ArrowUpRight size={15} />
          </button>
          <button
            onClick={() => {
              trackEvent('commodity_detail_opened', { commodity: commodity.name });
              onClose();
              setLocation(`/commodities/${commodity.slug}`);
            }}
            className="flex items-center gap-2 border border-[#786f61] px-5 py-3.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#d7d1c8] transition-colors hover:border-[#d09b30] hover:text-[#d09b30] cursor-pointer"
            data-testid="link-commodity-detail"
          >
            Open full specification <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
