/**
 * Convert one type of currency to another.
 */
const WORLD_CURRENCY_5E = "world-currency-5e";
const STANDARD = "Standard";

/** Converts a given value in gold to its value in the game's standard currency. */
function gpToStandard(n) {
    let standard = game.settings.get(WORLD_CURRENCY_5E, STANDARD);
    return n * CONFIG.DND5E.currencies[standard].conversion;
}

/** Converts a given value in the game's standard currency to gold. */
function standardToGp(n) {
    let standard = game.settings.get(WORLD_CURRENCY_5E, STANDARD);
    return n / CONFIG.DND5E.currencies[standard].conversion;
}

/** Adds the abbreviation of the standard currency after the given value. */
function formatCurrency(n) {
    let standard = game.settings.get(WORLD_CURRENCY_5E, STANDARD);
    return String(n) + " " + CONFIG.DND5E.currencies[standard].abbreviation;
}

export { gpToStandard, standardToGp, formatCurrency };
