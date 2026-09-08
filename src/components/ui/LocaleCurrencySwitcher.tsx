import React from 'react';
import { useLocale } from '@/lib/locale';

export function LocaleCurrencySwitcher() {
  const { locale, setLocale, currency, setCurrency } = useLocale();

  return (
    <div className="flex items-center gap-3">
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
        className="hidden md:block rounded border border-[#4b453f] bg-transparent px-2 py-1 text-sm text-[#e8e4db] outline-none"
        aria-label="Select language"
      >
        <option value="en">English</option>
        <option value="sw">Kiswahili</option>
        <option value="zh">中文</option>
        <option value="ar">العربية</option>
      </select>

      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="rounded border border-[#4b453f] bg-transparent px-2 py-1 text-sm text-[#e8e4db] outline-none"
        aria-label="Select currency"
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="AED">AED</option>
      </select>
    </div>
  );
}

export default LocaleCurrencySwitcher;
