'use strict';

var console = process.console,
    extend = require('util')._extend,
    mongoose = require('mongoose'),
    Q = require('q'),
    utils = require('./utils'),
    config = require('./config'),
    cardDao = require('./dao/cardDao'),
    modelos = require('../models/models')(mongoose);

var calculateUsersProbabilities = fnCalculateUsersProbabilities,
    calculateProbabilitiesByRank = fnCalculateProbabilitiesByRank,
    calculateFameDifferentials = fnCalculateFameDifferentials;

function fnCalculateUsersProbabilities(idGame) {
    var defer = Q.defer();

    // Saco los usuarios
    modelos.User.find({"game.gamedata": idGame}, function (err, users) {
        //Preparo un array con las probabilidades de cada uno de los usuarios
        var probabilidadesRango = calculateProbabilitiesByRank(users);
        if (probabilidadesRango === null) return null;

        //Los diferenciales
        var diffs = calculateFameDifferentials(users);
        if (diffs === null) {
            // Esto puede pasar si nadie ha metido el desayuno
            defer.resolve({probabilities: probabilidadesRango, users: users});
            return;
        }

        //El máximo diferencial, tomados en valores absolutos
        var maximoDiff = Object.keys(diffs).reduce(function (total, key) {
            total = (Math.abs(diffs[key]) > total) ? Math.abs(diffs[key]) : total;
            return total;
        }, 0);

        //Calculo la variación de probabilidad de cada usuario
        var brutes = {};
        var maxVariation = config.DEFAULTS.max_variacion_probabilidad_fama;
        for (var userId in diffs) {
            if (diffs.hasOwnProperty(userId)) {
                var differential = diffs[userId];

                //Primero la relación de cada usuario con el máximo de probabilidad que puede variar
                var relationWithMaxVariation = 0;
                if (maximoDiff > 0) {
                    relationWithMaxVariation = differential / maximoDiff;
                }

                //Porcentaje a variar
                var porcVariation = relationWithMaxVariation * maxVariation;

                //Probabilidad variada
                brutes[userId] = Math.max(0, probabilidadesRango[userId] - ( probabilidadesRango[userId] * porcVariation / 100 ));
            }
        }

        // Sumo los valores en bruto
        var sumaBrutes = Object.keys(brutes).reduce(function (total, key) {
            return total + brutes[key];
        }, 0);

        //La probabilidad final (neta)
        var nets = {};
        for (var userId in brutes) {
            if (diffs.hasOwnProperty(userId)) {
                var brute = brutes[userId];
                nets[userId] = Math.round(brute / sumaBrutes * 100);
            }
        }

        // Pongo alias en vez de ids
        var definitivos = {};
        users.forEach(function (u) {
            definitivos[u._id] = nets[u._id];
        });

        if (Object.keys(definitivos).length === 0) {
            defer.reject();
        } else {
            defer.resolve({probabilities: definitivos, users: users});
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
        valores[user._id] = valor;
    });

    // Calculo el valor final
    users.forEach(function (user) {
        finales[user._id] = ((valores[user._id] / xSuma) * 100).toPrecision(4);
    });

    return finales;
}

function fnCalculateFameDifferentials(users) {
    var fames = {}, differentials = {};

    //La fama en bruto
    users.forEach(function (user) {
        // Si ha metido el desayuno le tengo en cuenta
        if (user.game.order.meal !== null || user.game.order.drink !== null) {
            fames[user._id] = user.game.fame;
        }
    });

    //Calculo la media de la fama
    var okF = Object.keys(fames);
    if (okF.length > 0) {
        var fameMedia = okF.reduce(function (total, key) {
            return total + fames[key];
        }, 0);
        fameMedia = fameMedia / okF.length;

        users.forEach(function (user) {
            if (user.game.order.meal !== null || user.game.order.drink !== null) {
                differentials[user._id] = fames[user._id] - fameMedia;
            }
        });
    }

    if (Object.keys(differentials).length === 0) {
        return null
    } else {
        return differentials;
    }
}


module.exports = {
    calculateUsersProbabilities: calculateUsersProbabilities
};
