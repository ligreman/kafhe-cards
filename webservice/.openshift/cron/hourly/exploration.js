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
    models.Game.find().populate('players').exec()
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
            var died = false;

            console.log("PLAYER: " + player.username);
            // Movimiento
            var destino = movement(player, died);
            console.log(destino);
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

function movement(player, died) {
    // Calculo a dónde ha de ir el usuario
    // var cardTaffy = TAFFY(cardDB);

    // Cojo el último lugar visitado
    var lastPlace = null;
    if (player.game.journal.length > 0) {
        var db = TAFFY(player.game.journal);
        lastPlace = db().order("date desc").first();
        lastPlace = lastPlace.place;
    } else {
        // No había visitado nada aún, así que será la carta de schedule
        lastPlace = player.game.schedule.place.card;
    }

    if (!lastPlace) {
        return null;
    } else {
        lastPlace = cardUtils.findCard(cardDB, lastPlace);
    }

    console.log(lastPlace);
    var nextPlace = null;

    // Si había muerto, a la capital más cercana del último lugar
    if (died) {
        nextPlace = lastPlace.data.place.capital;
    } else {
        // Si no murió miro a ver a dónde voy, de los lugares adyacentes
        // Cojo los lugares adyacentes
        var adyPlaces = cardUtils.findCards(cardDB, lastPlace.data.place.adjacent_places);

        // Agrupo los adyacentes por categorías para decidir a dónde ir
        var lowerLvlPlaces = [], sameLvlPlaces = [], oneHigherLvlPlaces = [], moreHigherLvlPlaces = [], dungeonPlaces = [];
        adyPlaces.forEach(function (ady) {
            if (ady.data.place.type === CONSTANTS.placeTypes.dungeon) {
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
        });
    }
    console.log(nextPlace);

    nextPlace = cardUtils.findCard(cardDB, nextPlace);
    console.log(nextPlace);

    return nextPlace;
}

function salir() {
    mongoose.disconnect();
    process.exit();
}

