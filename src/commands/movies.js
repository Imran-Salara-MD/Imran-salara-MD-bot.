// ============================================================
// Imran Salara MD Bot — movie commands (15)
// Info only: OMDB API when OMDB_API_KEY is set, graceful otherwise.
// Watchlist is per-user and in-memory (resets on restart).
// No pirated download links — ever.
// ============================================================

const watchlists = {};
const myList = (from) => {
  if (!watchlists[from]) watchlists[from] = [];
  return watchlists[from];
};

async function omdb(params) {
  const key = process.env.OMDB_API_KEY;
  if (!key) return { noKey: true };
  const url = `https://www.omdbapi.com/?apikey=${key}&${params}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.Response === 'False') return { error: data.Error || 'Not found' };
  return { data };
}

const fmtTitle = (d) =>
  `🎬 *${d.Title}* (${d.Year})\n\n⭐ IMDb: ${d.imdbRating || 'N/A'}\n🎭 Genre: ${d.Genre || 'N/A'}\n🎥 Director: ${d.Director || 'N/A'}\n🌟 Cast: ${(d.Actors || 'N/A').slice(0, 120)}\n\n📝 ${((d.Plot || 'No plot available.').slice(0, 500))}\n\n⚖️ Watch legally on Netflix / Prime Video / Disney+ Hotstar.`;

const noKeyMsg = (what) =>
  `🎬 *${what}*\n\n🔑 Movie info needs a free OMDB API key.\nAsk the bot owner to set OMDB_API_KEY (free at omdbapi.com).\n\nMeanwhile try: .trending .topmovies .recommend`;

const MOVIE_QUOTES = [
  '"May the Force be with you." — Star Wars 🌌',
  '"Life is like a box of chocolates." — Forrest Gump 🍫',
  '"Why so serious?" — The Dark Knight 🃏',
  '"Just keep swimming." — Finding Nemo 🐠',
  '"To infinity and beyond!" — Toy Story 🚀',
  '"Kehte hain agar kisi cheez ko dil se chaho, to poori kainat use tumse milane ki koshish mein lag jaati hai." — Om Shanti Om ✨',
];

const RECOMMEND = {
  action: ['Mad Max: Fury Road', 'John Wick', 'The Dark Knight', 'Gladiator'],
  comedy: ['The Hangover', '3 Idiots', 'Dumb and Dumber', 'Hera Pheri'],
  drama: ['The Shawshank Redemption', 'Forrest Gump', 'Taare Zameen Par', 'The Pursuit of Happyness'],
  horror: ['The Conjuring', 'A Quiet Place', 'Tumbbad', 'Get Out'],
  scifi: ['Interstellar', 'Inception', 'Dune', 'The Matrix'],
  romance: ['Titanic', 'The Notebook', 'Veer-Zaara', 'La La Land'],
  animated: ['Coco', 'Spirited Away', 'Toy Story', 'Zootopia'],
};

const TRENDING = ['Dune: Part Two', 'Oppenheimer', 'Jawan', 'Animal', '12th Fail', 'Spider-Man: Across the Spider-Verse', 'Pathaan', 'Gadar 2'];
const TOP_MOVIES = ['The Shawshank Redemption (9.3)', 'The Godfather (9.2)', 'The Dark Knight (9.0)', '12 Angry Men (9.0)', 'Schindler’s List (9.0)', 'Pulp Fiction (8.9)', 'Inception (8.8)', 'Fight Club (8.8)'];
const UPCOMING = '📅 *Upcoming releases (sample list):*\n\n• Check your local cinema listings or:\n• https://www.imdb.com/calendar/\n• https://www.rottentomatoes.com/browse/movies_at_home\n\n⚖️ Always watch via official cinemas & streaming services.';
const BOXOFFICE = '💰 *All-time box office (sample):*\n\n1. Avatar (~$2.9B)\n2. Avengers: Endgame (~$2.8B)\n3. Avatar: The Way of Water (~$2.3B)\n4. Titanic (~$2.26B)\n5. Jurassic World (~$1.67B)\n\n_(Approximate worldwide grosses)_';

const commands = [
  { name: 'movie', description: 'Movie details (OMDB)', category: 'movies', usage: '.movie <title>',
    execute: async (args) => {
      if (!args.length) return '🎬 Usage: .movie <title>\nExample: .movie Inception';
      const r = await omdb(`t=${encodeURIComponent(args.join(' '))}`).catch(() => ({ error: 'API error' }));
      if (r.noKey) return noKeyMsg('Movie info');
      if (r.error) return `❌ ${r.error}`;
      return fmtTitle(r.data);
    } },
  { name: 'series', description: 'TV series details (OMDB)', category: 'movies', usage: '.series <title>',
    execute: async (args) => {
      if (!args.length) return '📺 Usage: .series <title>\nExample: .series Breaking Bad';
      const r = await omdb(`t=${encodeURIComponent(args.join(' '))}&type=series`).catch(() => ({ error: 'API error' }));
      if (r.noKey) return noKeyMsg('Series info');
      if (r.error) return `❌ ${r.error}`;
      return fmtTitle(r.data);
    } },
  { name: 'anime', description: 'Anime details (OMDB)', category: 'movies', usage: '.anime <title>',
    execute: async (args) => {
      if (!args.length) return '⛩️ Usage: .anime <title>\nExample: .anime Naruto';
      const r = await omdb(`t=${encodeURIComponent(args.join(' '))}`).catch(() => ({ error: 'API error' }));
      if (r.noKey) return noKeyMsg('Anime info');
      if (r.error) return `❌ ${r.error}`;
      return fmtTitle(r.data) + '\n\n💡 Also browse legally on Crunchyroll / Muse Asia (YouTube).';
    } },
  { name: 'actor', description: 'Actor filmography search (OMDB)', category: 'movies', usage: '.actor <name>',
    execute: async (args) => {
      if (!args.length) return '🌟 Usage: .actor <name>\nExample: .actor Shah Rukh Khan';
      const r = await omdb(`s=${encodeURIComponent(args.join(' '))}`).catch(() => ({ error: 'API error' }));
      if (r.noKey) return noKeyMsg('Actor search');
      if (r.error) return `❌ ${r.error}`;
      const list = (r.data.Search || []).slice(0, 8).map((m) => `• ${m.Title} (${m.Year}) [${m.Type}]`).join('\n');
      return `🌟 *Results for "${args.join(' ')}":*\n\n${list || 'No results.'}`;
    } },
  { name: 'trending', description: 'Trending movies (sample list)', category: 'movies', usage: '.trending',
    execute: () => `🔥 *Trending movies (sample):*\n\n${TRENDING.map((m, i) => `${i + 1}. ${m}`).join('\n')}\n\n⚖️ Watch on official streaming platforms.` },
  { name: 'topmovies', description: 'Top rated movies of all time', category: 'movies', usage: '.topmovies',
    execute: () => `🏆 *Top movies of all time (IMDb-style sample):*\n\n${TOP_MOVIES.map((m, i) => `${i + 1}. ${m}`).join('\n')}` },
  { name: 'upcoming', description: 'Upcoming releases info', category: 'movies', usage: '.upcoming',
    execute: () => UPCOMING },
  { name: 'moviequote', description: 'Famous movie quote', category: 'movies', usage: '.moviequote',
    execute: () => '🎬 *Movie quote:*\n\n' + MOVIE_QUOTES[Math.floor(Math.random() * MOVIE_QUOTES.length)] },
  { name: 'recommend', description: 'Get a movie recommendation', category: 'movies', usage: '.recommend <action|comedy|drama|horror|scifi|romance|animated>',
    execute: (args) => {
      const g = (args[0] || '').toLowerCase();
      if (!RECOMMEND[g]) return '🎲 Usage: .recommend <genre>\nGenres: action, comedy, drama, horror, scifi, romance, animated';
      const list = RECOMMEND[g];
      return `🎬 *Recommended ${g} movie:* *${list[Math.floor(Math.random() * list.length)]}*\n\n⚖️ Available on official streaming platforms. Enjoy! 🍿`;
    } },
  { name: 'watchlistadd', description: 'Add movie to your watchlist', category: 'movies', usage: '.watchlistadd <title>',
    execute: (args, ctx) => {
      if (!args.length) return '📌 Usage: .watchlistadd <title>';
      const list = myList(ctx.from);
      list.push(args.join(' '));
      return `📌 Added to your watchlist (#${list.length}): *${args.join(' ')}*`;
    } },
  { name: 'watchlist', description: 'Show your watchlist', category: 'movies', usage: '.watchlist',
    execute: (args, ctx) => {
      const list = myList(ctx.from);
      if (!list.length) return '📌 Your watchlist is empty. Add with: .watchlistadd <title>';
      return '📌 *Your watchlist:*\n\n' + list.map((t, i) => `${i + 1}. ${t}`).join('\n');
    } },
  { name: 'watchlistremove', description: 'Remove from watchlist', category: 'movies', usage: '.watchlistremove <number>',
    execute: (args, ctx) => {
      const list = myList(ctx.from);
      const n = parseInt(args[0], 10);
      if (!list[n - 1]) return '❌ Number not found. See .watchlist';
      const removed = list.splice(n - 1, 1)[0];
      return `🗑️ Removed from watchlist: *${removed}*`;
    } },
  { name: 'genre', description: 'Browse movies by genre', category: 'movies', usage: '.genre <genre>',
    execute: (args) => {
      const g = (args[0] || '').toLowerCase();
      if (!RECOMMEND[g]) return '🎭 Usage: .genre <genre>\nGenres: action, comedy, drama, horror, scifi, romance, animated';
      return `🎭 *${g.toUpperCase()} movies:*\n\n${RECOMMEND[g].map((m) => `• ${m}`).join('\n')}\n\n⚖️ Watch legally on official platforms.`;
    } },
  { name: 'boxoffice', description: 'All-time box office (sample)', category: 'movies', usage: '.boxoffice',
    execute: () => BOXOFFICE },
  { name: 'comingsoon', description: 'Coming soon info', category: 'movies', usage: '.comingsoon',
    execute: () => UPCOMING },
];

module.exports = commands;
