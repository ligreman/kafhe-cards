'use strict';

var crypto = require('crypto');

var randomInt = function (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
};

var randomFromArray = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};


/**
 * Tira un dado de X sides un número times de veces
 */
var rollDice = function (times, sides) {
    var total = 0;
    while (times-- > 0) {
        total += (1 + Math.floor(Math.random() * sides));
    }
    return total;
};

/**
 * Realiza una tirada de dado de 100 para ver si se saca más que el failPercent. Una tirada que no lo supere
 * es fracaso y una por encima de failPercent es éxito.
 * @param failPercent Porcentaje sobre 100 de fallo.
 * @return boolean true si pasas la tirada, false si no.
 */
var dice100 = function (failPercent) {
    // Saco un número aleatorio entre 1 y 100 que representa la tirada del jugador
    var dice = rollDice(1, 100);

    // Ahora devuelvo true/false según si esta tirada supera el % de fracaso
    return (dice > failPercent);
};

/**
 * Genera un ID aleatorio
 */
var generateId = function () {
    var date = new Date();

    // Hash
    var shasum = crypto.createHash('md5');
    shasum.update('' + date.getTime());

    return shasum.digest('hex');
};

//Exporto las funciones de la librería utils para que puedan accederse desde fuera
module.exports = {
    randomInt: randomInt,
    randomFromArray: randomFromArray,
    dice100: dice100,
    rollDice: rollDice,
    generateId: generateId
};
