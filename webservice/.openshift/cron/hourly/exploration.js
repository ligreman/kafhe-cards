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
    models = require(basePath + 'models/models')(mongoose),
    Q = require('q');

//Gestor de eventos
// var eventEmitter = new events.EventEmitter();

console.log('Inicio gestión de exploración');

salir();

// Obtengo los datos de base de datos: cartas, talentos, juegos + jugadores
Q.all([
    models.Card.find().exec(),
    models.Talent.find().exec(),
    models.Game.find().populate('players').exec()
]).spread(function (cardDB, talentDB, games) {
    if (!cardDB || !talentDB || !games) {
        console.error("Error recuperando datos de mongo");
        salir();
    }

    console.log("Datos");
    console.log(games[0].players[0]);
    // Por cada juego, y cada personaje en cada juego, iré ejecutando su turno:
    // 0.- Preparación: se cura un % el personaje, bajan contadores de estado, etc...
    // 1.- Movimiento
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

console.log("END");

// De lunes a jueves, de 12 a 19 de la tarde, cada hora acciones (8 cada día)
if (dia >= 1 && dia < 5 && hora >= 12 && hora <= 19) {
}

/**
 * Antes de empezar el turno
 */
function preTurn() {
}

function salir() {
    mongoose.disconnect();
    process.exit();
}

