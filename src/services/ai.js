// ============================================================
// Imran Salara MD Bot — AI auto-reply client
// Talks to any OpenAI-compatible /chat/completions endpoint.
// Returns null when AI is not configured or the call fails,
// so the handler can fall back to a polite local reply.
// ============================================================

const SYSTEM_PROMPT = [
  'You are "Imran Salara Bot", a friendly WhatsApp assistant.',
  'RULES:',
  '- Reply in the SAME language and script the user wrote in.',
  '  If the user writes in Urdu script, reply in Urdu script.',
  '  If the user writes in Roman Urdu, reply in Roman Urdu.',
  '  If the user writes in English, reply in English.',
  '  If the user writes in Arabic, reply in Arabic.',
  '- Keep replies short and chat-friendly (WhatsApp style).',
  '- Never claim to be anything other than Imran Salara Bot.',
  '- Be helpful, warm, and concise.',
].join('\n');

function aiConfig() {
  const baseUrl = (process.env.AI_API_URL || '').replace(/\/+$/, '');
  const apiKey = process.env.AI_API_KEY || '';
  const model = process.env.AI_MODEL || 'gpt-4o-mini';
  if (!baseUrl || !apiKey) return null;
  // Accept either the base URL or a full /chat/completions URL.
  const url = baseUrl.endsWith('/chat/completions') ? baseUrl : `${baseUrl}/chat/completions`;
  return { url, apiKey, model };
}

// Returns the AI reply string, or null when unavailable.
async function getAiReply(userText, extraSystem = '') {
  const cfg = aiConfig();
  if (!cfg || !userText || !userText.trim()) return null;
  try {
    const res = await fetch(cfg.url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cfg.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: cfg.model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT + (extraSystem ? '\n' + extraSystem : '') },
          { role: 'user', content: userText.slice(0, 3000) },
        ],
        max_tokens: 400,
        temperature: 0.7,
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    return typeof content === 'string' && content.trim() ? content.trim() : null;
  } catch {
    return null;
  }
}

function isAiConfigured() {
  return aiConfig() !== null;
}

module.exports = { getAiReply, isAiConfigured };
