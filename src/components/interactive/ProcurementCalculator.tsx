import React, { useState } from 'react';
import { commodities } from '@/data/commodities';
import { PRIMARY_WHATSAPP, OFFICIAL_EMAIL, whatsappLink } from '@/data/company';
import { trackEvent } from '@/lib/analytics';
import { Calculator, Send, MessageCircle, ArrowUpRight, ShieldCheck, Ship, FileCheck, CheckCircle2 } from 'lucide-react';

const PORTS = [
  { region: 'Europe', ports: ['Rotterdam (Netherlands)', 'Antwerp (Belgium)', 'Hamburg (Germany)', 'Genoa (Italy)'] },
  { region: 'Asia & Pacific', ports: ['Shanghai (China)', 'Tianjin (China)', 'Ningbo-Zhoushan (China)', 'Singapore', 'Busan (South Korea)'] },
  { region: 'Middle East', ports: ['Jebel Ali (UAE)', 'Hamad Port (Qatar)', 'Sohar (Oman)'] },
  { region: 'Africa', ports: ['Dar es Salaam (Tanzania)', 'Durban (South Africa)', 'Beira (Mozambique)', 'Mombasa (Kenya)'] },
  { region: 'Americas', ports: ['Houston (USA)', 'Santos (Brazil)', 'Manzanillo (Mexico)'] }
];

