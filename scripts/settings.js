/**
 * Settings that allow user to specify custom currencies and other options.
 */

import { patchCurrencies } from "./5e-custom-currency.js";

/** Registers setting to remove the currency converter from character sheets. */
function registerSettingsConverter() {
    game.settings.register("5e-custom-currency", "RemoveConverter", {
        name: "Remove currency converter from character sheets.",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
        onChange: () => patchCurrencies()
    });
}

/** Helper function that registers a new currency. */
function registerCurrency(settingName, originalName, originalAbrv) {
    game.settings.register("5e-custom-currency", settingName + "Remove", {
        name: "Remove " +  originalName + "?",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => patchCurrencies(),
    });
    game.settings.register("5e-custom-currency", settingName, {
        name: originalName + " New Name",
        scope: "world",
        config: true,
        default: originalName,
        type: String,
        onChange: () => patchCurrencies(),
    });
    game.settings.register("5e-custom-currency", settingName + "Abrv", {
        name: originalName + " New Abbreviation",
        scope: "world",
        config: true,
        default: originalAbrv,
        type: String,
        onChange: () => patchCurrencies(),
    });
}

/** Registers settings to change names of abbreviations of currencies */
function registerSettingsCurrencyNames() {
    registerCurrency("cpAlt", "Copper", "CP");
    registerCurrency("spAlt", "Silver", "SP");
    registerCurrency("epAlt", "Electrum", "EP");
    registerCurrency("gpAlt", "Gold", "GP");
    registerCurrency("ppAlt", "Platinum", "PP");
}

/** Helper function that registers an exchange rate. */
function registerExchangeRate(exchangeSetting, currencyOne, currencyTwo, defaultRate) {
    game.settings.register("5e-custom-currency", exchangeSetting, {
        name: "How many " + currencyOne + " in a  " + currencyTwo + "?",
        scope: "world",
        config: true,
        default: defaultRate,
        type: Number,
        onChange: () => patchCurrencies(),
    });
}

/** Registers settings to change all exchange rates. */
function registerSettingsExchangeRates() {
    let cpAlt = game.settings.get("5e-custom-currency", "cpAlt");
    let spAlt = game.settings.get("5e-custom-currency", "spAlt");
    let epAlt = game.settings.get("5e-custom-currency", "epAlt");
    let gpAlt = game.settings.get("5e-custom-currency", "gpAlt");
    let ppAlt = game.settings.get("5e-custom-currency", "ppAlt");
    
    registerExchangeRate("cp-sp", cpAlt, spAlt, 10);
    registerExchangeRate("sp-ep", spAlt, epAlt, 5);
    registerExchangeRate("ep-gp", epAlt, gpAlt, 2);
    registerExchangeRate("gp-pp", gpAlt, ppAlt, 10);
}

/** Registers setting to set a standard currency */
function registerSettingsStandard() {
    game.settings.register("5e-custom-currency", "Standard", {
        name: "Standard Currency",
        scope: "world",
        config: true,
        default: "gp",
        type: String,
			  choices: {
				    "pp": game.settings.get("5e-custom-currency", "ppAlt"),
            "gp": game.settings.get("5e-custom-currency", "gpAlt"),
            "ep": game.settings.get("5e-custom-currency", "epAlt"),
            "sp": game.settings.get("5e-custom-currency", "spAlt"),
            "cp": game.settings.get("5e-custom-currency", "cpAlt"),
        },
        onChange: () => patchCurrencies(),
    });
}

/** Registers all settings for this module. */
function registerSettings() {
    registerSettingsCurrencyNames();
    registerSettingsConverter();
    registerSettingsExchangeRates();
    registerSettingsStandard();
    console.log("5e-custom-currency | Registered Settings");
}

export { registerSettings };
