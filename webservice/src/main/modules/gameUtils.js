'use strict';

var console = process.console,
    mongoose = require('mongoose'),
    Q = require('q'),
    utils = require('./utils'),
    cardDao = require('./dao/cardDao'),
    modelos = require('../models/models')(mongoose);

var calculateUsersProbabilities = fnCalculateUsersProbabilities,
    calculateProbabilitiesByRank = fnCalculateProbabilitiesByRank,
    calculateFameDifferentials = fnCalculateFameDifferentials,
    launchBreakfast = fnLaunchBreakfast;


function fnCalculateUsersProbabilities(idGame) {
    var defer = Q.defer();
    console.log("ID: " + idGame);
    // Saco los usuarios
    modelos.User.find({"game.gamedata": idGame}, function (err, users) {
        console.log("Devuelv");
        //Preparo un array con las probabilidades de cada uno de los usuarios
        var probabilidadesRango = calculateProbabilitiesByRank(users);
        if (probabilidadesRango === null) return null;
        console.log("2");
        console.log(probabilidadesRango);

        //Los diferenciales
        var diffs = calculateFameDifferentials(users);
        console.log(diffs);
        if (diffs === null) {
            // Esto puede pasar si nadie ha metido el desayuno
            defer.resolve({probabilities: probabilidadesRango, users: users});
            return;
        }
        console.log("3");

        //El máximo diferencial, tomados en valores absolutos
        var maximoDiff = diffs.reduce(function (total, num) {
            total = (Math.abs(num) > total) ? Math.abs(num) : total;
            return total;
        }, 0);
        console.log("4");

        //Calculo la variación de probabilidad de cada usuario
        var brutes = [];
        var maxVariation = CONSTANTS.max_variacion_probabilidad_fama;
        diffs.forEach(function (differential, userId) {
            console.log("5");
            //Primero la relación de cada usuario con el máximo de probabilidad que puede variar
            var relationWithMaxVariation = 0;
            if (maximoDiff > 0) {
                relationWithMaxVariation = differential / maximoDiff;
            }

            //Porcentaje a variar
            var porcVariation = relationWithMaxVariation * maxVariation;

            //Probabilidad variada
            brutes[userId] = Math.max(0, probabilidadesRango[userId] - ( probabilidadesRango[userId] * porcVariation / 100 ));
        });
        console.log("6");

        // Sumo los valores en bruto
        var sumaBrutes = brutes.reduce(function (total, num) {
            return total + num;
        }, 0);
        console.log("7");

        //La probabilidad final (neta)
        var nets = [];
        brutes.forEach(function (brute, userId) {
            nets[userId] = Math.round(brute / sumaBrutes * 100);
        });
        console.log("8");

        if (nets.length === 0) {
            console.log("9");
            defer.reject();
        } else {
            console.log("10");
            defer.resolve({probabilities: nets, users: users});
        }
    });

    return defer.promise;
}

function fnCalculateProbabilitiesByRank(users) {
    var xProporcion = 1,
        xRango = 10,
        xSuma = 0, valores = {}, finales = {};

    // Por cada usuario
    users.forEach(function (user) {
        var proporcion = user.times / (user.calls + 1);
        var valor = (xProporcion * proporcion) + (Math.pow(user.game.rank, 2) * xRango);
        xSuma += valor;
        valores[user._id.toString()] = valor;
    });

    // Calculo el valor final
    users.forEach(function (user) {
        finales[user._id.toString()] = ((valores[user._id.toString()] / xSuma) * 100).toPrecision(4);
    });

    return finales;
}