export function ProcurementCalculator({ onOpenEnquiry }: { onOpenEnquiry?: (customText: string) => void }) {
  const [selectedSlug, setSelectedSlug] = useState(commodities[0].slug);
  const [quantity, setQuantity] = useState('500');
  const [unit, setUnit] = useState('MT');
  const [incoterm, setIncoterm] = useState('CIF');
  const [destinationPort, setDestinationPort] = useState('Rotterdam (Netherlands)');
  const [assayPreference, setAssayPreference] = useState('SGS Inspectorate');

  const currentCommodity = commodities.find(c => c.slug === selectedSlug) || commodities[0];

  const handleWhatsAppQuote = () => {
    const brief = `*PROCUREMENT BRIEF CONFIGURATION*\n\n*Commodity:* ${currentCommodity.name} (Code: ${currentCommodity.code})\n*Target Volume:* ${quantity} ${unit}\n*Incoterm:* ${incoterm}\n*Destination:* ${destinationPort}\n*Assay Lab Preference:* ${assayPreference}\n\n_Please confirm indicative commercial terms and dispatch timeline for this brief._`;
    
    trackEvent('calculator_rfq_sent', { material: currentCommodity.name, volume: `${quantity} ${unit}` });
    window.open(whatsappLink(PRIMARY_WHATSAPP, brief), '_blank');
  };

  const handleEmailQuote = () => {
    const subject = `RFQ: ${quantity} ${unit} ${currentCommodity.name} [${incoterm} ${destinationPort}]`;
    const body = `Commercial Procurement Desk,\n\nI would like to request a formal quotation based on the following configured parameters:\n\n- Commodity: ${currentCommodity.name} (Code: ${currentCommodity.code})\n- Volume: ${quantity} ${unit}\n- Trade Incoterm: ${incoterm}\n- Destination Port: ${destinationPort}\n- Assaying Standard: ${assayPreference}\n\nPlease provide allocation details, CIF/FOB pricing structure, and documentation requirements.\n\nRegards,`;

    trackEvent('calculator_rfq_email', { material: currentCommodity.name });
    window.location.href = `mailto:${OFFICIAL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="section-pad bg-[#191815] text-[#f1ede5] border-t border-[#3e382f]">
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-12">
          <div>
            <div className="eyebrow flex items-center gap-3 text-[#d09b30]">
              <Calculator size={15} /> 04 / Commercial Desk
            </div>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,4.5vw,4.5rem)] font-semibold leading-[.95] tracking-[-.05em] text-[#fbf8f3]">
              Procurement & Trade <br />
              <span className="text-[#d09b30]">Brief Configurator.</span>
            </h2>
          </div>
          <p className="max-w-[400px] text-xs leading-relaxed text-[#a8a195]">
            Configure your required mineral specifications, target metric volume, Incoterms, and destination port to generate an immediate trading desk brief.
          </p>
        </div>

        {/* 2-Column Grid: Configurator Inputs vs. Live Brief Summary */}
        <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
          {/* Controls Panel */}
          <div className="border border-[#453f35] bg-[#211f1b] p-6 sm:p-8 space-y-6">
            {/* Step 1: Select Commodity */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#d09b30] mb-3">
                1. Select Commodity Material
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {commodities.map((c) => (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => {
                      setSelectedSlug(c.slug);
                      if (c.name.toLowerCase().includes('gold')) {
                        setUnit('KG');
                        setQuantity('100');
                      } else {
                        setUnit('MT');
                        if (quantity === '100') setQuantity('500');
                      }
                    }}
                    className={`p-3 text-left border transition-all text-xs ${
                      selectedSlug === c.slug
                        ? 'border-[#c89532] bg-[#c89532]/15 text-[#fbf8f3] font-semibold ring-1 ring-[#c89532]'
                        : 'border-[#3d3830] bg-[#181715] text-[#aaa296] hover:border-[#6b6254] hover:text-[#f1ede5]'
                    }`}
                  >
                    <span className="font-mono-custom text-[9px] text-[#8e8578] block">{c.code}</span>
                    <span className="truncate block mt-1">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Quantity & Unit */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-[#383229]">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#d09b30] mb-2">
                  2. Required Volume
                </label>
                <div className="flex">
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full bg-[#181715] border border-[#453f35] px-4 py-3 text-sm text-[#f1ede5] focus:outline-none focus:border-[#d09b30] font-mono-custom"
                  />
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="bg-[#2a2722] border-y border-r border-[#453f35] px-3 text-xs text-[#d09b30] font-bold focus:outline-none"
                  >
                    <option value="MT">Metric Tons (MT)</option>
                    <option value="KG">Kilograms (KG)</option>
                    <option value="Container Lots">20ft Container Lots</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#d09b30] mb-2">
                  3. Trade Incoterms
                </label>
                <select
                  value={incoterm}
                  onChange={(e) => setIncoterm(e.target.value)}
                  className="w-full bg-[#181715] border border-[#453f35] px-4 py-3 text-sm text-[#f1ede5] focus:outline-none focus:border-[#d09b30]"
                >
                  <option value="CIF">CIF — Cost, Insurance & Freight (Global Destination)</option>
                  <option value="FOB">FOB — Free on Board (Port of Dar es Salaam)</option>
                  <option value="EXW">EXW — Ex Works (Dar es Salaam Bonded Warehouse)</option>
                  <option value="CFR">CFR — Cost & Freight (Destination Terminal)</option>
                </select>
              </div>
            </div>

            {/* Step 3: Destination Port & Assaying */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-[#383229]">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#d09b30] mb-2">
                  4. Destination Discharge Port
                </label>
                <select
                  value={destinationPort}
                  onChange={(e) => setDestinationPort(e.target.value)}
                  className="w-full bg-[#181715] border border-[#453f35] px-4 py-3 text-xs text-[#f1ede5] focus:outline-none focus:border-[#d09b30]"
                >
                  {PORTS.map((group) => (
                    <optgroup key={group.region} label={group.region} className="bg-[#181715] text-[#d09b30]">
                      {group.ports.map((p) => (
                        <option key={p} value={p} className="text-[#f1ede5]">
                          {p}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#d09b30] mb-2">
                  5. Independent Assayer
                </label>
                <select
                  value={assayPreference}
                  onChange={(e) => setAssayPreference(e.target.value)}
                  className="w-full bg-[#181715] border border-[#453f35] px-4 py-3 text-xs text-[#f1ede5] focus:outline-none focus:border-[#d09b30]"
                >
                  <option value="SGS Inspectorate">SGS Inspectorate (Tanzania)</option>
                  <option value="Alex Stewart International">Alex Stewart International</option>
                  <option value="Bureau Veritas (BV)">Bureau Veritas (BV)</option>
                  <option value="Alfred H Knight">Alfred H Knight (AHK)</option>
                  <option value="Geological Survey of Tanzania (GST)">GST National Laboratory</option>
                </select>
              </div>
            </div>
          </div>

          {/* Live Brief Output Card */}
          <div className="border border-[#c89532]/40 bg-gradient-to-br from-[#1f1d19] to-[#141311] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between border-b border-[#3d372e] pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#d09b30] animate-pulse" />
                  <span className="font-mono-custom text-[10px] font-bold uppercase tracking-[.16em] text-[#d09b30]">
                    Configured Commercial Brief
                  </span>
                </div>
                <span className="text-[10px] font-mono-custom text-[#8f877c]">
                  REF: QAWE-{currentCommodity.code}-{Date.now().toString().slice(-4)}
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-[#fbf8f3]">
                {quantity} {unit} — {currentCommodity.name}
              </h3>

              {/* Brief Parameter Pills */}
              <div className="mt-5 space-y-3 text-xs">
                <div className="flex items-center justify-between py-2 border-b border-[#302b23]">
                  <span className="text-[#8e8679] flex items-center gap-2">
                    <Ship size={13} className="text-[#c89532]" /> Delivery Incoterm & Port
                  </span>
                  <span className="font-medium text-[#f1ede5]">{incoterm} — {destinationPort}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-[#302b23]">
                  <span className="text-[#8e8679] flex items-center gap-2">
                    <ShieldCheck size={13} className="text-[#c89532]" /> Assaying Standard
                  </span>
                  <span className="font-medium text-[#f1ede5]">{assayPreference}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-[#302b23]">
                  <span className="text-[#8e8679] flex items-center gap-2">
                    <FileCheck size={13} className="text-[#c89532]" /> Regulatory Compliance
                  </span>
                  <span className="font-medium text-[#f1ede5]">Tanzania Mining Commission Cleared</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-[#302b23]">
                  <span className="text-[#8e8679] flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#c89532]" /> Typical Purity
                  </span>
                  <span className="font-medium text-[#d09b30]">{currentCommodity.specs?.[0] || currentCommodity.detail}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-[#3e382f] space-y-3">
              <button
                type="button"
                onClick={handleWhatsAppQuote}
                className="w-full flex items-center justify-center gap-2.5 bg-[#c89532] px-6 py-4 text-xs font-bold uppercase tracking-[.14em] text-[#211f1b] transition-all hover:bg-[#e2b04c] shadow-lg shadow-[#c89532]/10"
              >
                <MessageCircle size={16} /> Route Brief to WhatsApp Desk
              </button>

              <button
                type="button"
                onClick={handleEmailQuote}
                className="w-full flex items-center justify-center gap-2.5 border border-[#635a4d] px-6 py-3.5 text-xs font-bold uppercase tracking-[.14em] text-[#f1ede5] hover:border-[#d09b30] hover:text-[#d09b30] transition-colors bg-[#181715]"
              >
                <Send size={14} /> Submit via Official RFQ Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
