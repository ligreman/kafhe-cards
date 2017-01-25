'use strict';

module.exports = function (app) {
    var console = process.console;

    var express = require('express'),
        passport = require('passport'),
        responseUtils = require('../modules/responseUtils'),
        utils = require('../modules/utils'),
        cardUtils = require('../modules/cardUtils'),
        config = require('../modules/config'),
        packRouter = express.Router(),
        mongoose = require('mongoose'),
        TAFFY = require('taffy'),
        bodyParser = require('body-parser'),
        models = require('../models/models')(mongoose),
        Q = require('q');

    //**************** USER ROUTER **********************
    //Middleware para estas rutas
    packRouter.use(bodyParser.json());
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

        // Debo tener ese tipo de sobre en mi colección
        var packs = TAFFY(user.game.packs);
        var pack = packs({category: {has: params.category}}).first();
        if (!pack || pack.amount <= 0) {
            console.tag('PACK-OPEN').error('No tienes sobres de ese tipo');
            responseUtils.responseError(res, 400, 'errPacksNotFound');
            return;
        }

        Q.all([
            models.Card.find().exec()
        ]).spread(function (cardDB) {
            var categories = cardUtils.cardCategories(cardDB);

            // La categoría está entre las posibles
            if (!categories.hasOwnProperty(params.category)) {
                console.tag('PACK-OPEN').error('No existe esa categoría de sobres');
                responseUtils.responseError(res, 400, 'errPackCategoryNotFound');
                return;
            }

            // Genero nuevas cartas de un sobre de esa categoría
            var newCards = cardUtils.openPack(cardDB, categories, params.category);
            if (newCards === null) {
                console.tag('PACK-OPEN').error('Error al abrir el sobre');
                responseUtils.responseError(res, 400, 'errPacksErrorOpeningPack');
                return;
            }

            var newCardInfo = [];
            // Guardo las nuevas cartas en la colección
            newCards.forEach(function (carta) {
                var addToCollection = true;

                // Añado a la lista de desbloqueadas la carta, si no la tenía ya
                if (user.game.unlocked.indexOf(carta.id) !== -1) {
                    // Si además de tenerla en desbloqueada es un lugar, no la añadiré a la colección
                    // así evito duplicar los lugares
                    if (carta.type === CONSTANTS.cardTypes.place) {
                        addToCollection = false;
                    }
                } else {
                    // No la tenía en desbloqueadas así que la añado
                    user.game.unlocked.push(carta.id);
                }

                if (addToCollection) {
                    user.game.collection.push({
                        _id: utils.generateId(),
                        level: 1,
                        card: carta.id
                    });
                }

                //Info a devolver
                newCardInfo.push({
                    "card": carta.id,
                    "type": carta.type,
                    "data": carta.data,
                    "effects": carta.effects,
                    "element": carta.element,
                    "description": carta.description,
                    "name": carta.name
                });
            });

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

            // Guardo el usuario y devuelvo los datos de las cartas nuevas
            responseUtils.saveUserAndResponse(res, user, req.authInfo.access_token, newCardInfo);
        }).fail(function (err) {
            console.tag('PACK-OPEN').error(err);
        });
    });

    // Asigno los router a sus rutas
    app.use('/api/pack', packRouter);
};
