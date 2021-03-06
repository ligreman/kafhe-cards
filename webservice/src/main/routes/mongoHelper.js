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
        // fakery = require('mongoose-fakery'),
        cargaInicialCartas = require('../scripts/cargaInicialMongo/cards'),
        cargaInicialTalentos = require('../scripts/cargaInicialMongo/talents'),
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
            id: '100', name: 'Pistola', 'type': 'weapon', element: 'fire', effects: [],
            contained_in_packs: [{category: 'place1', frequency: 50}],
            data: {
                weapon: {
                    stats: {
                        1: {description: 'Es una pistola 1', attack: 5, defense: 2},
                        2: {description: 'Es una pistola 2'},
                        3: {description: 'Es una pistola 3'}
                    }
                }
            }
        },
        {
            id: '105', name: 'Podercete', 'type': 'skill', element: 'fire', effects: [],
            contained_in_packs: [{category: 'place1', frequency: 50}],
            data: {
                skill: {
                    stats: {
                        1: {description: 'Es una skill 1', attack: 5},
                        2: {description: 'Es una skill 2'},
                        3: {description: 'Es una skill 3'}
                    }
                }
            }
        }
    ];

    cards = cards.concat(cargaInicialCartas.places);

    var talents = [
        {
            id: 'talent00', name: 'Talento 0', description: 'Er talento 0', level: 0,
            branch: 'combat', cards: ['skill01'], required: []
        },
        {
            id: 'talent05', name: 'Talento 5', description: 'Er talento 5', level: 1,
            branch: 'combat', cards: [], required: ['talent00'], cost: 2
        },
        {
            id: 'talent06', name: 'Talento 6', description: 'Er talento 6', level: 1,
            branch: 'combat', cards: [], required: ['talent00']
        },
        {
            id: 'talent01', name: 'Talento 1', description: 'Er talento 1', level: 0,
            branch: 'exploration', cards: [], required: []
        },
        {
            id: 'talent02', name: 'Talento 2', description: 'Er talento 2', level: 1,
            branch: 'exploration', cards: ['skill02'], required: ['talent01']
        },
        {
            id: 'talent03', name: 'Talento 3', description: 'Er talento 3', level: 1,
            branch: 'exploration', cards: ['skill03'], required: ['talent01']
        },
        {
            id: 'talent04', name: 'Talento 4', description: 'Er talento 4', level: 0,
            branch: 'survival', cards: [], required: []
        },
        {
            id: 'talent07', name: 'Talento 7', description: 'Er talento 7', level: 1,
            branch: 'survival', cards: [], required: ['talent04']
        },
        {
            id: 'talent08', name: 'Talento 8', description: 'Er talento 8', level: 1,
            branch: 'survival', cards: [], required: ['talent04']
        }
    ];

    var talents = cargaInicialTalentos;


    var date = new Date();
    var userId = new mongoose.Types.ObjectId;
    var userId2 = new mongoose.Types.ObjectId;
    var userId3 = new mongoose.Types.ObjectId;

    var game = [{
        _id: new mongoose.Types.ObjectId,
        repeat: true,
        status: 2,
        caller: null,
        players: [userId, userId2, userId3],
        notifications: [
            {
                message: 'nFuryModeGame', params: JSON.stringify({"name": "Pepito"}),
                source: 'Manolo', type: 'skill', timestamp: date.getTime() + 40000
            }, {
                message: 'nFuryModeGame', params: JSON.stringify({"name": "Pepito2"}),
                source: 'Manolo2', type: 'system', timestamp: date.getTime() + 30000
            }, {
                message: 'nFuryModeGame', params: JSON.stringify({"name": "Pepito3"}),
                source: 'Manolo3', type: 'skill', timestamp: date.getTime() + 20000
            }, {
                message: 'nFuryModeGame', params: JSON.stringify({"name": "Pepito4"}),
                source: 'Manolo4', type: 'system', timestamp: date.getTime() + 10000
            }
        ]
    }];


    var users = [
        {
            _id: userId,
            username: 'pepe1',
            password: "d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db", //1234
            alias: 'Antoñete', leader: true, times: 2, calls: 50, group: 1,
            avatar: '3',
            game: {
                gamedata: game[0]._id, //{type: mongoose.Schema.Types.ObjectId, ref: 'Game'}
                rank: 2, tostolares: 100000, current_health: 10, fame: 100, afk: false, last_activity: date.getTime(),
                unlocked: ['5', '6', '7'], talents: {points: 5, survival: [], exploration: ['talent01'], combat: []},
                collection: [
                    {_id: 'mycard1', card: '1', level: 1},
                    {_id: 'mycard11', card: '1', level: 1},
                    {_id: 'mycard2', card: '2', level: 1},
                    {_id: 'mycard22', card: '2', level: 1},
                    {_id: 'mycard3', card: '3', level: 1},
                    {_id: 'mycard33', card: '3', level: 1},
                    {_id: 'mycard4', card: '4', level: 1},
                    {_id: 'mycard44', card: '4', level: 1},
                    {_id: 'mycard5', card: '5', level: 1},
                    {_id: 'mycard55', card: '5', level: 1},
                    {_id: 'mycard6', card: '6', level: 1},
                    {_id: 'mycard7', card: '100', level: 1},
                    {_id: 'mycard77', card: '100', level: 1},
                    {_id: 'mycard8', card: '105', level: 1},
                    {_id: 'mycard88', card: '105', level: 1}
                ],
                packs: [{amount: 10, category: 'pack1', source: 'Casa la pradera'},
                    {amount: 5, category: 'pack6', source: 'Casa de manolo'}],
                order: {meal: null, drink: null, ito: true},
                schedule: {
                    encounter: [{player: userId, card: '5', level: 1}, {player: userId2, card: '5', level: 1}],
                    place: [{card: '3', level: 2}]
                },
                last_order: {meal: null, drink: null, ito: false},
                rewards: {
                    tostolares: 25,
                    fame: 25
                },
                journal: [
                    {
                        date: 1477929730018, place: '3', notifications: [
                        {
                            message: 'nFuryModeGame', params: JSON.stringify({"name": "Pepito4"}),
                            source: 'Manolo2', type: 'system', timestamp: date.getTime() + 20000
                        }, {
                            message: 'nFuryModeGame', params: JSON.stringify({"name": "Pepito"}),
                            source: 'Manolo', type: 'system', timestamp: date.getTime()
                        }]
                    },
                    {date: 1477929740018, place: '2', notifications: []},
                    {date: 1477929750018, place: '4', notifications: []},
                    {date: 1477929760018, place: '5', notifications: []}
                ]
            }
        },
        {
            _id: userId2,
            username: 'pepe2',
            password: "d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db", //1234
            alias: 'Antoñete2', leader: true, times: 2, calls: 50, group: 1,
            avatar: '1',
            game: {
                gamedata: game[0]._id, //{type: mongoose.Schema.Types.ObjectId, ref: 'Game'}
                rank: 1, tostolares: 100000, current_health: 10, fame: 49, afk: true, last_activity: date.getTime(),
                collection: [{_id: 'mycard1', card: '1', level: 1}, {_id: 'mycard2', card: '2', level: 1}],
                packs: [{amount: 10, category: 'pack2', source: 'Casa la pradera'},
                    {amount: 5, category: 'pack6', source: 'Casa de manolo'}],
                order: {meal: null, drink: null, ito: true},
                last_order: {meal: null, drink: null, ito: false},
                schedule: {
                    encounter: [{player: userId, card: '5', level: 1}, {player: userId2, card: '5', level: 1}],
                    place: [{card: '3', level: 2}]
                },
                journal: [
                    {date: 1477929730018, place: '3', notifications: []},
                    {date: 1477929740018, place: '2', notifications: []},
                    {date: 1477929750018, place: '6', notifications: []},
                    {date: 1477929760018, place: '5', notifications: []}
                ]
            }
        },
        {
            _id: userId3,
            username: 'pepe3',
            password: "d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db", //1234
            alias: 'Antoñete3', leader: true, times: 2, calls: 50, group: 1,
            avatar: '2',
            game: {
                gamedata: game[0]._id, //{type: mongoose.Schema.Types.ObjectId, ref: 'Game'}
                rank: 4, tostolares: 100000, current_health: 10, fame: 87, afk: true, last_activity: date.getTime(),
                collection: [{_id: 'mycard1', card: '1', level: 1}, {_id: 'mycard2', card: '2', level: 1}],
                packs: [{amount: 10, category: 'pack3', source: 'Casa la pradera'},
                    {amount: 5, category: 'pack6', source: 'Casa de manolo'}],
                order: {meal: null, drink: null, ito: true},
                last_order: {meal: null, drink: null, ito: false}
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
