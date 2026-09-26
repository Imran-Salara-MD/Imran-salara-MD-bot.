// ============================================================
// Imran Salara MD Bot — command registry (150 commands)
// Aggregates every category file into one lookup table.
// ============================================================

const general = require('./general');
const fun = require('./fun');
const tools = require('./tools');
const downloaders = require('./downloaders');
const movies = require('./movies');
const islamic = require('./islamic');
const aifun = require('./aifun');

const allCommands = [
  ...general,
  ...fun,
  ...tools,
  ...downloaders,
  ...movies,
  ...islamic,
  ...aifun,
];

// Guard against accidental duplicates at load time.
const seen = new Set();
for (const cmd of allCommands) {
  if (seen.has(cmd.name)) throw new Error(`Duplicate command name: ${cmd.name}`);
  seen.add(cmd.name);
}

// Case-insensitive lookup; strips a leading dot if present.
function findCommand(name) {
  const key = String(name || '').toLowerCase().replace(/^\./, '');
  return allCommands.find((c) => c.name === key) || null;
}

module.exports = { allCommands, findCommand };
