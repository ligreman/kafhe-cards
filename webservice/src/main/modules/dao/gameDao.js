'use strict';

var console = process.console,
    Q = require('q'),
    config = require(__dirname + '/modules/config'),
    mongoose = require('mongoose'),
    models = require(__dirname + '/models/models')(mongoose);

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

module.exports = {
    gameUpdateAllByStatus: gameUpdateAllByStatus
};
