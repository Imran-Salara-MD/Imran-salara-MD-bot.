// ============================================================
// Imran Salara MD Bot — fun commands (30)
// All data is local: works with zero API keys.
// Roasts are playful and non-abusive by design.
// ============================================================

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const JOKES = [
  'Why don’t scientists trust atoms? Because they make up everything! 😄',
  'I told my computer I needed a break… now it won’t stop sending me KitKat ads. 🍫',
  'Why did the phone go to school? To improve its "cell-f" esteem! 📱',
  'Parallel lines have so much in common… shame they’ll never meet. 📏',
  'Yaar, bijli itni jaati hai ke ab UPS bhi kehta hai "main thak gaya hoon"! ⚡😂',
  'Dost: "Tension mat le." Main: "Leta nahi, wo khud aa jaati hai!" 😅',
  'Why do programmers prefer dark mode? Because light attracts bugs! 🐛',
  'My wallet is like an onion… opening it makes me cry. 🧅💸',
  'Zindagi mein do hi cheezain mushkil hain: subah uthna aur raat ko sona. 😴',
  'I asked the librarian if the library had books on paranoia… she whispered, "They’re right behind you." 📚',
];

const QUOTES = [
  '"The best way to predict the future is to create it." — Peter Drucker',
  '"Mehnat itni khamoshi se karo ke kamyabi shor macha de." ✨',
  '"Success is not final, failure is not fatal: it is the courage to continue that counts." — Churchill',
  '"Jo gir kar sambhal jaye, wahi asal jeet hai." 💪',
  '"In the middle of difficulty lies opportunity." — Einstein',
  '"Waqt sab ka badalta hai, bas sabar rakhna seekho." ⏳',
  '"Believe you can and you’re halfway there." — Roosevelt',
  '"Koshish karne walon ki kabhi haar nahi hoti." 🌟',
];

const FACTS = [
  '🍯 Honey never spoils — pots found in ancient tombs were still edible!',
  '🐙 Octopuses have three hearts and blue blood.',
  '🍌 Bananas are berries, but strawberries aren’t!',
  '⚡ A single bolt of lightning is 5x hotter than the sun’s surface.',
  '🦩 Flamingos are born grey — shrimp in their diet turns them pink.',
  '🌙 The Moon is drifting away from Earth ~3.8 cm every year.',
  '🐝 Honeybees can recognize human faces.',
  '💧 About 71% of Earth’s surface is covered by water.',
  '🦒 Giraffes only sleep about 30 minutes a day.',
  '📱 The first text message ever sent said "Merry Christmas" (1992).',
];

const SHAYARI = [
  'Dil mein ho tum, aankhon mein ho tum,\nBolo tumhein kaise bhool jayein hum? 💕',
  'Chandni raaton mein teri yaad aati hai,\nHar dua mein teri khair mangi jaati hai. 🌙',
  'Muskurahat labon par saja ke rakhna,\nGham ko dil mein chhupa ke rakhna. 😊',
  'Waqt guzar jata hai, yaadein reh jaati hain,\nKuch baatein dil mein hi keh jaati hain. ⏳',
  'Teri yaadon ka silsila na khatam hoga,\nDil ka ye dard kabhi kam na hoga. 💔',
  'Phoolon se khushbu, chand se chandni,\nDosti mein chahiye bas sacchi lagan hi. 🌸',
  'Har subah nayi ummeed laati hai,\nZindagi har pal muskurana sikhati hai. 🌅',
  'Door ho kar bhi paas lagte ho,\nTum dil ke kitne khaas lagte ho. 💖',
];

const MEMES = [
  '😂 *Meme:* "Me: I’ll sleep early tonight."\n"Also me at 3 AM: watching a documentary on how pencils are made."',
  '😂 *Meme:* "Nobody:"\n"Absolutely nobody:"\n"My brain at 2 AM: remember that embarrassing thing from 2015?"',
  '😂 *Meme:* "WiFi down for 5 minutes"\n"Me: I guess this is how the pioneers lived."',
  '😂 *Meme:* "My phone battery at 1% lasts longer than my motivation on Mondays."',
  '😂 *Meme:* "Ammi: bijli ka bill zyada aaya hai!"\n"Also Ammi: *leaves every light in the house on*"',
];

