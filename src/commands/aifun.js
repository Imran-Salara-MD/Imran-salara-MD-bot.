// ============================================================
// Imran Salara MD Bot — AI & fun commands (20)
// Each command asks the AI with a tailored prompt.
// When AI is not configured, commands either use a local
// fallback or reply politely. "imagine" NEVER generates images —
// it only describes an image idea in words.
// ============================================================

const { getAiReply } = require('../services/ai');

const notConfigured = (lang = 'en') =>
  lang === 'ur'
    ? '🤖 AI abhi configure nahi hai. Bot ke owner se AI_API_KEY set karne ko kahen.'
    : '🤖 AI is not configured yet. Ask the bot owner to set AI_API_KEY in the environment.';

// Simple language hint for nicer fallbacks.
function langOf(text) {
  if (/[\u0600-\u06FF]/.test(text)) return 'ur';
  return 'en';
}

async function aiOr(prompt, fallback) {
  const reply = await getAiReply(prompt);
  if (reply) return reply;
  return typeof fallback === 'function' ? fallback() : fallback;
}

const LOCAL_STORIES = [
  '📖 *The Honest Woodcutter*\n\nA poor woodcutter dropped his axe in the river. The river fairy offered him a golden axe — he refused, saying it wasn’t his. She offered silver — he refused again. Finally she returned his old iron axe, and rewarded his honesty with all three. 🌟\n\n*Moral: Honesty always wins.*',
  '📖 *The Thirsty Crow*\n\nA thirsty crow found a pot with a little water at the bottom. He dropped pebbles in, one by one, until the water rose high enough to drink. 🐦💧\n\n*Moral: Where there’s a will, there’s a way.*',
];

const LOCAL_POEMS = [
  '🌸 *Morning*\n\nThe sun wakes up with golden light,\nThe birds sing songs so sweet and bright.\nA brand-new day, a brand-new start,\nKeep hope alive within your heart. ☀️',
  '🌙 *Chandni*\n\nChandni raaton mein khwab sajaye,\nDil ki duniya mein phool khilaye.\nHar subah nayi roshni laaye,\nZindagi har pal muskuraye. ✨',
];

const needArgs = (args, usage) =>
  args.length ? null : `✏️ Please provide input.\nUsage: ${usage}`;

