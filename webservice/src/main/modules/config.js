'use strict';

var SERVER = {
    // Contraseña por defecto de los usuarios
    default_password: '1234',
    censure_user: true //TODO activar en PRO
};


var REGEXP = {
    str_valid_regexp: /[a-zA-Z0-9ÑñáéíóúÁÉÍÓÚüÜ\-_ ]+/
};

/*************/

// Valores por defecto
var DEFAULTS = {
    max_variacion_probabilidad_fama: 35, //Porcentaje máximo de probabilidad que se puede ganar o perder por la fama
    fame_to_tostolares_conversion: 100, // 100 de fame = 1 tostólar,

    // Personajes
    character: {
        stats_starting_value: 5,
        hire_cost: 1000 // Tostólares que cuesta
    },

    // Límites de cartas por personaje
    schedule_limits: {
        // A tu personaje
        weapon: 1,
        armor: 1,
        skill: 3,
        place: 1,
        // Pones al enemigo
        encounter: 2,
        event: 1
    },

    // Colección de cartas
    collection: {
        frequency: {
            'E': 5,
            'R': 10,
            'I': 25,
            'C': 60
        },
        card_max_level: 3,
        cards_per_pack: 3
    }
};

// Tabla de estados de partida
var GAME_STATUS = {
    weekend: 0,// fin de semana. Se pone así cuando se crea una partida nueva.
    planning: 1,// durante la semana, tiempo de espera entre juegos. Permite contratar. También meter y modificar tu pedido.
    explore: 2,// durante la semana, mientras se ejecutan los juegos. También meter y modificar tu pedido.
    resolution: 3,// El viernes cuando se termina la última exploración. No puedes hacer nada, ni modificar pedido, ni forja, habilidades...
    closed: 4//  una vez lanzado el desayuno, se muestran los resultados. se cierra la partida y se crea una nueva si era "recursiva"
};

var CARD_TYPES = ['weapon', 'armor', 'skill', 'place', 'encounter', 'event'];
var CARD_TYPES_OWN = ['weapon', 'armor', 'skill', 'place'];
var CARD_TYPES_ENEMY = ['encounter', 'event'];


//Exporto las funciones de la librería utils para que puedan accederse desde fuera
module.exports = {
    SERVER: SERVER,
    GAME_STATUS: GAME_STATUS,
    DEFAULTS: DEFAULTS,
    CARD_TYPES: CARD_TYPES,
    CARD_TYPES_OWN: CARD_TYPES_OWN,
    CARD_TYPES_ENEMY: CARD_TYPES_ENEMY,
    REGEXP: REGEXP
};

