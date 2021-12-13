/**
 * Compatibility with other modules.
 */

import { getCurrencySettings } from "./world-currency-5e.js";

/** Alters currency names on the given character sheet. */
function alterCharacterCurrency(html) {
    let altNames = getCurrencySettings();

    html.find('[class="denomination pp"]').text(altNames["ppAltAbrv"]);
    html.find('[class="denomination gp"]').text(altNames["gpAltAbrv"]);
    html.find('[class="denomination ep"]').text(altNames["epAltAbrv"]);
    html.find('[class="denomination sp"]').text(altNames["spAltAbrv"]);
    html.find('[class="denomination cp"]').text(altNames["cpAltAbrv"]);
}

// Compatibility: Let's Trade 5E

/** Alters currency abbreviations on trade dialog chat message. */
function alterTradeDialogCurrency(html) {
    let altNames = getCurrencySettings();

    const content = html.find('.dialog-content p');
    const match = content.text().match(/.+ is sending you [0-9]+((pp|gp|ep|sp|cp) \.).+/);
    if (match) content.text(content.text().replace(match[1], ' ' + altNames[match[2] + "Alt"] + '.'));
}

/** Alters currency names and abbreviations in the trade window. */
function alterTradeWindowCurrency(html) {
    let altNames = getCurrencySettings();

    ['pp', 'gp', 'ep', 'sp', 'cp'].forEach(dndCurrency => {
        const container = html.find('[data-coin="' + dndCurrency + '"]').parent();
        if (!container.length) return;

        for (const [k, n] of Object.entries(container.contents())) {
            if (n.nodeType === Node.TEXT_NODE) n.remove();
        }

        container.append(' ' + altNames[dndCurrency + "AltAbrv"]);
        container.attr('title', altNames[dndCurrency + "Alt"]);
    });
}

// Compatibility: Party Overview

/** Alters currency names in the party overview interface. */
function alterPartyOverviewWindowCurrency(html) {
    let altNames = getCurrencySettings();

    const currencies = html.find('div[data-tab="currencies"] div.table-row.header div.text.icon')
    $(currencies[0]).text(altNames["ppAlt"])
    $(currencies[1]).text(altNames["gpAlt"])
    $(currencies[2]).text(altNames["epAlt"])
    $(currencies[3]).text(altNames["spAlt"])
    $(currencies[4]).text(altNames["cpAlt"])
    $(currencies[5]).text(`${altNames["gpAlt"]} (${game.i18n.localize('party-overview.TOTAL')})`)
}

export { alterCharacterCurrency, alterTradeDialogCurrency, alterTradeWindowCurrency, alterPartyOverviewWindowCurrency};
