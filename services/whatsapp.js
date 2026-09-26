// ============================================================
// Imran Salara MD Bot — WhatsApp Cloud API helpers
// Uses ONLY the official Meta Graph API. No unofficial libraries.
// ============================================================

const GRAPH_VERSION = 'v21.0';
const GRAPH_BASE = `https://graph.facebook.com/${GRAPH_VERSION}`;

function config() {
  return {
    token: process.env.WHATSAPP_TOKEN,
    phoneNumberId: process.env.PHONE_NUMBER_ID,
  };
}

function assertConfigured() {
  const { token, phoneNumberId } = config();
  if (!token || !phoneNumberId) {
    throw new Error('WHATSAPP_TOKEN and PHONE_NUMBER_ID must be set in the environment.');
  }
  return { token, phoneNumberId };
}

async function postMessage(payload) {
  const { token, phoneNumberId } = assertConfigured();
  const res = await fetch(`${GRAPH_BASE}/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`WhatsApp API error ${res.status}: ${body}`);
  }
  return res.json();
}

// Send a plain text message.
async function sendText(to, text) {
  return postMessage({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'text',
    text: { preview_url: true, body: String(text).slice(0, 4000) },
  });
}

// Send an image by URL with an optional caption.
async function sendImage(to, imageUrl, caption = '') {
  return postMessage({
    messaging_product: 'whatsapp',
    to,
    type: 'image',
    image: { link: imageUrl, caption: String(caption).slice(0, 1000) },
  });
}

// Mark an incoming message as read (shows blue ticks).
async function markRead(messageId) {
  const { token, phoneNumberId } = assertConfigured();
  const res = await fetch(`${GRAPH_BASE}/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      status: 'read',
      message_id: messageId,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`WhatsApp mark-read error ${res.status}: ${body}`);
  }
  return res.json();
}

module.exports = { sendText, sendImage, markRead };
