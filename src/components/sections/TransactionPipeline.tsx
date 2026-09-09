import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle, FileText, ClipboardList, Truck, Globe, Archive, DollarSign } from 'lucide-react';
import { jsPDF } from 'jspdf';

const STEPS = [
  {
    id: 1,
    title: '01 — Submit Qualified Inquiry',
    icon: <FileText size={20} />,
    description:
      'Provide commodity type, metric tonnage, destination port, target specs, and Incoterms (FOB/CIF) to initiate review.',
  },
  {
    id: 2,
    title: '02 — Commercial & Term Alignment',
    icon: <ClipboardList size={20} />,
    description:
      'QAWE verifies product availability, sets commercial structures, and aligns trade conditions directly with the buyer.',
  },
  {
    id: 3,
    title: '03 — Quality & Assay Verification',
    icon: <CheckCircle size={20} />,
    description:
      'Specifications, purity, and grade are verified through agreed lab assays or independent third-party inspection (e.g., SGS) prior to dispatch.',
  },
  {
    id: 4,
    title: '04 — Export & Customs Clearance',
    icon: <Globe size={20} />,
    description:
      'QAWE manages all export documentation, customs procedures, origin certificates, and legal compliance required for international dispatch.',
  },
  {
    id: 5,
    title: '05 — Logistics & Shipment Tracking',
    icon: <Truck size={20} />,
    description:
      'We handle cargo movement and milestone updates while maintaining secured supply line privacy.',
  },
  {
    id: 6,
    title: '06 — Destination Delivery & Handover',
    icon: <Archive size={20} />,
    description:
      'Shipping paperwork, Bill of Lading, and destination logistics are coordinated with the buyer for smooth terminal handover.',
  },
  {
    id: 7,
    title: '07 — Final Commercial Closeout',
    icon: <DollarSign size={20} />,
    description:
      'Final documentation, bank release conditions, and settlement procedures are finalized according to contract terms.',
  },
];

export function TransactionPipeline({ onOpenEnquiry }: { onOpenEnquiry?: (commodity?: string) => void }) {
  const [active, setActive] = useState(1);
  const listRef = useRef<HTMLUListElement | null>(null);

  // Keyboard navigation: ArrowUp / ArrowDown to move, Enter to open action
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((a) => Math.min(7, a + 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((a) => Math.max(1, a - 1));
      } else if (e.key === 'Enter') {
        // activate primary action for the step
        const step = STEPS.find((s) => s.id === active);
        if (step?.id === 1) onOpenEnquiry?.(step.title);
        if (step?.id === 3) window.location.href = '/assay-vault';
        if (step?.id === 7) generatePipelinePDF();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [active, onOpenEnquiry]);

  const generatePipelinePDF = async () => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(14);
      doc.text('QAWE — 7-Step Transaction Pipeline', 14, 20);
      doc.setFontSize(11);
      STEPS.forEach((s, i) => {
        doc.text(`${s.id}. ${s.title}`, 14, 36 + i * 10);
      });
      doc.save('qawe-transaction-pipeline.pdf');
    } catch (e) {
      // Log errors in production-friendly way
      // eslint-disable-next-line no-console
      console.error('Failed to generate pipeline PDF', e);
    }
  };

  return (
    <div className="w-full text-[#211f1b]">
      <div className="mb-4">
        <h3 className="font-display text-lg font-semibold text-[#25221d]">7‑Step Transaction Pipeline</h3>
        <p className="mt-2 text-xs text-[#6b645b]">A concise workflow from inquiry to commercial closeout — clear milestones, verifiable handoffs.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-[.38fr_.62fr] items-start">
          <ul ref={listRef} className="space-y-2" role="list" aria-label="Transaction steps">
            {STEPS.map((s) => (
              <li
                key={s.id}
                onClick={() => setActive(s.id)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setActive(s.id);
                }}
                aria-current={active === s.id}
                className={`flex cursor-pointer items-start gap-3 rounded px-3 py-2 transition-colors ${
                  active === s.id
                    ? 'bg-[#fff7ea] ring-1 ring-[#c89532]'
                    : 'hover:bg-[#f5f2ea]'
                }`}
              >
                <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold ${active === s.id ? 'bg-[#a77520] text-white' : 'bg-[#f0eadf] text-[#a77520]'}`}>
                  {String(s.id).padStart(2, '0')}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <div className="truncate font-medium text-sm text-[#2e2a23]">{s.title.replace(/^[0-9]{2} — /, '')}</div>
                  </div>
                  <div className="mt-1 text-xs text-[#6b645b] line-clamp-2">{s.description}</div>
                </div>
              </li>
            ))}
          </ul>

          <div className="rounded bg-[#fff] p-5 shadow-sm">
            <div className="mb-3 flex items-start gap-4">
              <div className="rounded p-2 text-[#a77520] bg-[#fff7ea]">
                {STEPS.find((x) => x.id === active)?.icon}
              </div>
              <div className="min-w-0">
                <div className="text-xs text-[#6b645b]">Step {active} of 7</div>
                <h3 className="mt-1 text-lg font-semibold text-[#25221d]">{STEPS.find((x) => x.id === active)?.title.replace(/^[0-9]{2} — /, '')}</h3>
                <p className="mt-2 text-sm text-[#514b43]">{STEPS.find((x) => x.id === active)?.description}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button onClick={() => setActive((a) => Math.max(1, a - 1))} className="rounded border border-[#e6d9b7] px-3 py-2 text-sm">Previous</button>
              <button onClick={() => setActive((a) => Math.min(7, a + 1))} className="rounded bg-[#c89532] px-3 py-2 text-sm text-[#211f1b]">Next</button>

              <div className="ml-auto flex gap-2">
                {active === 1 && (
                  <button onClick={() => onOpenEnquiry?.('')} className="rounded border border-[#c89532] px-3 py-2 text-sm">Start RFQ</button>
                )}
                {active === 3 && (
                  <a href="/assay-vault" className="rounded border border-[#c89532] px-3 py-2 text-sm">View Assays</a>
                )}
                {active === 7 && (
                  <button onClick={generatePipelinePDF} className="rounded bg-[#2e2a23] px-3 py-2 text-sm text-[#fff]">Download Summary</button>
                )}
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default TransactionPipeline;
