'use strict';

var console = process.console,
    Q = require('q'),
    config = require('../config'),
    utils = require('../utils'),
    cardUtils = require('../cardUtils'),
    mongoose = require('mongoose'),
    models = require('../../models/models')(mongoose);


/** Reseteo para juegos diario:
 - Borro todas las de schedule.
 - Borro todas las de collection de tipo 'place::capital', 'place::town' y 'skill'
 - Añado una carta por cada una en unlocked, que se compone de 'place' de tipo capital y town y 'skill'
 - Limpiar el journal
 - Doy recompensas si hay
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

            // Doy recompensas
            if (user.game.rewards.packs.length > 0) {
                // Añado cada pack
                user.game.rewards.packs.forEach(function (reward) {
                    // Busco dónde añadirlo o si tengo que crear uno nuevo
                    var encontrado = false;
                    user.game.packs.forEach(function (miPack) {
                        if (miPack.category === reward.category) {
                            // Añado
                            miPack.amount++;
                            encontrado = true;
                        }
                    });

                    // Si no tenía ninguno de ese tipo, pues añado el primero
                    if (!encontrado) {
                        user.game.packs.push({
                            amount: 1,
                            category: reward.category,
                            source: reward.source
                        });
                    }
                });
            }
            if (user.game.rewards.fame > 0) {
                user.game.fame += user.game.rewards.fame;
            }
            if (user.game.rewards.tostolates > 0) {
                user.game.tostolares += user.game.rewards.tostolates;
            }

            // Limpio recompensas
            user.game.rewards = {packs: [], tostolares: 0, fame: 0};
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

/**
 * Cambia el estado AFK de los usuarios de un grupo o todos
 */
var usersAFK = function (group, status) {
    var deferred = Q.defer();
    var condition = {};

    if (!group || !status) {
        deferred.reject('Params not provided');
    }
    if (group !== 'all') {
        condition = {"group": group};
    }

    models.User.update(condition, {"game.afk": status}, {multi: true},
        function (error, numAffected) {
            if (error) {
                deferred.reject(error)
            }
            deferred.resolve(numAffected);
        }
    );

    return deferred.promise;
};

/** Reseteo entre desayunos de todos usuarios (si se ha llamado):
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
        models.User.find(condition).exec(),
        models.Game.find().exec()
    ]).spread(function (users, games) {
        var promises = [];

        // Lista de usuarios que pertenecen a una partida ya finalizada
        var usersClosed = [];
        games.forEach(function (game) {
            if (game.status === config.GAME_STATUS.closed) {
                usersClosed = usersClosed.concat(game.players);
            }
        });

        users.forEach(function (user) {
            // Si es un usuario de partida cerrada continuo, si no, me lo salto
            if (usersClosed.indexOf(user._id) !== -1) {
                return;
            }

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
    usersDailyReset: usersDailyReset,
    usersBreakfastReset: usersBreakfastReset,
    usersAFK: usersAFK
};