function fnCalculateFameDifferentials(users) {
    var fames = [], differentials = [];
    //TODO usar objetos en vez de arrays... que parece que no funciona si no
    console.log("333333");
    //La fama en bruto
    users.forEach(function (user) {
        // Si ha metido el desayuno le tengo en cuenta
        if (user.game.order.meal !== null || user.game.order.drink !== null) {
            var id = user._id.toString();
            fames[id] = user.game.fame;
        }
    });

    //Calculo la media de la fama
    if (fames.length > 0) {
        var fameMedia = fames.reduce(function (total, num) {
            return total + num;
        }, 0);
        fameMedia = fameMedia / fames.length;

        users.forEach(function (user) {
            if (user.game.order.meal !== null || user.game.order.drink !== null) {
                differentials[user._id.toString()] = fames[user._id.toString()] - fameMedia;
            }
        });
    }

    if (differentials.length === 0) {
        return null
    } else {
        return differentials;
    }
}
/**
 + Al cerrar el game (lanzar el desayuno):
 - Dar recompensas
 - Sube de rank de toda la gente
 - Sube times de toda la gente
 - Al llamador se aplica el reset por llamar

 + Reseteo por llamar:
 - rank =1
 - calls +1
 - packs =[]
 - collection =[]
 - unlocked =[]
 - talents =[]
 - Añadir a unlocked las capitales

 + Reseteo entre desayunos de usuario si se ha llamado:
 - Borro todas las de schedule.
 - fame =0
 - Borra el journal
 - Borra rewards
 - Borra notifications de user
 - Order pasa a last order, y order se limpia
 */
function fnLaunchBreakfast(idGame) {
    var defer = Q.defer();
    // Calculo quién llama
    var caller;

    Q.all([
        calculateUsersProbabilities(idGame),
        cardDao.getCards('capital', true)
    ]).spread(function (result, capitalsIds) {
        var probs = result.probabilities;
        var users = result.users;

        // Lanzo el "dado" de 100 caras 1 vez
        var tirada = utils.rollDice(1, 100);

        var anterior = 0;
        probs.forEach(function (valor, userId) {
            if (valor == 0) {
                return;
            }

            if (((anterior + 1) <= tirada) && (tirada <= (anterior + valor))) {
                caller = userId;
            }

            anterior += valor;
        });

        if (!caller) {
            defer.reject();
        }

        // Una vez lo sé procedo a gestionar el cierre del desayuno
        var promesas = [];
        users.forEach(function (user) {
            if (user._id.toString() === caller) {
                // Llamador
                user.game.rank = 1;
                user.calls = user.calls + 1;
                user.game.packs = [];
                user.game.collection = [];
                // Reseteo unlocked a sólo las capitales
                user.game.unlocked = capitalsIds;
                user.game.talents = [{
                    combat: [],
                    exploration: [],
                    survival: [],
                    points: 0
                }];
            } else {
                // No llamador, sube de rango
                user.game.rank = user.game.rank + 1;
                // Punto de talento
                user.game.talents.points++;
            }

            // Todos Los jugadores se resetean para el nuevo desayuno
            user.times = user.times + 1;
            user.fame = 0;

            // - Borro todas las de schedule.
            user.game.schedule = {
                weapon: [], armor: [], skill: [],
                place: [], encounter: [], event: []
            };

            // - Borra el journal
            user.game.journal = [];

            // - Borra rewards
            user.game.rewards = {
                packs: [],
                tostolares: 0,
                fame: 0
            };
            // - Borra notifications de user
            user.game.notifications = [];

            // - Order pasa a last order, y order se limpia
            user.game.last_order = utils.cloneObject(user.game.order);
            user.game.order = {meal: null, drink: null, ito: false};

            promesas.push(user.save());
        });

        Q.allSettled(promesas).then(function (results) {
            var resultado = true, razon = '';
            results.forEach(function (result) {
                if (result.state !== "fulfilled") {
                    resultado = result.value;
                    razon = result.reason;
                }
            });

            if (resultado !== true) {
                defer.reject(razon);
            }

            defer.resolve();
        });
    });

    return defer.promise;
}

module.exports = {
    calculateUsersProbabilities: calculateUsersProbabilities,
    launchBreakfast: launchBreakfast
};
