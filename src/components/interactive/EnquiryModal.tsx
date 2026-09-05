import React, { useEffect } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { PRIMARY_WHATSAPP, whatsappLink } from '@/data/company';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  enquiryText: string;
  setEnquiryText: (text: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function EnquiryModal({
  isOpen,
  onClose,
  enquiryText,
  setEnquiryText,
  onSubmit,
}: EnquiryModalProps) {
  const waHref = whatsappLink(PRIMARY_WHATSAPP);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-[#0d0c0b]/85 px-4 py-6 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-title"
    >
      <div className="relative max-h-[90vh] w-full max-w-[640px] overflow-auto border border-[#5a5145] bg-[#1e1c18] p-6 text-[#f1ede5] shadow-2xl sm:p-9">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center border border-[#5a5145] text-[#bab2a7] transition-colors hover:border-[#d09b30] hover:text-[#d09b30]"
          aria-label="Close enquiry dialog"
          data-testid="button-close-enquiry"
        >
          <X size={18} />
        </button>

        <span className="eyebrow text-[#d09b30] block">Direct conversation</span>
        <h2
          id="enquiry-title"
          className="mt-4 max-w-[480px] font-display text-4xl font-semibold leading-[.93] tracking-[-.06em]"
        >
          Tell us what needs to move.
        </h2>

        <form
          onSubmit={(e) => {
            onSubmit(e);
            onClose();
          }}
          className="mt-8 grid gap-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="eyebrow text-[#8f877c]">Name</span>
              <input
                required
                name="name"
                type="text"
                placeholder="Your name"
                className="mt-2.5 w-full border-b border-[#5a5145] bg-transparent py-2.5 text-sm text-[#f1ede5] placeholder:text-[#6f675c] outline-none transition-colors focus:border-[#d09b30]"
                data-testid="modal-input-name"
              />
            </label>
            <label className="block">
              <span className="eyebrow text-[#8f877c]">Company</span>
              <input
                required
                name="company"
                type="text"
                placeholder="Company name"
                className="mt-2.5 w-full border-b border-[#5a5145] bg-transparent py-2.5 text-sm text-[#f1ede5] placeholder:text-[#6f675c] outline-none transition-colors focus:border-[#d09b30]"
                data-testid="modal-input-company"
              />
            </label>
          </div>

          <label className="block">
            <span className="eyebrow text-[#8f877c]">Work email</span>
            <input
              required
              name="email"
              type="email"
              placeholder="name@company.com"
              className="mt-2.5 w-full border-b border-[#5a5145] bg-transparent py-2.5 text-sm text-[#f1ede5] placeholder:text-[#6f675c] outline-none transition-colors focus:border-[#d09b30]"
              data-testid="modal-input-email"
            />
          </label>

          <label className="block">
            <span className="eyebrow text-[#8f877c]">Requirement brief</span>
            <textarea
              required
              name="message"
              value={enquiryText}
              onChange={(e) => setEnquiryText(e.target.value)}
              rows={4}
              placeholder="Material, grade specification, quantity, target port, delivery timing..."
              className="mt-2.5 w-full resize-none border-b border-[#5a5145] bg-transparent py-2.5 text-sm leading-6 text-[#f1ede5] placeholder:text-[#6f675c] outline-none transition-colors focus:border-[#d09b30]"
              data-testid="modal-textarea-requirement"
            />
          </label>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-3">
            <span className="text-[11px] leading-5 text-[#81796f]">
              Or discuss immediately on{' '}
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="text-[#d09b30] underline underline-offset-4 hover:text-[#e5b34f]"
                data-testid="link-modal-whatsapp"
              >
                WhatsApp Desk
              </a>
              .
            </span>
            <button
              type="submit"
              className="line-button flex items-center gap-3 bg-[#c89532] px-6 py-3.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#211f1b] transition-all hover:bg-[#e2b04c]"
              data-testid="button-modal-submit"
            >
              Send enquiry <ArrowUpRight size={15} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
