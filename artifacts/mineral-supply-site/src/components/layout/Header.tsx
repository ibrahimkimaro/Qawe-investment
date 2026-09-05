import { useState } from 'react';
import { ArrowUpRight, Menu, MessageCircle, X } from 'lucide-react';
import { PRIMARY_WHATSAPP, whatsappLink } from '@/data/company';

interface HeaderProps {
  onOpenEnquiry: (commodity?: string) => void;
  onScrollTo: (id: string) => void;
}

const navItems = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Commodities', 'commodities'],
  ['Services', 'services'],
  ['Operations', 'operations'],
  ['Responsibility', 'responsibility'],
  ['Media & Proof', 'media'],
  ['Contact', 'contact'],
];

export function Header({ onOpenEnquiry, onScrollTo }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const waHref = whatsappLink(PRIMARY_WHATSAPP);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    onScrollTo(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#1b1a17]/90 text-[#f3f0e9] backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-[74px] max-w-[1280px] items-center justify-between px-5 lg:px-8">
        {/* Brand Identity */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
          data-testid="link-logo"
        >

          <div
            className="relative p-[2px] overflow-hidden rounded-2xl flex items-center justify-center h-14 w-auto hover:scale-105 transition-all duration-300"
          >
            {/* Keyframe ya animation iliyowekwa inline */}
            <style>{`
    @keyframes spinBorder {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `}</style>

            {/* Tabaka la Mpaka Unaotembea Nyeupe */}
            <span
              className="absolute -z-10"
              style={{
                background: 'conic-gradient(from 0deg, transparent 20%, #ffffff 50%, transparent 80%)',
                animation: 'spinBorder 3s linear infinite',
                width: '250%',
                height: '250%',
              }}
            />

            {/* Picha ya Nembo Pamoja na Logic ya Error handling */}
            <img
              src="/media/qawe-brand-logo.jpeg"
              alt="Qawe crest"
              className="h-12 w-auto object-cover rounded-2xl"
              style={{ background: '#000000' }} /* Badilisha #000000 kulingana na rangi ya background ya tovuti yako */
              onError={(e) => {
                // Fallback to stylized Q if image loads slowly
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          <div className="leading-none">
            <span className="block font-display text-[13px] font-bold uppercase tracking-[.16em] text-[#f3f0e9]">
              Qawe
            </span>
            <span className="mt-1 block font-mono-custom text-[8px] uppercase tracking-[.2em] text-[#c5c0b6]">
              Investment Company
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
          {navItems.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(id);
              }}
              className="nav-link relative text-[10px] font-semibold uppercase tracking-[.13em] text-[#d2cec5] transition-colors hover:text-[#d09b30]"
              data-testid={`link-nav-${id}`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.13em] text-[#d09b30] transition-colors hover:text-[#e5b34f]"
            data-testid="link-header-whatsapp"
          >
            <MessageCircle size={14} strokeWidth={1.5} /> WhatsApp
          </a>
          <button
            onClick={() => onOpenEnquiry()}
            className="line-button flex items-center gap-2 border border-[#c89532] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[.13em] text-[#f5f0e6] transition-all duration-200 hover:bg-[#c89532] hover:text-[#211f1b]"
            data-testid="button-header-contact"
          >
            Start a conversation <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center border border-white/20 text-[#f3f0e9] transition-colors hover:border-[#c89532] hover:text-[#c89532] lg:hidden"
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          data-testid="button-mobile-menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <nav
          className="animate-in fade-in slide-in-from-top-2 border-t border-white/10 bg-[#1b1a17] px-5 py-5 duration-200 lg:hidden"
          aria-label="Mobile navigation"
        >
          {navItems.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(id);
              }}
              className="block border-b border-white/10 py-3 text-[11px] font-semibold uppercase tracking-[.16em] text-[#d2cec5] transition-colors hover:text-[#d09b30]"
              data-testid={`link-mobile-nav-${id}`}
            >
              {label}
            </a>
          ))}
          <div className="mt-5 space-y-3">
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenEnquiry();
              }}
              className="flex w-full items-center justify-center gap-2 bg-[#c89532] px-4 py-3 text-[10px] font-bold uppercase tracking-[.13em] text-[#211f1b] transition-colors hover:bg-[#e2b04c]"
              data-testid="button-mobile-contact"
            >
              Start a conversation <ArrowUpRight size={14} />
            </button>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 border border-[#c89532]/60 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[.13em] text-[#d09b30]"
            >
              <MessageCircle size={14} /> Continue on WhatsApp
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
