import React, { useState } from 'react';
import { ArrowUpRight, Check, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { OFFICIAL_EMAIL, PRIMARY_WHATSAPP, OFFICE_ADDRESS, whatsappLink } from '@/data/company';
import { commodities } from '@/data/commodities';
import { trackEvent } from '@/lib/analytics';

interface ContactProps {
  enquiryText: string;
  setEnquiryText: (text: string) => void;
}

export function Contact({ enquiryText, setEnquiryText }: ContactProps) {
  const [submitted, setSubmitted] = useState(false);
  const waHref = whatsappLink(PRIMARY_WHATSAPP);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const getValue = (name: string) => String(formData.get(name) ?? '').trim();
    const subject = `Mineral enquiry from ${getValue('company') || 'website visitor'}`;
    const body = [
      `Name: ${getValue('name')}`,
      `Company: ${getValue('company')}`,
      `Work email: ${getValue('email')}`,
      `Phone: ${getValue('phone') || 'Not provided'}`,
      `Material: ${getValue('commodity') || 'Not specified'}`,
      `Quantity / volume: ${getValue('quantity') || 'Not specified'}`,
      `Destination: ${getValue('destination') || 'Not specified'}`,
      `Timeline: ${getValue('timeline') || 'Not specified'}`,
      '',
      'Requirement:',
      getValue('message') || enquiryText,
    ].join('\n');

    trackEvent('rfq_submitted', { channel: 'email', material: getValue('commodity') || 'not_specified' });
    setSubmitted(true);
    window.location.href = `mailto:${OFFICIAL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="section-pad bg-[#181715] text-[#f1ede5]">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-14 lg:grid-cols-[.92fr_1.08fr] lg:gap-24">
          {/* Left Column: Contact Channels */}
          <div className="reveal">
            <div className="eyebrow flex items-center gap-3 text-[#d09b30]">
              <span className="h-px w-9 bg-[#c89532]" /> 09 / Contact
            </div>
            <h2 className="mt-7 max-w-[560px] font-display text-[clamp(3rem,6vw,6.8rem)] font-semibold leading-[.87] tracking-[-.08em]">
              Bring us<br />
              the <span className="text-[#d09b30]">brief.</span>
            </h2>
            <p className="mt-8 max-w-[450px] text-[15px] leading-7 text-[#aca49a]">
              Tell us the material, the technical specification, and where it needs to go. The first step is a clear, informed commercial conversation.
            </p>

            <div className="mt-10 flex flex-col items-start gap-4">
              <a
                href={`mailto:${OFFICIAL_EMAIL}`}
                onClick={() => trackEvent('contact_clicked', { channel: 'email', location: 'contact' })}
                className="flex items-center gap-3 text-sm text-[#d8d1c7] transition-colors hover:text-[#d09b30]"
                data-testid="link-email"
              >
                <Mail size={16} className="text-[#d09b30]" /> {OFFICIAL_EMAIL}
              </a>
              <a
                href={`tel:+${PRIMARY_WHATSAPP}`}
                onClick={() => trackEvent('contact_clicked', { channel: 'phone', location: 'contact' })}
                className="flex items-center gap-3 text-sm text-[#d8d1c7] transition-colors hover:text-[#d09b30]"
                data-testid="link-phone-main"
              >
                <Phone size={16} className="text-[#d09b30]" /> +255 750 471 188
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('contact_clicked', { channel: 'whatsapp', location: 'contact' })}
                className="flex items-center gap-3 text-sm text-[#d8d1c7] transition-colors hover:text-[#d09b30]"
                data-testid="link-whatsapp"
              >
                <MessageCircle size={16} className="text-[#d09b30]" /> Continue on WhatsApp
              </a>
              <p className="flex items-start gap-3 text-sm text-[#d8d1c7]">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#d09b30]" /> {OFFICE_ADDRESS}
              </p>
            </div>
          </div>

          {/* Right Column: RFQ Form */}
          <form
            onSubmit={handleSubmit}
            className="reveal reveal-delay-1 border border-[#4a443b] bg-[#211f1b] p-6 sm:p-8 shadow-2xl"
            aria-label="Business enquiry form"
          >
            {submitted ? (
              <div className="flex min-h-[390px] flex-col items-start justify-center">
                <span className="flex h-12 w-12 items-center justify-center bg-[#c89532] text-[#211f1b] shadow-md">
                  <Check size={22} />
                </span>
                <span className="eyebrow mt-8 text-[#d09b30]">Enquiry prepared</span>
                <h3 className="mt-4 max-w-[430px] font-display text-4xl font-semibold leading-none tracking-[-.06em]">
                  Thank you. The next step is a conversation.
                </h3>
                <p className="mt-5 max-w-[420px] text-sm leading-6 text-[#aaa196]">
                  Your default email client should now have an RFQ draft addressed to {OFFICIAL_EMAIL}. If it did not open automatically, contact the desk directly via WhatsApp or email.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-8 border-b border-[#c89532] pb-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#d09b30] transition-colors hover:text-[#e5b34f]"
                  data-testid="button-new-enquiry"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8 flex items-center justify-between border-b border-[#4a443b] pb-5">
                  <span className="eyebrow text-[#d09b30]">Requirement Form</span>
                  <span className="font-mono-custom text-[10px] text-[#82796e]">RFQ / 09</span>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="eyebrow text-[#8f877c]">Name</span>
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder="Your name"
                      className="mt-3 w-full border-b border-[#5a5145] bg-transparent py-3 text-sm text-[#f1ede5] placeholder:text-[#70685e] outline-none transition-colors focus:border-[#d09b30]"
                      data-testid="input-name"
                    />
                  </label>
                  <label className="block">
                    <span className="eyebrow text-[#8f877c]">Company</span>
                    <input
                      required
                      name="company"
                      type="text"
                      placeholder="Company name"
                      className="mt-3 w-full border-b border-[#5a5145] bg-transparent py-3 text-sm text-[#f1ede5] placeholder:text-[#70685e] outline-none transition-colors focus:border-[#d09b30]"
                      data-testid="input-company"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="eyebrow text-[#8f877c]">Work email</span>
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="name@company.com"
                      className="mt-3 w-full border-b border-[#5a5145] bg-transparent py-3 text-sm text-[#f1ede5] placeholder:text-[#70685e] outline-none transition-colors focus:border-[#d09b30]"
                      data-testid="input-email"
                    />
                  </label>
                  <label className="block">
                    <span className="eyebrow text-[#8f877c]">Phone / WhatsApp</span>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="+country code"
                      className="mt-3 w-full border-b border-[#5a5145] bg-transparent py-3 text-sm text-[#f1ede5] placeholder:text-[#70685e] outline-none transition-colors focus:border-[#d09b30]"
                      data-testid="input-phone"
                    />
                  </label>
                  <label className="block">
                    <span className="eyebrow text-[#8f877c]">Material</span>
                    <select
                      required
                      name="commodity"
                      defaultValue=""
                      className="mt-3 w-full border-b border-[#5a5145] bg-[#211f1b] py-3 text-sm text-[#f1ede5] outline-none transition-colors focus:border-[#d09b30]"
                      data-testid="select-commodity"
                    >
                      <option value="" disabled>Select a material</option>
                      {commodities.map((commodity) => (
                        <option key={commodity.name} value={commodity.name}>
                          {commodity.name}
                        </option>
                      ))}
                      <option value="Other customer-requested minerals">Other material</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="eyebrow text-[#8f877c]">Quantity / volume</span>
                    <input
                      name="quantity"
                      type="text"
                      placeholder="Estimated requirement (e.g. 500 MT)"
                      className="mt-3 w-full border-b border-[#5a5145] bg-transparent py-3 text-sm text-[#f1ede5] placeholder:text-[#70685e] outline-none transition-colors focus:border-[#d09b30]"
                      data-testid="input-quantity"
                    />
                  </label>
                  <label className="block">
                    <span className="eyebrow text-[#8f877c]">Destination</span>
                    <input
                      required
                      name="destination"
                      type="text"
                      placeholder="Country / delivery port (e.g. CIF Qingdao)"
                      className="mt-3 w-full border-b border-[#5a5145] bg-transparent py-3 text-sm text-[#f1ede5] placeholder:text-[#70685e] outline-none transition-colors focus:border-[#d09b30]"
                      data-testid="input-destination"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="eyebrow text-[#8f877c]">Timeline</span>
                    <input
                      name="timeline"
                      type="text"
                      placeholder="Required delivery timing / schedule"
                      className="mt-3 w-full border-b border-[#5a5145] bg-transparent py-3 text-sm text-[#f1ede5] placeholder:text-[#70685e] outline-none transition-colors focus:border-[#d09b30]"
                      data-testid="input-timeline"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="eyebrow text-[#8f877c]">What are you sourcing?</span>
                    <textarea
                      required
                      name="message"
                      value={enquiryText}
                      onChange={(event) => setEnquiryText(event.target.value)}
                      rows={4}
                      placeholder="Material, grade specification, target port, verification expectations..."
                      className="mt-3 w-full resize-none border-b border-[#5a5145] bg-transparent py-3 text-sm leading-6 text-[#f1ede5] placeholder:text-[#70685e] outline-none transition-colors focus:border-[#d09b30]"
                      data-testid="textarea-requirement"
                    />
                  </label>
                </div>

                <div className="mt-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                  <p className="max-w-[280px] text-[11px] leading-5 text-[#81796f]">
                    Submitting prepares an official RFQ transmitted to {OFFICIAL_EMAIL}.
                  </p>
                  <button
                    type="submit"
                    className="line-button flex items-center justify-center gap-3 bg-[#c89532] px-6 py-3.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#211f1b] transition-all hover:bg-[#e2b04c] hover:shadow-[0_0_15px_rgba(200,149,50,0.4)]"
                    data-testid="button-submit-enquiry"
                  >
                    Send enquiry <ArrowUpRight size={15} />
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
