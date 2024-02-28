/**
 * Compatibility with other modules.
 */

import { getCurrencySettings, ALT_ABRV, ALT } from "./world-currency-5e.js";

function changeText(currency, altAbrv) {
    html.find(`[class="denomination ${currency}"]`).text(getCurrencySettings()[altAbrv]);
}

function swapDnd5eIcon(currency, altAbrv) {
    html.find(`[class="currency ${currency}"]`)
        ?.removeClass(currency)
        ?.addClass(` ${getCurrencySettings()[altAbrv].toLowerCase()}`);
}

/** Alters currency on the given character sheet. */
function alterCharacterCurrency(html) {
    changeText(html, "pp", ALT_ABRV.PP);
    changeText(html, "gp", ALT_ABRV.GP);
    changeText(html, "ep", ALT_ABRV.EP);
    changeText(html, "sp", ALT_ABRV.SP);
    changeText(html, "cp", ALT_ABRV.CP);

    swapDnd5eIcon(html, "cp", ALT_ABRV.CP);
    swapDnd5eIcon(html, "sp", ALT_ABRV.SP);
    swapDnd5eIcon(html, "ep", ALT_ABRV.EP);
    swapDnd5eIcon(html, "gp", ALT_ABRV.GP);
    swapDnd5eIcon(html, "pp", ALT_ABRV.PP);
}

// Compatibility: Let's Trade 5E

/** Alters currency abbreviations on trade dialog chat message. */
function alterTradeDialogCurrency(html) {
    let altNames = getCurrencySettings();

    const content = html.find(".dialog-content p");
    const match = content.text().match(/.+ is sending you [0-9]+((pp|gp|ep|sp|cp) \.).+/);
    if (match) content.text(content.text().replace(match[1], " " + altNames[match[2] + "Alt"] + "."));
}

/** Alters currency names and abbreviations in the trade window. */
function alterTradeWindowCurrency(html) {
    let altNames = getCurrencySettings();

    ["pp", "gp", "ep", "sp", "cp"].forEach((dndCurrency) => {
        const container = html.find('[data-coin="' + dndCurrency + '"]').parent();
        if (!container.length) return;

        for (const [k, n] of Object.entries(container.contents())) {
            if (n.nodeType === Node.TEXT_NODE) n.remove();
        }

        container.append(" " + altNames[dndCurrency + "AltAbrv"]);
        container.attr("title", altNames[dndCurrency + "Alt"]);
    });
}

// Compatibility: Party Overview

/** Alters currency names in the party overview interface. */
function alterPartyOverviewWindowCurrency(html) {
    let altNames = getCurrencySettings();

    const currencies = html.find('div[data-tab="currencies"] div.table-row.header div.text.icon');
    $(currencies[0]).text(altNames[ALT.PP]);
    $(currencies[1]).text(altNames[ALT.GP]);
    $(currencies[2]).text(altNames[ALT.EP]);
    $(currencies[3]).text(altNames[ALT.SP]);
    $(currencies[4]).text(altNames[ALT.CP]);
    $(currencies[5]).text(`${altNames[ALT.GP]} (${game.i18n.localize("party-overview.TOTAL")})`);
}

export { alterCharacterCurrency, alterTradeDialogCurrency, alterTradeWindowCurrency, alterPartyOverviewWindowCurrency };
