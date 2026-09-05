import { ArrowUpRight, MessageCircle, Phone } from 'lucide-react';
import { leadership, Leader, whatsappLink } from '@/data/company';
import { trackEvent } from '@/lib/analytics';

interface LeadershipProps {
  onOpenEnquiry: (leaderName: string) => void;
}

export function Leadership({ onOpenEnquiry }: LeadershipProps) {
  return (
    <section className="section-pad bg-[#e4e0d8] text-[#211f1b]">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-28">
          <div className="reveal">
            <div className="eyebrow flex items-center gap-3 text-[#8b651e]">
              <span className="h-px w-9 bg-[#c89532]" /> 08 / Leadership
            </div>
            <h2 className="mt-7 font-display text-[clamp(2.7rem,5vw,5.2rem)] font-semibold leading-[.9] tracking-[-.07em]">
              People at<br />
              the <span className="text-[#a77520]">desk.</span>
            </h2>
            <p className="mt-8 max-w-[280px] text-sm leading-6 text-[#6b645b]">
              A direct line into the people responsible for holding commercial agreements and operations together.
            </p>
          </div>

          <div className="grid border-t border-[#beb6a9]">
            {leadership.map((person: Leader) => (
              <div
                key={person.name}
                className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#beb6a9] py-7 gap-4 transition-colors hover:bg-[#ded8ce]/40"
              >
                <div className="flex items-center gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#b88a2a] bg-[#ebe7e0] font-mono-custom text-xs font-bold text-[#8b651e] shadow-sm">
                    {person.initials}
                  </span>
                  <div>
                    <span className="eyebrow text-[#8e867a] block">{person.role}</span>
                    <h3 className="mt-1 font-display text-2xl font-semibold tracking-[-.04em] text-[#2a261f]">
                      {person.name}
                    </h3>
                    <a
                      href={`tel:+${person.tel}`}
                      onClick={() => trackEvent('contact_clicked', { channel: 'phone', role: person.role })}
                      className="mt-1.5 flex items-center gap-2 text-xs text-[#776e62] transition-colors hover:text-[#a77520]"
                      data-testid={`link-phone-${person.initials}`}
                    >
                      <Phone size={12} /> {person.contact}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-17 sm:pl-0">
                  <a
                    href={whatsappLink(
                      person.tel,
                      `Hello ${person.name}, I would like to discuss a mineral supply requirement with Qawe Investment Company Limited.`
                    )}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent('contact_clicked', { channel: 'whatsapp', role: person.role })}
                    className="flex h-10 w-10 items-center justify-center border border-[#bdb5a9] text-[#7b5c1d] transition-all hover:border-[#a77520] hover:bg-[#d9d3c9] hover:text-[#211f1b]"
                    aria-label={`Message ${person.name} on WhatsApp`}
                    data-testid={`button-whatsapp-${person.initials}`}
                  >
                    <MessageCircle size={16} />
                  </a>
                  <button
                    onClick={() => onOpenEnquiry(`A conversation with ${person.name}`)}
                    className="flex h-10 w-10 items-center justify-center border border-[#bdb5a9] text-[#7b5c1d] transition-all hover:border-[#a77520] hover:bg-[#d9d3c9] hover:text-[#211f1b]"
                    aria-label={`Contact ${person.name}`}
                    data-testid={`button-contact-${person.initials}`}
                  >
                    <ArrowUpRight size={17} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
