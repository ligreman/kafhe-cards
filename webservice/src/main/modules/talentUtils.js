'use strict';

var console = process.console,
    config = require('../modules/config'),
    utils = require('../modules/utils'),
    mongoose = require('mongoose'),
    TAFFY = require('taffy');


/**
 * Busca una lista de talentos por sus ids en el global de todos los talentos
 * @param talents
 * @param talentIds
 */
var findTalents = function (talents, talentIds) {
    var talentTAFFY = TAFFY(talents);
    var talentos = talentTAFFY({'id': talentIds}).get();

    return talentos;
};

module.exports = {
    findTalents: findTalents
};
