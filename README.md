# 🤖 Imran Salara MD Bot

**Imran Salara MD Bot** is a WhatsApp chatbot built **only** on the official
**WhatsApp Business Cloud API (Meta Graph API)**. No Baileys, no Venom, no
unofficial automation libraries — just clean, ban-safe, Meta-approved code.

✨ **150 dot-commands** across 7 categories + **AI auto-reply fallback**
that answers in the *same language/script* you write in
(Urdu 🇵🇰 • Roman Urdu • English 🇬🇧).

---

## ✨ Features

- 🤖 **150 dot-commands** — general, fun, tools, downloaders, movies, Islamic, AI
- 🧠 **AI auto-reply** — any plain message gets an intelligent reply
  (OpenAI-compatible endpoint; graceful fallback when not configured)
- 🕌 Islamic tools — Quran verses, hadith, prayer times, duas, 99 names, tasbih counter, zakat calculator
- 🎬 Movie info via OMDB (free key) + legal watchlists
- 🛠️ 30 utilities — calculator, QR codes, translate, Wikipedia, currency, passwords & more
- ⚖️ **Copyright-respecting** — downloader commands return official/legal links only, never pirated content
- 🚀 Deploy-ready for **Heroku** (`Procfile` included) and **GitHub**

---

## 📋 Requirements

- Node.js **18+**
- A **Meta Developer** account (free)
- A WhatsApp Business test number (free from Meta) or your own WhatsApp Business number

---

## 🔧 Meta Developer Setup

1. Go to **https://developers.facebook.com** → *Create App* → choose **Business**.
2. In the app dashboard, click **Add Product** → **WhatsApp** → *Set up*.
3. Under **API Setup**:
   - Copy your **Phone number ID** → `PHONE_NUMBER_ID`
   - Create a **temporary access token** (or a permanent system-user token) → `WHATSAPP_TOKEN`
   - Note the **test phone number** Meta gives you.
4. Under **Configuration** → **Webhook**:
   - **Callback URL:** `https://<your-heroku-app>.herokuapp.com/webhook`
   - **Verify token:** the same value you set as `VERIFY_TOKEN` in your env
   - Click **Verify and save**, then **Subscribe** to the `messages` field.
5. Send a WhatsApp message to the test number — the bot will reply! 🎉

> 💡 For production, replace the temporary token (expires in 24h) with a
> permanent token from a Meta **System User** with `whatsapp_business_messaging` permission.

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VERIFY_TOKEN` | ✅ | Secret you invent; Meta echoes it back during webhook verification |
| `WHATSAPP_TOKEN` | ✅ | WhatsApp Cloud API access token |
| `PHONE_NUMBER_ID` | ✅ | Phone Number ID from the WhatsApp API Setup page |
| `PORT` | ✅ | Server port (Heroku sets this automatically; default `3000`) |
| `OWNER_NAME` | ⬜ | Shown in `.owner` / `.info` (default: `Imran Salara`) |
| `AI_API_URL` | ⬜ | OpenAI-compatible base URL (e.g. `https://api.openai.com/v1`) |
| `AI_API_KEY` | ⬜ | API key for AI auto-reply (leave empty to disable AI) |
| `AI_MODEL` | ⬜ | Model name (default: `gpt-4o-mini`) |
| `OMDB_API_KEY` | ⬜ | Free key from omdbapi.com for `.movie` / `.series` / `.anime` / `.actor` |
| `WEATHER_API_KEY` | ⬜ | Free key from openweathermap.org for `.weather` |
| `NEWS_API_KEY` | ⬜ | Reserved for future news features |

Copy `.env.example` → `.env` and fill in your values for local development.

---

## 💻 Run Locally

```bash
npm install
cp .env.example .env   # then edit .env with your values
node src/index.js
```

For webhook testing on your machine, expose it with a tunnel:

```bash
npx localtunnel --port 3000
# use the https URL it prints as your Meta webhook Callback URL
```

---

## ⬆️ Push to GitHub

```bash
cd imran-salara-bot
git init
git add .
git commit -m "Imran Salara MD Bot v1.0.0"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/imran-salara-md-bot.git
git push -u origin main
```

> ⚠️ Never commit your real `.env` file. `.env.example` is the safe template.

---

## 🚀 Deploy to Heroku

