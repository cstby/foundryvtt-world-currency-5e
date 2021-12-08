/**
 * Core functions for patching currencies config.
 */

/** Gets the currencies specified by the user and returns them as an object.*/
function getCurrencySettings() {
    return {
        cp_sp: game.settings.get("5e-custom-currency", "cp-sp"),
        sp_ep: game.settings.get("5e-custom-currency", "sp-ep"),
        ep_gp: game.settings.get("5e-custom-currency", "ep-gp"),
        gp_pp: game.settings.get("5e-custom-currency", "gp-pp"),
        cpAlt: game.settings.get("5e-custom-currency", "cpAlt"),
        spAlt: game.settings.get("5e-custom-currency", "spAlt"),
        epAlt: game.settings.get("5e-custom-currency", "epAlt"),
        gpAlt: game.settings.get("5e-custom-currency", "gpAlt"),
        ppAlt: game.settings.get("5e-custom-currency", "ppAlt"),
        cpAltAbrv: game.settings.get("5e-custom-currency", "cpAltAbrv"),
        spAltAbrv: game.settings.get("5e-custom-currency", "spAltAbrv"),
        epAltAbrv: game.settings.get("5e-custom-currency", "epAltAbrv"),
        gpAltAbrv: game.settings.get("5e-custom-currency", "gpAltAbrv"),
        ppAltAbrv: game.settings.get("5e-custom-currency", "ppAltAbrv"),
    }
}

/** Writes the user-provided currencies to the CONFIG.DND5E object. */
function patchCurrencies() {
    let currencySettings = getCurrencySettings()

    CONFIG.DND5E.currencies = {
        pp: {
            label: currencySettings["ppAlt"],
            abbreviation: currencySettings["ppAltAbrv"]
        },
        gp: {
            label: currencySettings["gpAlt"],
            abbreviation: currencySettings["gpAltAbrv"],
            conversion: {into: "pp", each: currencySettings["gp_pp"]}
        },
        ep: {
            label: currencySettings["epAlt"],
            abbreviation: currencySettings["epAltAbrv"],
            conversion: {into: "gp", each: currencySettings["ep_gp"]}
        },
        sp: {
            label: currencySettings["spAlt"],
            abbreviation: currencySettings["spAltAbrv"],
            conversion: {into: "ep", each: currencySettings["sp_ep"]}
        },
        cp: {
            label: currencySettings["cpAlt"],
            abbreviation: currencySettings["cpAltAbrv"],
            conversion: {into: "sp", each: currencySettings["cp_sp"]}
        }
    };

    console.log("5e-custom-currency | Patched Currencies");
}

/** Removes the currency converter from the given character sheet. */
function removeConvertCurrency(html) {
    html.find('[class="currency-item convert"]').remove();
    html.find('[data-action="convertCurrency"]').remove();
    html.find('[title="Convert Currency"]').remove();
}

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
