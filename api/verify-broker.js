// Simple serverless stub for broker verification
// Deploy this on Vercel (api/verify-broker.js) or adapt to your server framework.

const MOCK = [
  { id: 'AG-001', name: 'Samuel Ochieng', role: 'Sales Agent', verified: true, notes: 'Primary Dar es Salaam desk' },
  { id: 'BR-203', name: 'GG Metals Representative', role: 'Broker', verified: false, notes: 'Not an official QAWE agent' },
  { id: 'AG-042', name: 'Aisha Mbwana', role: 'Logistics', verified: true, notes: 'Verified for port operations' },
];

module.exports = (req, res) => {
  const q = (req.query.q || req.url.split('?q=')[1] || '').toString();

  if (!q) {
    return res.status(200).json({ results: [] });
  }

  // Simple matching logic
  const results = MOCK.filter((b) => b.id.toLowerCase().includes(q.toLowerCase()) || b.name.toLowerCase().includes(q.toLowerCase()));

  // In production, validate a server-side key here (e.g., process.env.BROKER_API_KEY)

  return res.status(200).json({ results });
};
