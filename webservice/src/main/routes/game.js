'use strict';

module.exports = function (app) {
    var console = process.console;

    var express = require('express'),
        passport = require('passport'),
        utils = require('../modules/utils'),
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
        console.log("DATATA");
        //Proceso y devuelvo los resultados
        var answer = function (cards, talents, meals, drinks) {
            if (!cards || !talents || !meals || !drinks) {
                console.tag('MONGO').error(err);
                utils.error(res, 400, 'errGameDataNotFound');
                return;
            }

            responseUtils.responseJson(res, {
                "cards": cards,
                "talents": talents,
                "meals": meals,
                "drinks": drinks
            }, req.authInfo.access_token);
        };

        // Lanzo las dos consultas a Mongo
        Q.all([
            models.Card.find({}).select('-_id').exec(),
            models.Talent.find({}).select('-_id').exec(),
            models.Meal.find({}).select('-_id').exec(),
            models.Drink.find({}).select('-_id').exec()
        ]).spread(answer);
    });

    /**
     * GET /game/version
     * Devuelve la versión de juego
     */
    gameRouter.get('/version', function (req, res, next) {
        models.System
            .findOne()
            .exec(function (error, system) {
                if (error) {
                    console.tag('MONGO').error(error);
                    utils.error(res, 400, 'errRetrievingSystemData');
                    return;
                }

                responseUtils.responseJson(res, {"version": system.version}, req.authInfo.access_token);
            });
    });

    // Asigno los router a sus rutas
    app.use('/api/game', gameRouter);
};
