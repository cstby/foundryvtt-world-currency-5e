/**
 * Convert one type of currency to another.
 */

function gpToStandard(n) {
    let standard = game.settings.get("5e-custom-currency", "Standard");
    return n * CONFIG.DND5E.currencies.gp.conversion[standard];
}

function standardToGp(n) {
    let standard = game.settings.get("5e-custom-currency", "Standard");
    return n / CONFIG.DND5E.currencies.gp.conversion[standard];
}

function formatCurrency(n) {
    let standard = game.settings.get("5e-custom-currency", "Standard");
    return String(n) + " " + CONFIG.DND5E.currencies[standard].abbreviation
}

export { gpToStandard, standardToGp, formatCurrency};
