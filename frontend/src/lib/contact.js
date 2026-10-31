// Posts a lead to the contact API (Cloudflare Worker in production, backend/server.js locally).
export async function submitContact(fields) {
  const apiBase = (import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/$/, '') || 'http://localhost:5000';
  let response;
  try {
    response = await fetch(`${apiBase}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    });
  } catch (_) {
    throw new Error('Unable to connect to server. Please check your connection and try again.');
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to submit your request. Please try again.');
  }
  return data;
}
