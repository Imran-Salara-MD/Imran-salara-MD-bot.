// ============================================================
// Imran Salara MD Bot — downloader INFO commands (20)
// IMPORTANT: These commands respect copyright. They NEVER provide
// pirated downloads. They return official links, search pages, or
// public info, and say so clearly in every reply.
// ============================================================

const legal = (service, text) =>
  `⚖️ *Copyright note:* I can’t download ${service} content (it belongs to its creators). Here’s the legal way instead:\n\n${text}`;

const commands = [
  { name: 'tiktok', description: 'TikTok video info (legal links)', category: 'downloaders', usage: '.tiktok <search words>',
    execute: (args) => {
      const q = args.join(' ');
      if (!q) return '🎵 Usage: .tiktok <search words>';
      return legal('TikTok videos', `🔍 Search officially:\nhttps://www.tiktok.com/search?q=${encodeURIComponent(q)}\n\n💡 To save a video, use the TikTok app’s own Share → Save option (only when the creator allows it).`);
    } },
  { name: 'ytmp3info', description: 'How to get YouTube audio legally', category: 'downloaders', usage: '.ytmp3info <song name>',
    execute: (args) => {
      const q = args.join(' ');
      if (!q) return '🎧 Usage: .ytmp3info <song name>';
      return legal('YouTube audio rips', `🎧 Listen officially:\n• YouTube Music: https://music.youtube.com/search?q=${encodeURIComponent(q)}\n• Spotify: https://open.spotify.com/search/${encodeURIComponent(q)}\n\n💡 YouTube Premium lets you download for offline listening legally.`);
    } },
  { name: 'ytmp4info', description: 'How to watch YouTube videos legally', category: 'downloaders', usage: '.ytmp4info <video name>',
    execute: (args) => {
      const q = args.join(' ');
      if (!q) return '📺 Usage: .ytmp4info <video name>';
      return legal('YouTube video rips', `📺 Watch officially:\nhttps://www.youtube.com/results?search_query=${encodeURIComponent(q)}\n\n💡 YouTube Premium allows legal offline downloads in the app.`);
    } },
  { name: 'youtube', description: 'YouTube search link', category: 'downloaders', usage: '.youtube <search>',
    execute: (args) => {
      const q = args.join(' ');
      if (!q) return '📺 Usage: .youtube <search>';
      return `📺 *YouTube search:*\nhttps://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
    } },
  { name: 'insta', description: 'Instagram post info (legal links)', category: 'downloaders', usage: '.insta <search words>',
    execute: (args) => {
      const q = args.join(' ');
      if (!q) return '📸 Usage: .insta <search words>';
      return legal('Instagram media', `📸 Browse officially:\nhttps://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(q)}\n\n💡 Creators can enable downloads in the Instagram app itself.`);
    } },
  { name: 'fbdl', description: 'Facebook video info (legal links)', category: 'downloaders', usage: '.fbdl <search words>',
    execute: (args) => {
      const q = args.join(' ');
      if (!q) return '📘 Usage: .fbdl <search words>';
      return legal('Facebook videos', `📘 Watch officially:\nhttps://www.facebook.com/watch/search/?q=${encodeURIComponent(q)}`);
    } },
  { name: 'twitterdl', description: 'X/Twitter media info (legal links)', category: 'downloaders', usage: '.twitterdl <search words>',
    execute: (args) => {
      const q = args.join(' ');
      if (!q) return '🐦 Usage: .twitterdl <search words>';
      return legal('X/Twitter media', `🐦 Search officially:\nhttps://x.com/search?q=${encodeURIComponent(q)}&src=typed_query`);
    } },
  { name: 'pinterest', description: 'Pinterest search link', category: 'downloaders', usage: '.pinterest <search>',
    execute: (args) => {
      const q = args.join(' ');
      if (!q) return '📌 Usage: .pinterest <search>';
      return `📌 *Pinterest search:*\nhttps://www.pinterest.com/search/pins/?q=${encodeURIComponent(q)}`;
    } },
  { name: 'song', description: 'Find a song on legal platforms', category: 'downloaders', usage: '.song <song name>',
    execute: (args) => {
      const q = args.join(' ');
      if (!q) return '🎵 Usage: .song <song name>';
      return `🎵 *Listen to "${q}" legally:*\n\n🟢 Spotify: https://open.spotify.com/search/${encodeURIComponent(q)}\n🔴 YouTube Music: https://music.youtube.com/search?q=${encodeURIComponent(q)}\n🟣 SoundCloud: https://soundcloud.com/search?q=${encodeURIComponent(q)}`;
    } },
  { name: 'lyrics', description: 'Find lyrics on legal sites', category: 'downloaders', usage: '.lyrics <song name>',
    execute: (args) => {
      const q = args.join(' ');
      if (!q) return '🎤 Usage: .lyrics <song name>';
      return `🎤 *Lyrics for "${q}" (licensed sources):*\n\n• Genius: https://genius.com/search?q=${encodeURIComponent(q)}\n• Spotify / YouTube Music show licensed lyrics in-app.\n\n⚖️ I don’t copy full copyrighted lyrics — these sites pay the artists.`;
    } },
  { name: 'wallpaper', description: 'Free wallpaper image', category: 'downloaders', usage: '.wallpaper',
    execute: () => ({
      text: '🖼️ *Here’s a free wallpaper (Unsplash/Picsum — free to use):*',
      image: `https://picsum.photos/seed/${Date.now() % 100000}/800/1200`,
    }) },
  { name: 'ringtone', description: 'Ringtone info (legal sources)', category: 'downloaders', usage: '.ringtone <search>',
    execute: (args) => {
      const q = args.join(' ') || 'trending';
      return legal('copyrighted ringtones', `🔔 Royalty-free ringtones:\n• https://pixabay.com/sound-effects/search/${encodeURIComponent(q)}/\n• Zedge app (licensed tones)\n\n💡 Pixabay sounds are free for commercial use.`);
    } },
  { name: 'stickerinfo', description: 'How WhatsApp stickers work', category: 'downloaders', usage: '.stickerinfo',
    execute: () => `🎭 *WhatsApp Stickers*\n\nThis bot runs on the official Cloud API, which doesn’t support sending sticker packs directly.\n\n💡 Get stickers free & legally:\n1. Open any chat → emoji icon → Stickers → “+”\n2. Or use the *Sticker Maker* app by WhatsApp.\n\nAll sticker packs there are licensed for use. ✅` },
  { name: 'apk', description: 'APK safety info', category: 'downloaders', usage: '.apk <app name>',
    execute: (args) => {
      const q = args.join(' ');
      if (!q) return '📦 Usage: .apk <app name>';
      return `⚠️ *APK safety warning:* Downloading APKs from random sites can install malware and is often piracy.\n\n✅ Safe way to get "${q}":\nhttps://play.google.com/store/search?q=${encodeURIComponent(q)}&c=apps\n\nAlways use the Play Store or the developer’s official site.`;
    } },
  { name: 'spotifyinfo', description: 'Spotify search link', category: 'downloaders', usage: '.spotifyinfo <search>',
    execute: (args) => {
      const q = args.join(' ');
      if (!q) return '🟢 Usage: .spotifyinfo <search>';
      return `🟢 *Spotify search:*\nhttps://open.spotify.com/search/${encodeURIComponent(q)}\n\n💡 Spotify Free lets you stream legally with ads.`;
    } },
  { name: 'soundcloud', description: 'SoundCloud search link', category: 'downloaders', usage: '.soundcloud <search>',
    execute: (args) => {
      const q = args.join(' ');
      if (!q) return '🟣 Usage: .soundcloud <search>';
      return `🟣 *SoundCloud search:*\nhttps://soundcloud.com/search?q=${encodeURIComponent(q)}\n\n💡 Many artists allow free downloads right on their track pages.`;
    } },
  { name: 'dailymotion', description: 'Dailymotion search link', category: 'downloaders', usage: '.dailymotion <search>',
    execute: (args) => {
      const q = args.join(' ');
      if (!q) return '▶️ Usage: .dailymotion <search>';
      return `▶️ *Dailymotion search:*\nhttps://www.dailymotion.com/search/${encodeURIComponent(q)}`;
    } },
  { name: 'vimeo', description: 'Vimeo search link', category: 'downloaders', usage: '.vimeo <search>',
    execute: (args) => {
      const q = args.join(' ');
      if (!q) return '🎞️ Usage: .vimeo <search>';
      return `🎞️ *Vimeo search:*\nhttps://vimeo.com/search?q=${encodeURIComponent(q)}\n\n💡 Vimeo creators often allow downloads on their own videos.`;
    } },
  { name: 'rumble', description: 'Rumble search link', category: 'downloaders', usage: '.rumble <search>',
    execute: (args) => {
      const q = args.join(' ');
      if (!q) return '🎥 Usage: .rumble <search>';
      return `🎥 *Rumble search:*\nhttps://rumble.com/search/video?q=${encodeURIComponent(q)}`;
    } },
  { name: 'mediafire', description: 'MediaFire safety info', category: 'downloaders', usage: '.mediafire <search>',
    execute: (args) => {
      const q = args.join(' ') || 'files';
      return `⚠️ *MediaFire note:* It’s a file host — files there may be pirated or contain malware.\n\n✅ Safer alternatives for "${q}":\n• Google Drive / Dropbox (your own files)\n• https://archive.org (free legal library)\n\n⚖️ Only download files you have the rights to.`;
    } },
];

module.exports = commands;
