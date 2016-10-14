'use strict';

var console = process.console,
    mongoose = require('mongoose'),
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

module.exports = {
    openPack: openPack
};
