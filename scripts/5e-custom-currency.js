

//  Base Functions

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

function registerSettingsConverter() {
    game.settings.register("5e-custom-currency", "RemoveConverter", {
        name: "Remove Currency Converter",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
        onChange: () => patchCurrencies()
    });
}

function registerCurrency(settingName, originalName, originalAbrv) {
    game.settings.register("5e-custom-currency", settingName, {
        name: originalName + " Alt Name",
        scope: "world",
        config: true,
        default: originalName,
        type: String,
        onChange: () => patchCurrencies(),
    });
    game.settings.register("5e-custom-currency", settingName + "Abrv", {
        name: originalName + "Alt Abbreviation",
        scope: "world",
        config: true,
        default: originalAbrv,
        type: String,
        onChange: () => patchCurrencies(),
    });
}

function registerSettingsCurrencyNames() {
    registerCurrency("cpAlt", "Copper", "CP");
    registerCurrency("spAlt", "Silver", "SP");
    registerCurrency("epAlt", "Electrum", "EP");
    registerCurrency("gpAlt", "Gold", "GP");
    registerCurrency("ppAlt", "Platinum", "PP");
}

function registerExchangeRate(exchangeSetting, currencyOne, currencyTwo, defaultRate) {
    game.settings.register("5e-custom-currency", exchangeSetting, {
        name:  currencyOne + " to " + currencyTwo,
        scope: "world",
        config: true,
        default: defaultRate,
        type: Number,
        onChange: () => patchCurrencies(),
    });
}

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

function registerSettings() {
    registerSettingsConverter();
    registerSettingsCurrencyNames();
    registerSettingsExchangeRates();
    console.log("5e-custom-currency | Registered Settings");
}

// End Settings

function alterCharacterCurrency(html) {
    let altNames = getCurrencySettings();

    html.find('[class="denomination pp"]').text(altNames["ppAltAbrv"]);
    html.find('[class="denomination gp"]').text(altNames["gpAltAbrv"]);
    html.find('[class="denomination ep"]').text(altNames["epAltAbrv"]);
    html.find('[class="denomination sp"]').text(altNames["spAltAbrv"]);
    html.find('[class="denomination cp"]').text(altNames["cpAltAbrv"]);
}

function removeConvertCurrency(html) {
    html.find('[class="currency-item convert"]').remove();
    html.find('[data-action="convertCurrency"]').remove();
    html.find('[title="Convert Currency"]').remove();
}

// Compatibility: Let's Trade 5E

function alterTradeDialogCurrency(html) {
    let altNames = getCurrencySettings();

    const content = html.find('.dialog-content p');
    const match = content.text().match(/.+ is sending you [0-9]+((pp|gp|ep|sp|cp) \.).+/);
    if (match) content.text(content.text().replace(match[1], ' ' + altNames[match[2] + "Alt"] + '.'));
}

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

// Base Hooks
Hooks.once("init", () => {
    console.log("5e-custom-currency | Init");

    registerSettings();
});

Hooks.on("ready", function() {
    console.log("5e-custom-currency | Ready");

    patchCurrencies();
});

Hooks.on('renderActorSheet5eCharacter', (sheet, html) => {
    if(game.settings.get("5e-custom-currency", "RemoveConverter")) {
        removeConvertCurrency(html);
    }

    alterCharacterCurrency(html);
});

Hooks.on('renderActorSheet5eNPC', (sheet, html) => {
    if (game.modules.get('tidy5e-sheet')?.active && sheet.constructor.name === 'Tidy5eNPC') {
        alterCharacterCurrency(html);
        console.log("5e-custom-currency | Alter Tidy5eNPC");
    }
});

Hooks.on('renderTradeWindow', (sheet, html) => {
    alterTradeWindowCurrency(html);
    console.log("5e-custom-currency | Alter Trade Window Currency");
});

Hooks.on('renderDialog', (sheet, html) => {
    if (game.modules.get('5e-custom-currency')?.active && sheet.title === 'Incoming Trade Request') {
        alterTradeDialogCurrency(html);
        console.log("5e-custom-currency | Alter Trade Dialog Currency");
    }
});

Hooks.on('renderPartyOverviewApp', (sheet, html) => {
    alterPartyOverviewWindowCurrency(html);
    console.log("5e-custom-currency | Alter Party Overview");
});
