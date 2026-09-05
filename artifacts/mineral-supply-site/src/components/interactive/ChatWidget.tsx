import React, { useState } from 'react';
import { Bot, Send, X, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PRIMARY_WHATSAPP, whatsappLink } from '@/data/company';

interface ChatMessage {
  role: 'assistant' | 'user';
  text: string;
}

interface ChatWidgetProps {
  onOpenEnquiry: (commodity?: string) => void;
}

const FAQ_PROMPTS = [
  'What commodities do you supply?',
  'Copper Cathode 800 MT Lot info',
  'How does physical verification work?',
  'Gold Sourcing & 214 KGs Lot',
  'What Incoterms do you use (FOB/CIF)?',
  'Where is your Dar es Salaam office?',
  'Start an RFQ Enquiry'
];

export function ChatWidget({ onOpenEnquiry }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      text: 'Welcome to Qawe Investment Company Limited. I can assist you with commodity specifications, verified warehouse lots, Incoterms, or direct RFQ enquiries.'
    }
  ]);

  const getAssistantResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('copper cathode') || q.includes('800 mt') || q.includes('cathode')) {
      return 'We supply Grade A Electrolytic Copper Cathodes (99.97% - 99.99% purity). We currently have verified warehouse stacks (including an 800 MT lot verified in Dar es Salaam with physical video and press stamp in Section 07). Shipped under FOB Dar es Salaam or CIF destination port.';
    }
    if (q.includes('gold') || q.includes('214 kg') || q.includes('precious')) {
      return 'Our Gold sourcing is handled with strict chain-of-custody, government royalty clearance, and assay verification. As shown in our Section 07 verification media, recent lots include 214 KGs gold granules/pellets inspected in Dar es Salaam prior to secure transit.';
    }
    if (q.includes('copper wire') || q.includes('wire') || q.includes('millberry')) {
      return 'We supply bright copper wire bales and bulk bags with purity ≥ 99.0%. Packaging includes 1-1.5 MT bulk bags or compressed bales loaded directly into export containers.';
    }
    if (q.includes('cobalt') || q.includes('tantalite') || q.includes('coltan') || q.includes('sulfur')) {
      return 'We supply Cobalt, Tantalite (Ta2O5), Coltan, and Sulfur to buyer specifications. All strategic and 3TG minerals adhere to strict regional traceability, export licensing, and assay verification.';
    }
    if (q.includes('commodity') || q.includes('supply') || q.includes('material') || q.includes('what do you supply')) {
      return 'Our primary catalogue includes: Copper Cathode (Grade A), Copper Wire (≥99%), Copper Concentrate, Cobalt, Gold, Tantalite, Coltan, and Industrial Sulfur. Custom mineral specifications are also available upon request.';
    }
    if (q.includes('verify') || q.includes('verification') || q.includes('assay') || q.includes('inspection')) {
      return 'Physical verification is 100% mandatory on every lot: independent chemical assays (SGS, Alex Stewart, Bureau Veritas), verified scale weights, official tamper-evident batch tags, and live video proof before final container sealing.';
    }
    if (q.includes('incoterm') || q.includes('cif') || q.includes('fob') || q.includes('shipping') || q.includes('port')) {
      return 'We primarily trade under FOB Port of Dar es Salaam, Tanzania, or CIF (Cost, Insurance & Freight) to destination ports worldwide (including Qingdao, Rotterdam, Dubai, Mumbai). All sea freight is containerized or bulk carrier scheduled.';
    }
    if (q.includes('location') || q.includes('office') || q.includes('address') || q.includes('dar es salaam')) {
      return 'Our corporate desk is based in Ununio, Dar es Salaam, Tanzania, ideally positioned near the Port of Dar es Salaam trade corridor connecting mineral belts in Tanzania, DRC, and Zambia.';
    }
    if (q.includes('theme') || q.includes('light') || q.includes('dark')) {
      return 'Our site design uses an editorial high-contrast theme: dark obsidian (#181715) for high-focus trading sections, luminous warm gold (#c89532) for key actions, and warm mineral sand (#efede7) for reading clarity and eye comfort.';
    }
    if (q.includes('rfq') || q.includes('quote') || q.includes('enquiry') || q.includes('contact') || q.includes('price')) {
      return 'To get an indicative quote, submit your material, target quantity, and destination port via our RFQ form, or reach our directors directly on WhatsApp.';
    }
    return 'I can answer questions regarding our commodities (Copper, Gold, Cobalt, Tantalite), physical verification, port logistics, Incoterms, or connect you directly with our directors.';
  };

  const handleSend = (textToSend = input) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase().includes('start an rfq') || trimmed.toLowerCase() === 'rfq') {
      setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
      setInput('');
      setIsOpen(false);
      onOpenEnquiry();
      return;
    }

    const reply = getAssistantResponse(trimmed);
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: trimmed },
      { role: 'assistant', text: reply }
    ]);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  const waHref = whatsappLink(PRIMARY_WHATSAPP);

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-20 right-5 z-30 flex items-center gap-2 border border-[#211f1b] bg-[#f1ede5] px-4 py-3 text-[10px] font-bold uppercase tracking-[.12em] text-[#211f1b] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:bg-white"
        aria-expanded={isOpen}
        aria-controls="qawe-direct-chat"
        data-testid="button-chat-toggle"
      >
        {isOpen ? <X size={15} /> : <Bot size={15} className="text-[#c89532]" />}
        {isOpen ? 'Close assistant' : 'Ask QAWE Desk'}
      </button>

      {/* Floating WhatsApp Quick Button */}
      <a
        href={waHref}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-30 flex items-center gap-2 border border-[#211f1b] bg-[#c89532] px-4 py-3 text-[10px] font-bold uppercase tracking-[.12em] text-[#211f1b] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#e2b04c] hover:shadow-[0_0_15px_rgba(200,149,50,0.5)]"
        data-testid="link-floating-whatsapp"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-700 animate-ping" />
        WhatsApp Desk
      </a>

      {/* Chat Dialog Panel */}
      {isOpen && (
        <div
          id="qawe-direct-chat"
          className="chat-panel fixed bottom-[8.5rem] right-5 z-40 flex w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden border border-[#5a5145] bg-[#1e1c18] text-[#f1ede5] shadow-[0_24px_80px_rgba(0,0,0,.6)] animate-in fade-in slide-in-from-bottom-4 duration-200"
          role="dialog"
          aria-label="Qawe direct assistant"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#433c32] bg-[#161513] px-4 py-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center border border-[#c89532] bg-[#1f1d19] text-[#d09b30]">
                <Bot size={18} />
              </div>
              <div>
                <p className="font-display text-sm font-semibold tracking-tight text-[#f1ede5]">
                  Qawe Trade Desk Assistant
                </p>
                <p className="font-mono-custom text-[8px] uppercase tracking-[.14em] text-[#a79f91]">
                  Verified Data • Direct Answers
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-7 w-7 items-center justify-center border border-white/10 text-[#aaa397] transition-colors hover:border-[#c89532] hover:text-[#d09b30]"
              aria-label="Close assistant"
              data-testid="button-close-chat"
            >
              <X size={15} />
            </button>
          </div>

          {/* Chat Stream */}
          <div className="chat-scrollbar flex max-h-[320px] min-h-[180px] flex-col gap-3 overflow-y-auto p-4" aria-live="polite">
            {messages.map((msg, index) => (
              <div
                key={`${msg.role}-${index}`}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[88%] border px-3.5 py-2.5 text-[12px] leading-relaxed ${
                    msg.role === 'user'
                      ? 'border-[#c89532] bg-[#c89532] text-[#211f1b] font-medium'
                      : 'border-[#433c32] bg-[#141311] text-[#d8d1c5]'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick FAQ Chips */}
          <div className="border-t border-[#3b352c] bg-[#161513]/70 px-4 py-2.5">
            <p className="mb-2 font-mono-custom text-[8px] uppercase tracking-[.14em] text-[#8c8477]">
              Suggested questions:
            </p>
            <div className="flex flex-wrap gap-1.5 max-h-[95px] overflow-y-auto">
              {FAQ_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="rounded-none border border-[#4a4337] bg-[#1f1d19] px-2.5 py-1 font-mono-custom text-[8px] uppercase tracking-[.06em] text-[#cfc7bc] transition-all hover:border-[#c89532] hover:text-[#d09b30]"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-[#3b352c] bg-[#141311] p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Ask about commodities, verification, CIF/FOB..."
              className="min-w-0 flex-1 bg-transparent px-2 py-1.5 text-xs text-[#f1ede5] placeholder:text-[#6a6357] outline-none"
              aria-label="Chat query input"
              data-testid="input-chat-message"
            />
            <button
              type="submit"
              className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#c89532] text-[#211f1b] transition-transform hover:scale-105"
              aria-label="Send query"
              data-testid="button-send-chat"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
