/**
 * Convert one type of currency to another.
 */

/** Converts a given value in gold to its value in the game's standard currency. */
function gpToStandard(n) {
    let standard = game.settings.get("world-currency-5e", "Standard");
    return n * CONFIG.DND5E.currencies.gp.conversion[standard];
}

/** Converts a given value in the game's standard currency to gold. */
function standardToGp(n) {
    let standard = game.settings.get("world-currency-5e", "Standard");
    return n / CONFIG.DND5E.currencies.gp.conversion[standard];
}

/** Adds the abbreviation of the standard currency after the given value. */
function formatCurrency(n) {
    let standard = game.settings.get("world-currency-5e", "Standard");
    return String(n) + " " + CONFIG.DND5E.currencies[standard].abbreviation
}

export { gpToStandard, standardToGp, formatCurrency};
