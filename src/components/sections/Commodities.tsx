import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Commodity, commodities } from '@/data/commodities';
import { trackEvent } from '@/lib/analytics';

interface CommoditiesProps {
  onSelectCommodity: (commodity: Commodity) => void;
  onOpenEnquiry: (customMaterial?: string) => void;
}

export function Commodities({ onSelectCommodity, onOpenEnquiry }: CommoditiesProps) {
  const handleCommodityClick = (commodity: Commodity) => {
    onSelectCommodity(commodity);
    // trackEvent('commodity_viewed', { commodity: commodity.name, category: commodity.category });
  };

  return (
    <section id="commodities" className="section-pad bg-[#211f1b] text-[#f1ede5]">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="reveal">
            <div className="eyebrow flex items-center gap-3 text-[#d09b30]">
              <span className="h-px w-9 bg-[#c89532]" /> 02 / Commodities
            </div>
            <h2 className="mt-7 max-w-[680px] font-display text-[clamp(2.8rem,5vw,5.7rem)] font-semibold leading-[.9] tracking-[-.07em]">
              The material<br />
              <span className="text-[#d09b30]">in focus.</span>
            </h2>
          </div>
          <p className="reveal max-w-[340px] text-sm leading-6 text-[#aaa39a]">
            Industrial minerals and precious metals for serious commercial enquiries. Select a material to inspect technical parameters, verification methods, and supply lots.
          </p>
        </div>

        {/* Commodity Cards Grid */}
        <div className="mt-14 grid gap-px bg-[#5a5145]/45 md:grid-cols-2 lg:grid-cols-4">
          {commodities.map((commodity, index) => (
            <button
              key={commodity.name}
              onClick={() => handleCommodityClick(commodity)}
              className="commodity-card group relative min-h-[220px] border border-[#5a5145]/45 bg-[#211f1b] p-6 text-left transition-all duration-300 hover:bg-[#282622] hover:border-[#c89532]/70 focus:outline-none focus:ring-1 focus:ring-[#d09b30]"
              data-testid={`button-commodity-${commodity.slug}`}
            >
              <div className="flex items-start justify-between">
                <span className="font-mono-custom text-[11px] font-bold text-[#c89532]">
                  {commodity.code}
                </span>
                <ArrowUpRight
                  className="commodity-arrow text-[#837b6e] transition-transform duration-300 group-hover:text-[#d09b30] group-hover:-translate-y-1 group-hover:translate-x-1"
                  size={19}
                  strokeWidth={1.3}
                />
              </div>

              <div className="mt-10">
                <span className="font-mono-custom text-[9px] uppercase tracking-[.14em] text-[#82796e]">
                  {commodity.category}
                </span>
                <h3 className="mt-1 font-display text-[21px] font-semibold tracking-[-.03em] text-[#f1ede5] group-hover:text-[#d09b30] transition-colors">
                  {commodity.name}
                </h3>
                <p className="mt-2 text-xs leading-5 text-[#9c958b]">
                  {commodity.detail}
                </p>
                {/* {commodity.stockType && (
                  <span className="mt-3 inline-block font-mono-custom text-[8px] uppercase tracking-[.1em] text-[#d09b30]/80">
                    {commodity.stockType}
                  </span>
                )} */}
              </div>

              {/* Accent indicator on last item */}
              {index === commodities.length - 1 && (
                <span className="absolute bottom-5 right-5 h-1.5 w-1.5 rounded-full bg-[#d09b30]" />
              )}
            </button>
          ))}
        </div>

        {/* Extended Sourcing Footer */}
        <div className="mt-6 flex flex-col justify-between gap-4 border-t border-[#5a5145]/60 pt-6 md:flex-row md:items-center">
          <p className="text-xs text-[#8f887e]">
            Also handling specialized mineral briefs, custom assays, and volume off-takes.
          </p>
          <button
            onClick={() => onOpenEnquiry('Other customer-requested minerals')}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#d09b30] transition-colors hover:text-[#f1ede5]"
            data-testid="button-other-minerals"
          >
            Ask about a specific material <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
