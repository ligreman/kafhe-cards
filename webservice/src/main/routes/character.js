'use strict';

module.exports = function (app) {
    var console = process.console;

    var express = require('express'),
        passport = require('passport'),
        responseUtils = require('../modules/responseUtils'),
        bodyParser = require('body-parser'),
        config = require('../modules/config'),
        characterRouter = express.Router(),
        mongoose = require('mongoose'),
        models = require('../models/models')(mongoose),
        TAFFY = require('taffy'),
        Q = require('q');

    //**************** USER ROUTER **********************
    //Middleware para estas rutas
    characterRouter.use(bodyParser.json());
    characterRouter.use(passport.authenticate('bearer', {
        session: false
    }));


    /**
     * POST /character/schedule
     * Asigna una carta al personaje para los juegos. Params: username (nombre de usuario al que asignar la carta), cardId (_id de la carta en collection)
     */
    characterRouter.post('/schedule', function (req, res, next) {
        var params = req.body,
            myself = req.user;

        // Busco al jugador y las cartas
        Q.all([
            models.User.findOne({"username": params.username}).exec(),
            models.Card.find().exec()
        ]).spread(function (player, cards) {
            var soyYoMismo = false;
            if (player.username === myself.username) {
                soyYoMismo = true;
            }

            // Vienen todos los parámetros
            if (!params.username || !params.cardId) {
                console.tag('CHARACTER-SCHEDULE').error('Faltan parámetros obligatorios en la petición');
                responseUtils.responseError(res, 400, 'errParamsNotFound');
                return;
            }

            // El jugador ha de pertenecer a mi grupo
            if (myself.group !== player.group) {
                console.tag('CHARACTER-SCHEDULE').error('El jugador destino de la acción no pertenece a tu grupo');
                responseUtils.responseError(res, 400, 'errCharacterWrongGroup');
                return;
            }

            // La partida ha de estar en el estado correcto
            if (myself.game.gamedata.status !== config.GAME_STATUS.planning) {
                console.tag('CHARACTER-SCHEDULE').error('No se permite esta acción en el estado actual de la partida');
                responseUtils.responseError(res, 400, 'errGameStatusNotAllowed');
                return;
            }

            // Debo tener la carta en mi colección
            var collection = TAFFY(myself.game.collection);
            var cardInCollection = collection({_id: {like: params.cardId}}).first();

            if (!cardInCollection) {
                console.tag('CHARACTER-SCHEDULE').error('No tienes esa carta en tu colección');
                responseUtils.responseError(res, 400, 'errCharacterDontHaveCard');
                return;
            }

            // El tipo de la carta debe ser uno de los permitidos
            var dbCards = TAFFY(cards);
            var cardInDB = dbCards({id: cardInCollection.card}).first();

            // Según sea yo el pj destino o no, permito una carta u otra
            if (soyYoMismo) {
                if (config.CARD_TYPES_OWN.indexOf(cardInDB.type) === -1) {
                    console.tag('CHARACTER-SCHEDULE').error('La carta no es correcta');
                    responseUtils.responseError(res, 400, 'errCardWrong');
                    return;
                }
            } else {
                if (config.CARD_TYPES_ENEMY.indexOf(cardInDB.type) === -1) {
                    console.tag('CHARACTER-SCHEDULE').error('La carta no es correcta');
                    responseUtils.responseError(res, 400, 'errCardWrong');
                    return;
                }
            }

            // Ha de tener disponible hueco para ese tipo de carta
            var espacio = player.game.schedule[cardInDB.type];
            if (espacio.length >= config.DEFAULTS.schedule_limits[cardInDB.type]) {
                console.tag('CHARACTER-SCHEDULE').error('No puedes asignar más cartas de ese tipo al jugador');
                responseUtils.responseError(res, 400, 'errCharacterNoSpaceSchedule');
                return;
            }

            // Una vez validado todo, añado la carta al usuario
            if (soyYoMismo) {
                myself.game.schedule[cardInDB.type].push({card: cardInCollection.card, level: cardInCollection.level});
            } else {
                player.game.schedule[cardInDB.type].push({
                    player: myself._id,
                    card: cardInCollection.card,
                    level: cardInCollection.level
                });
            }

            // La elimino de mi colección
            var newCollection = [];
            myself.game.collection.forEach(function (carta) {
                // Si es la carta añadida, no la guardo en la colección
                if (carta._id !== params.cardId) {
                    newCollection.push(carta);
                }
            });
            myself.game.collection = newCollection;

            // Guardo el jugador y a mi mísmo
            if (soyYoMismo) {
                responseUtils.saveUserAndResponse(res, myself, req.authInfo.access_token);
            } else {
                player.save(function (err) {
                    if (err) {
                        console.tag('MONGO').error(err);
                        // console.error(err);
                        responseUtils.responseError(res, 400, 'errMongoSave');
                    } else {
                        // A mí y termino
                        responseUtils.saveUserAndResponse(res, myself, req.authInfo.access_token);
                    }
                });
            }
        });
    });

    // Asigno los router a sus rutas
    app.use('/api/character', characterRouter);
};
