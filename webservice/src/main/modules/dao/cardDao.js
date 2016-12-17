'use strict';

var console = process.console,
    Q = require('q'),
    mongoose = require('mongoose'),
    models = require('../../models/models')(mongoose);


var getCards = function (type, onlyIds) {
    var deferred = Q.defer();
    var condition = {};

    if (type && type !== '' && type !== 'all') {
        condition = {"type": type};
    }

    Q.all([
        models.Card.find(condition).exec()
    ]).spread(function (cards) {
        if (!cards) {
            deferred.reject();
        }

        var result = [];
        if (onlyIds) {
            cards.forEach(function (card) {
                result.push(card.id);
            });
        } else {
            result = cards;
        }

        deferred.resolve(result);
    });

    return deferred.promise;
};


var getPlaceCards = function (type, onlyIds) {
    var deferred = Q.defer();
    var condition = {};

    if (type && type !== '' && type !== 'all') {
        condition = {"type": 'place', "data.place.type": type};
    }

    Q.all([
        models.Card.find(condition).exec()
    ]).spread(function (cards) {
        if (!cards) {
            deferred.reject();
        }

        var result = [];
        if (onlyIds) {
            cards.forEach(function (card) {
                result.push(card.id);
            });
        } else {
            result = cards;
        }

        deferred.resolve(result);
    });

    return deferred.promise;
};

module.exports = {
    getCards: getCards,
    getPlaceCards: getPlaceCards
};
