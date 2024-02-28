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
        onChange: () => patchCurrencies(),
    });
}

/** Helper function that registers whether currency should be removed. */
function registerRemove(settingName, originalName) {
    game.settings.register("world-currency-5e", settingName + "Remove", {
        name: "Hide " + originalName,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => patchCurrencies(),
    });
}

/** Registers settings to remove currencies */
function registerSettingsCurrencyRemove() {
    registerRemove("cpAlt", "Copper");
    registerRemove("spAlt", "Silver");
    registerRemove("epAlt", "Electrum");
    registerRemove("gpAlt", "Gold");
    registerRemove("ppAlt", "Platinum");
}

/** Helper function that registers a new currency. */
function registerCurrency(settingName, originalName, originalAbrv, isRemoved) {
    game.settings.register("world-currency-5e", settingName, {
        name: originalName + " New Name",
        scope: "world",
        config: !isRemoved,
        default: originalName,
        type: String,
        onChange: () => patchCurrencies(),
    });
    game.settings.register("world-currency-5e", settingName + "Abrv", {
        name: originalName + " New Abbreviation",
        scope: "world",
        config: !isRemoved,
        default: originalAbrv,
        type: String,
        onChange: () => patchCurrencies(),
    });
}

/** Registers settings to change names of abbreviations of currencies */
function registerSettingsCurrencyNames() {
    let cpAltRemove = game.settings.get("world-currency-5e", "cpAltRemove");
    let spAltRemove = game.settings.get("world-currency-5e", "spAltRemove");
    let epAltRemove = game.settings.get("world-currency-5e", "epAltRemove");
    let gpAltRemove = game.settings.get("world-currency-5e", "gpAltRemove");
    let ppAltRemove = game.settings.get("world-currency-5e", "ppAltRemove");

    registerCurrency("cpAlt", "Copper", "CP", cpAltRemove);
    registerCurrency("spAlt", "Silver", "SP", spAltRemove);
    registerCurrency("epAlt", "Electrum", "EP", epAltRemove);
    registerCurrency("gpAlt", "Gold", "GP", gpAltRemove);
    registerCurrency("ppAlt", "Platinum", "PP", ppAltRemove);
}

/** Helper function that registers an exchange rate. */
function registerExchangeRate(exchangeSetting, newName, isRemoved) {
    game.settings.register("world-currency-5e", exchangeSetting, {
        name: "How many " + newName + " in a RAW GP?",
        scope: "world",
        config: !isRemoved,
        default: null,
        type: Number,
        onChange: () => patchCurrencies(),
    });
}

/** Registers settings to change all exchange rates. */
function registerSettingsExchangeRates() {
    let cpAltRemove = game.settings.get("world-currency-5e", "cpAltRemove");
    let spAltRemove = game.settings.get("world-currency-5e", "spAltRemove");
    let epAltRemove = game.settings.get("world-currency-5e", "epAltRemove");
    let gpAltRemove = game.settings.get("world-currency-5e", "gpAltRemove");
    let ppAltRemove = game.settings.get("world-currency-5e", "ppAltRemove");

    let cpAlt = game.settings.get("world-currency-5e", "cpAlt");
    let spAlt = game.settings.get("world-currency-5e", "spAlt");
    let epAlt = game.settings.get("world-currency-5e", "epAlt");
    let gpAlt = game.settings.get("world-currency-5e", "gpAlt");
    let ppAlt = game.settings.get("world-currency-5e", "ppAlt");

    registerExchangeRate("cpConvert", cpAlt, cpAltRemove);
    registerExchangeRate("spConvert", spAlt, spAltRemove);
    registerExchangeRate("epConvert", epAlt, epAltRemove);
    registerExchangeRate("gpConvert", gpAlt, gpAltRemove);
    registerExchangeRate("ppConvert", ppAlt, ppAltRemove);
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
            pp: game.settings.get("world-currency-5e", "ppAlt"),
            gp: game.settings.get("world-currency-5e", "gpAlt"),
            ep: game.settings.get("world-currency-5e", "epAlt"),
            sp: game.settings.get("world-currency-5e", "spAlt"),
            cp: game.settings.get("world-currency-5e", "cpAlt"),
        },
        onChange: () => patchCurrencies(),
    });
}

/** Registers all settings for this module. */
function registerSettings() {
    registerSettingsCurrencyRemove();
    registerSettingsCurrencyNames();
    registerSettingsConverter();
    registerSettingsExchangeRates();
    registerSettingsStandard();
    console.log("world-currency-5e | Registered Settings");
}

export { registerSettings };