const DARES = [
  'Send a voice note singing your favorite song 🎤',
  'Text the 5th contact in your phone "I owe you biryani" 🍛',
  'Do 10 push-ups right now 💪',
  'Change your profile picture to something funny for 1 hour 😜',
  'Speak in shayari for the next 10 minutes 🎭',
  'Send "I love you" to the last person you chatted with (and explain after!) 😂',
  'Dance for 30 seconds and describe how it felt 💃',
  'Eat a spoon of something sour and report back 🍋',
];

const TRUTHS = [
  'What’s the most embarrassing thing you’ve ever done? 😳',
  'Who was your first crush? 💘',
  'What’s a secret talent you have? 🌟',
  'What’s the biggest lie you’ve told your parents? 🙊',
  'What’s your most-used emoji and why? 😂',
  'Have you ever pretended to be sick to skip something? 🤒',
  'What’s the weirdest dream you remember? 💭',
  'Who do you text the most? 📱',
];

const EIGHTBALL = [
  '✅ It is certain.', '✅ Without a doubt.', '👍 Yes, definitely.',
  '🤔 Ask again later.', '🔮 Cannot predict now.', '😴 Better not tell you now.',
  '❌ Don’t count on it.', '❌ My reply is no.', '⚠️ Outlook not so good.',
  '🌟 Signs point to yes!', '💫 Absolutely yes!', '😐 Maybe… maybe not.',
];

const RIDDLES = [
  { q: 'I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?', a: 'An echo 🔊' },
  { q: 'What has keys but can’t open a single lock?', a: 'A piano 🎹' },
  { q: 'The more of me you take, the more you leave behind. What am I?', a: 'Footsteps 👣' },
  { q: 'What has a head and a tail but no body?', a: 'A coin 🪙' },
  { q: 'Wo kya hai jo jitna nikalta hai utna bharta hai?', a: 'Kunwan (well) — paani! 💧' },
  { q: 'What runs but never walks, has a mouth but never talks?', a: 'A river 🏞️' },
  { q: 'I’m tall when I’m young and short when I’m old. What am I?', a: 'A candle 🕯️' },
  { q: 'What can you catch but never throw?', a: 'A cold 🤧' },
];

const COMPLIMENTS = [
  '🌟 You have a smile that could light up the darkest room!',
  '💡 You’re smarter than you give yourself credit for.',
  '🎨 Your creativity is genuinely inspiring.',
  '💪 You handle tough situations like a champion.',
  '🌸 Aap jaisay log dunya ko khoobsurat banatay hain!',
  '☀️ Your positive energy is contagious — in the best way.',
  '🎯 You’re more capable than you know.',
  '💖 You make people feel valued. That’s a rare gift.',
];

// Playful, non-abusive roasts only.
const ROASTS = [
  '😜 You’re like a cloud — when you disappear, it’s a beautiful day!',
  '🤓 You’re proof that even WiFi has a weak signal sometimes.',
  '🍕 You’re like a pizza slice — great, but everyone wants a piece of you… in arguments.',
  '🐢 You run like a phone on 1% battery — slow but still going!',
  '📱 Tumhari memory bhi phone ki tarah hai — "storage full" har waqt!',
  '🧠 You’re so smart, even Google asks YOU questions… in its dreams.',
];

const PICKUPS = [
  'Are you WiFi? Because I’m really feeling the connection. 📶💘',
  'Kya aap bijli hain? Kyunke aap ko dekh kar current lagta hai! ⚡😉',
  'Do you have a map? I keep getting lost in your eyes. 🗺️👀',
  'Are you a magician? Because whenever I look at you, everyone else disappears. 🎩✨',
  'Tum chai ho ya coffee? Kyunke tumhare baghair subah adhoori hai! ☕💕',
];

