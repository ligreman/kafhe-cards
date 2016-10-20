'use strict';

var console = process.console,
    mongoose = require('mongoose'),
    TAFFY = require('taffy'),
    modelos = require('../models/models')(mongoose);


var openPack = function (category) {
    // Cojo las cartas
    modelos.Card.find().exec(function (error, cardDB) {
        if (error) {
            console.tag('PACK-UTILS').error(error);
            return null;
        }

        // Filtro para sacar las cartas que pueden salir en esta categoría
        var cardsTAFFY = TAFFY(cardDB);
        // var cardsAllowed = cardsTAFFY({contained_in_packs: {has: category}}).get();

        var cards = [];


        return cards;
    });
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
 * Busca una lista de ids de cartas en el global de todas las cartas
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
    getCapitals: getCapitals,
    findCards: findCards
};
