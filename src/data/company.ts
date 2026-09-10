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

export const OFFICIAL_EMAIL = 'info@qaweinvestment.com';
export const OFFICE_ADDRESS = 'Ununio, Dar es Salaam, Tanzania';
export const PRIMARY_WHATSAPP = '+255750471188';

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
    copy: 'Share product, quantity, destination, and required specifications.',
    details: 'Direct relationships with verified artisanal and industrial concessions across the East and Central African mineral corridors.'
  },
  {
    number: '02',
    title: 'Quality Verification',
    copy: 'Inspection, assay, or specification review is aligned before shipment.',
    details: 'Product go through assays and lab confirming the grade and specifications'
  },
  {
    number: '03',
    title: 'Export & shipping',
    copy: 'Our team clarifies specifications, documentation, transaction structure and exportation process',
    details: 'Full compliance with Tanzania Mining Commission regulations, export permits, all certificates of documents inckuding bill of lading.'
  },
  {
    number: '04',
    title: 'Final delivery',
    copy: 'Shipping paperwork and logistics milestones are confirmed with the buyer.',
    details: 'Delivered under clear Incoterms  with transparent milestone.'
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
