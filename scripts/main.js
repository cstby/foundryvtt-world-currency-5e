/**
 * Registers hook callbacks.
 */

import * as core from "./5e-custom-currency.js";
import { registerSettings } from "./settings.js";
import * as compatibility from "./compatibility.js";
import * as convert from "./convert.js";

// Core Hooks

Hooks.once("init", () => {
    registerSettings();
});

Hooks.on("ready", function() {
    core.patchCurrencies();
});

Hooks.on('renderActorSheet5eCharacter', (sheet, html) => {
    if(game.settings.get("5e-custom-currency", "RemoveConverter")) {
        core.removeConvertCurrency(html);
    }
    if(game.settings.get("5e-custom-currency", "cpAltRemove")) {
        core.removeCurrencyCp(html);
    }
    if(game.settings.get("5e-custom-currency", "spAltRemove")) {
        core.removeCurrencySp(html);
    }
    if(game.settings.get("5e-custom-currency", "epAltRemove")) {
        core.removeCurrencyEp(html);
    }
    if(game.settings.get("5e-custom-currency", "gpAltRemove")) {
        core.removeCurrencyGp(html);
    }
    if(game.settings.get("5e-custom-currency", "ppAltRemove")) {
        core.removeCurrencyPp(html);
    }
    // This is only necessary for tidy5e.
    compatibility.alterCharacterCurrency(html);
    console.log("5e-custom-currency | Altered character sheet");
});

Hooks.on('renderItemSheet', (sheet, html, data) => {
    if (game.user.isGM) {
        html.find('[name="data.price"]').val(convert.gpToStandard(data.data.price));
    } else {
        html.find('[name="data.price"]').prop('disabled', true);
        html.find('[name="data.price"]').val(convert.formatCurrency(gpToStandard(data.data.price)));
    }
});

Hooks.on('closeItemSheet5e', (sheet, html) => {
    if (game.user.isGM) {
        (async function(sheet) {
            const document  = await fromUuid(sheet.object.uuid);
            document.update({ 'data.price': convert.standardToGp(sheet.object.data.data.price)});
        })(sheet);
    }
});

// Compatibility with other modules:

// Tidy 5e Sheet
Hooks.on('renderActorSheet5eNPC', (sheet, html) => {
    if (game.modules.get('tidy5e-sheet')?.active && sheet.constructor.name === 'Tidy5eNPC') {
        compatibility.alterCharacterCurrency(html);
        console.log("5e-custom-currency | Altered Tidy5eNPC");
    }
});

// Let's Trade 5e
Hooks.on('renderTradeWindow', (sheet, html) => {
    compatibility.alterTradeWindowCurrency(html);
    console.log("5e-custom-currency | Altered Trade Window Currency");
});

Hooks.on('renderDialog', (sheet, html) => {
    if (game.modules.get('5e-custom-currency')?.active && sheet.title === 'Incoming Trade Request') {
        compatibility.alterTradeDialogCurrency(html);
        console.log("5e-custom-currency | Altered Trade Dialog Currency");
    }
});

// Party Overview
Hooks.on('renderPartyOverviewApp', (sheet, html) => {
    compatibility.alterPartyOverviewWindowCurrency(html);
    console.log("5e-custom-currency | Altered Party Overview");
});

// Loot Sheet 5e & Merchant Sheet
Hooks.on('renderActorSheet', (sheet, html, data) => {
    $.each($('.item-price'), function(index, value) {
        $(value).text(convert.formatCurrency(convert.gpToStandard(parseInt($(value).text()))));
    });
    console.log("5e-custom-currency | Altered Sheet");
});
