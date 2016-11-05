'use strict';

var console = process.console,
    mongoose = require('mongoose'),
    Q = require('q'),
    utils = require('./utils'),
    modelos = require('../models/models')(mongoose);

var calculateUsersProbabilities = fnCalculateUsersProbabilities,
    calculateProbabilitiesByRank = fnCalculateProbabilitiesByRank,
    calculateFameDifferentials = fnCalculateFameDifferentials,
    launchBreakfast = fnLaunchBreakfast;


function fnCalculateUsersProbabilities(idGame) {
    var defer = Q.defer();

    // Saco los usuarios
    modelos.User.find({"game.gamedata": idGame}, function (err, users) {
        //Preparo un array con las probabilidades de cada uno de los usuarios
        var probabilidadesRango = calculateProbabilitiesByRank(users);
        if (probabilidadesRango === null) return null;

        //Los diferenciales
        var diffs = calculateFameDifferentials(users);
        if (diffs === null) return probabilidadesRango;

        //El máximo diferencial, tomados en valores absolutos
        var maximoDiff = diffs.reduce(function (total, num) {
            total = (Math.abs(num) > total) ? Math.abs(num) : total;
            return total;
        }, 0);

        //Calculo la variación de probabilidad de cada usuario
        var brutes = [];
        var maxVariation = CONSTANTS.max_variacion_probabilidad_fama;
        diffs.forEach(function (differential, userId) {
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

        // Sumo los valores en bruto
        var sumaBrutes = brutes.reduce(function (total, num) {
            return total + num;
        }, 0);

        //La probabilidad final (neta)
        var nets = [];
        brutes.forEach(function (brute, userId) {
            nets[userId] = Math.round(brute / sumaBrutes * 100);
        });

        if (nets.length === 0) {
            defer.reject();
        } else {
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
        var valor = (xProporcion * proporcion) + (Math.pow(user.game.level, 2) * xRango);
        xSuma += valor;
        valores[user._id] = valor;
    });

    // Calculo el valor final
    users.forEach(function (user) {
        finales[user._id] = ((valores[user._id] / xSuma) * 100).toPrecision(4);
    });

    return finales;
}

function fnCalculateFameDifferentials(users) {
    var fames = [], differentials = [];

    //La fama en bruto
    users.forEach(function (user) {
        // Si ha metido el desayuno le tengo en cuenta
        if (user.game.order.meal !== null || user.game.order.drink !== null) {
            fames[user._id] = user.game.fame;
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
                differentials[user._id] = fames[user._id] - fameMedia;
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

    Q.all([calculateUsersProbabilities(idGame)])
        .spread(function (result) {
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
            users.forEach(function (user) {
                if (user._id === caller) {
                    // Llamador
                    user.game.rank = 1;
                    user.calls = user.calls + 1;
                    user.game.packs = [];
                    user.game.collection = [];
                    user.game.unlocked = [];
                    user.game.talents = [];
                    /*
                     - rank =1
                     - calls +1
                     - packs =[]
                     - collection =[]
                     - unlocked =[]
                     - talents =[]
                     - Añadir a unlocked las capitales
                     */
                } else {
                    // No llamador
                    /*
                     Dar recompensas
                     - Sube de rank de toda la gente
                     */
                }

                // Todos
                user.times = user.times + 1;
                user.fame = 0;
                /*
                 + Reseteo entre desayunos de usuario si se ha llamado:
                 - Borro todas las de schedule.
                 - Borra el journal
                 - Borra rewards
                 - Borra notifications de user
                 - Order pasa a last order, y order se limpia
                 */
            });
        });

    return defer.promise;
}

module.exports = {
    calculateUsersProbabilities: calculateUsersProbabilities,
    launchBreakfast: launchBreakfast
};
