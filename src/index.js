// ============================================================
// Imran Salara MD Bot — Express server (official WhatsApp Cloud API)
// Webhook verification + incoming message handling.
// ============================================================

require('dotenv').config();
const express = require('express');
const path = require('path');
const { sendText, sendImage, markRead } = require('./services/whatsapp');
const { handleIncomingText, BOT_NAME } = require('./handlers/messageHandler');

const app = express();
app.use(express.json());

// Serve public/menu.jpg (the bot's menu image) so WhatsApp can fetch it.
app.use(express.static(path.join(__dirname, '..', 'public')));

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || '';
const PORT = process.env.PORT || 3000;

// ---------- Health check ----------
app.get('/', (req, res) => {
  res.json({
    bot: BOT_NAME,
    status: 'online',
    version: '1.0.0',
    uptime_seconds: Math.floor(process.uptime()),
  });
});

// ---------- Webhook verification (Meta calls this once at setup) ----------
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN && VERIFY_TOKEN) {
    console.log('✅ Webhook verified by Meta.');
    return res.status(200).send(challenge);
  }
  console.warn('⚠️ Webhook verification failed.');
  return res.sendStatus(403);
});

// ---------- Incoming messages ----------
app.post('/webhook', async (req, res) => {
  // Acknowledge immediately so Meta doesn't retry.
  res.sendStatus(200);

  try {
    const entry = req.body?.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;
    const message = value?.messages?.[0];
    if (!message) return; // e.g. status updates — nothing to do.

    const from = message.from; // sender's WhatsApp ID
    const msgId = message.id;
    const text = message.text?.body || '';

    // Blue ticks.
    try { await markRead(msgId); } catch (e) { console.warn('markRead failed:', e.message); }

    if (!text) {
      await sendText(from, `🤖 *${BOT_NAME}*\n\nI can only read text messages right now. Try .menu for my 150 commands!`);
      return;
    }

    console.log(`📩 from ${from}: ${text.slice(0, 80)}`);

    const reply = await handleIncomingText(from, text, (t) => sendText(from, t));
    if (!reply) return;

    if (typeof reply === 'string') {
      await sendText(from, reply);
    } else if (reply.image) {
      await sendImage(from, reply.image, reply.text || '');
    } else if (reply.text) {
      await sendText(from, reply.text);
    }
  } catch (err) {
    console.error('Webhook handling error:', err.message);
  }
});

app.listen(PORT, () => {
  console.log(`🤖 ${BOT_NAME} listening on port ${PORT}`);
});