const commands = [
  { name: 'ai', description: 'Chat with the AI', category: 'ai & fun', usage: '.ai <your message>',
    execute: async (args) => {
      const e = needArgs(args, '.ai <your message>'); if (e) return e;
      return aiOr(args.join(' '), notConfigured(langOf(args.join(' '))));
    } },
  { name: 'ask', description: 'Ask the AI anything', category: 'ai & fun', usage: '.ask <question>',
    execute: async (args) => {
      const e = needArgs(args, '.ask <question>'); if (e) return e;
      return aiOr(args.join(' '), notConfigured(langOf(args.join(' '))));
    } },
  { name: 'imagine', description: 'Describe an image idea in words (no generation)', category: 'ai & fun', usage: '.imagine <idea>',
    execute: async (args) => {
      const e = needArgs(args, '.imagine <idea>\nExample: .imagine a sunset over Lahore fort'); if (e) return e;
      const idea = args.join(' ');
      const ai = await getAiReply(`Describe this image idea in vivid detail (2-3 sentences), as if briefing an artist. Do NOT generate anything, only describe: ${idea}`);
      if (ai) return `🎨 *Image idea — described:*\n\n${ai}`;
      return `🎨 *Image idea: "${idea}"*\n\nPicture this: ${idea}, captured in warm light with rich detail — a scene full of color and life. (Tip: ask the bot owner to enable AI for richer descriptions!)`;
    } },
  { name: 'summarize', description: 'Summarize long text', category: 'ai & fun', usage: '.summarize <text>',
    execute: async (args) => {
      const e = needArgs(args, '.summarize <long text>'); if (e) return e;
      return aiOr(`Summarize this in 3 short bullet points:\n\n${args.join(' ')}`, notConfigured(langOf(args.join(' '))));
    } },
  { name: 'rewrite', description: 'Rewrite text better', category: 'ai & fun', usage: '.rewrite <text>',
    execute: async (args) => {
      const e = needArgs(args, '.rewrite <text>'); if (e) return e;
      return aiOr(`Rewrite this text to be clearer and more polished, keeping the same language:\n\n${args.join(' ')}`, notConfigured(langOf(args.join(' '))));
    } },
  { name: 'grammar', description: 'Fix grammar', category: 'ai & fun', usage: '.grammar <text>',
    execute: async (args) => {
      const e = needArgs(args, '.grammar <text>'); if (e) return e;
      return aiOr(`Correct the grammar of this text and show the corrected version only:\n\n${args.join(' ')}`, notConfigured(langOf(args.join(' '))));
    } },
  { name: 'story', description: 'Get a short story', category: 'ai & fun', usage: '.story [topic]',
    execute: async (args) => {
      const topic = args.join(' ');
      const ai = await getAiReply(`Write a very short moral story${topic ? ` about: ${topic}` : ''}. Keep it under 120 words.`);
      return ai || LOCAL_STORIES[Math.floor(Math.random() * LOCAL_STORIES.length)];
    } },
  { name: 'poem', description: 'Get a short poem', category: 'ai & fun', usage: '.poem [topic]',
    execute: async (args) => {
      const topic = args.join(' ');
      const ai = await getAiReply(`Write a short 4-line poem${topic ? ` about: ${topic}` : ''}.`);
      return ai || LOCAL_POEMS[Math.floor(Math.random() * LOCAL_POEMS.length)];
    } },
  { name: 'essay', description: 'Short essay on a topic', category: 'ai & fun', usage: '.essay <topic>',
    execute: async (args) => {
      const e = needArgs(args, '.essay <topic>'); if (e) return e;
      return aiOr(`Write a short essay (about 150 words) on: ${args.join(' ')}`, notConfigured(langOf(args.join(' '))));
    } },
  { name: 'explain', description: 'Explain like I’m five', category: 'ai & fun', usage: '.explain <topic>',
    execute: async (args) => {
      const e = needArgs(args, '.explain <topic>'); if (e) return e;
      return aiOr(`Explain this simply, like I am five years old, in under 100 words: ${args.join(' ')}`, notConfigured(langOf(args.join(' '))));
    } },
  { name: 'codehelp', description: 'Explain or write code', category: 'ai & fun', usage: '.codehelp <question>',
    execute: async (args) => {
      const e = needArgs(args, '.codehelp <question>'); if (e) return e;
      return aiOr(`You are a coding tutor. Answer concisely with a small code example if relevant: ${args.join(' ')}`, notConfigured(langOf(args.join(' '))));
    } },
  { name: 'caption', description: 'Photo caption ideas', category: 'ai & fun', usage: '.caption <topic>',
    execute: async (args) => {
      const topic = args.join(' ') || 'a beautiful day';
      const ai = await getAiReply(`Give 3 short catchy social-media captions about: ${topic}. One per line.`);
      return ai || `📸 *Caption ideas for "${topic}":*\n\n1. Living my best life ✨\n2. ${topic} — good vibes only 🌟\n3. Capture the moment 📷`;
    } },
  { name: 'bio', description: 'Profile bio ideas', category: 'ai & fun', usage: '.bio <your interest>',
    execute: async (args) => {
      const topic = args.join(' ') || 'life';
      const ai = await getAiReply(`Write 3 short WhatsApp/Instagram bio lines for someone interested in: ${topic}. One per line.`);
      return ai || `🙋 *Bio ideas:*\n\n1. ✨ Dreamer | ${topic} lover\n2. 🌟 Simple soul, big dreams\n3. 📍 Living life one day at a time`;
    } },
  { name: 'slogan', description: 'Slogan generator', category: 'ai & fun', usage: '.slogan <brand/topic>',
    execute: async (args) => {
      const topic = args.join(' ') || 'your brand';
      const ai = await getAiReply(`Create 3 catchy slogans for: ${topic}. One per line, short.`);
      return ai || `📢 *Slogans for "${topic}":*\n\n1. ${topic} — quality you can trust! ✅\n2. Feel the difference with ${topic} 🌟\n3. ${topic}: made for you 💯`;
    } },
  { name: 'emaildraft', description: 'Draft an email', category: 'ai & fun', usage: '.emaildraft <purpose>',
    execute: async (args) => {
      const e = needArgs(args, '.emaildraft <purpose>\nExample: .emaildraft leave application'); if (e) return e;
      return aiOr(`Draft a short polite email for this purpose. Include subject line:\n\n${args.join(' ')}`, notConfigured(langOf(args.join(' '))));
    } },
  { name: 'speech', description: 'Short speech draft', category: 'ai & fun', usage: '.speech <topic>',
    execute: async (args) => {
      const e = needArgs(args, '.speech <topic>'); if (e) return e;
      return aiOr(`Write a short 1-minute speech on: ${args.join(' ')}`, notConfigured(langOf(args.join(' '))));
    } },
  { name: 'debate', description: 'Debate points for/against', category: 'ai & fun', usage: '.debate <topic>',
    execute: async (args) => {
      const e = needArgs(args, '.debate <topic>'); if (e) return e;
      return aiOr(`Give 3 points FOR and 3 points AGAINST this debate topic, briefly:\n\n${args.join(' ')}`, notConfigured(langOf(args.join(' '))));
    } },
  { name: 'recipe', description: 'Simple recipe', category: 'ai & fun', usage: '.recipe <dish>',
    execute: async (args) => {
      const e = needArgs(args, '.recipe <dish>\nExample: .recipe chicken biryani'); if (e) return e;
      return aiOr(`Give a simple home recipe for ${args.join(' ')}: ingredients list + 5 steps max.`, notConfigured(langOf(args.join(' '))));
    } },
  { name: 'workout', description: 'Quick workout plan', category: 'ai & fun', usage: '.workout [goal]',
    execute: async (args) => {
      const goal = args.join(' ') || 'general fitness';
      const ai = await getAiReply(`Give a simple 15-minute home workout plan for: ${goal}. No equipment. Bullet list.`);
      return ai || `💪 *15-min home workout (${goal}):*\n\n• Jumping jacks — 2 min\n• Push-ups — 3 x 10\n• Squats — 3 x 15\n• Plank — 3 x 30 sec\n• Stretching — 3 min\n\n💧 Drink water. Stay consistent!`;
    } },
  { name: 'studyplan', description: 'Study plan helper', category: 'ai & fun', usage: '.studyplan <subject/exam>',
    execute: async (args) => {
      const e = needArgs(args, '.studyplan <subject or exam>'); if (e) return e;
      return aiOr(`Make a simple 7-day study plan for: ${args.join(' ')}. Short daily tasks.`, notConfigured(langOf(args.join(' '))));
    } },
];

module.exports = commands;
