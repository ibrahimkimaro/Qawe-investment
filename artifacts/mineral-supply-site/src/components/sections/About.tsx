import { ArrowUpRight } from 'lucide-react';
import { companyStats } from '@/data/company';

interface AboutProps {
  onOpenEnquiry: () => void;
}

export function About({ onOpenEnquiry }: AboutProps) {
  return (
    <section id="about" className="section-pad grid-lines bg-[#efede7] text-[#211f1b]">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-24">
          {/* Left Column: Brand Emblem & Principles */}
          <div className="reveal">
            <div className="eyebrow flex items-center gap-3 text-[#8b651e]">
              <span className="h-px w-9 bg-[#c89532]" /> 01 / About
            </div>
            <p className="mt-8 max-w-[280px] font-display text-3xl font-semibold leading-[1.05] tracking-[-.04em] text-[#28241e]">
              The trade desk behind the material.
            </p>

            {/* Official Brand Logo */}
            <div className="relative mt-10 max-w-[280px] p-[2px] overflow-hidden bg-[#141311] shadow-[0_20px_50px_rgba(41,37,31,.15)] transition-transform duration-300 hover:scale-[1.02]">
              {/* Keyframe ya animation iliyowekwa inline */}
              <style>{`
    @keyframes spinBorder {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `}</style>

              {/* Tabaka la Mpaka Unaotembea Nyeupe (Z-index imebadilishwa kuwa 0) */}
              <span
                className="absolute inset-[-100%] z-0"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 20%, #ffffff 50%, transparent 80%)',
                  animation: 'spinBorder 3.5s linear infinite',
                }}
              />

              {/* Mwili wa Ndani wa Kadi (Z-index: 10 inaleta picha juu ya ule mwanga) */}
              <div className="relative z-10 w-full h-full bg-[#141311] p-3">
                <img
                  src="/media/qawe-brand-logo.jpeg"
                  alt="Qawe Investment Company Limited crest"
                  className="w-full object-cover"
                />
                <div className="mt-2 text-center">
                  <span className="font-mono-custom text-[8px] uppercase tracking-[.2em] text-[#c89532]">
                    Strength • Vision • Legacy
                  </span>
                </div>
              </div>
            </div>


            <div className="mt-12 hidden lg:block">
              <span className="font-mono-custom text-[9px] uppercase tracking-[.14em] text-[#8f897f]">
                A working principle
              </span>
              <p className="mt-3 max-w-[230px] text-sm leading-6 text-[#625d55]">
                Make the route visible. Keep the requirement in view. Deliver the next clear step with physical verification.
              </p>
            </div>
          </div>

          {/* Right Column: Narrative & Stats */}
          <div className="reveal reveal-delay-1">
            <h2 className="font-display text-[clamp(2.5rem,5vw,5.1rem)] font-semibold leading-[.96] tracking-[-.065em] text-[#29251f]">
              From material origin<br />to the final handover.
            </h2>

            <div className="mt-10 grid gap-8 border-t border-[#cfc8bd] pt-8 md:grid-cols-[1.2fr_.8fr]">
              <p className="text-[16px] leading-8 text-[#554f47]">
                Qawe Investment Company Limited is built around a straightforward proposition: source and supply to customer requirements, then stay close to the physical details that make delivery dependable.
              </p>
              <p className="text-sm leading-6 text-[#777066]">
                Quality verification, documentation, logistics, export, shipping and final delivery are not separate promises. They are one considered, auditable path.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="mt-10 grid grid-cols-2 gap-y-6 sm:grid-cols-4 border-y border-[#cfc8bd] py-6">
              {companyStats.map((stat) => (
                <div key={stat.label} className="border-r border-[#cfc8bd] px-4 first:pl-0 last:border-0">
                  <p className="font-display text-3xl font-semibold tracking-[-.06em] text-[#a77520]">
                    {stat.value}
                  </p>
                  <p className="mt-2 max-w-[120px] text-[10px] uppercase leading-4 tracking-[.1em] text-[#777066]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={onOpenEnquiry}
              className="mt-10 inline-flex items-center gap-3 border-b border-[#8b651e] pb-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#705115] transition-colors hover:text-[#c89532]"
              data-testid="button-about-conversation"
            >
              Talk through a requirement <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
