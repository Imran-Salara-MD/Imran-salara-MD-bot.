// ============================================================
// Imran Salara MD Bot — general commands (20)
// ============================================================

const BOT_NAME = 'Imran Salara MD Bot';
const VERSION = '1.0.0';
const STARTED_AT = Date.now();

function fmtUptime(ms) {
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${d}d ${h}h ${m}m ${sec}s`;
}

// Builds the full categorized menu text. Expects ctx.commands (all commands).
function buildMenu(commands, compact = false) {
  const cats = {};
  for (const c of commands) {
    (cats[c.category] = cats[c.category] || []).push(c);
  }
  const order = ['general', 'fun', 'tools', 'downloaders', 'movies', 'islamic', 'ai & fun'];
  const titles = {
    general: '⚙️ GENERAL',
    fun: '🎉 FUN',
    tools: '🛠️ TOOLS',
    downloaders: '⬇️ DOWNLOADERS',
    movies: '🎬 MOVIES',
    islamic: '🕌 ISLAMIC',
    'ai & fun': '🤖 AI & FUN',
  };
  let out = `🤖 *${BOT_NAME}*\n`;
  out += compact ? '📋 Full command list:\n\n' : '📋 *MAIN MENU*\n\n';
  for (const key of order) {
    const list = cats[key];
    if (!list) continue;
    out += `*${titles[key]}*\n`;
    if (compact) {
      out += list.map((c) => `.${c.name}`).join('  ') + '\n\n';
    } else {
      for (const c of list) out += `  ◦ .${c.name} — ${c.description}\n`;
      out += '\n';
    }
  }
  out += `✨ Total: ${commands.length} commands\nType .help <command> for usage.`;
  return out;
}

const commands = [
  {
    name: 'ping', description: 'Check if the bot is alive', category: 'general',
    usage: '.ping',
    execute() { return '🏓 Pong! *' + BOT_NAME + '* is online ✅'; },
  },
  {
    name: 'menu', description: 'Show the full command menu', category: 'general',
    usage: '.menu',
    execute(args, ctx) {
      const text = buildMenu(ctx.commands || []);
      const base = (process.env.APP_URL || '').replace(/\/+$/, '');
      if (base) return { text, image: `${base}/menu.jpg` };
      return text;
    },
  },
  {
    name: 'list', description: 'Compact list of all commands', category: 'general',
    usage: '.list',
    execute(args, ctx) { return buildMenu(ctx.commands || [], true); },
  },
  {
    name: 'help', description: 'Get help for a command', category: 'general',
    usage: '.help <command>',
    execute(args, ctx) {
      const q = (args[0] || '').toLowerCase().replace(/^\./, '');
      if (!q) return '❓ Usage: .help <command>\nExample: .help joke';
      const cmd = (ctx.commands || []).find((c) => c.name === q);
      if (!cmd) return `❌ No command named "${q}". Try .menu to see all.`;
      return `📖 *Help — .${cmd.name}*\n\n📝 ${cmd.description}\n🗂️ Category: ${cmd.category}\n▶️ Usage: ${cmd.usage}`;
    },
  },
  {
    name: 'info', description: 'About this bot', category: 'general',
    usage: '.info',
    execute() {
      return `🤖 *${BOT_NAME}*\n\n✨ 150 dot-commands + AI auto-reply\n🔌 Built on the official WhatsApp Cloud API\n👑 Owner: ${process.env.OWNER_NAME || 'Imran Salara'}\n📌 Version: ${VERSION}\n💬 Send any message to chat, or start with . for commands.`;
    },
  },
  {
    name: 'owner', description: 'Contact the bot owner', category: 'general',
    usage: '.owner',
    execute() {
      return `👑 *Owner:* ${process.env.OWNER_NAME || 'Imran Salara'}\n🤖 Bot: ${BOT_NAME}\n📩 For support, just reply here — the owner will see it.`;
    },
  },
  {
    name: 'bot', description: 'Bot identity card', category: 'general',
    usage: '.bot',
    execute() { return `🤖 Hi! I am *${BOT_NAME}* — your WhatsApp assistant with 150 commands. Try .menu ✨`; },
  },
  {
    name: 'alive', description: 'Is the bot running?', category: 'general',
    usage: '.alive',
    execute() { return `✅ *${BOT_NAME}* is alive and running!\n⏱️ Uptime: ${fmtUptime(Date.now() - STARTED_AT)}`; },
  },
  {
    name: 'runtime', description: 'Show bot runtime', category: 'general',
    usage: '.runtime',
    execute() { return `⏱️ *Runtime:* ${fmtUptime(Date.now() - STARTED_AT)}`; },
  },
  {
    name: 'uptime', description: 'Show bot uptime', category: 'general',
    usage: '.uptime',
    execute() { return `⏱️ *Uptime:* ${fmtUptime(Date.now() - STARTED_AT)}`; },
  },
  {
    name: 'speed', description: 'Test response speed', category: 'general',
    usage: '.speed',
    execute() {
      const t0 = Date.now();
      return `⚡ *Speed:* ${Date.now() - t0} ms\n🚀 ${BOT_NAME} is fast!`;
    },
  },
  {
    name: 'version', description: 'Show bot version', category: 'general',
    usage: '.version',
    execute() { return `📌 *${BOT_NAME}* — v${VERSION}\n🔌 Official WhatsApp Cloud API build`; },
  },
  {
    name: 'stats', description: 'Bot statistics', category: 'general',
    usage: '.stats',
    execute(args, ctx) {
      const total = (ctx.commands || []).length;
      return `📊 *${BOT_NAME} Stats*\n\n🔢 Commands: ${total}\n⏱️ Uptime: ${fmtUptime(Date.now() - STARTED_AT)}\n💾 Node: ${process.version}\n✅ Status: Online`;
    },
  },
  {
    name: 'id', description: 'Show your WhatsApp ID', category: 'general',
    usage: '.id',
    execute(args, ctx) { return `🆔 *Your WhatsApp ID:*\n${ctx.from || 'unknown'}`; },
  },
  {
    name: 'me', description: 'Who are you to the bot?', category: 'general',
    usage: '.me',
    execute(args, ctx) { return `🙋 You are chatting with *${BOT_NAME}*.\n🆔 Your ID: ${ctx.from || 'unknown'}\n✨ Nice to meet you!`; },
  },
  {
    name: 'link', description: 'Get useful links', category: 'general',
    usage: '.link',
    execute() {
      return `🔗 *Useful links*\n\n📘 WhatsApp Cloud API docs:\nhttps://developers.facebook.com/docs/whatsapp/cloud-api\n💻 Source pattern: official Meta Graph API — no unofficial libraries.`;
    },
  },
  {
    name: 'rules', description: 'Bot usage rules', category: 'general',
    usage: '.rules',
    execute() {
      return `📜 *${BOT_NAME} — Rules*\n\n1️⃣ No spam or abuse.\n2️⃣ Respect copyright — downloaders give official links only.\n3️⃣ AI replies are best-effort, not professional advice.\n4️⃣ Have fun! 🎉`;
    },
  },
  {
    name: 'donate', description: 'Support the bot', category: 'general',
    usage: '.donate',
    execute() {
      return `💝 *Support ${BOT_NAME}*\n\nIf this bot helps you, share it with friends! 🌟\n👑 Owner: ${process.env.OWNER_NAME || 'Imran Salara'}`;
    },
  },
  {
    name: 'support', description: 'Get support info', category: 'general',
    usage: '.support',
    execute() {
      return `🛟 *Support*\n\n❓ Try .help <command> first.\n📋 See .menu for all 150 commands.\n👑 Owner: ${process.env.OWNER_NAME || 'Imran Salara'}`;
    },
  },
  {
    name: 'prefix', description: 'Show the command prefix', category: 'general',
    usage: '.prefix',
    execute() { return `⌨️ Command prefix is:  *.*  (dot)\nExample: .ping  .menu  .joke`; },
  },
];

module.exports = commands;
