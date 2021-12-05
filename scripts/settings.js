import { patch_currencyNames } from "./5e-custom-currency.js";

function patch() {
    registerSettingsCurrencyNames();
    console.log("5e-custom-currency | New Currency Names/Abbreviations Registered");

    registerSettingsExchangeRate();
    console.log("5e-custom-currency | New Exchange Rates Registered");

    patch_currencyNames();
}

export function registerSettings() {
    registerSettingsCurrencyNames();
    console.log("5e-custom-currency | Currency Names/Abbreviations Registered");

    registerIndependentCurrencies();
    console.log("5e-custom-currency | Currency Dependence Registered");
    if (game.settings.get("5e-custom-currency", "depCur"))
    {
        registerSettingsExchangeRate();
        console.log("5e-custom-currency | Exchange Rates Registered");
    }
}

function registerIndependentCurrencies() {
    game.settings.register("5e-custom-currency", "depCur", {
        name: "Dependent Currencies",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
        onChange: () => {
            patch();
            window.location.reload();
        }
    })
}

function registerSettingsCurrencyNames() {
    game.settings.register("5e-custom-currency", "cpAlt", {
        name: "Copper Alt Name",
        scope: "world",
        config: true,
        default: "Copper",
        type: String,
        onChange: () => patch(),
    });
    game.settings.register("5e-custom-currency", "cpAltAbrv", {
        name: "Copper Alt Abbreviation",
        scope: "world",
        config: true,
        default: "CP",
        type: String,
        onChange: () => patch(),
    });
    game.settings.register("5e-custom-currency", "spAlt", {
        name: "Silver Alt Name",
        scope: "world",
        config: true,
        default: "Silver",
        type: String,
        onChange: () => patch(),
    });
    game.settings.register("5e-custom-currency", "spAltAbrv", {
        name: "Silver Alt Abbreviation",
        scope: "world",
        config: true,
        default: "SP",
        type: String,
        onChange: () => patch(),
    });
    game.settings.register("5e-custom-currency", "epAlt", {
        name: "Electrum Alt Name",
        scope: "world",
        config: true,
        default: "Electrum",
        type: String,
        onChange: () => patch(),
    });
    game.settings.register("5e-custom-currency", "epAltAbrv", {
        name: "Electrum Alt Abbreviation",
        scope: "world",
        config: true,
        default: "EP",
        type: String,
        onChange: () => patch(),
    });
    game.settings.register("5e-custom-currency", "gpAlt", {
        name: "Gold Alt Name",
        scope: "world",
        config: true,
        default: "Gold",
        type: String,
        onChange: () => patch(),
    });
    game.settings.register("5e-custom-currency", "gpAltAbrv", {
        name: "Gold Alt Abbreviation",
        scope: "world",
        config: true,
        default: "GP",
        type: String,
        onChange: () => patch(),
    });
    game.settings.register("5e-custom-currency", "ppAlt", {
        name: "Platinum Alt Name",
        scope: "world",
        config: true,
        default: "Platinum",
        type: String,
        onChange: () => patch(),
    });
    game.settings.register("5e-custom-currency", "ppAltAbrv", {
        name: "Platinum Alt Abbreviation",
        scope: "world",
        config: true,
        default: "PP",
        type: String,
        onChange: () => patch(),
    });
}

function registerSettingsExchangeRate() {
    let cpAlt = game.settings.get("5e-custom-currency", "cpAlt");
    let spAlt = game.settings.get("5e-custom-currency", "spAlt");
    let epAlt = game.settings.get("5e-custom-currency", "epAlt");
    let gpAlt = game.settings.get("5e-custom-currency", "gpAlt");
    let ppAlt = game.settings.get("5e-custom-currency", "ppAlt");

    game.settings.register("5e-custom-currency", "cp-sp", {
        name:  cpAlt + " to " + spAlt,
        scope: "world",
        config: true,
        default: 10,
        type: Number,
        onChange: () => patch(),
    });
    game.settings.register("5e-custom-currency", "sp-ep", {
        name: spAlt + " to " + epAlt,
        scope: "world",
        config: true,
        default: 5,
        type: Number,
        onChange: () => patch(),
    });
    game.settings.register("5e-custom-currency", "ep-gp", {
        name: epAlt + " to " + gpAlt,
        scope: "world",
        config: true,
        default: 2,
        type: Number,
        onChange: () => patch(),
    });
    game.settings.register("5e-custom-currency", "gp-pp", {
        name: gpAlt + " to " + ppAlt,
        scope: "world",
        config: true,
        default: 10,
        type: Number,
        onChange: () => patch(),
    });
}
