import portImage from '/generated_images/port-logistics.jpg';

export function Operations() {
  return (
    <section id="operations" className="section-pad overflow-hidden bg-[#181715] text-[#f1ede5]">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-24">
          {/* Left Column: Chain Line */}
          <div className="reveal order-2 lg:order-1">
            <div className="eyebrow flex items-center gap-3 text-[#d09b30]">
              <span className="h-px w-9 bg-[#c89532]" /> 04 / Operations
            </div>
            <h2 className="mt-7 font-display text-[clamp(2.8rem,5vw,5.2rem)] font-semibold leading-[.91] tracking-[-.07em]">
              A clear line<br />
              through the <span className="text-[#d09b30]">chain.</span>
            </h2>
            <p className="mt-8 max-w-[490px] text-[15px] leading-7 text-[#b2aba0]">
              Our operating view is simple: origin, verification, paperwork, customs clearance, bonded movement and arrival should feel like connected parts of the same decision.
            </p>

            {/* Journey Milestone Visual */}
            <div className="mt-14">
              <div className="relative h-px w-full journey-line bg-white/20">
                <div className="absolute -top-1.5 left-[0%] h-3.5 w-3.5 rounded-full border-2 border-[#d09b30] bg-[#181715] shadow-[0_0_8px_rgba(208,155,48,0.4)]" />
                <div className="absolute -top-1.5 left-[31%] h-3.5 w-3.5 rounded-full border-2 border-[#d09b30] bg-[#181715]" />
                <div className="absolute -top-1.5 left-[62%] h-3.5 w-3.5 rounded-full border-2 border-[#d09b30] bg-[#181715]" />
                <div className="absolute -top-1.5 right-0 h-3.5 w-3.5 rounded-full bg-[#d09b30] shadow-[0_0_10px_#d09b30]" />
              </div>
              <div className="mt-5 grid grid-cols-4 gap-2">
                {[
                  { label: 'Origin', detail: 'Concession / Mine' },
                  { label: 'Verify', detail: 'Assay & Weights' },
                  { label: 'Move', detail: 'Customs & Freight' },
                  { label: 'Arrive', detail: 'Buyer Handover' }
                ].map((step, index) => (
                  <div key={step.label} className="text-left">
                    <span
                      className={`font-mono-custom text-[10px] font-bold uppercase tracking-[.12em] block ${index === 3 ? 'text-[#d09b30]' : 'text-[#8c857b]'
                        }`}
                    >
                      {step.label}
                    </span>
                    <span className="font-mono-custom text-[8px] uppercase tracking-[.08em] text-[#696259] hidden sm:block mt-0.5">
                      {step.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Port Logistics Image Card */}
          <div className="reveal reveal-delay-1 order-1 lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden border border-[#4b453c] bg-[#12110f] shadow-2xl group">
              <img
                src={portImage}
                alt="Stacked shipping containers and a cargo vessel at an industrial port"
                className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#181715]/85 via-transparent to-[#c89532]/10" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between border-t border-white/25 pt-4 backdrop-blur-[2px]">
                <div>
                  <span className="eyebrow text-[#d5d0c7] block">Operations / Field Note</span>
                  <span className="text-xs text-[#b8b0a5] font-display">Dar es Salaam Port Logistics & Export Corridor</span>
                </div>
                <span className="font-mono-custom text-[10px] font-bold text-[#d09b30]">04 — 04</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
