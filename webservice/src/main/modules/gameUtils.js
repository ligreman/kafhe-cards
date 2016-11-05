'use strict';

var console = process.console,
    mongoose = require('mongoose'),
    modelos = require('../models/models')(mongoose);


var calculateProbabilitiesByRank = function (idGame) {
    var xProporcion = 1,
        xRango = 10,
        xSuma = 0, valores = {}, finales = {};

    modelos.User
        .find({"game.gamedata": idGame}, function (err, users) {
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
        });

    return finales;
};

/**
 + Al cerrar el game (lanzar el desayuno):
 - Dar recompensas
 - Sube de rank de toda la gente
 - Sube times de toda la gente
 - Al llamador se aplica el reset por llamar

 + Reseteo por llamar:
 - rank =1
 - calls +1
 - fame =0
 - packs =[]
 - collection =[]
 - unlocked =[]
 - talents =[]
 - Añadir a unlocked las capitales

 + Reseteo entre desayunos de usuario si se ha llamado:
 - Borro todas las de schedule.
 - Borra el journal
 - Borra rewards
 - Borra notifications de user
 - Order pasa a last order, y order se limpia
 */
var launchBreakfast = function (idGame) {
    // Calculo quién llama
    var caller;

    // Una vez lo sé procedo a gestionar el cierre del desayuno
};

module.exports = {
    calculateProbabilitiesByRank: calculateProbabilitiesByRank
};
