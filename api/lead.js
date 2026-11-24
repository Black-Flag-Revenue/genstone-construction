// Vercel serverless function: emails form submissions through Resend.
// Env vars: RESEND_API_KEY, LEAD_TO_EMAIL (comma-separated), LEAD_FROM_EMAIL (verified sender).
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  if (body.company_website) return res.status(200).json({ ok: true });
  const { RESEND_API_KEY, LEAD_TO_EMAIL, LEAD_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !LEAD_TO_EMAIL) return res.status(500).json({ error: 'Email not configured' });
  const { attachments = [], kind = 'Website lead', ...fields } = body;
  const rows = Object.entries(fields).map(([k, v]) => `<tr><td style="padding:6px 12px;color:#666">${esc(k)}</td><td style="padding:6px 12px"><b>${esc(v)}</b></td></tr>`).join('');
  const payload = {
    from: LEAD_FROM_EMAIL || 'Genstone Website <onboarding@resend.dev>',
    to: LEAD_TO_EMAIL.split(',').map((s) => s.trim()),
    reply_to: fields.email || undefined,
    subject: `${kind}: ${fields.address || fields.company || fields.name || 'new submission'}`,
    html: `<h2 style="font-family:sans-serif">${esc(kind)}</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
    attachments: (attachments || []).slice(0, 5).map((a) => ({ filename: `${a.field}-${a.filename}`, content: a.content })),
  };
  const r = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  if (!r.ok) return res.status(502).json({ error: 'Send failed' });
  return res.status(200).json({ ok: true });
};
