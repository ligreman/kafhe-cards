'use strict';

var console = process.console,
    Q = require('q'),
    config = require('../config'),
    mongoose = require('mongoose'),
    models = require('../../models/models')(mongoose);

var gameUpdateAllByStatus = function (oldStatus, newStatus) {
    var deferred = Q.defer(),
        condition = {};

    if (oldStatus) {
        condition = {"status": oldStatus};
    }

    models.Game.update(condition, {$set: {"status": newStatus}}, {multi: true},
        function (error, numAffected) {
            if (error) {
                deferred.reject(error);
            }
            deferred.resolve(numAffected);
        }
    );

    return deferred.promise;
};

/**
 * Reseteo de game entre desayunos
 * Borra notifications de game
 * Borra caller
 * Aumenta times
 * Estado a weekend si está cerrado y repeat true; o si está en resolution
 */
var gameBreakfastReset = function () {
    var deferred = Q.defer(),
        condition = {
            $or: [
                {"status": config.GAME_STATUS.resolution},
                {
                    $and: [
                        {"status": config.GAME_STATUS.closed},
                        {"repeat": true}
                    ]
                }
            ]
        };


    models.Game.update(condition, {
            $set: {"status": config.GAME_STATUS.weekend, "caller": null, "notifications": []},
            $inc: {"times": 1}
        }, {multi: true},
        function (error, numAffected) {
            if (error) {
                deferred.reject(error);
            }
            deferred.resolve(numAffected);
        }
    );

    return deferred.promise;
};

module.exports = {
    gameUpdateAllByStatus: gameUpdateAllByStatus,
    gameBreakfastReset: gameBreakfastReset
};
