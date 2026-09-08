import React, { useState, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { OFFICIAL_EMAIL } from '@/data/company';
import { trackEvent } from '@/lib/analytics';

interface RFQWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RFQWizard({ isOpen, onClose }: RFQWizardProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    commodity: '',
    grade: '',
    quantity: '',
    incoterm: 'FOB',
    port: '',
    deliveryDate: '',
    notes: '',
    name: '',
    company: '',
    email: '',
  });

  const formRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  const next = () => setStep((s) => Math.min(4, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const update = (patch: Partial<typeof data>) => setData((d) => ({ ...d, ...patch }));

  const downloadPDF = async () => {
    try {
      const jsPDFModule = await import('https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js');
      const { jsPDF } = (jsPDFModule as any).default ? (jsPDFModule as any).default : jsPDFModule;
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text('QAWE — RFQ Draft', 14, 20);
      doc.setFontSize(11);
      const lines = [
        `Commodity: ${data.commodity}`,
        `Grade: ${data.grade}`,
        `Quantity: ${data.quantity}`,
        `Incoterm: ${data.incoterm}`,
        `Port: ${data.port}`,
        `Delivery: ${data.deliveryDate}`,
        '',
        'Notes:',
        data.notes || '-',
        '',
        `Contact: ${data.name} — ${data.company} — ${data.email}`,
      ];
      doc.text(doc.splitTextToSize(lines.join('\n'), 180), 14, 40);
      doc.save('qawe-rfq-draft.pdf');
    } catch (e) {
      // ignore
    }
  };

  const submit = () => {
    (async () => {
      trackEvent('rfq_submitted', { channel: 'wizard' });
      try {
        const res = await fetch('/api/submit-rfq', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'rfq', ...data }),
        });
        if (res.ok) {
          alert('RFQ submitted — our desk will follow up shortly.');
        } else {
          throw new Error('submission failed');
        }
      } catch (err) {
        // fallback to mailto
        const subject = `RFQ: ${data.commodity || 'unspecified'}`;
        const body = [
          `Commodity: ${data.commodity}`,
          `Grade: ${data.grade}`,
          `Quantity: ${data.quantity}`,
          `Incoterm: ${data.incoterm}`,
          `Port: ${data.port}`,
          `Delivery: ${data.deliveryDate}`,
          '',
          'Notes:',
          data.notes,
          '',
          `Contact: ${data.name} — ${data.company} — ${data.email}`,
        ].join('\n');
        window.location.href = `mailto:${OFFICIAL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      } finally {
        onClose();
      }
    })();
  };

  return (
    <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-[#0d0c0b]/85 px-4 py-6 backdrop-blur-md animate-in fade-in duration-200">
      <div ref={formRef} className="relative w-full max-w-2xl rounded border border-[#5a5145] bg-[#1e1c18] p-6 text-[#f1ede5] shadow-2xl sm:p-9">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center border border-[#5a5145] text-[#bab2a7] transition-colors hover:border-[#d09b30] hover:text-[#d09b30]"
          aria-label="Close RFQ wizard"
        >
          <X size={18} />
        </button>

        <h2 className="font-display text-2xl font-semibold">Request for Quote — Wizard</h2>
        <p className="mt-2 text-sm text-[#81796f]">Guided steps to create a clean RFQ draft.</p>

        <div className="mt-6">
          <div className="flex items-center gap-3 text-xs text-[#c5c0b7]">
            <div className={`px-2 py-1 rounded ${step === 0 ? 'bg-[#c89532] text-[#211f1b]' : 'bg-[#2a2a26]'}`}>1</div>
            <div className={`px-2 py-1 rounded ${step === 1 ? 'bg-[#c89532] text-[#211f1b]' : 'bg-[#2a2a26]'}`}>2</div>
            <div className={`px-2 py-1 rounded ${step === 2 ? 'bg-[#c89532] text-[#211f1b]' : 'bg-[#2a2a26]'}`}>3</div>
            <div className={`px-2 py-1 rounded ${step === 3 ? 'bg-[#c89532] text-[#211f1b]' : 'bg-[#2a2a26]'}`}>4</div>
            <div className={`px-2 py-1 rounded ${step === 4 ? 'bg-[#c89532] text-[#211f1b]' : 'bg-[#2a2a26]'}`}>5</div>
          </div>

          <div className="mt-4">
            {step === 0 && (
              <div>
                <label className="block">
                  <span className="eyebrow text-[#8f877c]">Commodity</span>
                  <input value={data.commodity} onChange={(e) => update({ commodity: e.target.value })} placeholder="e.g., Copper Cathode" className="mt-2.5 w-full border-b border-[#5a5145] bg-transparent py-2.5 text-sm text-[#f1ede5] outline-none" />
                </label>
                <label className="block mt-4">
                  <span className="eyebrow text-[#8f877c]">Purity / Grade</span>
                  <input value={data.grade} onChange={(e) => update({ grade: e.target.value })} placeholder="e.g., 99.99%" className="mt-2.5 w-full border-b border-[#5a5145] bg-transparent py-2.5 text-sm text-[#f1ede5] outline-none" />
                </label>
              </div>
            )}

            {step === 1 && (
              <div>
                <label className="block">
                  <span className="eyebrow text-[#8f877c]">Quantity (MT)</span>
                  <input value={data.quantity} onChange={(e) => update({ quantity: e.target.value })} placeholder="e.g., 100" className="mt-2.5 w-full border-b border-[#5a5145] bg-transparent py-2.5 text-sm text-[#f1ede5] outline-none" />
                </label>
                <div className="grid gap-4 sm:grid-cols-2 mt-4">
                  <label>
                    <span className="eyebrow text-[#8f877c]">Incoterm</span>
                    <select value={data.incoterm} onChange={(e) => update({ incoterm: e.target.value })} className="mt-2.5 w-full border-b border-[#5a5145] bg-transparent py-2.5 text-sm text-[#f1ede5] outline-none">
                      <option>FOB</option>
                      <option>CIF</option>
                      <option>CFR</option>
                    </select>
                  </label>
                  <label>
                    <span className="eyebrow text-[#8f877c]">Port</span>
                    <input value={data.port} onChange={(e) => update({ port: e.target.value })} placeholder="e.g., Dar es Salaam" className="mt-2.5 w-full border-b border-[#5a5145] bg-transparent py-2.5 text-sm text-[#f1ede5] outline-none" />
                  </label>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <label className="block">
                  <span className="eyebrow text-[#8f877c]">Target delivery date</span>
                  <input value={data.deliveryDate} onChange={(e) => update({ deliveryDate: e.target.value })} type="date" className="mt-2.5 w-full border-b border-[#5a5145] bg-transparent py-2.5 text-sm text-[#f1ede5] outline-none" />
                </label>
                <label className="block mt-4">
                  <span className="eyebrow text-[#8f877c]">Notes / Packaging / Assay requirements</span>
                  <textarea value={data.notes} onChange={(e) => update({ notes: e.target.value })} rows={4} className="mt-2.5 w-full resize-none border-b border-[#5a5145] bg-transparent py-2.5 text-sm leading-6 text-[#f1ede5] outline-none" />
                </label>
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className="eyebrow text-[#8f877c]">Contact name</span>
                    <input value={data.name} onChange={(e) => update({ name: e.target.value })} className="mt-2.5 w-full border-b border-[#5a5145] bg-transparent py-2.5 text-sm text-[#f1ede5] outline-none" />
                  </label>
                  <label>
                    <span className="eyebrow text-[#8f877c]">Company</span>
                    <input value={data.company} onChange={(e) => update({ company: e.target.value })} className="mt-2.5 w-full border-b border-[#5a5145] bg-transparent py-2.5 text-sm text-[#f1ede5] outline-none" />
                  </label>
                </div>
                <label className="block mt-4">
                  <span className="eyebrow text-[#8f877c]">Work email</span>
                  <input value={data.email} onChange={(e) => update({ email: e.target.value })} type="email" className="mt-2.5 w-full border-b border-[#5a5145] bg-transparent py-2.5 text-sm text-[#f1ede5] outline-none" />
                </label>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="font-semibold">Summary</h3>
                <div className="mt-3 space-y-2 text-sm text-[#e8e4db]">
                  <div>Commodity: {data.commodity}</div>
                  <div>Grade: {data.grade}</div>
                  <div>Quantity: {data.quantity}</div>
                  <div>Incoterm: {data.incoterm}</div>
                  <div>Port: {data.port}</div>
                  <div>Delivery: {data.deliveryDate}</div>
                  <div>Notes: {data.notes}</div>
                  <div>Contact: {data.name} — {data.company} — {data.email}</div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div>
              {step > 0 && (
                <button onClick={back} className="mr-3 rounded border border-[#5a5145] px-4 py-2 text-sm">Back</button>
              )}
              {step < 4 && (
                <button onClick={next} className="rounded bg-[#c89532] px-4 py-2 text-sm font-semibold">Next</button>
              )}
            </div>

            <div className="flex gap-3">
              <button onClick={downloadPDF} className="rounded border border-[#c89532] px-4 py-2 text-sm">Download PDF</button>
              {step === 4 && (
                <button onClick={submit} className="rounded bg-[#c89532] px-4 py-2 text-sm font-semibold">Submit RFQ <ArrowUpRight size={14} /></button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RFQWizard;
