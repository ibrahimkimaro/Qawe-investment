export function Responsibility() {
  const points = [
    {
      code: '01',
      title: 'Clear documentation',
      desc: 'Government royalty certificates, mineral export permits, certificate of origin, and inspections company aligned with international trade law.'
    },
    {
      code: '02',
      title: 'Quality verification',
      desc: 'Independent chemical assays and certified laboratory weight certificates confirming exact grades prior to international dispatch.'
    },
    {
      code: '03',
      title: 'Practical communication',
      desc: 'Direct, honest status updates. Qualified buyers receive timestamped video confirmation of physical lots and sealed containers.'
    },
    {
      code: '04',
      title: 'Considered movement',
      desc: 'Secured bonded transport along primary East African transit corridors directly to Dar es Salaam port container terminals.'
    }
  ];

  return (
    <section id="responsibility" className="section-pad bg-[#c89532] text-[#211f1b]">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-28">
          <div className="reveal">
            <div className="eyebrow flex items-center gap-3 text-[#5f4617]">
              <span className="h-px w-9 bg-[#5f4617]" /> 06 / Responsibility
            </div>
            <h2 className="mt-7 font-display text-[clamp(2.8rem,5vw,5.2rem)] font-semibold leading-[.9] tracking-[-.07em]">
              Keep the<br />
              chain <span className="text-[#f1ede5]">legible.</span>
            </h2>
          </div>

          <div className="reveal reveal-delay-1">
            <p className="max-w-[560px] text-[17px] leading-8 text-[#3d2c11]">
              Responsibility begins with being clear about what is known, what is being verified, and what happens next. We keep documentation, chain-of-custody, and physical movement visible in every conversation, because trust is built in the details.
            </p>

            <div className="mt-10 grid gap-6 border-t border-[#765816]/40 pt-8 sm:grid-cols-2">
              {points.map((item) => (
                <div key={item.code} className="border-b border-[#765816]/30 pb-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono-custom text-[11px] font-bold text-[#765816]">
                      {item.code}
                    </span>
                    <h3 className="font-display text-lg font-bold tracking-tight text-[#211f1b]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-[#443417]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
