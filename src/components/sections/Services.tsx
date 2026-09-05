import { services } from '@/data/company';

export function Services() {
  return (
    <section id="services" className="section-pad bg-[#e4e0d8] text-[#211f1b]">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-24">
          <div className="reveal">
            <div className="eyebrow flex items-center gap-3 text-[#8b651e]">
              <span className="h-px w-9 bg-[#c89532]" /> 03 / Services
            </div>
            <h2 className="mt-7 font-display text-[clamp(2.8rem,5vw,5rem)] font-semibold leading-[.92] tracking-[-.065em]">
              The route is<br />
              <span className="text-[#a77520]">the service.</span>
            </h2>
            <p className="mt-8 max-w-[340px] text-sm leading-7 text-[#6b645b]">
              A mineral trading relationship should make every subsequent milestone clear. Our desk holds the thread from the initial technical brief to physical port arrival.
            </p>
          </div>

          <div className="grid gap-0 border-t border-[#beb6a9]">
            {services.map((service) => (
              <div
                key={service.number}
                className="group grid gap-4 border-b border-[#beb6a9] py-8 transition-colors duration-200 hover:bg-[#ded9d0]/50 md:grid-cols-[60px_190px_1fr] md:items-start"
              >
                <span className="font-mono-custom text-[11px] font-bold text-[#a77520]">
                  {service.number}
                </span>
                <h3 className="font-display text-2xl font-semibold tracking-[-.04em] text-[#2a261f]">
                  {service.title}
                </h3>
                <div>
                  <p className="max-w-[380px] text-sm leading-6 text-[#6b645b]">
                    {service.copy}
                  </p>
                  {service.details && (
                    <p className="mt-2 font-mono-custom text-[9px] uppercase tracking-[.08em] text-[#8c8479]">
                      {service.details}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
