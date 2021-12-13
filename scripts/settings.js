/**
 * Settings that allow user to specify custom currencies and other options.
 */

import { patchCurrencies } from "./world-currency-5e.js";

/** Registers setting to remove the currency converter from character sheets. */
function registerSettingsConverter() {
    game.settings.register("world-currency-5e", "RemoveConverter", {
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
    game.settings.register("world-currency-5e", settingName + "Remove", {
        name: "Hide " +  originalName,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => patchCurrencies(),
    });
    game.settings.register("world-currency-5e", settingName, {
        name: originalName + " New Name",
        scope: "world",
        config: true,
        default: originalName,
        type: String,
        onChange: () => patchCurrencies(),
    });
    game.settings.register("world-currency-5e", settingName + "Abrv", {
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
    game.settings.register("world-currency-5e", exchangeSetting, {
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
    let cpAlt = game.settings.get("world-currency-5e", "cpAlt");
    let spAlt = game.settings.get("world-currency-5e", "spAlt");
    let epAlt = game.settings.get("world-currency-5e", "epAlt");
    let gpAlt = game.settings.get("world-currency-5e", "gpAlt");
    let ppAlt = game.settings.get("world-currency-5e", "ppAlt");
    
    registerExchangeRate("cp-sp", cpAlt, spAlt, 10);
    registerExchangeRate("sp-ep", spAlt, epAlt, 5);
    registerExchangeRate("ep-gp", epAlt, gpAlt, 2);
    registerExchangeRate("gp-pp", gpAlt, ppAlt, 10);
}

/** Registers setting to set a standard currency */
function registerSettingsStandard() {
    game.settings.register("world-currency-5e", "Standard", {
        name: "Standard Currency",
        scope: "world",
        config: true,
        default: "gp",
        type: String,
			  choices: {
				    "pp": game.settings.get("world-currency-5e", "ppAlt"),
            "gp": game.settings.get("world-currency-5e", "gpAlt"),
            "ep": game.settings.get("world-currency-5e", "epAlt"),
            "sp": game.settings.get("world-currency-5e", "spAlt"),
            "cp": game.settings.get("world-currency-5e", "cpAlt"),
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
    console.log("world-currency-5e | Registered Settings");
}

export { registerSettings };