```bash
heroku create imran-salara-md-bot
heroku config:set VERIFY_TOKEN=your-verify-token
heroku config:set WHATSAPP_TOKEN=your-whatsapp-token
heroku config:set PHONE_NUMBER_ID=your-phone-number-id
heroku config:set OWNER_NAME="Imran Salara"
heroku config:set AI_API_URL=https://api.openai.com/v1
heroku config:set AI_API_KEY=your-ai-key
heroku config:set AI_MODEL=gpt-4o-mini
heroku config:set OMDB_API_KEY=your-omdb-key
heroku config:set WEATHER_API_KEY=your-weather-key

git push heroku main
heroku logs --tail
```

Then set your Meta webhook **Callback URL** to:

```
https://imran-salara-md-bot.herokuapp.com/webhook
```

---

## 📜 All 150 Commands

### ⚙️ General (20)

| Command | Description | Usage |
|---|---|---|
| .ping | Check if the bot is alive | `.ping` |
| .menu | Show the full command menu | `.menu` |
| .list | Compact list of all commands | `.list` |
| .help | Get help for a command | `.help <command>` |
| .info | About this bot | `.info` |
| .owner | Contact the bot owner | `.owner` |
| .bot | Bot identity card | `.bot` |
| .alive | Is the bot running? | `.alive` |
| .runtime | Show bot runtime | `.runtime` |
| .uptime | Show bot uptime | `.uptime` |
| .speed | Test response speed | `.speed` |
| .version | Show bot version | `.version` |
| .stats | Bot statistics | `.stats` |
| .id | Show your WhatsApp ID | `.id` |
| .me | Who are you to the bot? | `.me` |
| .link | Get useful links | `.link` |
| .rules | Bot usage rules | `.rules` |
| .donate | Support the bot | `.donate` |
| .support | Get support info | `.support` |
| .prefix | Show the command prefix | `.prefix` |

### 🎉 Fun (30)

| Command | Description | Usage |
|---|---|---|
| .joke | Get a random joke | `.joke` |
| .quote | Get an inspirational quote | `.quote` |
| .fact | Get a random amazing fact | `.fact` |
| .shayari | Get Urdu/Roman Urdu shayari | `.shayari` |
| .meme | Get a text meme | `.meme` |
| .dare | Get a fun dare | `.dare` |
| .truth | Get a truth question | `.truth` |
| .8ball | Ask the magic 8-ball | `.8ball <question>` |
| .dice | Roll a dice | `.dice` |
| .coin | Flip a coin | `.coin` |
| .rps | Rock paper scissors | `.rps <rock|paper|scissors>` |
| .riddle | Get a riddle | `.riddle` |
| .compliment | Get a compliment | `.compliment` |
| .roast | Playful friendly roast | `.roast` |
| .love | Love compatibility meter | `.love <name1> <name2>` |
| .luck | Check your luck today | `.luck` |
| .horoscope | Daily horoscope (for fun) | `.horoscope <sign>` |
| .slot | Slot machine game | `.slot` |
| .roll | Roll a number (1-N) | `.roll <max>` |
| .choose | Let the bot choose for you | `.choose <opt1> | <opt2> | ...` |
| .reverse | Reverse your text | `.reverse <text>` |
| .emojify | Convert text to emoji letters | `.emojify <text>` |
| .owo | OwO-ify your text | `.owo <text>` |
| .clap | Add claps between words | `.clap <text>` |
| .mock | sPoNgEbOb mock text | `.mock <text>` |
| .tinytext | Make text tiny | `.tinytext <text>` |
| .asciiword | ASCII art word/animal | `.asciiword <cat|dog|heart>` |
| .pickup | Get a pickup line | `.pickup` |
| .tongue | Tongue twister challenge | `.tongue` |
| .riddle2 | Another riddle | `.riddle2` |

### 🛠️ Tools (30)

