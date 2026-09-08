import React, { createContext, useContext, useEffect, useState } from 'react';

type LocaleState = {
  locale: string;
  setLocale: (l: string) => void;
  currency: string;
  setCurrency: (c: string) => void;
};

const STORAGE_LOCALE = 'qawe_locale';
const STORAGE_CURRENCY = 'qawe_currency';

const defaultLocale = typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : 'en';

const LocaleContext = createContext<LocaleState>({
  locale: 'en',
  setLocale: () => {},
  currency: 'USD',
  setCurrency: () => {},
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LOCALE);
      return saved || defaultLocale || 'en';
    } catch (e) {
      return defaultLocale || 'en';
    }
  });

  const [currency, setCurrencyState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CURRENCY);
      return saved || 'USD';
    } catch (e) {
      return 'USD';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_LOCALE, locale);
    } catch (e) {}
  }, [locale]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CURRENCY, currency);
    } catch (e) {}
  }, [currency]);

  const setLocale = (l: string) => setLocaleState(l);
  const setCurrency = (c: string) => setCurrencyState(c);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, currency, setCurrency }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
