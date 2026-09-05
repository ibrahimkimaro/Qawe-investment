export interface MediaItem {
  id: string;
  type: 'video' | 'image' | 'note';
  title: string;
  category: 'verification' | 'stocks' | 'operations' | 'notes';
  categoryLabel: string;
  date?: string;
  lotInfo?: string;
  location: string;
  summary: string;
  src?: string;
  thumbnail?: string;
  duration?: string;
  aspectRatio?: string;
}

export const mediaItems: MediaItem[] = [
  {
    id: 'copper-video-01',
    type: 'video',
    title: 'Copper Cathodes Warehouse Stacks — 800 MT Lot Physical Verification',
    category: 'verification',
    categoryLabel: 'Physical Verification Video',
    date: 'July 2026',
    lotInfo: 'Lot: MR DAVID ZAVAD — 800 MT Verified Cathodes',
    location: 'Dar es Salaam Bonded Facility',
    summary: 'Direct inspection video inside the warehouse holding stacks of bound Copper Cathodes with official lot identifier and national daily newspaper verification proof.',
    src: '/media/video-copper-cathodes.mp4',
    thumbnail: '/media/copper-cathodes-warehouse.jpeg',
    duration: '2:53 min'
  },
  {
    id: 'gold-video-02',
    type: 'video',
    title: 'Gold Sourcing & Weighing Batch (214 KGs) — Dar es Salaam Inspection',
    category: 'verification',
    categoryLabel: 'Physical Verification Video',
    date: 'July 2026',
    lotInfo: 'Batch: ESPERANCE — 214 KGS Dar es Salaam',
    location: 'Dar es Salaam Vault & Inspection Room',
    summary: 'Documented inspection of multiple secured bags of verified gold granules and pellets tagged with batch weights and chain-of-custody verification slip.',
    src: '/media/video-gold-verification.mp4',
    thumbnail: '/media/mineral-bags-inspection.jpeg',
    duration: '1:00 min'
  },
  {
    id: 'copper-cathodes-img',
    type: 'image',
    title: 'High-Grade Electrolytic Copper Cathode Bundles',
    category: 'stocks',
    categoryLabel: 'Warehouse Stock',
    date: 'Active Stock',
    lotInfo: 'Purity: 99.97% - 99.99% Grade A',
    location: 'Dar es Salaam Transit Warehouse',
    summary: 'Rows of stacked electrolytic copper cathode sheets securely strapped with high-tensile steel bands, staged for container loading and export dispatch.',
    src: '/media/copper-cathodes-warehouse.jpeg',
  },
  {
    id: 'copper-wire-bales-img',
    type: 'image',
    title: 'Pure Copper Wire Compressed Bales (Purity ≥ 99%)',
    category: 'stocks',
    categoryLabel: 'Warehouse Stock',
    date: 'Active Stock',
    lotInfo: 'Purity: ≥ 99% Bright Copper',
    location: 'Processing & Consolidation Yard',
    summary: 'Compressed bales of pure stripped copper wire prepared for industrial smelting, drawing, and alloy fabrication clients.',
    src: '/media/copper-wire-bales.jpeg',
  },
  {
    id: 'copper-wire-loading-img',
    type: 'image',
    title: 'Industrial Bulk Bag Loading of High-Purity Copper Wire',
    category: 'operations',
    categoryLabel: 'Field Operations',
    date: 'Logistics Dispatch',
    lotInfo: 'Purity ≥ 99% — 1 MT Big Bags',
    location: 'Export Logistics Staging Area',
    summary: 'Excavator and forklift loading 1-metric-ton bulk bags of high-purity copper wire onto heavy transport trucks bound for the port terminal.',
    src: '/media/copper-wire-loading.jpeg',
  },
  {
    id: 'mineral-bags-inspection-img',
    type: 'image',
    title: 'On-Site Team Verification of Bulk Mineral Concentrates',
    category: 'operations',
    categoryLabel: 'Inspection & Assaying',
    date: 'Field Verification',
    lotInfo: 'Bulk Bags Multi-Ton Lot',
    location: 'Consolidation Depot, Tanzania',
    summary: 'Qawe operational representatives conducting physical lot inspection and documentation checks across warehouse-stored industrial mineral big bags.',
    src: '/media/mineral-bags-inspection.jpeg',
  },
  {
    id: 'copper-wire-detail-img',
    type: 'image',
    title: 'High-Purity Bright Copper Wire Specimen Detail',
    category: 'stocks',
    categoryLabel: 'Material Detail',
    date: 'Quality Inspection',
    lotInfo: 'Bare Bright Copper',
    location: 'Testing Facility',
    summary: 'Close-up quality check confirming clean, unoxidized bare bright copper strands meeting stringent industrial purity specifications.',
    src: '/media/copper-wire-detail.jpeg',
  }
];

export const fieldNotes = [
  {
    number: '01',
    title: 'A better supply conversation starts before the quote.',
    copy: 'The right requirement makes every later decision more useful — from origin identification through documentation, assaying and shipping movement.'
  },
  {
    number: '02',
    title: 'The requirement is the starting material.',
    copy: 'Serious buyers define specification, target port and delivery timeline upfront so the pricing and verification procedure reflect reality.'
  },
  {
    number: '03',
    title: 'Origin is only useful when the route is clear.',
    copy: 'Having minerals at origin means nothing without export clearance, mineral royalties paid, and transparent port handling.'
  },
  {
    number: '04',
    title: 'A handover should never feel like a black box.',
    copy: 'Physical verification with verifiable video proof, assay certificates from accredited laboratories, and open line of communication.'
  }
];
