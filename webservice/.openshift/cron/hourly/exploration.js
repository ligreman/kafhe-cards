#!/usr/bin/env node

'use strict';

// Hora en España
process.env.TZ = "Europe/Madrid";

var fecha = new Date(),
    hora = fecha.getHours(), //0-23
    dia = fecha.getDay(); //0-6 siendo 0 domingo

var basePath = process.env.OPENSHIFT_REPO_DIR || 'D:\\Workspace\\www\\kafhe_4.0_cards\\development\\webservice\\src\\main';
basePath += '/';

var mongoose = require('mongoose');
var mongoHost = process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME || 'mongodb://localhost/kafhe';
mongoose.connect(mongoHost, {});
mongoose.Promise = require('q').Promise;

require(basePath + 'models/createModels')(mongoose);

var config = require(basePath + 'modules/config'),
    // gameDao = require(basePath + 'modules/dao/gameDao'),
    // userDao = require(basePath + 'modules/dao/userDao'),
    // events = require('events'),
    cardUtils = require(basePath + 'modules/cardUtils'),
    userUtils = require(basePath + 'modules/userUtils'),
    utils = require(basePath + 'modules/utils'),
    TAFFY = require('taffy'),
    models = require(basePath + 'models/models')(mongoose),
    Q = require('q');

//Gestor de eventos
// var eventEmitter = new events.EventEmitter();

console.log('Inicio gestión de exploración');


// De lunes a jueves, de 12 a 19 de la tarde, cada hora acciones (8 cada día)
if (!(dia >= 1 && dia < 5 && hora >= 12 && hora <= 19)) {
    // salir();
}

// Variables globales
var cardDB, talentDB;

// Obtengo los datos de base de datos: cartas, talentos, juegos + jugadores
Q.all([
    models.Card.find().exec(),
    models.Talent.find().exec(),
    models.Game.find({status: config.GAME_STATUS.explore}).populate('players').exec()
]).spread(function (_cardDB, _talentDB, games) {
    if (!_cardDB || !_talentDB || !games) {
        console.error("Error recuperando datos de mongo");
        salir();
    }

    cardDB = _cardDB;
    talentDB = _talentDB;

    _cardDB = _talentDB = null;

    console.log("Datos");
    // console.log(cardDB);
    // console.log(games[0].players[0]);

    // Por cada juego
    games.forEach(function (game) {
        var players = game.players;

        players.forEach(function (player) {
            // Si el player no está afk
            if (player.game.afk) {
                return;
            }

            console.log("PLAYER: " + player.username);
            var playerStats = userUtils.getUserStats(player, cardDB, talentDB);

            // curamos y comprobamos si murió
            var healResult = heal(player, playerStats);
            // Aplico los resultados de curar
            player.game.current_health = healResult.current_health;

            // Movimiento
            var destinoPlace = movement(player, healResult.died);
            console.log("Destino");
            console.log(destinoPlace);

            // Exploramos
            explore(destinoPlace);
        });
    });

    // movement(games[0].players[0], true);
    /*

     */
    // Por cada juego, y cada personaje en cada juego, iré ejecutando su turno:
    // SI NO ESTA AFK
    // 0.- Preparación: se cura un % el personaje, bajan contadores de estado, etc...
    // 1.- Movimiento -> rellena el journal
    // 2.- Tirada de explorar
    // 3.- según nivel del lugar, la tirada puede provocar que no encuentre nada, encontrar algo intrascendente, algo interesante o combate
    // 4.- Combate si hubiere
    // 5.- Resolución de turno: recompensas y fama si combate, hallazgos, muerto -> a capital...
    // 6.- Escribimos el log con lo sucedido, tanto el personal como el global

}).fail(function (error) {
    console.log("Error");
    console.error(error);
    salir();
});


/**
 * Antes de empezar el turno
 */
function preTurn() {
}

function heal(player, playerStats) {
    var died = false, current_health = 0;

    // Miro si el jugador había muerto
    if (player.game.current_health <= 0) {
        died = true;

        // Le recargo la vida
        current_health = playerStats.health;
    } else {
        // Le curo un % de la vida
        current_health = player.game.current_health + Math.round(playerStats.health * config.DEFAULTS.character.health_percentage_recovered_per_turn / 100);
        // Si me paso, pongo límite
        current_health = Math.min(current_health, playerStats.health);
    }

    return {
        current_health: current_health,
        died: died
    };
}

