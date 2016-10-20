'use strict';

var console = process.console,
    Q = require('q'),
    config = require(__dirname + '/modules/config'),
    utils = require(__dirname + '/modules/utils'),
    cardUtils = require(__dirname + '/modules/cardUtils'),
    mongoose = require('mongoose'),
    TAFFY = require('taffy'),
    models = require(__dirname + '/models/models')(mongoose);

var userCallerReset = function (username) {
    /*-rank = 1
     - calls + 1
     - fame = 0
     - packs = []
     - collection = []*/
};

/** Reseteo de cartas para juegos diario:
 - Borro todas las de schedule.
 - Borro todas las de collection de tipo 'place::capital', 'place::town' y 'skill'
 - Añado una carta por cada una en unlocked, que se compone de 'place' de tipo capital y town y 'skill'
 - Limpiar el journal
 * @params group ID del grupo, o 'all' para todos los grupos
 */
var usersDailyReset = function (group) {
    var deferred = Q.defer();
    var condition = {};

    if (!group) {
        deferred.reject('Group not provided');
    }
    if (group !== 'all') {
        condition = {"group": group};
    }

    Q.all([
        models.User.find(condition).exec(),
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
            var newCollection = [];
            user.game.collection.forEach(function (card) {
                // Si no es place o skill la mantengo seguro
                if (card.type !== 'skill' && card.type !== 'place') {
                    newCollection.push(card);
                }

                // Si es place, y no es capital o town la mantengo
                if (card.type === 'place' && (card.data.place.type !== 'capital' && card.data.place.type !== 'town')) {
                    newCollection.push(card);
                }
            });
            user.game.collection = newCollection;


            // - Añado una carta por cada una en unlocked, que son las 'place::capital', 'place::town' y 'skill'
            var collectionUnlocked = [];
            var unlockedCards = cardUtils.findCards(cards, user.game.unlocked);
            unlockedCards.forEach(function (card) {
                collectionUnlocked.push({
                    _id: utils.generateId(),
                    card: card.id,
                    level: card.data.place.level
                })
            });
            user.game.collection = user.game.collection.concat(collectionUnlocked);

            // - Borra el journal
            user.game.journal = [];
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

//TODO añadir al usuario algo para guardar los talentos que ha ido cogiendo

/** Reseteo entre desayunos de usuario:
 - Borro todas las de schedule.
 - Borra el journal
 - Borra rewards
 - Borra notifications de user
 - Order pasa a last order, y order se limpia
 * @params group ID del grupo, o 'all' para todos los grupos
 */
var usersBreakfastReset = function (group) {
    var deferred = Q.defer();
    var condition = {};

    if (!group) {
        deferred.reject('Group not provided');
    }
    if (group !== 'all') {
        condition = {"group": group};
    }

    Q.all([
        models.User.find(condition).exec()
    ]).spread(function (users) {
        var promises = [];

        users.forEach(function (user) {
            // - Borro todas las de schedule.
            user.game.schedule = {
                weapon: [], armor: [], skill: [],
                place: [], encounter: [], event: []
            };

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
    usersDailyReset: usersDailyReset,
    usersBreakfastReset: usersBreakfastReset
};
