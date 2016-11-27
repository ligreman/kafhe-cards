'use strict';

module.exports = function (app) {
    var console = process.console;

    var express = require('express'),
        passport = require('passport'),
        config = require('../modules/config'),
        utils = require('../modules/utils'),
        responseUtils = require('../modules/responseUtils'),
        userRouter = express.Router(),
        mongoose = require('mongoose'),
        TAFFY = require('taffy'),
        models = require('../models/models')(mongoose);

    //**************** USER ROUTER **********************
    //Middleware para estas rutas
    userRouter.use(passport.authenticate('bearer', {
        session: false
        //failureRedirect: '/error/session'
    }));

    /**
     * GET /user
     * Obtiene la información del usuario
     */
    userRouter.get('/', function (req, res, next) {
        responseUtils.responseJson(res, {"user": responseUtils.censureUser(req.user)}, req.authInfo.access_token);
    });

    /**
     * GET /user/list
     * Obtiene la información de los usuarios de esta partida
     */
    userRouter.get('/list', function (req, res, next) {
        // Saco la lista de jugadores de la partida
        var players = req.user.game.gamedata.players,
            user = req.user;

        // Hago una búsqueda de esa lista de usuarios
        models.User
            .find({"_id": {"$in": players}})
            .select('username alias avatar leader game.afk game.stats.fame game.rank game.schedule')
            .exec(function (error, playerList) {
                if (error) {
                    console.tag('MONGO').error(error);
                    //res.redirect('/error/errUserListNotFound');
                    utils.error(res, 400, 'errUserListNotFound');
                    return;
                }

                // Censuro el schedule de los usuarios mostrando sólo lo que me interesa
                playerList.forEach(function (jugador) {
                    // Si soy yo quito eventos y encuentros
                    if (jugador.username === user.username) {
                        jugador.game.schedule.encounter = null;
                        jugador.game.schedule.event = null;
                    } else {
                        // Dejo los encounter y event y el place de los demás
                        jugador.game.schedule.weapon = null;
                        jugador.game.schedule.armor = null;
                        jugador.game.schedule.skill = null;

                        // Si la partida está en exploración permito ver los place de todos
                        if (user.game.gamedata.status !== config.GAME_STATUS.explore) {
                            jugador.game.schedule.place = null;
                        }

                        var db = TAFFY(jugador.game.schedule.encounter);
                        var encuentros = db({player: {like: user._id}}).get();
                        jugador.game.schedule.encounter = encuentros;

                        db = TAFFY(jugador.game.schedule.event);
                        var events = db({player: {like: user._id}}).get();
                        jugador.game.schedule.event = events;
                    }
                });

                responseUtils.responseJson(res, {"players": playerList}, req.authInfo.access_token);
            });
    });

    // Asigno los router a sus rutas
    app.use('/api/user', userRouter);
};
