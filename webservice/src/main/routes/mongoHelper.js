'use strict';

module.exports = function (app) {
    var console = process.console;

    var express = require('express'),
        passport = require('passport'),
        events = require('events'),
        eventEmitter = new events.EventEmitter(),
        mongoRouter = express.Router(),
        mongoose = require('mongoose'),
        utils = require('../modules/utils'),
        models = require('../models/models')(mongoose),
        fakery = require('mongoose-fakery'),
        q = require('q');

    var finalizado = 0;

    // Modelos
    var admins = [
        {username: "admin", password: "admin"}
    ];

    var meals = [
        {name: 'Plátano', ito: false, id: 'meal00'},
        {name: 'Bocata', ito: true, id: 'meal01'},
        {name: 'Salchicha', ito: true, id: 'meal02'},
        {name: 'Tortilla con chorizo', ito: true, id: 'meal03'},
        {name: 'Tortilla con cebolla', ito: true, id: 'meal04'},
        {name: 'Pulga de pollo queso', ito: true, id: 'meal05'},
        {name: 'Pulga de perro asado', ito: true, id: 'meal06'},
        {name: 'Peperoni', ito: false, id: 'meal07'}
    ];

    var drinks = [
        {name: 'Té con leche', ito: false, id: 'drink00'},
        {name: 'Café con leche', ito: true, id: 'drink01'},
        {name: 'Té americano', ito: true, id: 'drink02'},
        {name: 'Zumo de pera', ito: true, id: 'drink03'}
    ];

    var cards = [
        {
            id: '1', name: 'Pistola', 'type': 'weapon', element: 'fire', effects: [],
            contained_in_packs: [{category: 'place1', frequency: 50}]
        },
        {
            id: '5', name: 'Encuentro', 'type': 'encounter', element: 'fire', effects: [],
            contained_in_packs: [{category: 'place1', frequency: 50}]
        },
        {
            id: '2', name: 'Casa Manolo', 'type': 'place', element: 'none', effects: [],
            contained_in_packs: [{category: 'general', frequency: 90}],
            data: {
                place: {
                    lat: -49.85,
                    long: -107.2,
                    level: 1,
                    region: 'Booooo',
                    pack_reward: 'general',
                    'type': 'capital',
                    adjacent_places: ['3', '4']
                }
            }
        },
        {
            id: '3', name: 'Ciudad jarl', 'type': 'place', element: 'none', effects: [],
            contained_in_packs: [{category: 'place1', frequency: 30}],
            data: {
                place: {
                    lat: -49.05,
                    long: -103.16,
                    level: 2,
                    region: 'Booooo',
                    pack_reward: 'place1',
                    'type': 'town',
                    adjacent_places: ['2']
                }
            }
        },
        {
            id: '4', name: 'Lago malo', 'type': 'place', element: 'none', effects: [],
            contained_in_packs: [{category: 'place1', frequency: 30}],
            data: {
                place: {
                    lat: -51.74,
                    long: -106.92,
                    region: 'Booooo',
                    level: 1,
                    pack_reward: 'place1',
                    'type': 'zone',
                    subtype: 'forest',
                    adjacent_places: ['2']
                }
            }
        }
    ];

    var talents = [
        {
            id: 'talent00', name: 'Talento 0', description: 'Er talento 0',
            branch: 'combat', cards: ['skill01'], required: []
        },
        {
            id: 'talent01', name: 'Talento 1', description: 'Er talento 1',
            branch: 'exploration', cards: [], required: []
        },
        {
            id: 'talent02', name: 'Talento 2', description: 'Er talento 2',
            branch: 'exploration', cards: ['skill02'], required: ['talent01']
        },
        {
            id: 'talent03', name: 'Talento 3', description: 'Er talento 3',
            branch: 'exploration', cards: ['skill03'], required: ['talent01', 'talent02']
        }
    ];

    var date = new Date();
    var userId = new mongoose.Types.ObjectId;
    var userId2 = new mongoose.Types.ObjectId;
    var userId3 = new mongoose.Types.ObjectId;

    var game = [{
        _id: new mongoose.Types.ObjectId,
        repeat: true,
        status: 1,
        caller: null,
        players: [userId, userId2, userId3]
        /*notifications: [{
         message: 'nFuryModeGame#' + JSON.stringify({"name": "Pepito"}),
         type: 'fury', timestamp: date.getTime() + 10000
         }, {
         message: 'nFuryModeGame#' + JSON.stringify({"name": "Pepito"}),
         type: 'system', timestamp: date.getTime() + 1000
         }, {
         message: 'nFuryModeGame#' + JSON.stringify({"name": "Pepito"}),
         type: 'breakfast', timestamp: date.getTime() + 100
         }, {
         message: 'nFuryModeGame#' + JSON.stringify({"name": "Pepito"}),
         type: 'system', timestamp: date.getTime() + 10
         }
         ]*/
    }];


    var users = [
        {
            _id: userId,
            username: 'pepe1',
            password: "d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db", //1234
            alias: 'Antoñete', leader: true, times: 2, calls: 50, group: 1,
            avatar: 'http://findicons.com/files/icons/1072/face_avatars/300/j01.png',
            game: {
                gamedata: game[0]._id, //{type: mongoose.Schema.Types.ObjectId, ref: 'Game'}
                rank: 2, tostolares: 100000, fame: 100, afk: false, last_activity: date.getTime(),
                collection: [{_id: 'mycard1', card: '1', level: 1}, {_id: 'mycard2', card: '2', level: 1}],
                packs: [{amount: 10, category: 'general'}, {amount: 5, category: 'place1'}],
                order: {meal: null, drink: null, ito: true},
                last_order: {meal: null, drink: null, ito: false},
                notifications: [
                    {
                        message: 'nForgeWeapon#' + JSON.stringify({"name": "Arma de todos los tiempos"}),
                        type: 'system', timestamp: date.getTime() + 10500
                    }, {
                        message: 'nEquipDestroyArmor#' + JSON.stringify({"name": "Armadura caca", "tostem": "fuego"}),
                        type: 'skill', timestamp: date.getTime() + 1500
                    }
                ]
            }
        },
        {
            _id: userId2,
            username: 'pepe2',
            password: "d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db", //1234
            alias: 'Antoñete2', leader: true, times: 2, calls: 50, group: 1,
            avatar: 'http://findicons.com/files/icons/1072/face_avatars/300/j02.png',
            game: {
                gamedata: game[0]._id, //{type: mongoose.Schema.Types.ObjectId, ref: 'Game'}
                rank: 2, tostolares: 100000, fame: 100, afk: false, last_activity: date.getTime(),
                collection: [{_id: 'mycard1', card: '1', level: 1}, {_id: 'mycard2', card: '2', level: 1}],
                packs: [{amount: 10, category: 'general'}, {amount: 5, category: 'place1'}],
                order: {meal: null, drink: null, ito: true},
                last_order: {meal: null, drink: null, ito: false},
                notifications: [],
                schedule: {
                    encounter: [{player: userId, card: '5', level: 1}, {player: userId2, card: '5', level: 1}]
                }
            }
        },
        {
            _id: userId3,
            username: 'pepe3',
            password: "d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db", //1234
            alias: 'Antoñete3', leader: true, times: 2, calls: 50, group: 1,
            avatar: 'http://findicons.com/files/icons/1072/face_avatars/300/j03.png',
            game: {
                gamedata: game[0]._id, //{type: mongoose.Schema.Types.ObjectId, ref: 'Game'}
                rank: 2, tostolares: 100000, fame: 100, afk: false, last_activity: date.getTime(),
                collection: [{_id: 'mycard1', card: '1', level: 1}, {_id: 'mycard2', card: '2', level: 1}],
                packs: [{amount: 10, category: 'general'}, {amount: 5, category: 'place1'}],
                order: {meal: null, drink: null, ito: true},
                last_order: {meal: null, drink: null, ito: false},
                notifications: []
            }
        }
    ];


    /**
     * Para cambiar el estado de la partida
     */
    mongoRouter.get('/game/status/:status', function (req, res, next) {
        var estado = req.params.status;

        console.log("otro endpoint");

        models.Game.update({}, {
            $set: {
                "status": estado
            }
        }, {multi: true}, function (err) {
            console.log("UPDATED GAMES");
            console.log(err);

            res.json({"game": true});
        });
    });

    mongoRouter.get('/mongo', function (req, res, next) {
        console.log('Inicio de restauración');
        var promises = [
            models.Admin.remove(),
            models.Card.remove(),
            models.Drink.remove(),
            models.Game.remove(),
            models.Meal.remove(),
            models.Session.remove(),
            models.Talent.remove(),
            models.User.remove(),
            models.System.remove()
        ];

        q.all(promises).then(function (result) {
            console.log("Base de datos limpiada");
            finalizado = 0;
            eventEmitter.emit('#CargaDatos', res);
        });
    });


    eventEmitter.on('#CargaDatos', function (res) {
        console.log('Cargando datos...');

        //Meto los nuevos valores
        models.Admin.create(admins, function (err, admins) {
            if (err) {
                console.error(err);
            } else {
                console.log("    Creados los admins");
                eventEmitter.emit('#Finalizado', res, 'admins');
            }
        });

        //Meto los nuevos valores
        models.Meal.create(meals, function (err, meals) {
            if (err) {
                console.error(err);
            } else {
                console.log("    Creadas las comidas");
                eventEmitter.emit('#Finalizado', res, 'comidas');
            }
        });

        //Meto los nuevos valores
        models.Drink.create(drinks, function (err, drinks) {
            if (err) {
                console.error(err);
            } else {
                console.log("    Creadas las bebidas");
                eventEmitter.emit('#Finalizado', res, 'bebidas');
            }
        });

        //Meto los nuevos valores
        models.Talent.create(talents, function (err, talents) {
            if (err) {
                console.error(err);
            } else {
                console.log("    Creados los talentos");
                eventEmitter.emit('#Finalizado', res, 'talentos');
            }
        });

        //Meto los nuevos valores
        models.Game.create(game, function (err, games) {
            if (err) {
                console.error(err);
            } else {
                console.log("    Creado el juego");
                eventEmitter.emit('#Finalizado', res, 'juego');
            }
        });

        //Meto los nuevos valores
        models.Card.create(cards, function (err, cards) {
            if (err) {
                console.error(err);
            } else {
                console.log("    Creadas las cartas");
                eventEmitter.emit('#Finalizado', res, 'cartas');
            }
        });

        //Meto los nuevos valores
        models.User.create(users, function (err, users) {
            if (err) {
                console.error(err);
            } else {
                console.log("    Creados los usuarios");
                eventEmitter.emit('#Finalizado', res, 'usuarios');
            }
        });

        //Meto los nuevos valores
        models.System.create([{version: '2.5.6'}], function (err, systems) {
            if (err) {
                console.error(err);
            } else {
                console.log("    Creados los datos del sistema");
                eventEmitter.emit('#Finalizado', res, 'sistema');
            }
        });
    });

    eventEmitter.on('#Finalizado', function (res, what) {
        finalizado++;
        console.log("      ++ Ha finalizado " + what + " (" + finalizado + " de 8)");
        if (finalizado === 8) {
            res.json({"error": "false", "message": "Datos cargados"});
        }
    });

    // Asigno los router a sus rutas
    app.use('/dev', mongoRouter);
};

//Use new Aggregate({ $match: { _id: mongoose.Schema.Types.ObjectId('00000000000000000000000a') } }); instead.
