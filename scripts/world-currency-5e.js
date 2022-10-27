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
    }
}

/** Writes the user-provided currencies to the CONFIG.DND5E object. */
function patchCurrencies() {
    let currencySettings = getCurrencySettings()

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
            conversion: currencySettings["ppConvert"]
        },
        gp: {
            label: currencySettings["gpAlt"],
            abbreviation: currencySettings["gpAltAbrv"],
            // Added explicit rates for easier conversion later. (see gpToStandard below.)
            conversion: currencySettings["gpConvert"]
        },
        ep: {
            label: currencySettings["epAlt"],
            abbreviation: currencySettings["epAltAbrv"],
            conversion: currencySettings["epConvert"]
        },
        sp: {
            label: currencySettings["spAlt"],
            abbreviation: currencySettings["spAltAbrv"],
            conversion: currencySettings["spConvert"]
        },
        cp: {
            label: currencySettings["cpAlt"],
            abbreviation: currencySettings["cpAltAbrv"],
            conversion: currencySettings["cpConvert"]
        }
    };

    console.log("world-currency-5e | Patched Currencies");
}

/** Removes the currency converter from the given character sheet. */
function removeConvertCurrency(html) {
    html.find('[class="currency-item convert"]').remove();
    html.find('[data-action="convertCurrency"]').remove();
    html.find('[title="Convert Currency"]').remove();
}

/** Removes specific currencies from character sheet */
function removeCurrencyCp(html) {
    html.find('[class="currency-item cp"]').remove();
    html.find('[class="denomination cp"]').remove();
    html.find('[name="data.currency.cp"]').remove();
}

function removeCurrencySp(html) {
    html.find('[class="currency-item sp"]').remove();
    html.find('[class="denomination sp"]').remove();
    html.find('[name="data.currency.sp"]').remove();
}

function removeCurrencyEp(html) {
    html.find('[class="currency-item ep"]').remove();
    html.find('[class="denomination ep"]').remove();
    html.find('[name="data.currency.ep"]').remove();
}

function removeCurrencyGp(html) {
    html.find('[class="currency-item gp"]').remove();
    html.find('[class="denomination gp"]').remove();
    html.find('[name="data.currency.gp"]').remove();
}

function removeCurrencyPp(html) {
    html.find('[class="currency-item pp"]').remove();
    html.find('[class="denomination pp"]').remove();
    html.find('[name="data.currency.pp"]').remove();
}

export { getCurrencySettings,
         patchCurrencies,
         removeConvertCurrency,
         removeCurrencyCp,
         removeCurrencySp,
         removeCurrencyEp,
         removeCurrencyGp,
         removeCurrencyPp,};
