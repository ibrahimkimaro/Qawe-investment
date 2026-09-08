import { useEffect, useMemo, useState } from 'react';

type TickerItem = {
  id: string;
  label: string;
  price: number;
  change: number; // percent
  currency: string;
};

function formatPrice(value: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
}

// Read Vite env vars: VITE_COMMODITY_API_URL and VITE_COMMODITY_API_KEY
const API_URL = import.meta.env.VITE_COMMODITY_API_URL as string | undefined;
const API_KEY = import.meta.env.VITE_COMMODITY_API_KEY as string | undefined;

export function CommodityTicker() {
  const initial: TickerItem[] = useMemo(
    () => [
      { id: 'gold', label: 'LBMA Gold', price: 1960.5, change: 0.12, currency: 'USD' },
      { id: 'copper', label: 'LME Copper', price: 8725.0, change: -0.34, currency: 'USD' },
    ],
    []
  );

  const [items, setItems] = useState<TickerItem[]>(initial);

  // If an API URL is provided, fetch real prices periodically.
  useEffect(() => {
    let mounted = true;

    async function fetchPrices() {
      if (!API_URL) return;
      try {
        const res = await fetch(API_URL, {
          headers: API_KEY ? { Authorization: `Bearer ${API_KEY}` } : undefined,
        });
        if (!res.ok) throw new Error('Fetch error');
        const data = await res.json();
        // Expecting data to be an array of { id, label, price, currency }
        if (!mounted) return;
        if (Array.isArray(data) && data.length > 0) {
          setItems(
            data.map((d: any) => ({ id: d.id, label: d.label || d.id, price: +d.price, change: +(d.change ?? 0), currency: d.currency ?? 'USD' }))
          );
        }
      } catch (e) {
        // On error, keep using the mock values and silently fail
      }
    }

    // initial fetch + interval
    fetchPrices();
    const interval = setInterval(() => fetchPrices(), 30000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  // Mock drift continues if API isn't available; keep items moving for liveliness
  useEffect(() => {
    if (API_URL) return; // if using real API, skip mock drift
    const interval = setInterval(() => {
      setItems((prev) =>
        prev.map((it) => {
          const drift = (Math.random() - 0.5) * 0.005; // small random drift
          const newPrice = +(it.price * (1 + drift)).toFixed(2);
          const pct = +(((newPrice - it.price) / it.price) * 100).toFixed(2);
          return { ...it, price: newPrice, change: pct };
        })
      );
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden md:flex items-center gap-6 overflow-hidden border-b border-white/5 bg-[#0f0f0f]/80 text-[#e9e6df] text-[13px]">
      <div className="mx-auto flex max-w-[1280px] items-center px-5 lg:px-8">
        <div className="eyebrow mr-4 text-[#c9b07a] text-[11px] font-semibold uppercase tracking-[.12em]">Live benchmarks</div>
        <div className="flex flex-1 items-center gap-6 overflow-hidden">
          <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
            {items.map((it) => (
              <div key={it.id} className="flex items-baseline gap-3">
                <span className="font-mono-custom text-xs uppercase text-[#bfb8aa]">{it.label}</span>
                <span className="font-semibold text-sm">{formatPrice(it.price, it.currency)}</span>
                <span className={`text-xs ${it.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{it.change >= 0 ? `+${it.change}%` : `${it.change}%`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          gap: 4rem;
          animation: marquee 22s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default CommodityTicker;
