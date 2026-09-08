import React, { useState } from 'react';

type Broker = {
  id: string;
  name: string;
  role: string;
  verified: boolean;
  notes?: string;
};

export function VerifiedBroker() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Broker[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const search = async (q: string) => {
    if (!q) return setResults(null);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/verify-broker?q=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error('Service unavailable');
      const data = await res.json();
      setResults(data?.results ?? []);
    } catch (e: any) {
      setError(e?.message || 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl rounded border border-[#cfc8bd] bg-[#f7f5f1] p-4 text-[#221f1b]">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">Verify Broker</h3>
        <span className="text-xs text-[#6b645b]">Industry safety tool</span>
      </div>

      <p className="mt-2 text-sm text-[#514b43]">Enter an Agent ID or Broker name to check official authorization.</p>

      <div className="mt-3 flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') search(query);
          }}
          placeholder="Agent ID or name"
          className="flex-1 rounded border border-[#dcd1bf] bg-white px-3 py-2 text-sm outline-none"
        />
        <button
          onClick={() => search(query)}
          className="px-3 py-2 text-sm font-semibold text-[#fff] bg-[#c89532] rounded"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      <div className="mt-3">
        {error && <div className="text-rose-500 text-sm">{error}</div>}
        {results && results.length === 0 && <div className="text-sm text-[#6b645b]">No matches found.</div>}
        {results && results.length > 0 && (
          <ul className="mt-2 space-y-2">
            {results.map((b) => (
              <li key={b.id} className="flex items-center justify-between rounded bg-[#fff] p-2">
                <div>
                  <div className="font-semibold">{b.name}</div>
                  <div className="text-xs text-[#6b645b]">{b.role} — {b.id}</div>
                  {b.notes && <div className="text-xs text-[#6b645b]">{b.notes}</div>}
                </div>
                <div className={`ml-4 rounded px-2 py-1 text-xs font-semibold ${b.verified ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {b.verified ? 'Verified' : 'Unverified'}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default VerifiedBroker;
