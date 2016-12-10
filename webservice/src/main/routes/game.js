'use strict';

module.exports = function (app) {
    var console = process.console;

    var express = require('express'),
        passport = require('passport'),
        utils = require('../modules/utils'),
        gameUtils = require('../modules/gameUtils'),
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

    // Asigno los router a sus rutas
    app.use('/api/game', gameRouter);
};