const TONGUES = [
  'She sells seashells by the seashore. 🐚',
  'Peter Piper picked a peck of pickled peppers. 🌶️',
  'Kacha papad, pakka papad! 🫓',
  'Betty bought butter but the butter was bitter. 🧈',
  'Oonchi dukaan, pheeka pakwan! 🏪',
  'Red lorry, yellow lorry, red lorry, yellow lorry. 🚚',
];

const HOROSCOPES = [
  '♈ Aries: A surprise message will make your day. Stay bold!',
  '♉ Taurus: Good time for money matters. Avoid extra biryani. 🍛',
  '♊ Gemini: Your words have power today — use them kindly.',
  '♋ Cancer: Family time brings happiness. Call your ammi! 📞',
  '♌ Leo: Shine bright — someone admires you silently. ✨',
  '♍ Virgo: Organize one small thing; big peace will follow.',
  '♎ Libra: Balance work and rest. A walk will help. 🚶',
  '♏ Scorpio: Trust your gut feeling today. 🔮',
  '♐ Sagittarius: Adventure calls — even a small one counts!',
  '♑ Capricorn: Hard work pays off soon. Keep going! 💪',
  '♒ Aquarius: A creative idea deserves action.',
  '♓ Pisces: Dream big, then take one small step. 🌊',
];

const OWO = (t) => t.replace(/[lr]/g, 'w').replace(/[LR]/g, 'W').replace(/n([aeiou])/g, 'ny$1').replace(/N([AEIOU])/g, 'Ny$1') + ' owo 🥺';
const MOCK = (t) => t.split('').map((ch, i) => (i % 2 ? ch.toUpperCase() : ch.toLowerCase())).join('');
const CLAP = (t) => t.split(/\s+/).join(' 👏 ') + ' 👏';
const TINY = { a: 'ᵃ', b: 'ᵇ', c: 'ᶜ', d: 'ᵈ', e: 'ᵉ', f: 'ᶠ', g: 'ᵍ', h: 'ʰ', i: 'ⁱ', j: 'ʲ', k: 'ᵏ', l: 'ˡ', m: 'ᵐ', n: 'ⁿ', o: 'ᵒ', p: 'ᵖ', q: '۹', r: 'ʳ', s: 'ˢ', t: 'ᵗ', u: 'ᵘ', v: 'ᵛ', w: 'ʷ', x: 'ˣ', y: 'ʸ', z: 'ᶻ' };
const tinytext = (t) => t.toLowerCase().split('').map((ch) => TINY[ch] || ch).join('');
const reverse = (t) => t.split('').reverse().join('');
const emojify = (t) => t.split('').map((ch) => (/[a-z]/i.test(ch) ? `:${ch.toLowerCase()}:` : ch)).join(' ');

const ASCII_ART = {
  cat: '／l、\n（ﾟ､ ｡ ７\n  l、 ~ヽ\n  じしf_,)ノ',
  dog: '╭━━╮\n┃  ┗┓\n┗━┳┛\n  (•ᴥ•)',
  heart: '♥ ♥ ♥\n ♥ ♥\n  ♥',
};

function needArgs(args, what) {
  if (!args.length) return `✏️ Please give me text.\nUsage: ${what}\nExample: ${what} hello world`;
  return null;
}

