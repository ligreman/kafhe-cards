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
        combat: user.game.rank,
        endurance: user.game.rank,
        skill: user.game.rank,
        reflexes: user.game.rank,
        luck: user.game.rank,
        vigor: user.game.rank,
        attack: 0,
        parry: 0,
        damage: 0,
        defense: 0,
        critic: 0,
        evade: 0,
        health: 0,
        ambush: 0
    };

    console.log("stats iniciales del usuario según rango");
    console.log(stats);

    // Primero calculo los stats base
    // -- Ya tengo 1 punto por nivel
    // -- Añado 1 punto por cada punto en cada rama de cada tipo
    stats.combat += user.game.talents.combat.length;
    stats.endurance += user.game.talents.combat.length;
    stats.skill += user.game.talents.exploration.length;
    stats.reflexes += user.game.talents.exploration.length;
    stats.luck += user.game.talents.survival.length;
    stats.vigor += user.game.talents.survival.length;

    console.log("Después de los puntos de cada rama");
    console.log(stats);

    // -- Hasta 10 puntos por talentos cogidos
    var talents = [];
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
    });

    console.log("Después aplicar los puntos de cada talento");
    console.log(stats);

    console.log("scehdule");
    console.log(user.game.schedule);

    // -- Hasta 10 puntos por arma, armadura o skill
    stats = addStatsFromCard(cardDB, user.game.schedule.weapon, stats);
    stats = addStatsFromCard(cardDB, user.game.schedule.armor, stats);
    stats = addStatsFromCard(cardDB, user.game.schedule.skill, stats);

    // -- Modificadores de encuentros y adversidades
    stats = addStatsFromCard(cardDB, user.game.schedule.encounter, stats);
    stats = addStatsFromCard(cardDB, user.game.schedule.event, stats);

    console.log("Despues de aplicar los stats por cada carta en schedule");
    console.log(stats);

    // Ahora a partir de los stats base calculo los secundarios según fórmulas
    stats.attack = Math.floor((stats.skill * 3 / 2) + (stats.luck * 1 / 2));
    stats.parry = Math.floor((stats.reflexes * 3 / 2) + (stats.luck * 1 / 2));
    stats.damage = Math.floor(stats.combat);
    stats.defense = Math.floor(stats.endurance * 1 / 2);
    stats.critic = Math.floor(stats.skill * 1 / 2);
    stats.evade = Math.floor(stats.luck * 1 / 2);
    stats.health = stats.vigor * 5;
    stats.ambush = Math.floor(stats.reflexes * 1 / 2);

    console.log("Despues de hacer los cálculos para los stats secundarios");
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
        stats.combat += carta.data[carta.type].stats[cc.level].combat;
        stats.endurance += carta.data[carta.type].stats[cc.level].endurance;
        stats.skill += carta.data[carta.type].stats[cc.level].skill;
        stats.reflexes += carta.data[carta.type].stats[cc.level].reflexes;
        stats.luck += carta.data[carta.type].stats[cc.level].luck;
        stats.vigor += carta.data[carta.type].stats[cc.level].vigor;
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