function movement(player, died) {
    // Calculo a dónde ha de ir el usuario
    // var cardTaffy = TAFFY(cardDB);

    // Cojo el último lugar visitado
    var lastPlace = null, nextPlace = null;

    if (player.game.journal.length > 0) {
        var db = TAFFY(player.game.journal);
        lastPlace = db().order("date desc").first();
        lastPlace = lastPlace.place;
    } else {
        if (!player.game.schedule.place.length > 0) {
            return null;
        }

        console.log("No habia visitado nada así que voy a schedule: " + player.game.schedule.place[0].card);
        console.log(player.game.schedule);
        // No había visitado nada aún, así que será la carta de schedule
        nextPlace = player.game.schedule.place[0].card;
        lastPlace = false;
    }

    if (lastPlace === null) {
        return null;
    } else if (lastPlace !== false) {
        // Si ya fui a schedule y tengo que buscar otro sitio
        lastPlace = cardUtils.findCard(cardDB, lastPlace);
    }

    console.log("Ultimo lugar: " + lastPlace);
    //TODO asegurarse de que cada día se borra el journal
    if (nextPlace !== null) {
        // Si ya hay nextPlace establecido es que es el primer movimiento y voy a schedule
        // no tengo que hacer nada en concreto
    } else if (died) {
        // Si había muerto, a la capital más cercana del último lugar
        nextPlace = lastPlace.data.place.capital;
    } else {
        // Si no murió miro a ver a dónde voy, de los lugares adyacentes
        // Cojo los lugares adyacentes
        var adyPlaces = cardUtils.findCards(cardDB, lastPlace.data.place.adjacent_places);

        // Si no hay adyacentes algo falla
        if (adyPlaces.length === 0) {
            return null;
        }

        // Agrupo los adyacentes por categorías para decidir a dónde ir
        var lowerLvlPlaces = [], sameLvlPlaces = [], oneHigherLvlPlaces = [], moreHigherLvlPlaces = [], dungeonPlaces = [];
        adyPlaces.forEach(function (ady) {
            if (ady.data.place.type === config.DEFAULTS.placeTypes.dungeon) {
                dungeonPlaces.push(ady);
            } else if (ady.data.place.level < lastPlace.data.place.level) {
                lowerLvlPlaces.push(ady);
            } else if (ady.data.place.level === lastPlace.data.place.level) {
                sameLvlPlaces.push(ady);
            } else if (ady.data.place.level === (lastPlace.data.place.level + 1)) {
                oneHigherLvlPlaces.push(ady);
            } else if (ady.data.place.level > (lastPlace.data.place.level + 1)) {
                moreHigherLvlPlaces.push(ady);
            }

            // A una dungeon no me puedo mover directamente.
            var dado;
            while (nextPlace === null) {
                // Tirada de dado
                dado = utils.rollDice(1, 100);

                if (dado <= config.DEFAULTS.movementProbabilities.lower) {
                    // Si hay lugares de este tipo cojo uno
                    if (lowerLvlPlaces.length > 0) {
                        nextPlace = utils.randomFromArray(lowerLvlPlaces);
                    }
                } else if (dado <= config.DEFAULTS.movementProbabilities.same) {
                    // Si hay lugares de este tipo cojo uno
                    if (sameLvlPlaces.length > 0) {
                        nextPlace = utils.randomFromArray(sameLvlPlaces);
                    }
                } else if (dado <= config.DEFAULTS.movementProbabilities.high) {
                    // Si hay lugares de este tipo cojo uno
                    if (oneHigherLvlPlaces.length > 0) {
                        nextPlace = utils.randomFromArray(oneHigherLvlPlaces);
                    }
                } else if (dado <= config.DEFAULTS.movementProbabilities.higher) {
                    // Si hay lugares de este tipo cojo uno
                    if (moreHigherLvlPlaces.length > 0) {
                        nextPlace = utils.randomFromArray(moreHigherLvlPlaces);
                    }
                }
            }
        });
    }
    console.log(nextPlace);

    nextPlace = cardUtils.findCard(cardDB, nextPlace);
    console.log(nextPlace);

    return nextPlace;
}

function explore(place) {
    // 2.- Tirada de explorar
    // 3.- según nivel del lugar, la tirada puede provocar que no encuentre nada, encontrar algo intrascendente, algo interesante o combate
    var tirada = utils.rollDice(1, 100);
    var placeLevel = place.data.place.level;

    console.log("Tirada " + tirada + " -- Lugar lvl " + placeLevel);
}

function salir() {
    mongoose.disconnect();
    process.exit();
}