const commands = [
  { name: 'joke', description: 'Get a random joke', category: 'fun', usage: '.joke',
    execute: () => '😂 *Joke:*\n\n' + pick(JOKES) },
  { name: 'quote', description: 'Get an inspirational quote', category: 'fun', usage: '.quote',
    execute: () => '💬 *Quote:*\n\n' + pick(QUOTES) },
  { name: 'fact', description: 'Get a random amazing fact', category: 'fun', usage: '.fact',
    execute: () => '🧠 *Did you know?*\n\n' + pick(FACTS) },
  { name: 'shayari', description: 'Get Urdu/Roman Urdu shayari', category: 'fun', usage: '.shayari',
    execute: () => '🎭 *Shayari:*\n\n' + pick(SHAYARI) },
  { name: 'meme', description: 'Get a text meme', category: 'fun', usage: '.meme',
    execute: () => pick(MEMES) },
  { name: 'dare', description: 'Get a fun dare', category: 'fun', usage: '.dare',
    execute: () => '🎯 *Dare:*\n\n' + pick(DARES) },
  { name: 'truth', description: 'Get a truth question', category: 'fun', usage: '.truth',
    execute: () => '🤫 *Truth:*\n\n' + pick(TRUTHS) },
  { name: '8ball', description: 'Ask the magic 8-ball', category: 'fun', usage: '.8ball <question>',
    execute: (args) => {
      if (!args.length) return '🔮 Ask me a yes/no question!\nUsage: .8ball will I be lucky today?';
      return `🔮 *Question:* ${args.join(' ')}\n*Answer:* ${pick(EIGHTBALL)}`;
    } },
  { name: 'dice', description: 'Roll a dice', category: 'fun', usage: '.dice',
    execute: () => `🎲 You rolled: *${1 + Math.floor(Math.random() * 6)}*` },
  { name: 'coin', description: 'Flip a coin', category: 'fun', usage: '.coin',
    execute: () => `🪙 Coin flip: *${pick(['Heads', 'Tails'])}*` },
  { name: 'rps', description: 'Rock paper scissors', category: 'fun', usage: '.rps <rock|paper|scissors>',
    execute: (args) => {
      const u = (args[0] || '').toLowerCase();
      if (!['rock', 'paper', 'scissors'].includes(u)) return '✊✋✌️ Usage: .rps <rock|paper|scissors>';
      const b = pick(['rock', 'paper', 'scissors']);
      const win = (u === 'rock' && b === 'scissors') || (u === 'paper' && b === 'rock') || (u === 'scissors' && b === 'paper');
      const res = u === b ? "It's a draw! 🤝" : win ? 'You win! 🎉' : 'Bot wins! 🤖';
      return `✊✋✌️ You: ${u} | Bot: ${b}\n${res}`;
    } },
  { name: 'riddle', description: 'Get a riddle', category: 'fun', usage: '.riddle',
    execute: () => { const r = pick(RIDDLES); return `🧩 *Riddle:*\n\n${r.q}\n\n||Answer: ${r.a}||`; } },
  { name: 'compliment', description: 'Get a compliment', category: 'fun', usage: '.compliment',
    execute: () => pick(COMPLIMENTS) },
  { name: 'roast', description: 'Playful friendly roast', category: 'fun', usage: '.roast',
    execute: () => '🔥 *Friendly roast (just for laughs!):*\n\n' + pick(ROASTS) },
  { name: 'love', description: 'Love compatibility meter', category: 'fun', usage: '.love <name1> <name2>',
    execute: (args) => {
      if (args.length < 2) return '💘 Usage: .love <name1> <name2>';
      const pct = Math.floor(Math.random() * 101);
      return `💘 *Love meter:* ${args[0]} ❤️ ${args[1]}\n\nCompatibility: *${pct}%* ${pct > 70 ? '💍 Perfect match!' : pct > 40 ? '💕 Good vibes!' : '🙈 Just friends?'}`;
    } },
  { name: 'luck', description: 'Check your luck today', category: 'fun', usage: '.luck',
    execute: () => `🍀 *Your luck today:* ${Math.floor(Math.random() * 101)}%\n${pick(['Aaj ka din aap ka hai! 🌟', 'Stay positive, good things are coming! ✨', 'Thodi mehnat, zyada kamyabi! 💪'])}` },
  { name: 'horoscope', description: 'Daily horoscope (for fun)', category: 'fun', usage: '.horoscope <sign>',
    execute: (args) => {
      if (!args.length) return '🔮 Usage: .horoscope <sign>\nExample: .horoscope leo\n\n*Just for fun — not real astrology!*';
      const q = args[0].toLowerCase();
      const hit = HOROSCOPES.find((h) => h.toLowerCase().includes(q));
      return hit ? `🔮 *Daily Horoscope*\n\n${hit}\n\n_(Just for fun!)_` : '❌ Sign not found. Try: aries, taurus, gemini, cancer, leo, virgo, libra, scorpio, sagittarius, capricorn, aquarius, pisces';
    } },
  { name: 'slot', description: 'Slot machine game', category: 'fun', usage: '.slot',
    execute: () => {
      const s = ['🍒', '🍋', '⭐', '💎', '🔔', '🍇'];
      const r = [pick(s), pick(s), pick(s)];
      const win = r[0] === r[1] && r[1] === r[2];
      return `🎰 *SLOTS*\n\n[ ${r.join(' | ')} ]\n\n${win ? '🎉 JACKPOT! You win!' : '🙈 Try again!'}`;
    } },
  { name: 'roll', description: 'Roll a number (1-N)', category: 'fun', usage: '.roll <max>',
    execute: (args) => {
      const max = Math.max(2, Math.min(1000000, parseInt(args[0], 10) || 100));
      return `🎲 Rolled 1–${max}: *${1 + Math.floor(Math.random() * max)}*`;
    } },
  { name: 'choose', description: 'Let the bot choose for you', category: 'fun', usage: '.choose <opt1> | <opt2> | ...',
    execute: (args) => {
      const opts = args.join(' ').split('|').map((o) => o.trim()).filter(Boolean);
      if (opts.length < 2) return '🤔 Usage: .choose pizza | biryani | burger';
      return `🎯 I choose: *${pick(opts)}*`;
    } },
  { name: 'reverse', description: 'Reverse your text', category: 'fun', usage: '.reverse <text>',
    execute: (args) => { const e = needArgs(args, '.reverse <text>'); return e || `🔄 ${reverse(args.join(' '))}`; } },
  { name: 'emojify', description: 'Convert text to emoji letters', category: 'fun', usage: '.emojify <text>',
    execute: (args) => { const e = needArgs(args, '.emojify <text>'); return e || emojify(args.join(' ')); } },
  { name: 'owo', description: 'OwO-ify your text', category: 'fun', usage: '.owo <text>',
    execute: (args) => { const e = needArgs(args, '.owo <text>'); return e || OWO(args.join(' ')); } },
  { name: 'clap', description: 'Add claps between words', category: 'fun', usage: '.clap <text>',
    execute: (args) => { const e = needArgs(args, '.clap <text>'); return e || CLAP(args.join(' ')); } },
  { name: 'mock', description: 'sPoNgEbOb mock text', category: 'fun', usage: '.mock <text>',
    execute: (args) => { const e = needArgs(args, '.mock <text>'); return e || MOCK(args.join(' ')); } },
  { name: 'tinytext', description: 'Make text tiny', category: 'fun', usage: '.tinytext <text>',
    execute: (args) => { const e = needArgs(args, '.tinytext <text>'); return e || tinytext(args.join(' ')); } },
  { name: 'asciiword', description: 'ASCII art word/animal', category: 'fun', usage: '.asciiword <cat|dog|heart>',
    execute: (args) => {
      const k = (args[0] || '').toLowerCase();
      if (!ASCII_ART[k]) return '🎨 Usage: .asciiword <cat|dog|heart>';
      return '```\n' + ASCII_ART[k] + '\n```';
    } },
  { name: 'pickup', description: 'Get a pickup line', category: 'fun', usage: '.pickup',
    execute: () => '💘 *Pickup line:*\n\n' + pick(PICKUPS) },
  { name: 'tongue', description: 'Tongue twister challenge', category: 'fun', usage: '.tongue',
    execute: () => '👅 *Tongue twister — say it 3x fast!*\n\n' + pick(TONGUES) },
  { name: 'riddle2', description: 'Another riddle', category: 'fun', usage: '.riddle2',
    execute: () => { const r = pick(RIDDLES); return `🧩 *Riddle:*\n\n${r.q}\n\nThink hard! Reply .riddle for another.\n||Answer: ${r.a}||`; } },
];

module.exports = commands;
