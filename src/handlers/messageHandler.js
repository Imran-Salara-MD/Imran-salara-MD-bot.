// ============================================================
// Imran Salara MD Bot — incoming message handler
// Routes dot-commands to the registry, everything else to AI.
// ============================================================

const { allCommands, findCommand } = require('../commands');
const { getAiReply } = require('../services/ai');

const BOT_NAME = 'Imran Salara MD Bot';

// Tiny Levenshtein distance for "did you mean?" suggestions.
function distance(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 1; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[m][n];
}

function suggestions(name) {
  return allCommands
    .map((c) => ({ name: c.name, d: distance(name, c.name) }))
    .filter((x) => x.d <= 3)
    .sort((a, b) => a.d - b.d)
    .slice(0, 3)
    .map((x) => `.${x.name}`);
}

// Rough language detection for graceful fallback replies.
// Urdu uses Arabic script plus extra letters (ٹ ڈ ڑ ں ہ ھ ے etc.);
// plain Arabic script without those is treated as Arabic.
function detectLang(text) {
  if (/[ٹڈڑںہھےپچژگک]/.test(text)) return 'ur';
  if (/[\u0600-\u06FF]/.test(text)) return 'ar';
  const roman = ['hai', 'nahi', 'nahin', 'kya', 'kaise', 'kyun', 'tum', 'aap', 'mein', 'aur', 'bohat', 'bahut', 'acha', 'shukriya', 'mujhe', 'liye', 'saath'];
  const words = text.toLowerCase().split(/\W+/);
  if (words.filter((w) => roman.includes(w)).length >= 2) return 'roman';
  return 'en';
}

function aiNotConfiguredNote(lang) {
  if (lang === 'ur') {
    return `🤖 *${BOT_NAME}*\n\nMaaf kijiye — AI auto-reply abhi configure nahi hai, is liye main aap ke message ka jawab nahi de saka.\n\n💡 Commands ke liye .menu likhein.\n🔑 Owner se AI_API_KEY set karne ko kahen.`;
  }
  if (lang === 'roman') {
    return `🤖 *${BOT_NAME}*\n\nSorry — AI auto-reply abhi configure nahi hai, is liye aap ke message ka jawab nahi de saka.\n\n💡 Commands ke liye .menu likhein.\n🔑 Owner se AI_API_KEY set karne ko kahen.`;
  }
  if (lang === 'ar') {
    return `🤖 *${BOT_NAME}*\n\nعذراً — الرد التلقائي غير مُعدّ بعد، لذا لم أستطع الرد على رسالتك.\n\n💡 اكتب .menu لرؤية الأوامر.\n🔑 اطلب من المالك تعيين AI_API_KEY.`;
  }
  return `🤖 *${BOT_NAME}*\n\nSorry — AI auto-reply isn’t configured yet, so I couldn’t answer your message.\n\n💡 Type .menu to see my 150 commands.\n🔑 Ask the owner to set AI_API_KEY.`;
}

// ctx: { from, commands, send }
// Returns: string | { text, image } | null (null = nothing to send)
async function handleIncomingText(from, text, send) {
  const trimmed = (text || '').trim();
  if (!trimmed) return null;

  const ctx = { from, commands: allCommands, send };

  if (trimmed.startsWith('.')) {
    const parts = trimmed.slice(1).split(/\s+/);
    const name = (parts[0] || '').toLowerCase();
    const args = parts.slice(1);

    if (!name) return '❓ Type a command after the dot, e.g. .ping — or .menu for all commands.';

    const cmd = findCommand(name);
    if (!cmd) {
      const sug = suggestions(name);
      let msg = `❌ Unknown command: ".${name}"\n\n🤖 I am *${BOT_NAME}*.`;
      if (sug.length) msg += `\n\n💡 Did you mean: ${sug.join(', ')}?`;
      msg += '\n\n📋 Type .menu to see all 150 commands.';
      return msg;
    }

    try {
      const result = await cmd.execute(args, ctx);
      return result ?? '✅ Done.';
    } catch (err) {
      console.error(`Command .${name} failed:`, err.message);
      return `⚠️ The .${name} command hit an error. Please try again later.`;
    }
  }

  // Not a command → AI fallback.
  const reply = await getAiReply(trimmed);
  if (reply) return reply;
  return aiNotConfiguredNote(detectLang(trimmed));
}

module.exports = { handleIncomingText, BOT_NAME };