| Command | Description | Usage |
|---|---|---|
| .calc | Calculate a math expression | `.calc 12*8+5` |
| .qr | Generate a QR code image | `.qr <text>` |
| .translate | Translate text (free API) | `.translate <lang> <text>  (e.g. .translate ur hello)` |
| .wiki | Wikipedia summary | `.wiki <topic>` |
| .define | English word definition | `.define <word>` |
| .weather | Current weather for a city | `.weather <city>` |
| .time | Current time | `.time [timezone]` |
| .date | Today's date | `.date` |
| .currency | Convert currency (free rates) | `.currency <amount> <from> <to>  (e.g. .currency 100 USD PKR)` |
| .password | Generate a strong password | `.password [length]` |
| .uuid | Generate a UUID | `.uuid` |
| .base64enc | Encode text to Base64 | `.base64enc <text>` |
| .base64dec | Decode Base64 text | `.base64dec <base64>` |
| .urlencode | URL-encode text | `.urlencode <text>` |
| .urldecode | URL-decode text | `.urldecode <text>` |
| .morse | Text ⇄ Morse code | `.morse <text>  or  .morse decode <code>` |
| .binary | Convert text to binary | `.binary <text>` |
| .hex | Convert text to hex | `.hex <text>` |
| .charcount | Count characters | `.charcount <text>` |
| .wordcount | Count words | `.wordcount <text>` |
| .color | Random color with hex code | `.color` |
| .ipinfo | Look up an IP address (free API) | `.ipinfo <ip>` |
| .timer | Set a quick timer (max 60 min) | `.timer <minutes> [label]` |
| .reminder | Remind yourself later (max 24h) | `.reminder <minutes> <message>` |
| .note | Save / list / clear notes | `.note add <text> | .note list | .note clear` |
| .todo | To-do list manager | `.todo add <task> | .todo list | .todo done <n> | .todo clear` |
| .poll | Create a simple poll | `.poll <question> | <opt1> | <opt2> ...` |
| .langdetect | Detect Urdu / Roman Urdu / English | `.langdetect <text>` |
| .hash | SHA-256 / MD5 hash of text | `.hash [md5] <text>` |
| .caseconv | Change text case | `.caseconv <upper|lower|title> <text>` |

### ⬇️ Downloaders (20)

| Command | Description | Usage |
|---|---|---|
| .tiktok | TikTok video info (legal links) | `.tiktok <search words>` |
| .ytmp3info | How to get YouTube audio legally | `.ytmp3info <song name>` |
| .ytmp4info | How to watch YouTube videos legally | `.ytmp4info <video name>` |
| .youtube | YouTube search link | `.youtube <search>` |
| .insta | Instagram post info (legal links) | `.insta <search words>` |
| .fbdl | Facebook video info (legal links) | `.fbdl <search words>` |
| .twitterdl | X/Twitter media info (legal links) | `.twitterdl <search words>` |
| .pinterest | Pinterest search link | `.pinterest <search>` |
| .song | Find a song on legal platforms | `.song <song name>` |
| .lyrics | Find lyrics on legal sites | `.lyrics <song name>` |
| .wallpaper | Free wallpaper image | `.wallpaper` |
| .ringtone | Ringtone info (legal sources) | `.ringtone <search>` |
| .stickerinfo | How WhatsApp stickers work | `.stickerinfo` |
| .apk | APK safety info | `.apk <app name>` |
| .spotifyinfo | Spotify search link | `.spotifyinfo <search>` |
| .soundcloud | SoundCloud search link | `.soundcloud <search>` |
| .dailymotion | Dailymotion search link | `.dailymotion <search>` |
| .vimeo | Vimeo search link | `.vimeo <search>` |
| .rumble | Rumble search link | `.rumble <search>` |
| .mediafire | MediaFire safety info | `.mediafire <search>` |

### 🎬 Movies (15)

| Command | Description | Usage |
|---|---|---|
| .movie | Movie details (OMDB) | `.movie <title>` |
| .series | TV series details (OMDB) | `.series <title>` |
| .anime | Anime details (OMDB) | `.anime <title>` |
| .actor | Actor filmography search (OMDB) | `.actor <name>` |
| .trending | Trending movies (sample list) | `.trending` |
| .topmovies | Top rated movies of all time | `.topmovies` |
| .upcoming | Upcoming releases info | `.upcoming` |
| .moviequote | Famous movie quote | `.moviequote` |
| .recommend | Get a movie recommendation | `.recommend <action|comedy|drama|horror|scifi|romance|animated>` |
| .watchlistadd | Add movie to your watchlist | `.watchlistadd <title>` |
| .watchlist | Show your watchlist | `.watchlist` |
| .watchlistremove | Remove from watchlist | `.watchlistremove <number>` |
| .genre | Browse movies by genre | `.genre <genre>` |
| .boxoffice | All-time box office (sample) | `.boxoffice` |
| .comingsoon | Coming soon info | `.comingsoon` |

