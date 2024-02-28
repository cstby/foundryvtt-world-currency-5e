/**
 * Core functions for patching currencies configuration.
 */

const WORLD_CURRENCY_5E = "world-currency-5e";
const CONVERT = {
    CP: "cpConvert",
    SP: "spConvert",
    EP: "epConvert",
    GP: "gpConvert",
    PP: "ppConvert",
};
const ALT_REMOVE = {
    CP: "cpAltRemove",
    SP: "spAltRemove",
    EP: "epAltRemove",
    GP: "gpAltRemove",
    PP: "ppAltRemove",
};
const ALT = {
    CP: "cpAlt",
    SP: "spAlt",
    EP: "epAlt",
    GP: "gpAlt",
    PP: "ppAlt",
};
const ALT_ABRV = {
    CP: "cpAltAbrv",
    SP: "spAltAbrv",
    EP: "epAltAbrv",
    GP: "gpAltAbrv",
    PP: "ppAltAbrv",
};

/** Gets the currencies specified by the user and returns them as an object.*/
function getCurrencySettings() {
    return {
        cpConvert: game.settings.get(WORLD_CURRENCY_5E, CONVERT.CP),
        spConvert: game.settings.get(WORLD_CURRENCY_5E, CONVERT.SP),
        epConvert: game.settings.get(WORLD_CURRENCY_5E, CONVERT.EP),
        gpConvert: game.settings.get(WORLD_CURRENCY_5E, CONVERT.GP),
        ppConvert: game.settings.get(WORLD_CURRENCY_5E, CONVERT.PP),
        cpAltRemove: game.settings.get(WORLD_CURRENCY_5E, ALT_REMOVE.CP),
        spAltRemove: game.settings.get(WORLD_CURRENCY_5E, ALT_REMOVE.SP),
        epAltRemove: game.settings.get(WORLD_CURRENCY_5E, ALT_REMOVE.EP),
        gpAltRemove: game.settings.get(WORLD_CURRENCY_5E, ALT_REMOVE.GP),
        ppAltRemove: game.settings.get(WORLD_CURRENCY_5E, ALT_REMOVE.PP),
        cpAlt: game.settings.get(WORLD_CURRENCY_5E, ALT.CP),
        spAlt: game.settings.get(WORLD_CURRENCY_5E, ALT.SP),
        epAlt: game.settings.get(WORLD_CURRENCY_5E, ALT.EP),
        gpAlt: game.settings.get(WORLD_CURRENCY_5E, ALT.GP),
        ppAlt: game.settings.get(WORLD_CURRENCY_5E, ALT.PP),
        cpAltAbrv: game.settings.get(WORLD_CURRENCY_5E, ALT_ABRV.CP),
        spAltAbrv: game.settings.get(WORLD_CURRENCY_5E, ALT_ABRV.SP),
        epAltAbrv: game.settings.get(WORLD_CURRENCY_5E, ALT_ABRV.EP),
        gpAltAbrv: game.settings.get(WORLD_CURRENCY_5E, ALT_ABRV.GP),
        ppAltAbrv: game.settings.get(WORLD_CURRENCY_5E, ALT_ABRV.PP),
    };
}

/** Writes the user-provided currencies to the CONFIG.DND5E object. */
function patchCurrencies() {
    let currencySettings = getCurrencySettings();

    game.i18n.translations.DND5E.CurrencyPP = currencySettings[ALT.PP];
    game.i18n.translations.DND5E.CurrencyGP = currencySettings[ALT.GP];
    game.i18n.translations.DND5E.CurrencyEP = currencySettings[ALT.EP];
    game.i18n.translations.DND5E.CurrencySP = currencySettings[ALT.SP];
    game.i18n.translations.DND5E.CurrencyCP = currencySettings[ALT.CP];

    game.i18n.translations.DND5E.CurrencyAbbrPP = currencySettings[ALT_ABRV.PP];
    game.i18n.translations.DND5E.CurrencyAbbrGP = currencySettings[ALT_ABRV.GP];
    game.i18n.translations.DND5E.CurrencyAbbrEP = currencySettings[ALT_ABRV.EP];
    game.i18n.translations.DND5E.CurrencyAbbrSP = currencySettings[ALT_ABRV.SP];
    game.i18n.translations.DND5E.CurrencyAbbrCP = currencySettings[ALT_ABRV.CP];

    CONFIG.DND5E.currencies = {
        pp: {
            label: currencySettings[ALT.PP],
            abbreviation: currencySettings[ALT_ABRV.PP],
            conversion: currencySettings[CONVERT.PP],
        },
        gp: {
            label: currencySettings[ALT.GP],
            abbreviation: currencySettings[ALT_ABRV.GP],
            // Added explicit rates for easier conversion later. (see gpToStandard below.)
            conversion: currencySettings[CONVERT.GP],
        },
        ep: {
            label: currencySettings[ALT.EP],
            abbreviation: currencySettings[ALT_ABRV.EP],
            conversion: currencySettings[CONVERT.EP],
        },
        sp: {
            label: currencySettings[ALT.SP],
            abbreviation: currencySettings[ALT_ABRV.SP],
            conversion: currencySettings[CONVERT.SP],
        },
        cp: {
            label: currencySettings[ALT.CP],
            abbreviation: currencySettings[ALT_ABRV.CP],
            conversion: currencySettings[CONVERT.CP],
        },
    };

    console.log("world-currency-5e | Patched Currencies");
}

/** Removes the currency converter from the given character sheet. */
function removeConvertCurrency(html) {
    html.find('[class="currency-item convert"]').remove();
    html.find('[data-action="convertCurrency"]').remove();
    html.find('[title="Convert Currency"]').remove();
    // D&D5e 3.0
    html.find(`[class="currency"]`)?.find(`[class="item-action unbutton"]`)?.remove();
}

/** Removes specified currency from character sheet */
function removeCurrency(html, currency) {
    html.find(`[class="currency-item ${currency}"]`)?.remove();
    html.find(`[class="denomination ${currency}"]`)?.remove();
    html.find(`[name="system.currency.${currency}"]`)?.remove();
    // tidy-sheet
    html.find(`[class="currency-item ${currency} svelte-52d1bs"]`)?.remove();
    // d&d5e 3.0
    html.find(`[class="currency ${currency}"]`)?.remove();
}

function removeCurrencies(html) {
    if (game.settings.get(WORLD_CURRENCY_5E, "RemoveConverter")) {
        removeConvertCurrency(html);
    }
    if (game.settings.get(WORLD_CURRENCY_5E, ALT_REMOVE.CP)) {
        removeCurrency(html, "cp");
    }
    if (game.settings.get(WORLD_CURRENCY_5E, ALT_REMOVE.SP)) {
        removeCurrency(html, "sp");
    }
    if (game.settings.get(WORLD_CURRENCY_5E, ALT_REMOVE.EP)) {
        removeCurrency(html, "ep");
    }
    if (game.settings.get(WORLD_CURRENCY_5E, ALT_REMOVE.GP)) {
        removeCurrency(html, "gp");
    }
    if (game.settings.get(WORLD_CURRENCY_5E, ALT_REMOVE.PP)) {
        removeCurrency(html, "pp");
    }
}

export {
    getCurrencySettings,
    patchCurrencies,
    removeConvertCurrency,
    removeCurrencies,
    WORLD_CURRENCY_5E,
    ALT_REMOVE,
    ALT,
    CONVERT,
    ALT_ABRV,
};
