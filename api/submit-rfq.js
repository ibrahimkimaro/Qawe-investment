// Serverless endpoint to accept RFQ submissions and forward to CRM/WhatsApp webhooks.
// Deploy on Vercel (api/submit-rfq.js) or adapt to your server framework.

const CRM_URL = process.env.CRM_WEBHOOK_URL;
const WHATSAPP_URL = process.env.WHATSAPP_WEBHOOK_URL;
const SECRET = process.env.SUBMISSION_SECRET; // simple validation if set

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = req.body || {};

    // Simple server-side secret validation (optional)
    if (SECRET) {
      const provided = req.headers['x-submission-secret'] || req.query.secret;
      if (!provided || provided !== SECRET) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    }

    // Forward to CRM webhook if configured
    if (CRM_URL) {
      try {
        await fetch(CRM_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'rfq_submission', payload: body }),
        });
      } catch (err) {
        // ignore forwarding errors
      }
    }

    // Forward a short message to WhatsApp webhook if configured
    if (WHATSAPP_URL) {
      try {
        const short = `RFQ from ${body.name || 'website'}: ${body.commodity || 'unspecified'} ${body.quantity || ''}`;
        await fetch(WHATSAPP_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: short, payload: body }),
        });
      } catch (err) {}
    }

    // Respond success
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
