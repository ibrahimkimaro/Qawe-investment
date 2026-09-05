import { FileText } from 'lucide-react';
import { OFFICIAL_EMAIL, PRIMARY_WHATSAPP, whatsappLink } from '@/data/company';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onDownloadBrief: () => void;
}

export function Footer({ onScrollTo, onDownloadBrief }: FooterProps) {
  const waHref = whatsappLink(PRIMARY_WHATSAPP);

  return (
    <footer className="border-t border-[#37332d] bg-[#181715] px-5 pb-12 pt-10 text-[#f1ede5] lg:px-8">
      <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onScrollTo('home');
            }}
            className="flex items-center gap-3 transition-opacity hover:opacity-90"
            data-testid="link-footer-logo"
          >
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden border border-[#c89532] bg-[#141311]">
              <img
                src="/media/qawe-brand-logo.jpeg"
                alt="Qawe"
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              <span className="font-display text-sm font-bold text-[#d09b30]">Q</span>
            </div>
            <span className="font-display text-sm font-bold uppercase tracking-[.16em]">
              Qawe Investment Company Limited
            </span>
          </a>
          <p className="mt-4 max-w-[420px] text-xs leading-5 text-[#827a6f]">
            Sourcing-led. Operationally grounded. Clear about the route from African origin to international port delivery.
          </p>
          <p className="mt-2 font-mono-custom text-[10px] uppercase tracking-[.12em] text-[#a77520]">
            Dar es Salaam, Tanzania • Global Mineral Supply Desk
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] font-semibold uppercase tracking-[.13em] text-[#aaa197]">
          <a
            href="/media/qawe-company-profile.pdf"
            download="Qawe-Company-Profile.pdf"
            onClick={onDownloadBrief}
            className="flex items-center gap-2 text-[#d09b30] transition-colors hover:text-[#f3f0e9]"
            data-testid="button-footer-download"
          >
            <FileText size={13} /> Company profile PDF
          </a>
          <a
            href={`mailto:${OFFICIAL_EMAIL}`}
            className="transition-colors hover:text-[#d09b30]"
            data-testid="link-footer-email"
          >
            Email Desk
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-[#d09b30]"
            data-testid="link-footer-whatsapp"
          >
            WhatsApp
          </a>
          <a
            href="#media"
            onClick={(e) => {
              e.preventDefault();
              onScrollTo('media');
            }}
            className="transition-colors hover:text-[#d09b30]"
          >
            Physical Stock Verification
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-[1280px] flex-col justify-between gap-3 border-t border-[#37332d] pt-6 sm:flex-row font-mono-custom text-[9px] uppercase tracking-[.13em] text-[#6f685e]">
        <span>© {new Date().getFullYear()} Qawe Investment Company Limited. All rights reserved.</span>
        <span>Material / moved with clarity • Ununio, Dar es Salaam</span>
      </div>
    </footer>
  );
}
