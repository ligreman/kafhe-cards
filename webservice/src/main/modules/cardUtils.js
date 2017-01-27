'use strict';

var console = process.console,
    config = require('../modules/config'),
    utils = require('../modules/utils'),
    mongoose = require('mongoose'),
    TAFFY = require('taffy');


/**
 * Extrae las categorías de sobres y clasifica las cartas según ellas
 */
var cardCategories = function (cardDB) {
    var categories = {};

    cardDB.forEach(function (card) {
        card.contained_in_packs.forEach(function (pack) {
            if (!categories[pack.category]) {
                categories[pack.category] = [];
            }

            categories[pack.category].push({
                card: card.id,
                frequency: pack.frequency
            });
        });
    });

    return categories;
};

var openPack = function (cardDB, categories, category) {
    // Posibles cartas que pueden salir
    var posibles = categories[category];

    // A ver qué rarezas salen
    var rarezas = [];
    for (var i = 0; i < config.DEFAULTS.collection.cards_per_pack; i++) {
        var tirada = utils.rollDice(1, 100);

        if (tirada <= config.DEFAULTS.collection.frequency.E) {
            rarezas.push('E');
        } else if (tirada <= config.DEFAULTS.collection.frequency.R) {
            rarezas.push('R');
        } else if (tirada <= config.DEFAULTS.collection.frequency.I) {
            rarezas.push('I');
        } else {
            rarezas.push('C');
        }
    }

    console.log("posibles y rarezas");
    console.log(posibles);
    console.log(rarezas);

    var cardsTAFFY = TAFFY(cardDB);
    var posiblesDB = TAFFY(posibles);
    var cards = [];

    // Por cada rareza, saco una carta de ese tipo aleatoriamente
    rarezas.forEach(function (rar) {
        console.log("Rareza " + rar);
        var posiblesFiltered = posiblesDB().filter({frequency: rar}).get();
        console.log("posible filtered");
        console.log(posiblesFiltered);
        var cuenta = posiblesFiltered.length;

        // Si no hay cartas de esta rareza, lo que hago es coger una común.
        if (cuenta === 0) {
            posiblesFiltered = posiblesDB().filter({frequency: 'C'}).get();
            cuenta = posiblesFiltered.length;
            console.log("Vaya, cojo una común");
            console.log(posiblesFiltered);
        }

        var tirada = utils.randomInt(0, cuenta - 1);
        var cartaPosible = posiblesFiltered[tirada];
        console.log(cuenta + " // " + tirada + " // " + cartaPosible);
        var carta = cardsTAFFY({id: cartaPosible.card}).first();
        console.log("carta que sale");
        console.log(carta);
        cards.push(carta);
    });

    return cards;
};

/**
 * Devuelve la lista de cartas de capitales del juego
 * @param cards Base de datos de cartas
 * @param onlyIds Boolean que indica si quiero obtener un array de cartas o de ids sólo
 */
var getCapitals = function (cards, onlyIds) {
    var cardsTAFFY = TAFFY(cards);
    var capitals = cardsTAFFY({'type': 'place', 'data.place.type': 'capital'}).get();

    var result = capitals;

    if (onlyIds) {
        result = [];
        capitals.forEach(function (card) {
            result.push(card.id);
        });
    }

    return result;
};

/**
 * Busca una lista cartas a partir de sus ids, en el global de todas las cartas
 * @param cards
 * @param cardIds
 */
var findCards = function (cards, cardIds) {
    var cardsTAFFY = TAFFY(cards);
    var cartas = cardsTAFFY({'id': cardIds}).get();

    return cartas;
};

module.exports = {
    openPack: openPack,
    cardCategories: cardCategories,
    getCapitals: getCapitals,
    findCards: findCards
};
