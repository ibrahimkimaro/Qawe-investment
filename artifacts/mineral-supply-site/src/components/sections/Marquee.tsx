export function Marquee() {
  const items = ['COPPER', 'COBALT', 'TANTALITE', 'COLTAN', 'GOLD', 'SULFUR', 'CUSTOM REQUIREMENTS'];

  return (
    <section className="overflow-hidden bg-[#c89532] py-4 text-[#211f1b] select-none shadow-inner" aria-label="Company mineral focus">
      <div className="marquee-track flex min-w-max items-center gap-0">
        {[...Array(4)].flatMap((_, repeat) =>
          items.map((item, index) => (
            <div key={`${repeat}-${item}-${index}`} className="flex items-center">
              <span className="px-8 font-mono-custom text-[10px] font-bold uppercase tracking-[.22em]">
                {item}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#211f1b]/60" />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
