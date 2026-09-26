// ============================================================
// Imran Salara MD Bot — islamic commands (15)
// Free APIs: api.alquran.cloud (Quran), aladhan.com (prayer/Hijri).
// Everything else is local and works offline.
// ============================================================

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

const NAMES99 = ['Ar-Rahman','Ar-Rahim','Al-Malik','Al-Quddus','As-Salam','Al-Mu’min','Al-Muhaymin','Al-Aziz','Al-Jabbar','Al-Mutakabbir','Al-Khaliq','Al-Bari’','Al-Musawwir','Al-Ghaffar','Al-Qahhar','Al-Wahhab','Ar-Razzaq','Al-Fattah','Al-Aleem','Al-Qaabid','Al-Baasit','Al-Khaafid','Ar-Raafi’','Al-Mu’izz','Al-Muzil','As-Samee’','Al-Baseer','Al-Hakam','Al-Adl','Al-Lateef','Al-Khabeer','Al-Haleem','Al-Azeem','Al-Ghafoor','Ash-Shakoor','Al-Aliyy','Al-Kabeer','Al-Hafeez','Al-Muqeet','Al-Haseeb','Al-Jaleel','Al-Kareem','Ar-Raqeeb','Al-Mujeeb','Al-Waasi’','Al-Hakeem','Al-Wadud','Al-Majeed','Al-Ba’ith','Ash-Shaheed','Al-Haqq','Al-Wakeel','Al-Qawiyy','Al-Mateen','Al-Waliyy','Al-Hameed','Al-Muhsee','Al-Mubdi’','Al-Mu’eed','Al-Muhyee','Al-Mumeet','Al-Hayy','Al-Qayyoom','Al-Waajid','Al-Maajid','Al-Waahid','As-Samad','Al-Qaadir','Al-Muqtadir','Al-Muqaddim','Al-Mu’akhkhir','Al-Awwal','Al-Aakhir','Az-Zaahir','Al-Baatin','Al-Waali','Al-Muta’aali','Al-Barr','At-Tawwaab','Al-Muntaqim','Al-Afuww','Ar-Ra’oof','Malik-ul-Mulk','Zul-Jalaali-wal-Ikram','Al-Muqsit','Al-Jaami’','Al-Ghaniyy','Al-Mughni','Al-Maani’','Ad-Daarr','An-Naafi’','An-Noor','Al-Haadi','Al-Badee’','Al-Baaqi','Al-Waarith','Ar-Rasheed','As-Saboor'];

const HADITH = [
  '“Actions are but by intentions.” — Sahih Bukhari 1 📜',
  '“None of you truly believes until he loves for his brother what he loves for himself.” — Bukhari & Muslim 🤝',
  '“The best among you are those who learn the Quran and teach it.” — Bukhari 📖',
  '“Kindness is not found in anything except that it adds beauty to it.” — Muslim 🌸',
  '“Whoever believes in Allah and the Last Day, let him speak good or remain silent.” — Bukhari & Muslim 🤫',
  '“Make things easy and do not make them difficult.” — Bukhari ✨',
  '“The most beloved deeds to Allah are the most consistent, even if small.” — Bukhari & Muslim 💧',
  '“Smiling at your brother is charity.” — Tirmidhi 😊',
];

