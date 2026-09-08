import React from 'react';
import { FileText, Download } from 'lucide-react';

export default function AssayVault() {
  const samples = [
    { name: 'SGS_Sample_Assay_01.pdf', path: '/media/assays/SGS_Sample_Assay_01.pdf' },
    { name: 'AlexStewart_Assay_Sample.pdf', path: '/media/assays/AlexStewart_Assay_Sample.pdf' },
    { name: 'Export_License_Sample.pdf', path: '/media/assays/Export_License_Sample.pdf' },
  ];

  return (
    <div className="section-pad bg-[#efede7] text-[#211f1b]">
      <div className="mx-auto max-w-[980px]">
        <div className="reveal">
          <div className="eyebrow flex items-center gap-3 text-[#8b651e]"><span className="h-px w-9 bg-[#c89532]" /> Assay & Compliance Vault</div>
          <h1 className="mt-6 font-display text-4xl font-semibold text-[#25221d]">Verified Assays & Compliance Documents</h1>
          <p className="mt-4 text-sm text-[#514b43]">Redacted sample assay certificates, laboratory reports and export credentials. Download the sanitized documents below for buyer verification.</p>
        </div>

        <div className="mt-8 grid gap-4">
          {samples.map((s) => (
            <a key={s.path} href={s.path} download className="flex items-center justify-between rounded border border-[#cfc8bd] bg-white p-3 text-sm text-[#2e2a23]">
              <div className="flex items-center gap-3">
                <FileText />
                <div>
                  <div className="font-semibold">{s.name}</div>
                  <div className="text-xs text-[#6b645b]">Sanitised sample document for verification</div>
                </div>
              </div>
              <Download />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
