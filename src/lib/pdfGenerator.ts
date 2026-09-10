import { jsPDF } from 'jspdf';
import { commodities } from '@/data/commodities';
import { OFFICIAL_EMAIL, PRIMARY_WHATSAPP, OFFICE_ADDRESS, leadership } from '@/data/company';

export function downloadCompanyProfilePdf() {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Dark Header Band
    doc.setFillColor(27, 26, 23);
    doc.rect(0, 0, 210, 48, 'F');

    // Gold Accent Stripe
    doc.setFillColor(200, 149, 50);
    doc.rect(0, 48, 210, 2, 'F');

    // Title & Header Text
    doc.setTextColor(243, 240, 233);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('QAWE INVESTMENT COMPANY LIMITED', 14, 20);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(208, 155, 48);
    doc.text('CORPORATE CAPABILITY STATEMENT & MINERAL SUPPLY DIRECTORY', 14, 28);

    doc.setTextColor(180, 173, 162);
    doc.setFontSize(8.5);
    doc.text(`Headquarters: ${OFFICE_ADDRESS} | Desk: ${PRIMARY_WHATSAPP} | Email: ${OFFICIAL_EMAIL}`, 14, 38);

    // Section 1: Executive Overview
    let y = 60;
    doc.setTextColor(27, 26, 23);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('1. EXECUTIVE PROFILE & VALUE PROPOSITION', 14, y);
    doc.setDrawColor(200, 149, 50);
    doc.line(14, y + 2, 80, y + 2);

    y += 9;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(70, 65, 58);
    const summary = 'Qawe Investment Company Limited is a premier mineral trading, physical verification, and export facilitation firm headquartered in Dar es Salaam, Tanzania. We operate across key mining corridors in East and Central Africa (Tanzania, DRC, Zambia), connecting verified industrial minerals and precious metals to international smelters, refiners, and global institutional off-takers.';
    const splitSummary = doc.splitTextToSize(summary, 182);
    doc.text(splitSummary, 14, y);

    // Section 2: Core Commodity Portfolio
    y += splitSummary.length * 4.5 + 8;
    doc.setTextColor(27, 26, 23);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('2. CORE COMMODITY PORTFOLIO & SPECIFICATIONS', 14, y);
    doc.setDrawColor(200, 149, 50);
    doc.line(14, y + 2, 95, y + 2);

    y += 8;
    commodities.forEach((c) => {
      if (y > 265) {
        doc.addPage();
        y = 20;
      }
      doc.setFillColor(248, 246, 240);
      doc.rect(14, y, 182, 16, 'F');
      doc.setDrawColor(220, 214, 202);
      doc.rect(14, y, 182, 16, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(27, 26, 23);
      doc.text(`${c.code} — ${c.name} (${c.category})`, 18, y + 5.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(90, 85, 78);
      const specsText = c.specs ? c.specs.join('  |  ') : c.detail;
      const splitSpecs = doc.splitTextToSize(specsText, 174);
      doc.text(splitSpecs, 18, y + 11);

      y += 19;
    });

    // Page 2: Compliance, Trade Terms & Leadership
    if (y > 210) {
      doc.addPage();
      y = 20;
    } else {
      y += 6;
    }

    doc.setTextColor(27, 26, 23);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('3. COMPLIANCE, INCOTERMS & VERIFICATION FRAMEWORK', 14, y);
    doc.setDrawColor(200, 149, 50);
    doc.line(14, y + 2, 105, y + 2);

    y += 9;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(70, 65, 58);
    const terms = [
      '• Independent Assay Standards: Certified testing per lot (SGS, Alex Stewart, Bureau Veritas, Geological Survey).',
      '• Export Documentation: Tanzania Mining Commission export permits, royalty clearance & Chamber certificates.',
      '• Incoterms Supported: FOB Port of Dar es Salaam, Tanzania / CIF Destination Global Sea & Air Ports.',
      '• Chain of Custody: Documented origin corridors with OECD and regional due diligence compliance.',
      '• Settlement Procedures: Documentary Letters of Credit (L/C), Escrow, and direct bank-to-bank settlement.'
    ];
    terms.forEach((t) => {
      doc.text(t, 14, y);
      y += 5.5;
    });

    // Executive Contact Desk
    y += 6;
    doc.setFillColor(27, 26, 23);
    doc.rect(14, y, 182, 28, 'F');

    doc.setTextColor(208, 155, 48);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('COMMERCIAL PROCUREMENT & TRADE DESK', 20, y + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(240, 236, 228);
    doc.text(`Main Desk: ${PRIMARY_WHATSAPP}  |  Official RFQs: ${OFFICIAL_EMAIL}`, 20, y + 14);
    doc.text(`Operations Facility: ${OFFICE_ADDRESS}`, 20, y + 20);

    // Save PDF
    doc.save('Qawe-Investment-Company-Profile.pdf');
    return true;
  } catch (error) {
    console.error('Failed to generate PDF profile:', error);
    return false;
  }
}
