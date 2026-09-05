export interface Commodity {
  name: string;
  slug: string;
  code: string;
  category: string;
  detail: string;
  description: string;
  uses: string;
  forms: string;
  specs?: string[];
  stockType?: string;
}

export const commodities: Commodity[] = [
  {
    name: 'Copper Cathode',
    slug: 'copper-cathode',
    code: '01',
    category: 'Industrial minerals',
    detail: 'Refined material for industrial buyers',
    description: 'A refined copper product (Grade A 99.97% - 99.99%) commonly used as a feedstock for manufacturing and further processing. Availability, specification, documentation and delivery are discussed against the buyer’s requirement.',
    uses: 'Electrical, construction and industrial manufacturing',
    forms: 'Cathode sheets (bound with steel strapping); customer-specific commercial brief',
    specs: ['Grade A Purity: 99.97% - 99.99%', 'Standard Sheet Dimension: ~914mm x 914mm', 'Packaging: Steel banded bundles on pallets', 'Origin: DRC / Zambia / Tanzania corridor'],
    stockType: 'Warehouse Stacks Available (800 MT Lot Verified)'
  },
  {
    name: 'Copper Concentrate',
    slug: 'copper-concentrate',
    code: '02',
    category: 'Industrial minerals',
    detail: 'Sourced to a defined customer brief',
    description: 'A copper-bearing material prepared for industrial processing. A supply conversation should define the required specification, documentation, destination and timing before commercial terms are discussed.',
    uses: 'Smelting, refining and industrial processing',
    forms: 'Concentrate; requirement-led sourcing brief',
    specs: ['Typical Cu Content: 20% - 35%', 'Moisture Content: Controlled < 9%', 'Packaging: 1-1.5 MT Big Bags or Bulk containerized', 'Testing: SGS / Alfred H Knight / Bureau Veritas on dispatch'],
    stockType: 'Batch Sourcing'
  },
  {
    name: 'Copper Wire',
    slug: 'copper-wire',
    code: '03',
    category: 'Industrial minerals',
    detail: 'Supply conversations built around use',
    description: 'High-purity bright copper wire and scrap wire (Purity ≥ 99%) for buyers who need a defined material form and an organised route to delivery. The team can discuss application, specification, quantity and destination as part of an enquiry.',
    uses: 'Electrical systems, manufacturing, drawing and fabrication',
    forms: 'Bales of bright copper wire; bulk bags; specification-led enquiry',
    specs: ['Purity: ≥ 99.0% - 99.9%', 'Form: Baled wire coils / 1 MT bulk bags', 'Inspected for purity and moisture', 'Dispatched from Dar es Salaam facility'],
    stockType: 'Physical Stock Available'
  },
  {
    name: 'Cobalt',
    slug: 'cobalt',
    code: '04',
    category: 'Industrial minerals',
    detail: 'Requirement-led sourcing and verification',
    description: 'A strategic industrial material used in several manufacturing, energy storage and technology supply chains. Each conversation is shaped around the intended use, documentation, origin certification and route to the buyer.',
    uses: 'Industrial processing, technology, battery alloys and aerospace manufacturing',
    forms: 'Hydroxide / metal cathode / briquettes; requirement-specific material discussion',
    specs: ['Co Content: Tailored to buyer brief', 'Full Chain-of-Custody & Traceability Documentation', 'OECD due diligence compliant sourcing corridor'],
    stockType: 'Requirement-Led Sourcing'
  },
  {
    name: 'Tantalite',
    slug: 'tantalite',
    code: '05',
    category: 'Industrial minerals',
    detail: 'Documentation considered from origin onward',
    description: 'A tantalum-bearing mineral that requires a careful conversation around material identification, documentation, origin and movement. Availability is confirmed against the individual requirement.',
    uses: 'Specialist processing, capacitors and technology-related supply chains',
    forms: 'Mineral ore / concentrate; documentation-led enquiry',
    specs: ['Ta2O5 content verified by assay', 'iTSCi / regional traceability tagging', 'Full export licensing from Tanzania / regional authorities'],
    stockType: 'Verified Origin Corridor'
  },
  {
    name: 'Coltan',
    slug: 'coltan',
    code: '06',
    category: 'Industrial minerals',
    detail: 'A considered route from source to buyer',
    description: 'A columbite-tantalite mineral material discussed with attention to the buyer’s requirement, available documentation, verification steps and delivery route.',
    uses: 'Specialist processing and technology-related supply chains',
    forms: 'Mineral material; requirement-led sourcing brief',
    specs: ['Assay report provided per lot', 'Compliant origin documentation', 'Containerized secure shipping'],
    stockType: 'Requirement-Led Sourcing'
  },
  {
    name: 'Gold',
    slug: 'gold',
    code: '07',
    category: 'Precious metals',
    detail: 'Handled with clarity and discretion',
    description: 'A precious metal material discussed privately and requirement by requirement. Product form (nuggets, doré bars, granules), documentation, assay verification, destination and commercial process are confirmed directly with qualified buyers.',
    uses: 'Precious metals trading, refining, manufacturing and investment requirements',
    forms: 'Nuggets / doré bars / granules; requirement-specific precious metal discussion',
    specs: ['Purity: Typically 92% - 96%+ Doré / Verified Granules', 'Government mineral royalty & export permits cleared', 'Official inspection batches (e.g. 214 KGs Dar es Salaam lot verified)', 'Secure vaulting and CIF air transit to buyer refinery'],
    stockType: 'Physical Inspection Batches Available'
  },
  {
    name: 'Sulfur',
    slug: 'sulfur',
    code: '08',
    category: 'Industrial minerals',
    detail: 'Practical supply for specific requirements',
    description: 'An industrial material used across chemical, fertilizer and manufacturing applications. A clear brief helps the team align on grade, form, quantity, destination and timing.',
    uses: 'Chemical, agricultural, sulfuric acid production and industrial applications',
    forms: 'Granular / lump / flaked; requirement-specific material discussion',
    specs: ['Purity: 99.5%+ Industrial grade', 'Shipped in bulk or 50kg bags', 'FOB Dar es Salaam or CIF destination'],
    stockType: 'Volume Supply'
  },
];
