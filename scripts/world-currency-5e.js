/**
 * Core functions for patching currencies configuration.
 */

/** Gets the currencies specified by the user and returns them as an object.*/
function getCurrencySettings() {
    return {
        cpConvert: game.settings.get("world-currency-5e", "cpConvert"),
        spConvert: game.settings.get("world-currency-5e", "spConvert"),
        epConvert: game.settings.get("world-currency-5e", "epConvert"),
        gpConvert: game.settings.get("world-currency-5e", "gpConvert"),
        ppConvert: game.settings.get("world-currency-5e", "ppConvert"),
        cpAltRemove: game.settings.get("world-currency-5e", "cpAltRemove"),
        spAltRemove: game.settings.get("world-currency-5e", "spAltRemove"),
        epAltRemove: game.settings.get("world-currency-5e", "epAltRemove"),
        gpAltRemove: game.settings.get("world-currency-5e", "gpAltRemove"),
        ppAltRemove: game.settings.get("world-currency-5e", "ppAltRemove"),
        cpAlt: game.settings.get("world-currency-5e", "cpAlt"),
        spAlt: game.settings.get("world-currency-5e", "spAlt"),
        epAlt: game.settings.get("world-currency-5e", "epAlt"),
        gpAlt: game.settings.get("world-currency-5e", "gpAlt"),
        ppAlt: game.settings.get("world-currency-5e", "ppAlt"),
        cpAltAbrv: game.settings.get("world-currency-5e", "cpAltAbrv"),
        spAltAbrv: game.settings.get("world-currency-5e", "spAltAbrv"),
        epAltAbrv: game.settings.get("world-currency-5e", "epAltAbrv"),
        gpAltAbrv: game.settings.get("world-currency-5e", "gpAltAbrv"),
        ppAltAbrv: game.settings.get("world-currency-5e", "ppAltAbrv"),
    };
}

/** Writes the user-provided currencies to the CONFIG.DND5E object. */
function patchCurrencies() {
    let currencySettings = getCurrencySettings();

    game.i18n.translations.DND5E.CurrencyPP = currencySettings["ppAlt"];
    game.i18n.translations.DND5E.CurrencyGP = currencySettings["gpAlt"];
    game.i18n.translations.DND5E.CurrencyEP = currencySettings["epAlt"];
    game.i18n.translations.DND5E.CurrencySP = currencySettings["spAlt"];
    game.i18n.translations.DND5E.CurrencyCP = currencySettings["cpAlt"];

    game.i18n.translations.DND5E.CurrencyAbbrPP = currencySettings["ppAltAbrv"];
    game.i18n.translations.DND5E.CurrencyAbbrGP = currencySettings["gpAltAbrv"];
    game.i18n.translations.DND5E.CurrencyAbbrEP = currencySettings["epAltAbrv"];
    game.i18n.translations.DND5E.CurrencyAbbrSP = currencySettings["spAltAbrv"];
    game.i18n.translations.DND5E.CurrencyAbbrCP = currencySettings["cpAltAbrv"];

    CONFIG.DND5E.currencies = {
        pp: {
            label: currencySettings["ppAlt"],
            abbreviation: currencySettings["ppAltAbrv"],
            conversion: currencySettings["ppConvert"],
        },
        gp: {
            label: currencySettings["gpAlt"],
            abbreviation: currencySettings["gpAltAbrv"],
            // Added explicit rates for easier conversion later. (see gpToStandard below.)
            conversion: currencySettings["gpConvert"],
        },
        ep: {
            label: currencySettings["epAlt"],
            abbreviation: currencySettings["epAltAbrv"],
            conversion: currencySettings["epConvert"],
        },
        sp: {
            label: currencySettings["spAlt"],
            abbreviation: currencySettings["spAltAbrv"],
            conversion: currencySettings["spConvert"],
        },
        cp: {
            label: currencySettings["cpAlt"],
            abbreviation: currencySettings["cpAltAbrv"],
            conversion: currencySettings["cpConvert"],
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
    if (game.settings.get("world-currency-5e", "RemoveConverter")) {
        removeConvertCurrency(html);
    }
    if (game.settings.get("world-currency-5e", "cpAltRemove")) {
        removeCurrency(html, "cp");
    }
    if (game.settings.get("world-currency-5e", "spAltRemove")) {
        removeCurrency(html, "sp");
    }
    if (game.settings.get("world-currency-5e", "epAltRemove")) {
        removeCurrency(html, "ep");
    }
    if (game.settings.get("world-currency-5e", "gpAltRemove")) {
        removeCurrency(html, "gp");
    }
    if (game.settings.get("world-currency-5e", "ppAltRemove")) {
        removeCurrency(html, "pp");
    }
}

export { getCurrencySettings, patchCurrencies, removeConvertCurrency, removeCurrencies };
