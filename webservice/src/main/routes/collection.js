'use strict';

module.exports = function (app) {
    var console = process.console;

    var express = require('express'),
        passport = require('passport'),
        responseUtils = require('../modules/responseUtils'),
        config = require('../modules/config'),
        collectionRouter = express.Router(),
        mongoose = require('mongoose'),
        models = require('../models/models')(mongoose),
        Q = require('q');

    //**************** USER ROUTER **********************
    //Middleware para estas rutas
    collectionRouter.use(passport.authenticate('bearer', {
        session: false
    }));


    /**
     * POST /collection/fusion
     * Fusiona dos cartas para crear una nueva de nivel superior. Params: cardIdA, cardIdB. Ids de las cartas a fusionar
     */
    collectionRouter.post('/fusion', function (req, res, next) {
        var params = req.body,
            user = req.user;

        // Busco al jugador y las cartas
        Q.all([
            models.Card.find().exec()
        ]).spread(function (cards) {
            // Vienen dos cartas en parámetros
            if (!params.cardIdA || !params.cardIdB) {
                console.tag('COLLECTION-FUSION').error('Faltan parámetros obligatorios en la petición');
                responseUtils.responseError(res, 400, 'errParamsNotFound');
                return;
            }

            // Debo tener las cartas en mi colección
            var collection = TAFFY(user.game.collection);
            var cardAInCollection = collection({_id: params.cardIdA}).first();
            var cardBInCollection = collection({_id: params.cardIdB}).first();

            if (!cardAInCollection || !cardBInCollection) {
                console.tag('COLLECTION-FUSION').error('No tienes las cartas en tu colección');
                responseUtils.responseError(res, 400, 'errCollectionDontHaveCards');
                return;
            }

            // Las cartas han de ser las mismas y mismo nivel
            var dbCards = TAFFY(cards);
            var cardAInDB = dbCards({id: cardAInCollection.card}).first();
            var cardBInDB = dbCards({id: cardBInCollection.card}).first();

            if (cardAInDB.id !== cardBInDB.id || cardAInCollection.level !== cardBInCollection.level) {
                console.tag('CHARACTER-SCHEDULE').error('No puedes fusionar esas cartas, porque la carta o su nivel no coinciden');
                responseUtils.responseError(res, 400, 'errCollectionCardsCantFuse');
                return;
            }

            // Las cartas no han de poder subir de nivel (no son de nivel máximo ya)
            if (cardAInCollection.level >= config.DEFAULTS.collection.card_max_level || cardBInCollection.level >= config.DEFAULTS.collection.card_max_level) {
                console.tag('CHARACTER-SCHEDULE').error('No puedes fusionar esas cartas porque no pueden subir más de nivel');
                responseUtils.responseError(res, 400, 'errCollectionCardsCantLevelUp');
                return;
            }

            // Las elimino de mi colección
            var newCollection = [];
            user.game.collection.forEach(function (carta) {
                // Si es la carta añadida, no la guardo en la colección
                if (carta._id !== params.cardId) {
                    newCollection.push(carta);
                }
            });

            // Creo una nueva de nivel superior
            newCollection.push({card: cardAInCollection.card, level: cardAInCollection.level + 1});
            // Guardo la nueva colección
            user.game.collection = newCollection;

            // A mí y termino
            responseUtils.saveUserAndResponse(res, user, req.authInfo.access_token);
        });
    });

    // Asigno los router a sus rutas
    app.use('/api/collection', collectionRouter);
};
