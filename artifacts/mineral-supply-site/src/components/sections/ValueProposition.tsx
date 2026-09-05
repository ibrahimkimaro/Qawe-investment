import { Check, ShieldCheck, ArrowUpRight } from 'lucide-react';
import materialImage from '/generated_images/material-detail.jpg';
interface ValuePropositionProps {
  onOpenEnquiry: () => void;
}

export function ValueProposition({ onOpenEnquiry }: ValuePropositionProps) {
  return (
    <section className="section-pad bg-[#efede7] text-[#211f1b]">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div className="reveal">
            <div className="eyebrow flex items-center gap-3 text-[#8b651e]">
              <span className="h-px w-9 bg-[#c89532]" /> 05 / The difference
            </div>
            <h2 className="mt-7 max-w-[800px] font-display text-[clamp(2.7rem,6vw,6.2rem)] font-semibold leading-[.88] tracking-[-.075em] text-[#25221d]">
              Serious buyers<br />
              need <span className="text-[#a77520]">signal,</span><br />
              not noise.
            </h2>
          </div>

          <div className="reveal reveal-delay-1">
            <p className="text-[17px] leading-8 text-[#514b43]">
              We believe credibility lives in the handoffs: a clear technical brief, a verified material batch, transparent assays, compliant export permits, and no unnecessary theatre.
            </p>
            <div className="mt-9 grid gap-3 border-t border-[#cfc8bd] pt-6">
              {[
                'A requirement-led starting point built to buyer specifications',
                'One integrated view across physical stock, assaying and shipping',
                'Transparent commercial terms with verifiable physical inspection proof'
              ].map((point) => (
                <div key={point} className="flex items-center gap-3 text-sm text-[#625d55]">
                  <Check size={16} className="text-[#a77520] shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2-Card Feature Showcase */}
        <div className="mt-20 grid gap-5 md:grid-cols-[1.25fr_.75fr]">
          <div className="group relative min-h-[360px] overflow-hidden bg-[#2b2925] border border-[#c9bea8]">
            <img
              src={materialImage}
              alt="Raw mineral specimens and refined copper sheets on a workbench"
              className="h-full w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#211f1b]/85 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="eyebrow text-[#d09b30] block">Material study / 01</span>
              <p className="mt-2 font-display text-2xl font-semibold text-[#f1ede5]">
                The physical detail matters.
              </p>
              <p className="mt-1 text-xs text-[#c5c0b7] max-w-[420px]">
                Grain structure, grade assaying, moisture levels, and packaging security inspected before dispatch.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between bg-[#d9d3c9] p-8 sm:p-9 border border-[#beb5a6]">
            <div>
              <ShieldCheck size={32} strokeWidth={1.2} className="text-[#a77520]" />
              <div className="mt-8">
                <span className="eyebrow text-[#8b651e] block">Why work with us</span>
                <p className="mt-3 font-display text-2xl font-semibold leading-tight tracking-[-.04em] text-[#2e2a23]">
                  A trading partner that respects the industrial procurement process.
                </p>
                <p className="mt-3 text-xs leading-5 text-[#6b645b]">
                  Direct access to company directors and desk specialists without middlemen layers.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenEnquiry}
              className="mt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#785919] transition-colors hover:text-[#211f1b]"
              data-testid="button-why-us"
            >
              Start with a brief <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
