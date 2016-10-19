'use strict';

var console = process.console,
    Q = require('q'),
    config = require(__dirname + '/modules/config'),
    utils = require(__dirname + '/modules/utils'),
    cardUtils = require(__dirname + '/modules/cardUtils'),
    mongoose = require('mongoose'),
    TAFFY = require('taffy'),
    modelos = require(__dirname + '/models/models')(mongoose);

var gameUpdateAllByStatus = function (oldStatus, newStatus) {
    var deferred = Q.defer(),
        condition = {};

    if (oldStatus) {
        condition = {"status": oldStatus};
    }

    modelos.Game.update(condition, {$set: {"status": newStatus}}, {multi: true},
        function (error, numAffected) {
            if (error) {
                deferred.reject(error);
            }
            deferred.resolve(numAffected);
        }
    );

    return deferred.promise;
};

var userCallerReset = function (username) {
    /*-rank = 1
     - calls + 1
     - fame = 0
     - packs = []
     - collection = []*/
};

var usersBreakfastReset = function (group) {
    /*
     - Borro todas las de schedule.
     - Borro todas las de collection de tipo 'place::capital', 'place::town' y 'skill'
     - Borro todas las de unlocked.
     - Borra el journal
     - Borra rewards
     - Borra notifications de user
     - Añado las capitales a unlocked
     - Añado una carta por cada una en unlocked
     - Order pasa a last order, y order se limpia
     */
    var deferred = Q.defer();

    if (!group) {
        deferred.reject('Group not provided');
    }

    Q.all([
        models.User.find({"group": group}).exec(),
        models.Card.find().exec()
    ]).spread(function (users, cards) {
        var promises = [];

        users.forEach(function (user) {
            // - Borro todas las de schedule.
            user.game.schedule = {
                weapon: [], armor: [], skill: [],
                place: [], encounter: [], event: []
            };
            // - Borro todas las de collection de tipo 'place::capital', 'place::town' y 'skill'
            //TODO
            // - Borro todas las de unlocked.
            //TODO realmente no tengo que resetear las unlocked, ni los talentos ni nada entre desayunos. Sólo es si te toca llamar
            //TODO añadir al usuario algo para guardar los talentos que ha ido cogiendo
            user.game.unlocked = [];
            // - Borra el journal
            user.game.journal = [];
            // - Borra rewards
            user.game.rewards = {
                packs: [],
                tostolares: 0,
                fame: 0
            };
            // - Borra notifications de user
            user.game.notifications = [];
            // - Añado las capitales a unlocked
            var capitales = cardUtils.getCapitals(cards, false);
            var idCapitales = [], collectionCapitales = [];
            capitales.forEach(function (card) {
                idCapitales.push(card.id);
                collectionCapitales.push({
                    _id: utils.generateId(),
                    card: card.id,
                    level: card.data.place.level
                })
            });
            user.game.unlocked = idCapitales;

            // - Añado una carta por cada una en unlocked, que son las capitales
            user.game.collection = user.game.collection.concat(collectionCapitales);

            // - Order pasa a last order, y order se limpia
            user.game.last_order = utils.cloneObject(user.game.order);
            user.game.order = {meal: null, drink: null, ito: false};
            promises.push(user.save());
        });

        Q.allSettled(promises).then(function (results) {
            var resultado = true, razon = '';
            results.forEach(function (result) {
                if (result.state !== "fulfilled") {
                    resultado = result.value;
                    razon = result.reason;
                }
            });

            if (resultado !== true) {
                deferred.reject(razon);
            } else {
                deferred.resolve();
            }
        });
    });

    return deferred.promise;
};

module.exports = {
    userCallerReset: userCallerReset,
    usersBreakfastReset: usersBreakfastReset
};