### 🕌 Islamic (15)

| Command | Description | Usage |
|---|---|---|
| .quran | Read a Quran verse (free API) | `.quran <surah:ayah>  (e.g. .quran 2:255)` |
| .hadith | Get a hadith | `.hadith` |
| .prayer | Prayer timings for a city | `.prayer <city>  (e.g. .prayer Karachi)` |
| .qibla | Qibla direction info | `.qibla` |
| .dua | Daily duas with meaning | `.dua [number]` |
| .names99 | Allah's 99 names (paginated) | `.names99 [page 1-5]` |
| .hijri | Today's Hijri date | `.hijri` |
| .tasbih | Digital tasbih counter | `.tasbih [add|reset]` |
| .zakat | Zakat calculator (2.5%) | `.zakat <amount>` |
| .seerat | Seerah facts | `.seerat` |
| .wazifa | Daily wazaif guidance | `.wazifa` |
| .ramadan | Ramadan info | `.ramadan` |
| .hajjinfo | Hajj information | `.hajjinfo` |
| .masjidinfo | Find mosques near you | `.masjidinfo <city>` |
| .darood | Darood Shareef text | `.darood` |

### 🤖 AI & Fun (20)

| Command | Description | Usage |
|---|---|---|
| .ai | Chat with the AI | `.ai <your message>` |
| .ask | Ask the AI anything | `.ask <question>` |
| .imagine | Describe an image idea in words (no generation) | `.imagine <idea>` |
| .summarize | Summarize long text | `.summarize <text>` |
| .rewrite | Rewrite text better | `.rewrite <text>` |
| .grammar | Fix grammar | `.grammar <text>` |
| .story | Get a short story | `.story [topic]` |
| .poem | Get a short poem | `.poem [topic]` |
| .essay | Short essay on a topic | `.essay <topic>` |
| .explain | Explain like I’m five | `.explain <topic>` |
| .codehelp | Explain or write code | `.codehelp <question>` |
| .caption | Photo caption ideas | `.caption <topic>` |
| .bio | Profile bio ideas | `.bio <your interest>` |
| .slogan | Slogan generator | `.slogan <brand/topic>` |
| .emaildraft | Draft an email | `.emaildraft <purpose>` |
| .speech | Short speech draft | `.speech <topic>` |
| .debate | Debate points for/against | `.debate <topic>` |
| .recipe | Simple recipe | `.recipe <dish>` |
| .workout | Quick workout plan | `.workout [goal]` |
| .studyplan | Study plan helper | `.studyplan <subject/exam>` |

---

## ⚖️ Legal & Safety Notes

- **Official API only.** Imran Salara MD Bot uses the Meta WhatsApp Cloud API.
  Unofficial "MD" bots that log into personal WhatsApp accounts violate
  WhatsApp's Terms of Service and risk permanent number bans — this project
  deliberately avoids that route.
- **No piracy.** Downloader commands (`.tiktok`, `.ytmp3info`, `.song`, …)
  provide official links and legal alternatives only. Movie commands never
  link to pirated streams; they point to Netflix, Prime Video, cinemas, etc.
- **Best-effort AI.** AI replies are generated text, not professional advice.
- **In-memory extras.** Watchlist, notes, to-dos and the tasbih counter live
  in server memory and reset on restart — plug in a database for persistence.

---

## 📁 Project Structure

```
imran-salara-bot/
├── Procfile                  # Heroku: web: node src/index.js
├── package.json
├── .env.example
├── README.md
└── src/
    ├── index.js               # Express server + webhook
    ├── services/
    │   ├── whatsapp.js        # sendText / sendImage / markRead (Graph API v21.0)
    │   └── ai.js              # OpenAI-compatible AI client
    ├── commands/
    │   ├── index.js           # 150-command registry + findCommand()
    │   ├── general.js         # 20 commands
    │   ├── fun.js             # 30 commands
    │   ├── tools.js           # 30 commands
    │   ├── downloaders.js     # 20 commands (legal links only)
    │   ├── movies.js          # 15 commands
    │   ├── islamic.js         # 15 commands
    │   └── aifun.js           # 20 commands
    └── handlers/
        └── messageHandler.js  # command routing + AI fallback
```

---

Made with ❤️ by **Imran Salara MD Bot** — official WhatsApp Cloud API edition.