const DUAS = [
  { t: 'Safar ki Dua', a: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا', r: 'Subhan-alladhi sakhkhara lana hadha', m: 'Glory be to Him who subjected this (transport) for us. (Quran 43:13)' },
  { t: 'Khane se pehle', a: 'بِسْمِ اللَّهِ', r: 'Bismillah', m: 'In the name of Allah.' },
  { t: 'Neend ki Dua', a: 'اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا', r: 'Allahumma bismika amootu wa ahya', m: 'O Allah, in Your name I die and I live. (Bukhari)' },
  { t: 'Mushkil mein', a: 'اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا', r: 'Allahumma la sahla illa ma ja’altahu sahla', m: 'O Allah, nothing is easy except what You make easy.' },
  { t: 'Maghfirat ki Dua', a: 'رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ', r: 'Rabbighfir li wa tub alayya', m: 'My Lord, forgive me and accept my repentance.' },
  { t: 'Subah ki Dua', a: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ', r: 'Asbahna wa asbahal-mulku lillah', m: 'We have reached the morning, and sovereignty belongs to Allah.' },
];

const SEERAT = [
  'The Prophet Muhammad ﷺ was born in Makkah in 570 CE (Year of the Elephant). 🕋',
  'He ﷺ received the first revelation in the Cave of Hira at age 40. ⛰️',
  'The Hijrah (migration to Madinah) in 622 CE marks the start of the Islamic calendar. 🌙',
  'He ﷺ was known as Al-Ameen (the Trustworthy) even before prophethood. 🤝',
  'The Farewell Sermon emphasized equality: no Arab is superior to a non-Arab. 🕊️',
];

const tasbihCounts = {};

const commands = [
  { name: 'quran', description: 'Read a Quran verse (free API)', category: 'islamic', usage: '.quran <surah:ayah>  (e.g. .quran 2:255)',
    execute: async (args) => {
      const ref = args[0] || '2:255';
      if (!/^\d+:\d+$/.test(ref)) return '📖 Usage: .quran <surah:ayah>\nExample: .quran 2:255  (Ayat-ul-Kursi)';
      try {
        const [s, a] = ref.split(':');
        const d = await fetchJson(`https://api.alquran.cloud/v1/ayah/${s}:${a}/editions/quran-uthmani,en.sahih`);
        const ar = d.data.find((x) => x.edition.identifier === 'quran-uthmani');
        const en = d.data.find((x) => x.edition.identifier === 'en.sahih');
        return `📖 *Quran ${ar.surah.englishName} (${ar.surah.number}:${ar.numberInSurah})*\n\n${ar.text}\n\n_English:_ ${en.text}`;
      } catch { return '❌ Could not fetch that verse. Check the reference, e.g. .quran 36:1'; }
    } },
  { name: 'hadith', description: 'Get a hadith', category: 'islamic', usage: '.hadith',
    execute: () => '📜 *Hadith of the moment:*\n\n' + HADITH[Math.floor(Math.random() * HADITH.length)] },
  { name: 'prayer', description: 'Prayer timings for a city', category: 'islamic', usage: '.prayer <city>  (e.g. .prayer Karachi)',
    execute: async (args) => {
      const city = args.join(' ') || 'Karachi';
      try {
        const d = await fetchJson(`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=Pakistan&method=1`);
        const t = d.data.timings;
        return `🕌 *Prayer times — ${city}* (${d.data.date.hijri.day} ${d.data.date.hijri.month.en} ${d.data.date.hijri.year} AH)\n\n🌅 Fajr: ${t.Fajr}\n🌞 Sunrise: ${t.Sunrise}\n☀️ Dhuhr: ${t.Dhuhr}\n🌤️ Asr: ${t.Asr}\n🌇 Maghrib: ${t.Maghrib}\n🌙 Isha: ${t.Isha}`;
      } catch { return '❌ Could not fetch prayer times. Check the city name.'; }
    } },
  { name: 'qibla', description: 'Qibla direction info', category: 'islamic', usage: '.qibla',
    execute: () => `🧭 *Qibla Direction*\n\nThe Qibla (Kaaba in Makkah 🕋) is roughly:\n• Pakistan/India → *West (slightly north-west)*\n• UK/Europe → *South-East*\n• USA → *North-East*\n\n📱 For exact degrees, use a compass app or:\nhttps://qiblafinder.withgoogle.com` },
  { name: 'dua', description: 'Daily duas with meaning', category: 'islamic', usage: '.dua [number]',
    execute: (args) => {
      const n = parseInt(args[0], 10);
      const d = (!isNaN(n) && DUAS[n - 1]) ? DUAS[n - 1] : DUAS[Math.floor(Math.random() * DUAS.length)];
      const idx = DUAS.indexOf(d) + 1;
      return `🤲 *Dua #${idx} — ${d.t}*\n\n${d.a}\n\n_Roman:_ ${d.r}\n_Meaning:_ ${d.m}\n\n_Try .dua 1 to .dua ${DUAS.length}_`;
    } },
  { name: 'names99', description: "Allah's 99 names (paginated)", category: 'islamic', usage: '.names99 [page 1-5]',
    execute: (args) => {
      const page = Math.max(1, Math.min(5, parseInt(args[0], 10) || 1));
      const slice = NAMES99.slice((page - 1) * 20, page * 20);
      return `✨ *99 Names of Allah — page ${page}/5*\n\n${slice.map((n, i) => `${(page - 1) * 20 + i + 1}. ${n}`).join('\n')}\n\n_Next: .names99 ${page < 5 ? page + 1 : 1}_`;
    } },
  { name: 'hijri', description: "Today's Hijri date", category: 'islamic', usage: '.hijri',
    execute: async () => {
      try {
        const now = new Date();
        const dd = String(now.getDate()).padStart(2, '0');
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const d = await fetchJson(`https://api.aladhan.com/v1/gToH?date=${dd}-${mm}-${now.getFullYear()}`);
        const h = d.data.hijri;
        return `🌙 *Hijri date:* ${h.day} ${h.month.en} ${h.year} AH\n📅 Gregorian: ${d.data.gregorian.date}`;
      } catch { return '❌ Could not fetch Hijri date right now.'; }
    } },
  { name: 'tasbih', description: 'Digital tasbih counter', category: 'islamic', usage: '.tasbih [add|reset]',
    execute: (args, ctx) => {
      const sub = (args[0] || 'add').toLowerCase();
      if (sub === 'reset') { tasbihCounts[ctx.from] = 0; return '📿 Tasbih counter reset to 0.'; }
      tasbihCounts[ctx.from] = (tasbihCounts[ctx.from] || 0) + 1;
      const c = tasbihCounts[ctx.from];
      const milestone = c % 100 === 0 ? '\n🎉 MashaAllah! 100 reached!' : c % 33 === 0 ? '\n✨ 33 — one tasbih set complete!' : '';
      return `📿 *Tasbih count:* ${c}${milestone}\n\n_Use .tasbih to add 1, .tasbih reset to restart._`;
    } },
  { name: 'zakat', description: 'Zakat calculator (2.5%)', category: 'islamic', usage: '.zakat <amount>',
    execute: (args) => {
      const amt = parseFloat(args[0]);
      if (isNaN(amt) || amt < 0) return '💰 Usage: .zakat <amount>\nExample: .zakat 100000';
      const zakat = amt * 0.025;
      return `💰 *Zakat calculation*\n\n💵 Total wealth: ${amt.toLocaleString()}\n📤 Zakat (2.5%): *${zakat.toLocaleString()}*\n\n_Nisab ≈ value of 87.48g gold / 612.36g silver. Consult a scholar for details._`;
    } },
  { name: 'seerat', description: 'Seerah facts', category: 'islamic', usage: '.seerat',
    execute: () => '🕌 *Seerat-un-Nabi ﷺ:*\n\n' + SEERAT[Math.floor(Math.random() * SEERAT.length)] },
  { name: 'wazifa', description: 'Daily wazaif guidance', category: 'islamic', usage: '.wazifa',
    execute: () => `📿 *Daily Wazaif (general guidance)*\n\n• Subah/shaam: Ayat-ul-Kursi (2:255)\n• 100x: SubhanAllahi wa bihamdihi 🌅\n• 100x: Astaghfirullah 🤲\n• Darood Shareef kasrat se\n\n_Note: For specific wazaif, consult a trusted scholar._` },
  { name: 'ramadan', description: 'Ramadan info', category: 'islamic', usage: '.ramadan',
    execute: () => `🌙 *Ramadan*\n\nThe holy month of fasting — one of the Five Pillars of Islam.\n\n• Fast: dawn (Fajr) to sunset (Maghrib)\n• Taraweeh prayers at night 🕌\n• Laylat-ul-Qadr: the Night of Decree, better than 1000 months ✨\n\n_For this year’s Sehri/Iftari times, use: .prayer <city>_` },
  { name: 'hajjinfo', description: 'Hajj information', category: 'islamic', usage: '.hajjinfo',
    execute: () => `🕋 *Hajj — the pilgrimage*\n\n• The 5th pillar of Islam, obligatory once in a lifetime if able.\n• Performed in Dhul-Hijjah in Makkah.\n• Key rites: Ihram → Tawaf → Sa’i → Mina → Arafat → Muzdalifah → Rami → Qurbani → Tawaf.\n\n📌 Always apply through your country’s *official* Hajj authority — beware of scams.` },
  { name: 'masjidinfo', description: 'Find mosques near you', category: 'islamic', usage: '.masjidinfo <city>',
    execute: (args) => {
      const q = args.join(' ') || 'your city';
      return `🕌 *Find mosques in ${q}:*\n\n• Google Maps: https://www.google.com/maps/search/mosque+near+${encodeURIComponent(q)}\n• Prayer times: .prayer ${args.join(' ') || '<city>'}\n\n_May Allah accept your prayers. 🤲_`;
    } },
  { name: 'darood', description: 'Darood Shareef text', category: 'islamic', usage: '.darood',
    execute: () => `🤲 *Darood-e-Ibrahimi*\n\nاللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ\n\nاللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ\n\n_“Whoever sends blessings upon me once, Allah sends blessings upon him tenfold.” — Muslim ﷺ_` },
];

module.exports = commands;
