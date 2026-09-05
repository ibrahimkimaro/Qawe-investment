export interface Leader {
  role: string;
  name: string;
  initials: string;
  contact: string;
  tel: string;
}

export interface CompanyStat {
  value: string;
  label: string;
}

export interface Service {
  number: string;
  title: string;
  copy: string;
  details?: string;
}

export const OFFICIAL_EMAIL = 'qaweminiral@qawe.co.tz';
export const OFFICE_ADDRESS = 'Ununio, Dar es Salaam, Tanzania';
export const PRIMARY_WHATSAPP = '255750471188';

export const leadership: Leader[] = [
  { role: 'Director', name: 'Tshepo Zwelibanzi', initials: 'TZ', contact: '+27 78 963 8042', tel: '27789638042' },
  { role: 'Public Relations & Sourcing', name: 'Dan Guguka', initials: 'DG', contact: '+255 750 471 188', tel: '255750471188' },
  { role: 'Financial & Compliance', name: 'Hans Mtui', initials: 'HM', contact: '+255 619 685 942', tel: '255619685942' },
];

export const companyStats: CompanyStat[] = [
  { value: '18+', label: 'Years of industry experience' },
  { value: '120+', label: 'International buyers served' },
  { value: '01', label: 'Dar es Salaam trade desk & hub' },
  { value: '100%', label: 'Physical verification prior to export' },
];

export const services: Service[] = [
  {
    number: '01',
    title: 'Sourcing',
    copy: 'We start with your requirement, then build the right sourcing conversation around material, grade, form, timing and destination.',
    details: 'Direct relationships with verified artisanal and industrial concessions across the East and Central African mineral corridors.'
  },
  {
    number: '02',
    title: 'Verification',
    copy: 'Material and documentation are reviewed before the next handover. The brief stays visible throughout every inspection step.',
    details: 'Independent assaying (SGS, Alex Stewart, Bureau Veritas), physical weighing, and anti-counterfeit batch documentation.'
  },
  {
    number: '03',
    title: 'Export & shipping',
    copy: 'A coordinated route from origin through customs export, secure bonded warehousing, and ocean/air freight to destination.',
    details: 'Full compliance with Tanzania Mining Commission regulations, export permits, chamber of commerce certificates, and EUR1/bill of lading.'
  },
  {
    number: '04',
    title: 'Final delivery',
    copy: 'The job is complete when the material arrives where it needs to be, with the right paperwork and assays alongside it.',
    details: 'Delivered under clear Incoterms (FOB Dar es Salaam, CIF Destination Port, or CFR) with transparent milestone updates.'
  },
];

export const whatsappLink = (
  phone: string,
  message = 'Hello Qawe Investment Company Limited, I would like to discuss a mineral supply requirement.'
) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

export const sitePath = (path = '') => {
  const base = (import.meta.env?.BASE_URL || '/').replace(/\/$/, '');
  return `${base}${path ? `/${path.replace(/^\//, '')}` : '/'}`;
};
