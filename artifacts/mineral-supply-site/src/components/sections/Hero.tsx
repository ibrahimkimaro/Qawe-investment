import { ArrowDown, ArrowUpRight } from 'lucide-react';
import heroImage from '/generated_images/mineral-hero.jpg';

interface HeroProps {
  onOpenEnquiry: () => void;
  onScrollTo: (id: string) => void;
}

export function Hero({ onOpenEnquiry, onScrollTo }: HeroProps) {
  return (
    <section id="home" className="relative flex min-h-[760px] items-end overflow-hidden bg-[#1b1a17] text-[#f3f0e9] lg:min-h-[860px]">
      {/* Background Hero Image */}
      <img
        src={heroImage}
        alt="Aerial view of terraced mineral terrain at dawn"
        className="image-wash absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-1000 ease-out"
      />
      {/* Atmospheric Gradients */}
      <div className="hero-gradient absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(208,155,48,.22),transparent_28%)] pointer-events-none" />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 pb-20 pt-40 lg:px-8 lg:pb-28">
        <div className="max-w-[820px]">
          {/* Eyebrow with gold accent line */}
          <div className="reveal eyebrow mb-7 flex items-center gap-3 text-[#d09b30]">
            <span className="h-px w-10 bg-[#d09b30]" /> International minerals & commodities
          </div>

          {/* Main Display Headline */}
          <h1 className="reveal reveal-delay-1 font-display text-[clamp(3.6rem,9vw,8.2rem)] font-semibold leading-[.87] tracking-[-.075em]">
            Material.<br />
            <span className="text-[#d09b30] relative inline-block">
              Moved
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#d09b30] to-transparent opacity-60" />
            </span> with<br />
            clarity.
          </h1>

          {/* Lead Paragraph */}
          <p className="reveal reveal-delay-2 mt-8 max-w-[520px] text-[15px] leading-7 text-[#d1cdc5] lg:text-[17px]">
            Qawe Investment Company Limited connects customer requirements to capable sourcing, verified material and a clear route to final delivery.
          </p>

          {/* Actions */}
          <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenEnquiry}
              className="line-button flex items-center gap-3 bg-[#d09b30] px-6 py-3.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#211f1b] shadow-md transition-all duration-200 hover:bg-[#e2b04c] hover:shadow-[0_0_20px_rgba(208,155,48,0.35)]"
              data-testid="button-hero-enquiry"
            >
              Discuss your requirement <ArrowUpRight size={15} />
            </button>
            <a
              href="#commodities"
              onClick={(e) => {
                e.preventDefault();
                onScrollTo('commodities');
              }}
              className="line-button flex items-center gap-3 border border-white/35 px-6 py-3.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#f3f0e9] transition-all duration-200 hover:border-[#d09b30] hover:text-[#d09b30]"
              data-testid="link-hero-commodities"
            >
              Explore materials <ArrowDown size={14} />
            </a>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-20 grid max-w-[760px] grid-cols-2 border-t border-white/20 pt-5 sm:grid-cols-4">
          {['Source-led', 'Requirement-built', 'Documented', 'Delivery-minded'].map((item, index) => (
            <div key={item} className={`reveal reveal-delay-${index + 1} border-r border-white/15 px-4 first:pl-0 last:border-0`}>
              <span className="font-mono-custom text-[9px] text-[#c89532]">0{index + 1}</span>
              <p className="mt-2 text-[11px] uppercase tracking-[.12em] text-[#d2cec5]">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Rotating Orbital Accent */}
      <div className="hero-orbit absolute right-[6%] top-[28%] hidden h-32 w-32 rounded-full border border-[#d09b30]/45 lg:block pointer-events-none">
        <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#d09b30] shadow-[0_0_8px_#d09b30]" />
        <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full bg-[#d09b30] shadow-[0_0_8px_#d09b30]" />
      </div>

      {/* Scroll Down Hint */}
      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          onScrollTo('about');
        }}
        className="absolute bottom-7 right-8 hidden items-center gap-3 text-[9px] uppercase tracking-[.2em] text-[#c5c0b6] transition-colors hover:text-[#d09b30] lg:flex"
        data-testid="link-scroll-about"
      >
        Scroll to know us <span className="h-px w-12 bg-[#c89532]" />
      </a>
    </section>
  );
}
