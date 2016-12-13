'use strict';

module.exports = function (app) {
    var console = process.console;

    var express = require('express'),
        passport = require('passport'),
        utils = require('../modules/utils'),
        gameUtils = require('../modules/gameUtils'),
        cardDao = require('../modules/dao/cardDao'),
        config = require('../modules/config'),
        responseUtils = require('../modules/responseUtils'),
        gameRouter = express.Router(),
        bodyParser = require('body-parser'),
        Q = require('q'),
        mongoose = require('mongoose'),
        models = require('../models/models')(mongoose);

    //**************** ORDER ROUTER **********************
    //Middleware para estas rutas
    gameRouter.use(bodyParser.json());
    gameRouter.use(passport.authenticate('bearer', {
        session: false
        //failureRedirect: '/error/session'
    }));

    /**
     * GET /game/data
     * Obtiene la información general del juego
     */
    gameRouter.get('/data', function (req, res, next) {
        //Proceso y devuelvo los resultados
        var answer = function (cards, talents, meals, drinks) {
            if (!cards || !talents || !meals || !drinks) {
                console.tag('MONGO').error('Error al recuperar los datos');
                utils.error(res, 400, 'errGameDataNotFound');
                return;
            }

            // Ahora genero el objeto con datos de system que serán constantes predefinidas del juego
            var system = {
                maxCardLevel: config.DEFAULTS.collection.card_max_level,
                costs: config.DEFAULTS.cost
            };

            responseUtils.responseJson(res, {
                "cards": cards,
                "talents": talents,
                "meals": meals,
                "drinks": drinks,
                "system": system
            }, req.authInfo.access_token);
        };

        // Lanzo las dos consultas a Mongo
        Q.all([
            models.Card.find().select('-_id').exec(),
            models.Talent.find().select('-_id').exec(),
            models.Meal.find().select('-_id').exec(),
            models.Drink.find().select('-_id').exec()
        ]).spread(answer);
    });

    /**
     * GET /game/stats
     * Obtiene estadísticas de la partida
     */
    gameRouter.get('/stats', function (req, res, next) {
        var user = req.user;

        //Proceso y devuelvo los resultados
        var answer = function (probabilitiesData) {
            if (!probabilitiesData) {
                console.tag('MONGO').error('Error al recuperar las estadísticas');
                utils.error(res, 400, 'errGameStatsNotFound');
                return;
            }

            var users = probabilitiesData.users;

            // Calculo el ranking de usuarios según su rank y fama
            var ranking = [];
            var byRank = users.slice(0);
            byRank.sort(function (a, b) {
                return b.game.rank - a.game.rank;
            });
            byRank.forEach(function (r) {
                ranking.push({
                    name: r.alias,
                    rank: r.game.rank,
                    leader: r.leader
                });
            });

            // Ranking segun fama
            var fame = [];
            var byFame = users.slice(0);
            byFame.sort(function (a, b) {
                return b.game.fame - a.game.fame;
            });
            byFame.forEach(function (r) {
                fame.push({
                    name: r.alias,
                    fame: r.game.fame,
                    leader: r.leader
                });
            });

            responseUtils.responseJson(res, {
                "probabilities": probabilitiesData.probabilities,
                "ranking": ranking,
                "fame": fame
            }, req.authInfo.access_token);
        };

        // Lanzo las dos consultas a Mongo
        Q.all([
            gameUtils.calculateUsersProbabilities(user.game.gamedata._id)
        ]).spread(answer);
    });

    /**
     * GET /game/version
     * Devuelve la versión de juego
     */
    gameRouter.get('/version', function (req, res, next) {
        models.System
            .findOne()
            .exec(function (error, sistema) {
                if (error) {
                    console.tag('MONGO').error(error);
                    utils.error(res, 400, 'errRetrievingSystemData');
                    return;
                }

                responseUtils.responseJson(res, {"version": sistema.version}, req.authInfo.access_token);
            });
    });

    /**
     * GET /game/launchbreakfast
     * Lanza el desayuno
     + Al cerrar el game (lanzar el desayuno):
     - Dar recompensas
     - Sube de rank de toda la gente
     - Sube times de toda la gente
     - Al llamador se aplica el reset por llamar

     + Reseteo por llamar:
     - rank =1
     - calls +1
     - packs =[]
     - collection =[]
     - unlocked =[]
     - talents =[]
     - Añadir a unlocked las capitales

     + Reseteo entre desayunos de usuario si se ha llamado:
     - Borro todas las de schedule.
     - fame =0
     - Borra el journal y notificaciones
     - Borra rewards
     - Order pasa a last order, y order se limpia
     */
    gameRouter.get('/launchbreakfast', function (req, res, next) {
        var caller,
            user = req.user,
            idGame = req.user.game.gamedata._id;

        // Si el user no es lider fuera
        if (!user.leader) {
            console.tag('GAME-LAUNCH').error('No eres líder de grupo para lanzar el desayuno');
            utils.error(res, 400, 'errNoLeader');
            return;
        }

        Q.all([
            gameUtils.calculateUsersProbabilities(idGame),
            cardDao.getCards('capital', true),
            models.Game.findById(idGame).exec()
        ]).spread(function (result, capitalsIds, game) {
            var probs = result.probabilities;
            var users = result.users;

            // Lanzo el "dado" de 100 caras 1 vez
            var tirada = utils.rollDice(1, 100);

            var anterior = 0;
            probs.forEach(function (valor, userId) {
                if (valor == 0) {
                    return;
                }

                if (((anterior + 1) <= tirada) && (tirada <= (anterior + valor))) {
                    caller = userId;
                }

                anterior += valor;
            });

            if (!caller) {
                console.tag('GAME-LAUNCH').error('No se ha podido elegir llamador');
                utils.error(res, 400, 'errNoCaller');
                return;
            }

            // Una vez lo sé procedo a gestionar el cierre del desayuno
            var promesas = [], llamador = null;
            users.forEach(function (user) {
                if (user._id === caller) {
                    llamador = user;

                    // Llamador
                    user.game.rank = 1;
                    user.calls = user.calls + 1;
                    user.game.packs = [];
                    user.game.collection = [];

                    // Reseteo unlocked a sólo las capitales
                    user.game.unlocked = capitalsIds;
                    user.game.talents = [{
                        combat: [],
                        exploration: [],
                        survival: [],
                        points: 0
                    }];
                } else {
                    // No llamador, sube de rango
                    user.game.rank = user.game.rank + 1;
                    // Punto de talento
                    user.game.talents.points++;
                }

                // Todos Los jugadores se resetean para el nuevo desayuno
                user.times = user.times + 1;
                user.fame = 0;

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

                // - Order pasa a last order, y order se limpia
                if (user.game.order.meal || user.game.drink) {
                    user.game.last_order = extend({}, user.game.order);
                }
                user.game.order = {meal: null, drink: null, ito: false};

                promesas.push(user.save());
            });

            // Cambio el game de status y pongo el caller
            game.status = config.GAME_STATUS.closed;
            game.caller = caller;
            // Aumento times
            game.times = game.times + 1;
            promesas.push(game.save());

            Q.allSettled(promesas).then(function (results) {
                var resultado = true, razon = '';
                results.forEach(function (result) {
                    if (result.state !== "fulfilled") {
                        resultado = result.value;
                        razon = result.reason;
                    }
                });

                if (resultado !== true) {
                    console.tag('GAME-LAUNCH').error(razon);
                    utils.error(res, 400, 'errSaveCaller');
                    return;
                }

                responseUtils.responseJson(res, {
                    "caller": {
                        id: llamador._id,
                        alias: llamador.alias,
                        avatar: llamador.avatar
                    }
                }, req.authInfo.access_token);
            });
        });
    });

    // Asigno los router a sus rutas
    app.use('/api/game', gameRouter);
};
