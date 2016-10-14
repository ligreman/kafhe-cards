'use strict';

module.exports = function (app) {
    var console = process.console;

    var express = require('express'),
        passport = require('passport'),
        responseUtils = require('../modules/responseUtils'),
        cardUtils = require('../modules/cardUtils'),
        config = require('../modules/config'),
        packRouter = express.Router(),
        mongoose = require('mongoose'),
        models = require('../models/models')(mongoose),
        Q = require('q');

    //**************** USER ROUTER **********************
    //Middleware para estas rutas
    packRouter.use(passport.authenticate('bearer', {
        session: false
    }));


    /**
     * POST /pack/open
     * Abre un sobre. Params: category: categoría del sobre a abrir.
     */
    packRouter.post('/open', function (req, res, next) {
        var params = req.body,
            user = req.user;

        // Vienen parámetros
        if (!params.category) {
            console.tag('PACK-OPEN').error('Faltan parámetros obligatorios en la petición');
            responseUtils.responseError(res, 400, 'errParamsNotFound');
            return;
        }

        // La categoría está entre las posibles
        if (config.DEFAULTS.collection.pack_categories.indexOf(params.category) === -1) {
            console.tag('PACK-OPEN').error('No existe esa categoría de sobres');
            responseUtils.responseError(res, 400, 'errPackCategoryNotFound');
            return;
        }

        // Debo tener ese tipo de sobre en mi colección
        var packs = TAFFY(user.game.packs);
        var pack = packs({category: params.category}).first();
        if (!pack || pack.amount <= 0) {
            console.tag('PACK-OPEN').error('No tienes sobres de ese tipo');
            responseUtils.responseError(res, 400, 'errPacksNotFound');
            return;
        }

        // Genero nuevas cartas de un sobre de esa categoría
        var newCards = cardUtils.openPack(params.category);
        if (newCards === null) {
            console.tag('PACK-OPEN').error('Error al abrir el sobre');
            responseUtils.responseError(res, 400, 'errPacksErrorOpeningPack');
            return;
        }

        // Guardo las nuevas cartas en la colección
        user.game.collection = user.game.collection.concat(newCards);

        // Elimino el pack de mi colección
        var newPacks = [];
        user.game.packs.forEach(function (pack) {
            if (pack.category !== params.category) {
                newPacks.push(pack);
            } else {
                pack.amount--;
                // Si sigo teneniendo más sobres de estos los mantengo
                if (pack.amount > 0) {
                    newPacks.push(pack)
                }
            }
        });

        // Guardo los packs
        user.game.packs = newPacks;

        // A mí y termino
        responseUtils.saveUserAndResponse(res, user, req.authInfo.access_token);
    });

    // Asigno los router a sus rutas
    app.use('/api/pack', packRouter);
};
