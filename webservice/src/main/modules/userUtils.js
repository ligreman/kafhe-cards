'use strict';

var mongoose = require('mongoose'),
    Q = require('q'),
    utils = require('./utils'),
    cardUtils = require('./cardUtils'),
    talentUtils = require('./talentUtils'),
    config = require('./config'),
    cardDao = require('./dao/cardDao'),
    modelos = require('../models/models')(mongoose);

/**
 * Calcula las stats del jugador
 */
function fnGetUserStats(user, cardDB, talentDB) {
    var stats = {
        attack: 0,
        speed: 0,
        defense: 0,
        health: 0,
        precision: 0
    };

    console.log("stats iniciales del usuario según rango");
    console.log(stats);

    // Primero calculo los stats base
    // -- Ya tengo 1 punto por nivel
    // -- Añado 1 punto por cada punto en cada rama de cada tipo
    /*stats.combat += user.game.talents.combat.length;
     stats.endurance += user.game.talents.combat.length;
     stats.skill += user.game.talents.exploration.length;
     stats.reflexes += user.game.talents.exploration.length;
     stats.luck += user.game.talents.survival.length;
     stats.vigor += user.game.talents.survival.length;

     console.log("Después de los puntos de cada rama");
     console.log(stats);*/

    // -- Hasta 10 puntos por talentos cogidos
    /*var talents = [];
     talents = talents.concat(talentUtils.findTalents(talentDB, user.game.talents.combat));
     talents = talents.concat(talentUtils.findTalents(talentDB, user.game.talents.exploration));
     talents = talents.concat(talentUtils.findTalents(talentDB, user.game.talents.survival));

     console.log("He recogido los talentos de cada rama");
     console.log(talents);

     talents.forEach(function (tc) {
     stats.combat += tc.stats.combat;
     stats.endurance += tc.stats.endurance;
     stats.skill += tc.stats.skill;
     stats.reflexes += tc.stats.reflexes;
     stats.luck += tc.stats.luck;
     stats.vigor += tc.stats.vigor;
     });*/

    console.log("Después aplicar los puntos de cada talento");
    console.log(stats);

    console.log("scehdule");
    console.log(user.game.schedule);

    // -- Sumo los stats de las armas, armaduras
    stats = addStatsFromCard(cardDB, user.game.schedule.weapon, stats);
    stats = addStatsFromCard(cardDB, user.game.schedule.armor, stats);

    // Sumo stats de skill, si se cumplen las condiciones
    stats = addStatsFromCard(cardDB, user.game.schedule.skill, stats);

    console.log("Despues de aplicar los stats por cada carta en schedule");
    console.log(stats);

    return stats;
}

/**
 * Coge los stats de diferentes cartas y los aplica a un objeto de stats
 */
function addStatsFromCard(cardDB, cardsId, stats) {
    console.log("Esta carta");
    console.log(cardsId);
    if (!cardsId) {
        console.log("  -- no carta");
        return stats;
    }

    cardsId.forEach(function (cc) {
        // Busco la carta
        var carta = cardUtils.findCards(cardDB, cc.card);
        // Solo hay una, IDs son únicos
        carta = carta[0];

        console.log("Carta encontrada: ");
        console.log(carta);

        // Doy valores
        stats.attack += carta.data[carta.type].stats[cc.level].attack;
        stats.defense += carta.data[carta.type].stats[cc.level].defense;
        stats.health += carta.data[carta.type].stats[cc.level].health;
        stats.speed += carta.data[carta.type].stats[cc.level].speed;
        stats.precision += carta.data[carta.type].stats[cc.level].precision;
    });

    return stats;
}

/**
 * Calcula los stats de los personajes de un grupo
 */
function fnGetUsersStats(idGame, cardDB, talentDB) {
    var defer = Q.defer();

    var statsByUser = {};
    console.log("Vamos alla");

    // Cojo todos los jugadores y calculo sus stats para devolverlos
    modelos.User.find({"game.gamedata": idGame}, function (err, users) {
        if (!users) {
            defer.reject("No se han encontrado usuarios para ese game");
        }

        console.log("por cada usuario");
        users.forEach(function (user) {
            console.log("Usuario: " + user.username);
            statsByUser[user.username] = fnGetUserStats(user, cardDB, talentDB);
        });

        defer.resolve(statsByUser);
    });

    return defer.promise;
}

module.exports = {
    getUserStats: fnGetUserStats,
    getUsersStats: fnGetUsersStats
};
